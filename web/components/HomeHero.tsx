import Link from "next/link";
import { preload } from "react-dom";
import { Chunks } from "@/components/KeepWords";
import { CONTACT_HREF } from "@/lib/site";

/**
 * バナー原図は 2400×800。幅 1280 では高さ 427px を超えると左右が切れる。
 * モバイル（md 未満）は Boss の指示どおり左端に合わせて cover する。2x は実寸 2400 を選ばせる。
 */
const HERO_SIZES = "(max-width: 767px) 1800px, 100vw";
const HERO_AVIF =
  "/images/hero/hero-illustration-1280.avif 1280w, /images/hero/hero-illustration-1600.avif 1600w, /images/hero/hero-illustration-2400.avif 2400w";
const HERO_WEBP =
  "/images/hero/hero-illustration-1280.webp 1280w, /images/hero/hero-illustration-1600.webp 1600w, /images/hero/hero-illustration-2400.webp 2400w";

/**
 * トップのヒーロー。背景はバナー用イラスト第3稿（左が建設現場、右が工場、中央は緑の余白）。
 * 書き出し時に中央の緑にあった小さな赤い欠けを周囲の緑で埋めた以外、絵は変えていない。
 * 文字組は 05997ce のまま。1280 では中央の濃い緑に文字を置き、人物に重ねない。スクリムは重ねない。
 * モバイルは画像を左寄せ（object-left）。md 未満は見出し・リードを白い曇りガラスの枠に載せ、文字は #1a1a1a / ラベル #0B3D24。
 * md 以上は枠を display:contents で消す（色・配置は従来どおり）。
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
    <section data-hero className="relative overflow-hidden bg-[#056c49] text-white">
      <picture className="pointer-events-none absolute inset-0 block">
        <source type="image/avif" sizes={HERO_SIZES} srcSet={HERO_AVIF} />
        <source type="image/webp" sizes={HERO_SIZES} srcSet={HERO_WEBP} />
        <img
          src="/images/hero/hero-illustration-1600.webp"
          alt=""
          width={2400}
          height={800}
          sizes={HERO_SIZES}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-left md:object-[44%_center]"
        />
      </picture>

      {/* 中央揃えで幅を濃い緑の余白に合わせ、人物に重ならないようにする */}
      <div className="relative mx-auto flex w-full max-w-[36rem] flex-col items-center justify-center px-4 py-14 text-center sm:py-16 md:py-20">
        {/* md 未満だけ曇りガラスの枠。ボタンは枠の外。md 以上は contents で箱を消す */}
        <div className="w-full rounded-[16px] border border-line bg-white/[0.86] px-3.5 py-5 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] md:contents">
          <h1 className="w-full">
            <span className="block text-[11px] font-bold leading-none tracking-[0.14em] text-[#0B3D24] sm:text-sm sm:tracking-[0.2em] md:text-cta">
              <Chunks parts={["技能実習生・", "育成就労・", "特定技能、"]} />
            </span>
            <span className="mt-4 block text-[1.65rem] font-black leading-[1.25] tracking-tight text-[#1a1a1a] sm:mt-5 sm:text-4xl sm:leading-[1.2] md:text-[2.75rem] md:text-white">
              <Chunks parts={["外国人採用を", "適正な監理で支えます。"]} />
            </span>
          </h1>

          <p className="mt-6 max-w-[30rem] text-sm font-medium leading-[1.8] text-[#1a1a1a] sm:mt-7 sm:text-base md:text-white">
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
        </div>

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
