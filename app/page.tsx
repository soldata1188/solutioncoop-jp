import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadMagnet from '@/components/LeadMagnet';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateJP, formatDateDot } from '@/lib/news';

export const metadata: Metadata = {
  title: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
  description: 'ソリューション協同組合は大阪府堺市に拠点を置く技能実習監理団体（一般監理事業許可）。規律・礼節を重んじる独自の教育体制と、大阪府知事表彰の実績で中小企業の人材課題を解決します。',
  alternates: { canonical: 'https://solutioncoop-jp.com' },
};

async function getLatestNews(): Promise<NewsItem[]> {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const raw  = await fs.readFile(file, 'utf-8');
  const all: NewsItem[] = JSON.parse(raw);
  return all.filter(n => n.published).sort((a,b) => a.date < b.date ? 1 : -1).slice(0, 3);
}

const BADGE_BG: Record<string, string> = {
  news:   'bg-blue-100 text-blue-800',
  result: 'bg-green-100 text-green-800',
  system: 'bg-yellow-100 text-yellow-800',
  event:  'bg-purple-100 text-purple-800',
};
const TOP_ACCENT: Record<string, string> = {
  news:   'from-blue-400 to-blue-600',
  result: 'from-green-400 to-green-600',
  system: 'from-yellow-400 to-orange-500',
  event:  'from-purple-400 to-purple-600',
};

import FaqSection from '@/components/FaqSection';

