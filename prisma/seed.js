const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding settings...');
  await prisma.setting.create({
    data: {
      streamUrl: 'https://stm14.xcast.com.br:11104/;',
      instagramUrl: 'https://instagram.com/turismofm903',
      contactEmail: 'contato@turismofm.com.br',
    },
  });
  
  console.log('Seeding sponsors...');
  await prisma.sponsor.create({
    data: {
      name: 'Prefeitura',
      logo: '/images/placeholders/sponsor-placeholder.svg',
      website: 'https://example.com'
    }
  });

  console.log('Seeding hosts...');
  await prisma.host.create({
    data: {
      name: 'João Radialista',
      bio: 'A voz das manhãs.',
      avatar: '/images/placeholders/host-placeholder.svg',
    }
  });

  console.log('Seeding default programs...');
  await prisma.program.create({
    data: {
      title: 'Manhã Turismo',
      dayOfWeek: 1, // Monday
      startTime: '08:00',
      endTime: '12:00',
      hostName: 'João Radialista'
    }
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
