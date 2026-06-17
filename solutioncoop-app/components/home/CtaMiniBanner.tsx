import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';

export default function CtaMiniBanner() {
  return (
    <section className="py-12 bg-[#1e40af] relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          {/* Left: Message */}
          <div className="text-center md:text-left">
            <p className="text-blue-200 text-xs font-bold tracking-widest uppercase mb-2">
              受入企業様へ
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight">
              外国人材の受入れを<br className="md:hidden" />
              <span className="text-orange-400">お考えですか？</span>
            </h2>
            <p className="text-blue-100 text-sm mt-2 font-medium">
              制度の選び方から人材定着まで、専門スタッフが無料でご相談に応じます。
            </p>
          </div>

          {/* Right: CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <TrackedLink
              href="tel:0722248067"
              eventAction="cta_click"
              eventLabel="mid_phone"
              className="flex flex-col items-center justify-center bg-white text-[#1e40af] font-black py-3.5 px-6 rounded hover:bg-blue-50 transition-all w-full sm:w-auto border border-white/80"
            >
              <span className="text-xs text-gray-500 font-bold">お電話でのご相談</span>
              <span className="text-lg whitespace-nowrap">📞 072-224-8067</span>
            </TrackedLink>
            <TrackedLink
              href="/#contact"
              eventAction="cta_click"
              eventLabel="mid_web_contact"
              className="flex flex-col items-center justify-center bg-[#f97316] text-white font-black py-3.5 px-8 rounded hover:bg-[#ea580c] transition-all w-full sm:w-auto border border-orange-400"
            >
              <span className="text-xs text-white/80 font-bold">ウェブからのご相談</span>
              <span className="text-lg whitespace-nowrap">✉️ お問い合わせはこちら</span>
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
