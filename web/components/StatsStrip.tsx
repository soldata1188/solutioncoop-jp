import Image from "next/image";
import { achievements, sdgs } from "@/lib/site";

/**
 * トップの実績（ヒーロー直下）。
 * SDGsの表示は堺市「ロゴマーク使用ガイド【庁外版】」の横型ロゴと、他の主体名との組み合わせに従います。
 * ロゴの原図は堺市のページから入手した横型PNG（余白なし）です。
 * https://www.city.sakai.lg.jp/shisei/toshi/sdgs/SDGsmiraitoshi_logo.files/date02.zip
 */
export function StatsStrip({ children }: { children?: React.ReactNode }) {
  return (
    <section aria-labelledby="stats-title" data-reveal="" className="bg-white">
      <h2 id="stats-title" className="sr-only">当組合の実績</h2>
      <div className="mx-auto max-w-[932px] px-4 py-6 md:py-8">
        <div className="mb-8 flex justify-center bg-white">
          <div className="w-[min(100%,320px)] sm:w-[440px]">
            <Image
              src="/images/sdgs-logo-yoko.png"
              alt="SDGs未来都市・堺"
              width={6579}
              height={1851}
              quality={90}
              priority
              sizes="(min-width: 640px) 440px, 320px"
              className="block h-auto w-full"
            />
            <p className="sdgs-support mt-2 text-center leading-normal tracking-normal">
              <span>{sdgs.supportParts[0]}</span><span>{sdgs.supportParts[1]}</span>
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-3 items-stretch gap-2 sm:gap-4">
          {achievements.map((item) => (
            <li key={item.label} className="flex h-full flex-col items-center justify-center border-t-[3px] border-primary bg-white px-1.5 py-4 text-center shadow-card sm:px-4 sm:py-6">
              <span aria-hidden="true" className="text-[1.35rem] font-bold leading-none text-primary-dark sm:text-4xl">{item.value}</span>
              <span aria-hidden="true" className="mt-2 min-h-10 text-xs font-bold leading-snug text-ink sm:min-h-0 sm:text-sm">{item.label}</span>
              <span className="sr-only">{item.sr}</span>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </section>
  );
}
