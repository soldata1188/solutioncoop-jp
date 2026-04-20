import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  companies: string[];
}

export default function HeroSection({ companies }: HeroSectionProps) {
  return (
    <section className="relative min-h-[650px] lg:min-h-[720px] flex flex-col overflow-hidden">
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
      <div className="flex-1 flex items-center justify-center w-full relative z-10 py-12">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <div className="w-full max-w-4xl text-white flex flex-col items-center gap-8">

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
              <span className="block mb-1 md:mb-2 text-white">実習生の育成と定着を、</span>
              <span className="block text-orange-400">適正な監理で支えます。</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-xl font-medium leading-loose text-blue-50 opacity-95 max-w-3xl mx-auto drop-shadow-sm">
              ソリューション協同組合は、大阪府堺市を拠点とする<strong className="text-white border-b border-white pb-0.5">技能実習監理団体</strong>です。<br className="hidden md:block" />
              平成24年の設立以来、12名の専任講師による独自の教育体制を強みに、数多くの受入企業様とともに歩んでまいりました。
            </p>

            {/* Industry Tags + Social Proof */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="bg-white/15 border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded tracking-wider">建設業</span>
                <span className="bg-white/15 border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded tracking-wider">製造業</span>
                <span className="bg-white/15 border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded tracking-wider">その他業種</span>
              </div>
              <p className="text-sm md:text-base text-blue-100 font-bold tracking-wide text-center leading-relaxed drop-shadow-sm">
                大阪・関西圏の<span className="text-orange-400 font-black mx-1 text-lg md:text-xl">70社を超える企業</span>に導入されています。
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-lg">
              <Link href="#support" className="flex-1 bg-white hover:bg-blue-50 text-navy font-black py-4 px-6 rounded shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center group">
                <span className="text-lg">24/7 Support</span>
                <span className="text-[10px] text-gray-400 font-bold opacity-80 mt-0.5">実習生・外国人材の方</span>
              </Link>
              <Link href="#contact" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group">
                <div className="flex flex-col items-center">
                   <span className="text-lg">企業様はこちら</span>
                   <span className="text-[10px] text-white/70 font-bold mt-0.5">無料相談・導入のご検討</span>
                </div>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ===== COMPANY MARQUEE (Social Proof) ===== */}
      <div className="relative w-full z-20 border-t border-white/10 py-3 overflow-hidden flex items-center group bg-[#1e40af]/40 backdrop-blur-md mt-auto">
        <div className="flex-1 overflow-hidden flex items-center">
          {/* Base block */}
          <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]">
            {companies.map((c, i) => (
              <span key={`a-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                {c}
              </span>
            ))}
          </div>
          {/* Duplicate block for seamless infinite scrolling */}
          <div className="flex shrink-0 animate-marquee items-center text-sm font-bold text-white drop-shadow-lg group-hover:[animation-play-state:paused]" aria-hidden="true">
            {companies.map((c, i) => (
              <span key={`b-${i}`} className="mx-6 md:mx-10 flex items-center gap-2 hover:text-orange-300 transition-colors cursor-default whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