export default async function HomePage() {
  const latestNews = await getLatestNews();

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">

        {/* ===== HERO ===== */}
        <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden pt-10 pb-20 lg:py-0">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <img src="/images/hero-banner.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#172554]/88 via-[#1e3a8a]/80 to-[#1e40af]/65" />
          </div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-4xl text-white space-y-6">
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                  {[
                    '一般監理事業（優良）許可',
                    '大阪府知事表彰受賞'
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-white font-bold text-sm md:text-base tracking-wider">
                      <div className="w-5 h-5 bg-[#ea580c] rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-black/20 animate-firefly">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="drop-shadow-sm">{text}</span>
                    </div>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-black leading-snug">
                  <span className="block mb-2">実習生の育成と定着を、</span>
                  <span className="block text-yellow-300">適正な監理で支えます。</span>
                </h1>
                <p className="text-base md:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
                  ソリューション協同組合は、大阪府堺市に拠点を置く<strong className="text-white">技能実習監理団体</strong>です。
                  平成24年の設立以来、独自の研修センターと12名の専任日本語教師による教育体制で、70社超の受入企業様を支援してまいりました。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== NEWS TICKER ===== */}
        <div className="bg-[#172554] border-b border-[#1e3a8a] py-2 overflow-hidden">
          <div className="flex items-center">
            <span className="flex-shrink-0 bg-orange-600 text-white text-[10px] font-black px-3 py-1.5 rounded-r-sm tracking-widest uppercase">お知らせ</span>
            <div className="flex-1 overflow-hidden ml-3">
              <div className="ticker-track text-xs text-blue-200 font-medium">
                {[...latestNews, ...latestNews].map((n, i) => (
                  <span key={i} className="mr-12">
                    <span className="text-yellow-300 font-bold mr-2">{formatDateDot(n.date)}</span>
                    {n.title}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/news" className="flex-shrink-0 text-[10px] text-blue-300 hover:text-white font-semibold px-3 py-1 transition whitespace-nowrap">
              一覧へ →
            </Link>
          </div>
        </div>

        {/* ===== KEY STATS ===== */}
        <section className="bg-[#1e40af] py-8">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { val: '60', unit: '期', label: '技能実習生受入実績' },
              { val: '70', unit: '社+', label: '受入企業数' },
              { val: '12', unit: '名', label: '専任日本語教師' },
              { val: '2012', unit: '年〜', label: '設立・10年超の実績' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl font-black text-yellow-300">{s.val}<span className="text-lg font-semibold ml-1">{s.unit}</span></p>
                <p className="text-blue-200 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 最新情報 ===== */}
        <section id="news" className="py-14 md:py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-50 opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="inline-block bg-blue-900/10 text-blue-800 font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-3">インフォメーション</span>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 section-title">最新情報・お知らせ</h2>
              </div>
              <Link href="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-800 border-2 border-blue-800 px-5 py-2.5 rounded-lg hover:bg-blue-800 hover:text-white transition-all self-start md:self-auto flex-shrink-0">
                📰 すべてのお知らせを見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((n, i) => (
                <Link key={n.id} href={`/news/${n.id}`}
                  className="card-lift bg-white border border-gray-100 rounded overflow-hidden flex flex-col group">
                  {n.image ? (
                    <div className="w-full h-44 overflow-hidden">
                      <img src={n.image} alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className={`h-2 bg-gradient-to-r ${TOP_ACCENT[n.category] || 'from-gray-400 to-gray-600'}`} />
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`nbadge ${BADGE_BG[n.category]}`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                      {i === 0 && <span className="nbadge nb-new">新着</span>}
                    </div>
                    <time className="text-xs text-gray-400 font-medium mb-2">{formatDateJP(n.date)}</time>
                    <h3 className="font-bold text-gray-800 text-sm md:text-base leading-snug mb-3 flex-1 group-hover:text-blue-800 transition">{n.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{n.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 group-hover:text-orange-600 transition mt-auto">
                      続きを読む <span className="group-hover:translate-x-1 transition inline-block">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/news"
                className="inline-flex items-center gap-3 bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-10 rounded-lg hover:-translate-y-1 transition-all duration-300">
                📰 過去のお知らせをすべて見る →
              </Link>
            </div>
          </div>
        </section>


        {/* ===== 選ばれる理由 ===== */}
        <section id="strengths" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 section-title">選ばれる理由</h2>
              <p className="text-sm text-gray-500 mt-2">Why Companies Choose Us</p>
            </div>
            <div className="max-w-3xl mx-auto mb-10 bg-blue-800 p-5 md:p-6 text-center rounded-lg">
              <p className="text-white text-sm md:text-base leading-relaxed">
                私たちは単なるサービス提供者ではありません。<br className="hidden md:block" />
                受入企業様と<strong className="text-yellow-300 text-base md:text-lg">「二人三脚の伴走型支援」</strong>で、
                グローバル人材の安定的な確保と育成を共に実現します。
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { bg: 'from-blue-50 to-white', border: 'border-blue-100', iconBg: 'bg-blue-800', icon: '🎓',
                  titleColor: 'text-blue-800', title:'「先生の先生」による日本語教育',
                  body: <>小中高校で長年教鞭をとった<strong className="text-blue-800">ベテラン教員12名</strong>が専任で指導. 単なる語学教育を超えた「規律と礼節」を根幹に置く人づくりが他に類を見ない定着率を実現します.</> },
                { bg: 'from-orange-50 to-white', border: 'border-orange-100', iconBg: 'bg-orange-600', icon: '🏥',
                  titleColor: 'text-orange-600', title:'24時間セーフティネット',
                  body: <>夜間・休日の緊急連絡にも母国語通訳スタッフが対応. 生活トラブル, 通院同行, メンタルヘルスまで一貫してサポートし, <strong>受入企業様の負担を最小化</strong>します.</> },
                { bg: 'from-green-50 to-white', border: 'border-green-100', iconBg: 'bg-green-600', icon: '🏆',
                  titleColor: 'text-green-700', title:'公的機関から認められた実績',
                  body: <>令和4年（2022）に<strong>大阪府知事表彰</strong>を受賞. 設立2012年より10年超・第60期生まで受入実績を持ち、70社超の受入企業様から信頼を頂いています.</> },
              ].map(s => (
                <div key={s.title} className={`card-lift bg-gradient-to-b ${s.bg} border ${s.border} rounded p-6 text-center`}>
                  <div className={`w-16 h-16 ${s.iconBg} flex items-center justify-center mx-auto mb-4 rounded`}>
                    <span className="text-3xl">{s.icon}</span>
                  </div>
                  <h3 className={`font-bold ${s.titleColor} text-lg mb-2`}>{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 導入事例 ===== */}
        <section id="cases" className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <span className="inline-block bg-green-100 text-green-800 font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-3">導入事例</span>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 section-title">受入企業様の実績</h2>
              <p className="text-sm text-gray-500 mt-2">業種を問わず、多くの企業様にご信頼いただいています。</p>
            </div>

            {/* ── Case Study Cards ── */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {[
                {
                  industry: '製造業',
                  industryIcon: '⚙️',
                  company: 'A社（大阪府・金属加工）',
                  people: '8',
                  country: 'ベトナム',
                  flag: 'vn',
                  duration: '5年以上継続受入',
                  highlight: '定着率',
                  highlightValue: '100',
                  highlightUnit: '%',
                  highlightColor: 'text-green-600',
                  bgAccent: 'border-t-4 border-green-500',
                  desc: '入社後の日本語教育と生活サポートにより, 受入開始から一人も途中帰国なし. 現在3期目の受入れを継続中.',
                },
                {
                  industry: '建設業',
                  industryIcon: '🏗️',
                  company: 'B社（兵庫県・とび・土工）',
                  people: '12',
                  country: 'インドネシア',
                  flag: 'id',
                  duration: '3年以上継続受入',
                  highlight: '連続受入',
                  highlightValue: '5',
                  highlightUnit: '期連続',
                  highlightColor: 'text-blue-700',
                  bgAccent: 'border-t-4 border-blue-500',
                  desc: '現場規律を重んじる教育方針が建設現場と相性◎. 技能検定合格率も高く, 元請からも高評価を獲得.',
                },
                {
                  industry: '農業',
                  industryIcon: '🌱',
                  company: 'C社（奈良県・施設園芸）',
                  people: '6',
                  country: 'ベトナム',
                  flag: 'vn',
                  duration: '2年以上継続受入',
                  highlight: '検定合格率',
                  highlightValue: '95',
                  highlightUnit: '%',
                  highlightColor: 'text-orange-600',
                  bgAccent: 'border-t-4 border-orange-500',
                  desc: '農閑期も日本語学習を継続するモチベーション管理が鍵. 母国語スタッフによるメンタルケアで安定就労.',
                },
              ].map(c => (
                <div key={c.industry} className={`bg-white ${c.bgAccent} rounded overflow-hidden card-lift`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 rounded-sm">
                        {c.industryIcon} {c.industry}
                      </span>
                      <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.country} className="h-5 rounded-sm" loading="lazy" />
                    </div>
                    <p className="text-sm font-bold text-gray-800 mb-1">{c.company}</p>
                    <p className="text-xs text-gray-400 mb-4">{c.country}から{c.people}名受入 ・ {c.duration}</p>
                    <div className="bg-gray-50 p-4 rounded text-center mb-4">
                      <p className="text-xs text-gray-500 mb-1">{c.highlight}</p>
                      <p className={`text-4xl font-black ${c.highlightColor}`}>
                        {c.highlightValue}<span className="text-lg ml-0.5">{c.highlightUnit}</span>
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── CTA Banner ── */}
            <div className="max-w-3xl mx-auto bg-blue-800 rounded-lg p-6 md:p-8 text-center shadow-lg">
              <h3 className="text-white font-bold text-lg mb-2">貴社でも導入可能です</h3>
              <p className="text-blue-200 text-sm mb-5">業種・規模を問わず、まずはお気軽にご相談ください。専門スタッフが最適なプランをご提案します。</p>
              <div className="flex justify-center">
                <TrackedLink href="/contact" eventAction="cta_click" eventLabel="casestudy_contact"
                  className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
                  ✉️ 無料相談を予約する
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </TrackedLink>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 受入れの流れ (Dynamic Timeline) ===== */}
        <section id="flow" className="py-20 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/30 -skew-x-12 translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block bg-navy/10 text-navy font-bold tracking-widest uppercase text-xs px-4 py-1.5 mb-3 rounded-full">
                受入れのスケジュール
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-navy section-title">受入れまでの流れ</h2>
              <p className="text-gray-500 mt-2 max-w-2xl mx-auto italic">
                お問い合わせから実習開始、その後のサポートまで。貴社の負担を最小限に抑え、確実な人材確保を実現します。
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-navy to-orange-400 transform md:-translate-x-1/2" />

                <div className="space-y-12 md:space-y-20">
                  {[
                    { 
                      step: '01', 
                      time: '1ヶ月目', 
                      title: 'ヒアリング・ご提案', 
                      desc: '貴社の課題、現場の雰囲気、必要な技能を深部まで分析。最適な国籍と人材像をオーダーメイドでご提案します。', 
                      icon: '💬',
                      align: 'left' 
                    },
                    { 
                      step: '02', 
                      time: '2ヶ月目', 
                      title: '現地面接・選考', 
                      desc: '現地またはオンラインで面接を実施。技能試験に加え、適性検査や家庭環境の確認まで行い、「辞めない人材」を厳選します。', 
                      icon: '🤝',
                      align: 'right' 
                    },
                    { 
                      step: '03', 
                      time: '3〜5ヶ月目', 
                      title: '現地教育・入国申請', 
                      desc: '合格者は独自の研修センターで集中教育。日本語だけでなく「日本の生活習慣・規律」を身体に染み込ませます。煩雑な書類申請は全て当組合が代行。', 
                      icon: '📄',
                      align: 'left' 
                    },
                    { 
                      step: '04', 
                      time: '6ヶ月目', 
                      title: '入国・配属', 
                      desc: '入国時の役所手続き、銀行口座開設、ライフラインの契約まで専任スタッフが完全サポート。すぐに業務に集中できる環境を整えます。', 
                      icon: '✈️',
                      align: 'right' 
                    },
                    { 
                      step: '05', 
                      time: '配属後', 
                      title: '継続的監理・定着支援', 
                      desc: '毎月の定期訪問に加え、母国語スタッフによる24時間体制の相談窓口を設置。トラブルを未然に防ぎ、高い定着率を維持します。', 
                      icon: '🛡️',
                      align: 'left'
                    },
                  ].map((item, idx) => (
                    <div key={item.step} className={`relative flex items-center justify-between md:justify-normal ${item.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline Dot with Glow */}
                      <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-navy rounded-full transform -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(30,64,175,0.3)] flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${item.step === '05' ? 'bg-orange-600 animate-pulse' : 'bg-navy'}`} />
                      </div>

                      {/* Content Card */}
                      <div className={`ml-12 md:ml-0 md:w-[45%] group`}>
                        <div className="p-6 bg-white border border-gray-100 rounded-2xl transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-100 relative group-hover:-translate-y-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl">{item.icon}</span>
                            <div>
                              <span className="block text-[10px] font-black text-orange-600 uppercase tracking-tighter">{item.time}</span>
                              <h3 className="font-bold text-lg text-navy">{item.step}. {item.title}</h3>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Net Highlight */}
            <div className="mt-20 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-navy to-navy-dark p-8 md:p-12 rounded-3xl text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10 text-8xl">🛡️</div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🤝</span>
                    受入れ後の「安心」を担保する3つの柱
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {[
                      { t: '24時間母国語相談窓口', d: 'トラブル・体調不良時、実習生の母国語で即座に対応。企業担当者様を夜間の電話から解放します。' },
                      { t: '定期巡回・メンタルケア', d: '月1回の訪問で現場の悩みと実習生の本音をキャッチ。失踪リスクを未然に排除します。' },
                      { t: '行政手続き完全代行', d: '法改正に伴う複雑な書類作成や入管への報告業務は、当組合の専門チームが全て担います。' }
                    ].map(col => (
                      <div key={col.t} className="space-y-2">
                        <p className="font-bold text-yellow-300 text-sm border-b border-white/20 pb-2 inline-block">{col.t}</p>
                        <p className="text-xs text-blue-100 leading-relaxed">{col.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 送出し国 ===== */}
        <section id="countries" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 section-title">人材・送出し国の特徴</h2>
              <p className="text-sm text-gray-500 mt-2">「どこの国でも良い」ではありません。貴社の社風に合った国を選定します。</p>
            </div>
            <div className="hidden md:block overflow-x-auto border border-gray-200 rounded max-w-5xl mx-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-5 border-b border-gray-200 bg-gray-200 text-center text-gray-600 w-1/4">特徴</th>
                    {[
                      { flag:'vn', name:'ベトナム', badge:'実績No.1', badgeCls:'bg-blue-100 text-blue-800' },
                      { flag:'id', name:'インドネシア', badge:'急成長中', badgeCls:'bg-green-100 text-green-800' },
                      { flag:'ph', name:'フィリピン', badge:'英語力', badgeCls:'bg-purple-100 text-purple-800' },
                    ].map(c => (
                      <th key={c.flag} className="p-5 border-b border-gray-200 text-blue-800 font-bold text-center">
                        <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.name} className="h-8 mx-auto mb-2 rounded-sm" loading="lazy" />
                        {c.name} <span className={`text-xs font-normal ${c.badgeCls} ml-1 px-1.5 py-0.5 rounded-sm`}>{c.badge}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  <tr>
                    <td className="p-5 font-bold bg-gray-50 text-center text-gray-600">強み・国民性</td>
                    <td className="p-5 align-top">手先が器用で勤勉。<br/>漢字文化圏で学習意欲が高く日本でのコミュニティも大きい。</td>
                    <td className="p-5 align-top">平均年齢が若く明るい。<br/>目上の人を敬い、チームワークを重視する。親日度が高い。</td>
                    <td className="p-5 align-top">英語力が高い。<br/>ホスピタリティ精神が強く明るい性格。</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-bold bg-gray-50 text-center text-orange-600">受入の留意点</td>
                    <td className="p-5 align-top">同胞意識が強いため、派閥ができやすい。SNS等での待遇比較に敏感。</td>
                    <td className="p-5 align-top">イスラム教への理解（礼拝・食事）が必要。叱られることに慣れていないため指導法に工夫が必要。</td>
                    <td className="p-5 align-top">家族との連絡を重視するためWi-Fi環境の整備が必須。権利主張がはっきりしている。</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="p-5 font-bold bg-gray-50 text-center text-gray-600">おすすめ業種</td>
                    {[['建設','製造','機械加工'],['製造','水産','農業'],['介護','接客','ビルクリ']].map((tags, i) => (
                      <td key={i} className="p-5 text-center">
                        <div className="flex flex-wrap gap-2 justify-center">
                          {tags.map(t => <span key={t} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold rounded-sm">{t}</span>)}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="block md:hidden space-y-5 max-w-md mx-auto">
              {[
                { flag:'vn', name:'ベトナム', badge:'実績No.1', badgeCls:'bg-blue-100 text-blue-800', strength:'手先が器用・勤勉・学習意欲が高い', note:'待遇比較に敏感、派閥ができやすい', tags:['建設','製造','機械加工'] },
                { flag:'id', name:'インドネシア', badge:'急成長中', badgeCls:'bg-green-100 text-green-800', strength:'若くて明るい・チームワーク重視・親日', note:'イスラム教への理解が必要', tags:['製造','水産','農業'] },
                { flag:'ph', name:'フィリピン', badge:'英語力', badgeCls:'bg-purple-100 text-purple-800', strength:'英語力高い・ホスピタリティ精神が強い', note:'Wi-Fi環境の整備が必須', tags:['介護','接客','ビルクリ'] },
              ].map(c => (
                <div key={c.flag} className="bg-white border border-gray-200 rounded overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-blue-800 text-lg flex items-center">
                      <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.name} className="w-8 h-auto mr-3 rounded-sm" loading="lazy" /> {c.name}
                    </h3>
                    <span className={`text-xs font-bold ${c.badgeCls} px-2 py-1 rounded-sm`}>{c.badge}</span>
                  </div>
                  <div className="p-5 space-y-3 text-sm text-gray-700">
                    <p><span className="font-bold text-blue-800">強み:</span> {c.strength}</p>
                    <p><span className="font-bold text-orange-600">留意点:</span> {c.note}</p>
                    <div className="flex gap-2 flex-wrap">{c.tags.map(t=><span key={t} className="bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-bold rounded-sm">{t}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== よくある質問 ===== */}
        <FaqSection />

        {/* ===== Lead Magnet ===== */}
        <LeadMagnet />


        {/* ===== CTA ===== */}
        <section id="contact" className="py-16 md:py-20 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-black mb-4">まずは無料でご相談ください</h2>
            <p className="text-base md:text-lg mb-10 opacity-90 max-w-2xl mx-auto">
              外国人材の受入れを検討されている方,<br/>
              どんなご相談でも, ソリューション協 đồng 組合がお応えします.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
              <TrackedLink href="tel:0722248067" eventAction="cta_click" eventLabel="bottom_phone"
                className="flex flex-col items-center bg-white text-blue-800 w-full md:w-80 py-6 hover:bg-gray-100 transition rounded-xl border border-gray-100">
                <span className="text-sm text-gray-500 mb-1 font-bold">お電話での相談（平日 9:00〜18:00）</span>
                <span className="text-3xl font-bold">📞 072-224-8067</span>
              </TrackedLink>
              <TrackedLink href="/contact" eventAction="cta_click" eventLabel="bottom_contact"
                className="flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white w-full md:w-80 py-6 transition rounded-xl">
                <span className="text-sm mb-1 font-bold opacity-90">メールでのご相談（24時間受付）</span>
                <span className="text-2xl font-bold">✉️ 無料相談フォーム</span>
              </TrackedLink>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
