import { getHosts } from '@/lib/services/data';

export default async function HostsPage() {
  const hosts = await getHosts();

  return (
    <div>
      <h2 className="text-3xl font-display font-medium text-slate-900 mb-8">Equipe de Locutores</h2>
      
      <form className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-8 mb-8 border border-gray-100">
        <h3 className="text-xl font-display font-medium text-gray-900 mb-6 border-b border-gray-100 pb-4">Adicionar Locutor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Nome</label>
            <input required type="text" name="name" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">URL Avatar (Foto)</label>
            <input type="url" name="avatar" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Mini Biografia</label>
            <textarea name="bio" rows={3} className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" placeholder="A voz das manhãs..." />
          </div>
        </div>
        <button type="submit" className="mt-8 group relative inline-flex justify-center py-4 px-8 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-[1.02] active:scale-[0.98]">
          Salvar Locutor
        </button>
      </form>

      <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden rounded-2xl border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {hosts.map((h) => (
            <li key={h.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-6">
                {h.avatar ? (
                  <img src={h.avatar} alt={h.name} className="h-16 w-16 rounded-full object-cover shadow-sm bg-gray-100 border-2 border-white" />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-bold text-2xl shadow-sm">
                    {h.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-lg font-display font-medium text-gray-900">{h.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-2 max-w-[400px] mt-1">{h.bio}</p>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors self-start md:self-auto">Excluir</button>
            </li>
          ))}
          {hosts.length === 0 && <li className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl m-4 text-gray-500 font-medium">Nenhum locutor cadastrado.</li>}
        </ul>
      </div>
    </div>
  );
}
