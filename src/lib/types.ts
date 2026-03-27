export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  source: string;
  category: string;
  url: string;
  publishedAt: Date | string;
  createdAt?: Date | string;
}

export interface Host {
  id: string;
  name: string;
  bio: string | null;
  avatar: string | null;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string | null;
  website: string | null;
}

export interface Program {
  id: string;
  title: string;
  dayOfWeek: number;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  hostName: string;
  live?: boolean;
}

export interface Setting {
  id: string;
  streamUrl: string | null;
  instagramUrl: string | null;
  contactEmail: string | null;
}

export interface RssFeed {
  id: string;
  name: string;
  url: string;
  category: string;
  isActive: boolean;
}
