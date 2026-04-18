'use client';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
const MDPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
);

interface Props {
  value: string;
  onChange: (val: string) => void;
  label?: string;
}

const PREVIEW_STYLE = `
  .article-preview-pane {
    background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 0.9375rem;
    color: #4b5563;
    line-height: 1.75;
    padding: 1.75rem 2rem;
  }
  .article-preview-pane h2 {
    font-size: 1.2rem;
    font-weight: 900;
    color: #1e3a5f;
    border-left: 4px solid #f97316;
    padding-left: 1rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  .article-preview-pane h3 {
    font-size: 1rem;
    font-weight: 800;
    color: #1e3a5f;
    margin-top: 1.75rem;
    margin-bottom: 0.625rem;
  }
  .article-preview-pane p {
    color: #4b5563;
    line-height: 1.8;
    margin-bottom: 0.875rem;
  }
  .article-preview-pane ul,
  .article-preview-pane ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  .article-preview-pane li {
    color: #4b5563;
    line-height: 1.75;
    margin-bottom: 0.3rem;
  }
  .article-preview-pane strong {
    color: #1e3a5f;
    font-weight: 700;
  }
  .article-preview-pane blockquote {
    border-left: 4px solid #dbeafe;
    background: #f8faff;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin: 1.25rem 0;
    color: #374151;
  }
  .article-preview-pane table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
  }
  .article-preview-pane th {
    background: #1e40af;
    color: #fff;
    font-weight: 700;
    padding: 0.5rem 0.75rem;
    text-align: left;
  }
  .article-preview-pane td {
    border: 1px solid #e5e7eb;
    padding: 0.5rem 0.75rem;
    color: #374151;
  }
  .article-preview-pane tr:nth-child(even) td {
    background: #f9fafb;
  }
  .article-preview-pane hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 2rem 0;
  }
  .article-preview-pane a {
    color: #1e40af;
    text-decoration: underline;
  }
`;

export default function RichTextEditor({ value, onChange, label = '本文' }: Props) {
  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: PREVIEW_STYLE }} />

      {/* ── Editor ── */}
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-bold text-gray-600">
          {label} <span className="text-gray-400 font-normal">(Markdown対応)</span>
        </label>
        <span className="text-[10px] text-gray-400">
          **太字** / ## H2 / ### H3 / - リスト / &gt; 引用
        </span>
      </div>
      <div data-color-mode="light" className="rounded overflow-hidden border border-gray-200 shadow-sm mb-4">
        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? '')}
          height={300}
          preview="edit"
          visibleDragbar={false}
          hideToolbar={false}
        />
      </div>

      {/* ── Live Preview ── */}
      <div className="border border-gray-200 rounded overflow-hidden shadow-sm">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <p className="text-[11px] font-bold text-gray-500 tracking-wide uppercase">
            公開後のイメージ（プレビュー）
          </p>
        </div>
        <div className="article-preview-pane min-h-[100px]">
          {value ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <MDPreview source={value} {...({} as any)} />
          ) : (
            <p className="text-gray-300 text-sm italic">
              本文を入力するとここにプレビューが表示されます
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
