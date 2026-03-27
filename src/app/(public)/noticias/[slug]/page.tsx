import { getNewsBySlug, getLatestNews } from '@/lib/services/data';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/lib/types';

export async function generateStaticParams() {
  const news = await getLatestNews(50) as NewsItem[];
  return news.map((item: NewsItem) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getNewsBySlug(params.slug);
  if (!article) return { title: 'Notícia não encontrada' };

  return {
    title: `${article.title} | TurismoFM`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
      type: 'article',
      publishedTime: new Date(article.publishedAt).toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    }
  };
}

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = await getNewsBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-10 text-center">
          <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wider mb-4">
            {article.source}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          <p className="text-gray-500">
            Publicado em {new Date(article.publishedAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
          </p>
        </div>

        {article.image && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}

        <div className="mx-auto mb-12 text-lg leading-relaxed text-gray-800 md:text-xl">
          {/* We use description here since we don't store full content in the DB, just the sanitized snippet */}
          <p>{article.description || 'Resumo não disponível.'}</p>
        </div>

        {article.url && (
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-6 font-medium text-lg">
              Quer ler os detalhes completos na fonte original?
            </p>
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-black hover:bg-gray-800 shadow-md hover:shadow-lg transition-all"
            >
              Acessar matéria no parceiro {article.source} ↗
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
