import { getSponsors } from '@/lib/services/data';
import { createSponsor, deleteSponsor, updateSponsor } from '@/lib/actions/admin';
import { Sponsor } from '@/lib/types';

const inputClassName =
  'mt-2 block w-full rounded-xl border border-gray-200 bg-slate-50 p-4 text-slate-900 shadow-inner transition-colors focus:border-primary focus:bg-white focus:ring-primary sm:text-sm';

export default async function SponsorsPage() {
  const sponsors: Sponsor[] = await getSponsors();

  return (
    <div>
      <h2 className="mb-8 text-3xl font-display font-medium text-slate-900">Patrocinadores</h2>

      <form action={createSponsor} className="mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
        <h3 className="mb-6 border-b border-gray-100 pb-4 text-xl font-display font-medium text-gray-900">Novo Patrocinador</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700">Nome da Empresa</label>
            <input required type="text" name="name" className={inputClassName} />
          </div>
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700">URL Logo (Imagem)</label>
            <input type="url" name="logo" className={inputClassName} placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold uppercase tracking-wide text-slate-700">Website (URL)</label>
            <input type="url" name="website" className={inputClassName} placeholder="https://..." />
          </div>
        </div>
        <button type="submit" className="mt-8 inline-flex w-full justify-center rounded-xl border border-transparent bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(255,184,0,0.2)] transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white active:scale-[0.98] sm:w-auto">
          Adicionar Patrocinador
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <ul className="divide-y divide-gray-100">
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="p-5 transition-colors hover:bg-slate-50 sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-32 shrink-0 rounded-lg border border-gray-100 bg-white object-contain p-2 shadow-sm" />
                  ) : (
                    <div className="flex h-12 w-32 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-xs font-medium text-gray-400">Sem Logo</div>
                  )}
                  <div className="min-w-0">
                    <p className="break-words text-lg font-display font-medium text-gray-900">{sponsor.name}</p>
                    {sponsor.website && (
                      <a href={sponsor.website} target="_blank" rel="noreferrer" className="mt-1 block break-all text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">{sponsor.website}</a>
                    )}
                  </div>
                </div>
                <form action={deleteSponsor.bind(null, sponsor.id)}>
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
                <form action={updateSponsor.bind(null, sponsor.id)} className="mt-4 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">Nome da Empresa</label>
                    <input required type="text" name="name" defaultValue={sponsor.name} className={inputClassName} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">URL Logo</label>
                    <input type="url" name="logo" defaultValue={sponsor.logo || ''} className={inputClassName} placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-700">Website</label>
                    <input type="url" name="website" defaultValue={sponsor.website || ''} className={inputClassName} placeholder="https://..." />
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
          {sponsors.length === 0 && <li className="m-4 rounded-xl border-2 border-dashed border-gray-200 p-8 text-center font-medium text-gray-500">Nenhum patrocinador cadastrado.</li>}
        </ul>
      </div>
    </div>
  );
}
