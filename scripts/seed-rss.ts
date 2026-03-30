import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  await prisma.rssFeed.createMany({
    data: [
      { name: 'G1 Goiás', url: 'https://g1.globo.com/rss/g1/goias/', category: 'REGIONAL' },
      { name: 'O Popular', url: 'https://opopular.com.br/rss', category: 'REGIONAL' },
      { name: 'G1 Brasil', url: 'https://g1.globo.com/rss/g1/', category: 'MUNDO' }
    ],
    skipDuplicates: true
  });
  console.log('Feeds seeded.');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
