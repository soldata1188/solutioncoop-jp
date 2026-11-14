import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { BarRoute } from "@/components/BarRoute";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, org, organizationJsonLd } from "@/lib/site";

/** Noto Sans JP の可変フォント（ビルド時に取得してセルフホスト。実行時に外部へは接続しません） */
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "堺の監理団体 ソリューション協同組合｜大阪の外国人材受入れ・育成就労",
    template: `%s｜${org.name}`,
  },
  description:
    "堺市の監理団体、ソリューション協同組合です。大阪の中小企業様の外国人材受入れと、2027年4月1日施行の育成就労制度への対応をご支援いたします。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: org.name,
    images: [{ url: "/brand/SOL_Solution_Coop_official_2026-11-07.jpg", width: 1500, height: 1200, alt: org.name }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e7f46",
  width: "device-width",
  initialScale: 1,
  // iPhone のホームバー等の領域まで描画し、固定バーは env(safe-area-inset-bottom) で余白を確保
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJp.variable} suppressHydrationWarning>
      <head>
        {/* JavaScript が使えるときだけ html に .js を付けます（開閉式の部品は、JavaScript 無効時にすべて開いた状態で表示するため） */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:font-bold focus:text-primary-dark focus:shadow"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <BarRoute>
          <MobileCallBar />
        </BarRoute>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
