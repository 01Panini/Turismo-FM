import { NextResponse } from 'next/server';
import { fetchFeed } from '@/lib/rss/parser';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authorization = request.headers.get('authorization');
  const bearerToken = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null;
  const token = bearerToken || searchParams.get('token');
  const cronSecret = process.env.CRON_SECRET;

  // Protect the endpoint
  if (!cronSecret) {
    return NextResponse.json({ success: false, error: 'CRON_SECRET is not configured.' }, { status: 500 });
  }

  if (token !== cronSecret) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const activeFeeds = await prisma.rssFeed.findMany({
      where: { isActive: true },
      select: { url: true, name: true, category: true }
    });

    if (activeFeeds.length === 0) {
      return NextResponse.json({ success: true, message: 'No active RSS feeds to sync.', synced: 0 });
    }

    let syncedCount = 0;

    for (const source of activeFeeds) {
      try {
        const items = await fetchFeed(source.url, source.name);
        
        for (const item of items) {
          // Upsert to avoid duplicates based on deterministic slug
          await prisma.news.upsert({
            where: { slug: item.slug },
            update: {}, // Don't update existing facts if they change after publication
            create: {
              ...item,
              category: source.category
            },
          });
          syncedCount++;
        }
      } catch (feedError) {
        console.error(`Failed to fetch feed ${source.name}:`, feedError);
        // Continue to the next feed if one fails to not crash the entire sync process
      }
    }

    // Retention Policy: Delete records older than 30 days to bound DB growth
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: deletedOldCount } = await prisma.news.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    });

    // Retention Policy 2: Hard limit of 500 records to prevent row explosion on free tiers
    const currentCount = await prisma.news.count();
    let deletedLimitCount = 0;
    if (currentCount > 500) {
      const recordsToDelete = currentCount - 500;
      // Get the oldest IDs to delete
      const staleNews = await prisma.news.findMany({
        orderBy: { publishedAt: 'asc' },
        take: recordsToDelete,
        select: { id: true }
      });
      const staleIds = staleNews.map(n => n.id);
      
      const { count } = await prisma.news.deleteMany({
        where: { id: { in: staleIds } }
      });
      deletedLimitCount = count;
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Sync complete and old records pruned', 
      synced: syncedCount, 
      deleted: deletedOldCount + deletedLimitCount 
    });

  } catch (error) {
    console.error('RSS Sync Master Error:', error);
    return NextResponse.json({ success: false, error: 'Sync failed completely' }, { status: 500 });
  }
}
