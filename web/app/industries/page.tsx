import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/industries",
  "対象業種｜建設・機械金属・食品製造の外国人材受入れ",
  "建設、機械・金属、食品製造を中心に、堺市をはじめ大阪府内の中小企業様の外国人材受入れをご支援しております。ベトナム・インドネシア・フィリピンの送り出し機関と連携しています。業種ごとの受入れもご相談ください。",
);

const items = [
  { name: "建設", body: "建設現場の人手不足に悩む企業様の人材確保をご支援いたします。安全面への配慮や現場での日本語コミュニケーションについてもご相談ください。" },
  { name: "機械・金属", body: "機械加工、金属加工、溶接などの製造現場をご支援いたします。技能の習得と定着を見据えた受入れをご提案いたします。" },
  { name: "食品製造", body: "食品工場など製造ラインでの人材確保をご支援いたします。衛生管理のルールなど、現場で必要な知識の習得もサポートいたします。" },
];

export default function Page() {
  return (
    <>
      <PageHeader path="/industries" title="対象業種" lead="建設、機械・金属、食品製造を中心に、大阪府内の中小企業様の外国人材受入れをご支援しております。" />
      <Section width="narrow">
        <ul className="space-y-5">
          {items.map((s, i) => (
            <li key={s.name} className="relative border-[6px] border-tab bg-white p-6 pt-10">
              <span aria-hidden="true" className="absolute -left-[6px] -top-[6px] flex h-8 w-8 items-center justify-center bg-tab font-bold text-primary-dark">{i + 1}</span>
              <h2 className="text-2xl font-bold text-primary-dark">{s.name}</h2>
              <p className="mt-3">{s.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          ※育成就労制度で受入れ可能な分野・業務は制度上定められています。貴社の業務が対象となるかは、個別に確認いたします。
        </p>
      </Section>

      <Section id="record" title="当組合の実績" tone="pale">
        <dl className="mx-auto grid max-w-sm gap-4">
          <div className="border-b-4 border-primary bg-white p-5 text-center shadow-card">
            <dt className="text-sm text-muted">主な受入れ企業</dt>
            <dd className="text-2xl font-bold text-primary-dark">大阪府内</dd>
            <dd className="text-sm text-muted">中小企業様</dd>
          </div>
        </dl>
      </Section>
      <CtaSection title="貴社の業種で受入れが可能か、お気軽にご相談ください。" />
    </>
  );
}
