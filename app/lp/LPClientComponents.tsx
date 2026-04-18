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
      q: '定着率に不安があります。長く働いてもらうための対策はありますか？',
      a: '早期離職の主な原因は「職場でのコミュニケーション不足」と「生活上の悩み」に起因します。当組合では、選考段階で適性を厳格に調査し、配属後は母国語スタッフによる手厚い生活指導・メンタルケアにより高い定着率を実現しています。トラブルを未然に防ぐ体制を敷いています。'
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
            <a href="/simulator" className="relative z-10 w-full md:w-auto bg-[#f97316] text-white font-black py-4 px-6 md:px-8 rounded shadow-lg hover:bg-[#ea580c] transition-all text-center whitespace-nowrap text-sm md:text-base">
              シミュレーションを開始 ➔
            </a>
          </div>
        </div>
      </section>



      {/* ===== SECTION: FAQ (Elegant Accordion) ===== */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 pb-8 border-b-2 border-[#1e40af]">
            <div>
              <p className="text-xs font-bold text-[#f97316] tracking-[0.25em] uppercase mb-2">FAQ</p>
              <h2 className="text-2xl md:text-3xl font-black text-[#1e40af] leading-tight">よくあるご質問</h2>
            </div>
            <p className="text-xs text-gray-400 max-w-xs leading-relaxed md:text-right">
              技能実習・育成就労・特定技能の<br className="hidden md:block"/>受入れに関するご質問をまとめました。
            </p>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-gray-100">
            {[
              { q: '「育成就労」と「技能実習」・「特定技能」は、具体的に何が違いますか？', a: '「技能実習」は国際貢献を目的とした旧制度で2027年頃に廃止予定です。後継の「育成就労」は未経験から3年かけて「特定技能1号」水準へ育成することを目的とした制度です。「特定技能」は、すでに技能・日本語力を持つ即戦力人材を受け入れる制度です。当組合は両制度に完全対応し、貴社のフェーズに合わせた最適なプランをご提案します。' },
              { q: '2027年の新制度移行に向けて、今から何を準備すべきですか？', a: '2026年中の準備が鍵となります。現行の技能実習計画・就業規則の見直し、転籍リスクへの対応として「選ばれる職場環境」の整備、特定技能1号へのキャリアパス設計の3点が優先課題です。当組合は監理支援機関（新制度の呼称）への移行認可を申請中であり、現行制度から新制度へのスムーズな橋渡しをサポートします。' },
              { q: '転籍（転職）リスクが心配です。対策はありますか？', a: '転籍が認められるのは「同一企業での就労継続1〜2年」「技能検定・日本語A1相当以上の合格」など一定条件を満たした場合のみです。転籍を防ぐ最大の対策は、外国人材が「この会社で長く働きたい」と思える職場環境の構築です。当組合では母国語スタッフによる定期面談・メンタルケアを通じて、高い定着率の実現を支援しています。' },
              { q: '受入れ初期にかかる費用の目安を教えてください。', a: '1名あたりの初期費用の目安は約20万円前後です（組合加入・準備費、入国前教育・健診・渡航費、在留資格申請・入国後講習費を含む）。配属後は月額監理費2〜3万円、送出機関管理費5千〜1万円が継続費用として発生します。3年間の総費用を労働時間で割ると実質約1,200円/時〜が目安です。詳細は費用シミュレーターでご確認いただけます。' },
              { q: '実習生・特定技能生に支払う賃金の最低ラインは？', a: '大阪府の最低賃金以上の支払いが法律上の義務です（2025年10月改定：1,177円/時以上）。賃金は日本人社員と同等以上の水準を維持する必要があり、国籍による差別的取り扱いは法令違反となります。賃金明細・就業規則が最低賃金以上であることを定期的に確認することをお勧めします。' },
              { q: '受入れのための寮・住居は企業側で用意が必要ですか？', a: '原則として受入企業様に宿舎（アパート・社宅等）をご用意いただく必要があります。法令上の基準は1人あたり4.5㎡以上の居住スペースです。本人の同意を得た上で給与からの家賃天引きが可能ですが、上限の目安は月約2万円です。物件探しのアドバイスから家電調達・入居手続きまで、当組合が全面的にサポートします。' },
              { q: '事務手続きやビザ申請は複雑そうで不安です。', a: 'ご安心ください。技能実習計画の認定、入管への在留資格申請、OTIT（外国人技能実習機構）への各種届出など、専門知識が必要な事務手続きはすべて当組合の専門スタッフが代行・サポートします。受入企業様は「現場での業務指導」にのみ集中していただける環境をお作りします。' },
              { q: '日本語コミュニケーションや現場でのやり取りは問題ありませんか？', a: '入国前に徹底した日本語教育（新制度ではA1相当以上が必須）と、現場で使う専門用語・生活マナーの事前学習を実施しています。配属後も当組合の専任スタッフが定期訪問し、言語面・メンタル面の継続フォローを行います。コミュニケーション上のトラブルにも母国語通訳で迅速に対応します。' },
              { q: '夜間の急病や業務中のケガなど緊急時の対応は？', a: '当組合の母国語スタッフが24時間365日体制で緊急対応しています。病院への同行・通訳、企業担当者様との連絡調整、労災手続きのアドバイスまで迅速にサポートします。深夜や休日であっても対応できる体制を整えており、受入企業様の負担を最小化します。' },
              { q: '自社の業種・職種で受入れは可能ですか？', a: '技能実習制度では86職種161作業が対象です。主な対応業種は建設・製造（溶接・機械加工等）・農業・水産加工・介護・縫製など多岐にわたります。育成就労制度でも対象職種は基本的に維持される見込みです。貴社の業務内容をヒアリングの上、受入れ可能な在留資格と職種区分について無料で診断いたします。' },
              { q: '申し込みから実際の配属までどのくらいの期間がかかりますか？', a: '標準的なスケジュールの目安は約6ヶ月です。内訳は①契約・求人作成（1ヶ月）→②現地募集・面接（1〜2ヶ月）→③書類手続き・行政審査（2〜3ヶ月）→④入国後集中講習・配属（約1ヶ月）となります。業種・職種・受入国によって前後しますので、早めのご相談をお勧めします。' },
              { q: '信頼できる監理団体を選ぶポイントを教えてください。', a: 'チェックすべき主なポイントは①法令遵守（一般監理事業許可の取得・OTITへの適正な届出）②24時間対応のサポート体制③費用の透明性（監理費の明細が公開されているか）④実績（受入期数・受入企業数・定着率）の4点です。当組合は許可番号（許1708000610）を取得し、監理費明細を情報公開ページで公表しています。' },
            ].map((faq, i) => (
              <div key={i} className={`group transition-all duration-200 ${openFaq === i ? 'border-l-2 border-[#1e40af] pl-4 -ml-4' : 'pl-0 ml-0'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-5 flex items-center gap-5"
                >
                  {/* Number */}
                  <span className={`shrink-0 text-xs font-black tracking-widest tabular-nums transition-colors duration-200 w-6 ${openFaq === i ? 'text-[#f97316]' : 'text-gray-300 group-hover:text-[#1e40af]'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Question */}
                  <span className={`flex-1 font-bold text-sm md:text-base leading-relaxed transition-colors duration-200 ${openFaq === i ? 'text-[#1e40af]' : 'text-gray-700 group-hover:text-[#1e40af]'}`}>
                    {faq.q}
                  </span>
                  {/* Icon */}
                  <span className={`shrink-0 text-sm font-light transition-all duration-300 ${openFaq === i ? 'text-[#f97316] rotate-180' : 'text-gray-300 group-hover:text-[#1e40af]'}`}>
                    ▾
                  </span>
                </button>

                {/* Answer */}
                {openFaq === i && (
                  <div className="pb-6 pl-11">
                    <p className="text-sm md:text-[0.9375rem] text-gray-500 leading-[1.85] border-l border-gray-200 pl-4">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* ===== SECTION 6: LEAD GENERATION FORM (Light Background) ===== */}
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
