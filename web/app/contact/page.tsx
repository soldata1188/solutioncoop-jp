import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { org } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata = pageMeta(
  "/contact",
  "お問い合わせ・資料請求",
  "外国人材の受入れや育成就労制度に関するご相談・資料請求は、こちらのフォームまたはお電話にて承ります。堺市の監理団体ソリューション協同組合。",
);

export default function Page() {
  return (
    <>
      <PageHeader
        title="お問い合わせ・資料請求"
        lead="外国人材の受入れや育成就労制度について、お気軽にご相談ください。内容を確認のうえ、担当者よりご連絡いたします。"
      />
      <Section width="narrow" tone="pale">
        <p className="mb-8 rounded-md border-l-4 border-navy-900 bg-white p-5 shadow-card">
          お電話でのお問い合わせ：<a href="tel:0722248067" className="font-bold text-navy-700 underline underline-offset-4">{org.tel}</a>
          <span className="block text-sm text-muted">FAX：{org.fax}　メール：{org.email}</span>
        </p>
        <div className="rounded-md bg-white p-5 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
