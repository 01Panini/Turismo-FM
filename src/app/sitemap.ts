import { MetadataRoute } from 'next'
import { getLatestNews } from '@/lib/services/data'
import { NewsItem } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://turismofm.com.br'

  // Fetch the latest 500 news articles for the sitemap
  const latestNews = await getLatestNews(500)

  const newsUrls = latestNews.map((news: NewsItem) => ({
    url: `${baseUrl}/noticias/${news.slug}`,
    lastModified: new Date(news.publishedAt),
    changeFrequency: 'never' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    ...newsUrls,
  ]
}
