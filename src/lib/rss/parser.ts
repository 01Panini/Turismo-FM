/**
 * TurismoFM RSS Parser Strategy
 * Includes: 10s fetch timeout, Image extraction fallbacks, text sanitization, deterministic slug gen.
 */
import Parser from 'rss-parser';

type CustomItem = {
  'media:content'?: { $: { url: string } };
  enclosure?: { url: string; type: string };
};

const parser = new Parser<unknown, CustomItem>({
  customFields: {
    item: ['media:content', 'enclosure'],
  },
  timeout: 10000, // 10s built-in fetch timeout
});

export async function fetchFeed(url: string, sourceName: string) {
  // Promise wrapper as a secondary 10s timeout mechanism
  const fetchWithTimeout = async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
      const xml = await response.text();
      return parser.parseString(xml);
    } catch (error: unknown) {
      clearTimeout(id);
      throw error;
    }
  };

  const feed = await fetchWithTimeout();

  return feed.items.map((item: any) => {
    // 1. Fallback Image Strategy
    let imageUrl = '/images/news-placeholder.jpg'; // Needs to exist in public folder
    
    if (item['media:content']?.$?.url) {
      imageUrl = item['media:content'].$.url;
    } else if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
      imageUrl = item.enclosure.url;
    } else {
      // Regex fallback to find first img tag inside description HTML
      const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) imageUrl = imgMatch[1];
    }

    // 2. Deterministic Slug Generation
    const baseSlug = `${item.title}-${sourceName}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const shortHash = Math.random().toString(36).substring(2, 7);
    const rawSlug = `${baseSlug.slice(0, 60)}-${shortHash}`;

    // 3. Description Sanitization and Truncation
    const rawDescription = item.contentSnippet || item.content || '';
    const cleanDescription = rawDescription.replace(/<[^>]*>?/gm, '').trim().slice(0, 300); 

    return {
      title: item.title || 'TurismoFM News',
      slug: rawSlug,
      description: cleanDescription,
      url: item.link || '',
      source: sourceName,
      image: imageUrl,
      publishedAt: new Date(item.pubDate || new Date()),
    };
  });
}
