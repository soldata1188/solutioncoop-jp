import { phases, phaseStepLabel } from "@/lib/flow";

/** 受入れまでの期間の目安（5段階のタイムライン）。期間は lib/flow.ts と同じ目安の値のみを使います。 */
const spans: Record<(typeof phases)[number], { time: string }> = {
  "ご契約": { time: "お問い合わせから|約1〜2週間" },
  "人材の選考": { time: "求人依頼・Web面接" },
  "申請": { time: "面接から配属まで|約5〜6か月" },
  "入国・講習": { time: "上陸後講習 1か月" },
  "配属・育成": { time: "育成就労 原則3年間" },
};

export function FlowTimeline() {
  return (
    <ol className="grid gap-3 md:grid-cols-5 md:gap-0">
      {phases.map((p, i) => {
        return (
          <li key={p} className="relative flex gap-4 md:block md:px-2 md:text-center">
            <div className="flex flex-col items-center md:block">
              <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white md:mx-auto">
                {i + 1}
              </span>
              {i < phases.length - 1 ? (
                <span aria-hidden="true" className="mt-1 w-0.5 flex-1 bg-tab md:absolute md:left-1/2 md:top-[21px] md:mt-0 md:h-0.5 md:w-full" />
              ) : null}
            </div>
            <div className="pb-2 md:mt-3">
              <p className="text-base font-bold text-ink">{p}</p>
              <p className="text-sm text-muted">{phaseStepLabel[p]}</p>
              <p className="mt-1 text-sm font-bold text-primary-dark">
                {/* 「|」は改行してよい位置。各まとまりは途中で折り返さず、最終行が1文字だけになるのを防ぎます */}
                {spans[p].time.split("|").map((t) => (
                  <span key={t} className="inline-block">{t}</span>
                ))}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
