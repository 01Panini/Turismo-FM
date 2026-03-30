import 'dotenv/config';
import { rssService } from '../src/lib/services/rss';

async function testSync() {
  console.log('Starting sync...');
  const result = await rssService.syncAllFeeds();
  console.log('Sync result:', result);
}

testSync().catch(console.error);
