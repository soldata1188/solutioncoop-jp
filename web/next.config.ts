import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // 投稿画像は next/image が同一オリジンの /_next/image 経由で配信します。
    // 許可証は文字が読める品質で、対応ブラウザには AVIF、それ以外には WebP を出します。
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "pbs.twimg.com" }],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    const home = { destination: "/", permanent: true } as const;
    return [
      { source: "/disclosure", destination: "/about#disclosure", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/news/:slug+", ...home },
      { source: "/news.html", ...home },
      { source: "/受け入れ実績", ...home },
      { source: "/%E5%8F%97%E3%81%91%E5%85%A5%E3%82%8C%E5%AE%9F%E7%B8%BE", ...home },
      { source: "/%E3%81%86%E3%81%91%E3%81%84%E3%82%8C%E5%AE%9F%E7%B8%BE", ...home },
      { source: "/受入実績", ...home },
      { source: "/%E5%8F%97%E5%85%A5%E5%AE%9F%E7%B8%BE", ...home },
      { source: "/industries", ...home },
      { source: "/industries/:path*", ...home },
      { source: "/support", ...home },
      { source: "/price", ...home },
      { source: "/roadmap", ...home },
      { source: "/sakai", ...home },
      { source: "/index.html", ...home },
      { source: "/gino-jisshu.html", ...home },
      { source: "/support.html", ...home },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
