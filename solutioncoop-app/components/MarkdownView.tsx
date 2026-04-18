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
      <style>{`
        .markdown-view-container .wmde-markdown {
          font-family: inherit !important;
          color: #4b5563 !important;
          font-size: 1rem !important;
          line-height: 1.8 !important;
          background-color: transparent !important;
        }
        .markdown-view-container .wmde-markdown h2 {
          font-size: 1.5rem !important;
          font-weight: 900 !important;
          color: #001f3f !important;
          border-left: 4px solid #f97316 !important;
          padding-left: 1rem !important;
          margin-top: 3rem !important;
          margin-bottom: 1.5rem !important;
          border-bottom: 1px solid #f3f4f6 !important;
          padding-bottom: 0.5rem !important;
        }
        .markdown-view-container .wmde-markdown h3 {
          font-size: 1.25rem !important;
          font-weight: 800 !important;
          color: #001f3f !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
        }
        .markdown-view-container .wmde-markdown p {
          margin-bottom: 1.25rem !important;
        }
        .markdown-view-container .wmde-markdown strong {
          color: #001f3f !important;
          font-weight: 700 !important;
        }
        .markdown-view-container .wmde-markdown ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin-bottom: 1.5rem !important;
        }
        .markdown-view-container .wmde-markdown li {
          margin-bottom: 0.5rem !important;
        }
      `}</style>
      <MarkdownPreview 
        source={content} 
        style={{ backgroundColor: 'transparent', color: 'inherit' }}
        wrapperElement={{"data-color-mode": "light"}}
      />
    </div>
  );
}
