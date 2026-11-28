import Link from "next/link";
import { preload } from "react-dom";
import { Chunks } from "@/components/KeepWords";
import { CONTACT_HREF } from "@/lib/site";

/**
 * デスクトップはイラストの全幅（2179×720）。高さが 423px を超えると左右が切れる。
 * 390px 幅・高さ約 500px では表示幅が約 1510px 相当になるので、1x でも 1600、2x は実寸 2179 を選ばせる。
 */
const HERO_SIZES = "(max-width: 639px) 1800px, 100vw";
const HERO_AVIF =
  "/images/hero/hero-illustration-1280.avif 1280w, /images/hero/hero-illustration-1600.avif 1600w, /images/hero/hero-illustration-2179.avif 2179w";
const HERO_WEBP =
  "/images/hero/hero-illustration-1280.webp 1280w, /images/hero/hero-illustration-1600.webp 1600w, /images/hero/hero-illustration-2179.webp 2179w";

/**
 * トップのヒーロー。背景はバナー用のイラスト（左が建設現場、右が工場、中央は緑の余白）。
 * 以前の装飾の円や斜め帯は使わない。文字とボタンは中央の緑に置き、人物に重ねない。
 * スクリムは重ねない。白 / 中央の緑（平均 #0E603C）は 7.62:1。通常の白文字は 5% 点で 5.5:1。
 * 大きな黄色の見出し #FFF478 は 6.70:1、5% 点で 4.9:1。
 */
export function HomeHero() {
  preload(HERO_AVIF, {
    as: "image",
    type: "image/avif",
    imageSrcSet: HERO_AVIF,
    imageSizes: HERO_SIZES,
    fetchPriority: "high",
  });

  return (
    <section data-hero className="relative overflow-hidden bg-[#0e603c] text-white">
      <picture className="pointer-events-none absolute inset-0 block">
        <source type="image/avif" sizes={HERO_SIZES} srcSet={HERO_AVIF} />
        <source type="image/webp" sizes={HERO_SIZES} srcSet={HERO_WEBP} />
        <img
          src="/images/hero/hero-illustration-1600.webp"
          alt=""
          width={2179}
          height={720}
          sizes={HERO_SIZES}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>

      {/* 幅を中央の緑の余白に合わせ、見出しが人物に重ならないようにする */}
      <div className="relative mx-auto flex w-full max-w-[38rem] flex-col items-center justify-center px-3 py-14 text-center sm:px-4 sm:py-16 md:py-20">
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

        <div className="mt-3 flex w-full justify-center sm:mt-5">
          <div className="grid w-full max-w-xl grid-cols-2 gap-2 sm:gap-3">
            <Link
              href={CONTACT_HREF}
              prefetch={false}
              className="relative flex min-h-16 items-center justify-center rounded-control bg-cta px-2 py-3 text-center font-black text-ink no-underline transition-colors hover:bg-cta-hover"
            >
              <span className="flex flex-col items-center leading-tight">
                <span className="text-[13px] sm:text-lg">
                  <Chunks parts={["受入れを", "検討する"]} />
                </span>
                <span className="mt-0.5 text-xs font-bold">無料相談・お問い合わせ</span>
              </span>
              <span aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-sm leading-none sm:right-3 sm:text-xl">
                →
              </span>
            </Link>
            <Link
              href="/#for-workers"
              prefetch={false}
              className="flex min-h-16 flex-col items-center justify-center rounded-control border border-white/80 bg-primary-darker/45 px-2 py-3 text-center font-black leading-tight text-white no-underline transition-colors hover:bg-primary-darker/60"
            >
              <span className="text-[13px] sm:text-lg">24時間相談窓口</span>
              <span className="mt-0.5 text-xs font-bold">
                <Chunks parts={["実習生・", "外国人材の方はこちら"]} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
