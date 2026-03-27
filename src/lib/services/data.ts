import prisma from '@/lib/db';
import { 
  MOCK_SETTINGS, 
  MOCK_SPONSORS, 
  MOCK_HOSTS, 
  MOCK_PROGRAMS, 
  MOCK_NEWS 
} from '@/lib/mocks/data';
import { Host, NewsItem, Program, Setting, Sponsor } from '@/lib/types';

/**
 * Helper to check if the database is configured.
 * This allows the site to run smoothly with mock data until 
 * the real PostgreSQL is attached.
 */
function hasDatabase(): boolean {
  return !!process.env.DATABASE_URL;
}

export async function getSettings(): Promise<Setting> {
  if (hasDatabase()) {
    try {
      const dbSettings = await prisma.setting.findFirst();
      if (dbSettings) {
        return {
          id: dbSettings.id,
          streamUrl: dbSettings.streamUrl,
          instagramUrl: dbSettings.instagramUrl,
          contactEmail: dbSettings.contactEmail
        };
      }
    } catch {
      console.warn("DB Error on getSettings, falling back to mock");
    }
  }
  return MOCK_SETTINGS as Setting;
}

export async function getSponsors(): Promise<Sponsor[]> {
  if (hasDatabase()) {
    try {
      const dbSponsors = await prisma.sponsor.findMany();
      return dbSponsors.map(s => ({
        id: s.id,
        name: s.name,
        logo: s.logo,
        website: s.website
      }));
    } catch {
      console.warn("DB Error on getSponsors, falling back to mock");
    }
  }
  return MOCK_SPONSORS as Sponsor[];
}

export async function getHosts(): Promise<Host[]> {
  if (hasDatabase()) {
    try {
      const dbHosts = await prisma.host.findMany();
      return dbHosts.map(h => ({
        id: h.id,
        name: h.name,
        bio: h.bio,
        avatar: h.avatar
      }));
    } catch {
      console.warn("DB Error on getHosts, falling back to mock");
    }
  }
  return MOCK_HOSTS as Host[];
}

export async function getPrograms(): Promise<Program[]> {
  if (hasDatabase()) {
    try {
      const dbPrograms = await prisma.program.findMany({
        orderBy: [
          { dayOfWeek: 'asc' },
          { startTime: 'asc' }
        ]
      });
      return dbPrograms.map(p => ({
        id: p.id,
        title: p.title,
        dayOfWeek: p.dayOfWeek,
        startTime: p.startTime,
        endTime: p.endTime,
        hostName: p.hostName
      }));
    } catch {
      console.warn("DB Error on getPrograms, falling back to mock");
    }
  }
  return MOCK_PROGRAMS as Program[];
}

export async function getNewsByCategory(category: string, limit: number = 10): Promise<NewsItem[]> {
  if (hasDatabase()) {
    try {
      const dbNews = await prisma.news.findMany({
        where: { category },
        orderBy: { publishedAt: 'desc' },
        take: limit
      });
      return dbNews as NewsItem[];
    } catch {
      console.warn(`DB Error on getNewsByCategory(${category}), falling back to mock`);
    }
  }
  const filtered = MOCK_NEWS.filter(n => n.category === category).slice(0, limit);
  return filtered as NewsItem[];
}

export async function getLatestNews(limit: number = 10): Promise<NewsItem[]> {
  if (hasDatabase()) {
    try {
      const dbNews = await prisma.news.findMany({
        orderBy: { publishedAt: 'desc' },
        take: limit
      });
      return dbNews as NewsItem[];
    } catch {
      console.warn("DB Error on getLatestNews, falling back to mock");
    }
  }
  return MOCK_NEWS.slice(0, limit) as NewsItem[];
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (hasDatabase()) {
    try {
      const dbArticle = await prisma.news.findUnique({
        where: { slug }
      });
      if (dbArticle) return dbArticle as NewsItem;
    } catch (e) {
      console.warn("DB Error on getNewsBySlug, checking mock", e);
    }
  }
  
  const mockArticle = MOCK_NEWS.find(n => n.slug === slug);
  return (mockArticle as NewsItem) || null;
}
