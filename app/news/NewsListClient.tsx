'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { NewsItem, NewsCategory } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';

const BADGE: Record<NewsCategory, string> = {
  news:   'nb-news',
  result: 'nb-result',
  system: 'nb-system',
  event:  'nb-event',
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
              {filtered.map((n) => (
                  <Link key={n.id} href={`/news/${n.id}`}
                    className="group news-item bg-white rounded border border-gray-100 p-5 md:p-6 flex flex-col sm:flex-row gap-5 hover:border-[#1e40af]/30 hover:shadow-lg transition-all overflow-hidden relative">
                    {n.pinned && filter !== 'all' && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#f97316]"></div>
                    )}
                    {n.image && (
                      <div className="flex-shrink-0 sm:w-40 h-32 sm:h-auto rounded overflow-hidden shadow-sm relative">
                        <div className="absolute inset-0 bg-[#1e40af]/10 group-hover:bg-transparent transition-colors z-10 pb-0"></div>
                        <img src={n.image} alt={n.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className={`flex-shrink-0 sm:text-center ${n.image ? 'sm:w-20' : 'sm:w-24'}`}>
                      <time className="text-[11px] font-black tracking-wider text-navy bg-blue-50 px-2 py-1 rounded border border-blue-100 block sm:mb-2" dateTime={n.date}>
                        {n.date.replace(/-/g,'.')}
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
                      <span className="inline-flex items-center gap-1 text-xs font-black text-[#f97316] group-hover:translate-x-1 transition-transform w-fit">
                        詳細を読む →
                      </span>
                    </div>
                  </Link>
              ))}
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="lg:w-72 flex-shrink-0 mt-8 lg:mt-0">
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Elevated CTA Block */}
            <div className="bg-gradient-to-b from-[#1e40af] to-[#173085] rounded p-7 text-white text-center shadow-xl border-t-4 border-[#f97316] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="w-14 h-14 mx-auto bg-white/10 rounded-full flex items-center justify-center text-3xl mb-4 backdrop-blur-sm border border-white/20">📞</div>
              <h3 className="font-black text-xl mb-2 tracking-tight">専門スタッフに無料相談</h3>
              <p className="text-blue-100 text-[11px] mb-6 leading-relaxed font-medium">外国人材の受入れ、法改正のリスク対策など、どんなご質問もお気軽にご連絡ください。</p>
              <a href="tel:0722248067" className="flex flex-col items-center justify-center gap-1 bg-white text-[#1e40af] py-3.5 rounded shadow-inner hover:bg-blue-50 transition transform hover:-translate-y-0.5 mb-3">
                <span className="text-[10px] font-black text-blue-400">お電話でのご相談</span>
                <span className="font-black text-2xl tracking-tighter">072-224-8067</span>
              </a>
              <p className="text-blue-200 text-[10px] mb-5 font-bold">受付時間: 平日 9:00〜18:00</p>
              <Link href="/contact" className="flex items-center justify-center gap-2 w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-4 rounded transition shadow-[0_5px_15px_rgba(249,115,22,0.3)] hover:-translate-y-0.5">
                ✉️ WEBから相談する
              </Link>
            </div>

            {/* Category list */}
            <div className="bg-white rounded border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-navy text-sm mb-4 border-b-2 border-navy/20 pb-3 uppercase tracking-widest text-[11px]">カテゴリ (Categories)</h3>
              <ul className="space-y-1.5">
                {CATS.map(c => (
                  <li key={c.key}>
                    <button onClick={() => setFilter(c.key)}
                      className={`w-full flex items-center justify-between text-left py-2 px-3 rounded font-bold text-sm transition-all group ${filter === c.key ? 'text-white bg-[#1e40af] shadow-md' : 'text-gray-600 hover:bg-blue-50 hover:text-navy'}`}>
                      <span className="flex items-center gap-2">
                        {filter === c.key && <span className="w-1 h-3 bg-orange-400 rounded"></span>}
                        {c.label}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded transition-colors ${filter === c.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-navy'}`}>{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent 3 */}
            <div className="bg-white rounded border border-gray-100 p-6 shadow-sm">
              <h3 className="font-black text-navy text-sm mb-4 border-b-2 border-navy/20 pb-3 uppercase tracking-widest text-[11px]">最新の記事 (Recent)</h3>
              <ul className="space-y-4">
                {initialNews.slice(0,3).map(n => (
                  <li key={n.id} className="group">
                    <Link href={`/news/${n.id}`} className="block transition">
                      <time className="text-[10px] text-orange-500 font-bold tracking-wider">{n.date.replace(/-/g,'.')}</time>
                      <p className="text-xs text-gray-800 font-bold leading-relaxed mt-1 group-hover:text-[#1e40af] transition-colors line-clamp-2">{n.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/" className="flex items-center justify-center gap-2 text-sm font-black text-[#1e40af] bg-white border-2 border-[#1e40af] px-5 py-4 rounded hover:bg-[#1e40af] hover:text-white transition-all shadow-sm">
              ← トップページへ戻る
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
