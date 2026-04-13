'use client';
import { useState } from 'react';
import TrackedLink from './TrackedLink';

type Category = 'all' | 'merit' | 'system' | 'cost' | 'future';

const CATEGORIES: { id: Category; label: string; icon: string }[] = [
  { id: 'all',    label: 'すべて',    icon: '💡' },
  { id: 'merit',  label: '導入メリット', icon: '📈' },
  { id: 'system', label: '在留・制度',  icon: '⚖️' },
  { id: 'cost',   label: '費用・賃金',  icon: '💰' },
  { id: 'future', label: '制度の今後',  icon: '🌱' },
];

const FAQ_DATA = [
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '技能実習生を受け入れる最大のメリットは何ですか？',
    answer: (
      <div className="grid grid-cols-2 gap-2">
        {[
          ['👥','若手人材の安定確保','20代の意欲ある人材 को長期採用'],
          ['⚡','職場の活性化','日本人社員の指導・教育力も向上'],
          ['🏆','技術の継承','5年間（特定技能へ移行でさらに長期）の戦力化'],
          ['🤝','海外進出への布石','将来の海外拠点リーダー候補の育成'],
        ].map(([icon,title,desc], i) => (
          <div key={i} className="bg-orange-50/50 border border-orange-100 p-3 rounded text-center">
            <p className="text-2xl mb-1">{icon}</p>
            <p className="text-xs font-bold text-gray-800">{title}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 whitespace-nowrap">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    cat: 'future',
    catLabel: '制度の今後',
    q: '新制度「育成就労」での「転籍（転職）」リスクへの対策は？',
    answer: (
      <div className="space-y-3 text-xs">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded">
          <p className="font-bold text-blue-900 mb-1">🔍 転籍は「無制限」ではありません</p>
          <p className="text-gray-700 leading-relaxed">
            一定の就労期間（1～2年）と技能・日本語試験の合格が条件です。当組合では、<strong>母国語スタッフによる定期面談</strong>と<strong>メンタルケア</strong>を強化し、他社へ移る必要のない「選ばれる職場づくり」を伴走支援いたします。
          </p>
        </div>
        <p className="text-gray-400 text-[10px]">※転籍時の初期費用（紹介料等）の一部返還ルール等も検討されています。</p>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: '来日前にどの程度の日本語能力が期待できますか？',
    answer: (
      <div className="space-y-3 text-xs">
        <div className="flex items-center gap-3 bg-green-50 p-3 rounded border border-green-100">
          <span className="text-xl">🎓</span>
          <p className="font-bold text-green-800 tracking-tight">新制度では「A1相当以上（N5級レベル）」が必須化</p>
        </div>
        <p className="text-gray-700 leading-relaxed">
          当組合の提携送り出し機関では、単なる語学学習だけでなく、<strong>現場での安全指示</strong>や<strong>日本の生活ルール</strong>を徹底教育。現場配属後すぐに馴染める基礎体力を養います。
        </p>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '受入企業側で準備すべき費用や設備は何ですか？',
    answer: (
      <div className="space-y-3 text-xs">
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <p className="font-bold text-gray-800 mb-2">🏘️ 主な準備事項</p>
          <ul className="grid grid-cols-2 gap-2 text-[11px]">
            <li className="flex items-center gap-1">✅ 宿舎（1人4.5㎡以上）</li>
            <li className="flex items-center gap-1">✅ 家電・什器一式</li>
            <li className="flex items-center gap-1">✅ 渡航費用などの初期費用</li>
            <li className="flex items-center gap-1">✅ 社会保険・労働保険</li>
          </ul>
        </div>
        <p className="text-gray-600">
          宿舎の選定から家電のリース手配まで、当組合が全面的にアドバイスいたします。
        </p>
      </div>
    ),
  },
  {
    cat: 'future',
    catLabel: '制度の今後',
    q: '2027年からの新制度移行に向けて、今何をすべきですか？',
    answer: (
      <div className="space-y-3 text-xs">
        <div className="bg-orange-50 border border-orange-200 p-3 rounded">
          <p className="font-bold text-orange-800 mb-1">📅 2026年中の準備がカギ</p>
          <p className="text-gray-700 leading-relaxed">
            すでに「特定技能」への移行を見越したキャリア形成が必要です。当組合は<strong>監理支援機関</strong>（新制度での呼称）への移行認可を申請中であり、現行制度から新制度へのスムーズな橋渡しを保証します。
          </p>
        </div>
        <TrackedLink href="/contact" eventAction="cta_click" eventLabel="faq_future_consult" className="text-navy font-bold underline underline-offset-4">
          新制度対応の無料シミュレーションを依頼する →
        </TrackedLink>
      </div>
    ),
  },
  {
    cat: 'cost',
    catLabel: '費用・賃金',
    q: '実習生に支払う賃金はどのくらいですか？',
    answer: (
      <div className="space-y-3 text-xs">
        <div className="bg-amber-50 border border-amber-200 p-3 flex items-center gap-4 rounded">
          <span className="text-amber-500 text-2xl">⚖️</span>
          <div>
            <p className="font-bold text-gray-900">大阪府最低賃金以上が必須</p>
            <p className="text-gray-600 text-[10px]">2025年10月改定：<strong>1,177円/時</strong>以上</p>
          </div>
        </div>
        <ul className="space-y-1.5 text-gray-700 bg-gray-50 p-3 rounded">
          {['日本人従業員と同等の賃金が原則','残業・深夜・休日割増も法律通り適用','住居費控除後の手取り額管理も重要'].map(t => (
            <li key={t} className="flex items-start gap-2"><span className="text-green-500 font-bold">✓</span>{t}</li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    cat: 'system',
    catLabel: '在留・制度',
    q: 'どのような職種で受け入れが可能ですか？',
    answer: (
      <div className="space-y-3 text-xs">
        <p className="text-gray-600">制度上認められた<strong>86職種161作業</strong>。主な対応職種：</p>
        <div className="flex flex-wrap gap-1.5">
          {['建設', '溶接', '機械加工', '造園', '農業', '水産加工', '介護', '縫製'].map(t => (
            <span key={t} className="bg-navy text-white px-3 py-1 text-[10px] font-bold rounded-sm">{t}</span>
          ))}
          <span className="bg-gray-200 text-gray-600 px-3 py-1 text-[10px] font-bold rounded-sm">他多数</span>
        </div>
        <a href="/about#disclosure" className="inline-block mt-2 text-blue-800 font-bold hover:underline">
          📄 職種詳細・法令情報を確認する →
        </a>
      </div>
    ),
  },
  {
    cat: 'merit',
    catLabel: '導入メリット',
    q: '外国人実習生の受入れが初めてですが、事務手続きは大変ですか？',
    answer: (
      <div className="space-y-3 text-xs">
        <div className="bg-blue-50 border border-blue-200 p-3 rounded">
          <p className="font-bold text-blue-900 mb-1">⚖️ 煩雑な書類作成は「当組合にお任せ」ください</p>
          <p className="text-gray-700 leading-relaxed">
            技能実習計画の認定、入管への在留資格申請、OTIT（外国人技能実習機構）への各種届出など、<strong>専門知識が必要な事務手続きは当組合が全面的に代行・サポート</strong>いたします。
          </p>
        </div>
        <p className="text-gray-600 bg-gray-50 p-2 rounded text-[11px]">
          受入企業様は「受入れ体制の整備」と「実習生への技能指導」に専念していただける環境を整えます。初めてでも安心してお任せください。
        </p>
      </div>
    ),
  },
];

export default function FaqSection() {
  const [activeTab, setActiveTab] = useState<Category>('all');

  const filteredFaq = activeTab === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(item => item.cat === activeTab);

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-3 rounded-full">よくある質問</span>
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">よくあるご質問</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            技能実習生の受入れをご検討中の皆様から、特によく寄せられるご質問をカテゴリー別にまとめました。
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all duration-300 border-2 ${
                activeTab === cat.id 
                  ? 'bg-navy border-navy text-white shadow-lg -translate-y-1' 
                  : 'bg-white border-gray-100 text-gray-600 hover:border-navy hover:text-navy'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
          {filteredFaq.map((faq, i) => (
            <div key={i} className="flex flex-col bg-white border border-gray-100 rounded shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group overflow-hidden">
              {/* Question Header */}
              <div className="bg-navy p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-white/20 leading-none flex-shrink-0 mt-1">Q</span>
                  <div>
                    <span className="text-[10px] text-blue-200 font-bold uppercase tracking-widest block mb-1 opacity-70">
                      {faq.catLabel}
                    </span>
                    <h3 className="font-bold text-white text-[15px] leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                </div>
              </div>
              {/* Answer Content */}
              <div className="p-6 flex-1 flex items-start gap-4 bg-white">
                <span className="text-3xl font-black text-navy/10 leading-none flex-shrink-0 mt-1">A</span>
                <div className="flex-1 overflow-hidden">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-navy p-8 md:p-12 text-center rounded relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-800/20" />
          <div className="relative z-10">
            <h3 className="text-xl md:text-3xl font-black text-white mb-4">
              その他の疑問もお気軽にご相談ください
            </h3>
            <p className="text-blue-100 text-sm md:text-base mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
              貴社の職種や状況に合わせた具体的なアドバイスを無料で行っております。<br className="hidden md:block" />
              お電話またはWebフォームよりお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <TrackedLink href="tel:0722248067" eventAction="cta_click" eventLabel="faq_phone"
                className="inline-flex items-center justify-center gap-3 bg-white text-navy font-black py-4 px-8 rounded-lg hover:bg-gray-100 transition shadow-lg">
                📞 072-224-8067
              </TrackedLink>
              <TrackedLink href="/contact" eventAction="cta_click" eventLabel="faq_contact"
                className="inline-flex items-center justify-center gap-3 bg-orange-600 border-b-4 border-orange-800 text-white font-black py-4 px-8 rounded-lg hover:bg-orange-700 transition shadow-lg">
                ✉️ 無料相談フォームへ
              </TrackedLink>
            </div>
            <p className="text-blue-300 text-[10px] mt-6 tracking-widest">※ 平日 9:00〜18:00 受付中</p>
          </div>
        </div>
      </div>
    </section>
  );
}
