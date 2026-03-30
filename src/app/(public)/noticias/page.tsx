import { getLatestNews } from '@/lib/services/data';
import { NewsItem } from '@/lib/types';

export const revalidate = 60; // 60 seconds ISR revalidation

export default async function NoticiasPage() {
  const news = await getLatestNews(40) as NewsItem[];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">Todas as Notícias</h1>
          <p className="mt-4 text-xl text-gray-500">
            Acompanhe o que é destaque na região, no Brasil e no mundo.
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item: NewsItem) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 italic">Sem imagem</div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider shadow">
                    {item.source}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  <a href={`/noticias/${item.slug}`} className="hover:text-blue-600 transition-colors">
                    {item.title}
                  </a>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {item.description || "Resumo não disponível."}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <a href={`/noticias/${item.slug}`} className="text-blue-600 font-medium text-sm hover:underline">
                    Ler matéria completa →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {news.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nenhuma notícia encontrada no momento.
          </div>
        )}
      </div>
    </div>
  );
}
