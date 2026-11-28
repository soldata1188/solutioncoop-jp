import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta } from "@/lib/meta";
import { faqs } from "@/lib/faq";
import { Accent, Section } from "@/components/ui";

export const metadata = pageMeta(
  "/faq",
  "よくある質問｜育成就労・外国人材受入れ",
  "育成就労制度の開始時期や技能実習制度との違い、受入れの期間・費用、日本語の水準、転籍、受入れ人数の考え方など、外国人材の受入れを検討される経営者様からよくいただくご質問にお答えいたします。",
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
      <PageHeader path="/faq" title="よくある質問" lead="外国人材の受入れや育成就労制度について、よくいただくご質問をまとめました。" />
      <Section id="faq-system" title={<><Accent>制度・受入れ</Accent>について</>} width="narrow">
        <FaqList items={faqs.slice(0, 10)} />
      </Section>
      <Section id="faq-owner" title={<>経営者様から<Accent>よくいただくご質問</Accent></>} width="narrow" tone="pale">
        <FaqList items={faqs.slice(10)} />
      </Section>
      <CtaSection title={<>ご不明な点は、お気軽に<Accent>お問い合わせ</Accent>ください。</>} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
