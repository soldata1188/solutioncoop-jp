'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsCategory } from '@/lib/news';
import ImageUploader from '@/components/ImageUploader';

const CATEGORIES: { key: NewsCategory; label: string; icon: string; color: string }[] = [
  { key: 'news',   label: 'お知らせ', icon: '📢', color: 'border-blue-500 bg-blue-50 text-blue-700' },
  { key: 'result', label: '受入実績', icon: '✅', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
  { key: 'system', label: '制度情報', icon: '📋', color: 'border-amber-500 bg-amber-50 text-amber-700' },
  { key: 'event',  label: 'イベント', icon: '🎯', color: 'border-purple-500 bg-purple-50 text-purple-700' },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const [form, setForm] = useState({
    title:         '',
    category:      'news' as NewsCategory,
    date:          new Date().toISOString().slice(0, 10),
    image:         '',
    published:     true,
    pinned:        false,
    scheduledDate: '',
    // content kept minimal for internal reference only
    content:       '',
    excerpt:       '',
    seoTitle:      '',
    seoDescription:'',
  });

  function update(key: string, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('❌ タイトルは必須です', false);
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      excerpt: form.title, // タイトルをexcerptとして使用
      content: form.content || form.title,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.title,
    };
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      showToast('✅ 投稿しました！');
      setTimeout(() => router.push('/admin/news'), 800);
    } else {
      showToast('❌ 保存に失敗しました', false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg font-bold text-sm text-white shadow-2xl transition-all ${toast.ok ? 'bg-emerald-600' : 'bg-red-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <a href="/admin/news" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2">
            ← 一覧へ戻る
          </a>
          <h1 className="text-2xl font-black text-gray-800">新規投稿</h1>
          <p className="text-gray-400 text-sm mt-0.5">ニュースグリッドに表示されます（画像＋タイトル形式）</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ① タイトル */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-3">
            📝 タイトル <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={form.title}
            onChange={e => update('title', e.target.value)}
            placeholder="例：【受入実績】食品製造業でベトナム技能実習生3名が配属完了！母国語スタッフによる徹底的な初期生活指導と現場定着までのサポート体制について"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1e40af] transition resize-y"
            required
          />
          <p className="text-[10px] text-gray-400 mt-2">現在: {form.title.length}文字（推奨: 50〜85文字・2〜3行の折り返し表示に最適化）</p>
        </div>

        {/* ② 画像 */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-3">
            🖼️ サムネイル画像 <span className="text-gray-400 font-normal text-xs">（グリッドに表示される重要な要素）</span>
          </label>
          <ImageUploader
            value={form.image}
            onChange={v => update('image', v)}
            seoHint={form.title}
          />
          {!form.image && (
            <p className="text-xs text-amber-600 font-bold mt-2">⚠️ 画像なしの場合はカテゴリカラーのグラデーションが表示されます</p>
          )}
        </div>

        {/* ③ カテゴリ */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-3">🏷️ カテゴリ</label>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                type="button"
                onClick={() => update('category', c.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 text-sm font-bold transition-all text-left ${
                  form.category === c.key ? c.color + ' shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span className="text-xl">{c.icon}</span>
                <span>{c.label}</span>
                {form.category === c.key && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ④ 公開設定 */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <label className="block text-sm font-black text-gray-700">⚙️ 公開設定</label>

          {/* Published toggle */}
          <div>
            <p className="text-xs font-bold text-gray-600 mb-2">公開ステータス</p>
            <div className="flex gap-3">
              {[
                { val: true,  label: '🟢 公開',   cls: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
                { val: false, label: '⚫ 非公開', cls: 'border-gray-400 bg-gray-50 text-gray-600' },
              ].map(opt => (
                <button key={String(opt.val)} type="button"
                  onClick={() => update('published', opt.val)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg border-2 transition-all ${form.published === opt.val ? opt.cls : 'border-gray-200 text-gray-400'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">📅 投稿日</label>
            <input type="date" value={form.date} onChange={e => update('date', e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e40af] transition"
            />
          </div>

          {/* Pinned */}
          <label className="flex items-center gap-3 cursor-pointer group p-3 bg-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 transition">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={!!form.pinned} onChange={e => update('pinned', e.target.checked)} />
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${form.pinned ? 'bg-[#f97316] border-[#f97316]' : 'border-gray-300'}`}>
                {form.pinned && <span className="text-white text-xs font-black">✓</span>}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-800 text-sm flex items-center gap-1">📌 重要・トップに固定</span>
              <p className="text-[10px] text-gray-500 mt-0.5">バッジ「重要」が表示されます</p>
            </div>
          </label>

          {/* Scheduled */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">⏰ 予約投稿 <span className="font-normal text-gray-400">（任意）</span></label>
            <input type="datetime-local" value={form.scheduledDate} onChange={e => update('scheduledDate', e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1e40af] transition"
            />
            <p className="text-[10px] text-gray-400 mt-1">設定すると指定日時に自動公開されます</p>
          </div>
        </div>

        {/* プレビュー */}
        {(form.title || form.image) && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">👁️ グリッドプレビュー</p>
            <div className="max-w-[200px]">
              <div className="rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
                  {form.image ? (
                    <img src={form.image} alt={form.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white/50 text-xl">📰</span>
                    </div>
                  )}
                  <span className="absolute top-1.5 left-1.5 text-[9px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded">
                    {CATEGORIES.find(c => c.key === form.category)?.label}
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <p className="text-[9px] text-gray-400">{form.date}</p>
                  <p className="text-[11px] font-bold text-gray-800 leading-snug line-clamp-2 mt-0.5">
                    {form.title || 'タイトルを入力してください'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <a href="/admin/news" className="flex-1 text-center py-3 text-sm font-bold text-gray-500 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition">
            キャンセル
          </a>
          <button type="submit" disabled={saving}
            className="flex-[2] bg-[#1e40af] hover:bg-blue-700 disabled:opacity-50 text-white font-black py-3 rounded-xl transition text-sm shadow-lg"
          >
            {saving ? '⏳ 保存中...' : '✅ 投稿する'}
          </button>
        </div>

      </form>
    </div>
  );
}
