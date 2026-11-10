import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { INDUSTRY_SOURCE, fieldBySlug, fields, tocOnlyLabel, type Work } from "@/lib/industries";
import { Marks, SourceNote } from "../marks";

export function generateStaticParams() {
  return fields.map((field) => ({ slug: field.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const field = fieldBySlug(slug);
  if (!field) return {};
  return pageMeta(
    `/industries/${field.slug}`,
    `${field.name}｜育成就労の受入れ対象分野`,
    `${field.summary} 有識者会議の資料1-3に沿った業務区分と育成イメージです。貴社の業務が対象となるかは個別に確認いたします。`,
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const field = fieldBySlug(slug);
  if (!field) notFound();
  return (
    <>
      <PageHeader
        path={`/industries/${field.slug}`}
        title={field.name}
        ancestors={[{ name: "対象業種", path: "/industries" }]}
        lead={`${field.summary} 育成就労制度は2027年4月1日施行です。`}
      />
      <Section width="narrow">
        <p className="text-sm text-muted">
          図は資料の工程名を並べた当サイトの図です。資料の写真や挿絵は転載していません。
        </p>
        <ul className="mt-8 space-y-10">
          {field.works.map((work) => (
            <li key={work.name} id={`work-${field.works.indexOf(work)}`} className="scroll-mt-24 rounded bg-white p-4 shadow-card ring-1 ring-line sm:p-6">
              <h2 className="text-xl font-bold text-primary-dark">{work.name}</h2>
              <Marks flags={work.flags} />
              <dl className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
                <Fact term="主たる技能" value={work.skill} />
                <Fact term="対応する技能実習職種" value={work.jobs} />
                <Fact term="技能実習制度との異同" value={work.note} />
                <Fact term="資料の頁" value={work.pages} />
              </dl>
              {work.detail ? <Detail work={work} /> : <p className="mt-4 text-[15px]">{tocOnlyLabel}</p>}
            </li>
          ))}
        </ul>
        <SourceNote />
        <p className="mt-2 text-sm text-muted">
          資料PDF：<a href={INDUSTRY_SOURCE.pdfUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-dark underline underline-offset-4">{INDUSTRY_SOURCE.document}<span className="sr-only">（新しいタブで開きます）</span></a>
        </p>
      </Section>
      <CtaSection title="貴社の業務が対象となるか、お気軽にご相談ください。" />
    </>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-bold text-ink">{term}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function Detail({ work }: { work: Work }) {
  const detail = work.detail;
  if (!detail) return null;
  return (
    <div className="mt-5 space-y-5 text-[15px]">
      <p><span className="font-bold">主な業務（特定技能1号の技能水準）。</span>{detail.level}</p>
      <p><span className="font-bold">試験。</span>{detail.exam}</p>
      <p><span className="font-bold">育成の考え方。</span>{detail.approach}</p>
      {detail.note ? <p className="text-sm text-muted">{detail.note}</p> : null}
      {detail.topics.map((topic) => (
        <div key={topic.name}>
          <h3 className="text-lg font-bold text-ink">{topic.name}</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <p className="rounded bg-pale p-3"><span className="font-bold">1年目。</span>{topic.year1}</p>
            <p className="rounded bg-white p-3 ring-1 ring-line"><span className="font-bold">2〜3年目。</span>{topic.year23}</p>
          </div>
          <p className="mt-3 text-sm font-bold text-ink">業務の流れ（イメージ）</p>
          <ol className="mt-2 grid gap-2 sm:grid-cols-2">
            {topic.steps.map((step, index) => (
              <li key={step} className="flex min-h-11 items-center gap-2 rounded border border-line bg-white px-3 py-2">
                <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-dark text-xs font-bold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-1 text-xs text-muted">イメージ。実在の会社や実習生を描いたものではありません。</p>
        </div>
      ))}
    </div>
  );
}
