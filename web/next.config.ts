import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  async redirects() {
    return [
      { source: "/for-workers", destination: "/#for-workers", permanent: true },
      { source: "/for-workers/", destination: "/#for-workers", permanent: true },
    ];
  },
  poweredByHeader: false,
  images: {
    // 静的書き出しでは画像最適化サーバーが無い。大きい原図は public に AVIF/WebP を置いて picture で出す。
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
