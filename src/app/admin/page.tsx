'use client';

import { useState } from 'react';
import { loginAction } from '@/lib/actions/auth';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formData = new FormData(e.currentTarget);
      const result = await loginAction(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.success) {
        router.push('/admin/stream');
      }
    } catch (err) {
      setError('Ocorreu um erro no servidor.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-md w-full z-10">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Logo Turismo FM"
            className="h-16 md:h-20 w-auto mx-auto object-contain drop-shadow-[0_0_15px_rgba(255,184,0,0.5)] mb-6"
          />
          <h2 className="text-3xl font-display font-medium text-white tracking-wide">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-400 font-mono tracking-widest uppercase">
            Management Console
          </p>
        </div>
        
        <div className="glass-panel border border-white/10 p-8 md:p-10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-xl relative block w-full px-5 py-4 bg-white/5 border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all sm:text-sm backdrop-blur-sm"
                    placeholder="Enter Admin Password"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl text-center backdrop-blur-md">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-xl text-black bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_30px_rgba(255,184,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Validating...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
        
        <p className="text-center text-xs text-gray-600 mt-8 font-mono">
          © {new Date().getFullYear()} Turismo FM 90.3
        </p>
      </div>
    </div>
  );
}
