import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactCtaSection from '@/components/ContactCtaSection';

// ── SEO Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: '育成就労制度とは｜2027年施行・技能実習との違い・移行準備｜ソリューション協同組合',
  description:
    '2027年施行予定の育成就労制度（旧・技能実習制度）をわかりやすく解説。技能実習との違い、受入企業が今すぐすべき準備、監理支援機関への移行認可申請中のソリューション協同組合が無料でサポートします。大阪府堺市。',
  keywords: [
    '育成就労制度', '育成就労 とは', '育成就労 2027',
    '育成就労 技能実習 違い', '育成就労 移行準備',
    '監理支援機関', '育成就労 中小企業', '技能実習 廃止',
    '育成就労 大阪', '育成就労 堺市', '育成就労 費用',
  ],
  alternates: { canonical: 'https://solutioncoop-jp.com/ikusei-shuro' },
  openGraph: {
    title: '育成就労制度とは｜2027年施行・技能実習との違いと移行準備｜ソリューション協同組合',
    description: '2027年施行の育成就労制度を完全解説。技能実習との違い・受入企業の準備・監理支援機関の選び方まで。大阪府堺市の監理団体が無料相談対応。',
    url: 'https://solutioncoop-jp.com/ikusei-shuro',
    siteName: 'ソリューション協同組合',
    locale: 'ja_JP',
    type: 'article',
    images: [{ url: '/images/ogp-main.jpg', width: 1200, height: 630, alt: '育成就労制度とは｜ソリューション協同組合' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '育成就労制度とは｜2027年施行・技能実習との違いと移行準備',
    description: '2027年施行の育成就労制度を完全解説。技能実習との違い・受入企業の準備まで。',
    images: ['/images/ogp-main.jpg'],
  },
};

// ── Schema LD+JSON ──────────────────────────────────────────────
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム',       item: 'https://solutioncoop-jp.com' },
    { '@type': 'ListItem', position: 2, name: '育成就労制度', item: 'https://solutioncoop-jp.com/ikusei-shuro' },
  ],
};

// ArticlePage schema — Google News / 検索結果の拡張表示
const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '育成就労制度とは｜2027年施行・技能実習との違いと移行準備ガイド',
  description: '2027年施行予定の育成就労制度（旧・技能実習制度）の内容、技能実習との違い、受入企業が今すべき移行準備を解説。',
  image: 'https://solutioncoop-jp.com/images/ogp-main.jpg',
  datePublished: '2026-01-01',
  dateModified: '2026-06-20',
  author: { '@type': 'Organization', name: 'ソリューション協同組合', url: 'https://solutioncoop-jp.com' },
  publisher: {
    '@type': 'Organization',
    name: 'ソリューション協同組合',
    url: 'https://solutioncoop-jp.com',
    logo: { '@type': 'ImageObject', url: 'https://solutioncoop-jp.com/images/logo.png', width: 400, height: 400 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://solutioncoop-jp.com/ikusei-shuro' },
};

// FAQPage schema — リッチリザルト（よくある質問）
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '育成就労制度はいつから始まりますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '育成就労制度は2027年頃の施行が予定されています。現行の技能実習制度は段階的に廃止され、3年間の経過措置期間が設けられる見込みです。',
      },
    },
    {
      '@type': 'Question',
      name: '技能実習制度と育成就労制度の違いは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '最大の違いは「目的」です。技能実習は国際貢献・技術移転が目的でしたが、育成就労は外国人材の「育成・就労」を主目的とします。また、育成就労では一定条件のもと転職が認められ、3年間で特定技能1号水準（技能検定3級・日本語N4相当）を目指します。',
      },
    },
    {
      '@type': 'Question',
      name: '監理支援機関とは何ですか？監理団体とどう違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '育成就労制度では、現行の「監理団体」が「監理支援機関」に名称変更されます。業務内容は同様ですが、新たな許可要件（一般・特定の2類型）が設けられ、より厳格な審査が行われます。ソリューション協同組合は監理支援機関への移行認可を申請中です。',
      },
    },
    {
      '@type': 'Question',
      name: '受入企業は今すぐ何を準備すればよいですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '現在の技能実習生の在留資格・契約内容の確認、信頼できる監理支援機関（旧：監理団体）の選定、日本語教育環境の整備が重要です。当組合では無料相談にて個社ごとの移行シミュレーションをご提供しています。',
      },
    },
  ],
};

