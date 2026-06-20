import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import ContactCtaSection from '@/components/ContactCtaSection';

export const metadata: Metadata = {
  title: 'よくある質問（FAQ）｜技能実習・育成就労・特定技能｜ソリューション協同組合',
  description: '技能実習生・育成就労・特定技能の受入れに関するよくある質問（FAQ）。費用・手続き・メリット・制度の違いなど、受入企業様の疑問にすべてお答えします。大阪府堺市の監理団体 ソリューション協同組合。',
  keywords: ['技能実習 よくある質問', '育成就労 FAQ', '特定技能 費用', '監理費 相場', '外国人採用 手続き', '監理団体 選び方'],
  alternates: { canonical: 'https://solutioncoop-jp.com/faq' },
  openGraph: {
    title: 'よくある質問（FAQ）｜技能実習・育成就労・特定技能｜ソリューション協同組合',
    description: '技能実習・育成就労・特定技能の費用・手続き・制度の違いなど、受入企業様のよくある疑問にお答えします。',
    url: 'https://solutioncoop-jp.com/faq',
    siteName: 'ソリューション協同組合',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/images/ogp-main.jpg', width: 1200, height: 630, alt: 'よくある質問｜ソリューション協同組合' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'よくある質問（FAQ）｜ソリューション協同組合',
    description: '技能実習・育成就労・特定技能に関するよくある疑問にお答えします。',
    images: ['/images/ogp-main.jpg'],
  },
};

// BreadcrumbList Schema
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://solutioncoop-jp.com' },
    { '@type': 'ListItem', position: 2, name: 'よくある質問', item: 'https://solutioncoop-jp.com/faq' },
  ],
};

export default function FaqPage() {
  return (
    <>
      {/* BreadcrumbList JSON-LD — Google SERP breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Header />
      <main className="pt-20 bg-gray-50 min-h-screen">

        {/* Breadcrumb (visible) */}
        <div className="container mx-auto px-4 py-4">
          <nav aria-label="パンくずリスト" className="text-xs text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#1e40af] transition-colors">ホーム</a>
            <span aria-hidden="true">&gt;</span>
            <span className="text-gray-800 font-bold" aria-current="page">よくある質問</span>
          </nav>
        </div>

        {/* FAQ Section */}
        <div className="-mt-10">
          <FaqSection />
        </div>

      </main>
      <ContactCtaSection />
      <Footer />
    </>
  );
}
