import prisma from '@/lib/db';
import { 
  News as PrismaNews,
  Host as PrismaHost,
  Program as PrismaProgram,
  Sponsor as PrismaSponsor,
  Setting as PrismaSetting
} from '@prisma/client';
import { 
  MOCK_SETTINGS, 
  MOCK_SPONSORS, 
  MOCK_HOSTS, 
  MOCK_PROGRAMS, 
  MOCK_NEWS 
} from '@/lib/mocks/data';
import { Host, NewsItem, Program, Setting, Sponsor } from '@/lib/types';

/**
 * Transformation Layer: Prisma -> Domain Types
 */

function transformSetting(s: PrismaSetting): Setting {
  return {
    id: s.id,
    streamUrl: s.streamUrl,
    instagramUrl: s.instagramUrl,
    contactEmail: s.contactEmail
  };
}

function transformSponsor(s: PrismaSponsor): Sponsor {
  return {
    id: s.id,
    name: s.name,
    logo: s.logo,
    website: s.website
  };
}

function transformHost(h: PrismaHost): Host {
  return {
    id: h.id,
    name: h.name,
    bio: h.bio,
    avatar: h.avatar
  };
}

function transformProgram(p: PrismaProgram): Program {
  return {
    id: p.id,
    title: p.title,
    dayOfWeek: p.dayOfWeek,
    startTime: p.startTime,
    endTime: p.endTime,
    hostName: p.hostName
  };
}

function transformNews(n: PrismaNews): NewsItem {
  return {
    id: n.id,
    title: n.title,
    slug: n.slug,
    description: n.description,
    image: n.image,
    source: n.source,
    category: n.category,
    url: n.url,
    publishedAt: n.publishedAt
  };
}

/**
 * Helper to check if the database is configured.
 */
function hasDatabase(): boolean {
  return !!process.env.DATABASE_URL;
}

export async function getSettings(): Promise<Setting> {
  if (hasDatabase()) {
    try {
      const dbSettings = await prisma.setting.findFirst();
      if (dbSettings) return transformSetting(dbSettings);
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
      return dbSponsors.map(transformSponsor);
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
      return dbHosts.map(transformHost);
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
      return dbPrograms.map(transformProgram);
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
      return dbNews.map(transformNews);
    } catch {
      console.warn(`DB Error on getNewsByCategory(${category}), falling back to mock`);
    }
  }
  const filtered = MOCK_NEWS.filter((n: NewsItem) => n.category === category).slice(0, limit);
  return filtered as NewsItem[];
}

export async function getLatestNews(limit: number = 10): Promise<NewsItem[]> {
  if (hasDatabase()) {
    try {
      const dbNews = await prisma.news.findMany({
        orderBy: { publishedAt: 'desc' },
        take: limit
      });
      return dbNews.map(transformNews);
    } catch {
      console.warn("DB Error on getLatestNews, falling back to mock");
    }
  }
  return (MOCK_NEWS as NewsItem[]).slice(0, limit);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (hasDatabase()) {
    try {
      const dbArticle = await prisma.news.findUnique({
        where: { slug }
      });
      if (dbArticle) return transformNews(dbArticle);
    } catch (e) {
      console.warn("DB Error on getNewsBySlug, checking mock", e);
    }
  }
  
  const mockArticle = (MOCK_NEWS as NewsItem[]).find(n => n.slug === slug);
  return mockArticle || null;
}
