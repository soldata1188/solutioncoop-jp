'use client';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';

export default function LeadMagnet() {
  const [form, setForm] = useState({ name: '', company: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Show sticky bar when user scrolls past the lead magnet section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('lead-magnet');
      if (!section || dismissed || downloaded) return;
      const rect = section.getBoundingClientRect();
      // Show sticky when section is scrolled past (above viewport)
      setShowSticky(rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed, downloaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, resource: 'ikusei-shuro-guide' }),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
      setDownloaded(true);
      trackEvent('lead_magnet', { event_label: 'ikusei_shuro_guide', event_category: 'conversion' });
      // Open PDF in new tab
      window.open('/documents/ikusei-shuro-guide.pdf', '_blank');
    } catch {
      setStatus('error');
    }
  };

  const scrollToSection = () => {
    document.getElementById('lead-magnet')?.scrollIntoView({ behavior: 'smooth' });
    setDismissed(false);
    trackEvent('lead_magnet', { event_label: 'sticky_bar_click', event_category: 'engagement' });
  };

  return (
    <>
      {/* ===== Lead Magnet Section ===== */}
      <section id="lead-magnet" className="py-16 md:py-24 relative overflow-hidden bg-[#1e40af] mt-10 rounded md:rounded-none">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-[#0f172a] opacity-40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#1e40af]/40 to-[#f97316]/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-10 items-center">

              {/* Left — Content */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-[#f97316] text-white font-black tracking-widest uppercase text-[10px] md:text-xs px-4 py-1.5 mb-5 rounded shadow-sm">
                  <span className="w-1.5 h-1.5 bg-white rounded animate-ping"></span>
                  無料ダウンロード (Miễn phí)
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight drop-shadow-md">
                  育成就労制度<br className="hidden md:block" />
                  <span className="text-orange-400">まるわかりガイド</span>
                </h2>
                <p className="text-sm md:text-base text-blue-100 leading-relaxed mb-8 opacity-90 border-l-4 border-orange-400 pl-4 font-medium">
                  2027年より本格施行される<strong className="text-white">育成就労制度</strong>。技能実習制度との違い、転籍ルール、企業が今すべき準備を
                  <strong className="text-orange-400 border-b border-orange-400 mx-1">5分で読める無料ガイド</strong>にまとめました。
                </p>
                <ul className="space-y-4 mb-4">
                  {[
                    '新制度の全体像と移行スケジュール',
                    '技能実習との7つの違い（比較表付き）',
                    '受入企業が今やるべき3つの準備',
                    '監理支援機関の選び方チェックリスト',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm md:text-base text-white font-bold bg-white/10 px-4 py-2.5 rounded backdrop-blur-sm border border-white/5">
                      <span className="flex items-center justify-center w-5 h-5 rounded bg-green-500 text-white text-[10px] shadow-sm flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-blue-200 mt-6 flex items-center gap-2">
                  <span className="text-lg">📄</span> PDF形式・全12ページ・完全無料
                </p>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-5 relative">
                {/* Book graphic illusion */}
                <div className="absolute -top-6 -left-6 z-0 w-full h-full bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded transform -rotate-3 opacity-20 blur-sm pointer-events-none hidden md:block"></div>
                
                <div className="bg-white rounded p-7 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10 border-t-4 border-[#f97316]">
                  {status === 'ok' ? (
                    <div className="text-center py-10 animate-fade-in">
                      <div className="w-20 h-20 bg-green-50 rounded flex items-center justify-center mx-auto mb-5">
                        <p className="text-4xl">🎉</p>
                      </div>
                      <h3 className="text-xl font-black text-[#1e40af] mb-3">ダウンロード準備完了</h3>
                      <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                        PDFが新しいタブで開きます。<br />
                        開かない場合は下のボタンをクリックしてください。
                      </p>
                        <a
                          href="/"
                          className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-white font-black py-4 px-8 rounded transition shadow-lg hover:-translate-y-1"
                        >
                        ✉️ サイトへ戻る
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="relative">
                      <h3 className="text-xl md:text-2xl font-black text-[#1e40af] mb-2 text-center tracking-tight">無料相談を受け付ける</h3>
                      <p className="text-[11px] text-gray-500 mb-6 text-center font-bold bg-gray-50 py-2 rounded">以下を入力して「送信」を押してください</p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-black text-gray-500 mb-1.5 uppercase tracking-wider">
                            お名前 <span className="text-[#f97316]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="田中 太郎"
                            className="w-full border-2 border-gray-200 rounded px-4 py-3 text-sm focus:border-[#1e40af] focus:ring-0 outline-none transition-colors font-medium text-gray-800 bg-gray-50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-500 mb-1.5 uppercase tracking-wider">
                            会社名
                          </label>
                          <input
                            type="text"
                            value={form.company}
                            onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                            placeholder="株式会社○○"
                            className="w-full border-2 border-gray-200 rounded px-4 py-3 text-sm focus:border-[#1e40af] focus:ring-0 outline-none transition-colors font-medium text-gray-800 bg-gray-50 focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-black text-gray-500 mb-1.5 uppercase tracking-wider">
                            メールアドレス <span className="text-[#f97316]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="info@example.co.jp"
                            className="w-full border-2 border-gray-200 rounded px-4 py-3 text-sm focus:border-[#1e40af] focus:ring-0 outline-none transition-colors font-medium text-gray-800 bg-gray-50 focus:bg-white"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full mt-7 bg-[#f97316] hover:bg-[#ea580c] disabled:bg-gray-400 text-white font-black py-4 px-6 rounded shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition hover:-translate-y-1 flex items-center justify-center gap-2 text-base md:text-lg"
                      >
                        {status === 'sending' ? (
                          <>⏳ 送信中...</>
                        ) : (
                          <>✉️ 今すぐ無料相談</>
                        )}
                      </button>
                      {status === 'error' && (
                        <p className="text-red-500 text-xs mt-3 text-center font-bold">通信エラーが発生しました。再度お試しください。</p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-4 text-center leading-relaxed">
                        ※ご入力いただいた情報は資料送付・ご連絡のみに使用し、<br className="hidden lg:block"/>第三者に提供することはございません。
                      </p>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== Sticky Bottom Bar (HIDDEN ON MOBILE to avoid conflict with FloatingCTA) ===== */}
      {showSticky && !dismissed && !downloaded && (
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-40 bg-[#1e40af]/95 backdrop-blur-md border-t-2 border-[#f97316] shadow-[0_-10px_30px_rgba(0,0,0,0.2)] transform transition-transform duration-300 animate-slideUp">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="flex items-center justify-center w-10 h-10 bg-white/10 rounded text-xl flex-shrink-0">📄</span>
              <div className="min-w-0">
                <p className="text-white font-black text-sm truncate tracking-wide">育成就労制度まるわかりガイド</p>
                <p className="text-orange-300 text-[11px] font-bold mt-0.5">無料PDF大公開 — 新制度への移行準備はこれ一冊で完了</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={scrollToSection}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-2.5 px-6 text-sm rounded shadow-md transition-all hover:scale-105"
              >
                ✉️ 無料相談
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/50 hover:text-white w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition"
                aria-label="閉じる"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
