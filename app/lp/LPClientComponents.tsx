'use client';
import React, { useState } from 'react';

export default function LPClientComponents() {
  const [showFeeTable, setShowFeeTable] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const faqs = [
    {
      q: '「育成就労」と「特定技能」は、具体的に何が違うのでしょうか？',
      a: '「育成就労」は未経験から人材を育成し、3年かけて「特定技能」水準へ引き上げるための制度です。一方「特定技能」は、すでに一定の技能・日本語力を持つ即戦力人材を受け入れる制度です。当組合は両制度を組み合わせたハイブリッド支援で、貴社のフェーズに合わせた最適な採用計画をご提案します。'
    },
    {
      q: '他社と比べて「採用コストの削減」ができる理由は何ですか？',
      a: '余計な仲介業者を挟まず、送出国の機関から直接人材をご紹介する独自ルートを構築しているため、無駄なマージンが発生しません。質の高い人材を適正価格で確保できるのが最大の強みです。'
    },
    {
      q: '自社に外国政府との複雑な手続きを行うノウハウがありません。',
      a: 'ご安心ください。事前の書類作成、ビザ（在留資格）の申請、入国管理局への定期報告まで、専門スタッフがすべて代行いたします。企業様は「現場での業務指導」にのみ集中していただける環境をお作りします。'
    },
    {
      q: '日本語でのコミュニケーションは問題なく取れるのでしょうか？',
      a: '入国前に徹底した日本語教育と日本の生活マナー教育を行っています。また、建設や製造、介護など各業界特有の専門用語の学習もサポート。配属後も継続的な学習支援と専任通訳スタッフによるフォローがあるため安心です。'
    },
    {
      q: '外国人材の「失踪」や「途中帰国」が心配です。対策はありますか？',
      a: '失踪の主な原因は「職場でのコミュニケーション不足」と「生活上の悩み」に起因します。当組合では、選考段階で家庭環境や適性を厳格に調査し、配属後は24時間体制の母国語相談窓口でストレスやSOSを即座にキャッチし、トラブルを未然に防ぐ体制を敷いています。'
    },
    {
      q: '受け入れるにあたり、寮や生活環境は企業側で用意する必要がありますか？',
      a: 'はい、原則として企業様に家賃相場に基づいた宿舎（アパートや社宅等）をご手配いただきます。ただし、物件探しのアドバイスから家電・日用品の調達手配、入国直後の市役所手続き、ゴミ出しルールの指導などは当組合が全面的にサポートいたします。'
    },
    {
      q: '業務中のケガや、夜間の急病などの緊急時はどうすればいいですか？',
      a: '当組合の母国語スタッフが24時間365日体制で「トラブル・緊急ダイヤル」に対応しています。病院への同行や、企業担当者様との通話通訳、労災手続きのアドバイスまで、すべて迅速にサポートいたしますのでご安心ください。'
    },
    {
      q: '自社の業務内容が受入れの対象になるか分かりません。',
      a: '現在、製造業、建設業、介護、農業、宿泊、外食業など非常に多くの業種が対象となっています。貴社の実際の業務内容と雇用条件をヒアリングした上で、どの在留資格での受け入れが最適（または可能）か、無料で診断・アドバイスさせていただきます。'
    }
  ];

  return (
    <>
      {/* ===== SECTION: 4 PILLARS (Redesigned from user prompt) ===== */}
      <section id="features" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-[#1e40af] mb-4">
              移行期の課題を解決する<span className="text-orange-500">4つの約束</span>
            </h2>
            <p className="text-sm text-gray-500 font-bold">育成就労・特定技能のダブルサポート体制</p>
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
              <div key={i} className="bg-white p-8 rounded border-t-4 border-[#1e40af] shadow-md hover:-translate-y-1 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="text-3xl bg-blue-50 w-14 h-14 flex items-center justify-center rounded text-[#1e40af] shrink-0">{p.icon}</div>
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
          <div className="bg-[#1e40af] p-8 md:p-12 rounded shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">🧮</div>
            <div className="flex-1 text-center md:text-left relative z-10">
              <span className="text-orange-400 font-bold text-xs uppercase tracking-widest border border-orange-400 px-3 py-1 rounded inline-block mb-4">無料・登録不要</span>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
                自社専用の費用を<span className="text-orange-400 font-mono text-5xl mx-2">30</span>秒で算出
              </h2>
              <p className="text-sm text-blue-100">特定技能・育成就労にかかる「初期費用」から「毎月の監理費」まで。国籍・業種を選ぶだけですぐにお見積りが分かります。</p>
            </div>
            <a href="/simulator" className="relative z-10 bg-[#f97316] text-white font-black py-4 px-8 rounded shadow-lg hover:bg-[#ea580c] transition-all text-center whitespace-nowrap">
              シミュレーションを開始 ➔
            </a>
          </div>
        </div>
      </section>

      {/* ===== SECTION: FLOW TIMELINE ===== */}
      <section id="flow" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-[#1e40af]">サポート開始までの流れ</h2>
            <p className="text-sm text-gray-500 mt-4">最短ルートで優秀人材を配属。その後のキャリアアップまで一貫サポート。</p>
          </div>
          <div className="max-w-4xl mx-auto relative pl-6 md:pl-0">
             <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-1 bg-blue-100 transform md:-translate-x-1/2"></div>
             
             {[
               { m: 'STEP 1', t: '無料相談・お見積り', d: '特定技能と育成就労、貴社にどちらが適しているか含め、詳細な採用計画をご提案します。' },
               { m: 'STEP 2', t: '現地面接・厳選', d: '独自ルートで募集。意欲と適性を見極め、「辞めない人材」を企業様と共に選定します。' },
               { m: 'STEP 3', t: '教育・行政手続き代行', d: '入国に向けた事前教育を実施しつつ、面倒なビザ申請書類などは当組合が完全代行します。' },
               { m: 'STEP 4', t: '入国・業務開始', d: '日本での生活立ち上げ（口座開設など）をサポート。万全の状態で初日を迎えさせます。' },
               { m: 'STEP 5', t: '定着支援・キャリアUP', d: '配属後も定期訪問・24時間母国語ケアを実施。特定技能へのスムースな切り替えも支援。' }
             ].map((item, i) => (
                <div key={i} className={`relative flex items-center md:justify-between mb-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-[-21px] md:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#1e40af] transform md:-translate-x-1/2 z-10 shadow flex items-center justify-center">
                    {i === 4 && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />}
                  </div>
                  <div className="w-full md:w-[45%] ml-6 md:ml-0">
                    <div className="bg-white p-6 rounded border border-gray-200 shadow-sm hover:border-[#1e40af] transition-colors">
                      <span className="text-[10px] font-bold text-white bg-[#1e40af] px-3 py-1 rounded inline-block mb-3 tracking-widest">{item.m}</span>
                      <h3 className="text-lg font-black text-[#1e40af] mb-2">{item.t}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: FAQ ===== */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-[#1e40af]">よくあるご質問</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 font-bold text-gray-800 flex justify-between items-center hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-4 text-sm md:text-base leading-relaxed">
                    <span className="text-[#1e40af] font-black text-xl">Q.</span> {faq.q}
                  </span>
                  <span className="text-xl text-gray-400 shrink-0 ml-4">{openFaq === i ? '−' : '＋'}</span>
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-200 flex items-start gap-4 mt-4">
                    <span className="text-orange-500 font-black text-xl mt-1">A.</span>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: COMPLIANCE BANNER ===== */}
      <section className="py-6 bg-[#1e40af] text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-center">
          <span className="border-l-4 border-orange-500 pl-3 text-sm font-bold tracking-widest">適正な監理・支援体制</span>
          <p className="text-xs md:text-sm font-medium">弊組合は、法令に基づき適正な事業を行う「一般監理事業許可」取得団体です。</p>
           <button 
            onClick={() => setShowFeeTable(true)}
            className="text-xs md:text-sm font-bold border-b border-white hover:text-orange-400 hover:border-orange-400 transition-all ml-0 md:ml-4"
          >
            【監理費用の明細等を確認する】
          </button>
        </div>
      </section>

      {/* ===== SECTION 6: LEAD GENERATION FORM (Light Background) ===== */}
      <section id="lead-form" className="py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-9xl text-[#1e40af] pointer-events-none">📥</div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block bg-orange-500 text-white font-bold tracking-widest text-[10px] px-3 py-1 rounded mb-4 shadow-sm">経営者必見・無料ガイド</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#1e40af] mb-6">ロードマップを無料で手に入れる</h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              育成就労・特定技能の活用法が一目でわかる資料を、<br className="hidden md:block"/>即座にダウンロードいただけます。
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded border border-blue-100 shadow-xl">
            {formStatus === 'success' ? (
              <div className="text-center py-8 text-slate-800">
                <div className="text-5xl mb-6">✅</div>
                <h3 className="text-2xl font-black mb-4 tracking-wider text-[#1e40af]">お申し込み完了</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">
                  ご入力いただいたメールアドレスへ資料をお送りしました。<br/>
                  以下のボタンからも直接ご確認いただけます。
                </p>
                <a href="/documents/ikusei-shuro-guide.pdf" target="_blank" className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-4 px-10 rounded shadow-lg transition-transform hover:-translate-y-1">
                  今すぐPDFを開く
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
                  <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:bg-gray-400 text-white font-black py-4 rounded shadow-lg hover:shadow-xl transition-all text-lg flex items-center justify-center gap-3 border border-[#ea580c]">
                    {formStatus === 'sending' ? '送信中...' : '資料を無料で受け取る ➔'}
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
                <p className="text-[#1e40af]/60 text-xs font-bold tracking-widest uppercase">Solution Cooperative</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1 border border-[#1e40af] bg-blue-50 text-[#1e40af] text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-widest">
                  <span className="text-[#1e40af]">✔</span> 一般監理事業（優良）許可
                </span>
                <span className="inline-flex items-center gap-1 border border-orange-500 bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-widest">
                  <span className="text-orange-500">🏆</span> 令和4年 大阪府知事表彰
                </span>
                <span className="inline-flex items-center gap-1 border border-orange-500 bg-orange-50 text-orange-600 text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-widest">
                  <span className="text-orange-500">✨</span> 令和8年 知事表彰
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
                  <a href="/documents/kanrihi-meisai.pdf" target="_blank" className="flex items-center gap-4 bg-white p-5 rounded border border-gray-200 hover:border-[#1e40af] hover:shadow-md transition">
                     <span className="text-2xl">📄</span>
                     <div>
                       <p className="font-bold text-[#1e40af] mb-1">監理費用の明細</p>
                       <p className="text-[10px] text-gray-500">当組合が徴収する費用の内訳と使途</p>
                     </div>
                  </a>
                  <a href="/documents/uneikitei.pdf" target="_blank" className="flex items-center gap-4 bg-white p-5 rounded border border-gray-200 hover:border-[#1e40af] hover:shadow-md transition">
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
