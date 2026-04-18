'use client';
// Nút chia sẻ LINE và X (Twitter)
export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl   = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3 mt-4">
      <span className="text-xs text-gray-500 font-semibold">この記事をシェア：</span>
      {/* LINE */}
      <a href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-[#06C755] hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded transition"
        aria-label="LINEでシェア">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 5.92 2 10.76c0 3.05 1.72 5.74 4.35 7.38L5.2 22l4.42-2.44c.76.18 1.56.28 2.38.28 5.52 0 10-3.92 10-8.76S17.52 2 12 2z"/>
        </svg>
        LINE
      </a>
      {/* X (Twitter) */}
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded transition"
        aria-label="Xでシェア">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        投稿する
      </a>
      {/* Copy URL */}
      <button onClick={() => { navigator.clipboard.writeText(url); }}
        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded transition"
        title="URLをコピー">
        🔗 URLをコピー
      </button>
    </div>
  );
}