// ── 比較テーブル データ ─────────────────────────────────────────
const comparisonRows = [
  { item: '制度の目的',     old: '国際貢献・技術移転',                       neu: '外国人材の育成・就労' },
  { item: '在留期間',       old: '最長5年（技能実習1〜3号）',                 neu: '最長3年（育成就労）→ 特定技能へ移行' },
  { item: '転職',           old: '原則不可',                                  neu: '一定条件のもと可（同一分野内）' },
  { item: '目標レベル',     old: '技能実習評価試験（随時3級等）',              neu: '技能検定3級 + 日本語N4相当' },
  { item: '監理組織名称',   old: '監理団体（一般監理・特定監理）',             neu: '監理支援機関（一般・特定の2類型）' },
  { item: '送出機関',       old: '外国政府認定の送出機関',                     neu: '育成就労計画認定機関（新設）' },
  { item: 'OTIT関与',       old: '外国人技能実習機構（OTIT）が監督',           neu: '外国人育成就労機構（JOTIT）に改組' },
  { item: '施行予定',       old: '〜2026年末（経過措置期間中）',               neu: '2027年頃（経過措置3年）' },
];

// ── タイムライン データ ────────────────────────────────────────
const timeline = [
  { year: '2024年', label: '育成就労法 成立', desc: '「技能実習法」廃止・「育成就労法」公布。技能実習制度の抜本見直しが確定。' },
  { year: '2025年', label: '省令・告示の整備', desc: '具体的な基準・職種・要件が省令で順次公表。監理支援機関の許可申請開始。' },
  { year: '2026年', label: '移行準備期間（現在）', desc: '受入企業・監理団体ともに新制度への準備が急務。今が動き出すタイミング。', current: true },
  { year: '2027年頃', label: '育成就労制度 施行', desc: '新制度が本格スタート。技能実習制度は経過措置期間（最長3年）で段階的廃止。' },
  { year: '2030年頃', label: '完全移行', desc: '技能実習制度の経過措置終了。育成就労・特定技能への完全移行が完了。' },
];

