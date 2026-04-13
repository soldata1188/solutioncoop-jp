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
            {/* Bright, lightweight overlay to let the image shine through */}
            <div className="absolute inset-0 bg-blue-600/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
          </div>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-4xl text-white space-y-6">
                <div className="mx-auto w-full max-w-sm md:max-w-max bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/20">
                    {/* "Thẻ Chứng nhận" Uy tín 1 */}
                    <div className="flex-1 px-5 mt-1 md:mt-0 py-3 md:py-3.5 flex items-center justify-start md:justify-center gap-3 md:gap-2.5 group hover:bg-white/[0.08] transition-colors cursor-default">
                      <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full shrink-0 shadow-sm">
                        <span className="text-white text-[10px] font-black">優良</span>
                      </div>
                      <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                        一般監理事業<span className="text-orange-400 ml-1">許可</span>
                      </span>
                    </div>

                    {/* "Thẻ Chứng nhận" Uy tín 2 */}
                    <div className="flex-1 px-5 py-3 md:py-3.5 flex items-center justify-start md:justify-center gap-3 md:gap-2.5 group hover:bg-white/[0.08] transition-colors cursor-default">
                      <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full text-xs shrink-0 shadow-sm">
                        🏆
                      </div>
                      <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                        令和4年<span className="text-orange-400 mx-1">大阪府知事表彰</span>受賞
                      </span>
                    </div>

                    {/* "Thẻ Chứng nhận" Uy tín 3 (Mới) */}
                    <div className="flex-1 px-5 mb-1 md:mb-0 py-3 md:py-3.5 flex items-center justify-start md:justify-center gap-3 md:gap-2.5 group hover:bg-white/[0.08] transition-colors cursor-default">
                      <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full text-xs shrink-0 shadow-sm">
                        ✨
                      </div>
                      <span className="text-white font-bold text-xs md:text-sm tracking-widest whitespace-nowrap">
                        令和8年<span className="text-orange-400 mx-1">憲法記念日知事表彰</span>受賞
                      </span>
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-snug drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  <span className="block mb-1 md:mb-2 text-white">実習生の育成と定着を、</span>
                  <span className="block text-white">適正な監理で支えます。</span>
                </h1>
                <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                  ソリューション協同組合は、大阪府堺市に拠点を置く<strong className="text-white border-b border-white pb-0.5">技能実習監理団体</strong>です。
                  平成24年の設立以来、独自の研修センターと12名の専任日本語教師による教育体制で、70社超の受入企業様を支援してまいりました。
                </p>

                {/* ===== NEW: CTA & Social Proof ===== */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-4">
                  <TrackedLink href="/contact" eventAction="hero_cta_click" eventLabel="free_consultation"
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-md transform hover:-translate-y-1 transition-all duration-300 text-base md:text-lg flex items-center justify-center gap-2">
                    ✉️ 無料相談を予約する
                  </TrackedLink>
                  <TrackedLink href="/#lead-magnet" eventAction="hero_cta_click" eventLabel="download_materials"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-2 border-white/50 hover:border-white font-bold py-3.5 px-8 rounded-full transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm">
                    📥 資料・料金表をダウンロード
                  </TrackedLink>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    {/* B2B Social Proof Icons */}
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-900 border-2 border-blue-600 flex items-center justify-center text-[10px] text-white shadow-sm shadow-black/20 z-30">🏢</div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#1e40af] border-2 border-blue-500 flex items-center justify-center text-[10px] text-white shadow-sm shadow-black/20 z-20">⚙️</div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-800 border-2 border-blue-400 flex items-center justify-center text-[10px] text-white shadow-sm shadow-black/20 z-10">🏗️</div>
                  </div>
                  <p className="text-sm md:text-base text-blue-100 font-medium tracking-wide text-left leading-relaxed">
                    大阪府・関西圏を中心に<br className="block sm:hidden"/><span className="text-yellow-300 font-black mx-1 text-lg md:text-xl">70社超</span>の企業様が導入
                  </p>
                </div>

              </div>
            </div>
          </div>
          
          {/* ===== COMPANY MARQUEE (Social Proof) - Overlaid on Hero Background ===== */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-blue-900/40 backdrop-blur-md">
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
        <section className="bg-blue-600 py-10 relative overflow-hidden">
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
                <h2 className="text-2xl md:text-3xl font-black text-blue-700 section-title">最新情報・お知らせ</h2>
              </div>
              <Link href="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 border-2 border-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all self-start md:self-auto flex-shrink-0 shadow-sm hover:shadow-md">
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
            <div className="mt-12 text-center">
              <Link href="/news"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-md">
                📰 過去のお知らせをすべて見る →
              </Link>
            </div>
          </div>
        </section>


        {/* ===== 選ばれる理由 (CRO Copy) ===== */}
        <section id="strengths" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl md:text-4xl font-black text-blue-700 section-title leading-snug">
                失踪・言葉の壁をゼロへ。<br className="md:hidden" />
                私たちが選ばれる<span className="text-orange-500 bg-orange-50 px-2 leading-relaxed">3つの理由</span>
              </h2>
              <p className="text-sm text-gray-500 mt-6 leading-relaxed max-w-2xl mx-auto">
                単なる「労働力の確保」ではなく、貴社の中核を担う「人財」を育てるため。<br className="hidden md:block"/>
                法令順守（コンプライアンス）と手厚い教育指導で、受入企業様の負担を極限まで減らします。
              </p>
            </div>
            <div className="max-w-3xl mx-auto mb-10 bg-blue-600 p-6 md:p-8 text-center rounded-2xl shadow-md border border-blue-500">
              <p className="text-blue-50 text-sm md:text-base leading-relaxed">
                私たちは単なるサービス提供者ではありません。<br className="hidden md:block" />
                受入企業様と<strong className="text-white font-black text-base md:text-lg border-b-2 border-white pb-0.5 mx-1">「二人三脚の伴走型支援」</strong>で、
                グローバル人材の安定的な確保と育成を共に実現します。
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
                <div key={s.title} className={`card-lift bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}>
                  <div className={`w-16 h-16 ${s.iconBg} flex items-center justify-center mx-auto mb-5 rounded-xl shadow-lg transform -translate-y-2`}>
                    <span className="text-3xl drop-shadow-md">{s.icon}</span>
                  </div>
                  <h3 className={`font-black tracking-tight ${s.titleColor} text-lg mb-3`}>{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify px-1">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 送出し国 (CRO Copy) ===== */}
        <section id="countries" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl md:text-4xl font-black text-blue-900 section-title leading-snug">
                「辞めない人材」は、<br className="md:hidden" />
                最初の<span className="text-orange-600">国選び</span>から始まります
              </h2>
              <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-2xl mx-auto">
                「どこの国籍でも同じ」ではありません。国民性、宗教観、得意な作業など、<br className="hidden md:block"/>
                貴社の社風や業務内容に最もマッチする国を分析・選定することが、定着率を最大化する秘訣です。
              </p>
            </div>
            {/* Modern Premium B2B Cards (Responsive) */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { 
                  flag:'vn', name:'ベトナム', badge:'実績No.1', badgeCls:'bg-blue-600', 
                  border: 'border-blue-200 hover:border-blue-400',
                  strengthTag: '手先が器用で勤勉',
                  strengthDesc: '漢字文化圏で学習意欲が高く、日本でのコミュニティも大きい。', 
                  note:'同胞意識が強いため派閥ができやすい。SNS等での待遇比較に敏感。', 
                  tags:['建設','製造','機械加工'] 
                },
                { 
                  flag:'id', name:'インドネシア', badge:'急成長中', badgeCls:'bg-green-600', 
                  border: 'border-green-200 hover:border-green-400',
                  strengthTag: '若くて明るい・親日',
                  strengthDesc: '目上の人を敬い、チームワークを重視する。', 
                  note:'イスラム教への理解（礼拝・食事）が必要。叱られることに不慣れ。', 
                  tags:['製造','建設','農業'] 
                },
                { 
                  flag:'ph', name:'フィリピン', badge:'英語力抜群', badgeCls:'bg-purple-600', 
                  border: 'border-purple-200 hover:border-purple-400',
                  strengthTag: 'ホスピタリティ精神',
                  strengthDesc: '英語力が非常に高く、明るい性格でコミュニケーション能力に長ける。', 
                  note:'家族との連絡を重視するためWi-Fi環境整備が必須。権利主張が明確。', 
                  tags:['介護','接客','ビルクリ'] 
                },
              ].map((c, idx) => (
                <div key={c.flag} className={`relative bg-white border-2 ${c.border} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}>
                  
                  {/* Badge Ribbon */}
                  <div className={`absolute top-0 right-0 ${c.badgeCls} text-white text-[10px] md:text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm z-10`}>
                    {c.badge}
                  </div>
                  
                  {/* Card Header */}
                  <div className="relative p-6 md:p-8 text-center border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                    {/* Background glow effect */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full blur-2xl opacity-50 pointer-events-none group-hover:scale-110 transition-transform"></div>
                    <img src={`https://flagcdn.com/w80/${c.flag}.png`} alt={c.name} className="relative z-10 h-10 md:h-12 mx-auto mb-4 shadow-md rounded-[4px] border border-gray-100 object-cover" loading="lazy" />
                    <h3 className="relative z-10 text-xl md:text-2xl font-black text-gray-800 tracking-wide">{c.name}</h3>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6 space-y-6">
                    {/* Strengths */}
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">🌟</span>
                        強み・国民性
                      </h4>
                      <p className="text-sm font-black text-blue-900 mb-1.5">{c.strengthTag}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{c.strengthDesc}</p>
                    </div>
                    
                    {/* Warning/Notes */}
                    <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-100/50">
                      <h4 className="text-[11px] font-bold text-orange-600 mb-2 flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center text-[8px]">⚠️</span>
                        受入の留意点
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed">{c.note}</p>
                    </div>
                    
                    {/* Sectors */}
                    <div className="pt-2">
                      <h4 className="text-[11px] font-bold text-gray-400 mb-3 block text-center border-t border-gray-100 pt-5">向いているオススメ業種</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {c.tags.map(t => (
                          <span key={t} className="bg-gray-100 text-gray-700 px-3 py-1.5 text-xs font-bold rounded-lg shadow-sm border border-gray-200/50 group-hover:bg-blue-50 group-hover:text-blue-800 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CRO HOOK: Cost Simulator Banner ===== */}
        <section className="py-16 md:py-24 bg-slate-50 relative border-y border-gray-200">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between bg-white border border-gray-200 p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden relative">
              
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 text-9xl pointer-events-none opacity-5">🧮</div>
              
              <div className="flex-1 text-center md:text-left relative z-10 w-full">
                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 font-bold tracking-widest uppercase text-[10px] md:text-xs px-3 py-1.5 mb-5 rounded border border-orange-100">
                  <span className="text-orange-500">✨</span> 登録不要・何度でも無料
                </span>
                <h2 className="text-2xl lg:text-4xl font-black mb-5 leading-snug text-slate-800">
                  <span className="text-blue-700 text-3xl md:text-5xl border-b-4 border-yellow-400 font-mono tracking-tight mr-1">30</span>秒で完了！<br />
                  <span className="inline-block">外国人材</span> <span className="inline-block">受入費用シミュレーション</span>
                </h2>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl mb-6">
                  「実際にどれくらいの費用がかかるの？」<br />
                  <span className="inline-block">国籍・人数・業種を選ぶだけで、</span>
                  <span className="inline-block">初期費用から毎月の監理費まで、</span>
                  <strong className="text-slate-700 bg-yellow-100 px-1 inline-block">貴社専用の概算お見積り</strong>
                  <span className="inline-block">をその場で自動算出します。</span>
                </p>
                
                {/* Visual Steps (Neutral Style) */}
                <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-gray-400 mb-8 md:mb-0">
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-sm">
                    <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-slate-500 text-[9px] shadow-sm">1</span>
                    条件入力
                  </div>
                  <span className="text-slate-300">→</span>
                  <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg shadow-sm">
                    <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-slate-500 text-[9px] shadow-sm">2</span>
                    即時計算
                  </div>
                  <span className="text-slate-300">→</span>
                  <div className="flex items-center gap-1.5 text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1.5 rounded-lg shadow-sm">
                    <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[9px] shadow-sm">3</span>
                    結果確認
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto relative z-10 md:pl-10 mt-8 md:mt-0 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0">
                <TrackedLink href="/simulator" eventAction="mid_cta_click" eventLabel="start_simulator"
                  className="group relative flex items-center justify-center w-full md:w-[320px] bg-navy text-white font-black text-lg py-5 px-6 rounded-xl shadow-[0_10px_20px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.3)] hover:bg-blue-900 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  
                  {/* Sweep animation effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[sweep_1.5s_ease-in-out_infinite]" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <span className="text-2xl drop-shadow-md group-hover:scale-110 transition-transform">🧮</span> 
                    今すぐシミュレーション
                  </span>
                </TrackedLink>
                <div className="text-center mt-4">
                  <p className="text-[10px] text-gray-400 tracking-wider flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    別ページでシミュレーターが開きます
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes sweep {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}} />
        </section>

        {/* ===== 導入事例 ===== */}
        <section id="cases" className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-12">
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
            <div className="max-w-3xl mx-auto bg-blue-600 rounded-2xl p-8 md:p-10 text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl pointer-events-none">🏢</div>
              <h3 className="text-white font-black text-xl md:text-2xl mb-3 relative z-10">貴社でも導入可能です</h3>
              <p className="text-blue-100 text-sm mb-6 relative z-10 leading-relaxed">業種・規模を問わず、まずはお気軽にご相談ください。<br className="hidden md:block" />専門スタッフが最適なプランをご提案します。</p>
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
              <div className="bg-blue-600 p-8 md:p-12 rounded-3xl text-white relative overflow-hidden shadow-lg border border-blue-500">
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

        {/* ===== よくある質問 ===== */}
        <FaqSection />

        {/* ===== Lead Magnet ===== */}
        <LeadMagnet />


        {/* ===== CTA ===== */}
        <section id="contact" className="py-20 md:py-24 bg-blue-600 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight text-white">まずは無料でご相談ください</h2>
            <p className="text-base md:text-lg mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed text-blue-50 border-b border-white/20 pb-10">
              外国人材の受入れを検討されている方、<br className="hidden md:block"/>
              貴社に最適な受入れプランを、私たちが共に考え、<strong className="text-white font-black mx-1 border-b-[3px] border-white pb-0.5">ご提案</strong>いたします。
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-8">
              <TrackedLink href="tel:0722248067" eventAction="cta_click" eventLabel="bottom_phone"
                className="flex flex-col items-center justify-center bg-white text-blue-800 border-2 border-white w-full md:w-80 py-4 px-4 hover:bg-gray-50 transition-all rounded-xl shadow-md group">
                <span className="text-xs md:text-sm text-gray-500 mb-1 font-bold">お電話での相談（平日 9:00〜18:00）</span>
                <span className="text-2xl md:text-3xl font-black text-blue-800 whitespace-nowrap">📞 072-224-8067</span>
              </TrackedLink>
              <TrackedLink href="/contact" eventAction="cta_click" eventLabel="bottom_contact"
                className="flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 border-2 border-orange-500 text-white w-full md:w-80 py-4 md:py-5 transition rounded-xl shadow-md group hover:-translate-y-1">
                <span className="text-xs md:text-sm font-bold opacity-90 mb-1 tracking-wider">24時間365日受付</span>
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
