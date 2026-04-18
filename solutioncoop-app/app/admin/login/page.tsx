'use client';
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get('from') ?? '/admin';

  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [show,     setShow]     = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'ログインに失敗しました');
      setPassword('');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg,#172554 0%,#1e3a8a 55%,#1e40af 100%)' }}>
      {/* bg decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-dark to-navy px-8 py-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-xl font-black">管理画面へのログイン</h1>
            <p className="text-blue-200 text-sm mt-1">ソリューション協同組合</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">
                管理者パスワード
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  required
                  autoFocus
                  className="w-full border-2 border-gray-200 rounded px-4 py-3.5 pr-12 text-sm focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/15 transition"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {show ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 rounded px-4 py-3 text-sm font-semibold flex items-center gap-2">
                ❌ {error}
              </div>
            )}

            <button type="submit" disabled={loading || !password}
              className="w-full bg-accent hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="animate-spin">⏳</span> ログイン中...</>
              ) : (
                <>🚪 ログインする</>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 pt-2">
              セッションは8時間後に自動的に切れます
            </p>
          </form>
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-4">
          &copy; 2024 ソリューション協同組合
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
