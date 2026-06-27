import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getLatestNews, getCompanies } from '@/lib/data';

import HeroSection            from '@/components/home/HeroSection';
import KeyStatsSection        from '@/components/home/KeyStatsSection';
import NewsSectionHome        from '@/components/home/NewsSectionHome';
import PillarsSection         from '@/components/home/PillarsSection';
import BusinessCategoriesSection from '@/components/home/BusinessCategoriesSection';
import CountriesSection       from '@/components/home/CountriesSection';
import CtaMiniBanner          from '@/components/home/CtaMiniBanner';
import SupportSection         from '@/components/home/SupportSection';
import OverviewSection        from '@/components/home/OverviewSection';
import DisclosureAndCtaSection from '@/components/home/DisclosureAndCtaSection';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'ソリューション協同組合｜育成就労・技能実習・特定技能 外国人採用の監理団体｜大阪府堺市',
  description: '大阪府堺市の技能実習監理団体（許1708000610）。育成就労制度への移行準備・技能実習・特定技能の受入を一貫支援。令和8年大阪府知事表彰受賞・設立2012年・70社超の実績。中小企業様の外国人採用を無料相談から全面サポート。',
  keywords: [
    'ソリューション協同組合',
    '育成就労', '育成就労制度', '育成就労 監理支援機関',
    '技能実習', '技能実習 監理団体', '特定技能', '外国人採用',
    '監理団体 大阪', '監理団体 堺市', '監理支援機関 大阪',
    '外国人採用 中小企業', '外国人技能実習機構', 'OTIT',
    '技能実習 大阪', '育成就労 移行準備',
  ],
  alternates: { canonical: 'https://solutioncoop-jp.com' },
  openGraph: {
    title: 'ソリューション協同組合｜育成就労・技能実習・特定技能 監理団体｜大阪府堺市',
    description: '大阪府堺市の監理団体（許1708000610）。育成就労・技能実習・特定技能の受入を一貫支援。令和8年知事表彰受賞・設立2012年・70社超の実績。無料相談受付中。',
    url: 'https://solutioncoop-jp.com',
    siteName: 'ソリューション協同組合',
    images: [{ url: '/images/hero-banner.jpg', width: 1200, height: 630, alt: '技能実習・育成就労・特定技能の監理団体 ソリューション協同組合' }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ソリューション協同組合｜育成就労・技能実習・特定技能 監理団体',
    description: '大阪府堺市の監理団体。育成就労・技能実習・特定技能まで一貫支援。令和8年知事表彰・70社超の実績・無料相談受付中。',
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
        <BusinessCategoriesSection />
        <PillarsSection />
        <CountriesSection />
        <CtaMiniBanner />
        <SupportSection />
        <OverviewSection />
        <DisclosureAndCtaSection />

      </main>
      <Footer />
    </>
  );
}

