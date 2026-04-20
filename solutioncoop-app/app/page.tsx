import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getLatestNews, getCompanies } from '@/lib/data';

import HeroSection            from '@/components/home/HeroSection';
import KeyStatsSection        from '@/components/home/KeyStatsSection';
import NewsSectionHome        from '@/components/home/NewsSectionHome';
import StrengthsSection       from '@/components/home/StrengthsSection';
import SupportSection         from '@/components/home/SupportSection';
import OverviewSection        from '@/components/home/OverviewSection';
import DisclosureAndCtaSection from '@/components/home/DisclosureAndCtaSection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
  description: 'ソリューション協同組合は、大阪府堺市を拠点とする技能実習監理団体です。規律・礼節を重んじる独自の教育体制で、中小企業の人材不足解消と組織活性化をトータルで支援します。',
  alternates: { canonical: 'https://solutioncoop-jp.com' },
  openGraph: {
    title: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
    description: '大阪府堺市を拠点とする技能実習監理団体。規律・礼節を重んじる独自の教育体制で中小企業の人材課題を解決します。',
    url: 'https://solutioncoop-jp.com',
    siteName: 'ソリューション協同組合',
    images: [{ url: '/images/ogp-main.jpg', width: 1200, height: 630 }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '【公式】技能実習 監理団体｜ソリューション協同組合',
    description: '大阪府堺市の技能実習監理団体。独自の教育体制で中小企業の成長を支援。',
    images: ['/images/ogp-main.jpg'],
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GovernmentOrganization',
  name: 'ソリューション協同組合',
  alternateName: 'Solution Cooperative',
  url: 'https://solutioncoop-jp.com',
  logo: 'https://solutioncoop-jp.com/images/logo.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '堺区甲斐町東4丁2番2号',
    addressLocality: '堺市',
    addressRegion: '大阪府',
    postalCode: '590-0953',
    addressCountry: 'JP',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+81-72-224-8067',
    contactType: 'customer service',
  },
};

export default async function HomePage() {
  const latestNews = await getLatestNews();
  const companies  = await getCompanies();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection            companies={companies} />
        <KeyStatsSection />
        <NewsSectionHome        latestNews={latestNews} />
        <StrengthsSection />
        <SupportSection />
        <OverviewSection />
        <DisclosureAndCtaSection />

      </main>
      <Footer />
    </>
  );
}
