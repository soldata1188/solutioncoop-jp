import type { Metadata } from 'next';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateJP, formatDateDot } from '@/lib/news';
import { getLatestNews, getCompanies } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
  description: 'ソリューション協同組合は、大阪府堺市を拠点とする技能実習監理団体です。規律・礼節を重んじる独自の教育体制で、中小企業の人材不足解消と組織活性化をトータルで支援します。',
  alternates: { canonical: 'https://solutioncoop-jp.com' },
  openGraph: {
    title: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
    description: '大阪府堺市を拠点とする技能実習監理団体。規律・礼節を重んじる独自の教育体制で中小企業の人材課題を解決します。',
    url: 'https://solutioncoop-jp.com',
    siteName: 'ソリューション協同組合',
    images: [{ url: '/images/ogp-main.jpg', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '【公式】技能実習 監理団体｜ソリューション協同組合',
    description: '大阪府堺市の技能実習監理団体。独自の教育体制で中小企業の成長を支援。',
    images: ['/images/ogp-main.jpg'],
  },
};

// Data fetching logic moved to @/lib/data.ts

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
  const companies = await getCompanies();

  // Phân loại tin tức NGOÀI JSX để tránh lỗi render
  const pinnedItems = latestNews.filter(n => n.pinned).slice(0, 2);
  const unpinnedItems = latestNews.filter(n => !n.pinned);
  const mainCards = unpinnedItems.slice(0, 6);
  const secondaryList = unpinnedItems.slice(6);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    name: 'ソリューション協同組合',
    alternateName: 'Solution Cooperative',
    url: 'https://solutioncoop-jp.com',
    logo: 'https://solutioncoop-jp.com/images/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '堺区甲斐町東4丁2番2号',
      addressLocality: '堺市',
      addressRegion: '大阪府',
      postalCode: '590-0953',
      addressCountry: 'JP'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-72-224-8067',
      contactType: 'customer service'
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Header />
      <main className="pt-16 md:pt-20">

        {/* ===== HERO ===== */}
        <section className="relative min-h-[650px] lg:min-h-[720px] flex flex-col overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-banner.jpg" alt="" fill priority className="object-cover" aria-hidden="true" />
            {/* Dark Premium overlay mapping the LP design */}
            <div className="absolute inset-0 bg-[#1e40af]/85 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent opacity-80" />
          </div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="flex-1 flex items-center justify-center w-full relative z-10 py-12">
            <div className="container mx-auto px-4 text-center flex flex-col items-center">
              <div className="w-full max-w-4xl text-white flex flex-col items-center gap-8">

                {/* Headline */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
                  <span className="block mb-1 md:mb-2 text-white">実習生の育成と定着を、</span>
                  <span className="block text-orange-400">適正な監理で支えます。</span>
                </h1>

                {/* Description */}
                <p className="text-base md:text-xl font-medium leading-loose text-blue-50 opacity-95 max-w-3xl mx-auto drop-shadow-sm">
                  ソリューション協同組合は、大阪府堺市を拠点とする<strong className="text-white border-b border-white pb-0.5">技能実習監理団体</strong>です。<br className="hidden md:block" />
                  平成24年の設立以来、12名の専任講師による独自の教育体制を強みに、数多くの受入企業様とともに歩んでまいりました。
                </p>

                {/* Industry Tags + Social Proof */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <span className="bg-white/15 border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded tracking-wider">建設業</span>
                    <span className="bg-white/15 border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded tracking-wider">製造業</span>
                    <span className="bg-white/15 border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded tracking-wider">農業</span>
                  </div>
                  <p className="text-sm md:text-base text-blue-100 font-bold tracking-wide text-center leading-relaxed drop-shadow-sm">
                    建設・製造・農業を中心に、大阪・関西圏の<span className="text-orange-400 font-black mx-1 text-lg md:text-xl">70社を超える企業</span>に導入されています。
                  </p>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-lg">
                  <Link href="#support" className="flex-1 bg-white hover:bg-blue-50 text-navy font-black py-4 px-6 rounded shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center group">
                    <span className="text-lg">24/7 Support</span>
                    <span className="text-[10px] text-gray-400 font-bold opacity-80 mt-0.5">実習生・外国人材の方</span>
                  </Link>
                  <Link href="#contact" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                    <div className="flex flex-col items-center">
                       <span className="text-lg">企業様はこちら</span>
                       <span className="text-[10px] text-white/70 font-bold mt-0.5">無料相談・導入のご検討</span>
                    </div>
                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
          
          {/* ===== COMPANY MARQUEE (Social Proof) ===== */}
          <div className="relative w-full z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-[#1e40af]/40 backdrop-blur-md mt-auto">
            <div className="flex-1 overflow-hidden flex items-center">
              {/* Base block */}
              <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]">
                {companies.map((c, i) => (
                  <span key={`a-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                    {c}
                  </span>
                ))}
              </div>
              {/* Duplicate block for seamless infinite scrolling */}
              <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]" aria-hidden="true">
                {companies.map((c, i) => (
                  <span key={`b-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* ===== KEY STATS ===== */}
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '60', unit: '期', label: '技能実習生受入実績' },
              { val: '70', unit: '社+', label: '受入企業数' },
              { val: '12', unit: '名', label: '専任日本語教師' },
              { val: '2012', unit: '年〜', label: '設立・10年超の実績' },
            ].map(s => (
              <div key={s.label} className="group cursor-default">
                <p className="text-3xl font-black text-[#1e40af] group-hover:scale-105 transition-transform duration-300">{s.val}<span className="text-xl font-bold ml-1">{s.unit}</span></p>
                <p className="text-gray-500 text-[10px] mt-2 tracking-widest uppercase font-bold">{s.label}</p>
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
                <h2 className="text-2xl md:text-3xl font-black text-[#1e40af] section-title uppercase tracking-tight">最新情報</h2>
              </div>
              <Link href="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 border-2 border-blue-600 px-6 py-2.5 rounded hover:bg-blue-600 hover:text-white transition-all self-start md:self-auto flex-shrink-0 shadow-sm hover:shadow-md">
                📰 すべてのお知らせを見る →
              </Link>
            </div>
            {latestNews.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* --- CỘT TRÁI (8/12): 6 bài chính --- */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {mainCards.map((n) => (
                      <Link key={n.id} href={`/news/${n.id}`} className="group flex flex-col bg-white border border-gray-100 rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-44 w-full overflow-hidden shrink-0">
                          {n.image ? (
                            <Image src={n.image} alt={n.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${TOP_ACCENT[n.category] || 'from-gray-400 to-gray-600'} opacity-90`} />
                          )}
                        </div>
                        <div className="p-4 flex flex-col flex-grow text-left">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${BADGE_BG[n.category]}`}>
                              {CATEGORY_CONFIG[n.category]?.label}
                            </span>
                          </div>
                          <h3 className="text-sm font-black text-navy leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {n.title}
                          </h3>
                          <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-3 font-medium">
                            {n.excerpt}
                          </p>
                          <time className="text-[10px] text-gray-400 font-bold mt-auto tracking-wider">{formatDateDot(n.date)}</time>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* --- CỘT PHẢI (4/12): Unified News List --- */}
                <div className="lg:col-span-4 flex flex-col gap-0">
                  <div className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden h-full flex flex-col">

                    {/* Pinned section */}
                    {pinnedItems.length > 0 && (
                      <>
                        <div className="border-l-4 border-[#f97316] px-5 py-3 bg-orange-50/40 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse inline-block" />
                          <h3 className="text-[11px] font-black text-gray-700 tracking-widest uppercase">重要なお知らせ</h3>
                        </div>
                        <div className="divide-y divide-gray-50 px-4">
                          {pinnedItems.map((n) => (
                            <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start py-4">
                              {n.image ? (
                                <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5 relative">
                                  <Image src={n.image} alt={n.title} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform" />
                                </div>
                              ) : (
                                <div className={`w-16 h-16 flex-shrink-0 rounded bg-gradient-to-br ${TOP_ACCENT[n.category] || 'from-gray-400 to-gray-600'} mt-0.5 flex items-center justify-center`}>
                                  <span className="text-[9px] font-black text-white/80 -rotate-12 inline-block">PIN</span>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <time className="text-[10px] text-[#f97316] font-bold tracking-wider block mb-1">{formatDateDot(n.date)}</time>
                                <h4 className="text-xs font-normal text-gray-800 leading-snug line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Recent section */}
                    <div className="border-l-4 border-[#1e40af] px-5 py-3 bg-blue-50/30 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af] inline-block" />
                      <h3 className="text-[11px] font-black text-gray-700 tracking-widest uppercase">最新のお知らせ</h3>
                    </div>
                    <div className="divide-y divide-gray-50 px-4 flex-grow">
                      {secondaryList.map((n) => (
                        <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start py-4">
                          {n.image ? (
                            <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5 relative">
                              <Image src={n.image} alt={n.title} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                          ) : (
                            <div className={`w-16 h-16 flex-shrink-0 rounded bg-gradient-to-br from-blue-50 to-white border border-blue-100 mt-0.5 flex items-center justify-center`}>
                              <span className="text-[9px] font-black text-blue-300 -rotate-12 inline-block">NEWS</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <time className="text-[10px] text-[#f97316] font-bold tracking-wider block mb-1">{formatDateDot(n.date)}</time>
                            <h4 className="text-xs font-normal text-gray-700 leading-snug line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                          </div>
                        </Link>
                      ))}
                      {secondaryList.length === 0 && (
                        <p className="text-[10px] text-gray-400 text-center py-4">現在、他のお知らせはありません。</p>
                      )}
                    </div>

                    {/* Footer link */}
                    <div className="px-5 py-4 border-t border-gray-100 mt-auto">
                      <Link href="/news" className="flex items-center justify-between group">
                        <span className="text-xs font-black text-navy group-hover:text-[#f97316] transition-colors">すべてのお知らせを見る</span>
                        <span className="w-6 h-6 rounded bg-navy text-white flex items-center justify-center text-[10px] group-hover:bg-[#f97316] group-hover:translate-x-1 transition-all">→</span>
                      </Link>
                    </div>

                  </div>
                </div>


              </div>
            ) : (
              <p className="text-gray-500 text-center py-10">現在、新しいお知らせはありません。</p>
            )}
          </div>
        </section>


        {/* ===== 選ばれる理由 (CRO Copy) ===== */}
        <section id="strengths" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-20" />
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 md:mb-20">
              <span className="text-[#f97316] font-black tracking-widest text-xs uppercase mb-3 block">70社超の企業様に選ばれた実績</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#1e40af] section-title leading-tight">
                選ばれる理由
              </h2>
              <p className="text-[#f97316] font-bold mt-2">法令順守と手厚いサポートによる高い定着率。</p>
              <p className="text-gray-500 mt-6 leading-relaxed max-w-2xl mx-auto font-medium">
                受入企業様が安心して「技能移転」に専念できるよう、煩雑な事務手続きのご負担を軽減。<br className="hidden md:block"/>
                入国前からの<strong className="text-[#1e40af] font-bold mx-1">「規律と礼節」</strong>を重んじる独自の教育体制で、<br className="hidden md:block"/>
                グローバル人材の安定的な育成を支援します。
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { bg: 'from-blue-50 to-white', border: 'border-blue-100/50', iconBg: 'bg-navy', icon: '🎓',
                  titleColor: 'text-navy', title:'「先生の先生」による日本語教育',
                  body: <>小中高校で長年教鞭をとった<strong className="text-navy">ベテラン教員12名</strong>が専任で指導. 単なる語学教育を超えた「規律と礼節」を根幹に置く人づくりが他に類を見ない定着率を実現します.</> },
                { bg: 'from-orange-50 to-white', border: 'border-orange-100/50', iconBg: 'bg-orange-500', icon: '🏥',
                  titleColor: 'text-orange-600', title:'24時間セーフティネット',
                  body: <>夜間・休日の緊急連絡にも母国語通訳スタッフが対応. 生活トラブル, 通院同行, メンタルヘルスまで一貫してサポートし, <strong>受入企業様の負担を最小化</strong>します.</> },
                { bg: 'from-green-50 to-white', border: 'border-green-100/50', iconBg: 'bg-[#06C755]', icon: '🏆',
                  titleColor: 'text-green-700', title:'公的機関から認められた実績',
                  body: <>設立2012年より10年超・第60期生までの受入実績を持ち、70社超の受入企業様から信頼を頂いています.</> },
              ].map(s => (
                <div key={s.title} className={`card-lift bg-gradient-to-br ${s.bg} border ${s.border} rounded p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}>
                  <div className={`w-16 h-16 ${s.iconBg} flex items-center justify-center mx-auto mb-5 rounded shadow-lg transform -translate-y-2`}>
                    <span className="text-3xl drop-shadow-md">{s.icon}</span>
                  </div>
                  <h3 className={`font-black tracking-tight ${s.titleColor} text-lg mb-3`}>{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify px-1">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>









        {/* ===== 24時間365日 相談窓口 (merged from /support) ===== */}
        <section id="support" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-t border-gray-200">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-14">
              {/* Target Audience Label */}
              <div className="inline-block bg-[#1e40af] text-white font-black px-5 py-2 rounded mb-6 shadow-md text-sm md:text-base tracking-widest">
                🧑‍🔧 外国人材・実習生のみなさまへ<br/>
                <span className="text-[10px] md:text-xs opacity-80 font-bold block mt-0.5">To Foreign Talents and Interns</span>
              </div>
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#1e40af]/10 border border-[#1e40af]/20 px-4 py-1.5 rounded">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded h-2 w-2 bg-orange-500"></span>
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-[#1e40af]">年中無休・24時間対応 <span className="opacity-60 ml-1">/ Open 24/7</span></span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1e40af] mb-4 leading-tight">
                24時間365日対応<br className="md:hidden" />
                <span className="text-[#f97316]">相談窓口</span>
              </h2>
              <p className="text-[10px] md:text-xs text-orange-500 font-bold tracking-[0.2em] uppercase mb-8">
                24/7 MULTILINGUAL CONSULTATION HOTLINE
              </p>
              <div className="mb-0">
                <p className="text-slate-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-bold mb-2">
                  実習生の安心な日本生活を、母国語スタッフが全力でサポートします。
                  <span className="text-[10px] md:text-sm text-gray-400 font-medium md:ml-3 block md:inline-block mt-1 md:mt-0">Our native staff fully support your safe stay in Japan.</span>
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 transition-all duration-500">
                <div className="flex flex-col items-center gap-2">
                  <Image src="https://flagcdn.com/vn.svg" alt="Vietnam" width={40} height={28} className="rounded-sm object-cover shadow-sm" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">ベトナム語<br/><span className="text-[9px] text-gray-400">Vietnamese</span></span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image src="https://flagcdn.com/id.svg" alt="Indonesia" width={40} height={28} className="rounded-sm object-cover shadow-sm" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">インドネシア語<br/><span className="text-[9px] text-gray-400">Indonesian</span></span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Image src="https://flagcdn.com/ph.svg" alt="Philippines" width={40} height={28} className="rounded-sm object-cover shadow-sm" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">タガログ語<br/><span className="text-[9px] text-gray-400">Tagalog</span></span>
                </div>
              </div>
            </div>

            {/* Contact Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
              {/* Facebook */}
              <div className="group bg-white rounded border border-gray-100 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="bg-[#1877F2]/5 p-8 flex items-center justify-center border-b border-[#1877F2]/10 group-hover:bg-[#1877F2]/10 transition-colors">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500 text-[#1877F2]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 text-center">
                  <h3 className="text-xl font-black text-[#1877F2] mb-1">Facebookで相談</h3>
                  <p className="text-[10px] text-[#1877F2]/60 font-bold mb-4 tracking-widest uppercase italic font-mono">Consult via Facebook</p>
                  <div className="flex-1 mb-4 flex flex-col justify-center">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold mb-1.5">Messengerからも母国語スタッフが個別に対応いたします。</p>
                    <p className="text-[10px] text-slate-400 font-medium">Native staff will respond to you individually through Messenger.</p>
                  </div>
                  <div className="p-2 bg-white border border-gray-100 rounded shadow-inner inline-block mx-auto mb-4">
                    <Image src="/images/fb-qr.png" alt="Facebook QR" width={112} height={112} className="object-contain" />
                    <p className="text-[10px] text-slate-400 mt-1 font-bold">QR code for Messenger</p>
                  </div>
                  <a href="https://www.facebook.com/solution.sakai" target="_blank" rel="noopener noreferrer"
                    className="w-full bg-[#1877F2] text-white font-black py-4 px-2 rounded hover:opacity-90 transition-all shadow-md text-sm flex flex-col items-center">
                    <span>Messengerを開く</span>
                    <span className="text-[10px] font-bold opacity-80 mt-0.5 tracking-wider uppercase">Open Messenger</span>
                  </a>
                </div>
              </div>

              {/* LINE */}
              <div className="group bg-white rounded border border-gray-100 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-[#06C755] text-white text-[9px] font-bold px-3 py-1 rounded-bl tracking-widest uppercase">Popular</div>
                <div className="bg-[#06C755]/5 p-8 flex items-center justify-center border-b border-[#06C755]/10 group-hover:bg-[#06C755]/10 transition-colors">
                  <span className="group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-14 h-14 object-contain" />
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1 text-center">
                  <h3 className="text-xl font-black text-[#06C755] mb-1">LINEで相談</h3>
                  <p className="text-[10px] text-[#06C755]/60 font-bold mb-4 tracking-widest uppercase italic font-mono">Consult via LINE</p>
                  <div className="flex-1 mb-4 flex flex-col justify-center">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold mb-1.5">友だち追加後、チャットでいつでもメッセージをお送りいただけます。</p>
                    <p className="text-[10px] text-slate-400 font-medium">You can send messages at any time via LINE chat.</p>
                  </div>
                  <div className="p-2 bg-white border border-gray-100 rounded shadow-inner inline-block mx-auto mb-4">
                    <Image src="/images/line-qr.png" alt="LINE QR" width={112} height={112} className="object-contain" />
                    <p className="text-[10px] text-slate-400 mt-1 font-bold">Add us on LINE</p>
                  </div>
                  <a href="https://lin.ee/rBe1tM6" target="_blank" rel="noopener noreferrer"
                    className="w-full bg-[#06C755] text-white font-black py-4 px-2 rounded hover:opacity-90 transition-all shadow-md text-sm flex flex-col items-center">
                    <span>LINE 友だち登録へ</span>
                    <span className="text-[10px] font-bold opacity-80 mt-0.5 tracking-wider uppercase">Add as Friend</span>
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="group bg-white rounded border border-gray-100 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="bg-slate-50 p-8 flex items-center justify-center border-b border-gray-100 group-hover:bg-blue-50 transition-colors">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">📞</span>
                </div>
                <div className="p-6 flex flex-col flex-1 text-center">
                  <h3 className="text-xl font-black text-[#1e40af] mb-1">電話で相談</h3>
                  <p className="text-[10px] text-[#1e40af]/60 font-bold mb-4 tracking-widest uppercase italic font-mono">Consult by Phone</p>
                  <div className="flex-1 mb-3 flex flex-col justify-center">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold mb-1.5">緊急時、すぐにお話したい場合はこちらへお電話ください。</p>
                    <p className="text-[10px] text-slate-400 font-medium">In case of emergency, please call us here immediately.</p>
                  </div>
                  <a href="tel:0722248067" className="block text-2xl font-black text-[#1e40af] hover:text-[#f97316] transition-colors mb-4">
                    072-224-8067
                  </a>
                  <a href="tel:0722248067"
                    className="w-full bg-[#1e40af] text-white font-black py-4 px-2 rounded hover:bg-[#1d4ed8] transition-all shadow-md text-sm flex flex-col items-center">
                    <span>今すぐ発信する</span>
                    <span className="text-[10px] font-bold opacity-80 mt-0.5 tracking-wider uppercase">Call Now</span>
                  </a>
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* ===== 組合概要 (Overview) ===== */}
        <section id="overview" className="py-20 md:py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4 section-title">組合概要・法人情報</h2>
            </div>
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded overflow-hidden shadow-sm">
              <div className="bg-[#1e40af] px-6 py-4 flex items-center gap-3">
                <span className="text-orange-400 text-lg">🏛️</span>
                <span className="text-white font-bold">監理団体 法人情報</span>
              </div>
              <div className="w-full">
                <div className="flex flex-col divide-y divide-blue-50/50">
                  {[
                    ['法人名称', <div key="n"><strong className="text-slate-800 text-base">ソリューション協同組合</strong><br/><span className="text-xs text-slate-500 font-bold tracking-widest">Solution Cooperative （略称：SKK）</span></div>],
                    ['住所', <div key="a">〒590-0953 大阪府堺市堺区甲斐町東4丁2番2号 <a href="https://www.google.com/maps/search/?api=1&query=%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%8D%90%E5%90%8C%E7%B5%84%E5%90%88+%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%A0%BA%E5%B8%82%E5%A0%BA%E5%8C%BA%E7%94%B2%E6%96%90%E7%94%BA%E6%9D%B14%E4%B8%812%E7%95%AA2%E5%8F%B1" target="_blank" rel="noopener noreferrer" className="inline-block mt-1 md:mt-0 md:inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 px-2 py-0.5 rounded transition-colors font-bold md:ml-2">📍 MAP</a><br/><span className="text-xs text-slate-400 mt-1 block">本社・日本語研修センター</span></div>],
                    ['監理団体許可番号', <span key="l" className="font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded text-sm">許1708000610</span>],
                    ['代表理事', '新 雅志'],
                    ['電話番号', <><a key="t" href="tel:0722248067" className="text-blue-800 font-bold hover:text-blue-600 transition text-lg">072-224-8067</a><span key="d" className="text-slate-400 text-xs ml-2">（平日 9:00〜18:00）</span></>],
                    ['FAX', '072-224-2214'],
                    ['メール', <a key="e" href="mailto:info@solutioncoop-jp.com" className="text-blue-800 hover:underline">info@solutioncoop-jp.com</a>],
                    ['設立', '平成24年（2012年）3月'],
                    ['受賞歴', <div key="a2" className="flex flex-col items-start gap-2 py-1">
                      <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold rounded shadow-sm">🎖️ 令和8年5月 憲法記念日知事表彰受賞</span>
                      <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold rounded shadow-sm">🥇 令和4年9月 大阪府知事表彰受賞</span>
                      <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold rounded shadow-sm">🏆 令和元年9月 大阪府中小企業団体表彰受賞</span>
                    </div>],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="grid grid-cols-1 md:grid-cols-12 hover:bg-slate-50 transition-colors group">
                      <div className="px-5 pt-4 pb-2 md:px-6 md:py-5 font-bold text-[#1e40af] bg-slate-50 group-hover:bg-blue-50/30 md:border-r border-gray-100 text-sm md:col-span-4 lg:col-span-3 flex items-center">
                        {label as string}
                      </div>
                      <div className="px-5 pb-4 md:px-6 md:py-5 text-slate-800 leading-relaxed text-sm flex items-center md:col-span-8 lg:col-span-9">
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 情報公開 (Disclosure) ===== */}
        <section id="disclosure" className="py-20 md:py-24 bg-blue-50/50 text-slate-800 relative border-t border-blue-100">
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-4 py-2 mb-4 rounded">
                <span className="text-yellow-800 font-bold text-xs uppercase tracking-wider">⚖️ 技能実習法 第32条・第37条 準拠</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-blue-900">情報公開・公開書類</h2>
              <div className="w-16 h-1 bg-orange-500 mx-auto rounded" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                { label:'監理費用の明細', icon:'📄', desc:'監理費用の内訳および用途の明細' },
                { label:'運営規程', icon:'📖', desc:'当組合の事業運営に関する基本規則' },
                { label:'監理団体事業報告書', icon:'📋', desc:'年度ごとの事業実績および活動報告' },
                { label:'監理団体許可証の写し', icon:'🏅', desc:'法務省・厚生労働省からの事業許可証' },
              ].map(d => (
                <Link key={d.label} href="/disclosure"
                  className="group flex items-center gap-4 p-5 bg-white border border-gray-200 rounded hover:border-[#1e40af] hover:shadow-md transition-all">
                  <span className="text-3xl bg-slate-50 group-hover:bg-blue-50 text-[#1e40af] p-3 rounded transition-colors">{d.icon}</span>
                  <div className="flex-1">
                    <span className="font-black text-sm block mb-1 text-slate-800 group-hover:text-[#1e40af] transition-colors">{d.label}</span>
                    <span className="text-[10px] text-slate-500">{d.desc}</span>
                  </div>
                  <span className="ml-auto text-xl text-blue-200 group-hover:text-[#1e40af] transition-colors">→</span>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
              {[
                { icon:'⚖️', title:'法令遵守', desc:'技能実習法に完全準拠した事業運営' },
                { icon:'👁️', title:'透明性の確保', desc:'全費用・手数料の書面による明示' },
                { icon:'🛡️', title:'実習生の保護', desc:'不当な徴収の禁止と人権の尊重' },
              ].map(p => (
                <div key={p.title} className="bg-white p-5 text-center rounded border border-blue-100 shadow-sm hover:border-blue-300 transition-colors">
                  <p className="text-blue-500 text-3xl mb-3">{p.icon}</p>
                  <p className="text-blue-900 font-black text-sm mb-1">{p.title}</p>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>





        {/* ===== CTA (B2B Host Companies) ===== */}
        <section id="contact" className="py-20 md:py-28 bg-white text-slate-800 relative overflow-hidden border-t-8 border-[#f97316]">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Target Audience Label */}
            <div className="inline-block bg-[#1e40af] text-white font-black px-6 py-2.5 rounded mb-8 shadow-md text-sm md:text-base tracking-widest">
              🏢 受入企業様・人事ご担当者様へ
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 tracking-tight text-[#1e40af]">
              まずは無料でご相談ください
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-bold tracking-widest mb-8">
              お気軽にお問い合わせください。まずは無料相談から。
            </p>

            <div className="border-b border-gray-200 pb-10 mb-12 max-w-2xl mx-auto">
              <p className="text-base md:text-xl leading-loose text-gray-600 font-bold mb-4">
                外国人材の受入れを検討されている方、<br className="hidden md:block"/>
                貴社に最適な受入れプランを、私たちが共に考え、<strong className="text-[#f97316] font-black mx-1 border-b-[3px] border-[#f97316] pb-0.5">ご提案</strong>いたします。
              </p>
              <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed">
                外国人材の受入れを検討されている企業様のご相談を、専門スタッフが丁寧にサポートいたします。
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8">
              <TrackedLink href="tel:0722248067" eventAction="cta_click" eventLabel="bottom_phone"
                className="flex flex-col items-center justify-center bg-white text-[#1e40af] border-2 border-slate-200 w-full md:w-80 py-4 px-4 hover:border-[#1e40af] hover:shadow-md transition-all rounded group">
                <span className="text-xs md:text-sm text-gray-500 mb-1 font-bold group-hover:text-blue-500 transition-colors">お電話でのご相談 <span className="opacity-70 text-[10px]">/ Phone</span></span>
                <span className="text-2xl md:text-3xl font-black text-[#1e40af] whitespace-nowrap mb-1">📞 072-224-8067</span>
                <span className="text-[10px] text-gray-400 font-medium">平日 9:00〜18:00 (Weekdays)</span>
              </TrackedLink>
              <TrackedLink href="/contact" eventAction="cta_click" eventLabel="bottom_contact"
                className="flex flex-col items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white w-full md:w-80 py-5 transition-all rounded shadow-lg group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
                <span className="text-xs md:text-sm font-bold opacity-90 mb-1 tracking-wider">ウェブからのご相談</span>
                <span className="text-xl md:text-2xl font-black flex items-center gap-2 whitespace-nowrap mb-1">✉️ Webから無料相談</span>
                <span className="text-[10px] text-white/70">Webお問い合わせフォーム</span>
              </TrackedLink>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
