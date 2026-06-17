import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getLatestNews, getCompanies } from '@/lib/data';

import HeroSection            from '@/components/home/HeroSection';
import KeyStatsSection        from '@/components/home/KeyStatsSection';
import PillarsSection         from '@/components/home/PillarsSection';
import CountriesSection       from '@/components/home/CountriesSection';
import CtaMiniBanner          from '@/components/home/CtaMiniBanner';
import SupportSection         from '@/components/home/SupportSection';
import OverviewSection        from '@/components/home/OverviewSection';
import DisclosureAndCtaSection from '@/components/home/DisclosureAndCtaSection';
import FaqSection from '@/components/FaqSection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '【公式】技能実習 監理団体｜ソリューション協同組合｜大阪府堺市',
  description: 'ソリューション協同組合は、大阪府堺市を拠点とする技能実習監理団体です。規律・礼節を重んじる独自の教育体制で、意欲ある若手・グローバル人材の安定的な確保と育成を支援します。',
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

export default async function HomePage() {
  const latestNews = await getLatestNews();
  const companies  = await getCompanies();

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        <HeroSection            companies={companies} />
        <KeyStatsSection />
        <PillarsSection />
        <CountriesSection />
        <CtaMiniBanner />
        <SupportSection />
        <FaqSection />
        <OverviewSection />
        <DisclosureAndCtaSection />

      </main>
      <Footer />
    </>
  );
}

