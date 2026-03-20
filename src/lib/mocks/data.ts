export const MOCK_SETTINGS = {
  id: '1',
  streamUrl: 'https://stream.zeno.fm/turismofm',
  instagramUrl: 'https://www.instagram.com/turismofm',
  contactEmail: 'contato@turismofm.com.br',
};

export const MOCK_SPONSORS = [
  {
    id: '1',
    name: 'Prefeitura',
    logo: '/images/placeholders/prefeitura.png',
    website: 'https://example.com'
  },
  {
    id: '2',
    name: 'Turismo SA',
    logo: '/images/placeholders/turismo.png',
    website: 'https://example.com'
  }
];

export const MOCK_HOSTS = [
  {
    id: '1',
    name: 'João Radialista',
    bio: 'A voz das manhãs da Turismo FM.',
    avatar: '/images/placeholders/joao.png'
  },
  {
    id: '2',
    name: 'Maria Clara',
    bio: 'Trazendo as melhores notícias à tarde.',
    avatar: '/images/placeholders/maria.png'
  }
];

export const MOCK_PROGRAMS = [
  {
    id: '1',
    title: 'Manhã Turismo',
    dayOfWeek: 1, // Monday
    startTime: '08:00',
    endTime: '12:00',
    hostName: 'João Radialista'
  },
  {
    id: '2',
    title: 'Tarde Show',
    dayOfWeek: 1, // Monday
    startTime: '13:00',
    endTime: '17:00',
    hostName: 'Maria Clara'
  }
];

export const MOCK_NEWS = [
  {
    id: '1',
    title: 'Festival de Turismo de Inverno atrai milhares à cidade',
    slug: 'festival-turismo-inverno-1',
    description: 'O festival anual trouxe recorde de público...',
    image: '/images/placeholders/news-1.jpg',
    source: 'G1 Turismo',
    category: 'REGIONAL',
    url: 'https://g1.globo.com',
    publishedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Novas rotas aéreas anunciadas para a região litorânea',
    slug: 'novas-rotas-aereas-2',
    description: 'A companhia aérea anunciou 3 novos voos semanais.',
    image: '/images/placeholders/news-2.jpg',
    source: 'Agência Brasil',
    category: 'MUNDO',
    url: 'https://agenciabrasil.ebc.com.br',
    publishedAt: new Date(Date.now() - 86400000), // 1 day ago
    createdAt: new Date(),
  }
];
