import Link from "next/link";
import { preload } from "react-dom";
import { Chunks } from "@/components/KeepWords";
import { CONTACT_HREF } from "@/lib/site";

/**
 * バナー原図は 2421×800。幅 1280 では高さ 423px を超えると左右が切れる。
 * 390px 幅では中央の緑が文字の後ろに来るよう cover する。2x は実寸 2421 を選ばせる。
 */
const HERO_SIZES = "(max-width: 639px) 1800px, 100vw";
const HERO_AVIF =
  "/images/hero/hero-illustration-1280.avif 1280w, /images/hero/hero-illustration-1600.avif 1600w, /images/hero/hero-illustration-2421.avif 2421w";
const HERO_WEBP =
  "/images/hero/hero-illustration-1280.webp 1280w, /images/hero/hero-illustration-1600.webp 1600w, /images/hero/hero-illustration-2421.webp 2421w";

/**
 * トップのヒーロー。背景はバナー用イラスト第2稿（端の空が明るく、中央は緑の余白）。
 * 文字は中央の濃い緑に置き、人物に重ねない。スクリムは重ねない。
 * 白 / 中央の緑（平均 #036D47 付近）は 6.40:1。黄色の小見出し #FFF478 は濃い緑上で 5.63:1。
 * 黄色は右寄りの明るい緑で 4.5:1 を切るため、アクセント（ラベルと主ボタン）に限り、本文は白。
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
    <section data-hero className="relative overflow-hidden bg-[#036d47] text-white">
      <picture className="pointer-events-none absolute inset-0 block">
        <source type="image/avif" sizes={HERO_SIZES} srcSet={HERO_AVIF} />
        <source type="image/webp" sizes={HERO_SIZES} srcSet={HERO_WEBP} />
        <img
          src="/images/hero/hero-illustration-1600.webp"
          alt=""
          width={2421}
          height={800}
          sizes={HERO_SIZES}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center sm:object-[40%_center]"
        />
      </picture>

      {/* 中央揃えで幅を濃い緑の余白に合わせ、人物に重ならないようにする */}
      <div className="relative mx-auto flex w-full max-w-[36rem] flex-col items-center justify-center px-4 py-14 text-center sm:py-16 md:py-20">
        <h1 className="w-full">
          <span className="block text-[11px] font-bold leading-none tracking-[0.14em] text-cta sm:text-sm sm:tracking-[0.2em]">
            <Chunks parts={["技能実習生・", "育成就労・", "特定技能、"]} />
          </span>
          <span className="mt-4 block text-[1.65rem] font-black leading-[1.25] tracking-tight text-white sm:mt-5 sm:text-4xl sm:leading-[1.2] md:text-[2.75rem]">
            <Chunks parts={["外国人採用を", "適正な監理で支えます。"]} />
          </span>
        </h1>

        <p className="mt-6 max-w-[30rem] text-sm font-medium leading-[1.8] text-white sm:mt-7 sm:text-base">
          <span className="block">
            <span className="inline-block">実習生の受入れから</span>
            <span className="inline-block">育成就労・特定技能への移行まで、</span>
          </span>
          <span className="mt-1 block">
            <span className="inline-block">80社以上の実績とノウハウで、</span>
            <span className="inline-block">貴社の外国人材活用を</span>
            <span className="inline-block">トータルサポートいたします。</span>
          </span>
        </p>

        <div className="mt-8 grid w-full grid-cols-2 gap-3 sm:mt-10">
          <Link
            href={CONTACT_HREF}
            prefetch={false}
            className="relative flex min-h-16 items-center justify-center rounded-control bg-cta px-2 py-3 text-center font-black text-ink no-underline transition-colors hover:bg-cta-hover sm:min-h-[4.5rem]"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-[13px] sm:text-base">
                <Chunks parts={["受入れを", "検討する"]} />
              </span>
              <span className="mt-1 text-[11px] font-bold sm:text-xs">無料相談・お問い合わせ</span>
            </span>
            <span aria-hidden="true" className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-sm leading-none sm:right-3 sm:text-lg">
              →
            </span>
          </Link>
          <Link
            href="/#for-workers"
            prefetch={false}
            className="flex min-h-16 flex-col items-center justify-center rounded-control border border-white/80 bg-primary-darker/45 px-2 py-3 text-center font-black leading-tight text-white no-underline transition-colors hover:bg-primary-darker/60 sm:min-h-[4.5rem]"
          >
            <span className="text-[13px] sm:text-base">24時間相談窓口</span>
            <span className="mt-1 text-[11px] font-bold sm:text-xs">
              <Chunks parts={["実習生・", "外国人材の方はこちら"]} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
