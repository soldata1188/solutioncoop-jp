'use client';
import React, { useState } from 'react';
import FaqSection from '@/components/FaqSection';
import TrackedLink from '@/components/TrackedLink';

export default function LPClientComponents() {
  const [showFeeTable, setShowFeeTable] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <>
      {/* ===== SECTION: 4 PILLARS ===== */}
      <section id="features" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-[#1e40af] mb-4">
              なぜ<span className="text-orange-500">70社以上</span>に選ばれ続けるのか
            </h2>
            <p className="text-sm text-gray-500 font-bold">— 受入企業様が実感する、4つの理由 —</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
               { 
                 title: 'コスト最適化・採用期間の短縮', 
                 sub: '低コストで人材確保',
                 icon: '📉', 
                 desc: '仲介業者を介さず、海外の教育機関から直接人材をご紹介するため、余計な紹介料はかかりません。効率的な管理体制で経費削減を実現し、企業様の利益に貢献します。' 
               },
               { 
                 title: '煩雑な手続きゼロ・完全代行', 
                 sub: '簡単手続き！安心サポート',
                 icon: '📄', 
                 desc: '新制度移行に伴う複雑な手続きもすべて当組合にお任せください。書類作成からビザ（在留資格）申請まで、専門スタッフが代行し、企業様の事務負担を劇的に軽減します。' 
               },
               { 
                 title: '多国籍で優秀な人材の厳選', 
                 sub: '3カ国対応ハイブリッド',
                 icon: '🌏', 
                 desc: 'ベトナム、インドネシア、フィリピンの3カ国から優秀な人材を紹介可能。貴社の社風や業務ニーズに合わせ、グローバルな視点から最も定着しやすい人材を提案します。' 
               },
               { 
                 title: '365日・24時間の母国語サポート', 
                 sub: '手厚いフォローで安心',
                 icon: '🤝', 
                 desc: '入社後も独自のフォロー体制を提供。生活習慣の違いからくるトラブルやメンタルケアまで母国語で対応し、外国人材の迅速な環境適応と長期定着をバックアップします。' 
               }
            ].map((p, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded border-t-4 border-[#1e40af] shadow-md hover:-translate-y-1 transition-transform">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="text-3xl bg-blue-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded text-[#1e40af] shrink-0">{p.icon}</div>
                  <div>
                    <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded inline-block mb-2">{p.sub}</span>
                    <h3 className="text-lg font-black text-[#1e40af] mb-3 leading-tight">{p.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: COST SIMULATOR HOOK ===== */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#1e40af] p-6 md:p-12 rounded shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🧮</div>
            <div className="flex-1 text-center md:text-left relative z-10">
              <span className="text-orange-400 font-bold text-xs uppercase tracking-widest border border-orange-400 px-3 py-1 rounded inline-block mb-4">無料・登録不要</span>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
                自社専用の費用を<span className="text-orange-400 font-mono text-4xl md:text-5xl mx-1 md:mx-2">30</span>秒で算出
              </h2>
              <p className="text-[12px] md:text-sm text-blue-100">特定技能・育成就労にかかる「初期費用」から「毎月の監理費」まで。国籍・業種を選ぶだけですぐにお見積りが分かります。</p>
            </div>
            <TrackedLink 
              href="/simulation" 
              eventAction="cta_click"
              eventLabel="lp_bottom_simulator"
              className="relative z-10 w-full md:w-auto bg-[#f97316] text-white font-black py-4 px-6 md:px-8 rounded shadow-lg hover:bg-[#ea580c] transition-all text-center whitespace-nowrap text-sm md:text-base"
            >
              シミュレーションを開始 ➔
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ===== JOINT FAQ SECTION ===== */}
      <FaqSection />

      {/* ===== SECTION: LEAD GENERATION FORM ===== */}
      <section id="lead-form" className="py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-9xl text-[#1e40af] pointer-events-none">💬</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block bg-orange-500 text-white font-bold tracking-widest text-[10px] px-3 py-1 rounded mb-4 shadow-sm">経営者必見・無料相談</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1e40af] mb-6">専門スタッフによる無料相談</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              貴社に最適な外国人材の受入れプランを、専任スタッフが<br className="hidden md:block"/>スピーディーにご提案いたします。
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white p-6 md:p-12 rounded border border-blue-100 shadow-xl">
            {formStatus === 'success' ? (
              <div className="text-center py-8 text-slate-800">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="text-2xl font-black mb-4 tracking-wider text-[#1e40af]">お申し込み完了</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                  ご入力いただいた情報を受け付けました。<br/>担当者より通常1営業日以内にご連絡いたします。
                </p>
                <a href="/" className="inline-block bg-[#1e40af] hover:bg-blue-800 text-white font-bold py-4 px-10 rounded shadow-lg transition-transform hover:-translate-y-1">
                  コーポレートサイトへ戻る
                </a>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#1e40af] text-[11px] font-bold mb-2 uppercase tracking-widest">
                    貴社名 <span className="text-orange-500">*</span>
                  </label>
                  <input type="text" required placeholder="株式会社〇〇" className="w-full p-4 rounded bg-gray-50 text-slate-900 border border-gray-200 outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-[#1e40af] text-[11px] font-bold mb-2 uppercase tracking-widest">
                    ご担当者名 <span className="text-orange-500">*</span>
                  </label>
                  <input type="text" required placeholder="田中 太郎" className="w-full p-4 rounded bg-gray-50 text-slate-900 border border-gray-200 outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-[#1e40af] text-[11px] font-bold mb-2 uppercase tracking-widest">
                    メールアドレス <span className="text-orange-500">*</span>
                  </label>
                  <input type="email" required placeholder="manager@example.co.jp" className="w-full p-4 rounded bg-gray-50 text-slate-900 border border-gray-200 outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-[#1e40af] text-[11px] font-bold mb-2 uppercase tracking-widest">
                    電話番号 (任意)
                  </label>
                  <input type="tel" placeholder="090-0000-0000" className="w-full p-4 rounded bg-gray-50 text-slate-900 border border-gray-200 outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all font-medium" />
                </div>
                
                <div className="pt-6">
                  <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:bg-gray-400 text-white font-black py-4 rounded shadow-lg hover:shadow-xl transition-all text-lg flex items-center justify-center gap-3 border border-[#ea580c] tracking-wide">
                    {formStatus === 'sending' ? '送信中...' : 'まずは話だけでも聞いてみる ➔'}
                  </button>
                </div>
                
                <p className="text-[10px] text-slate-400 text-center mt-6 leading-relaxed font-medium">
                  ※ご入力いただいた情報は厳重に管理され、営業目的の強引な勧誘等には使用いたしません。
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ===== FOOTER (Corporate Transparency & Trust) ===== */}
      <footer className="bg-white text-slate-800 py-16 border-t-8 border-[#1e40af]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12 border-b border-gray-200 pb-12">
            
            {/* Left: Corp Info & Badges */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-3xl font-black text-[#1e40af] tracking-wide mb-1">ソリューション協同組合</h2>
                <p className="text-[#1e40af]/60 text-xs font-bold tracking-widest uppercase">Solution Cooperative / 略称: SKK</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1 border border-[#1e40af] bg-blue-50 text-[#1e40af] text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-widest">
                  <span className="text-[#1e40af]">✔</span> 一般監理事業許可
                </span>
                <span className="inline-flex items-center gap-1 border border-orange-500 bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-widest">

                </span>
                <span className="inline-flex items-center gap-1 border border-orange-500 bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-widest">

                </span>
              </div>

              <ul className="space-y-3 text-sm font-medium text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">📍</span>
                  〒590-0953 大阪府堺市堺区甲斐町東4丁2番2号
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">📞</span>
                  TEL: <a href="tel:072-224-8067" className="text-[#1e40af] hover:text-orange-500 font-bold transition-colors">072-224-8067</a>
                </li>
              </ul>
            </div>

            {/* Right: Strong Corporate CTA Button */}
            <div className="shrink-0 w-full md:w-auto flex flex-col items-center md:items-end justify-center">
              <p className="text-xs text-slate-500 font-bold mb-3 tracking-widest">＼ さらに詳しい企業情報はこちら ／</p>
              <a href="/" className="inline-flex items-center justify-center border-2 border-[#1e40af] text-white bg-[#1e40af] hover:bg-white hover:text-[#1e40af] px-10 py-5 rounded shadow-lg transition-all font-black text-base group">
                公式コーポレートサイトへ
                <span className="ml-3 inline-block group-hover:translate-x-1 transition-transform">➔</span>
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-gray-400 font-mono tracking-widest">
            &copy; {new Date().getFullYear()} Solution Cooperative. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* ===== MODAL: FEE TABLE ===== */}
      {showFeeTable && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowFeeTable(false)} />
          <div className="relative bg-white w-full max-w-lg rounded shadow-2xl overflow-hidden animate-slideUp">
             <div className="bg-[#1e40af] p-5 flex justify-between items-center text-white">
                <h3 className="font-bold tracking-widest">公開書類一覧</h3>
                <button onClick={() => setShowFeeTable(false)} className="text-xl hover:text-orange-400 transition">✕</button>
             </div>
             <div className="p-8 bg-slate-50">
                <div className="space-y-4">
                  <a href="/disclosure" className="flex items-center gap-4 bg-white p-5 rounded border border-gray-200 hover:border-[#1e40af] hover:shadow-md transition">
                     <span className="text-2xl">📄</span>
                     <div>
                       <p className="font-bold text-[#1e40af] mb-1">監理費用の明細</p>
                       <p className="text-[10px] text-gray-500">当組合が徴収する費用の内訳と使途</p>
                     </div>
                  </a>
                  <a href="/disclosure" className="flex items-center gap-4 bg-white p-5 rounded border border-gray-200 hover:border-[#1e40af] hover:shadow-md transition">
                     <span className="text-2xl">📖</span>
                     <div>
                       <p className="font-bold text-[#1e40af] mb-1">運営規程</p>
                       <p className="text-[10px] text-gray-500">当組合の事業運営に関する基本ルール</p>
                     </div>
                  </a>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
