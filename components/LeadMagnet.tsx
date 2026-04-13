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
      <section id="lead-magnet" className="py-16 md:py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">

              {/* Left — Content */}
              <div>
                <span className="inline-block bg-green-600 text-white font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-4">
                  無料ダウンロード
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 leading-snug">
                  育成就労制度<br className="hidden md:block" />
                  <span className="text-green-600">まるわかりガイド</span>
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  2027年より本格施行される<strong>育成就労制度</strong>。技能実習制度との違い、転籍ルール、企業が今すべき準備を
                  <strong className="text-blue-800">5分で読める無料ガイド</strong>にまとめました。
                </p>
                <ul className="space-y-2 mb-4">
                  {[
                    '新制度の全体像と移行スケジュール',
                    '技能実習との7つの違い（比較表付き）',
                    '受入企業が今やるべき3つの準備',
                    '監理支援機関の選び方チェックリスト',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400">PDF形式・全12ページ・無料</p>
              </div>

              {/* Right — Form */}
              <div className="bg-white border border-gray-200 rounded p-6 md:p-8 shadow-sm">
                {status === 'ok' ? (
                  <div className="text-center py-8">
                    <p className="text-4xl mb-4">🎉</p>
                    <h3 className="text-lg font-bold text-blue-800 mb-2">ダウンロードありがとうございます</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      PDFが新しいタブで開きます。<br />
                      開かない場合は下のボタンをクリックしてください。
                    </p>
                      <a
                        href="/documents/ikusei-shuro-guide.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
                      >
                      📥 PDFを開く
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-bold text-blue-800 mb-1">無料ガイドを受け取る</h3>
                    <p className="text-xs text-gray-400 mb-5">以下を入力して「ダウンロード」を押してください</p>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                          お名前 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="田中 太郎"
                          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                          会社名
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          placeholder="株式会社○○"
                          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1">
                          メールアドレス <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="info@example.co.jp"
                          className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full mt-5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3.5 px-6 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      {status === 'sending' ? (
                        <>⏳ 送信中...</>
                      ) : (
                        <>📥 無料ダウンロード</>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-red-600 text-xs mt-2 text-center">送信に失敗しました。もう一度お試しください。</p>
                    )}
                    <p className="text-[10px] text-gray-400 mt-3 text-center">
                      ご入力いただいた情報は資料送付・ご連絡のみに使用します。
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Sticky Bottom Bar ===== */}
      {showSticky && !dismissed && !downloaded && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-900/95 backdrop-blur-sm border-t-2 border-yellow-400 shadow-2xl transform transition-transform duration-300 animate-slideUp">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-2xl flex-shrink-0">📄</span>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">育成就労制度まるわかりガイド</p>
                <p className="text-blue-300 text-xs hidden sm:block">無料PDF — 新制度の全体像を5分で把握</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={scrollToSection}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 text-sm rounded-lg transition-all shadow-sm"
              >
                無料ダウンロード
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="text-blue-400 hover:text-white p-2 transition"
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
