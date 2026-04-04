'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Email ou senha inválidos.');
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary concrete-texture">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-sm animate-fade-in-up relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl mb-2">Imóveis <span className="italic-serif">Capão Novo</span></h1>
          <p className="text-primary/60 text-sm font-sans uppercase tracking-[0.1em]">Painel Administrativo</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-sm border-l-4 border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-primary/70 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant focus:border-secondary focus:ring-0 outline-none transition-all font-sans text-primary rounded-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.1em] text-primary/70 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant focus:border-secondary focus:ring-0 outline-none transition-all font-sans text-primary rounded-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Acessar Painel"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button" 
            onClick={() => router.push('/')}
            className="text-xs font-bold uppercase tracking-[0.1em] text-primary/40 hover:text-secondary transition-all"
          >
            Voltar para o site
          </button>
        </div>
      </div>
    </div>
  );
}
