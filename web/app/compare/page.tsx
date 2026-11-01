import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { Section, SubHeading, LinkButton } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { compareRows, ourStatus, type Cell } from "@/lib/compare";

export const metadata = pageMeta(
  "/compare",
  "技能実習・特定技能・育成就労の違い｜制度の比較",
  "技能実習、特定技能（1号）、2027年4月1日施行の育成就労について、目的・期間・転籍・日本語・支援機関・送出機関の費用などの違いを、受入れ企業の経営者様向けに一覧表でわかりやすくご説明いたします。",
);

const cols = [
  { key: "jisshu", label: "技能実習" },
  { key: "tokutei", label: "特定技能（1号）" },
  { key: "ikusei", label: "育成就労（2027年4月1日施行）" },
] as const;

function CellText({ cell }: { cell: Cell }) {
  return (
    <>
      {cell.text}
      {cell.check ? <CheckBadge /> : null}
    </>
  );
}

const points = [
  {
    title: "人材が定着する職場づくりが、より大切になります",
    body: "育成就労では、一定の要件のもとで本人の意向による転籍が認められます。日々の指導や生活面の相談体制など、働き続けたいと思える環境づくりが大切です。",
  },
  {
    title: "日本語と技能の目標が明確になります",
    body: "就労開始前の日本語要件（A1相当）や、終了時の目標（A2相当・技能検定3級等）が定められます。受入れ企業様には、日本語講習の機会の提供などが求められます。",
  },
  {
    title: "3年間で特定技能1号の水準へ",
    body: "育成就労は、3年間で特定技能1号の水準の人材を育成することを目指す制度です。長く活躍していただくための計画的な育成が前提となります。",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        title="制度の比較"
        path="/compare"
        lead="技能実習・特定技能（1号）・育成就労の主な違いを、受入れ企業様の立場から整理しました。育成就労は2027年4月1日施行の制度です。"
      />

      <Section id="table" title="3つの制度の主な違い" width="wide">
        {/* PC：一覧表 */}
        <div className="hidden md:block">
          <table className="w-full border-separate border-spacing-0 text-left text-[15px] shadow-card">
            <caption className="sr-only">技能実習・特定技能（1号）・育成就労の比較表</caption>
            <thead>
              <tr>
                <th scope="col" className="w-40 bg-primary-dark p-3 text-white"><span className="sr-only">項目</span></th>
                {cols.map((c) => (
                  <th key={c.key} scope="col" className={`p-3 text-center font-bold ${c.key === "ikusei" ? "bg-cta text-ink" : "bg-primary-dark text-white"}`}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="border-b border-white bg-label p-3 align-top font-bold text-ink">{r.label}</th>
                  {cols.map((c) => (
                    <td key={c.key} className={`border-b border-line p-3 align-top ${c.key === "ikusei" ? "bg-orange-50" : "bg-white"}`}>
                      <CellText cell={r[c.key]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row" className="bg-label p-3 align-top font-bold text-ink">当組合の対応</th>
                {cols.map((c) => (
                  <td key={c.key} className={`p-3 align-top font-bold text-primary-dark ${c.key === "ikusei" ? "bg-orange-50" : "bg-white"}`}>
                    {ourStatus[c.key]}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* スマートフォン：項目ごとのカード */}
        <div className="space-y-4 md:hidden">
          {[...compareRows, { label: "当組合の対応", jisshu: { text: ourStatus.jisshu }, tokutei: { text: ourStatus.tokutei }, ikusei: { text: ourStatus.ikusei } }].map((r) => (
            <section key={r.label} aria-label={r.label} className="overflow-hidden rounded bg-white shadow-card">
              <h3 className="bg-label px-4 py-2 font-bold text-ink">{r.label}</h3>
              <dl className="divide-y divide-line">
                {cols.map((c) => (
                  <div key={c.key} className={`px-4 py-3 ${c.key === "ikusei" ? "bg-orange-50" : ""}`}>
                    <dt className="text-[13px] font-bold text-primary-dark">{c.label}</dt>
                    <dd className="mt-0.5 text-[15px]"><CellText cell={r[c.key]} /></dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <div className="mt-6 space-y-1 text-sm text-muted">
          <p>※育成就労の内容は、出入国在留管理庁・厚生労働省の公表資料（「育成就労制度の関係省令等について」「育成就労制度 運用要領」）をもとに要点をまとめたものです。</p>
          <p>※分野ごとの転籍制限期間や対象の分野・業務区分などは、分野別の運用方針で定められます。「要確認」の項目は、最新の公表内容を確認のうえご案内いたします。</p>
          <p>※技能実習・特定技能の内容は一般的な概要です。分野・職種によって異なる場合があります。</p>
        </div>
      </Section>

      <Section id="points" title="経営者様にとっての主な変化" tone="pale">
        <div className="grid gap-5 md:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="border-t-4 border-primary bg-white p-6 shadow-card">
              <h3 className="text-base font-bold leading-snug text-ink">{p.title}</h3>
              <p className="mt-3 text-[15px]">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section width="narrow">
        <SubHeading as="h2">現在、技能実習生を受け入れている企業様へ</SubHeading>
        <p className="mt-4">
          現在受け入れている技能実習生の在留期間中の取扱いや、育成就労制度への切り替えの時期は、企業様ごとに異なります。
          準備の進め方は「<Link href="/roadmap" className="font-bold text-primary-dark underline underline-offset-4">2027年4月に向けた準備</Link>」でもご案内しております。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/roadmap" variant="blue" className="min-h-14 sm:flex-1">準備のロードマップを見る</LinkButton>
          <LinkButton href="/ikusei-shuro" variant="outlineCta" className="min-h-14 sm:flex-1">育成就労制度とは</LinkButton>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
