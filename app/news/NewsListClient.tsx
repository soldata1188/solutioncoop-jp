'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { NewsItem, NewsCategory } from '@/lib/news';
import { CATEGORY_CONFIG, formatDateJP } from '@/lib/news';

const BADGE: Record<NewsCategory, string> = {
  news:   'nb-news',
  result: 'nb-result',
  system: 'nb-system',
  event:  'nb-event',
};
const TOP_ACCENT: Record<NewsCategory, string> = {
  news:   'from-blue-400 to-blue-600',
  result: 'from-green-400 to-green-600',
  system: 'from-yellow-400 to-orange-500',
  event:  'from-purple-400 to-purple-600',
};

export default function NewsListClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [filter, setFilter]   = useState<'all' | NewsCategory>('all');
  const [search, setSearch]   = useState('');
  const [sort,   setSort]     = useState<'new' | 'old'>('new');

  const filtered = useMemo(() => {
    let items = [...initialNews];
    if (filter !== 'all')  items = items.filter(n => n.category === filter);
    if (search.trim())     items = items.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase())
    );
    items.sort((a,b) => sort === 'new'
      ? (a.date < b.date ? 1 : -1)
      : (a.date > b.date ? 1 : -1)
    );
    return items;
  }, [initialNews, filter, search, sort]);

  const CATS: { key: 'all' | NewsCategory; label: string; count: number }[] = [
    { key: 'all',    label: 'すべて',  count: initialNews.length },
    { key: 'news',   label: 'お知らせ', count: initialNews.filter(n=>n.category==='news').length },
    { key: 'result', label: '受入実績', count: initialNews.filter(n=>n.category==='result').length },
    { key: 'system', label: '制度情報', count: initialNews.filter(n=>n.category==='system').length },
    { key: 'event',  label: 'イベント', count: initialNews.filter(n=>n.category==='event').length },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── MAIN ── */}
        <div className="flex-1 min-w-0">
          {/* Search + filter */}
          <div className="bg-white rounded border border-gray-100 p-5 mb-7 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  type="search"
                  placeholder="キーワードで検索..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition"
                />
              </div>
              <select value={sort} onChange={e => setSort(e.target.value as 'new'|'old')}
                className="text-xs border border-gray-200 rounded px-3 py-2.5 bg-gray-50 text-gray-600 cursor-pointer focus:outline-none focus:border-navy">
                <option value="new">新しい順</option>
                <option value="old">古い順</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c.key} onClick={() => setFilter(c.key)}
                  className={`text-xs font-bold px-4 py-1.5 rounded border-2 transition-all ${
                    filter === c.key
                      ? 'border-[#1e40af] bg-[#1e40af] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-[#1e40af] hover:text-[#1e40af]'
                  }`}>
                  {c.label} <span className="ml-1 opacity-60 font-normal">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-500 mb-4 px-1">{filtered.length}件の情報を表示中</p>

          {/* List */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">😶</p>
              <p className="text-gray-400 font-semibold">該当する情報が見つかりませんでした</p>
              <p className="text-xs text-gray-400 mt-1">キーワードを変更するか、カテゴリを「すべて」に戻してください</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((n, i) => (
                <Link key={n.id} href={`/news/${n.id}`}
                  className="group news-item bg-white rounded border border-gray-100 p-5 md:p-6 flex flex-col sm:flex-row gap-4 hover:translate-x-1.5 transition-all overflow-hidden shadow-sm">
                  {n.image && (
                    <div className="flex-shrink-0 sm:w-36 h-28 sm:h-24 rounded overflow-hidden">
                      <img src={n.image} alt={n.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className={`flex-shrink-0 sm:text-center ${n.image ? 'sm:w-20' : 'sm:w-24'}`}>
                    <time className="text-xs font-bold text-navy bg-blue-50 px-2 py-1 rounded-sm block sm:mb-2" dateTime={n.date}>
                      {n.date.replace(/-/g,'.')}
                    </time>
                    <div className="mt-2 hidden sm:block">
                      <span className={`nbadge ${BADGE[n.category]}`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                      <span className={`nbadge ${BADGE[n.category]}`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                      {i === 0 && filter === 'all' && <span className="nbadge nb-new">新着</span>}
                    </div>
                    <h2 className="font-bold text-gray-800 text-sm md:text-base leading-snug mb-2 group-hover:text-navy transition">{n.title}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{n.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-navy group-hover:text-accent transition">
                      詳細を見る <span className="group-hover:translate-x-1 inline-block transition">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="lg:w-72 flex-shrink-0">
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* CTA */}
            <div className="bg-[#1e40af] rounded p-6 text-white text-center shadow-lg">
              <p className="text-3xl mb-3">📞</p>
              <h3 className="font-bold text-lg mb-1">無料相談はこちら</h3>
              <p className="text-blue-100 text-xs mb-4 leading-relaxed opacity-80">外国人材の受入れについて、どんなご質問もお気軽に</p>
              <a href="tel:0722248067" className="flex items-center justify-center gap-2 bg-white text-[#1e40af] font-black text-xl py-4 rounded hover:bg-gray-100 transition mb-3">
                📞 072-224-8067
              </a>
              <p className="text-blue-200 text-[10px] mb-4">平日 9:00〜18:00</p>
              <Link href="/#contact" className="block w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-4 rounded transition text-sm shadow-sm">
                ✉️ 無料相談フォームへ
              </Link>
            </div>

            {/* Category list */}
            <div className="bg-white rounded border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-navy text-sm mb-4 border-b-2 border-navy/30 pb-2">カテゴリ</h3>
              <ul className="space-y-2">
                {CATS.map(c => (
                  <li key={c.key}>
                    <button onClick={() => setFilter(c.key)}
                      className={`w-full flex items-center justify-between text-left py-1.5 px-2 rounded font-medium text-sm transition hover:bg-gray-50 ${filter === c.key ? 'text-navy bg-blue-50' : 'text-gray-700'}`}>
                      <span>{c.label}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent 3 */}
            <div className="bg-white rounded border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-navy text-sm mb-4 border-b-2 border-navy/30 pb-2">最新3件</h3>
              <ul className="space-y-3">
                {initialNews.slice(0,3).map(n => (
                  <li key={n.id}>
                    <Link href={`/news/${n.id}`} className="block hover:bg-gray-50 rounded p-2 -mx-2 transition">
                      <span className="text-[10px] text-gray-400 font-medium">{n.date.replace(/-/g,'.')}</span>
                      <p className="text-xs text-gray-700 font-semibold leading-snug mt-0.5">{n.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/" className="flex items-center justify-center gap-2 text-sm font-bold text-[#1e40af] border-2 border-[#1e40af] px-5 py-4 rounded hover:bg-[#1e40af] hover:text-white transition-all shadow-sm">
              ← 技能実習ページへ戻る
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
