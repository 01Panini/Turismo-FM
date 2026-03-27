'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Host, NewsItem, RssFeed, Setting, Sponsor } from '@/lib/types'

function getRequiredTextValue(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function getOptionalTextValue(formData: FormData, field: string): string | null {
  const value = formData.get(field);
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

// ----- Settings Actions -----
export async function getAdminSettings(): Promise<Setting | null> {
  try {
    const settings = await prisma.setting.findFirst();
    return settings as Setting | null;
  } catch {
    console.warn("DB not connected, returning null for getAdminSettings");
    return null;
  }
}

export async function updateSettings(data: { streamUrl?: string, instagramUrl?: string, contactEmail?: string}): Promise<void> {
  try {
    const existing = await prisma.setting.findFirst();
    if (existing) {
      await prisma.setting.update({
        where: { id: existing.id },
        data
      });
    } else {
      await prisma.setting.create({
        data
      });
    }
  } catch (error) {
    console.warn("DB error on updateSettings - ignoring update", error);
  }
  revalidatePath('/');
  revalidatePath('/admin/stream');
}

// ----- Sponsor Actions -----
export async function getSponsors(): Promise<Sponsor[]> {
  try {
    const sponsors = await prisma.sponsor.findMany();
    return sponsors as Sponsor[];
  } catch {
    return [];
  }
}

export async function createSponsor(formData: FormData): Promise<void> {
  const name = getRequiredTextValue(formData, 'name');
  const logo = getOptionalTextValue(formData, 'logo');
  const website = getOptionalTextValue(formData, 'website');

  if (!name) {
    return;
  }

  try {
    await prisma.sponsor.create({
      data: { name, logo, website },
    });
  } catch (error) {
    console.warn("DB error on createSponsor - ignoring update", error);
  }

  revalidatePath('/');
  revalidatePath('/admin/sponsors');
}

export async function deleteSponsor(id: string): Promise<void> {
  try {
    await prisma.sponsor.delete({ where: { id }});
  } catch (error) {
    console.warn("DB error on deleteSponsor - ignoring update", error);
  }

  revalidatePath('/');
  revalidatePath('/admin/sponsors');
}

// ----- Host Actions -----
export async function getHosts(): Promise<Host[]> {
  try {
    const hosts = await prisma.host.findMany();
    return hosts as Host[];
  } catch {
    return [];
  }
}

export async function createHost(formData: FormData): Promise<void> {
  const name = getRequiredTextValue(formData, 'name');
  const bio = getOptionalTextValue(formData, 'bio');
  const avatar = getOptionalTextValue(formData, 'avatar');

  if (!name) {
    return;
  }

  try {
    await prisma.host.create({
      data: { name, bio, avatar },
    });
  } catch (error) {
    console.warn("DB error on createHost - ignoring update", error);
  }

  revalidatePath('/');
  revalidatePath('/admin/hosts');
}

export async function deleteHost(id: string): Promise<void> {
  try {
    await prisma.host.delete({ where: { id }});
  } catch (error) {
    console.warn("DB error on deleteHost - ignoring update", error);
  }

  revalidatePath('/');
  revalidatePath('/admin/hosts');
}

// ----- Program Actions -----
export async function createProgram(formData: FormData): Promise<void> {
  const title = formData.get('title') as string;
  const dayOfWeek = parseInt(formData.get('dayOfWeek') as string, 10);
  const startTime = formData.get('startTime') as string;
  const endTime = formData.get('endTime') as string;
  const hostName = formData.get('hostName') as string;

  try {
    await prisma.program.create({
      data: { title, dayOfWeek, startTime, endTime, hostName },
    });
  } catch (error) {
    console.warn("DB error on createProgram - ignoring update", error);
  }

  revalidatePath('/');
  revalidatePath('/admin/programming');
}

export async function deleteProgram(id: string): Promise<void> {
  try {
    await prisma.program.delete({ where: { id }});
  } catch (error) {
    console.warn("DB error on deleteProgram - ignoring update", error);
  }
  revalidatePath('/');
  revalidatePath('/admin/programming');
}

// ----- News Actions -----
export async function getNews(limit: number = 10): Promise<NewsItem[]> {
  try {
    const news = await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
      take: limit
    });
    return news as unknown as NewsItem[];
  } catch {
    return [];
  }
}

// ----- RSS Feed Actions -----
export async function getRssFeeds(): Promise<RssFeed[]> {
  try {
    const feeds = await prisma.rssFeed.findMany({
      orderBy: { name: 'asc' }
    });
    return feeds as RssFeed[];
  } catch {
    return [];
  }
}

export async function createRssFeed(formData: FormData): Promise<void> {
  const name = formData.get('name') as string;
  const url = formData.get('url') as string;
  const category = formData.get('category') as string;

  try {
    await prisma.rssFeed.create({
      data: { name, url, category, isActive: true },
    });
  } catch (error) {
    console.warn("DB error on createRssFeed - ignoring update", error);
  }

  revalidatePath('/admin/rss');
}

export async function deleteRssFeed(id: string): Promise<void> {
  try {
    await prisma.rssFeed.delete({ where: { id }});
  } catch (error) {
    console.warn("DB error on deleteRssFeed - ignoring update", error);
  }
  revalidatePath('/admin/rss');
}
