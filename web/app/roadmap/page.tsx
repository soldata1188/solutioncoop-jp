import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { Section, SubHeading } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/roadmap",
  "2027年4月に向けた準備｜育成就労のロードマップとチェックリスト",
  "2027年4月1日施行の育成就労制度に向けて、受入れ企業様がいつ頃から何を進めておきたいかを、時期の目安を示したロードマップと、社内体制や書類の準備を確かめられるチェックリストでご案内いたします。",
);

type Milestone = { when: string; title: string; body: string; tag: "目安" | "公表資料" | "施行日"; check?: boolean };

const timeline: Milestone[] = [
  {
    when: "今すぐ",
    title: "現状の確認",
    body: "受け入れている技能実習生の人数と在留期限、今後の採用計画を整理します。当組合が一緒に確認いたします。",
    tag: "目安",
  },
  {
    when: "受入れ開始予定の1年前ごろ",
    title: "受入れ体制の検討",
    body: "育成就労責任者・育成就労指導員・生活相談員の候補者、住居、日本語講習の機会の提供方法などを検討します。",
    tag: "目安",
    check: true,
  },
  {
    when: "開始予定日の7か月前〜5か月前",
    title: "育成就労計画の認定申請（施行日前申請）",
    body: "運用要領では、施行日前の申請は、原則として育成就労の開始予定日の7か月前から5か月前までに行うこととされています。受付の開始時期などの詳細は、今後の公表内容を確認のうえご案内いたします。",
    tag: "公表資料",
    check: true,
  },
  {
    when: "2027年4月1日",
    title: "育成就労制度の施行",
    body: "育成就労制度は2027年4月1日施行です。施行前に認定を受けた技能実習計画による技能実習の取扱い（経過措置）は、個別にご説明いたします。",
    tag: "施行日",
    check: true,
  },
  {
    when: "施行後",
    title: "配属・育成と定期的な監査",
    body: "人材の配属後は、育成就労計画に沿った育成を進めます。当組合が定期的な監査・訪問・相談対応でご支援いたします。",
    tag: "目安",
  },
];

const checklist: { text: string; note?: string; check?: boolean }[] = [
  { text: "受入れ中・受入れ予定の人数と、在留期限を一覧にした" },
  { text: "自社の業務が、育成就労の対象となる分野・業務区分に当てはまるか確認した", note: "当組合にご相談ください", check: true },
  { text: "常勤職員の人数を確認した", note: "受入れ人数の上限（人数枠）の目安になります" },
  { text: "育成就労責任者・育成就労指導員・生活相談員の候補者を考えた" },
  { text: "住居や通勤手段など、生活の環境を確認した" },
  { text: "日本語講習の機会を提供する方法を検討した", note: "就労開始前はA1相当、終了時はA2相当が目標です" },
  { text: "費用について確認し、予算を検討した", note: "当組合にご相談ください" },
  { text: "受入れの開始時期を決め、申請のスケジュールを相談した" },
];

const tagClass: Record<Milestone["tag"], string> = {
  目安: "border-primary-dark text-primary-dark",
  公表資料: "border-body text-body",
  施行日: "border-cta-text text-cta-text",
};

export default function Page() {
  return (
    <>
      <PageHeader
        title="2027年4月に向けた準備"
        path="/roadmap"
        lead="育成就労制度は2027年4月1日施行です。受入れ企業様が今から進めておきたい準備を、ロードマップとチェックリストにまとめました。"
      />

      <Section id="timeline" title="準備のロードマップ" width="narrow">
        <ol className="relative border-l-2 border-tab pl-8">
          {timeline.map((m) => (
            <li key={m.title} className="relative pb-8 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-primary-dark shadow" />
              <p className="flex flex-wrap items-center gap-2 text-[15px] font-bold text-primary-dark">
                {m.when}
                <span className={`rounded border bg-white px-1.5 text-xs font-bold ${tagClass[m.tag]}`}>{m.tag}</span>
              </p>
              <h3 className="mt-1 text-lg font-bold text-ink">
                {m.title}
                {m.check ? <CheckBadge /> : null}
              </h3>
              <p className="mt-2 text-[15px]">{m.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted">
          ※「目安」は当組合が想定する一般的な進め方、「公表資料」は「育成就労制度 運用要領」の記載、「施行日」は育成就労制度の施行日（2027年4月1日）です。企業様ごとの状況により異なります。
        </p>
      </Section>

      <Section id="checklist" title="経営者様向けチェックリスト" tone="pale" width="narrow">
        {/* 操作できるチェック欄ではないため、四角い枠ではなく番号で表示します */}
        <ol className="space-y-3">
          {checklist.map((c, i) => (
            <li key={c.text} className="flex gap-4 rounded bg-white p-4 shadow-card">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white">{i + 1}</span>
              <div>
                <p className="font-bold text-ink">
                  {c.text}
                  {c.check ? <CheckBadge /> : null}
                </p>
                {c.note ? <p className="mt-1 text-sm text-muted">{c.note}</p> : null}
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[15px]">
          詳しくは「<Link href="/compare" className="font-bold text-primary-dark underline underline-offset-4">制度の比較</Link>」もご覧ください。
        </p>
      </Section>

      <Section width="narrow">
        <SubHeading as="h2">当組合の状況</SubHeading>
        <p className="mt-4">
          当組合は、技能実習法に基づく監理団体として許可を受けております。育成就労制度に向けて準備中です。準備の状況は、お問い合わせの際に個別にご説明いたします。
        </p>
      </Section>

      <CtaSection title="準備の進め方を、一緒に確認しませんか。" />
    </>
  );
}
