import Image from "next/image";
import sdgsSakai from "@/public/images/sdgs-sakai.webp";
import { achievements } from "@/lib/site";

/**
 * トップの実績ストリップ（ヒーロー直下）。
 * PC（lg以上）：左に「SDGs未来都市・堺」ロゴ、右に4つの実績を細い区切り線で並べます。
 * スマートフォン・タブレット：実績を先に2×2（md以上は4列）で表示し、その下にロゴ（小）と応援の一文を1行にまとめます。
 * 数値は #0F4D2A（白背景で 9.93:1）、ラベルは #222。
 * ロゴは既存リポジトリ images/sdgs-sakai.png を WebP に変換したもの（使用許諾は要確認・ページには表示しません）。
 */
export function StatsStrip({ children }: { children?: React.ReactNode }) {
  return (
    <section aria-labelledby="stats-title" className="bg-white">
      <h2 id="stats-title" className="sr-only">当組合の実績</h2>
      <div className="mx-auto max-w-[1100px] px-4 py-6 md:py-8">
        <div className="grid overflow-hidden rounded border border-line bg-white shadow-card lg:grid-cols-[260px_1fr]">
          <div className="order-2 flex items-center justify-center gap-3 border-t border-line px-4 py-3 lg:order-none lg:flex-col lg:gap-2 lg:border-t-0 lg:border-r lg:px-5 lg:py-5">
            <Image src={sdgsSakai} alt="SDGs未来都市・堺 ロゴ" sizes="(min-width: 1024px) 200px, 104px" className="h-auto w-[104px] shrink-0 lg:w-[200px]" />
            <p className="text-xs leading-relaxed text-ink lg:text-center">
              ソリューション協同組合は、
              <br />
              <span className="font-bold text-primary-dark">SDGs未来都市・堺</span>を応援しています。
            </p>
          </div>
          <ul className="order-1 grid grid-cols-2 gap-px bg-line md:grid-cols-4 lg:order-none">
            {achievements.map((a) => (
              <li key={a.label} className="flex flex-col items-center justify-center bg-white px-2 py-5 text-center">
                <span aria-hidden="true" className="font-bold leading-none text-primary-dark">
                  <span className="text-[2.25rem] md:text-[2.5rem]">{a.value}</span>
                  <span className="ml-0.5 text-lg md:text-xl">{a.unit}</span>
                </span>
                <span aria-hidden="true" className="mt-2 text-[13px] font-bold leading-snug text-ink">{a.label}</span>
                <span className="sr-only">{a.sr}</span>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </section>
  );
}
