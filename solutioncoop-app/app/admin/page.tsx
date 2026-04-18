import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';

async function getStats() {
  const dataDir = path.join(process.cwd(), 'data');
  
  // News Stats
  const newsFile = path.join(dataDir, 'news.json');
  const allNews: NewsItem[] = JSON.parse(await fs.readFile(newsFile, 'utf-8'));
  const published = allNews.filter(n => n.published);
  const byCategory = {
    news:   allNews.filter(n => n.category === 'news').length,
    result: allNews.filter(n => n.category === 'result').length,
    system: allNews.filter(n => n.category === 'system').length,
  };
  const recentNews = [...allNews].sort((a,b) => a.date < b.date ? 1 : -1).slice(0, 5);

  // Contact Stats
  const contactsFile = path.join(dataDir, 'contacts.json');
  const allContacts = JSON.parse(await fs.readFile(contactsFile, 'utf-8'));
  const newContacts = allContacts.filter((c: any) => c.status === 'new').length;

  // Quote/Lead Stats (from simulation)
  const quotesFile = path.join(dataDir, 'quotes.json');
  const allQuotes = JSON.parse(await fs.readFile(quotesFile, 'utf-8'));
  const newQuotes = allQuotes.filter((q: any) => q.status === 'new').length;
  const recentQuotes = [...allQuotes].sort((a,b) => a.createdAt < b.createdAt ? 1 : -1).slice(0, 5);

  return { 
    news: { total: allNews.length, published: published.length, byCategory, recent: recentNews },
    contacts: { total: allContacts.length, unread: newContacts },
    quotes: { total: allQuotes.length, unread: newQuotes, recent: recentQuotes }
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800">ダッシュボード</h1>
        <p className="text-gray-500 text-sm mt-1">ソリューション協同組合 — 管理画面へようこそ</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: '未読お問い合わせ', value: stats.contacts.unread, color: 'bg-red-600', icon: '📩', link: '/admin/contacts' },
          { label: '新規見積依頼',     value: stats.quotes.unread,   color: 'bg-orange-500', icon: '💰', link: '/admin/contacts?tab=quotes' },
          { label: '公開中の記事',     value: stats.news.published,  color: 'bg-navy', icon: '📰', link: '/admin/news' },
          { label: '総記事数',         value: stats.news.total,      color: 'bg-gray-500', icon: '📁', link: '/admin/news' },
        ].map(s => (
          <Link key={s.label} href={s.link} className="bg-white rounded border border-gray-100 p-5 hover:border-navy transition group">
            <div className={`w-10 h-10 ${s.color} rounded flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
            <p className="text-3xl font-black text-gray-800 group-hover:text-navy transition">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-white rounded border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">最新の見積依頼 (Lead)</h2>
            <Link href="/admin/contacts?tab=quotes" className="text-xs text-navy hover:underline font-semibold">すべて見る →</Link>
          </div>
          <ul className="space-y-3">
            {stats.quotes.recent.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">新しい依頼はありません</p>
            ) : (
              stats.quotes.recent.map(q => (
                <li key={q.id} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0">
                  <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${q.status === 'new' ? 'bg-orange-500 animate-pulse' : 'bg-gray-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 truncate">{q.companyName}</p>
                    <p className="text-xs text-gray-400">{q.createdAt.split('T')[0]} · {q.occupationLabel} · {q.numberOfPeople}名</p>
                  </div>
                  <Link href="/admin/contacts" className="text-xs text-navy hover:underline flex-shrink-0">詳細</Link>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recent articles */}
        <div className="bg-white rounded border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">最近の投稿</h2>
            <Link href="/admin/news" className="text-xs text-navy hover:underline font-semibold">すべて見る →</Link>
          </div>
          <ul className="space-y-3">
            {stats.news.recent.map(n => (
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
        <div className="bg-white rounded border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">記事カテゴリ別件数</h2>
          <div className="space-y-3">
            {(Object.entries(stats.news.byCategory) as [keyof typeof stats.news.byCategory, number][]).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{CATEGORY_CONFIG[cat]?.icon} {CATEGORY_CONFIG[cat]?.label}</span>
                  <span className="font-bold text-gray-800">{count}件</span>
                </div>
                <div className="h-2 bg-gray-100 rounded overflow-hidden">
                  <div className="h-full bg-navy rounded transition-all"
                    style={{ width: `${stats.news.total > 0 ? (count / stats.news.total) * 100 : 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded border border-gray-100 p-6 flex flex-col justify-center">
            <Link href="/admin/news/new"
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-orange-700 text-white font-bold py-4 rounded transition shadow-lg shadow-orange-100">
              ✏️ 新しい記事を投稿する
            </Link>
            <p className="text-center text-xs text-gray-400 mt-4 italic">AIアシスタントを使用して効率的に記事を作成できます</p>
        </div>
      </div>
    </div>
  );
}
