import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { org, TEL_HREF } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";
import { LineButton } from "@/components/LineButton";
import { ContactForm } from "./ContactForm";

export const metadata = pageMeta(
  "/contact",
  "お問い合わせ・資料請求",
  "外国人材の受入れや育成就労制度に関するご相談・資料請求は、こちらのフォームまたはお電話（072-224-8067）にて承ります。堺市の監理団体ソリューション協同組合が、受入れのご検討段階からご相談に応じます。",
);

export default function Page() {
  return (
    <>
      <PageHeader
        title="お問い合わせ・資料請求"
        path="/contact"
        lead="外国人材の受入れや育成就労制度について、お気軽にご相談ください。内容を確認のうえ、担当者よりご連絡いたします。"
      />
      <Section width="narrow" tone="pale">
        <div className="mb-8 border-l-4 border-primary bg-white p-5 shadow-card">
          <p className="font-bold text-ink">お電話でもご相談いただけます</p>
          <a href={TEL_HREF} className="mt-2 inline-flex min-h-12 items-center gap-2 rounded bg-primary-dark px-5 text-lg font-bold text-white no-underline hover:bg-primary-darker">
            <PhoneIcon className="h-5 w-5" />
            {org.tel}
          </a>
          <p className="mt-2 text-sm text-muted">FAX：{org.fax}　メール：{org.email}</p>
        </div>
        <div className="mb-8 border-l-4 border-linegreen bg-white p-5 shadow-card">
          <p className="font-bold text-ink">LINEでもご相談いただけます</p>
          <p className="mt-1 text-sm text-body">当組合のLINE公式アカウントから、トークでご相談をお送りいただけます。</p>
          <LineButton className="mt-3 inline-flex min-h-12 gap-2 px-5 text-lg" iconClassName="h-5 w-5" />
          <p className="mt-2 text-sm text-muted">LINEでのご相談は、お返事までお時間をいただく場合がございます。あらかじめご了承ください。</p>
        </div>
        <div className="rounded bg-white p-5 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
