'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsCategory } from '@/lib/news';
import { CATEGORY_CONFIG } from '@/lib/news';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUploader from '@/components/ImageUploader';

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiStyle, setAiStyle] = useState<'policy' | 'casestudy' | 'faq' | 'result'>('casestudy');
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'news' as NewsCategory,
    date: new Date().toISOString().slice(0, 10),
    scheduledDate: '',
    published: true,
    pinned: false,
    image: '',
    seoTitle: '',
    seoDescription: '',
  });

  function update(key: string, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setToast('❌ タイトルと本文は必須です');
      return;
    }
    setSaving(true);
    // Auto-generate excerpt: strip HTML tags, take first 60 chars
    const plainText = form.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const excerpt = plainText.length > 60 ? plainText.slice(0, 60) + '…' : plainText;
    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, excerpt }),
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/news');
    } else {
      setToast('❌ 保存に失敗しました');
    }
  }

  async function handleAiGenerate() {
    if (!aiTopic.trim()) {
      setToast('⚠️ AIに伝えたいキーワードを入力してください');
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch('/api/ai/news-gen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, category: form.category, style: aiStyle }),
      });
      const data = await res.json();

      if (res.ok && data.title) {
        setForm(f => ({
          ...f,
          title: data.title || f.title,
          content: data.content || f.content,
          seoTitle: data.title || f.seoTitle,
          seoDescription: data.meta_description || f.seoDescription,
        }));
        setToast('✨ AIが記事を生成しました！');
      } else {
        setToast(`❌ AI Error: ${data.error || 'Unknown'}`);
      }
    } catch (err) {
      setToast('❌ AI接続エラー');
    }
    setGenerating(false);
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded font-bold text-sm text-white bg-navy shadow-2xl animate-bounce">
          {toast}
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <a href="/admin/news" className="text-gray-400 hover:text-gray-600 text-sm">← 一覧へ戻る</a>
        </div>
        <h1 className="text-2xl font-black text-gray-800">新規投稿</h1>
        <p className="text-gray-500 text-sm mt-1">新しいお知らせ・情報を投稿します</p>
      </div>

      {/* ── AI Assistant Block ── */}
      <div className="mb-8 bg-gradient-to-r from-navy to-blue-800 rounded p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl animate-pulse">✨</span>
            <h2 className="font-bold text-lg">AI記事生成アシスタント</h2>
          </div>
          <p className="text-blue-100 text-sm mb-4">キーワードと文体を選び、AIがプロ品質の記事を自動生成します。</p>

          {/* Style selector */}
          <div className="flex flex-wrap gap-3 mb-4">
            {([
              { key: 'policy', label: '📋 制度・法改正', desc: 'Style A' },
              { key: 'casestudy', label: '🏭 導入事例', desc: 'Style B' },
              { key: 'faq', label: '❓ FAQ・Q&A', desc: 'Style C' },
              { key: 'result', label: '✈️ 受入実績', desc: 'Style D' },
            ] as const).map(s => (
              <button key={s.key} type="button"
                onClick={() => setAiStyle(s.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all border ${
                  aiStyle === s.key
                    ? 'bg-white text-navy border-white shadow-md'
                    : 'bg-white/10 text-blue-100 border-white/20 hover:bg-white/20'
                }`}>
                {s.label}
                <span className="text-[10px] opacity-60">{s.desc}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="例：技能実習生59期生の入国、受入企業の手続き負担軽減..."
              className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-3 text-sm focus:outline-none focus:bg-white/20 transition placeholder:text-white/40"
            />
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={generating}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 px-8 rounded transition flex items-center justify-center gap-2 whitespace-nowrap shadow-lg"
            >
              {generating ? '⏳ 生成中...' : '✨ AI生成'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">

          {/* ── Main content ── */}
          <div className="md:col-span-2 space-y-5">

            {/* Title */}
            <div className="bg-white rounded border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">📝 記事内容</h2>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                  タイトル <span className="text-red-600">*</span>
                </label>
                <input type="text" value={form.title} onChange={e => update('title', e.target.value)}
                  placeholder="例：技能実習生第59期生として計10名が入国しました"
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-900 font-medium placeholder:text-gray-500 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition shadow-sm"
                />
              </div>
              <ImageUploader
                value={form.image}
                onChange={v => update('image', v)}
                seoHint={form.title}
              />
              <RichTextEditor
                value={form.content}
                onChange={v => update('content', v)}
                label="本文"
              />
            </div>

            {/* SEO */}
            <div className="bg-white rounded border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">🔍 SEO設定</h2>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">SEOタイトル（空欄の場合はタイトルを使用）</label>
                <input type="text" value={form.seoTitle} onChange={e => update('seoTitle', e.target.value)}
                  placeholder="例：第59期技能実習生10名が入国｜ソリューション協同組合"
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-900 font-medium placeholder:text-gray-500 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition shadow-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1">推奨：30〜60文字 / 現在: {(form.seoTitle || form.title).length}文字</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">メタディスクリプション</label>
                <textarea value={form.seoDescription} onChange={e => update('seoDescription', e.target.value)}
                  rows={3} placeholder="Googleの検索結果に表示される説明文（80〜160文字）"
                  className="w-full border border-gray-300 rounded px-4 py-3 text-sm text-gray-900 font-medium placeholder:text-gray-500 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition resize-none shadow-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1">{form.seoDescription.length}文字（推奨：80〜160文字）</p>
              </div>
              {/* Preview */}
              {(form.seoTitle || form.title) && (
                <div className="bg-gray-50 rounded p-4 border border-gray-200">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">検索プレビュー</p>
                  <p className="text-sm text-blue-700 font-semibold line-clamp-1">{form.seoTitle || form.title}｜ソリューション協同組合</p>
                  <p className="text-green-700 text-xs mt-0.5">https://solutioncoop-jp.com/news/news-xxx</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{form.seoDescription || form.content.replace(/<[^>]*>/g, '').slice(0, 60)}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar options ── */}
          <div className="space-y-5">
            {/* Publish */}
            <div className="bg-white rounded border border-gray-100 p-5 space-y-4">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">⚙️ 公開設定</h2>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">公開ステータス</label>
                <div className="flex gap-3">
                  {[
                    { val: true,  label: '公開',    cls: 'border-green-500 bg-green-50 text-green-700' },
                    { val: false, label: '非公開',  cls: 'border-gray-300 bg-gray-50 text-gray-600' },
                  ].map(opt => (
                    <button key={String(opt.val)} type="button"
                      onClick={() => update('published', opt.val)}
                      className={`flex-1 py-2.5 text-sm font-bold rounded border-2 transition-all ${form.published === opt.val ? opt.cls : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pin switch */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" className="sr-only" checked={!!form.pinned} onChange={e => update('pinned', e.target.checked)} />
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${form.pinned ? 'bg-[#f97316] border-[#f97316]' : 'border-gray-300 group-hover:border-gray-400'}`}>
                      {form.pinned && <span className="text-white text-xs leading-none pt-0.5">✓</span>}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-gray-800 text-sm flex items-center gap-1">📌 トップに固定する</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">最新情報セクションの目立つ位置に表示されます</p>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">投稿日</label>
                <input type="date" value={form.date} onChange={e => update('date', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-navy transition shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                  ⏰ 予約投稿日時 <span className="text-gray-500 font-normal">(任意)</span>
                </label>
                <input type="datetime-local" value={form.scheduledDate} onChange={e => update('scheduledDate', e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-navy transition shadow-sm"
                />
                <p className="text-[10px] text-gray-400 mt-1">設定すると指定日時に自動公開されます</p>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded border border-gray-100 p-5 space-y-3">
              <h2 className="font-bold text-gray-700 text-sm border-b border-gray-100 pb-3">🏷️ カテゴリ</h2>
              <div className="space-y-2">
                {(Object.entries(CATEGORY_CONFIG) as [NewsCategory, {label:string;icon:string}][]).map(([key, cfg]) => (
                  <button key={key} type="button"
                    onClick={() => update('category', key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded border-2 text-sm font-semibold transition-all text-left ${form.category === key ? 'border-navy bg-blue-50 text-navy' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    <span className="text-xl">{cfg.icon}</span>
                    {cfg.label}
                    {form.category === key && <span className="ml-auto text-navy">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={saving}
              className="w-full bg-accent hover:bg-orange-700 disabled:opacity-50 text-white font-black py-4 rounded transition text-base">
              {saving ? '⏳ 保存中...' : '✅ 投稿する'}
            </button>
            <a href="/admin/news" className="block text-center text-sm text-gray-400 hover:text-gray-600 transition">
              キャンセル
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
