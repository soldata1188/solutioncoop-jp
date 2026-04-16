'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';

export default function AdminNewsPage() {
  const [items, setItems]     = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter]   = useState<string>('all');
  const [delId,  setDelId]    = useState<string | null>(null);
  const [toast,  setToast]    = useState<{ msg: string; type: 'ok'|'err' } | null>(null);

  function showToast(msg: string, type: 'ok'|'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await fetch('/api/news');
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePublish(item: NewsItem) {
    await fetch(`/api/news/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !item.published }),
    });
    showToast(item.published ? '非公開にしました' : '公開しました');
    load();
  }

  async function deleteItem(id: string) {
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    setDelId(null);
    showToast('削除しました', 'ok');
    load();
  }

  const filtered = filter === 'all' ? items : items.filter(n => n.category === filter);

  const CATS = ['all','news','result','system','event'] as const;

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded font-bold text-sm text-white transition-all ${toast.type === 'ok' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'ok' ? '✅' : '❌'} {toast.msg}
        </div>
      )}

      {/* Delete confirm modal */}
      {delId && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 max-w-sm w-full">
            <p className="text-2xl text-center mb-3">🗑️</p>
            <h3 className="font-black text-gray-800 text-center mb-2">削除してよろしいですか？</h3>
            <p className="text-sm text-gray-500 text-center mb-6">この操作は元に戻せません。</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)}
                className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded hover:bg-gray-50 transition">
                キャンセル
              </button>
              <button onClick={() => deleteItem(delId)}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition">
                削除する
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800">最新情報の管理</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length}件の記事</p>
        </div>
        <Link href="/admin/news/new"
          className="inline-flex items-center gap-2 bg-accent hover:bg-orange-700 text-white font-bold px-5 py-3 rounded transition">
          ✏️ 新規投稿
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border-2 transition-all ${filter === c ? 'border-navy bg-navy text-white' : 'border-gray-200 text-gray-600 hover:border-navy hover:text-navy'}`}>
            {c === 'all' ? 'すべて' : `${CATEGORY_CONFIG[c as keyof typeof CATEGORY_CONFIG]?.icon} ${CATEGORY_CONFIG[c as keyof typeof CATEGORY_CONFIG]?.label}`}
            <span className="ml-1 opacity-60 font-normal">
              {c === 'all' ? items.length : items.filter(n => n.category === c).length}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4 animate-spin inline-block">⏳</p>
          <p>読み込み中...</p>
        </div>
      ) : (
        <div className="bg-white rounded border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">タイトル</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide w-24">カテゴリ</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide w-28">日付</th>
                  <th className="text-center px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide w-24">公開</th>
                  <th className="px-4 py-4 w-32"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(n => (
                  <tr key={n.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-800 line-clamp-1">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{n.excerpt}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`nbadge ${
                        n.category === 'news'   ? 'nb-news'   :
                        n.category === 'result' ? 'nb-result' :
                        n.category === 'system' ? 'nb-system' : 'nb-event'
                      }`}>
                        {CATEGORY_CONFIG[n.category]?.icon} {CATEGORY_CONFIG[n.category]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-xs whitespace-nowrap">{n.date}</td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => togglePublish(n)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${n.published ? 'bg-green-500' : 'bg-gray-300'}`}
                        title={n.published ? '公開中（クリックで非公開）' : '非公開（クリックで公開）'}>
                        <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${n.published ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/news/${n.id}`} target="_blank"
                          className="text-xs text-gray-400 hover:text-navy transition px-2 py-1 rounded hover:bg-gray-100" title="プレビュー">
                          👁️
                        </Link>
                        <Link href={`/admin/news/${n.id}/edit`}
                          className="text-xs bg-blue-50 text-navy hover:bg-blue-100 transition px-3 py-1.5 rounded font-semibold">
                          編集
                        </Link>
                        <button onClick={() => setDelId(n.id)}
                          className="text-xs bg-red-50 text-red-600 hover:bg-red-100 transition px-3 py-1.5 rounded font-semibold">
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">記事がありません</div>
          )}
        </div>
      )}
    </div>
  );
}
