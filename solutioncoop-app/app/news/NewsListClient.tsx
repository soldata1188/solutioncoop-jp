'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { NewsItem, NewsCategory } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';

const BADGE: Record<NewsCategory, string> = {
  news:   'nb-news',
  result: 'nb-result',
  system: 'nb-system',
};

export default function NewsListClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [filter, setFilter] = useState<'all' | NewsCategory>('all');
  const [search, setSearch] = useState('');
  const [sort,   setSort]   = useState<'new' | 'old'>('new');

  const filtered = useMemo(() => {
    let items = [...initialNews];
    if (filter !== 'all') items = items.filter(n => n.category === filter);
    if (search.trim())    items = items.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase())
    );
    items.sort((a, b) => sort === 'new'
      ? (a.date < b.date ? 1 : -1)
      : (a.date > b.date ? 1 : -1)
    );
    return items;
  }, [initialNews, filter, search, sort]);

  const CATS: { key: 'all' | NewsCategory; label: string; count: number }[] = [
    { key: 'all',    label: 'すべて',   count: initialNews.length },
    { key: 'news',   label: 'お知らせ', count: initialNews.filter(n => n.category === 'news').length },
    { key: 'result', label: '受入実績', count: initialNews.filter(n => n.category === 'result').length },
    { key: 'system', label: '制度情報', count: initialNews.filter(n => n.category === 'system').length },
  ];

  const pinned  = initialNews.filter(n => n.pinned).slice(0, 3);
  const recents = initialNews.filter(n => !n.pinned).slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* ── MAIN ── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded border border-gray-100 p-5 mb-7 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input type="search" placeholder="キーワードで検索..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition" />
              </div>
              <select value={sort} onChange={e => setSort(e.target.value as 'new' | 'old')}
                className="text-xs border border-gray-200 rounded px-3 py-2.5 bg-gray-50 text-gray-600 cursor-pointer focus:outline-none focus:border-navy">
                <option value="new">新しい順</option>
                <option value="old">古い順</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c.key} onClick={() => setFilter(c.key)}
                  className={`text-xs font-bold px-4 py-1.5 rounded border-2 transition-all ${
                    filter === c.key ? 'border-[#1e40af] bg-[#1e40af] text-white' : 'border-gray-200 text-gray-600 hover:border-[#1e40af] hover:text-[#1e40af]'
                  }`}>
                  {c.label} <span className="ml-1 opacity-60 font-normal">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-4 px-1">{filtered.length}件の情報を表示中</p>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">😶</p>
              <p className="text-gray-400 font-semibold">該当する情報が見つかりませんでした</p>
              <p className="text-xs text-gray-400 mt-1">キーワードを変更するか、カテゴリを「すべて」に戻してください</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(n => (
                <Link key={n.id} href={`/news/${n.id}`}
                  className="group news-item bg-white rounded border border-gray-100 p-5 md:p-6 flex flex-col sm:flex-row gap-5 hover:border-[#1e40af]/30 hover:shadow-lg transition-all overflow-hidden relative">
                  {n.pinned && filter !== 'all' && <div className="absolute top-0 left-0 w-1 h-full bg-[#f97316]" />}
                  {n.image && (
                    <div className="flex-shrink-0 sm:w-40 h-32 sm:h-auto rounded overflow-hidden shadow-sm relative">
                      <div className="absolute inset-0 bg-[#1e40af]/10 group-hover:bg-transparent transition-colors z-10" />
                      <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className={`flex-shrink-0 sm:text-center ${n.image ? 'sm:w-20' : 'sm:w-24'}`}>
                    <time className="text-[11px] font-black tracking-wider text-navy bg-blue-50 px-2 py-1 rounded border border-blue-100 block sm:mb-2" dateTime={n.date}>
                      {n.date.replace(/-/g, '.')}
                    </time>
                    <div className="mt-2 hidden sm:block">
                      <span className={`nbadge ${BADGE[n.category]}`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                      <span className={`nbadge ${BADGE[n.category]}`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-800 text-sm md:text-base leading-snug mb-2 group-hover:text-[#1e40af] transition-colors">{n.title}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{n.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-black text-[#f97316] group-hover:translate-x-1 transition-transform w-fit">詳細を読む →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── SIDEBAR — same style as 他の記事も読む ── */}
        <aside className="lg:w-80 flex-shrink-0 mt-8 lg:mt-0">
          <div className="space-y-6 lg:sticky lg:top-24">

            {/* CTA + Category in one card */}
            <div className="bg-white rounded border border-gray-100 p-6 shadow-sm">
              <div className="bg-[#1e40af] rounded p-4 text-white text-center mb-5">
                <p className="text-[10px] font-bold text-blue-300 tracking-widest uppercase mb-1">無料相談</p>
                <p className="text-[11px] text-blue-100 leading-relaxed mb-3">
                  技能実習・育成就労に関するご質問にお答えします
                </p>
                <a href="tel:0722248067"
                  className="block w-full bg-white text-[#1e40af] font-black text-sm py-2 rounded mb-2 hover:bg-blue-50 transition">
                  📞 072-224-8067
                </a>
                <Link href="/contact"
                  className="block w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-xs py-2 rounded transition">
                  ✉️ Webで相談する
                </Link>
              </div>
              <h3 className="font-black text-navy text-sm mb-3 border-b-2 border-navy/20 pb-2 uppercase tracking-widest text-[11px]">カテゴリ</h3>
              <ul>
                {CATS.map(c => (
                  <li key={c.key}>
                    <button onClick={() => setFilter(c.key)}
                      className={`w-full flex items-center justify-between text-left px-2 py-2 text-xs font-semibold transition-all border-b border-gray-50 last:border-0 ${
                        filter === c.key ? 'text-[#1e40af] font-black' : 'text-gray-500 hover:text-[#1e40af]'
                      }`}>
                      <span className="flex items-center gap-1.5">
                        {filter === c.key && <span className="w-1 h-3 bg-[#1e40af] rounded-full inline-block" />}
                        {c.label}
                      </span>
                      <span className="text-[10px] text-gray-300 tabular-nums">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pinned */}
            {pinned.length > 0 && (
              <div className="bg-white rounded border border-gray-100 p-6 shadow-sm">
                <h3 className="font-black text-navy text-sm mb-5 border-b-2 border-navy/20 pb-3 uppercase tracking-widest text-[11px]">重要なお知らせ</h3>
                <div className="space-y-5">
                  {pinned.map(n => (
                    <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start">
                      {n.image ? (
                        <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5">
                          <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                      ) : (
                        <div className="w-20 h-20 flex-shrink-0 rounded bg-gradient-to-br from-orange-50 to-white border border-orange-100 flex items-center justify-center p-2 group-hover:border-orange-300 transition-colors mt-0.5">
                          <span className="text-[10px] font-black tracking-widest text-orange-300 -rotate-12 inline-block">PIN</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <time className="text-[10px] text-[#f97316] font-bold tracking-wider mb-1.5 block">{n.date.replace(/-/g, '.')}</time>
                        <h4 className="text-[12.5px] font-normal text-gray-800 leading-[1.5] line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recent */}
            <div className="bg-white rounded border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-navy text-sm mb-5 border-b-2 border-navy/20 pb-3 uppercase tracking-widest text-[11px]">最新のお知らせ</h3>
              <div className="space-y-5">
                {recents.map(n => (
                  <Link key={n.id} href={`/news/${n.id}`} className="group flex gap-4 items-start">
                    {n.image ? (
                      <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100 border border-gray-100 mt-0.5">
                        <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 flex-shrink-0 rounded bg-gradient-to-br from-blue-50 to-white border border-blue-100 flex items-center justify-center p-2 group-hover:border-navy/30 transition-colors mt-0.5">
                        <span className="text-[10px] font-black tracking-widest text-blue-300 -rotate-12 inline-block">NEWS</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <time className="text-[10px] text-[#f97316] font-bold tracking-wider mb-1.5 block">{n.date.replace(/-/g, '.')}</time>
                      <h4 className="text-[12.5px] font-normal text-gray-800 leading-[1.5] line-clamp-2 group-hover:text-navy transition-colors">{n.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Link href="/" className="text-xs text-gray-400 hover:text-[#1e40af] transition">← トップページへ</Link>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
