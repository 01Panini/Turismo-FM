import prisma from '@/lib/db';
import { fetchFeed } from '@/lib/rss/parser';

export interface SyncResult {
  success: boolean;
  message: string;
  synced: number;
  deleted: number;
  errors: string[];
}

/**
 * RSS Service
 * Handles the business logic for fetching, parsing, and storing news from RSS feeds.
 * This service is decoupled from Next.js API routes to allow execution from standalone workers.
 */
export const rssService = {
  /**
   * Synchronizes all active RSS feeds.
   * Fetches data, generates deterministic slugs, and upserts into the database.
   */
  async syncAllFeeds(): Promise<SyncResult> {
    const results: SyncResult = {
      success: true,
      message: 'Sync process initialized',
      synced: 0,
      deleted: 0,
      errors: []
    };

    try {
      const activeFeeds = await prisma.rssFeed.findMany({
        where: { isActive: true },
        select: { url: true, name: true, category: true }
      });

      if (activeFeeds.length === 0) {
        results.message = 'No active RSS feeds to sync.';
        return results;
      }

      for (const source of activeFeeds) {
        try {
          console.log(`[RSS-SERVICE] Syncing feed: ${source.name} (${source.url})`);
          const items = await fetchFeed(source.url, source.name);
          console.log(`[RSS-SERVICE] Fetched ${items.length} items from ${source.name}`);
          
          for (const item of items) {
            // Upsert to avoid duplicates based on deterministic slug
            await prisma.news.upsert({
              where: { slug: item.slug },
              update: {}, // Keep original content
              create: {
                ...item,
                category: source.category
              },
            });
            results.synced++;
          }
          console.log(`[RSS-SERVICE] Upserted items from ${source.name}`);
        } catch (feedError) {
          const errMsg = `Failed to fetch feed ${source.name}: ${feedError instanceof Error ? feedError.message : String(feedError)}`;
          console.error(`[RSS-SERVICE] ${errMsg}`);
          results.errors.push(errMsg);
        }
      }

      // Cleanup phase
      const pruneResults = await this.pruneOldRecords();
      results.deleted = pruneResults;
      results.message = `Sync complete: ${results.synced} items synced, ${results.deleted} items pruned.`;

    } catch (error) {
      results.success = false;
      const errMsg = `Critical Sync Error: ${error instanceof Error ? error.message : String(error)}`;
      console.error(`[RSS-SERVICE] ${errMsg}`);
      results.errors.push(errMsg);
      results.message = 'Sync failed completely';
    }

    return results;
  },

  /**
   * Prunes old records based on retention policies.
   * 1. Deletes records older than 30 days.
   * 2. Enforces a hard limit of 500 records.
   */
  async pruneOldRecords(): Promise<number> {
    let totalDeleted = 0;

    try {
      // 1. Time-based retention (30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: timeDeleted } = await prisma.news.deleteMany({
        where: { createdAt: { lt: thirtyDaysAgo } }
      });
      totalDeleted += timeDeleted;

      // 2. Count-based retention (Hard limit 500)
      const currentCount = await prisma.news.count();
      if (currentCount > 500) {
        const recordsToDelete = currentCount - 500;
        const staleNews = await prisma.news.findMany({
          orderBy: { publishedAt: 'asc' },
          take: recordsToDelete,
          select: { id: true }
        });
        
        const staleIds = staleNews.map(n => n.id);
        const { count: limitDeleted } = await prisma.news.deleteMany({
          where: { id: { in: staleIds } }
        });
        totalDeleted += limitDeleted;
      }

      console.log(`[RSS-SERVICE] Pruning complete: ${totalDeleted} records removed.`);
      return totalDeleted;
    } catch (pruneError) {
      console.error('[RSS-SERVICE] Pruning error:', pruneError);
      return totalDeleted;
    }
  }
};
