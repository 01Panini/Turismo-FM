import { getSettings } from '@/lib/services/data';
import { updateSettings } from '@/lib/actions/admin';

export default async function StreamSettingsPage() {
  const currentSettings = await getSettings();

  async function handleUpdate(formData: FormData) {
    'use server'
    const streamUrl = formData.get('streamUrl') as string;
    const instagramUrl = formData.get('instagramUrl') as string;
    const contactEmail = formData.get('contactEmail') as string;
    
    await updateSettings({ streamUrl, instagramUrl, contactEmail });
  }

  return (
    <div>
      <h2 className="text-3xl font-display font-medium text-slate-900 mb-8">Configurações Gerais & Streaming</h2>
      
      <form action={handleUpdate} className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">URL do Streaming (Áudio)</label>
          <input
            type="url"
            name="streamUrl"
            defaultValue={currentSettings?.streamUrl || ''}
            className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900"
            placeholder="https://stream.server.com/radio"
          />
          <p className="mt-2 text-xs text-slate-500 font-medium">A URL do servidor Icecast/Shoutcast que alimenta o player primário.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Instagram URL</label>
          <input
            type="url"
            name="instagramUrl"
            defaultValue={currentSettings?.instagramUrl || ''}
            className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">E-mail de Contato</label>
          <input
            type="email"
            name="contactEmail"
            defaultValue={currentSettings?.contactEmail || ''}
            className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900"
          />
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button
            type="submit"
            className="group relative inline-flex justify-center py-4 px-8 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
