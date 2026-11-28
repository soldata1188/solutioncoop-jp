import Link from "next/link";
import { Chunks } from "@/components/KeepWords";
import { CONTACT_HREF, LINE_URL } from "@/lib/site";

/** 文字の外側だけに置く緑の図形。写真は使わない。 */
function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-x-0 bottom-0 h-20 w-full min-[1100px]:hidden" viewBox="0 0 390 80" preserveAspectRatio="xMidYMax meet">
        <circle cx="28" cy="92" r="46" fill="#0F4D2A" />
        <circle cx="368" cy="86" r="34" fill="#176B3B" />
      </svg>
      <svg className="absolute inset-0 hidden h-full w-full min-[1100px]:block" viewBox="0 0 1280 640" preserveAspectRatio="xMidYMid slice">
        <circle cx="8" cy="72" r="78" fill="#0F4D2A" />
        <circle cx="1268" cy="540" r="96" fill="#0A3720" />
        <rect x="-36" y="430" width="150" height="52" rx="26" fill="#2E9A5A" opacity="0.55" />
        <rect x="1148" y="36" width="168" height="40" rx="20" transform="rotate(18 1148 36)" fill="#FFF478" opacity="0.28" />
        <circle cx="1188" cy="150" r="22" fill="#B7DCC8" opacity="0.45" />
      </svg>
    </div>
  );
}

/**
 * トップのヒーロー。背景は写真導入前の緑（#1E7F46）。
 * 図形は文字の外側だけ。通常の文字は 4.5:1、大きな見出しは 3:1。
 */
export function HomeHero() {
  return (
    <section data-hero className="relative overflow-hidden bg-primary text-white">
      <HeroDecor />

      <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-3 pb-32 pt-16 sm:px-4 sm:pb-28 sm:pt-20">
        <div className="w-full max-w-[920px] px-3 py-3 text-center sm:px-5 sm:py-5">
        <h1 className="text-[1.7rem] font-black leading-tight sm:text-4xl md:text-5xl">
          <span className="block text-white">
            <Chunks parts={["技能実習生・", "育成就労・", "特定技能、"]} />
          </span>
          <span className="mt-2 block text-cta">
            <Chunks parts={["外国人採用を", "適正な監理で支えます。"]} />
          </span>
        </h1>

        <p className="mt-3 text-base font-bold leading-relaxed text-white sm:mt-5 md:text-xl">
          <span className="block">
            <span className="inline-block">実習生の受入れから</span>
            <span className="inline-block">
              <span className="mx-1 text-cta-hover">育成就労・特定技能</span>
              への移行まで、
            </span>
          </span>
          <span className="mt-1 block">
            <span className="inline-block">80社以上の実績とノウハウで、</span>
            <span className="inline-block">貴社の外国人材活用を</span>
            <span className="inline-block">トータルサポートいたします。</span>
          </span>
        </p>

        <div className="mt-3 grid w-full max-w-xl grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
          <Link
            href={CONTACT_HREF}
            prefetch={false}
            className="flex min-h-16 items-center justify-center gap-1 rounded-control bg-cta px-2 py-3 text-center font-black text-ink no-underline transition-colors hover:bg-cta-hover"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-[13px] sm:text-lg">
                <Chunks parts={["受入れを", "検討する"]} />
              </span>
              <span className="mt-0.5 text-xs font-bold">無料相談・お問い合わせ</span>
            </span>
            <span aria-hidden="true" className="text-base sm:text-xl">→</span>
          </Link>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 flex-col items-center justify-center rounded-control border border-white/80 bg-primary-darker/45 px-2 py-3 text-center font-black leading-tight text-white no-underline transition-colors hover:bg-primary-darker/60"
          >
            <span className="text-[13px] sm:text-lg">24時間相談窓口</span>
            <span className="mt-0.5 text-xs font-bold">
              <Chunks parts={["実習生・", "外国人材の方はこちら"]} />
            </span>
            <span className="sr-only">（LINE公式アカウントを新しいタブで開きます）</span>
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
