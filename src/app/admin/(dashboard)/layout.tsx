import { ReactNode } from 'react';
import Link from 'next/link';
import { logoutAction } from '@/lib/actions/auth';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-background border-r border-white/10 flex flex-col relative overflow-hidden">
        {/* Decorative ambient background matching login */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 z-0" />
        
        <div className="p-8 relative z-10">
          <img src="/logo.png" alt="Logo Turismo FM" className="h-12 w-auto mb-8 object-contain drop-shadow-[0_0_15px_rgba(255,184,0,0.5)]" />
          <h1 className="text-xl font-display font-medium tracking-wide text-white">Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-widest">Management Console</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 relative z-10 flex flex-col">
          <Link href="/admin/stream" className="block px-5 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm tracking-wide text-gray-300 hover:text-white">
            Streaming & App
          </Link>
          <Link href="/admin/programming" className="block px-5 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm tracking-wide text-gray-300 hover:text-white">
            Programação
          </Link>
          <Link href="/admin/hosts" className="block px-5 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm tracking-wide text-gray-300 hover:text-white">
            Locutores
          </Link>
          <Link href="/admin/sponsors" className="block px-5 py-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm tracking-wide text-gray-300 hover:text-white">
            Patrocinadores
          </Link>
          
          <div className="my-4 border-t border-white/10 mx-2" />
          
          <Link href="/admin/rss" className="block px-5 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all text-sm tracking-wide flex items-center gap-3 text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Notícias RSS
          </Link>
        </nav>

        <div className="p-6 mt-auto border-t border-white/10 relative z-10">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest font-mono text-xs"
            >
              Sair / Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
