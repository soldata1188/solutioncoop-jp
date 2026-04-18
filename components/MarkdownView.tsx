'use client';
import dynamic from 'next/dynamic';
import '@uiw/react-markdown-preview/markdown.css';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-100 h-64 rounded"></div>
  }
);

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div className="markdown-view-container" data-color-mode="light">
      <MarkdownPreview 
        source={content} 
        style={{ backgroundColor: 'transparent', color: 'inherit' }}
        wrapperElement={{"data-color-mode": "light"}}
      />
    </div>
  );
}
