import React from 'react';
import Image from 'next/image';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { getLatestNews, getCompanies } from '@/lib/data';

import LPClientComponents from './LPClientComponents';
import CountrySatellite from '@/components/CountrySatellite';
import UnionNetwork from '@/components/UnionNetwork';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '【企業様向け】外国人材採用・育成就労サポート｜ソリューション協同組合',
  description: '大阪府堺市の監理団体「ソリューション協同組合」の企業様向け特設ページ。育成就労・特定技能への制度移行対応から、採用コスト削減、24時間365日の母国語サポートまで、企業のグローバル人材戦略を強力に推進します。',
  alternates: { canonical: 'https://solutioncoop-jp.com/lp' },
  openGraph: {
    title: '【企業様向け】外国人材採用・育成就労サポート｜ソリューション協同組合',
    description: '育成就労制度への移行期における最適な人材戦略をご提案。仲介手数料ゼロ、24時間サポートで定着率アップ。',
    url: 'https://solutioncoop-jp.com/lp',
    images: [{ url: '/images/hero-banner.jpg' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '外国人材採用の最適解｜ソリューション協同組合',
    description: '大阪・堺の監理団体が企業の採用コスト削減と定着をフルサポート。',
  },
};


// Data fetching logic moved to @/lib/data.ts

export default async function LandingPage() {
  const latestNews = await getLatestNews();
  const companies = await getCompanies();

  // JSON-LD: Breadcrumb
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'HOME', item: 'https://solutioncoop-jp.com' },
      { '@type': 'ListItem', position: 2, name: '企業様向け', item: 'https://solutioncoop-jp.com/lp' },
    ]
  };

  // JSON-LD: FAQ (Schema for Rich Results)
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '技能実習制度と育成就労制度の違いは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '育成就労制度は, 従来の技能実習制度に代わり, 人材育成と人材確保を目的とした新制度です. 3年間の就労を通じて「特定技能1号」への移行を前提とした仕組みとなっています.'
        }
      },
      {
        '@type': 'Question',
        name: '受入れが可能な国はどこですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '当組合では現在, ベトナム, インドネシア, フィリピンの3カ国からの受入れに対応しています.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Header />
      <main className="pt-16 md:pt-20 min-h-screen">
      {/* ===== SECTION 1: HERO SECTION ===== */}
      <section className="relative min-h-[650px] lg:min-h-[720px] flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0 text-white">
          <Image src="/images/hero-banner.jpg" alt="Partner" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[#1e40af]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent opacity-80" />
        </div>
        <div className="flex-1 flex items-center justify-center w-full relative z-10 py-12">
          <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <div className="max-w-5xl mx-auto text-white flex flex-col items-center gap-8">

            {/* Headline */}
            <h1 className="text-[26px] sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              「育成就労」×「特定技能」<br />
              <span className="text-orange-400 block mt-2 text-[32px] sm:text-4xl md:text-6xl drop-shadow-md">最適解を、共に創る。</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-xl font-medium leading-relaxed md:leading-loose text-blue-50 opacity-95 max-w-3xl mx-auto drop-shadow-sm">
              複雑化する制度移行期だからこそ、両制度を熟知した専門家の力が不可欠です。<br className="hidden md:block" />
              直結ルートでの採用から、煩雑な手続きの完全代行、定着までの伴走支援で<br className="hidden md:block"/>
              貴社のグローバル人材戦略を強力に推進します。
            </p>
            <a href="/contact" className="inline-flex w-full md:w-auto items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-4 md:py-5 px-2 md:px-12 rounded shadow-[0_10px_30px_rgba(249,115,22,0.3)] transform hover:-translate-y-1 transition-all duration-300 text-[15px] sm:text-base md:text-xl group border border-orange-400 tracking-wider">
              【無料】まずは話だけでも聞いてみる ➔
            </a>

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
            
          </div>
        </div>
        </div>
        <div className="relative w-full z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-[#1e40af]/40 backdrop-blur-md mt-auto">
          <div className="flex-1 overflow-hidden flex items-center">
            {/* Base block */}
            <div className="flex shrink-0 animate-marquee items-center text-[10px] md:text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused] whitespace-nowrap">
              {companies.map((c, i) => (
                <span key={`a-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default">
                  <span className="w-1.5 h-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  {c}
                </span>
              ))}
            </div>
            {/* Duplicate block for seamless infinite scrolling */}
            <div className="flex shrink-0 animate-marquee items-center text-[10px] md:text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused] whitespace-nowrap" aria-hidden="true">
              {companies.map((c, i) => (
                <span key={`b-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default">
                  <span className="w-1.5 h-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION: KEY STATS ===== */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: '60', unit: '期', label: '人材受入実績' },
            { val: '70', unit: '社+', label: '支援企業数' },
            { val: '95', unit: '%', label: '外国人材の定着率' },
            { val: '2012', unit: '年〜', label: '設立・10年超の実績' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-black text-[#1e40af]">{s.val}<span className="text-xl font-bold ml-1">{s.unit}</span></p>
              <p className="text-gray-500 text-[10px] mt-2 tracking-widest uppercase font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ===== SECTION: COUNTRIES INTERACTIVE (SATELLITE EFFECT) ===== */}
      <section id="countries" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1e40af] mb-6 leading-tight">
              「辞めない人材」は、<br className="hidden md:block"/>最初の<span className="text-orange-500 border-b-4 border-orange-500 pb-1">国籍選び</span>から始まります
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
              「どこの国も同じだろう」という妥協が、早期離職のもとになります。<br className="hidden md:block"/>
              国民性、宗教観、得意な作業特性を深く分析し、貴社の「社風」や「業務内容」に<br className="hidden md:block"/>
              最も共鳴する人材を、厳選した3大送出国からオーダーメイドでご提案します。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                name: 'ベトナム', 
                flag: 'vn', 
                trait: '圧倒的なハングリー精神と手先の器用さ', 
                desc: '漢字文化圏に属しているため理解が早く、勤勉で向上心が非常に高いのが特徴です。精密さや手先の感覚が求められる現場で即座に戦力となります。',
                sector: '機械加工・建設・食品製造' 
              },
              { 
                name: 'インドネシア', 
                flag: 'id', 
                trait: 'チームの和を重んじる、明るい親日家', 
                desc: '平均年齢が若く、体力があり、礼儀正しさとチームワークを大切にします。職場の雰囲気を明るくし、高齢化が進む現場に活気をもたらす人材として最適です。',
                sector: '自動車整備・建設・農業' 
              },
              { 
                name: 'フィリピン', 
                flag: 'ph', 
                trait: '抜群の英語力と天性のホスピタリティ', 
                desc: '明るくフレンドリーな性格で、適応力やコミュニケーション能力は随一。人と接する業務や、思いやりが求められる対人サービスにおいて極めて高い評価を得ています。',
                sector: '介護・ビルクリ・宿泊接客' 
              }
            ].map(c => (
              <div key={c.name} className="border border-gray-200 rounded p-8 hover:border-[#1e40af] transition-all text-center group bg-gray-50 hover:bg-white hover:shadow-xl relative overflow-hidden flex flex-col">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#1e40af] opacity-5 rounded-bl-full pointer-events-none" />
                <Image src={`https://flagcdn.com/w80/${c.flag}.png`} alt={c.name} width={80} height={53} className="mx-auto mb-5 rounded shadow-md border border-gray-100" />
                <h3 className="text-2xl font-black text-[#1e40af] tracking-wide mb-3">{c.name}</h3>
                <p className="text-orange-600 font-bold text-sm mb-5 leading-tight">{c.trait}</p>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-justify mb-8">{c.desc}</p>
                <div className="pt-5 border-t border-gray-200 mt-auto">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                    <span className="w-4 h-px bg-gray-300"></span>
                    真価を発揮する業種
                    <span className="w-4 h-px bg-gray-300"></span>
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {c.sector.split('・').map(s => (
                      <span key={s} className="bg-white text-[#1e40af] border border-blue-100 px-3 py-1.5 text-xs font-bold rounded shadow-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: UNION NETWORK (NEW INTERACTIVE GRID) ===== */}
      <section id="network" className="py-24 bg-slate-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1e40af] mb-6 leading-tight">
              「実習生」と「企業」を結ぶ<br className="hidden md:block"/>
              強固な<span className="text-orange-500 border-b-4 border-orange-500 pb-1">支援ネットワーク</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
              ソリューション協同組合は、多くの優良企業と優秀な人材を繋ぐハブ（中枢）として機能しています。<br className="hidden md:block"/>
              顔の見える密な関係性が、トラブルゼロと高い定着率を実現する基盤となっています。
            </p>
          </div>
          <UnionNetwork />
        </div>
      </section>


      {/* ===== SECTION: SUCCESS STORIES (導入事例) ===== */}
      <section id="cases" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-[10px] md:text-sm font-black text-orange-500 tracking-[0.2em] uppercase mb-4">Case Studies</h2>
            <p className="text-2xl md:text-4xl font-black text-[#1e40af] mb-6 leading-tight">
              導入企業の<span className="text-orange-500">成幸</span>事例
            </p>
            <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mb-8"></div>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
              課題を抱えていた企業様が、当組合を通じてどのように変革を遂げたのか。<br className="hidden md:block"/>
              地域・業種別のリアルな声をお届けします。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                category: '建設業',
                location: '大阪府堺市',
                title: '若手不足を解消し、現場に活気が戻った',
                problem: '従業員の高齢化が進み、20代・30代の採用が困難に。',
                solution: 'ベトナムから意欲の高い3名の若手を採用。',
                result: '技術の継承がスムーズになり、現場の平均年齢が15歳若返った。',
                image: '/images/case-construction.png',
                tagColor: 'bg-blue-600'
              },
              {
                category: '製造業（金属加工）',
                location: '大阪府東大阪市',
                title: '多国籍チームで生産性が20%向上',
                problem: '受注増に対し、人手不足で機会損失が発生していた。',
                solution: 'インドネシアとフィリピンの混成チームを編成。',
                result: '交代制勤務が可能になり、工場の稼働率が劇的に改善。',
                image: '/images/case-manufacturing.png',
                tagColor: 'bg-slate-700'
              },
              {
                category: '農業',
                location: '関西広域',
                title: '安定した労働力確保で事業拡大へ',
                problem: '季節による労働需要の変動が激しく、募集コストが膨大に。',
                solution: '特定技能制度を活用し、通年での安定雇用に移行。',
                result: '採用コストを年間300万円削減。浮いた資金で新設備を導入。',
                image: '/images/case-agriculture.png',
                tagColor: 'bg-emerald-600'
              }
            ].map((caseItem, idx) => (
              <div key={idx} className="bg-white rounded overflow-hidden shadow-lg border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={caseItem.image} 
                    alt={caseItem.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className={`absolute top-4 left-4 ${caseItem.tagColor} text-white text-[10px] font-black px-3 py-1 rounded tracking-widest`}>
                    {caseItem.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-[10px] font-bold opacity-80 flex items-center gap-1">
                      <span>📍</span> {caseItem.location}
                    </p>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-[#1e40af] mb-5 leading-tight group-hover:text-orange-600 transition-colors">
                    {caseItem.title}
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-black text-[10px] border border-red-100">課題</span>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1.5">{caseItem.problem}</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#1e40af] flex items-center justify-center font-black text-[10px] border border-blue-100">施策</span>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1.5">{caseItem.solution}</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black text-[10px] border border-orange-100">成果</span>
                      <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed pt-1.5">{caseItem.result}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-dotted border-gray-200">
                    <Link href="/contact" className="text-[12px] font-black text-[#1e40af] flex items-center gap-2 hover:text-orange-500 transition-colors">
                      この事例の詳細を聞く <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Client Components (Pillars, Form, etc.) */}
      <LPClientComponents />
    </main>
    </>
  );
}
