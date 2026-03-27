import { NextResponse } from 'next/server';
import { rssService } from '@/lib/services/rss';

/**
 * RSS Sync API Endpoint
 * Triggered by Vercel Cron or External Scheduler (Cron-job.org / GitHub Actions)
 * Protected by CRON_SECRET in Headers (Bearer Token)
 */
export async function GET(request: Request) {
  const authorization = request.headers.get('authorization');
  const bearerToken = authorization?.startsWith('Bearer ')
    ? authorization.slice('Bearer '.length)
    : null;
  
  const cronSecret = process.env.CRON_SECRET;

  // 1. Security Check
  if (!cronSecret) {
    console.error('[RSS-SYNC-API] CRON_SECRET is not configured in environment variables.');
    return NextResponse.json({ success: false, error: 'Internal configuration error.' }, { status: 500 });
  }

  if (bearerToken !== cronSecret) {
    console.warn('[RSS-SYNC-API] Unauthorized access attempt detected.');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Execute Service
  try {
    const result = await rssService.syncAllFeeds();
    
    // Return detailed result
    return NextResponse.json({ 
      success: result.success, 
      message: result.message, 
      synced: result.synced, 
      deleted: result.deleted,
      errors: result.errors.length > 0 ? result.errors : undefined
    });

  } catch (error) {
    console.error('[RSS-SYNC-API] Master execution failed:', error);
    return NextResponse.json({ success: false, error: 'Sync failed completely' }, { status: 500 });
  }
}
