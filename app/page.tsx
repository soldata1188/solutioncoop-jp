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
  return all.filter(n => n.published).sort((a,b) => a.date < b.date ? 1 : -1).slice(0, 6);
}

async function getCompanies(): Promise<string[]> {
  try {
    const file = path.join(process.cwd(), 'data', 'companies.json');
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
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
  const companies = await getCompanies();

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">

        {/* ===== HERO ===== */}
        <section className="relative min-h-[600px] lg:min-h-[680px] flex items-center justify-center overflow-hidden pt-10 pb-20 lg:py-0">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <img src="/images/hero-banner.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
            {/* Dark Premium overlay mapping the LP design */}
            <div className="absolute inset-0 bg-[#1e40af]/85 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent opacity-80" />
          </div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-4xl text-white space-y-6">
                <div className="mx-auto w-full max-w-sm md:max-w-max bg-white/10 backdrop-blur-md border border-white/20 rounded shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/20">
                    {/* "Thẻ Chứng nhận" Uy tín 1 */}
                    <div className="flex-1 px-5 mt-1 md:mt-0 py-3 md:py-3.5 flex items-center justify-start md:justify-center gap-3 md:gap-2.5 group hover:bg-white/[0.08] transition-colors cursor-default">
                      <div className="flex items-center justify-center w-6 h-6 bg-[#f97316] rounded flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-white text-[10px] font-black">優良</span>
                      </div>
                      <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                        一般監理事業<span className="text-orange-400 ml-1">許可</span>
                      </span>
                    </div>

                    {/* "Thẻ Chứng nhận" Uy tín 2 */}
                    <div className="flex-1 px-5 py-3 md:py-3.5 flex items-center justify-start md:justify-center gap-3 md:gap-2.5 group hover:bg-white/[0.08] transition-colors cursor-default">
                      <div className="flex items-center justify-center w-6 h-6 bg-[#f97316] rounded-sm text-xs shrink-0 shadow-sm">
                        🏆
                      </div>
                      <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                        令和4年<span className="text-orange-400 mx-1">大阪府知事表彰</span>受賞
                      </span>
                    </div>

                    {/* "Thẻ Chứng nhận" Uy tín 3 */}
                    <div className="flex-1 px-5 mb-1 md:mb-0 py-3 md:py-3.5 flex items-center justify-start md:justify-center gap-3 md:gap-2.5 group hover:bg-white/[0.08] transition-colors cursor-default">
                      <div className="flex items-center justify-center w-6 h-6 bg-[#f97316] rounded-sm text-xs shrink-0 shadow-sm">
                        ✨
                      </div>
                      <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                        令和8年<span className="text-orange-400 mx-1">憲法記念日知事表彰</span>受賞
                      </span>
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
                  <span className="block mb-1 md:mb-2 text-white">実習生の育成と定着を、</span>
                  <span className="block text-orange-400">適正な監理で支えます。</span>
                </h1>
                <p className="text-base md:text-xl font-medium mb-10 leading-loose text-blue-50 opacity-95 max-w-3xl mx-auto drop-shadow-sm">
                  ソリューション協同組合は、大阪府堺市に拠点を置く<strong className="text-white border-b border-white pb-0.5">技能実習監理団体</strong>です。<br className="hidden md:block" />
                  平成24年の設立以来、独自の研修センターと12名の専任日本語教師による教育体制で、70社超の受入企業様を支援してまいりました。
                </p>

                {/* ===== MINIMALIST TEXT CTA (Centered) ===== */}
                <div className="mt-10 flex justify-center">
                  <TrackedLink href="/lp" eventAction="hero_cta_click" eventLabel="enterprise_lp_minimalist"
                    className="group relative inline-flex items-center gap-2 text-white hover:text-orange-400 font-black text-xl md:text-2xl transition-all duration-300 py-2 border-b-2 border-transparent hover:border-orange-400">
                    <span>受入企業様はこちら</span>
                    <span className="text-2xl md:text-3xl group-hover:translate-x-3 transition-transform duration-500">→</span>
                  </TrackedLink>
                </div>


                
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#1e40af] border-2 border-orange-500 flex items-center justify-center text-xs text-white shadow-lg z-30">🏢</div>
                    <div className="w-8 h-8 rounded-full bg-[#1e40af] border-2 border-orange-400 flex items-center justify-center text-xs text-white shadow-lg z-20">⚙️</div>
                    <div className="w-8 h-8 rounded-full bg-[#1e40af] border-2 border-orange-300 flex items-center justify-center text-xs text-white shadow-lg z-10">🏗️</div>
                  </div>
                  <p className="text-sm md:text-base text-blue-100 font-bold tracking-wide text-left leading-relaxed drop-shadow-sm">
                    大阪府・関西圏を中心に<br className="block sm:hidden"/><span className="text-orange-400 font-black mx-1 text-lg md:text-xl">70社超</span>の企業様が導入
                  </p>
                </div>

              </div>
            </div>
          </div>
          
          {/* ===== COMPANY MARQUEE (Social Proof) ===== */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-[#1e40af]/40 backdrop-blur-md">
            <div className="flex-1 overflow-hidden flex items-center">
              {/* Base block */}
              <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]">
                {companies.map((c, i) => (
                  <span key={`a-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                    {c}
                  </span>
                ))}
              </div>
              {/* Duplicate block for seamless infinite scrolling */}
              <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]" aria-hidden="true">
                {companies.map((c, i) => (
                  <span key={`b-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* ===== KEY STATS ===== */}
        <section className="bg-[#1e40af] py-10 relative overflow-hidden border-b border-white/10">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white relative z-10">
            {[
              { val: '60', unit: '期', label: '技能実習生受入実績' },
              { val: '70', unit: '社+', label: '受入企業数' },
              { val: '12', unit: '名', label: '専任日本語教師' },
              { val: '2012', unit: '年〜', label: '設立・10年超の実績' },
            ].map(s => (
              <div key={s.label} className="group cursor-default">
                <p className="text-4xl font-black text-white drop-shadow-sm group-hover:scale-105 transition-transform duration-300">{s.val}<span className="text-xl font-bold ml-1 text-blue-100">{s.unit}</span></p>
                <p className="text-blue-100 text-xs mt-2 uppercase tracking-widest">{s.label}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.map((n, i) => (
                <Link key={n.id} href={`/news/${n.id}`}
                  className="card-lift bg-white border border-gray-100 rounded group flex flex-col overflow-hidden shadow-sm hover:border-[#1e40af]/30">
                  {/* Image/Accent bar */}
                  {n.image ? (
                    <div className="w-full h-40 overflow-hidden relative">
                      <img src={n.image} alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 right-2">
                        {i === 0 && <span className="bg-[#f97316] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg uppercase tracking-wider">New</span>}
                      </div>
                    </div>
                  ) : (
                    <div className={`h-2 bg-gradient-to-r ${TOP_ACCENT[n.category] || 'from-gray-400 to-gray-600'}`} />
                  )}
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`nbadge ${BADGE_BG[n.category]}`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                      <time className="text-[10px] text-gray-400 font-bold">{formatDateJP(n.date)}</time>
                    </div>
                    
                    <h3 className="font-bold text-gray-800 text-sm md:text-base leading-snug mb-2 group-hover:text-[#1e40af] transition-colors duration-300">
                      {n.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
                      {n.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#1e40af] flex items-center gap-1 group-hover:text-[#f97316] transition-colors">
                        詳細を見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/news"
                className="inline-flex items-center gap-3 bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold py-4 px-10 rounded hover:-translate-y-1 transition-all duration-300 shadow-md">
                📰 過去のお知らせをすべて見る →
              </Link>
            </div>
          </div>
        </section>


        {/* ===== 選ばれる理由 (CRO Copy) ===== */}
        <section id="strengths" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-20" />
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 md:mb-20">
              <span className="text-[#f97316] font-black tracking-widest text-xs uppercase mb-3 block">Selected by over 70 companies</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#1e40af] section-title leading-tight">
                選ばれる理由
              </h2>
              <p className="text-[#f97316] font-bold mt-2">失踪・言葉の壁をゼロへ。</p>
              <p className="text-gray-500 mt-6 leading-relaxed max-w-2xl mx-auto font-medium">
                単なる「労働力の確保」ではなく、貴社の中核を担う「人財」を育てるため。<br className="hidden md:block"/>
                <strong className="text-[#1e40af] font-bold">「規律と礼節」</strong>を教育文化の根幹に置いています。
              </p>
            </div>
            <div className="max-w-3xl mx-auto mb-10 bg-[#1e40af] p-6 md:p-8 text-center rounded shadow-md border border-blue-900">
              <p className="text-blue-50 text-sm md:text-base leading-relaxed">
                単なる監理団体ではなく、<strong className="text-white font-black text-base md:text-lg border-b-2 border-white pb-0.5 mx-1">一番身近なパートナー</strong>でありたい。<br className="hidden md:block" />
                私たちは、貴社の人材確保と育成を全力で支えます。
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
                  body: <>令和4年（2022）に<strong>大阪府知事表彰</strong>を受賞. 設立2012年より10年超・第60期生まで受入実績を持ち、70社超の受入企業様から信頼を頂いています.</> },
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









        {/* ===== よくある質問 ===== */}
        <FaqSection />




        {/* ===== CTA ===== */}
        <section id="contact" className="py-20 md:py-24 bg-[#1e40af] text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight text-white shadow-sm">まずは無料でご相談ください</h2>
            <p className="text-base md:text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-loose text-blue-50 border-b border-white/20 pb-10 font-medium">
              外国人材の受入れを検討されている方、<br className="hidden md:block"/>
              貴社に最適な受入れプランを、私たちが共に考え、<strong className="text-white font-black mx-1 border-b-[3px] border-white pb-0.5">ご提案</strong>いたします。
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8">
              <TrackedLink href="tel:0722248067" eventAction="cta_click" eventLabel="bottom_phone"
                className="flex flex-col items-center justify-center bg-white text-[#1e40af] border-2 border-white w-full md:w-80 py-4 px-4 hover:bg-gray-50 transition-all rounded shadow-md group">
                <span className="text-xs md:text-sm text-gray-500 mb-1 font-bold">お電話での相談（平日 9:00〜18:00）</span>
                <span className="text-2xl md:text-3xl font-black text-[#1e40af] whitespace-nowrap">📞 072-224-8067</span>
              </TrackedLink>
              <TrackedLink href="/contact" eventAction="cta_click" eventLabel="bottom_contact"
                className="flex flex-col items-center justify-center bg-[#f97316] hover:bg-[#ea580c] border border-orange-400 text-white w-full md:w-80 py-5 md:py-6 transition rounded shadow-[0_10px_30px_rgba(249,115,22,0.3)] group hover:-translate-y-1">
                <span className="text-xs md:text-sm font-bold opacity-90 mb-1 tracking-wider uppercase">24 hours / 365 days</span>
                <span className="text-xl md:text-2xl font-black flex items-center gap-2 whitespace-nowrap">✉️ Webから無料相談</span>
              </TrackedLink>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
