import Image from 'next/image';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateDot } from '@/lib/news';

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

interface NewsSectionHomeProps {
  latestNews: NewsItem[];
}

export default function NewsSectionHome({ latestNews }: NewsSectionHomeProps) {
  const pinnedItems    = latestNews.filter((n) => n.pinned).slice(0, 2);
  const unpinnedItems  = latestNews.filter((n) => !n.pinned);
  const mainCards      = unpinnedItems.slice(0, 6);
  const secondaryList  = unpinnedItems.slice(6);

  return (
    <section id="news" className="py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-50 opacity-60 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#1e40af] section-title uppercase tracking-tight">最新情報</h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 border-2 border-blue-600 px-6 py-2.5 rounded hover:bg-blue-600 hover:text-white transition-all self-start md:self-auto flex-shrink-0 shadow-sm hover:shadow-md"
          >
            📰 すべてのお知らせを見る →
          </Link>
        </div>

        {latestNews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- CỘT TRÁI (8/12): 6 bài chính --- */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mainCards.map((n) => (
                  <Link key={n.id} href={`/news/${n.id}`} className="group flex flex-col bg-white border border-gray-100 rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-44 w-full overflow-hidden shrink-0">
                      {n.image ? (
                        <Image src={n.image} alt={n.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${TOP_ACCENT[n.category] || 'from-gray-400 to-gray-600'} opacity-90`} />
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow text-left">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${BADGE_BG[n.category]}`}>
                          {CATEGORY_CONFIG[n.category]?.label}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-navy leading-snug mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {n.title}
                      </h3>
                      <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-3 font-medium">
                        {n.excerpt}
                      </p>
                      <time className="text-[10px] text-gray-400 font-bold mt-auto tracking-wider">{formatDateDot(n.date)}</time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* --- CỘT PHẢI (4/12): Unified News List --- */}
            <div className="lg:col-span-4 flex flex-col gap-0">
              <div className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden h-full flex flex-col">

                {/* Pinned section */}
                {pinnedItems.length > 0 && (
                  <>
                    <div className="border-l-4 border-[#f97316] px-5 py-3 bg-orange-50/40 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse inline-block" />
                      <h3 className="text-[11px] font-black text-gray-700 tracking-widest uppercase">重要なお知らせ</h3>
                    </div>
                    <div className="divide-y divide-gray-50 px-4">
                      {pinnedItems.map((n) => (
                        <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start py-4">
                          {n.image ? (
                            <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5 relative">
                              <Image src={n.image} alt={n.title} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform" />
                            </div>
                          ) : (
                            <div className={`w-16 h-16 flex-shrink-0 rounded bg-gradient-to-br ${TOP_ACCENT[n.category] || 'from-gray-400 to-gray-600'} mt-0.5 flex items-center justify-center`}>
                              <span className="text-[9px] font-black text-white/80 -rotate-12 inline-block">PIN</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <time className="text-[10px] text-[#f97316] font-bold tracking-wider block mb-1">{formatDateDot(n.date)}</time>
                            <h4 className="text-xs font-normal text-gray-800 leading-snug line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {/* Recent section */}
                <div className="border-l-4 border-[#1e40af] px-5 py-3 bg-blue-50/30 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af] inline-block" />
                  <h3 className="text-[11px] font-black text-gray-700 tracking-widest uppercase">最新のお知らせ</h3>
                </div>
                <div className="divide-y divide-gray-50 px-4 flex-grow">
                  {secondaryList.map((n) => (
                    <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start py-4">
                      {n.image ? (
                        <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5 relative">
                          <Image src={n.image} alt={n.title} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 flex-shrink-0 rounded bg-gradient-to-br from-blue-50 to-white border border-blue-100 mt-0.5 flex items-center justify-center">
                          <span className="text-[9px] font-black text-blue-300 -rotate-12 inline-block">NEWS</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <time className="text-[10px] text-[#f97316] font-bold tracking-wider block mb-1">{formatDateDot(n.date)}</time>
                        <h4 className="text-xs font-normal text-gray-700 leading-snug line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                      </div>
                    </Link>
                  ))}
                  {secondaryList.length === 0 && (
                    <p className="text-[10px] text-gray-400 text-center py-4">現在、他のお知らせはありません。</p>
                  )}
                </div>

                {/* Footer link */}
                <div className="px-5 py-4 border-t border-gray-100 mt-auto">
                  <Link href="/news" className="flex items-center justify-between group">
                    <span className="text-xs font-black text-navy group-hover:text-[#f97316] transition-colors">すべてのお知らせを見る</span>
                    <span className="w-6 h-6 rounded bg-navy text-white flex items-center justify-center text-[10px] group-hover:bg-[#f97316] group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">現在、新しいお知らせはありません。</p>
        )}
      </div>
    </section>
  );
}
