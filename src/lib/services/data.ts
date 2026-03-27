import prisma from '@/lib/db';
import { 
  MOCK_SETTINGS, 
  MOCK_SPONSORS, 
  MOCK_HOSTS, 
  MOCK_PROGRAMS, 
  MOCK_NEWS 
} from '@/lib/mocks/data';

/**
 * Helper to check if the database is configured.
 * This allows the site to run smoothly with mock data until 
 * the real PostgreSQL is attached.
 */
function hasDatabase() {
  return !!process.env.DATABASE_URL;
}

export async function getSettings() {
  if (hasDatabase()) {
    try {
      const setting = await prisma.setting.findFirst();
      return setting || MOCK_SETTINGS;
    } catch {
      console.warn("DB Error on getSettings, falling back to mock");
      return MOCK_SETTINGS;
    }
  }
  return MOCK_SETTINGS;
}

export async function getSponsors() {
  if (hasDatabase()) {
    try {
      return await prisma.sponsor.findMany();
    } catch {
      console.warn("DB Error on getSponsors, falling back to mock");
      return MOCK_SPONSORS;
    }
  }
  return MOCK_SPONSORS;
}

export async function getHosts() {
  if (hasDatabase()) {
    try {
      return await prisma.host.findMany();
    } catch {
      console.warn("DB Error on getHosts, falling back to mock");
      return MOCK_HOSTS;
    }
  }
  return MOCK_HOSTS;
}

export async function getPrograms() {
  if (hasDatabase()) {
    try {
      return await prisma.program.findMany({
        orderBy: [
          { dayOfWeek: 'asc' },
          { startTime: 'asc' }
        ]
      });
    } catch {
      console.warn("DB Error on getPrograms, falling back to mock");
      return MOCK_PROGRAMS;
    }
  }
  return MOCK_PROGRAMS;
}

export async function getNewsByCategory(category: string, limit: number = 10) {
  if (hasDatabase()) {
    try {
      return await prisma.news.findMany({
        where: { category },
        orderBy: { publishedAt: 'desc' },
        take: limit
      });
    } catch {
      console.warn(`DB Error on getNewsByCategory(${category}), falling back to mock`);
      return MOCK_NEWS.filter(n => n.category === category).slice(0, limit);
    }
  }
  return MOCK_NEWS.filter(n => n.category === category).slice(0, limit);
}

export async function getLatestNews(limit: number = 10) {
  if (hasDatabase()) {
    try {
      return await prisma.news.findMany({
        orderBy: { publishedAt: 'desc' },
        take: limit
      });
    } catch {
      console.warn("DB Error on getLatestNews, falling back to mock");
      return MOCK_NEWS.slice(0, limit);
    }
  }
  return MOCK_NEWS.slice(0, limit);
}

export async function getNewsBySlug(slug: string) {
  if (hasDatabase()) {
    try {
      const dbArticle = await prisma.news.findUnique({
        where: { slug }
      });
      if (dbArticle) return dbArticle;
    } catch (e) {
      console.warn("DB Error on getNewsBySlug, checking mock", e);
    }
  }
  
  // Fallback match from MOCK_NEWS
  return MOCK_NEWS.find(n => n.slug === slug) || null;
}
