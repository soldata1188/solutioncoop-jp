import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getLatestNews, getCompanies } from '@/lib/data';

import HeroSection            from '@/components/home/HeroSection';
import KeyStatsSection        from '@/components/home/KeyStatsSection';
import NewsSectionHome        from '@/components/home/NewsSectionHome';
import PillarsSection         from '@/components/home/PillarsSection';
import CountriesSection       from '@/components/home/CountriesSection';
import CtaMiniBanner          from '@/components/home/CtaMiniBanner';
import SupportSection         from '@/components/home/SupportSection';
import OverviewSection        from '@/components/home/OverviewSection';
import DisclosureAndCtaSection from '@/components/home/DisclosureAndCtaSection';
import FaqSection from '@/components/FaqSection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '技能実習生・外国人採用・育成就労・特定技能｜監理団体 ソリューション協同組合｜大阪府堺市',
  description: '大阪府堺市の監理団体「ソリューション協同組合」。技能実習生の受入れから育成就労・特定技能への移行まで一貫支援。外国人採用に初めて取り組む中小企業様も安心。設立2012年・70社超の実績。無料相談受付中。',
  keywords: [
    '技能実習生', '技能実習 監理団体', '外国人採用', '外国人技能実習',
    '育成就労', '育成就労制度', '特定技能', '特定技能 サポート',
    '監理団体 大阪', '監理団体 堺市', '外国人採用 中小企業',
    'ソリューション協同組合', 'OTIT', '外国人技能実習機構',
    '技能実習 大阪', '外国人労働者 受け入れ',
  ],
  alternates: { canonical: 'https://solutioncoop-jp.com' },
  openGraph: {
    title: '技能実習生・外国人採用・育成就労・特定技能｜ソリューション協同組合｜大阪府堺市',
    description: '大阪府堺市の監理団体。技能実習生の受入れから育成就労・特定技能への移行まで一貫支援。設立2012年・70社超の実績。',
    url: 'https://solutioncoop-jp.com',
    siteName: 'ソリューション協同組合',
    images: [{ url: '/images/hero-banner.jpg', width: 1200, height: 630, alt: '技能実習・育成就労・特定技能の監理団体 ソリューション協同組合' }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '技能実習生・外国人採用・育成就労｜ソリューション協同組合',
    description: '大阪府堺市の監理団体。技能実習・育成就労・特定技能まで一貫支援。70社超の実績・無料相談受付中。',
    images: ['/images/hero-banner.jpg'],
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
        <NewsSectionHome        latestNews={latestNews} />
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

