'use client';
import { useState, useRef } from 'react';

interface ImageUploaderProps {
  value: string;           // current image URL
  onChange: (url: string) => void;
  seoHint?: string;        // SEO keyword hint
}

export default function ImageUploader({ value, onChange, seoHint }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (seoHint) {
        formData.append('hint', seoHint);
      }
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'アップロードに失敗しました');
    } finally {
      setUploading(false);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-gray-600 mb-1.5">
        🖼️ アイキャッチ画像
      </label>

      {value ? (
        /* ── Preview ── */
        <div className="relative group rounded overflow-hidden border border-gray-200">
          <img
            src={value}
            alt="アイキャッチ画像"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-800 font-bold text-xs px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              🔄 変更
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded hover:bg-red-700 transition"
            >
              🗑️ 削除
            </button>
          </div>
        </div>
      ) : (
        /* ── Upload area ── */
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded p-8 text-center cursor-pointer transition-all ${
            dragOver
              ? 'border-navy bg-blue-50'
              : 'border-gray-300 hover:border-navy hover:bg-gray-50'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl animate-spin">⏳</span>
              <p className="text-sm text-gray-500 font-semibold">アップロード中...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">📷</span>
              <p className="text-sm text-gray-600 font-semibold">
                クリックまたはドラッグ＆ドロップ
              </p>
              <p className="text-[10px] text-gray-400">
                JPG / PNG / WebP / GIF（最大5MB）
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-600 text-xs font-bold">❌ {error}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
