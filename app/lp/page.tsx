import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateJP } from '@/lib/news';
import LPClientComponents from './LPClientComponents';
import Header from '@/components/Header';


async function getLatestNews(): Promise<NewsItem[]> {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const raw  = await fs.readFile(file, 'utf-8');
  const all: NewsItem[] = JSON.parse(raw);
  return all.filter(n => n.published).sort((a,b) => a.date < b.date ? 1 : -1).slice(0, 3);
}

async function getCompanies(): Promise<string[]> {
  try {
    const file = path.join(process.cwd(), 'data', 'companies.json');
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch (e) { return []; }
}

export default async function LandingPage() {
  const latestNews = await getLatestNews();
  const companies = await getCompanies();

  return (
    <>
      <Header />
      <main className="min-h-screen">
      {/* ===== SECTION 1: HERO SECTION ===== */}
      <section className="relative min-h-[100vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden py-10 md:py-0">
        <div className="absolute inset-0 z-0 text-white">
          <img src="/images/hero-banner.jpg" alt="Partner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1e40af]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent opacity-80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center mt-28 md:mt-16 pb-20 md:pb-0">
          <div className="max-w-5xl mx-auto text-white">
            
            {/* Trust Badges - Social Proof at First Glance */}
            <div className="mx-auto w-full max-w-sm md:max-w-max bg-white/10 backdrop-blur-md border border-white/20 rounded mb-8 overflow-hidden shadow-lg">
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/20">
                <div className="px-4 py-3 flex items-center justify-start md:justify-center gap-2.5">
                  <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center shrink-0">
                    <span className="text-white text-[9px] font-black">優良</span>
                  </div>
                  <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                    一般監理事業<span className="text-orange-400 ml-1">許可</span>
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-start md:justify-center gap-2.5">
                  <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-xs shrink-0">
                    🏆
                  </div>
                  <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                    令和4年<span className="text-orange-400 mx-1">大阪府知事表彰</span>受賞
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-start md:justify-center gap-2.5">
                  <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center text-xs shrink-0">
                    ✨
                  </div>
                  <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                    令和8年<span className="text-orange-400 mx-1">憲法記念日知事表彰</span>受賞
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-[26px] sm:text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              「育成就労」×「特定技能」<br />
              <span className="text-orange-400 block mt-2 text-[32px] sm:text-4xl md:text-6xl drop-shadow-md">最適解を、共に創る。</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-xl font-medium mb-10 leading-relaxed md:leading-loose text-blue-50 opacity-95 max-w-3xl mx-auto drop-shadow-sm">
              複雑化する制度移行期だからこそ、両制度を熟知した専門家の力が不可欠です。<br className="hidden md:block" />
              直結ルートでの採用から、煩雑な手続きの完全代行、定着までの伴走支援で<br className="hidden md:block"/>
              貴社のグローバル人材戦略を強力に推進します。
            </p>
            <a href="/contact" className="inline-flex w-full md:w-auto items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-4 md:py-5 px-2 md:px-12 rounded shadow-[0_10px_30px_rgba(249,115,22,0.3)] transform hover:-translate-y-1 transition-all duration-300 text-[15px] sm:text-base md:text-xl group border border-orange-400 tracking-wider">
              【無料】まずは話だけでも聞いてみる ➔
            </a>

            {/* Social Proof Numbers */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#1e40af] border-2 border-orange-500 flex items-center justify-center text-xs text-white shadow-lg z-30">🏢</div>
                <div className="w-8 h-8 rounded-full bg-[#1e40af] border-2 border-orange-400 flex items-center justify-center text-xs text-white shadow-lg z-20">⚙️</div>
                <div className="w-8 h-8 rounded-full bg-[#1e40af] border-2 border-orange-300 flex items-center justify-center text-xs text-white shadow-lg z-10">🏗️</div>
              </div>
              <p className="text-sm md:text-base text-blue-100 font-bold tracking-wide text-left leading-relaxed drop-shadow-sm">
                大阪府・関西圏を中心に<br className="block sm:hidden"/><span className="text-orange-400 font-black mx-1 text-lg">70社超</span>の企業様が導入
              </p>
            </div>
            
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-[#1e40af]/40 backdrop-blur-md">
          <div className="flex-1 overflow-hidden flex items-center">
            {/* Base block */}
            <div className="flex shrink-0 animate-marquee items-center text-[10px] md:text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused] whitespace-nowrap">
              {companies.map((c, i) => (
                <span key={`a-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  {c}
                </span>
              ))}
            </div>
            {/* Duplicate block for seamless infinite scrolling */}
            <div className="flex shrink-0 animate-marquee items-center text-[10px] md:text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused] whitespace-nowrap" aria-hidden="true">
              {companies.map((c, i) => (
                <span key={`b-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
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


      {/* ===== SECTION: COUNTRIES (Integrated & Enriched) ===== */}
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
              <div key={c.name} className="border border-gray-200 rounded p-8 hover:border-[#1e40af] transition-all text-center group bg-gray-50 hover:bg-white hover:shadow-xl relative overflow-hidden">
                {/* Decorative background accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#1e40af] opacity-5 rounded-bl-full pointer-events-none" />
                
                <img src={`https://flagcdn.com/w80/${c.flag}.png`} alt={c.name} className="h-10 mx-auto mb-5 rounded shadow-md border border-gray-100" />
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


      {/* Dynamic Client Components (Pillars, Form, etc.) */}
      <LPClientComponents />
    </main>
    </>
  );
}
