'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { NewsCategory, NewsItem } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';
import ImageUploader from '@/components/ImageUploader';

export default function EditArticlePage() {
  const router  = useRouter();
  const params  = useParams<{ id: string }>();
  const id      = params.id;

  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState<{ msg: string; type: 'ok'|'err' } | null>(null);
  const [form, setForm] = useState<Partial<NewsItem>>({});

  function showToast(msg: string, type: 'ok'|'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    fetch(`/api/news/${id}`)
      .then(r => r.json())
      .then(data => { setForm(data); setLoading(false); });
  }, [id]);

  function update(key: string, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title?.trim() || !form.content?.trim()) {
      showToast('タイトルと本文は必須です', 'err');
      return;
    }
    setSaving(true);
    // Auto-generate excerpt: strip HTML tags, take first 60 chars
    const plainText = (form.content || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const excerpt = plainText.length > 60 ? plainText.slice(0, 60) + '…' : plainText;
    const res = await fetch(`/api/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, excerpt }),
    });
    setSaving(false);
    if (res.ok) { showToast('保存しました ✅'); }
    else        { showToast('保存に失敗しました', 'err'); }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-gray-400">
      <span className="text-4xl animate-spin">⏳</span>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl font-bold text-sm text-white ${toast.type === 'ok' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}

      <div className="mb-8">
        <a href="/admin/news" className="text-gray-400 hover:text-gray-600 text-sm">← 一覧へ戻る</a>
        <h1 className="text-2xl font-black text-gray-800 mt-2">記事を編集</h1>
        <p className="text-gray-400 text-xs mt-1">ID: {id}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="md:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">📝 記事内容</h2>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">タイトル <span className="text-red-500">*</span></label>
                <input type="text" value={form.title || ''} onChange={e => update('title', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition"
                />
              </div>
              <ImageUploader
                value={form.image || ''}
                onChange={v => update('image', v)}
              />
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">本文（HTML可）</label>
                <textarea value={form.content || ''} onChange={e => update('content', e.target.value)}
                  rows={10}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 font-mono focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition resize-y"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">🔍 SEO設定</h2>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">SEOタイトル</label>
                <input type="text" value={form.seoTitle || ''} onChange={e => update('seoTitle', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-navy transition"
                />
                <p className="text-[10px] text-gray-400 mt-1">{(form.seoTitle || form.title || '').length}文字（推奨30〜60）</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">メタディスクリプション</label>
                <textarea value={form.seoDescription || ''} onChange={e => update('seoDescription', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-navy transition resize-none"
                />
                <p className="text-[10px] text-gray-400 mt-1">{(form.seoDescription || '').length}文字（推奨80〜160）</p>
              </div>
              {(form.seoTitle || form.title) && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">検索プレビュー</p>
                  <p className="text-sm text-blue-700 font-semibold line-clamp-1">{form.seoTitle || form.title}｜ソリューション協同組合</p>
                  <p className="text-green-700 text-xs">https://solutioncoop-jp.com/news/{id}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{form.seoDescription || (form.content || '').replace(/<[^>]*>/g, '').slice(0, 60)}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">⚙️ 公開設定</h2>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">公開ステータス</label>
                <div className="flex gap-3">
                  {[
                    { val: true,  label: '公開',   cls: 'border-green-500 bg-green-50 text-green-700' },
                    { val: false, label: '非公開', cls: 'border-gray-300 bg-gray-50 text-gray-600' },
                  ].map(opt => (
                    <button key={String(opt.val)} type="button"
                      onClick={() => update('published', opt.val)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl border-2 transition-all ${form.published === opt.val ? opt.cls : 'border-gray-200 text-gray-400'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">投稿日</label>
                <input type="date" value={form.date || ''} onChange={e => update('date', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-navy transition"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">🏷️ カテゴリ</h2>
              {(Object.entries(CATEGORY_CONFIG) as [NewsCategory, {label:string;icon:string}][]).map(([key, cfg]) => (
                <button key={key} type="button"
                  onClick={() => update('category', key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all text-left ${form.category === key ? 'border-navy bg-blue-50 text-navy' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <span className="text-xl">{cfg.icon}</span>{cfg.label}
                  {form.category === key && <span className="ml-auto">✓</span>}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={`/news/${id}`} target="_blank"
                className="flex-1 text-center py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition text-sm">
                👁️ プレビュー
              </a>
            </div>

            <button type="submit" disabled={saving}
              className="w-full bg-accent hover:bg-orange-700 disabled:opacity-50 text-white font-black py-4 rounded-xl transition text-base">
              {saving ? '⏳ 保存中...' : '💾 保存する'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
