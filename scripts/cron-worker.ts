/**
 * Standalone RSS Cron Worker
 * Execution: npx tsx scripts/cron-worker.ts
 */
import { rssService } from '../src/lib/services/rss';

async function main() {
  console.log('--- 🚀 [CRON-WORKER] STARTING RSS SYNC ---');
  const startTime = Date.now();
  
  try {
    const result = await rssService.syncAllFeeds();
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    if (result.success) {
      console.log(`--- ✅ [CRON-WORKER] SUCCESS in ${duration}s ---`);
      console.log(`Items Synced: ${result.synced}`);
      console.log(`Items Pruned: ${result.deleted}`);
      if (result.errors.length > 0) {
        console.warn('Recoverable Errors encountered:');
        result.errors.forEach(e => console.warn(` - ${e}`));
      }
    } else {
      console.error(`--- ❌ [CRON-WORKER] FAILED in ${duration}s ---`);
      console.error(result.message);
      result.errors.forEach(e => console.error(` - ${e}`));
      process.exit(1);
    }
  } catch (err) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error(`--- 💥 [CRON-WORKER] CRITICAL ERROR in ${duration}s ---`);
    console.error(err instanceof Error ? err.stack : String(err));
    process.exit(1);
  }
}

// Execute
main();
