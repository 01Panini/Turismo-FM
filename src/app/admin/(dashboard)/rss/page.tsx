import { getRssFeeds } from '@/lib/actions/admin';
import { createRssFeed, deleteRssFeed } from '@/lib/actions/admin';

export default async function RssFeedsPage() {
  const feeds = await getRssFeeds();

  return (
    <div>
      <h2 className="text-3xl font-display font-medium text-slate-900 mb-8">Notícias RSS (Fontes)</h2>
      
      <form action={createRssFeed} className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-8 mb-8 border border-gray-100">
        <h3 className="text-xl font-display font-medium text-gray-900 mb-6 border-b border-gray-100 pb-4">Nova Fonte RSS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Nome</label>
            <input required type="text" name="name" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" placeholder="Ex: G1 Região" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Sessão da Home</label>
            <select required name="category" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900 appearance-none">
              <option value="REGIONAL">Notícias Locais (Região)</option>
              <option value="MUNDO">Brasil, Mundo e Famosos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">URL do RSS</label>
            <input required type="url" name="url" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" placeholder="https://..." />
          </div>
        </div>
        <button type="submit" className="mt-8 group relative inline-flex justify-center py-4 px-8 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-[1.02] active:scale-[0.98]">
          Adicionar Fonte
        </button>
      </form>

      <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden rounded-2xl border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {feeds.map((f: { id: string, name: string, url: string, category: string, isActive: boolean }) => (
            <li key={f.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-lg font-display font-medium text-gray-900 flex items-center gap-3">
                    {f.name}
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">{f.category}</span>
                    {f.isActive ? (
                       <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">Ativo</span>
                    ) : (
                       <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-bold uppercase tracking-wide">Inativo</span>
                    )}
                  </p>
                  <a href={f.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-1 block">{f.url}</a>
                </div>
              </div>
              <form action={deleteRssFeed.bind(null, f.id)}>
                <button type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors self-start md:self-auto">Excluir</button>
              </form>
            </li>
          ))}
          {feeds.length === 0 && <li className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl m-4 text-gray-500 font-medium">Nenhuma fonte RSS cadastrada. A automação está globalmente inativa!</li>}
        </ul>
      </div>
    </div>
  );
}
