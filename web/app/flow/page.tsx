import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { Section } from "@/components/ui";
import { FlowTimeline } from "@/components/FlowTimeline";
import { pageMeta } from "@/lib/meta";
import { steps } from "@/lib/flow";

export const metadata = pageMeta(
  "/flow",
  "受入れの流れ｜大阪の外国人材受入れ",
  "育成就労制度での外国人材受入れの流れを、お申込みから面接、申請、入国、配属まで13の手順でご説明いたします。お問い合わせからご契約までの目安は約1〜2週間です。",
);

export default function Page() {
  return (
    <>
      <PageHeader
        path="/flow"
        title="外国人材 受入れの流れ"
        lead="育成就労制度でインドネシアから人材を受け入れる場合の、お申込みから配属までの13の手順をご紹介いたします。国や時期により手順・期間が異なる場合がございます。"
      />
      <Section width="narrow" flushBottom>
        <aside role="note" className="rounded border-2 border-amber-600 bg-amber-50 p-5 text-amber-950">
          本ページの手順・期間は目安・暫定（改訂6版・2026年10月31日時点）です。育成就労制度の運用により変更となる可能性がございます。<CheckBadge />
        </aside>
      </Section>
      <Section id="overview" title="期間の目安（全体像）" width="wide">
        <FlowTimeline />
      </Section>
      <Section id="steps" title="13の手順" width="narrow" tone="pale">
        <ol className="relative">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0 md:gap-6">
              {i < steps.length - 1 ? <span aria-hidden="true" className="absolute left-[21px] top-11 bottom-0 w-0.5 bg-tab" /> : null}
              <span aria-hidden="true" className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-primary-dark font-bold text-white">{i + 1}</span>
              <div className="flex-1 rounded border border-line bg-white p-5 shadow-card">
                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">
                  <span className="sr-only">手順{i + 1}：</span>{s.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted">{s.body}</p>
                {s.badge ? <p className="mt-3 inline-block rounded-full bg-primary-dark px-4 py-1 text-sm font-bold text-white">{s.badge}</p> : null}
                {s.check ? <p className="mt-2 text-sm text-muted">{s.check}<CheckBadge /></p> : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <CtaSection />
    </>
  );
}
