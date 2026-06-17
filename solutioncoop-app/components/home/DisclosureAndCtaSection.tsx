import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';

const DISCLOSURE_DOCS = [
  { label: '監理費用の明細', icon: '📄', desc: '監理費用の内訳および用途の明細' },
  { label: '運営規程',       icon: '📖', desc: '当組合の事業運営に関する基本規則' },
  { label: '監理団体事業報告書', icon: '📋', desc: '年度ごとの事業実績および活動報告' },
  { label: '監理団体許可証の写し', icon: '🏅', desc: '法務省・厚生労働省からの事業許可証' },
];

const COMPLIANCE_PILLARS = [
  { icon: '⚖️', title: '法令遵守',    desc: '技能実習法に完全準拠した事業運営' },
  { icon: '👁️', title: '透明性の確保', desc: '全費用・手数料の書面による明示' },
  { icon: '🛡️', title: '実習生の保護', desc: '不当な徴収の禁止と人権の尊重' },
];

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

      {/* ===== CTA (B2B Host Companies) ===== */}
      <section id="contact" className="py-16 md:py-28 pb-24 md:pb-28 bg-white text-slate-800 relative overflow-hidden border-t-8 border-[#f97316]">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Target Audience Label */}
          <div className="inline-block bg-[#1e40af] text-white font-black px-6 py-2.5 rounded mb-8 shadow-md text-sm md:text-base tracking-widest">
            🏢 受入企業様・人事ご担当者様へ
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-2 tracking-tight text-[#1e40af]">
            まずは無料でご相談ください
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-bold tracking-widest mb-8">
            お気軽にお問い合わせください。まずは無料相談から。
          </p>

          <div className="border-b border-gray-200 pb-10 mb-12 max-w-2xl mx-auto">
            <p className="text-base md:text-xl leading-loose text-gray-600 font-bold mb-4">
              外国人材の受入れを検討されている方、<br className="hidden md:block" />
              貴社に最適な受入れプランを、私たちが共に考え、
              <strong className="text-[#f97316] font-black mx-1 border-b-[3px] border-[#f97316] pb-0.5">ご提案</strong>いたします。
            </p>
            <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed">
              外国人材の受入れを検討されている企業様のご相談を、専門スタッフが丁寧にサポートいたします。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 md:gap-8 px-4 sm:px-0">
            <TrackedLink
              href="tel:0722248067"
              eventAction="cta_click"
              eventLabel="bottom_phone"
              className="flex flex-col items-center justify-center bg-white text-[#1e40af] border-2 border-slate-200 w-full md:w-80 py-4 px-4 hover:border-[#1e40af] hover:shadow-md transition-all rounded group"
            >
              <span className="text-xs md:text-sm text-gray-500 mb-1 font-bold group-hover:text-blue-500 transition-colors">
                お電話でのご相談 <span className="opacity-70 text-[10px]">/ Phone</span>
              </span>
              <span className="text-2xl md:text-3xl font-black text-[#1e40af] whitespace-nowrap mb-1">📞 072-224-8067</span>
              <span className="text-[10px] text-gray-400 font-medium">平日 9:00〜18:00 (Weekdays)</span>
            </TrackedLink>

            <TrackedLink
              href="https://lin.ee/rBe1tM6"
              target="_blank"
              rel="noopener noreferrer"
              eventAction="cta_click"
              eventLabel="bottom_line"
              className="flex flex-col items-center justify-center bg-[#06C755] hover:bg-[#05b34c] text-white w-full md:w-80 py-5 transition-all rounded shadow-lg group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,199,85,0.3)]"
            >
              <span className="text-xs md:text-sm font-bold opacity-90 mb-1 tracking-wider">LINEからのご相談</span>
              <span className="text-xl md:text-2xl font-black flex items-center gap-2 whitespace-nowrap mb-1">💬 LINEでお問い合わせ</span>
              <span className="text-[10px] text-white/70">LINE公式アカウント</span>
            </TrackedLink>
          </div>
        </div>
      </section>
    </>
  );
}
