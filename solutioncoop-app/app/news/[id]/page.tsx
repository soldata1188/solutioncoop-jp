import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateJP } from '@/lib/news';
import MarkdownView from '@/components/MarkdownView';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ id: string }> };

async function getItem(id: string): Promise<NewsItem | null> {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const all: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  return all.find(n => n.id === id && n.published) ?? null;
}

async function getRecentNews(excludeId: string): Promise<NewsItem[]> {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const all: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  return all
    .filter(n => n.published && n.id !== excludeId)
    .sort((a,b) => a.date < b.date ? 1 : -1)
    .slice(0, 10);
}

export async function generateStaticParams() {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const all: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  return all.filter(n => n.published).map(n => ({ id: n.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return {};
  return {
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    alternates: { canonical: `https://solutioncoop-jp.com/news/${id}` },
    openGraph: {
      title: item.seoTitle || item.title,
      description: item.seoDescription || item.excerpt,
      type: 'article',
      publishedTime: item.date,
      ...(item.image ? { images: [{ url: item.image }] } : {}),
    },
  };
}

const BADGE: Record<string, string> = {
  news:   'nb-news',
  result: 'nb-result',
  system: 'nb-system',
  event:  'nb-event',
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  const cfg = CATEGORY_CONFIG[item.category];
  const recentNews = await getRecentNews(id);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.seoTitle || item.title,
    description: item.seoDescription || item.excerpt,
    datePublished: item.date,
    ...(item.image ? { image: `https://solutioncoop-jp.com${item.image}` } : {}),
    author: { '@type': 'Organization', name: 'ソリューション協同組合' },
    publisher: {
      '@type': 'Organization',
      name: 'ソリューション協同組合',
      url: 'https://solutioncoop-jp.com',
    },
    url: `https://solutioncoop-jp.com/news/${id}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen pb-20">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Lõi Bài viết chính (Trái) */}
            <div className="flex-1 min-w-0">
              <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-widest" aria-label="パンくず">
                <Link href="/" className="hover:text-navy transition">HOME</Link>
                <span>›</span>
                <Link href="/news" className="hover:text-navy transition">最新情報</Link>
                <span>›</span>
                <span className="text-gray-500 line-clamp-1">{item.title}</span>
              </nav>

              <article className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
                {/* Hero Image */}
                {item.image && (
                  <div className="w-full h-64 md:h-[26rem] overflow-hidden relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                {/* Header Bài viết */}
                <div className="p-6 md:p-10 lg:p-12 border-b border-gray-100">
                  <div className="flex items-center gap-4 mb-5">
                    <span className={`nbadge ${BADGE[item.category]}`}>
                      {cfg?.icon} {cfg?.label}
                    </span>
                    <time className="text-[11px] text-gray-400 font-bold tracking-wider" dateTime={item.date}>
                      {formatDateJP(item.date)}
                    </time>
                  </div>
                  <h1 className="text-lg md:text-xl lg:text-2xl font-black text-navy leading-[1.4] tracking-tight">{item.title}</h1>
                </div>

                {/* Nội dung Bài viết */}
                <div className="p-6 md:p-10 lg:p-12 news-content-area">
                  <MarkdownView content={item.content || '本文準備中です。'} />
                </div>

                {/* Chân bài viết (Call to logic) */}
                <div className="px-6 md:px-12 py-8 bg-slate-50 border-t border-gray-100 flex flex-wrap justify-center gap-4">
                  <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-navy transition bg-white border border-gray-200 px-8 py-3.5 rounded shadow-sm hover:bg-gray-50">
                    ← お知らせ一覧へ戻る
                  </Link>
                  <Link href="/lp" className="inline-flex items-center gap-2 text-sm font-bold text-white transition bg-navy hover:bg-navy/90 border border-navy px-8 py-3.5 rounded shadow-md hover:shadow-lg hover:-translate-y-0.5 transform">
                    企業様はこちら→
                  </Link>
                </div>
              </article>
            </div>

            {/* Sidebar Trượt Phải (Phễu bám đuổi) */}
            <aside className="lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
              <div className="space-y-6 lg:sticky lg:top-24">
                
                {/* Cụm: Khách hàng cũng đọc (Bài viết liên quan) */}
                <div className="bg-white rounded border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-black text-navy text-sm mb-5 border-b-2 border-navy/20 pb-3 uppercase tracking-widest text-[11px]">他の記事も読む (Related)</h3>
                  <div className="space-y-5">
                    {recentNews.length > 0 ? recentNews.map(n => (
                      <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start">
                        {n.image ? (
                          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5">
                            <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 flex-shrink-0 rounded bg-gradient-to-br from-blue-50 to-white border border-blue-100 flex items-center justify-center p-2 group-hover:border-navy/30 transition-colors mt-0.5">
                             <span className="text-[10px] font-black tracking-widest text-blue-300 transform -rotate-12">NEWS</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <time className="text-[10px] text-[#f97316] font-bold tracking-wider mb-1.5 block">{formatDateJP(n.date)}</time>
                          <h4 className="text-[12.5px] font-normal text-gray-800 leading-[1.5] line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                        </div>
                      </Link>
                    )) : (
                      <p className="text-xs text-gray-400">現在その他の記事はありません。</p>
                    )}
                  </div>
                </div>

                {/* CTA Sidebar Card */}
                <div className="rounded overflow-hidden border border-gray-100 shadow-sm">
                  {/* Header band */}
                  <div className="bg-[#1e40af] px-5 py-4">

                    <h3 className="text-white font-black text-base leading-snug">無料相談窓口</h3>
                  </div>

                  {/* Body */}
                  <div className="bg-white px-5 py-5">
                    <p className="text-[11.5px] text-gray-500 leading-[1.8] mb-5 border-l-2 border-blue-100 pl-3">
                      技能実習・育成就労・特定技能に関するご質問に、専門スタッフが丁寧にお答えします。
                    </p>

                    {/* Phone */}
                    <a href="tel:0722248067"
                      className="group flex items-center gap-3 w-full border border-[#1e40af] rounded px-4 py-3 mb-2 hover:bg-[#1e40af] transition-all duration-200">
                      <span className="text-[#1e40af] group-hover:text-white text-lg transition-colors">📞</span>
                      <div className="text-left">
                        <p className="text-[10px] text-gray-400 group-hover:text-blue-200 transition-colors leading-none mb-0.5">お電話でのご相談</p>
                        <p className="font-black text-[#1e40af] group-hover:text-white text-base transition-colors tracking-wide">072-224-8067</p>
                      </div>
                    </a>
                    <p className="text-[10px] text-gray-300 text-right mb-4">平日 9:00〜18:00</p>

                    {/* Divider */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 h-px bg-gray-100" />
                      <span className="text-[10px] text-gray-300 font-bold">または</span>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Web form CTA */}
                    <Link href="/contact"
                      className="flex items-center justify-center gap-2 w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-3.5 rounded transition-all duration-200 text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5">
                      ✉️ Webフォームで相談する
                    </Link>
                    <p className="text-[10px] text-gray-300 text-center mt-2">24時間受付・返信は翌営業日以内</p>
                  </div>
                </div>
                
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
