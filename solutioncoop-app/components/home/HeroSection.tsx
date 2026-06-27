import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  companies: string[];
}

export default function HeroSection({ companies }: HeroSectionProps) {
  return (
    <section className="relative min-h-[560px] sm:min-h-[620px] lg:min-h-[720px] flex flex-col overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-banner.jpg" alt="" fill priority className="object-cover" aria-hidden="true" />
        {/* Dark Premium overlay mapping the LP design */}
        <div className="absolute inset-0 bg-[#1e40af]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent opacity-80" />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>
      <div className="flex-1 flex items-center justify-center w-full relative z-10 py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 text-center flex flex-col items-center">
          <div className="w-full max-w-4xl text-white flex flex-col items-center gap-5 sm:gap-8">

            {/* Headline */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
              <span className="block mb-1 md:mb-2 text-white">技能実習生・育成就労・特定技能、</span>
              <span className="block text-orange-400">外国人採用を適正な監理で支えます。</span>
            </h1>

            {/* Description */}
            <p className="text-sm md:text-xl font-medium leading-relaxed text-blue-50 opacity-95 max-w-3xl mx-auto drop-shadow-sm px-2">
              実習生の受入れから<strong className="text-orange-300 mx-1">育成就労・特定技能</strong>への移行まで、<br className="hidden md:block" />
              70社超の実績とノウハウで、貴社の外国人材活用をトータルサポートいたします。
            </p>

            {/* Industry Tags + Social Proof */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 mt-1 sm:mt-2 mb-1 sm:mb-2 w-full px-2 sm:px-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white/10 backdrop-blur-md py-2.5 sm:py-3 px-3 sm:px-6 rounded-xl sm:rounded-2xl border border-white/20 shadow-xl w-full sm:w-auto">
                <span className="text-[10px] sm:text-xs font-black text-orange-300 tracking-widest uppercase">主な対応業種</span>
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                  <span className="bg-white text-[#1e40af] text-xs sm:text-sm md:text-base font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded shadow-lg tracking-wider flex items-center gap-1 sm:gap-1.5"><span className="text-sm sm:text-base">🏗️</span> 建設業</span>
                  <span className="bg-white text-[#1e40af] text-xs sm:text-sm md:text-base font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded shadow-lg tracking-wider flex items-center gap-1 sm:gap-1.5"><span className="text-sm sm:text-base">🏭</span> 製造業</span>
                  <span className="bg-[#1e40af]/80 border border-white/50 text-white text-xs sm:text-sm md:text-base font-black px-2.5 sm:px-4 py-1 sm:py-1.5 rounded shadow-lg tracking-wider flex items-center gap-1 sm:gap-1.5"><span className="text-sm sm:text-base">🏢</span> その他業種</span>
                </div>
              </div>
              <p className="text-sm md:text-base text-blue-100 font-bold tracking-wide text-center leading-relaxed drop-shadow-sm">
                大阪・関西圏の<span className="text-orange-400 font-black mx-1 text-lg md:text-xl">70社を超える企業</span>に導入されています。
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-1 sm:mt-4 w-full max-w-lg px-4 sm:px-0">
              <Link href="#contact" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-2.5 sm:py-4 px-3 sm:px-4 rounded transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group border border-orange-400">
                <div className="flex flex-col items-center">
                   <span className="text-sm sm:text-lg">受入れを検討する</span>
                   <span className="text-[9px] sm:text-[10px] text-white/80 font-bold mt-0.5">無料相談・お問い合わせ</span>
                </div>
                <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="#support" className="flex-1 bg-white/20 hover:bg-white/30 text-white font-black py-2.5 sm:py-4 px-3 sm:px-4 rounded transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center group border border-white/40 backdrop-blur-sm">
                <span className="text-sm sm:text-lg">24時間相談窓口</span>
                <span className="text-[9px] sm:text-[10px] text-white/70 font-bold opacity-80 mt-0.5">実習生・外国人材の方はこちら</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ===== COMPANY MARQUEE (Social Proof) ===== */}
      <div className="relative w-full z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-[#1e40af]/40 backdrop-blur-md mt-auto">
        {/* Left Fixed Label Overlay */}
        <div className="absolute left-0 top-0 bottom-0 z-30 bg-gradient-to-r from-[#1e40af] via-[#1e40af]/90 to-transparent w-28 sm:w-40 md:w-56 flex items-center pl-2 sm:pl-4 md:pl-6">
            <span className="text-orange-300 text-[8px] sm:text-[10px] md:text-xs font-black tracking-normal sm:tracking-[0.1em] md:tracking-widest drop-shadow-md border-l-2 md:border-l-4 border-orange-500 pl-1.5 sm:pl-2 bg-[#1e40af]/40 px-1 py-0.5 rounded-r backdrop-blur-sm max-w-[80px] sm:max-w-none leading-tight">優良受入れ企業一覧</span>
        </div>
        
        <div className="flex-1 overflow-hidden flex items-center">
          {/* Base block */}
          <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]">
            {companies.map((c, i) => (
              <span key={`a-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                <span className="text-sm">🏅</span>
                {c}
              </span>
            ))}
          </div>
          {/* Duplicate block for seamless infinite scrolling */}
          <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]" aria-hidden="true">
            {companies.map((c, i) => (
              <span key={`b-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                <span className="text-sm">🏅</span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
