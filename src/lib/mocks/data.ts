import { Setting, Sponsor, Host, Program, NewsItem } from '@/lib/types';

export const MOCK_SETTINGS: Setting = {
  id: '1',
  streamUrl: 'https://stm14.xcast.com.br:11104/;',
  instagramUrl: 'https://www.instagram.com/turismofm',
  contactEmail: 'contato@turismofm.com.br',
};

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: '1',
    name: 'Prefeitura',
    logo: '/images/placeholders/sponsor-placeholder.svg',
    website: 'https://example.com'
  },
  {
    id: '2',
    name: 'Turismo SA',
    logo: '/images/placeholders/sponsor-placeholder.svg',
    website: 'https://example.com'
  }
];

export const MOCK_HOSTS: Host[] = [
  {
    id: '1',
    name: 'João Radialista',
    bio: 'A voz das manhãs da Turismo FM.',
    avatar: '/images/placeholders/host-placeholder.svg'
  },
  {
    id: '2',
    name: 'Maria Clara',
    bio: 'Trazendo as melhores notícias à tarde.',
    avatar: '/images/placeholders/host-placeholder.svg'
  }
];

export const MOCK_PROGRAMS: Program[] = [
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

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
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
    id: '2',
    title: 'Novas rotas aéreas anunciadas para a região litorânea',
    slug: 'novas-rotas-aereas-2',
    description: 'A companhia aérea anunciou 3 novos voos semanais.',
    image: '/images/news-placeholder.svg',
    source: 'Agência Brasil',
    category: 'MUNDO',
    url: 'https://agenciabrasil.ebc.com.br',
    publishedAt: new Date(Date.now() - 86400000), // 1 day ago
  }
];
