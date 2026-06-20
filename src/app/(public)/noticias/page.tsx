import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getLatestNews } from '@/lib/services/data';
import { NewsItem } from '@/lib/types';

export const revalidate = 60; // 60 seconds ISR revalidation

export default async function NoticiasPage() {
  const news = await getLatestNews(40) as NewsItem[];

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 md:pt-36 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Cobertura completa</span>
          <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight text-balance">
            Todas as notícias.
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto text-balance">
            Acompanhe o que é destaque na região, no Brasil e no mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item: NewsItem) => (
            <article
              key={item.id}
              className="group bg-surface rounded-3xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/40 transition-colors"
            >
              <div className="h-48 bg-background/60 relative overflow-hidden">
                <img
                  src={item.image || '/images/news-placeholder.svg'}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {item.source}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-muted mb-2 font-medium">
                  {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2 line-clamp-2 leading-tight">
                  <Link href={`/noticias/${item.slug}`} className="group-hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-muted text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
                  {item.description || 'Resumo não disponível.'}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link
                    href={`/noticias/${item.slug}`}
                    className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:gap-2 transition-all"
                  >
                    Ler matéria completa
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center py-20 text-muted">
            Nenhuma notícia encontrada no momento.
          </div>
        )}
      </div>
    </div>
  );
}
