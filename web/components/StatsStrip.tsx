import Image from "next/image";
import sdgsSakai from "@/public/images/sdgs-sakai.webp";
import { achievements } from "@/lib/site";
import { NoBreak } from "./KeepWords";

/**
 * トップの実績ストリップ（ヒーロー直下）。
 * PC（lg以上）：左に「SDGs未来都市・堺」ロゴ、右に4つの実績を細い区切り線で並べます。
 * スマートフォン・タブレット：先頭にロゴと応援の一文（2行）を全幅で置き、その下に実績を2×2（md以上は4列）で表示します。
 * 数値は #0F4D2A（白背景で 9.93:1）、ラベルは #222。
 * ロゴは既存リポジトリ images/sdgs-sakai.png を WebP に変換したもの（ファイルは無加工）。
 * 堺市「ロゴマーク使用管理要領」第3条により、使用には事前の申請・承認が必要です（承認の有無は代表者様に要確認）。
 * 使用ガイドに従い、背景は白、応援の文言は黒色・ロゴ内の「SDGs未来都市・堺」より小さい文字で、1〜2行に配置します。
 */
export function StatsStrip({ children }: { children?: React.ReactNode }) {
  return (
    <section aria-labelledby="stats-title" className="bg-white">
      <h2 id="stats-title" className="sr-only">当組合の実績</h2>
      <div className="mx-auto max-w-[1100px] px-4 py-6 md:py-8">
        <div className="grid overflow-hidden rounded border border-line bg-white shadow-card lg:grid-cols-[300px_1fr]">
          <div className="flex flex-col items-center justify-center gap-1.5 border-b border-line px-4 py-3 lg:border-b-0 lg:flex-col lg:gap-2 lg:border-r lg:px-5 lg:py-4">
            <Image src={sdgsSakai} alt="SDGs未来都市・堺 ロゴ" sizes="(min-width: 1024px) 248px, 200px" className="h-auto w-[200px] shrink-0 lg:w-[248px]" />
            <p className="text-center text-xs font-bold leading-relaxed text-black">
              ソリューション協同組合は、
              <br />
              SDGs未来都市・堺を応援しています。
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {achievements.map((a) => (
              <li key={a.label} className="flex flex-col items-center justify-center bg-white px-2 py-4 text-center">
                <span aria-hidden="true" className="font-bold leading-none text-primary-dark">
                  <span className="text-[2.25rem] md:text-[2.5rem]">{a.value}</span>
                  <span className="ml-0.5 text-lg md:text-xl">{a.unit}</span>
                </span>
                <span aria-hidden="true" className="mt-2 text-sm font-bold leading-snug text-ink">
                  {/* ラベルは語の途中で折り返さないよう、空白で区切ったまとまりごとに改行を禁止します */}
                  {a.label.split(" ").map((part, i) => (
                    <span key={part}>{i > 0 ? " " : null}<NoBreak>{part}</NoBreak></span>
                  ))}
                </span>
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
