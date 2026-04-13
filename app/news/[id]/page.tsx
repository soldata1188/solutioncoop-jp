import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateJP } from '@/lib/news';

type Props = { params: Promise<{ id: string }> };

async function getItem(id: string): Promise<NewsItem | null> {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const all: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  return all.find(n => n.id === id && n.published) ?? null;
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

const BADGE_BG: Record<string, string> = {
  news:   'bg-blue-100 text-blue-800',
  result: 'bg-green-100 text-green-800',
  system: 'bg-yellow-100 text-yellow-800',
  event:  'bg-purple-100 text-purple-800',
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  const cfg = CATEGORY_CONFIG[item.category];

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
      <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-4xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8" aria-label="パンくず">
            <Link href="/" className="hover:text-navy transition">🏠 ホーム</Link>
            <span>›</span>
            <Link href="/news" className="hover:text-navy transition">最新情報</Link>
            <span>›</span>
            <span className="text-gray-600 font-medium line-clamp-1">{item.title}</span>
          </nav>

          {/* Article */}
          <article className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
            {/* Hero Image */}
            {item.image && (
              <div className="w-full h-56 md:h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Header */}
            <div className="p-6 md:p-10 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className={`nbadge ${BADGE_BG[item.category]}`}>
                  {cfg?.icon} {cfg?.label}
                </span>
                <time className="text-xs text-gray-400 font-medium" dateTime={item.date}>
                  {formatDateJP(item.date)}
                </time>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-gray-800 leading-snug">{item.title}</h1>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{item.excerpt}</p>
            </div>

            {/* Body */}
            <div
              className="p-6 md:p-10 prose prose-sm md:prose-base max-w-none prose-headings:text-navy prose-a:text-navy hover:prose-a:text-accent"
              dangerouslySetInnerHTML={{ __html: item.content || '<p>本文準備中です。</p>' }}
            />

            {/* Footer nav */}
            <div className="px-6 md:px-10 py-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-accent transition">
                ← お知らせ一覧へ戻る
              </Link>
              <Link href="/#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-lg text-sm transition shadow-sm">
                📞 無料相談する
              </Link>
            </div>
          </article>

        </div>
      </main>
      <Footer />
    </>
  );
}
