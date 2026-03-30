import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [['media:content', 'mediaContent'], 'enclosure'],
  },
});

async function run() {
  try {
    const response = await fetch('https://g1.globo.com/rss/g1/goias/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const xml = await response.text();
    const feed = await parser.parseString(xml);
    console.log(`Feed Title: ${feed.title}`);
    
    if (feed.items && feed.items.length > 0) {
      const firstItem = feed.items[0];
      console.log('First Item Title:', firstItem.title);
      console.log('mediaContent:', firstItem.mediaContent);
      console.log('enclosure:', firstItem.enclosure);
      console.log('contentSnippet snippet:', firstItem.contentSnippet ? firstItem.contentSnippet.substring(0, 100) : null);
      
      // Look at raw properties:
      console.log('Keys:', Object.keys(firstItem));
    } else {
      console.log('No items found');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
