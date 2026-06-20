'use client';
import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginClient() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get('from') ?? '/admin/news';

  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [show,     setShow]     = useState(false);
  const [focused,  setFocused]  = useState(false);

  const isFloating = focused || password.length > 0;

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
      setError(data.error ?? 'パスワードが正しくありません');
      setPassword('');
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">

      {/* Organization name */}
      <div className="mb-8 flex flex-col items-center" style={{ gap: 10 }}>
        {/* Badge mark */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: '#1a56db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(26,86,219,0.25)',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Name */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', letterSpacing: 1, lineHeight: 1.3, margin: 0 }}>
            ソリューション協同組合
          </p>
          <p style={{ fontSize: 11, color: '#6b7280', marginTop: 4, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 500 }}>
            Admin Portal
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full" style={{ maxWidth: 360 }}>
        <div className="rounded-2xl px-8 py-8" style={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>

          <h1 className="text-[22px] font-normal text-gray-800 text-center mb-1">ログイン</h1>
          <p className="text-[13px] text-gray-500 text-center mb-7">管理者アカウントでサインイン</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Password — floating label */}
            <div className="relative">
              <input
                id="pw"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required
                autoFocus
                autoComplete="current-password"
                style={{
                  width: '100%',
                  borderRadius: 6,
                  border: `1.5px solid ${focused ? '#1a73e8' : error ? '#d32f2f' : '#dadce0'}`,
                  boxShadow: focused ? '0 0 0 3px rgba(26,115,232,0.12)' : 'none',
                  padding: '22px 44px 8px 12px',
                  fontSize: 15,
                  color: '#202124',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                  display: 'block',
                }}
              />
              <label
                htmlFor="pw"
                style={{
                  position: 'absolute',
                  left: 12,
                  top: isFloating ? 6 : '50%',
                  transform: isFloating ? 'none' : 'translateY(-50%)',
                  fontSize: isFloating ? 11 : 15,
                  color: focused ? '#1a73e8' : error ? '#d32f2f' : '#5f6368',
                  fontWeight: isFloating ? 500 : 400,
                  lineHeight: 1.2,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  transition: 'top 0.15s, font-size 0.15s, color 0.15s, transform 0.15s',
                }}
              >
                パスワード
              </label>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShow(s => !s)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#5f6368', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
              >
                {show ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#d32f2f', fontSize: 13 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginTop: 1, flexShrink: 0 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
              <button
                type="submit"
                disabled={loading || !password}
                style={{
                  background: '#1a73e8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '10px 28px',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: loading || !password ? 'not-allowed' : 'pointer',
                  opacity: loading || !password ? 0.55 : 1,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  transition: 'opacity 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                      <path fill="white" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
                    </svg>
                    確認中...
                  </>
                ) : 'ログイン'}
              </button>
            </div>

          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9aa0a6', marginTop: 20 }}>
          セッションは8時間後に自動的に切れます
        </p>
      </div>

      {/* Footer */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="/privacy" target="_blank" style={{ fontSize: 12, color: '#5f6368', textDecoration: 'none' }}>プライバシーポリシー</a>
          <a href="/disclosure" target="_blank" style={{ fontSize: 12, color: '#5f6368', textDecoration: 'none' }}>利用規約</a>
        </div>
        <p style={{ fontSize: 12, color: '#9aa0a6', margin: 0 }}>© {new Date().getFullYear()} ソリューション協同組合</p>
      </div>

    </div>
  );
}
