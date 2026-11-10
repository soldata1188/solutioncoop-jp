import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { FieldArt, artFor } from "@/components/FieldArt";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { fields } from "@/lib/industries";
import { FieldMarks, SourceNote } from "./marks";

export const metadata = pageMeta(
  "/industries",
  "対象業種｜育成就労の受入れ対象分野",
  "建設、機械・金属、食品製造を中心に、育成就労制度の受入れ対象分野と業務区分を、有識者会議の資料に沿ってご案内します。貴社の業務が対象となるかは個別に確認いたします。",
);

const featured = ["construction", "industrial-products", "food-manufacturing"]
  .map((slug) => fields.find((field) => field.slug === slug))
  .filter((field) => field != null);

export default function Page() {
  return (
    <>
      <PageHeader
        path="/industries"
        title="対象業種"
        lead="建設、機械・金属、食品製造を中心にご支援しております。第6回資料を基本に、第14回で追加・改訂された区分を反映しています。育成就労制度は2027年4月1日施行です。"
      />
      <Section id="coop" title="組合の主な対応分野" width="wide">
        <ul className="grid gap-5 md:grid-cols-3">
          {featured.map((field) => (
            <li key={field.slug}>
              <Link href={`/industries/${field.slug}`} className="flex h-full flex-col rounded bg-white p-5 shadow-card no-underline">
                <FieldArt kind={artFor(field.slug)} />
                <p className="mt-2 text-xs font-bold text-muted">イメージ</p>
                <h3 className="mt-1 text-xl font-bold text-primary-dark">{field.name}</h3>
                <p className="mt-2 text-[15px] text-body">{field.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          ※育成就労制度で受入れ可能な分野・業務は制度上定められています。貴社の業務が対象となるかは、個別に確認いたします。
        </p>
      </Section>

      <Section id="all" title="育成就労の受入れ対象分野" tone="pale" width="wide" lead="第6回資料1-3の目次を基本に、すべての分野を掲載しています。第14回資料3-2で追加・改訂された業務区分は、その内容に置き換えています。色だけで区別せず、文字のラベルで意味を示します。">
        <p className="mb-4 text-[15px] font-bold text-ink">第6回資料を基本に、第14回で追加・改訂された区分を反映しています。</p>
        <ul className="mb-8 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <li className="rounded bg-white px-3 py-2">新たに追加（資料の赤字）。整備予定は、第6回の区分が令和7年度時点、第14回の区分が令和8年度時点です。</li>
          <li className="rounded bg-white px-3 py-2">特定技能2号へ移行できる業務区分（資料の緑字）。</li>
          <li className="rounded bg-white px-3 py-2">第6回の区分のうち、3年目に特定技能1号評価試験を活用するもの（資料の青字）。</li>
        </ul>
        <ul className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <li key={field.slug} className="flex flex-col rounded bg-white p-5 shadow-card">
              <FieldArt kind={artFor(field.slug)} />
              <p className="mt-2 text-xs font-bold text-muted">イメージ</p>
              <h3 className="mt-1 text-lg font-bold text-ink">
                <Link href={`/industries/${field.slug}`} className="underline decoration-primary underline-offset-4">{field.name}</Link>
              </h3>
              <p className="mt-2 text-[15px] text-body">{field.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-1">
                {field.works.map((work) => (
                  <li key={work.name}>
                    <Link href={`/industries/${field.slug}#work-${field.works.indexOf(work)}`} className="inline-flex min-h-11 items-center rounded bg-pale px-2 text-sm font-bold text-primary-dark">
                      {work.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <FieldMarks works={field.works} />
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          表の「技能実習職種」は、技能実習2号移行対象の職種・作業を指します。
        </p>
        <SourceNote />
      </Section>

      <Section id="record" title="当組合の実績">
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
