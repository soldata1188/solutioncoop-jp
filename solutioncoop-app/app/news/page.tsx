import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsListClient from './NewsListClient';
import type { NewsItem } from '@/lib/news';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '技能実習・育成就労・特定技能 最新情報｜ソリューション協同組合',
  description: '技能実習生の受入実績・育成就労制度の最新情報・特定技能対応のお知らせなど、外国人採用に関する最新ニュースをカテゴリ別にご確認いただけます。',
  keywords: ['技能実習', '育成就労', '特定技能', '外国人採用', '監理団体', 'お知らせ'],
  alternates: { canonical: 'https://solutioncoop-jp.com/news' },
  openGraph: {
    title: '技能実習・育成就労・特定技能 最新情報｜ソリューション協同組合',
    description: '技能実習生の受入実績・育成就労制度・特定技能対応のお知らせを配信中。',
    type: 'website',
    url: 'https://solutioncoop-jp.com/news',
    images: [{ url: '/images/hero-banner.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '技能実習・育成就労・特定技能 最新情報｜ソリューション協同組合',
    description: '技能実習生の受入実績・育成就労制度・特定技能対応のお知らせを配信中。',
    images: ['/images/hero-banner.jpg'],
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
        <section className="relative py-10 md:py-14 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 text-center">
            {/* Subtitle */}
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#f97316] uppercase block mb-2">
              NEWS & TOPICS
            </span>
            
            {/* Main Title */}
            <h1 className="text-2xl md:text-4xl font-bold text-[#0D2B5E] tracking-tight leading-tight mb-3">
              最新情報・お知らせ
            </h1>
            
            {/* Divider */}
            <div className="w-10 h-[2.5px] bg-[#f97316] mx-auto mb-4 rounded-full" />
            
            {/* Description */}
            <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              外国人材の受入れ実績から、育成就労制度の最新解説、<br className="hidden sm:block"/>
              セミナー・イベント情報まで、有益なニュースをお届けします。
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
