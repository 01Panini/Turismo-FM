const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.setting.upsert({
    where: { id: 'default-settings' },
    update: {
      streamUrl: 'https://stm14.xcast.com.br:11104/;',
      instagramUrl: 'https://www.instagram.com/turismofm',
      contactEmail: 'contato@turismofm.com.br',
    },
    create: {
      id: 'default-settings',
      streamUrl: 'https://stm14.xcast.com.br:11104/;',
      instagramUrl: 'https://www.instagram.com/turismofm',
      contactEmail: 'contato@turismofm.com.br',
    },
  });

  const sponsors = [
    {
      id: 'sponsor-prefeitura',
      name: 'Prefeitura',
      logo: '/images/placeholders/sponsor-placeholder.svg',
      website: 'https://example.com',
    },
    {
      id: 'sponsor-turismo-sa',
      name: 'Turismo SA',
      logo: '/images/placeholders/sponsor-placeholder.svg',
      website: 'https://example.com',
    },
  ];

  for (const sponsor of sponsors) {
    await prisma.sponsor.upsert({
      where: { id: sponsor.id },
      update: sponsor,
      create: sponsor,
    });
  }

  const hosts = [
    {
      id: 'host-joao-radialista',
      name: 'João Radialista',
      bio: 'A voz das manhãs da Turismo FM.',
      avatar: '/images/placeholders/host-placeholder.svg',
    },
    {
      id: 'host-maria-clara',
      name: 'Maria Clara',
      bio: 'Trazendo as melhores notícias à tarde.',
      avatar: '/images/placeholders/host-placeholder.svg',
    },
  ];

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: host,
      create: host,
    });
  }

  const programs = [
    {
      id: 'program-manha-turismo',
      title: 'Manhã Turismo',
      dayOfWeek: 1,
      startTime: '08:00',
      endTime: '12:00',
      hostName: 'João Radialista',
    },
    {
      id: 'program-tarde-show',
      title: 'Tarde Show',
      dayOfWeek: 1,
      startTime: '13:00',
      endTime: '17:00',
      hostName: 'Maria Clara',
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { id: program.id },
      update: program,
      create: program,
    });
  }

  const news = [
    {
      id: 'news-festival-turismo-inverno',
      title: 'Festival de Turismo de Inverno atrai milhares à cidade',
      slug: 'festival-turismo-inverno-1',
      description: 'O festival anual trouxe recorde de público...',
      image: '/images/news-placeholder.svg',
      source: 'G1 Turismo',
      category: 'REGIONAL',
      url: 'https://g1.globo.com',
      publishedAt: new Date(),
    },
    {
      id: 'news-novas-rotas-aereas',
      title: 'Novas rotas aéreas anunciadas para a região litorânea',
      slug: 'novas-rotas-aereas-2',
      description: 'A companhia aérea anunciou 3 novos voos semanais.',
      image: '/images/news-placeholder.svg',
      source: 'Agência Brasil',
      category: 'MUNDO',
      url: 'https://agenciabrasil.ebc.com.br',
      publishedAt: new Date(Date.now() - 86400000),
    },
  ];

  for (const item of news) {
    await prisma.news.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
