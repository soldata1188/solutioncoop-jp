import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { FaqList } from "@/components/FaqList";
import { Section } from "@/components/ui";
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
      <Section width="narrow">
        <FaqList items={faqs} headingLevel="h2" />
      </Section>
      <CtaSection title="ご不明な点は、お気軽にお問い合わせください。" />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
