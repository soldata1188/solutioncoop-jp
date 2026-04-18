import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsListClient from './NewsListClient';
import type { NewsItem } from '@/lib/news';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '最新情報・お知らせ｜ソリューション協同組合',
  description: 'ソリューション協同組合の最新情報・お知らせ一覧。技能実習生の受入実績、制度情報、相談会イベントなど最新ニュースをカテゴリ別にご確認いただけます。',
  alternates: { canonical: 'https://solutioncoop-jp.com/news' },
  openGraph: {
    title: '最新情報・お知らせ｜ソリューション協同組合',
    description: '技能実習生の受入実績、制度情報、イベント等の最新情報をご案内します。',
    type: 'website',
    url: 'https://solutioncoop-jp.com/news',
    images: [{ url: '/images/ogp-main.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '最新情報・お知らせ｜ソリューション協同組合',
    description: '技能実習生の受入実績、制度情報、イベント等の最新情報を配信中。',
  },
};

async function getAllNews(): Promise<NewsItem[]> {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const raw  = await fs.readFile(file, 'utf-8');
  const all: NewsItem[] = JSON.parse(raw);
  return all.filter(n => n.published).sort((a,b) => a.date < b.date ? 1 : -1);
}

export default async function NewsPage() {
  const news = await getAllNews();

  // JSON-LD: BreadcrumbList
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'HOME', item: 'https://solutioncoop-jp.com' },
      { '@type': 'ListItem', position: 2, name: '最新情報', item: 'https://solutioncoop-jp.com/news' },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="py-14 md:py-20 relative overflow-hidden bg-slate-50 border-b border-gray-100">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <nav className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6" aria-label="パンくず">
              <a href="/" className="hover:text-[#1e40af] transition">🏠 ホーム</a>
              <span className="text-slate-300">›</span>
              <span className="text-slate-600 font-semibold">最新情報・お知らせ</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-[#1e40af]/5 border border-[#1e40af]/10 rounded px-4 py-1.5 text-xs font-bold mb-4 text-[#1e40af]">
              📰 お知らせ
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-4 text-[#1e40af]">
              最新情報・<span className="text-[#f97316]">お知らせ</span>
            </h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              受入実績・制度情報・相談会イベントなど、<br className="hidden sm:block"/>
              ソリューション協同組合の最新情報をお届けします。
            </p>
          </div>
        </section>

        {/* News list (client component for filtering/search) */}
        <NewsListClient initialNews={news} />
      </main>
      <Footer />
    </>
  );
}
