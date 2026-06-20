import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getNewsBySlug, getLatestNews } from '@/lib/services/data';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/lib/types';

export const revalidate = 60; // 60 seconds ISR revalidation

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
    <article className="bg-background text-foreground min-h-screen pt-28 md:pt-36 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/noticias" className="inline-flex items-center gap-1 text-muted hover:text-primary transition-colors text-sm font-medium mb-10">
          <ArrowLeft size={16} />
          Voltar para notícias
        </Link>

        <div className="mb-10 text-center">
          <span className="inline-block bg-primary/90 text-black rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
            {article.source}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-semibold tracking-tight mb-6 leading-tight text-balance">
            {article.title}
          </h1>
          <p className="text-muted text-sm">
            Publicado em {new Date(article.publishedAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
          </p>
        </div>

        {article.image && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-white/5">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}

        <div className="mx-auto mb-12 text-lg leading-relaxed text-white/80 md:text-xl">
          {/* We use description here since we don't store full content in the DB, just the sanitized snippet */}
          <p>{article.description || 'Resumo não disponível.'}</p>
        </div>

        {article.url && (
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-muted mb-6 font-medium text-lg">
              Quer ler os detalhes completos na fonte original?
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-full text-black bg-primary hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,184,0,0.3)] transition-transform"
            >
              Acessar matéria no parceiro {article.source}
              <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
