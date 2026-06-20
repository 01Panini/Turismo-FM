import { createRssFeed, deleteRssFeed, getRssFeeds, updateRssFeed } from '@/lib/actions/admin';
import { RssFeed } from '@/lib/types';

const inputClassName =
  'mt-2 block w-full rounded-xl border border-gray-200 bg-slate-50 p-4 text-slate-900 shadow-inner transition-colors focus:border-primary focus:bg-white focus:ring-primary sm:text-sm';

export default async function RssFeedsPage() {
  const feeds: RssFeed[] = await getRssFeeds();

  return (
    <div>
      <h2 className="mb-8 text-3xl font-display font-medium text-slate-900">Notícias RSS (Fontes)</h2>

      <form action={createRssFeed} className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
        <h3 className="mb-6 border-b border-gray-100 pb-4 text-xl font-display font-medium text-gray-900">Nova Fonte RSS</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700">Nome</label>
            <input required type="text" name="name" className={inputClassName} placeholder="Ex: G1 Região" />
          </div>
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700">Seção da Home</label>
            <select required name="category" className={inputClassName + ' appearance-none'}>
              <option value="REGIONAL">Notícias Locais (Região)</option>
              <option value="MUNDO">Brasil, Mundo e Famosos</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700">URL do RSS</label>
            <input required type="url" name="url" className={inputClassName} placeholder="https://..." />
          </div>
        </div>
        <button type="submit" className="mt-8 inline-flex w-full justify-center rounded-xl border border-transparent bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,184,0,0.2)] transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white active:scale-[0.98] sm:w-auto">
          Adicionar Fonte
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <ul className="divide-y divide-gray-100">
          {feeds.map((feed) => (
            <li key={feed.id} className="p-5 transition-colors hover:bg-slate-50 sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-words text-lg font-display font-medium text-gray-900">{feed.name}</p>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">{feed.category}</span>
                    <span className={feed.isActive ? 'rounded-full bg-green-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-green-800' : 'rounded-full bg-gray-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-gray-800'}>
                      {feed.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <a href={feed.url} target="_blank" rel="noreferrer" className="mt-1 block break-all text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">{feed.url}</a>
                </div>
                <form action={deleteRssFeed.bind(null, feed.id)}>
                  <button type="submit" className="rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wide text-red-500 transition-colors hover:bg-red-50 hover:text-red-700">
                    Excluir
                  </button>
                </form>
              </div>

              <details className="group mt-4 border-t border-gray-100 pt-4">
                <summary className="w-fit cursor-pointer list-none rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wide text-amber-700 transition-colors hover:bg-amber-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="group-open:hidden">Editar</span>
                  <span className="hidden group-open:inline">Fechar edição</span>
                </summary>
                <form action={updateRssFeed.bind(null, feed.id)} className="mt-4 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">Nome</label>
                    <input required type="text" name="name" defaultValue={feed.name} className={inputClassName} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">URL do RSS</label>
                    <input required type="url" name="url" defaultValue={feed.url} className={inputClassName} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">Seção da Home</label>
                    <select required name="category" defaultValue={feed.category} className={inputClassName}>
                      <option value="REGIONAL">Notícias Locais (Região)</option>
                      <option value="MUNDO">Brasil, Mundo e Famosos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">Status</label>
                    <select name="isActive" defaultValue={String(feed.isActive)} className={inputClassName}>
                      <option value="true">Ativo</option>
                      <option value="false">Inativo</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-primary/90 sm:w-auto">
                      Salvar alterações
                    </button>
                  </div>
                </form>
              </details>
            </li>
          ))}
          {feeds.length === 0 && <li className="m-4 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center font-medium text-gray-500">Nenhuma fonte RSS cadastrada. A automação está globalmente inativa!</li>}
        </ul>
      </div>
    </div>
  );
}
