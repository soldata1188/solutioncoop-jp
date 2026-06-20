'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NewsCategory } from '@/lib/news';
import ImageUploader from '@/components/ImageUploader';

const CATEGORIES: { key: NewsCategory; label: string; icon: string; color: string }[] = [
  { key: 'news',   label: 'お知らせ', icon: '📢', color: 'border-blue-500 bg-blue-50 text-blue-700' },
  { key: 'result', label: '受入実績', icon: '✅', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
  { key: 'event',  label: 'イベント', icon: '🎯', color: 'border-purple-500 bg-purple-50 text-purple-700' },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [saving,    setSaving]    = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTopic,   setAiTopic]   = useState('');
  const [toast,     setToast]     = useState<{ msg: string; ok: boolean } | null>(null);

  const [form, setForm] = useState({
    title:          '',
    seoTitle:       '',
    seoDescription: '',
    category:       'news' as NewsCategory,
    date:           new Date().toISOString().slice(0, 10),
    image:          '',
    published:      true,
    pinned:         false,
    scheduledDate:  '',
  });

  function update(key: string, value: string | boolean) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  // ── AI タイトル生成 ──────────────────────────────
  async function handleAiGenerate() {
    if (!aiTopic.trim()) {
      showToast('❌ トピックを入力してください', false);
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/news-gen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, category: form.category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI生成失敗');

      update('title',          data.title          || '');
      update('seoTitle',       data.seoTitle        || '');
      update('seoDescription', data.seoDescription  || '');

      if (data.warnings?.length) {
        showToast(`⚠️ ${data.warnings.join(' / ')}`, false);
      } else {
        showToast('✨ AIがタイトルを生成しました！必要に応じて編集してください。');
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      showToast(`❌ ${msg}`, false);
    } finally {
      setAiLoading(false);
    }
  }

  // ── 投稿 ──────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('❌ タイトルは必須です', false);
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      excerpt:        form.title,
      content:        form.title,
      seoTitle:       form.seoTitle       || form.title,
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
      setTimeout(() => router.push('/admin/news'), 900);
    } else {
      showToast('❌ 保存に失敗しました', false);
    }
  }

  const titleLen     = form.title.length;
  const seoTitleLen  = form.seoTitle.length;
  const seoDescLen   = form.seoDescription.length;

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg font-bold text-sm text-white shadow-2xl transition-all max-w-sm ${toast.ok ? 'bg-emerald-600' : 'bg-red-500'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <a href="/admin/news" className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mb-2">
          ← 一覧へ戻る
        </a>
        <h1 className="text-2xl font-black text-gray-800">新規投稿</h1>
        <p className="text-gray-400 text-sm mt-0.5">ニュースグリッドに表示されます（画像＋タイトル形式）</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* ─── ① AI タイトル生成ボックス ─── */}
        <div className="bg-gradient-to-br from-[#1e40af]/5 to-purple-50 rounded-xl border-2 border-[#1e40af]/20 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h2 className="font-black text-[#1e40af] text-sm">AI タイトル生成</h2>
            <span className="text-[10px] bg-[#1e40af] text-white px-2 py-0.5 rounded font-bold ml-auto">SEO最適化</span>
          </div>

          <p className="text-xs text-gray-500 mb-3 leading-relaxed">
            記事の概要・ポイント・キーワードを日本語で入力してください。
            AIが<strong>メインタイトル・SEOタイトル・メタディスクリプション</strong>を自動生成します。
          </p>

          <div className="flex gap-2">
            <textarea
              rows={3}
              value={aiTopic}
              onChange={e => setAiTopic(e.target.value)}
              placeholder={
                form.category === 'result'
                  ? '例: ベトナムから技能実習生5名が入国。大阪府泉佐野市の食品製造業に配属。入国前に6ヶ月間の日本語教育を実施。'
                  : form.category === 'event'
                  ? '例: 外国人採用に関する無料セミナーを2027年1月に開催。受入企業向け、オンライン参加可能。'
                  : '例: 記事の内容・ポイント・キーワードを自由に入力してください'
              }
              className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1e40af] transition resize-none"
            />
          </div>
          <button
            type="button"
            onClick={handleAiGenerate}
            disabled={aiLoading || !aiTopic.trim()}
            className="mt-3 w-full bg-[#1e40af] hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3 rounded-lg transition text-sm flex items-center justify-center gap-2"
          >
            {aiLoading ? (
              <><span className="animate-spin">⏳</span> AIが生成中...</>
            ) : (
              <><span>✨</span> AIでタイトルを生成する</>
            )}
          </button>
        </div>

        {/* ─── ② メインタイトル ─── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-1">
            📝 メインタイトル <span className="text-red-500">*</span>
            <span className="text-xs font-normal text-gray-400 ml-2">カードに表示（50〜85文字推奨）</span>
          </label>
          <textarea
            rows={3}
            value={form.title}
            onChange={e => update('title', e.target.value)}
            placeholder="例：【受入実績】食品製造業でベトナム技能実習生3名が配属完了！母国語スタッフによる徹底的な初期生活指導と現場定着までのサポート体制について"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1e40af] transition resize-y"
            required
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-gray-400">スマホで2〜3行の折り返しに最適な長さ</p>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              titleLen >= 50 && titleLen <= 85 ? 'bg-emerald-100 text-emerald-700'
              : titleLen > 0 ? 'bg-amber-100 text-amber-700'
              : 'text-gray-400'
            }`}>
              {titleLen}文字 {titleLen >= 50 && titleLen <= 85 ? '✓' : titleLen > 85 ? '⚠ 長め' : ''}
            </span>
          </div>
        </div>

        {/* ─── ③ SEOタイトル ─── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-1">
            🔍 SEOタイトル
            <span className="text-xs font-normal text-gray-400 ml-2">Google検索結果に表示（30〜38文字推奨）</span>
          </label>
          <input
            type="text"
            value={form.seoTitle}
            onChange={e => update('seoTitle', e.target.value)}
            placeholder="例：ベトナム技能実習生3名 配属完了｜ソリューション協同組合"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1e40af] transition"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-gray-400">末尾に「｜ソリューション協同組合」を含めると最適</p>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              seoTitleLen >= 30 && seoTitleLen <= 38 ? 'bg-emerald-100 text-emerald-700'
              : seoTitleLen > 38 ? 'bg-red-100 text-red-600'
              : seoTitleLen > 0 ? 'bg-amber-100 text-amber-700'
              : 'text-gray-400'
            }`}>
              {seoTitleLen}文字 {seoTitleLen > 38 ? '⚠ 長すぎ' : seoTitleLen >= 30 ? '✓' : ''}
            </span>
          </div>

          {/* Google SERP Preview */}
          {(form.seoTitle || form.seoDescription) && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">🔍 Google検索プレビュー</p>
              <p className="text-[13px] text-[#1a0dab] font-medium leading-snug">
                {form.seoTitle || form.title || 'SEOタイトルが表示されます'}
              </p>
              <p className="text-[11px] text-[#006621] mt-0.5">
                https://solutioncoop-jp.com/news/...
              </p>
              <p className="text-[12px] text-[#545454] mt-1 leading-relaxed">
                {form.seoDescription || 'メタディスクリプションが表示されます'}
              </p>
            </div>
          )}
        </div>

        {/* ─── ④ メタディスクリプション ─── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-1">
            📄 メタディスクリプション
            <span className="text-xs font-normal text-gray-400 ml-2">Google検索の説明文（100〜120文字推奨）</span>
          </label>
          <textarea
            rows={3}
            value={form.seoDescription}
            onChange={e => update('seoDescription', e.target.value)}
            placeholder="例：大阪府内の食品製造業にベトナム技能実習生3名が配属完了。入国前6ヶ月間の日本語教育・生活指導の実施から現場定着まで、ソリューション協同組合が一貫サポート。"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#1e40af] transition resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-gray-400">Googleに省略されない長さで書く</p>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
              seoDescLen >= 100 && seoDescLen <= 120 ? 'bg-emerald-100 text-emerald-700'
              : seoDescLen > 120 ? 'bg-red-100 text-red-600'
              : seoDescLen > 0 ? 'bg-amber-100 text-amber-700'
              : 'text-gray-400'
            }`}>
              {seoDescLen}文字 {seoDescLen > 120 ? '⚠ 長すぎ' : seoDescLen >= 100 ? '✓' : ''}
            </span>
          </div>
        </div>

        {/* ─── ⑤ サムネイル ─── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-3">
            🖼️ サムネイル画像
            <span className="text-gray-400 font-normal text-xs ml-2">（グリッドに表示される重要な要素）</span>
          </label>
          <ImageUploader
            value={form.image}
            onChange={v => update('image', v)}
            seoHint={form.seoTitle || form.title}
          />
          {!form.image && (
            <p className="text-xs text-amber-600 font-bold mt-2">⚠️ 画像なしの場合はカテゴリカラーのグラデーションが表示されます</p>
          )}
        </div>

        {/* ─── ⑥ カテゴリ ─── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <label className="block text-sm font-black text-gray-700 mb-3">🏷️ カテゴリ</label>
          <div className="flex gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                type="button"
                onClick={() => update('category', c.key)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border-2 text-sm font-bold transition-all ${
                  form.category === c.key ? c.color + ' shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
                {form.category === c.key && <span className="text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ─── ⑦ 公開設定 ─── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
          <label className="block text-sm font-black text-gray-700">⚙️ 公開設定</label>

          {/* Published */}
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

        {/* ─── プレビュー ─── */}
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
