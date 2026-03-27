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
