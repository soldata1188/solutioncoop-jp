import { preload } from "react-dom";
import { sdgs } from "@/lib/site";

const SDGS_SIZES = "(min-width: 640px) 440px, 320px";
const SDGS_AVIF =
  "/images/sdgs-logo-yoko-320.avif 320w, /images/sdgs-logo-yoko-440.avif 440w, /images/sdgs-logo-yoko-880.avif 880w";
const SDGS_WEBP =
  "/images/sdgs-logo-yoko-320.webp 320w, /images/sdgs-logo-yoko-440.webp 440w, /images/sdgs-logo-yoko-880.webp 880w";

/**
 * ヒーロー直下の「SDGs未来都市・堺」。
 * 表示は堺市「ロゴマーク使用ガイド【庁外版】」の横型ロゴと、他の主体名との組み合わせに従います。
 * ロゴの原図は堺市のページから入手した横型PNG（余白なし）です。
 * https://www.city.sakai.lg.jp/shisei/toshi/sdgs/SDGsmiraitoshi_logo.files/date02.zip
 * 実績の数値は直下の ResultsSection に出します。
 */
export function StatsStrip({ children }: { children?: React.ReactNode }) {
  preload(SDGS_AVIF, {
    as: "image",
    type: "image/avif",
    imageSrcSet: SDGS_AVIF,
    imageSizes: SDGS_SIZES,
    fetchPriority: "high",
  });
  return (
    <section aria-labelledby="sdgs-title" data-reveal="" className="bg-white">
      <h2 id="sdgs-title" className="sr-only">SDGs未来都市・堺</h2>
      <div className="mx-auto max-w-[932px] px-4 pb-2 pt-6 md:pb-4 md:pt-8">
        <div className="flex justify-center bg-white">
          <div className="w-[min(100%,320px)] sm:w-[440px]">
            <picture>
              <source type="image/avif" sizes={SDGS_SIZES} srcSet={SDGS_AVIF} />
              <source type="image/webp" sizes={SDGS_SIZES} srcSet={SDGS_WEBP} />
              <img
                src="/images/sdgs-logo-yoko-880.webp"
                alt="SDGs未来都市・堺"
                width={6579}
                height={1851}
                sizes={SDGS_SIZES}
                fetchPriority="high"
                decoding="async"
                className="block h-auto w-full"
              />
            </picture>
            <p className="sdgs-support mt-2 text-center leading-normal tracking-normal">
              <span>{sdgs.supportParts[0]}</span><span>{sdgs.supportParts[1]}</span>
            </p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
