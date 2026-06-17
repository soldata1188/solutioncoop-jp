import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateDot } from '@/lib/news';

const CAT_COLOR: Record<string, string> = {
  news:   'bg-blue-500',
  result: 'bg-emerald-500',
  system: 'bg-amber-500',
  event:  'bg-purple-500',
};

const CAT_GRADIENT: Record<string, string> = {
  news:   'from-blue-400 to-blue-600',
  result: 'from-emerald-400 to-emerald-600',
  system: 'from-amber-400 to-orange-500',
  event:  'from-purple-400 to-purple-600',
};

interface NewsSectionHomeProps {
  latestNews: NewsItem[];
}

export default function NewsSectionHome({ latestNews }: NewsSectionHomeProps) {
  // Show up to 12 posts
  const items = latestNews.slice(0, 12);
  const pinned   = items.filter(n => n.pinned);
  const regular  = items.filter(n => !n.pinned);

  // Merge: pinned first, then regular
  const ordered = [...pinned, ...regular].slice(0, 12);

  return (
    <section id="news" className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest text-orange-500 uppercase mb-0.5">最新情報</span>
            <h2 className="text-xl md:text-2xl font-black text-[#1e40af] leading-tight">
              お知らせ・実績レポート
            </h2>
          </div>
          <Link
            href="/news"
            className="text-xs font-bold text-[#1e40af] border border-[#1e40af] px-3 py-1.5 rounded hover:bg-[#1e40af] hover:text-white transition-all flex-shrink-0"
          >
            一覧を見る →
          </Link>
        </div>

        {ordered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ordered.map((n) => (
              <div
                key={n.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  {n.image ? (
                    <Image
                      src={n.image}
                      alt={n.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${CAT_GRADIENT[n.category] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                      <span className="text-white/40 text-2xl">📰</span>
                    </div>
                  )}
                  {/* Category badge */}
                  <span className={`absolute top-1.5 left-1.5 text-[8px] font-bold text-white px-1.5 py-0.5 rounded leading-none ${CAT_COLOR[n.category] || 'bg-gray-500'}`}>
                    {CATEGORY_CONFIG[n.category]?.label ?? n.category}
                  </span>
                  {/* Pinned badge */}
                  {n.pinned && (
                    <span className="absolute top-1.5 right-1.5 text-[8px] font-bold text-white bg-orange-500 px-1.5 py-0.5 rounded leading-none">
                      重要
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="px-2 pt-1.5 pb-2 flex flex-col flex-grow">
                  <time className="text-[9px] text-gray-400 font-medium leading-none">
                    {formatDateDot(n.date)}
                  </time>
                  <h3 className="text-[11px] font-bold text-gray-800 leading-snug line-clamp-2 mt-1 group-hover:text-[#1e40af] transition-colors">
                    {n.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-12 text-sm">現在、お知らせはありません。</p>
        )}

        {/* Footer */}
        {latestNews.length > 0 && (
          <div className="text-center mt-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1e40af] border border-[#1e40af] px-6 py-2 rounded hover:bg-[#1e40af] hover:text-white transition-all"
            >
              すべてのお知らせを見る（{latestNews.length}件）→
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
