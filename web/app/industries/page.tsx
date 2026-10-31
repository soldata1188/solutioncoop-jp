import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { pageMeta } from "@/lib/meta";
import { org } from "@/lib/site";

export const metadata = pageMeta(
  "/industries",
  "対象業種｜建設・機械金属・食品製造の外国人材受入れ",
  "建設、機械・金属、食品製造を中心に、大阪の中小企業様の外国人材受入れをご支援しております。ベトナム・インドネシア・フィリピンの送り出し機関と連携しています。",
);

const items = [
  { name: "建設", body: "建設現場の人手不足に悩む企業様の人材確保をご支援いたします。安全面への配慮や現場での日本語コミュニケーションについてもご相談ください。" },
  { name: "機械・金属", body: "機械加工、金属加工、溶接などの製造現場をご支援いたします。技能の習得と定着を見据えた受入れをご提案いたします。" },
  { name: "食品製造", body: "食品工場など製造ラインでの人材確保をご支援いたします。衛生管理のルールなど、現場で必要な知識の習得もサポートいたします。" },
];

export default function Page() {
  return (
    <>
      <PageHeader title="対象業種" lead="建設、機械・金属、食品製造を中心に、大阪府内の中小企業様の外国人材受入れをご支援しております。" />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <ul className="space-y-6">
          {items.map((s) => (
            <li key={s.name} className="rounded-xl border-l-4 border-navy-700 p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-navy-900">{s.name}</h2>
              <p className="mt-3">{s.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          ※育成就労制度で受入れ可能な分野・業務は制度上定められています。貴社の業務が対象となるかは、個別に確認いたします。<CheckBadge />
        </p>

        <section aria-labelledby="record" className="mt-12 rounded-xl bg-navy-50 p-6">
          <h2 id="record" className="text-2xl font-bold text-navy-950">当組合の実績</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 text-center">
              <dt className="text-sm text-muted">管理人数</dt>
              <dd className="text-2xl font-bold text-navy-900">{org.managed}</dd>
              <dd className="text-sm text-muted">技能実習生・特定技能外国人</dd>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <dt className="text-sm text-muted">連携する送り出し国</dt>
              <dd className="text-2xl font-bold text-navy-900">3か国</dd>
              <dd className="text-sm text-muted">ベトナム・インドネシア・フィリピン</dd>
            </div>
            <div className="rounded-lg bg-white p-4 text-center">
              <dt className="text-sm text-muted">主な受入れ企業</dt>
              <dd className="text-2xl font-bold text-navy-900">大阪府内</dd>
              <dd className="text-sm text-muted">中小企業様</dd>
            </div>
          </dl>
        </section>
      </div>
      <CtaSection title="貴社の業種で受入れが可能か、お気軽にご相談ください。" />
    </>
  );
}
