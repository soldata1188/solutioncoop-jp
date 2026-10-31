import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { faqs } from "@/lib/faq";

export const metadata = pageMeta(
  "/faq",
  "よくある質問｜育成就労・外国人材受入れ",
  "育成就労制度の開始時期や技能実習制度との違い、受入れの期間・費用など、外国人材受入れに関するよくあるご質問にお答えいたします。",
);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Page() {
  return (
    <>
      <PageHeader title="よくある質問" lead="外国人材の受入れや育成就労制度について、よくいただくご質問をまとめました。" />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-lg border border-slate-200 bg-white shadow-sm open:ring-2 open:ring-navy-100">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg">Q. {f.q}</h2>
                <span aria-hidden="true" className="text-2xl group-open:rotate-45">＋</span>
              </summary>
              <div className="px-5 pb-5">
                <p>A. {f.a}{f.needsCheck ? <CheckBadge /> : null}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
      <CtaSection title="ご不明な点は、お気軽にお問い合わせください。" />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
