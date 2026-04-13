import type { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsListClient from './NewsListClient';
import type { NewsItem } from '@/lib/news';

export const metadata: Metadata = {
  title: '最新情報・お知らせ｜ソリューション協同組合',
  description: 'ソリューション協同組合の最新情報・お知らせ一覧。技能実習生の受入実績、制度情報、相談会イベントなど最新ニュースをカテゴリ別にご確認いただけます。',
  alternates: { canonical: 'https://solutioncoop-jp.com/news' },
  openGraph: {
    title: '最新情報・お知らせ｜ソリューション協同組合',
    description: '技能実習生の受入実績、制度情報、イベント等の最新情報をご案内します。',
    type: 'website',
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

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <section className="py-14 md:py-20 relative overflow-hidden"
          style={{background:'linear-gradient(135deg,#172554 0%,#1e3a8a 55%,#1e40af 100%)'}}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <nav className="flex items-center justify-center gap-2 text-xs text-blue-300 mb-6" aria-label="パンくず">
              <a href="/" className="hover:text-white transition">🏠 ホーム</a>
              <span className="text-blue-400">›</span>
              <span className="text-white font-semibold">最新情報・お知らせ</span>
            </nav>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm px-4 py-1.5 text-xs font-bold mb-4">
              📰 お知らせ
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-3">
              最新情報・<span className="text-yellow-300">お知らせ</span>
            </h1>
            <p className="text-base text-blue-100 max-w-xl mx-auto">
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
