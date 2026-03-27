import { getSponsors } from '@/lib/services/data';
import { createSponsor, deleteSponsor } from '@/lib/actions/admin';
import { Sponsor } from '@/lib/types';

export default async function SponsorsPage() {
  const sponsors: Sponsor[] = await getSponsors();

  return (
    <div>
      <h2 className="text-3xl font-display font-medium text-slate-900 mb-8">Patrocinadores</h2>
      
      <form action={createSponsor} className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-8 mb-8 border border-gray-100">
        <h3 className="text-xl font-display font-medium text-gray-900 mb-6 border-b border-gray-100 pb-4">Novo Patrocinador</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Nome da Empresa</label>
            <input required type="text" name="name" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">URL Logo (Imagem)</label>
            <input type="url" name="logo" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Website (Url)</label>
            <input type="url" name="website" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" placeholder="https://..." />
          </div>
        </div>
        <button type="submit" className="mt-8 group relative inline-flex justify-center py-4 px-8 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-[1.02] active:scale-[0.98]">
          Adicionar Patrocinador
        </button>
      </form>

      <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden rounded-2xl border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {sponsors.map((s: Sponsor) => (
            <li key={s.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-6">
                {s.logo ? (
                  <img src={s.logo} alt={s.name} className="h-12 w-32 object-contain bg-white rounded-lg border border-gray-100 p-2 shadow-sm" />
                ) : (
                  <div className="h-12 w-32 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-xs text-gray-400 font-medium">Sem Logo</div>
                )}
                <div>
                  <p className="text-lg font-display font-medium text-gray-900">{s.name}</p>
                  {s.website && (
                      <a href={s.website} target="_blank" rel="noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-1 block">{s.website}</a>
                  )}
                </div>
              </div>
              <form action={deleteSponsor.bind(null, s.id)}>
                <button type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors self-start md:self-auto">
                  Excluir
                </button>
              </form>
            </li>
          ))}
          {sponsors.length === 0 && <li className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl m-4 text-gray-500 font-medium">Nenhum patrocinador cadastrado.</li>}
        </ul>
      </div>
    </div>
  );
}