export default function IkuseiShuroPage() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Header />
      <main className="pt-16 md:pt-20 bg-white">

        {/* ── HERO ── */}
        <section className="relative bg-[#1e40af] text-white py-14 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-banner.jpg')] bg-cover bg-center opacity-10" aria-hidden="true" />
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">

            {/* Breadcrumb */}
            <nav aria-label="パンくずリスト" className="text-xs text-blue-300 flex items-center gap-2 mb-6">
              <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
              <span aria-hidden="true">›</span>
              <span className="text-white font-bold" aria-current="page">育成就労制度</span>
            </nav>

            <span className="inline-block bg-orange-500 text-white text-[11px] font-black px-3 py-1 rounded tracking-widest mb-4">
              2027年施行予定 — 新制度完全ガイド
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
              育成就労制度とは<br />
              <span className="text-orange-400">技能実習から何が変わるのか？</span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 leading-relaxed max-w-2xl mb-8">
              2024年に成立した育成就労法により、現行の技能実習制度は2027年頃を目処に廃止されます。<br className="hidden md:block" />
              受入企業様が今すぐ知っておくべき<strong className="text-white">制度の変更点・移行準備・対策</strong>をわかりやすく解説します。
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/#contact"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded transition-all hover:-translate-y-0.5 text-sm">
                無料で移行相談する →
              </Link>
              <a href="tel:0722248067"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold px-8 py-4 rounded border border-white/40 transition-all text-sm">
                📞 072-224-8067
              </a>
            </div>
          </div>
        </section>

        {/* ── ALERT BANNER ── */}
        <section className="bg-amber-50 border-y border-amber-200 py-5">
          <div className="container mx-auto px-4 max-w-4xl flex items-start gap-4">
            <span className="text-2xl flex-shrink-0 mt-0.5">⚠️</span>
            <div>
              <p className="font-black text-amber-900 text-sm md:text-base">
                【重要】2026年は「移行準備の最重要年」です
              </p>
              <p className="text-amber-800 text-xs md:text-sm leading-relaxed mt-1">
                技能実習制度から育成就労制度への移行は、受入企業様にとって避けられない変化です。準備が遅れると、外国人材の受入れが一時的に停止するリスクもあります。
                <strong className="underline">今すぐ当組合の無料相談をご利用ください。</strong>
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-4xl py-16 space-y-20">

          {/* ── SECTION 1: 制度の概要 ── */}
          <section id="overview" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="text-2xl md:text-3xl font-black text-[#1e40af] mb-2">
              育成就労制度の概要
            </h2>
            <div className="h-1 w-16 bg-orange-500 mb-6 rounded" />
            <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                <strong>育成就労制度</strong>とは、2024年（令和6年）に成立した「育成就労法」に基づく新たな外国人材受入れ・育成の制度です。
                現行の技能実習制度が「国際貢献・技術移転」を目的としていたのに対し、育成就労制度は<strong>外国人材の「育成」と「就労」を両立させる</strong>ことを主目的とした、より実態に即した制度設計となっています。
              </p>
              <p>
                育成就労期間（最長3年）を経た外国人材は、<strong>技能検定3級相当（随時3級）および日本語能力N4相当</strong>の水準に達することを目標とし、
                その後は<strong>特定技能1号</strong>に移行することで、より長期的なキャリア形成が可能になります。
              </p>
            </div>

            {/* 3ポイント */}
            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              {[
                { icon: '🎯', title: '育成が主目的', desc: '「研修」から「本格的な人材育成」へ。外国人材のキャリアパスが明確化。' },
                { icon: '🔄', title: '特定技能への橋渡し', desc: '3年の育成後、スムーズに特定技能1号へ移行。長期就労の道筋が明確。' },
                { icon: '⚖️', title: '転職の柔軟化', desc: '一定条件のもと、同一分野内での転籍（転職）が認められる。' },
              ].map(p => (
                <div key={p.title} className="bg-blue-50 border border-blue-100 rounded p-5">
                  <span className="text-2xl block mb-2">{p.icon}</span>
                  <h3 className="font-black text-[#1e40af] text-sm mb-2">{p.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 2: 比較テーブル ── */}
          <section id="comparison" aria-labelledby="comparison-heading">
            <h2 id="comparison-heading" className="text-2xl md:text-3xl font-black text-[#1e40af] mb-2">
              技能実習制度 vs 育成就労制度 — 徹底比較
            </h2>
            <div className="h-1 w-16 bg-orange-500 mb-6 rounded" />
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              受入企業様が最も気になる「何が変わるのか」を一覧表で整理しました。
            </p>
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1e40af] text-white">
                    <th className="px-4 py-3 text-left font-black w-1/4">比較項目</th>
                    <th className="px-4 py-3 text-left font-black w-[37.5%]">
                      <span className="inline-block bg-gray-500/30 text-white text-[10px] px-2 py-0.5 rounded mr-1">旧</span>
                      技能実習制度
                    </th>
                    <th className="px-4 py-3 text-left font-black w-[37.5%]">
                      <span className="inline-block bg-orange-500/80 text-white text-[10px] px-2 py-0.5 rounded mr-1">新</span>
                      育成就労制度
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.item} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-bold text-[#1e40af] border-b border-gray-100">{row.item}</td>
                      <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{row.old}</td>
                      <td className="px-4 py-3 text-gray-800 font-medium border-b border-gray-100">
                        <span className="text-[#1e40af]">▶ </span>{row.neu}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── SECTION 3: タイムライン ── */}
          <section id="timeline" aria-labelledby="timeline-heading">
            <h2 id="timeline-heading" className="text-2xl md:text-3xl font-black text-[#1e40af] mb-2">
              移行スケジュール（タイムライン）
            </h2>
            <div className="h-1 w-16 bg-orange-500 mb-8 rounded" />
            <ol className="relative border-l-2 border-blue-200 space-y-8 pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span className={`absolute -left-[29px] w-4 h-4 rounded-full border-2 border-white ${t.current ? 'bg-orange-500 ring-4 ring-orange-100' : 'bg-[#1e40af]'}`} />
                  <div className={`rounded p-4 border ${t.current ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-100'}`}>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-black px-2 py-0.5 rounded ${t.current ? 'bg-orange-500 text-white' : 'bg-blue-100 text-[#1e40af]'}`}>
                        {t.year}
                      </span>
                      <h3 className={`font-black text-sm ${t.current ? 'text-orange-700' : 'text-[#1e40af]'}`}>{t.label}</h3>
                      {t.current && <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded font-black animate-pulse">← 現在</span>}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── SECTION 4: 受入企業の準備 ── */}
          <section id="preparation" aria-labelledby="preparation-heading">
            <h2 id="preparation-heading" className="text-2xl md:text-3xl font-black text-[#1e40af] mb-2">
              受入企業が今すべき3つの準備
            </h2>
            <div className="h-1 w-16 bg-orange-500 mb-6 rounded" />
            <div className="space-y-4">
              {[
                {
                  num: '01',
                  title: '現状の技能実習生の在留状況を把握する',
                  desc: '現在受入れている技能実習生が何号・何年目であるか確認し、育成就労制度への移行タイミングを把握しましょう。当組合が無料でシミュレーションをご提供します。',
                },
                {
                  num: '02',
                  title: '監理支援機関（旧：監理団体）の選定・見直しを行う',
                  desc: '育成就労制度では「監理支援機関」への移行許可が必要です。許可を受けていない機関とは契約継続が困難になる場合があります。ソリューション協同組合は監理支援機関への移行認可を申請中です。',
                },
                {
                  num: '03',
                  title: '日本語教育環境の整備・強化',
                  desc: '育成就労では「日本語N4相当」の取得が目標として明示されています。入国前教育（海外送出機関）と入国後のOJT・日本語学習支援の両面で、継続的な教育体制が求められます。',
                },
              ].map(s => (
                <div key={s.num} className="flex gap-5 bg-white border border-gray-100 rounded p-5 hover:-translate-y-0.5 transition-transform">
                  <span className="flex-shrink-0 text-3xl font-black text-[#1e40af]/20 leading-none">{s.num}</span>
                  <div>
                    <h3 className="font-black text-[#1e40af] text-sm md:text-base mb-2">{s.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: FAQ ── */}
          <section id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-black text-[#1e40af] mb-2">
              よくある質問
            </h2>
            <div className="h-1 w-16 bg-orange-500 mb-6 rounded" />
            <div className="space-y-4">
              {faqLd.mainEntity.map((q) => (
                <details key={q.name} className="group bg-white border border-gray-200 rounded overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none hover:bg-blue-50 transition-colors">
                    <span className="font-bold text-sm text-[#1e40af] pr-4 flex items-center gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#1e40af] text-white rounded-full flex items-center justify-center text-[10px] font-black">Q</span>
                      {q.name}
                    </span>
                    <span className="flex-shrink-0 text-[#1e40af] group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-5 pb-5 pt-2 border-t border-gray-100 flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-[10px] font-black mt-0.5">A</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{q.acceptedAnswer.text}</p>
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/faq" className="text-sm font-bold text-[#1e40af] hover:underline">
                その他のよくある質問はこちら →
              </Link>
            </div>
          </section>

          {/* ── 関連リンク ── */}
          <section aria-label="関連ページ">
            <h2 className="text-lg font-black text-[#1e40af] mb-4">関連情報</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: '/disclosure', label: '情報公開・監理費表', desc: '法令に基づく監理費用の公開' },
                { href: '/faq',        label: 'よくある質問（FAQ）', desc: '費用・手続き・制度の違いを解説' },
                { href: '/news',       label: '最新情報',           desc: '育成就労制度の法令・制度情報' },
                { href: '/#contact',   label: '無料相談窓口',       desc: 'LINEまたはお電話でご相談' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="group flex items-center gap-4 bg-white border border-gray-100 rounded p-4 hover:border-[#1e40af] hover:bg-blue-50 transition-all">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-[#1e40af] group-hover:underline">{l.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{l.desc}</p>
                  </div>
                  <span className="text-[#1e40af] group-hover:translate-x-1 transition-transform">›</span>
                </Link>
              ))}
            </div>
          </section>

        </div>{/* /container */}

        <ContactCtaSection />
      </main>
      <Footer />
    </>
  );
}
