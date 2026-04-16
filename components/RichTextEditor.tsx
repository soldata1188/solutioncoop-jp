'use client';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

export default function RichTextEditor({ value, onChange, label = '本文' }: Props) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-1.5">
        {label} <span className="text-gray-400 font-normal">(Markdown対応)</span>
      </label>
      <div data-color-mode="light" className="rounded overflow-hidden border border-gray-200 shadow-sm">
        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? '')}
          height={320}
          preview="live"
          visibleDragbar={false}
        />
      </div>
      <div className="mt-1.5 flex flex-wrap gap-3 text-[10px] text-gray-400">
        <span>**太字** → <strong>太字</strong></span>
        <span>*斜体* → <em>斜体</em></span>
        <span>## 見出し</span>
        <span>- リスト</span>
        <span>[リンク](URL)</span>
      </div>
    </div>
  );
}
