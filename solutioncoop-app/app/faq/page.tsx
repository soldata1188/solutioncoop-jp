import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import TrackedLink from '@/components/TrackedLink';
import ContactCtaSection from '@/components/ContactCtaSection';

export const metadata: Metadata = {
  title: 'よくある質問（FAQ）｜ソリューション協同組合',
  description: '技能実習生、特定技能、育成就労に関するよくある質問（FAQ）。費用、手続き、メリットなど、受入企業様の「よくある不安や疑問」に全てお答えします。',
  alternates: { canonical: 'https://solutioncoop-jp.com/faq' },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="pt-20 bg-gray-50 min-h-screen">
        
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#1e40af] transition-colors">ホーム</a>
            <span>&gt;</span>
            <span className="text-gray-800 font-bold">よくある質問</span>
          </div>
        </div>

        {/* Existing FAQ Section */}
        <div className="-mt-10">
          <FaqSection />
        </div>



      </main>
      <ContactCtaSection />
      <Footer />
    </>
  );
}
