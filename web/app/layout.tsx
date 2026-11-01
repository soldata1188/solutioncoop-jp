import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, org, organizationJsonLd } from "@/lib/site";

/** Noto Sans JP（ビルド時に取得してセルフホスト。実行時に外部へは接続しません） */
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
  openGraph: { type: "website", locale: "ja_JP", siteName: org.name },
};

export const viewport: Viewport = {
  themeColor: "#1478e6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={notoSansJp.variable}>
      <body className="flex min-h-screen flex-col pb-[68px] antialiased md:pb-0">
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
        <MobileCallBar />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
