import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';

async function getStats() {
  const file = path.join(process.cwd(), 'data', 'news.json');
  const all: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  const published = all.filter(n => n.published);
  const byCategory = {
    news:   all.filter(n => n.category === 'news').length,
    result: all.filter(n => n.category === 'result').length,
    system: all.filter(n => n.category === 'system').length,
    event:  all.filter(n => n.category === 'event').length,
  };
  const recent = [...all].sort((a,b) => a.date < b.date ? 1 : -1).slice(0, 5);
  return { total: all.length, published: published.length, byCategory, recent };
}

export default async function AdminDashboard() {
  const { total, published, byCategory, recent } = await getStats();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800">ダッシュボード</h1>
        <p className="text-gray-500 text-sm mt-1">ソリューション協同組合 — 管理画面へようこそ</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: '総記事数',     value: total,     color: 'bg-navy', icon: '📰' },
          { label: '公開中',       value: published, color: 'bg-green-600', icon: '✅' },
          { label: '非公開',       value: total - published, color: 'bg-gray-500', icon: '🔒' },
          { label: 'カテゴリ数',   value: 4,         color: 'bg-accent', icon: '🏷️' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
            <p className="text-3xl font-black text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent articles */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">最近の投稿</h2>
            <Link href="/admin/news" className="text-xs text-navy hover:underline font-semibold">すべて見る →</Link>
          </div>
          <ul className="space-y-3">
            {recent.map(n => (
              <li key={n.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${n.published ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 truncate">{n.title}</p>
                  <p className="text-xs text-gray-400">{n.date} · {CATEGORY_CONFIG[n.category]?.label}</p>
                </div>
                <Link href={`/admin/news/${n.id}/edit`} className="text-xs text-navy hover:underline flex-shrink-0">編集</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">カテゴリ別件数</h2>
          <div className="space-y-3">
            {(Object.entries(byCategory) as [keyof typeof byCategory, number][]).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{CATEGORY_CONFIG[cat]?.icon} {CATEGORY_CONFIG[cat]?.label}</span>
                  <span className="font-bold text-gray-800">{count}件</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-navy rounded-full transition-all"
                    style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link href="/admin/news/new"
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition">
              ✏️ 新しい記事を投稿する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
