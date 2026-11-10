import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { photos } from "@/lib/images";
import { fields } from "@/lib/industries";
import { FieldMarks, SourceNote } from "./marks";

export const metadata = pageMeta(
  "/industries",
  "対象業種｜育成就労の受入れ対象分野",
  "建設、機械・金属、食品製造を中心に、育成就労制度の受入れ対象分野と業務区分を、有識者会議の資料に沿ってご案内します。貴社の業務が対象となるかは個別に確認いたします。",
);

const featured = [
  {
    name: "建設",
    body: "建設現場の人手不足に悩む企業様の人材確保をご支援いたします。安全面への配慮や現場での日本語コミュニケーションについてもご相談ください。",
    href: "/industries/construction",
    photo: photos.siteExcavation,
  },
  {
    name: "機械・金属",
    body: "機械加工、金属加工、溶接などの製造現場をご支援いたします。技能の習得と定着を見据えた受入れをご提案いたします。",
    href: "/industries/industrial-products",
    photo: photos.siteSteel,
    note: "資料の分野名は「工業製品製造業」です。機械金属加工はその業務区分の一つです。",
  },
  {
    name: "食品製造",
    body: "食品工場など製造ラインでの人材確保をご支援いたします。衛生管理のルールなど、現場で必要な知識の習得もサポートいたします。",
    href: "/industries/food-manufacturing",
    note: "資料の分野名は「飲食料品製造業」です。",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        path="/industries"
        title="対象業種"
        lead="建設、機械・金属、食品製造を中心に、大阪府内の中小企業様の外国人材受入れをご支援しております。育成就労制度は2027年4月1日施行です。"
      />
      <Section id="coop" title="組合の主な対応分野" width="wide">
        <ul className="grid gap-5 md:grid-cols-3">
          {featured.map((item) => (
            <li key={item.name} className="flex flex-col overflow-hidden rounded bg-white shadow-card ring-1 ring-line">
              {item.photo ? <Photo photo={item.photo} sizes="(min-width: 768px) 320px, 100vw" imgClassName="aspect-[16/10]" /> : null}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-xl font-bold text-primary-dark">{item.name}</h3>
                <p className="mt-2 text-[15px]">{item.body}</p>
                {item.note ? <p className="mt-2 text-sm text-muted">{item.note}</p> : null}
                <Link href={item.href} className="mt-auto inline-flex min-h-11 items-center pt-3 font-bold text-primary-dark underline underline-offset-4">
                  分野の詳細を見る
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          ※育成就労制度で受入れ可能な分野・業務は制度上定められています。貴社の業務が対象となるかは、個別に確認いたします。
        </p>
      </Section>

      <Section id="all" title="育成就労の受入れ対象分野" tone="pale" width="wide" lead="有識者会議の資料1-3の目次に沿って、すべての分野を掲載しています。色だけで区別せず、文字のラベルで意味を示します。">
        <ul className="mb-8 grid gap-2 text-sm sm:grid-cols-2">
          <li className="rounded bg-white px-3 py-2">新たに追加（資料の赤字）。主たる技能の整備予定は令和7年度時点です。</li>
          <li className="rounded bg-white px-3 py-2">特定技能2号へ移行できる業務区分（資料の緑字）。</li>
          <li className="rounded bg-white px-3 py-2">3年目の試験に特定技能1号評価試験を使う（資料の青字）。</li>
          <li className="rounded bg-white px-3 py-2">頁の黒字は第5回会議資料の再掲、赤字は今回新たに示す資料です。</li>
        </ul>
        <ul className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <li key={field.slug} className="flex flex-col rounded bg-white p-5 shadow-card">
              <h3 className="text-lg font-bold text-ink">
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
          ※タオル製造（縫製）、かばん製造、管路更生（土木）は、技能実習職種への追加申請中です。表の「技能実習職種」は、技能実習2号移行対象の職種・作業を指します。
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
