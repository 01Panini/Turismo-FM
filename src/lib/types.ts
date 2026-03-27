import { 
    News as PrismaNews, 
    Host as PrismaHost, 
    Program as PrismaProgram, 
    Sponsor as PrismaSponsor, 
    Setting as PrismaSetting, 
    RssFeed as PrismaRssFeed 
} from '@prisma/client';

export type NewsItem = {
    id: PrismaNews['id'];
    title: PrismaNews['title'];
    slug: PrismaNews['slug'];
    description: PrismaNews['description'];
    image: PrismaNews['image'];
    source: PrismaNews['source'];
    category: PrismaNews['category'];
    url: PrismaNews['url'];
    publishedAt: PrismaNews['publishedAt'] | string; // Handle ISO string fallback
    createdAt?: PrismaNews['createdAt'] | string;
};

export type Host = {
    id: PrismaHost['id'];
    name: PrismaHost['name'];
    bio: PrismaHost['bio'];
    avatar: PrismaHost['avatar'];
};

export type Sponsor = {
    id: PrismaSponsor['id'];
    name: PrismaSponsor['name'];
    logo: PrismaSponsor['logo'];
    website: PrismaSponsor['website'];
};

export type Program = {
    id: PrismaProgram['id'];
    title: PrismaProgram['title'];
    dayOfWeek: PrismaProgram['dayOfWeek'];
    startTime: PrismaProgram['startTime'];
    endTime: PrismaProgram['endTime'];
    hostName: PrismaProgram['hostName'];
    live?: boolean;
};

export type Setting = {
    id: PrismaSetting['id'];
    streamUrl: PrismaSetting['streamUrl'];
    instagramUrl: PrismaSetting['instagramUrl'];
    contactEmail: PrismaSetting['contactEmail'];
};

export type RssFeed = {
    id: PrismaRssFeed['id'];
    name: PrismaRssFeed['name'];
    url: PrismaRssFeed['url'];
    category: PrismaRssFeed['category'];
    isActive: PrismaRssFeed['isActive'];
};
