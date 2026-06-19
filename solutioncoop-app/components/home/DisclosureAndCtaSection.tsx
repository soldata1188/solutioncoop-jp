import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import ContactCtaSection from '@/components/ContactCtaSection';

export default function DisclosureAndCtaSection() {
  return (
    <>
      {/* ===== 情報公開 (Disclosure) ===== */}
      <section id="disclosure" className="py-16 md:py-20 bg-blue-50/50 text-slate-800 border-t border-blue-100">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black mb-4 text-blue-900">情報公開・公開書類</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto rounded mb-6" />
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            技能実習法に基づき、監理費用の明細・運営規程・事業報告書等の重要書類を公開しております。
          </p>
          <Link
            href="/disclosure"
            className="inline-flex items-center gap-2 bg-white text-[#1e40af] font-bold px-8 py-3.5 rounded border-2 border-[#1e40af] hover:bg-[#1e40af] hover:text-white transition-all"
          >
            📋 公開書類一覧を見る <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}
