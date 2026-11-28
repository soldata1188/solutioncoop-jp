import Link from "next/link";
import { Chunks } from "@/components/KeepWords";
import { SquaresPattern } from "@/components/ui";
import { CONTACT_HREF, LINE_URL } from "@/lib/site";

function IconConstruction() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 20h16M8 20V9l4-5 4 5v11" />
      <path d="M12 4v-1M10 20v-4h4v4" />
    </svg>
  );
}

function IconFactory() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 20V11l5 3V11l5 3V9h8v11H3z" />
      <path d="M16 6V3M16 6h3" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M5 20V5h8v15M13 20V10h6v10" />
      <path d="M8 8h2M8 12h2M8 16h2M16 13h2M16 16h2" />
    </svg>
  );
}

const chipBase = "inline-flex min-h-9 items-center gap-1.5 rounded-control border border-white/80 bg-transparent px-3 py-1 text-sm font-bold leading-none text-white";

/**
 * トップのヒーロー。背景は再デザイン前の緑地と四角模様（SquaresPattern）。
 * 白 / #1E7F46 は 5.02:1。小さい黄色だけ #FFF9B0（4.65:1）。
 * 業種の枠と副ボタンは、白を混ぜると文字が 4.5:1 を切るため、濃い緑の半透明にしています。
 */
export function HomeHero() {
  return (
    <section data-hero className="relative overflow-hidden bg-primary text-white">
      <SquaresPattern />

      <div className="relative mx-auto flex max-w-[920px] flex-col items-center px-4 py-14 text-center sm:py-16 md:py-20">
        <h1 className="text-[1.7rem] font-black leading-tight sm:text-4xl md:text-5xl">
          <span className="block text-white">
            <Chunks parts={["技能実習生・", "育成就労・", "特定技能、"]} />
          </span>
          <span className="mt-2 block text-cta">
            <Chunks parts={["外国人採用を", "適正な監理で支えます。"]} />
          </span>
        </h1>

        <p className="mt-6 text-base font-bold leading-relaxed text-white md:mt-8 md:text-xl">
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

        <div className="mt-8 flex w-full max-w-3xl flex-col items-center gap-3 rounded-site border border-white/40 bg-primary-darker/35 px-3 py-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4 sm:px-5 md:py-4">
          <p className="text-xs font-bold tracking-wide text-cta">主な対応業種</p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            <li className={chipBase}>
              <IconConstruction />
              建設業
            </li>
            <li className={chipBase}>
              <IconFactory />
              製造業
            </li>
            <li className={chipBase}>
              <IconBuilding />
              その他業種
            </li>
          </ul>
        </div>

        <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-2 sm:gap-3 md:mt-10">
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
    </section>
  );
}
