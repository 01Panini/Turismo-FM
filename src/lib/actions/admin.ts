'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

// ----- Settings Actions -----
export async function getAdminSettings() {
  try {
    return await prisma.setting.findFirst();
  } catch {
    console.warn("DB not connected, returning null for getAdminSettings");
    return null;
  }
}

export async function updateSettings(data: { streamUrl?: string, instagramUrl?: string, contactEmail?: string}) {
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
export async function getSponsors() {
  try {
    return await prisma.sponsor.findMany();
  } catch {
    return [];
  }
}

// ----- Host Actions -----
export async function getHosts() {
  try {
    return await prisma.host.findMany();
  } catch {
    return [];
  }
}

// ----- Program Actions -----
export async function createProgram(formData: FormData) {
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

  revalidatePath('/admin/programming');
  revalidatePath('/programacao');
}

export async function deleteProgram(id: string) {
  try {
    await prisma.program.delete({ where: { id }});
  } catch (error) {
    console.warn("DB error on deleteProgram - ignoring update", error);
  }
  revalidatePath('/admin/programming');
  revalidatePath('/programacao');
}

// ----- News Actions -----
export async function getNews(limit: number = 10) {
  try {
    return await prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
      take: limit
    });
  } catch {
    return [];
  }
}

// ----- RSS Feed Actions -----
export async function getRssFeeds() {
  try {
    return await prisma.rssFeed.findMany({
      orderBy: { name: 'asc' }
    });
  } catch {
    return [];
  }
}

export async function createRssFeed(formData: FormData) {
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

export async function deleteRssFeed(id: string) {
  try {
    await prisma.rssFeed.delete({ where: { id }});
  } catch (error) {
    console.warn("DB error on deleteRssFeed - ignoring update", error);
  }
  revalidatePath('/admin/rss');
}
