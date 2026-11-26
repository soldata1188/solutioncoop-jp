import { achievements } from "@/lib/site";

/** 大きな数字は白地で 4.5:1 以上の暖かい橙（#c24e0a）。参考の明るい橙は白文字基準を下回るため使いません。 */
const metric = "text-[44px] font-bold leading-none tabular-nums text-[#c24e0a] sm:text-[52px] lg:text-[56px]";
const unit = "text-lg font-bold leading-none text-ink sm:text-xl";

function DotGrid() {
  const dots = [];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 6; x++) {
      dots.push(<circle key={`${x}-${y}`} cx={3 + x * 11} cy={3 + y * 11} r="1.5" fill="#c5cbc8" />);
    }
  }
  return (
    <svg aria-hidden="true" className="absolute left-6 top-20" width="70" height="80" viewBox="0 0 70 80">
      {dots}
    </svg>
  );
}

/** 当組合の実績。狭い画面では端の図形を出さず、横にはみ出しません。 */
export function ResultsSection() {
  return (
    <section aria-labelledby="results" data-reveal="" className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden min-[1360px]:block">
        <DotGrid />
        <span className="absolute left-8 top-36 size-20 rounded-full bg-[#d9f99d]/90" />
        <svg aria-hidden="true" className="absolute right-6 top-16" width="84" height="176" viewBox="0 0 84 176">
          <path d="M10 68a32 32 0 0 1 64 0Z" fill="#f6c48a" />
          <path d="M10 120a32 32 0 0 1 64 0" fill="none" stroke="#c9cfcb" strokeWidth="2.5" />
          <path d="M10 172a32 32 0 0 1 64 0Z" fill="#b7e4c7" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-[1080px] px-4 pb-14 pt-8 md:pb-[72px] md:pt-10">
        <h2 id="results" className="text-center text-[1.7rem] font-bold leading-snug text-primary-dark md:text-4xl">
          <span className="block">数字でご紹介する</span>
          <span className="mt-1 block">
            <span className="box-decoration-clone bg-[linear-gradient(transparent_62%,#fde68a_62%)] px-1 text-[#c24e0a]">
              当組合の実績
            </span>
          </span>
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-3 lg:gap-6">
          {achievements.map((item, i) => {
            const top = i < 3;
            return (
              <li
                key={item.label}
                className={`flex h-full flex-col items-center rounded-2xl border-[3px] bg-white px-4 py-6 text-center shadow-card sm:px-5 sm:py-7 ${top ? "border-[#d4eddc]" : "border-[#e6efc4]"}`}
              >
                <h3
                  className={`inline-flex max-w-full items-center justify-center rounded-full px-4 py-1.5 text-center text-[13px] font-bold leading-snug text-white sm:text-sm ${top ? "bg-[#1f7a4c]" : "bg-[#5a7616]"}`}
                >
                  {item.label}
                </h3>
                <p className="mt-5 flex items-baseline justify-center gap-1">
                  {item.prefix ? <span className={unit}>{item.prefix}</span> : null}
                  <span className={metric}>{item.count}</span>
                  <span className={unit}>{item.unit}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-body">{item.caption}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
