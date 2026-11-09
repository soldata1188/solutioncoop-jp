import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Section, LinkButton } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/ikusei-shuro",
  "育成就労制度とは｜堺の監理団体が解説",
  "2027年4月1日施行の育成就労制度について、技能実習制度からの主な変更点、転籍や日本語の考え方、受入れ企業様が準備しておきたいことを、堺市の監理団体ソリューション協同組合がわかりやすく解説いたします。",
);

const changes = [
  { item: "制度の目的", before: "国際貢献（技能・技術の移転）", after: "人材育成と人材確保" },
  { item: "転籍（職場の変更）", before: "原則として認められていない", after: "一定の要件のもとで本人の意向による転籍が認められる予定" },
  { item: "育成の目標", before: "技能の修得", after: "おおむね3年間で特定技能1号の水準の人材への育成を目指す" },
  { item: "監理を行う団体", before: "監理団体", after: "監理支援機関（新たな許可が必要）" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        path="/ikusei-shuro"
        title="育成就労制度とは"
        lead="技能実習制度に代わる新しい制度「育成就労制度」は、2027年4月1日施行です。受入れ企業様に知っていただきたいポイントを、堺市の監理団体である当組合がわかりやすくご説明いたします。"
      />
      <Section width="narrow" flushBottom>
        <p className="border-l-4 border-amber-600 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          最新情報は出入国在留管理庁の公表をご確認ください。
        </p>
      </Section>

      <Section id="s1" title="育成就労制度の概要" width="narrow">
        <p>
          育成就労制度は、2024年に成立した改正法にもとづき、2027年4月1日施行の制度です。外国人材を日本の産業を支える人材として育成し、同時に人手不足の分野における人材確保を図ることを目的としています。
        </p>
        <p className="mt-4">
          受入れ対象となる分野は、特定技能制度の分野と連携して定められる予定です。育成就労を修了した人材が、特定技能へと円滑に移行し、長く日本で活躍できる仕組みが想定されています。
        </p>
      </Section>

      <Section id="s2" title="技能実習制度からの主な変更点" tone="pale">
        {/* スマートフォン：項目ごとに縦積み */}
        <ul className="space-y-4 sm:hidden">
          {changes.map((c) => (
            <li key={c.item} className="overflow-hidden rounded bg-white shadow-card">
              <p className="bg-label px-4 py-2 text-center text-sm font-bold text-ink">{c.item}</p>
              <div className="bg-[#f2f2f2] px-4 py-3 text-body">
                <p className="text-sm text-muted">技能実習制度</p>
                <p>{c.before}</p>
              </div>
              <div className="bg-primary-dark px-4 py-3 text-white">
                <p className="text-sm text-white">育成就労制度</p>
                <p className="font-bold">{c.after}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block">
          <table className="w-full border-separate border-spacing-0 bg-white text-left text-[15px] shadow-card">
            <caption className="sr-only">技能実習制度と育成就労制度の比較</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[22%] bg-label p-3 text-center text-sm font-bold text-ink">項目</th>
                <th scope="col" className="bg-[#eeeeee] p-3 text-center font-bold text-body">技能実習制度</th>
                <th scope="col" className="bg-primary p-3 text-center text-[19px] font-bold text-white">育成就労制度</th>
              </tr>
            </thead>
            <tbody>
              {changes.map((c) => (
                <tr key={c.item}>
                  <th scope="row" className="border-t border-white bg-label p-3 text-center text-sm font-bold text-ink">{c.item}</th>
                  <td className="border-t border-white bg-white p-3 text-body border-b border-line">{c.before}</td>
                  <td className="border-t border-white/25 bg-primary-dark p-3 font-bold text-white">{c.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted">
          ※転籍の要件（就労期間、技能・日本語能力など）や日本語能力の基準、移行期間の取扱いの詳細は公式資料をご確認ください。
        </p>
      </Section>

      <Section id="s3" title="受入れ企業様にとっての意味" width="narrow">
        <ul className="space-y-4">
          {[
            <>人材を「育てて定着させる」視点での受入れ計画が、これまで以上に重要になります。</>,
            <>転籍が一定の条件で認められるため、職場環境や処遇、日本語学習の支援など、働き続けたいと思える環境づくりが求められます。</>,
            <>新制度での受入れには、制度に沿った計画の作成・認定など、新たな手続きが必要となる見込みです。</>,
          ].map((node, i) => (
            <li key={i} className="flex gap-3 border-b border-line pb-4 last:border-b-0">
              <span aria-hidden="true" className="mt-[0.6em] h-2 w-2 shrink-0 bg-primary-dark" />
              <span>{node}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="s4" title="当組合のご支援" tone="pale">
        <ul className="grid gap-5 md:grid-cols-2">
          {[
            ["制度のご説明", "育成就労制度の内容や、技能実習制度からの移行について、貴社の状況に合わせてご説明いたします。"],
            ["人材の選考支援", "ベトナム・インドネシア・フィリピンの送り出し機関と連携し、選考を支援いたします。"],
            ["手続きのサポート", "計画の作成や各種申請の準備について、制度に沿ってサポートいたします。"],
            ["受入れ後のフォロー", "定期的な訪問や相談対応を通じて、人材の定着と育成を支えます。"],
          ].map(([t, b], i) => (
            <li key={t} className="relative border-[6px] border-tab bg-white p-6 pt-10">
              <span aria-hidden="true" className="absolute -left-[6px] -top-[6px] flex h-8 w-8 items-center justify-center bg-tab font-bold text-primary-dark">{i + 1}</span>
              <h3 className="text-lg font-bold text-ink">{t}</h3>
              <p className="mt-2 text-[15px] text-muted">{b}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          ※当組合は現在、技能実習法に基づく監理団体（一般監理事業）として許可を受けております。育成就労制度に向けて準備中です。
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <LinkButton href="/roadmap" variant="ghost">準備のロードマップを見る</LinkButton>
          <LinkButton href="/support" variant="ghost">受入れ後の支援を見る</LinkButton>
        </div>
      </Section>
      <CtaSection title="育成就労制度について、まずはご相談ください。" />
    </>
  );
}
