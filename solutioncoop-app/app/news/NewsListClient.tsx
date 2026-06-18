'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import type { NewsItem, NewsCategory } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';

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

export default function NewsListClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [filter, setFilter] = useState<'all' | NewsCategory>('all');
  const search = '';
  const [sort,   setSort]   = useState<'new' | 'old'>('new');

  const filtered = useMemo(() => {
    let items = [...initialNews];
    if (filter !== 'all') items = items.filter(n => n.category === filter);
    if (search.trim())    items = items.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.excerpt ?? '').toLowerCase().includes(search.toLowerCase())
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
    { key: 'event',  label: 'イベント', count: initialNews.filter(n => n.category === 'event').length },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">

      {/* ── フィルター ── */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {CATS.map(c => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`text-xs font-bold px-4 py-1.5 rounded border-2 transition-all ${
                  filter === c.key
                    ? 'border-[#1e40af] bg-[#1e40af] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#1e40af] hover:text-[#1e40af]'
                }`}
              >
                {c.label} <span className="ml-1 opacity-60 font-normal">{c.count}</span>
              </button>
            ))}
          </div>

          {/* Sort select */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'new' | 'old')}
            className="text-xs border border-gray-200 rounded px-3 py-2 bg-gray-50 text-gray-600 cursor-pointer focus:outline-none focus:border-[#1e40af] self-start sm:self-auto"
          >
            <option value="new">新しい順</option>
            <option value="old">古い順</option>
          </select>
        </div>
      </div>

      {/* ── 件数 ── */}
      <p className="text-xs text-gray-400 mb-5 px-1">{filtered.length}件の情報を表示中</p>

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">😶</p>
          <p className="text-gray-400 font-semibold">該当する情報が見つかりませんでした</p>
          <p className="text-xs text-gray-400 mt-1">キーワードを変更するか、カテゴリを「すべて」に戻してください</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map(n => (
            <div
              key={n.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                {n.image ? (
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${CAT_GRADIENT[n.category] || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                    <span className="text-white/50 text-2xl">📰</span>
                  </div>
                )}
                {n.pinned && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold text-white bg-orange-500 px-1.5 py-0.5 rounded">
                    重要
                  </span>
                )}
              </div>

              {/* Title only */}
              <div className="px-3 py-2.5 flex flex-col flex-grow">
                <div className="flex items-center gap-1.5">
                  <time className="text-[11px] text-gray-400 font-medium tracking-wider">
                    {n.date.replace(/-/g, '.')}
                  </time>
                  <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded leading-none ${CAT_COLOR[n.category] || 'bg-gray-500'}`}>
                    {CATEGORY_CONFIG[n.category]?.label ?? n.category}
                  </span>
                </div>
                <h2 className="text-sm font-medium text-slate-700 leading-snug mt-0.5 group-hover:text-[#1e40af] transition-colors">
                  {n.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 受入企業様・人事ご担当者様へ ── */}
      <div className="mt-12 bg-white border-t-8 border-[#f97316] relative overflow-hidden rounded-lg shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 px-6 py-12 text-center">
          {/* Badge */}
          <div className="inline-block bg-[#1e40af] text-white font-black px-6 py-2.5 rounded mb-8 shadow-md text-sm tracking-widest">
            🏢 受入企業様・人事ご担当者様へ
          </div>

          <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight text-[#1e40af]">
            まずは無料でご相談ください
          </h2>
          <p className="text-sm text-gray-500 font-bold tracking-widest mb-8">
            お気軽にお問い合わせください。まずは無料相談から。
          </p>

          <div className="border-b border-gray-200 pb-10 mb-10 max-w-2xl mx-auto">
            <p className="text-base md:text-xl leading-loose text-gray-600 font-bold mb-4">
              外国人材の受入れを検討されている方、<br className="hidden md:block" />
              貴社に最適な受入れプランを、私たちが共に考え、
              <strong className="text-[#f97316] font-black mx-1 border-b-[3px] border-[#f97316] pb-0.5">ご提案</strong>いたします。
            </p>
            <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed">
              外国人材の受入れを検討されている企業様のご相談を、専門スタッフが丁寧にサポートいたします。
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 md:gap-8 px-4 sm:px-0">
            <a
              href="tel:0722248067"
              className="flex flex-col items-center justify-center bg-white text-[#1e40af] border-2 border-slate-200 w-full md:w-80 py-4 px-4 hover:border-[#1e40af] hover:shadow-md transition-all rounded group"
            >
              <span className="text-xs md:text-sm text-gray-500 mb-1 font-bold group-hover:text-blue-500 transition-colors">
                お電話でのご相談 <span className="opacity-70 text-[10px]">/ Phone</span>
              </span>
              <span className="text-2xl md:text-3xl font-black text-[#1e40af] whitespace-nowrap mb-1">📞 072-224-8067</span>
              <span className="text-[10px] text-gray-400 font-medium">平日 9:00〜18:00 (Weekdays)</span>
            </a>

            <a
              href="https://lin.ee/rBe1tM6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center bg-[#06C755] hover:bg-[#05b34c] text-white w-full md:w-80 py-5 transition-all rounded shadow-lg group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,199,85,0.3)]"
            >
              <span className="text-xs md:text-sm font-bold opacity-90 mb-1 tracking-wider">LINEからのご相談</span>
              <span className="text-xl md:text-2xl font-black flex items-center gap-2 whitespace-nowrap mb-1">💬 LINEでお問い合わせ</span>
              <span className="text-[10px] text-white/70">LINE公式アカウント</span>
            </a>
          </div>
        </div>
      </div>


    </div>
  );
}
