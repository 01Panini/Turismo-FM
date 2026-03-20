import { getPrograms } from '@/lib/services/data';
import { createProgram, deleteProgram } from '@/lib/actions/admin';

export default async function ProgrammingPage() {
  const programs = await getPrograms();
  const daysMap = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <div>
      <h2 className="text-3xl font-display font-medium text-slate-900 mb-8">Programação da Rádio</h2>
      
      {/* Create Form */}
      <form action={createProgram} className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-8 mb-8 border border-gray-100">
        <h3 className="text-xl font-display font-medium text-gray-900 mb-6 border-b border-gray-100 pb-4">Novo Programa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Título do Programa</label>
            <input required type="text" name="title" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Locutor</label>
            <input required type="text" name="hostName" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Dia da Semana</label>
            <select name="dayOfWeek" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900">
              {daysMap.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Hora Início</label>
              <input required type="time" name="startTime" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide">Hora Fim</label>
              <input required type="time" name="endTime" className="mt-2 block w-full rounded-xl border-gray-200 bg-slate-50 shadow-inner focus:border-primary focus:ring-primary focus:bg-white sm:text-sm p-4 border transition-colors text-slate-900" />
            </div>
          </div>
        </div>
        <button type="submit" className="mt-8 group relative inline-flex justify-center py-4 px-8 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-[1.02] active:scale-[0.98]">
          Adicionar Programa
        </button>
      </form>

      {/* List */}
      <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden rounded-2xl border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {programs.map((p) => (
            <li key={p.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="text-lg font-display font-medium text-gray-900">{p.title} <span className="text-gray-500 font-normal text-base">com {p.hostName}</span></p>
                <p className="text-sm text-gray-500 mt-1">{daysMap[p.dayOfWeek]} • {p.startTime} - {p.endTime}</p>
              </div>
              <form action={deleteProgram.bind(null, p.id)}>
                <button type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors">Excluir</button>
              </form>
            </li>
          ))}
          {programs.length === 0 && <li className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl m-4 text-gray-500 font-medium">Nenhum programa cadastrado.</li>}
        </ul>
      </div>
    </div>
  );
}
