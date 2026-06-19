import React from 'react';
import TrackedLink from '@/components/TrackedLink';

export default function ContactCtaSection() {
  return (
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
  );
}
