import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleTagManager from '@/components/GoogleTagManager';
import BackToTop from '@/components/BackToTop';
import FloatingCTA from '@/components/FloatingCTA';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://solutioncoop-jp.com'),
  title: {
    default: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
    template: '%s｜ソリューション協同組合',
  },
  description: 'ソリューション協同組合は大阪府堺市に拠点を置く技能実習監理団体。規律・礼節を重んじる独自の教育体制で中小企業の人材課題を解決します。',
  keywords: ['技能実習', '監理団体', '外国人技能実習', 'ソリューション協同組合', '大阪', '堺市'],
  openGraph: { siteName: 'ソリューション協同組合', locale: 'ja_JP', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'ソリューション協同組合',
    alternateName: 'Solution Cooperative Association',
    url: 'https://solutioncoop-jp.com',
    logo: 'https://solutioncoop-jp.com/images/logo.png',
    description: 'ソリューション協同組合は大阪府堺市に拠点を置く技能実習監理団体。規律・礼節を重んじる独自の教育体制で中小企業の人材課題を解決します。',
    telephone: '+81-72-224-8067',
    faxNumber: '+81-72-224-2214',
    email: 'info@solutioncoop-jp.com',
    foundingDate: '2012-03',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '甲斐町東4丁2番2号',
      addressLocality: '堺市堺区',
      addressRegion: '大阪府',
      postalCode: '590-0953',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.5731,
      longitude: 135.4831,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    award: [
      '令和8年5月 憲法記念日知事表彰受賞',
      '令和4年9月 大阪府知事表彰受賞',
      '令和元年9月 大阪府中小企業団体表彰受賞',
    ],
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: '大阪府',
      },
      {
        '@type': 'AdministrativeArea',
        name: '近畿地方',
      }
    ],
    hasMap: 'https://maps.google.com/?q=ソリューション協同組合+大阪府堺市堺区甲斐町東4丁2番2号',
    sameAs: [
      'https://solutioncoop-jp.com/disclosure',
      'https://solutioncoop-jp.com/documents/kanrihi-meisai.pdf',
      'https://solutioncoop-jp.com/documents/uneikitei.pdf'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-72-224-8067',
      contactType: 'customer service',
      availableLanguage: ['Japanese', 'Vietnamese', 'Indonesian'],
    },
  };

  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} text-gray-700 bg-white antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX'}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <GoogleTagManager />
        <div className="pb-16 md:pb-0">
          {children}
        </div>
        <FloatingCTA />
        <BackToTop />
      </body>
    </html>
  );
}
