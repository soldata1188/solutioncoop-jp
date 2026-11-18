import Image from "next/image";
import sdgsSakai from "@/public/images/sdgs-mirai-toshi-sakai.jpg";
import { achievements, sdgs } from "@/lib/site";

/**
 * トップの実績（ヒーロー直下）。
 * 3つの実績は同じ大きさのカード。SDGsのロゴと応援の一文は、その下の白い帯に分けます。
 * ロゴは原寸の JPG を next/image で出し、表示幅は 240px 以下にします。
 * 背景は白、応援の文言は黒です。
 */
export function StatsStrip({ children }: { children?: React.ReactNode }) {
  return (
    <section aria-labelledby="stats-title" data-reveal="" className="bg-white">
      <h2 id="stats-title" className="sr-only">当組合の実績</h2>
      <div className="mx-auto max-w-[932px] px-4 py-6 md:py-8">
        <ul className="grid grid-cols-3 items-stretch gap-2 sm:gap-4">
          {achievements.map((item) => (
            <li key={item.label} className="flex h-full flex-col items-center justify-center border-t-[3px] border-primary bg-white px-1.5 py-4 text-center shadow-card sm:px-4 sm:py-6">
              <span aria-hidden="true" className="text-[1.35rem] font-bold leading-none text-primary-dark sm:text-4xl">{item.value}</span>
              <span aria-hidden="true" className="mt-2 min-h-10 text-xs font-bold leading-snug text-ink sm:min-h-0 sm:text-sm">{item.label}</span>
              <span className="sr-only">{item.sr}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded border border-line bg-white px-4 py-4 text-center sm:flex-row sm:gap-6">
          <Image
            src={sdgsSakai}
            alt="SDGs未来都市・堺 ロゴ"
            width={758}
            height={236}
            quality={90}
            sizes="240px"
            className="h-auto w-[240px] max-w-full"
          />
          <p className="max-w-md text-sm font-bold leading-relaxed text-black">{sdgs.support}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
