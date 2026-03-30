
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const feeds = await prisma.rssFeed.findMany();
    console.log('--- RSS Feeds ---');
    console.table(feeds.map(f => ({ name: f.name, url: f.url, category: f.category, active: f.isActive })));

    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 10
    });
    console.log('\n--- Latest News ---');
    console.table(news.map(n => ({ 
      title: n.title.substring(0, 50), 
      source: n.source, 
      image: n.image ? n.image.substring(0, 50) : 'NULL',
      published: n.publishedAt
    })));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
