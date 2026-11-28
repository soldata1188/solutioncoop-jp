import Link from "next/link";
import { preload } from "react-dom";
import { Chunks } from "@/components/KeepWords";
import { CONTACT_HREF, LINE_URL } from "@/lib/site";

/**
 * デスクトップは元画像の全幅。高さ 611px のときは cover で約 1451px 幅になるので、
 * 1460px を下限にして 1x は 1600、2x は 3468 を選ばせる。1600px 以上は幅そのもの。
 */
const HERO_SIZES = "(max-width: 1459px) 1460px, 100vw";
const HERO_AVIF =
  "/images/hero/hero-bg-1600.avif 1600w, /images/hero/hero-bg-2400.avif 2400w, /images/hero/hero-bg-3468.avif 3468w";
const HERO_WEBP =
  "/images/hero/hero-bg-1600.webp 1600w, /images/hero/hero-bg-2400.webp 2400w, /images/hero/hero-bg-3468.webp 3468w";
/**
 * モバイルも元画像の全幅（3468×1460）。高さ 688px までは cover の表示幅が約 1634px。
 * 1x は 1734、2x は実寸 3468 を選ばせ、引き伸ばさない。360px 以下は 1x でも実寸を使う。
 */
const HERO_MOBILE_SIZES = "(max-width: 389px) 1900px, 1734px";
const HERO_MOBILE_AVIF =
  "/images/hero/hero-bg-mobile-1734.avif 1734w, /images/hero/hero-bg-3468.avif 3468w";
const HERO_MOBILE_WEBP =
  "/images/hero/hero-bg-mobile-1734.webp 1734w, /images/hero/hero-bg-3468.webp 3468w";

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
 * トップのヒーロー。背景は夕景の工場写真（縮小と切り出しのみ。ぼかしや色の加工はしない）。
 * 文字の背後だけ、暗い紺のスクリム。緑の塗りつぶしは使わない。
 * 通常の文字は 4.5:1、大きな見出しは 3:1。黄色のボタン地は #222 / #FFF478。
 */
export function HomeHero() {
  preload(HERO_MOBILE_AVIF, {
    as: "image",
    type: "image/avif",
    imageSrcSet: HERO_MOBILE_AVIF,
    imageSizes: HERO_MOBILE_SIZES,
    fetchPriority: "high",
    media: "(max-width: 639px)",
  });
  preload(HERO_AVIF, {
    as: "image",
    type: "image/avif",
    imageSrcSet: HERO_AVIF,
    imageSizes: HERO_SIZES,
    fetchPriority: "high",
    media: "(min-width: 640px)",
  });
  return (
    <section data-hero className="relative overflow-hidden bg-[#0c1220] text-white">
      <picture className="pointer-events-none absolute inset-0 block">
        <source media="(max-width: 639px)" type="image/avif" sizes={HERO_MOBILE_SIZES} srcSet={HERO_MOBILE_AVIF} />
        <source media="(max-width: 639px)" type="image/webp" sizes={HERO_MOBILE_SIZES} srcSet={HERO_MOBILE_WEBP} />
        <source media="(min-width: 640px)" type="image/avif" sizes={HERO_SIZES} srcSet={HERO_AVIF} />
        <source media="(min-width: 640px)" type="image/webp" sizes={HERO_SIZES} srcSet={HERO_WEBP} />
        <img
          src="/images/hero/hero-bg-1600.webp"
          alt=""
          width={3468}
          height={1460}
          sizes={HERO_SIZES}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center sm:object-[center_62%]"
        />
      </picture>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,18,32,0.78)_0%,rgba(12,18,32,0.72)_38%,rgba(12,18,32,0.66)_70%,rgba(12,18,32,0.52)_100%)] sm:bg-[radial-gradient(ellipse_78%_125%_at_50%_46%,rgba(12,18,32,0.80)_0%,rgba(12,18,32,0.70)_42%,rgba(12,18,32,0.42)_68%,rgba(12,18,32,0.12)_84%,rgba(12,18,32,0)_100%)]"
      />

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
