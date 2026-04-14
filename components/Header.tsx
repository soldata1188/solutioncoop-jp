'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLP = pathname === '/lp';

  const navLinks = isLP ? [
    { href: '#countries', label: '厳選3カ国' },
    { href: '#flow',      label: '受入の流れ' },
    { href: '/simulation', label: '費用シミュレーション' },
    { href: '#faq',       label: 'よくある質問' },
    { href: '/support',   label: '相談窓口' },
  ] : [
    { href: '/#news',       label: '最新情報' },
    { href: '/about',       label: '組合概要' },
    { href: '/#strengths',  label: '選ばれる理由' },
    { href: '/#faq',        label: 'よくある質問' },
    { href: '/support',     label: '相談窓口' },
  ];

  return (
    <header className={`fixed w-full z-50 top-0 transition-all duration-300 border-b border-gray-100 ${scrolled ? 'bg-white/95 backdrop-blur-sm' : 'bg-white'}`}>
      {/* Progress bar */}
      <div id="progress" className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-accent to-accent-lt z-50" style={{width:'0%'}} />

      <div className="container mx-auto px-4 h-16 md:h-20 flex justify-between items-center gap-2">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center flex-shrink-0 group">
          <span className="text-base md:text-xl font-black text-navy leading-tight block whitespace-nowrap group-hover:text-navy-dark transition">
            ソリューション協同組合
          </span>
          <span className="text-[10px] md:text-xs text-gray-500 mt-0.5 block">
            一般監理事業(優良) 許可 | 大阪府堺市
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-gray-600" aria-label="メインナビ">
          {navLinks.filter(l => l.label !== '相談窓口').map(l => (
            <Link key={l.href} href={l.href}
              className="hover:text-navy px-3 py-2 rounded-lg hover:bg-blue-50 transition-all whitespace-nowrap">
              {l.label}
            </Link>
          ))}
          
          <Link href="/support"
            className="text-accent font-bold border-2 border-accent px-3 py-1.5 rounded hover:bg-accent hover:text-white transition ml-4 whitespace-nowrap">
            相談窓口
          </Link>

          {isLP ? (
            <Link href="#lead-form"
              className="bg-accent text-white font-bold px-4 py-2 rounded hover:bg-[#ea580c] shadow-sm transition ml-2 whitespace-nowrap">
              無料ダウンロード
            </Link>
          ) : (
            <Link href="/about#disclosure"
              className="text-accent font-bold border-2 border-accent px-3 py-1.5 rounded hover:bg-accent hover:text-white transition ml-2 whitespace-nowrap">
              情報公開
            </Link>
          )}
        </nav>

        {/* Right: phone + hamburger */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <div className="hidden md:flex flex-col items-end mr-1">
            <p className="text-[10px] text-gray-400">お急ぎの方はお電話で</p>
            <a href="tel:0722248067" className="text-lg font-bold text-navy hover:text-navy-light transition flex items-center whitespace-nowrap">
              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              072-224-8067
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-3 text-navy focus:outline-none" aria-label="メニュー">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.filter(l => l.label !== '相談窓口').map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-bold p-4 hover:bg-gray-50 rounded-lg">
                {l.label}
              </Link>
            ))}

            <div className="pt-2 space-y-3">
              <Link href="/support" onClick={() => setMenuOpen(false)}
                className="block text-center text-white bg-accent font-black p-4 hover:bg-[#ea580c] rounded shadow-md ring-2 ring-orange-300 ring-offset-2">
                📢 相談窓口 (24h Support)
              </Link>

              {isLP ? (
                <Link href="#lead-form" onClick={() => setMenuOpen(false)}
                  className="block text-center text-white bg-accent font-bold p-4 hover:bg-[#ea580c] rounded shadow-sm">
                  資料を無料でダウンロード
                </Link>
              ) : (
                <Link href="/about#disclosure" onClick={() => setMenuOpen(false)}
                  className="block text-accent font-bold p-4 border-2 border-accent text-center rounded hover:bg-orange-50">
                  情報公開
                </Link>
              )}
            </div>

            <div className="pt-4">
              <a href="tel:0722248067"
                className="flex items-center justify-center w-full text-navy font-bold py-4 border-2 border-navy rounded hover:bg-blue-50 transition shadow-sm">
                📞 072-224-8067
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
