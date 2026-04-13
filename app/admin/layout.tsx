'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/admin',          icon: '📊', label: 'ダッシュボード' },
  { href: '/admin/news',     icon: '📰', label: '最新情報管理' },
  { href: '/admin/news/new', icon: '✏️', label: '新規投稿' },
];

const SITE_LINKS = [
  { href: '/',     icon: '🌐', label: '公開サイトを見る', external: true },
  { href: '/news', icon: '📋', label: 'お知らせページ', external: true },
];

const BOTTOM_LINKS = [
  { href: '/admin/contacts', icon: '📬', label: 'お問い合わせ' },
  { href: '/admin/trash',    icon: '🗑️', label: 'ゴミ箱' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  const currentYear = new Date().getFullYear();

  // Sidebar content — shared between desktop & mobile
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <a href="/" target="_blank" rel="noreferrer" className="block">
          <p className="text-white font-black text-base leading-tight">ソリューション協同組合</p>
          <p className="text-blue-300 text-[10px] mt-1">管理画面 Admin Panel</p>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-3 mb-2">メニュー</p>
        {NAV_ITEMS.map(l => (
          <a key={l.href} href={l.href}
            onClick={() => setSidebarOpen(false)}
            className={`admin-nav-link ${isActive(l.href) ? 'active' : ''}`}>
            <span className="text-lg">{l.icon}</span>{l.label}
          </a>
        ))}

        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-3 mb-2 mt-6">サイト</p>
        {SITE_LINKS.map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="admin-nav-link">
            <span className="text-lg">{l.icon}</span>{l.label}
          </a>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {BOTTOM_LINKS.map(l => (
          <a key={l.href} href={l.href}
            onClick={() => setSidebarOpen(false)}
            className={`admin-nav-link ${isActive(l.href) ? 'active' : ''}`}>
            <span className="text-lg">{l.icon}</span>{l.label}
          </a>
        ))}
        <button onClick={handleLogout}
          className="admin-nav-link w-full text-left text-red-300 hover:text-red-200 hover:bg-red-900/30 mt-2">
          <span className="text-lg">🚪</span>ログアウト
        </button>
        <p className="text-[10px] text-blue-500 px-3 pt-2">&copy; {currentYear} ソリューション協同組合</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <div className="flex h-screen overflow-hidden">

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden md:flex w-64 flex-shrink-0 border-r border-white/10 flex-col overflow-y-auto"
          style={{ background: 'linear-gradient(180deg,#172554 0%,#1e3a8a 100%)' }}>
          {sidebarContent}
        </aside>

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            {/* Sidebar */}
            <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col overflow-y-auto"
              style={{ background: 'linear-gradient(180deg,#172554 0%,#1e3a8a 100%)' }}>
              {/* Close button */}
              <button onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10 transition">
                ✕
              </button>
              {sidebarContent}
            </aside>
          </div>
        )}

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* Mobile top bar */}
          <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="text-navy p-1" aria-label="メニュー">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <p className="text-sm font-bold text-gray-800">ソリューション管理画面</p>
            <button onClick={handleLogout} className="text-red-500 text-xs font-bold">ログアウト</button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
