import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import TrackedLink from '@/components/TrackedLink';

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

        {/* Option 1 Specific: Document Download CTA Banner */}
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-2xl p-8 md:p-12 border border-orange-200 shadow-sm max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-black text-orange-800 mb-4">
              お問い合わせ
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              「育成就労」への移行ポイントや、当組合独自のサポート体制について、より分かりやすくまとめた最新のガイドブックを無料でダウンロードいただけます。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/documents/ikusei-shuro-guide.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                育成就労ガイドブックをダウンロード
              </a>
              <TrackedLink 
                href="/#contact" 
                eventAction="cta_click" 
                eventLabel="faq_page_consult"
                className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 border-2 border-orange-200 hover:border-orange-500 font-bold py-4 px-8 rounded-full transition-all"
              >
                無料相談を申し込む
              </TrackedLink>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
