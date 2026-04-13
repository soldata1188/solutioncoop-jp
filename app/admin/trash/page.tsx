'use client';
import { useState, useEffect } from 'react';
import type { ExtendedNewsItem } from '@/lib/types';
import { CATEGORY_CONFIG } from '@/lib/news';

export default function AdminTrashPage() {
  const [items, setItems]     = useState<ExtendedNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res  = await fetch('/api/news');
    const all: ExtendedNewsItem[] = await res.json();
    setItems(all.filter(i => i.deleted));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function restoreItem(id: string) {
    const res = await fetch(`/api/news/${id}/restore`, { method: 'PUT' });
    if (res.ok) {
      showToast('復元しました');
      load();
    } else {
      showToast('復元に失敗しました', 'err');
    }
  }

  async function permanentDelete(id: string) {
    if (!confirm('完全に削除しますか？この操作は元に戻せません。')) return;
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('完全に削除しました');
      load();
    } else {
      showToast('削除に失敗しました', 'err');
    }
  }

  async function emptyTrash() {
    if (!confirm(`ゴミ箱内の${items.length}件をすべて完全に削除しますか？`)) return;
    for (const item of items) {
      await fetch(`/api/news/${item.id}`, { method: 'DELETE' });
    }
    showToast(`${items.length}件を完全に削除しました`);
    load();
  }

  function timeAgo(dateStr?: string): string {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '今日';
    if (days === 1) return '昨日';
    if (days < 30) return `${days}日前`;
    return `${Math.floor(days / 30)}ヶ月前`;
  }

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all ${toast.type === 'ok' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'ok' ? '✅' : '❌'} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800">🗑️ ゴミ箱</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length}件の削除済み記事</p>
        </div>
        {items.length > 0 && (
          <button onClick={emptyTrash}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition text-sm">
            🗑️ ゴミ箱を空にする
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4 animate-spin inline-block">⏳</p>
          <p>読み込み中...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-5xl mb-4">🗑️</p>
          <h2 className="text-lg font-bold text-gray-600 mb-2">ゴミ箱は空です</h2>
          <p className="text-sm text-gray-400">削除した記事がここに表示されます。</p>
          <a href="/admin/news" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-navy hover:text-accent transition">
            ← 記事一覧へ戻る
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 transition">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`nbadge ${
                    item.category === 'news'   ? 'nb-news'   :
                    item.category === 'result' ? 'nb-result' :
                    item.category === 'system' ? 'nb-system' : 'nb-event'
                  }`}>
                    {CATEGORY_CONFIG[item.category]?.icon} {CATEGORY_CONFIG[item.category]?.label}
                  </span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{item.excerpt}</p>
                {item.deletedAt && (
                  <p className="text-[10px] text-red-400 mt-1">🗑️ {timeAgo(item.deletedAt)}に削除</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => restoreItem(item.id)}
                  className="text-xs bg-blue-50 text-navy hover:bg-blue-100 transition px-4 py-2 rounded-lg font-bold">
                  ♻️ 復元
                </button>
                <button onClick={() => permanentDelete(item.id)}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 transition px-4 py-2 rounded-lg font-bold">
                  完全削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
