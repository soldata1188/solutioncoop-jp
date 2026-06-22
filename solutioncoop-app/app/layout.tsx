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
    default: 'ソリューション協同組合｜育成就労・技能実習・特定技能 外国人採用の監理団体｜大阪府堺市',
    template: '%s — ソリューション協同組合',
  },
  description: '大阪府堺市の監理団体「ソリューション協同組合」。技能実習生の受入れから育成就労・特定技能への移行まで一貫支援。外国人採用に初めて取り組む中小企業様も安心。設立2012年・70社超の実績。',
  keywords: [
    '技能実習生', '技能実習 監理団体', '外国人採用', '外国人技能実習',
    '育成就労', '育成就労制度', '特定技能', '特定技能 サポート',
    '監理団体 大阪', '監理団体 堺市', '外国人採用 中小企業',
    'ソリューション協同組合', 'OTIT', '外国人技能実習機構',
  ],
  openGraph: {
    siteName: 'ソリューション協同組合',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/images/hero-banner.jpg', width: 1200, height: 630, alt: '技能実習・育成就労・特定技能の監理団体 ソリューション協同組合' }],
  },
  icons: {
    icon: '/favicon.jpg?v=2',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ── Schema 1: Organization + LocalBusiness ──
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'ソリューション協同組合',
    alternateName: 'Solution Cooperative Association',
    url: 'https://solutioncoop-jp.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://solutioncoop-jp.com/images/logo.png',
      width: 400,
      height: 400,
    },
    image: [
      'https://solutioncoop-jp.com/images/hero-banner.jpg',
      'https://solutioncoop-jp.com/images/logo.png',
    ],
    priceRange: '要お問い合わせ',
    description: '大阪府堺市を拠点とする技能実習監理団体。技能実習生の受入れから育成就労・特定技能への移行まで一貫支援。設立2012年・70社超の実績。',
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
      { '@type': 'AdministrativeArea', name: '大阪府' },
      { '@type': 'AdministrativeArea', name: '近畿地方' },
    ],
    hasMap: 'https://maps.google.com/?q=ソリューション協同組合+大阪府堺市堺区甲斐町東4丁2番2号',
    sameAs: [
      'https://solutioncoop-jp.com/disclosure',
      'https://www.facebook.com/solution.sakai',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+81-72-224-8067',
        contactType: 'customer service',
        availableLanguage: ['Japanese', 'Vietnamese', 'Indonesian'],
        hoursAvailable: 'Mo-Fr 09:00-18:00',
      },
      {
        '@type': 'ContactPoint',
        contactType: '24時間多言語相談',
        availableLanguage: ['Japanese', 'Vietnamese', 'Indonesian', 'Filipino'],
        hoursAvailable: 'Mo-Su 00:00-24:00',
      },
    ],
  };

  // ── Schema 2: Service (技能実習・育成就労・特定技能) ──
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '外国人材受入支援サービス',
    name: '技能実習・育成就労・特定技能 受入支援',
    provider: {
      '@type': 'Organization',
      name: 'ソリューション協同組合',
      url: 'https://solutioncoop-jp.com',
    },
    areaServed: { '@type': 'AdministrativeArea', name: '大阪府・近畿地方' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '外国人材受入サービス一覧',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '技能実習生 受入支援',
            description: '建設・製造・農業など86職種161作業に対応。入国前教育から現場定着まで一貫サポート。OTIT（外国人技能実習機構）への届出も当組合が対応。',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '育成就労制度 対応支援',
            description: '2027年施行予定の育成就労制度（旧技能実習制度）に向けた移行準備・計画策定を支援。監理支援機関として認可申請中。',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '特定技能 受入支援',
            description: '特定技能1号・2号の受入手続き・在留資格申請・生活支援をサポート。技能実習からの移行にも対応。',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '外国人採用 初期相談（無料）',
            description: '外国人採用が初めての中小企業様向けに、制度選択・費用・手続きを無料でご説明。LINEまたはお電話で24時間対応。',
          },
        },
      ],
    },
  };

  // ── Schema 3: FAQPage ──
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '技能実習生を受け入れる最大のメリットは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '若手人材の安定確保・職場の活性化・技術の継承・将来の海外進出の布石となる人材育成が主なメリットです。20代の意欲ある人材を最長5年間（特定技能へ移行でさらに長期）育成できます。',
        },
      },
      {
        '@type': 'Question',
        name: '新制度「育成就労」とはどのような制度ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2027年頃に施行予定の新制度で、現行の技能実習制度を廃止・発展させたものです。原則3年間の育成期間を経て、外国人労働者を「特定技能1号」水準（技能検定3級・日本語N4相当）まで育成することを目標とします。',
        },
      },
      {
        '@type': 'Question',
        name: '「特定技能」と「技能実習」の違いは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '技能実習は最長5年の国際貢献を目的とした研修制度で入国後に基礎教育が必要です。特定技能は即応性の高い人材活用が可能で、入国時点で技能・日本語試験（N4相当）に合格済みの人材を採用できます。',
        },
      },
      {
        '@type': 'Question',
        name: '外国人採用・技能実習が初めてですが、事務手続きは大変ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '技能実習計画の認定、入管への在留資格申請、OTIT（外国人技能実習機構）への届出など、専門知識が必要な事務手続きはすべて当組合が全面的にサポートします。受入企業様は技能指導に専念いただけます。',
        },
      },
      {
        '@type': 'Question',
        name: 'どのような業種・職種で外国人技能実習生を受け入れられますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '建設、製造業（金属加工・機械・溶接等）、農業、水産加工、介護、縫製など86職種161作業に対応しています。',
        },
      },
      {
        '@type': 'Question',
        name: '監理費用はいくらですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '監理費用の明細は法令に基づきウェブサイトで公開しています。仲介業者を介さず海外の教育機関と直接連携しているため、透明性の高い適正な費用体系を実現しています。詳しくは無料相談にてご説明します。',
        },
      },
      {
        '@type': 'Question',
        name: '育成就労制度への移行に向けて今何をすべきですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2026年中に育成就労への移行準備を始めることが重要です。当組合は監理支援機関への移行認可を申請中であり、現行制度から新制度へのスムーズな橋渡しを保証します。まずは無料相談にてシミュレーションをご提供します。',
        },
      },
      {
        '@type': 'Question',
        name: '24時間対応の相談窓口はありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい。ベトナム語・インドネシア語・タガログ語対応の母国語スタッフが24時間365日、LINE・Facebook Messenger・電話にて対応しています。実習生・外国人材の方も安心してご相談ください。',
        },
      },
    ],
  };

  // ── Schema 4: WebSite + SearchAction (Sitelinks Searchbox) ──
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ソリューション協同組合',
    url: 'https://solutioncoop-jp.com',
    description: '大阪府堺市の監理団体。技能実習生の受入れから育成就労・特定技能への移行まで一貫支援。設立2012年・70社超の実績。',
    inLanguage: 'ja',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://solutioncoop-jp.com/news?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="ja">
      <head>
        {/* Performance: preconnect for Google Fonts & Analytics */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${notoSansJP.className} text-gray-700 bg-white antialiased`}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX'}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Schema 1: Organization + LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        {/* Schema 2: Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
        />
        {/* Schema 3: FAQPage — Googleリッチリザルト対応 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        {/* Schema 4: WebSite + SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
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
