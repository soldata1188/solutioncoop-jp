import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' }
    ],
  },
  async redirects() {
    return [
      // www → non-www 301 Permanent Redirect (SEO canonical統一)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.solutioncoop-jp.com' }],
        destination: 'https://solutioncoop-jp.com/:path*',
        permanent: true,
      },
      // 301 Permanent Redirects for legacy HTML pages to modern clean routes (SEO & 404 Fix)
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/gino-jisshu.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/news.html',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/privacy.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/support.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Cache control cho ảnh tĩnh — giúp Core Web Vitals
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Override cache cho HTML pages (luôn mới nhất)
        source: '/(|news|faq|disclosure|privacy)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
