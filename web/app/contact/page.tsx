import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { org, TEL_HREF } from "@/lib/site";
import { PhoneIcon } from "@/components/Header";
import { LineButton } from "@/components/LineButton";
import { ContactForm } from "./ContactForm";
import { Phrases } from "@/components/KeepWords";

export const metadata = pageMeta(
  "/contact",
  "メールでのお問い合わせ",
  "外国人材の受入れや育成就労制度に関するご相談は、こちらのフォームまたはお電話（072-224-8067）にて承ります。堺市の監理団体ソリューション協同組合が、受入れのご検討段階からご相談に応じます。",
);

export default function Page() {
  return (
    <>
      <PageHeader
        title="メールでのお問い合わせ"
        path="/contact"
        lead="外国人材の受入れや育成就労制度について、お気軽にご相談ください。内容を確認のうえ、担当者よりご連絡いたします。"
        leadAfter={
          <a href="#form-title" className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-primary-dark [&_span]:underline [&_span]:underline-offset-4 hover:text-primary-darker">
            <Phrases text="フォームへ進む" />
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v10M4 9l4 4 4-4" /></svg>
          </a>
        }
      />
      <Section width="narrow" tone="pale">
        {/* LINE（主）と電話を小さめのカードで横並び（スマートフォンは縦に2枚）。文言は従来のまま */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="border-l-4 border-linegreen bg-white p-4 shadow-card">
            <p className="font-bold text-ink">LINEでもご相談いただけます</p>
            <p className="mt-1 text-sm text-body">当組合のLINE公式アカウントから、トークでご相談をお送りいただけます。</p>
            <LineButton className="mt-3 flex min-h-12 w-full gap-2 px-4 text-base" iconClassName="h-5 w-5" />
            <p className="mt-2 text-[13px] text-muted">LINEでのご相談は、お返事までお時間をいただく場合がございます。あらかじめご了承ください。</p>
          </div>
          <div className="border-l-4 border-primary bg-white p-4 shadow-card">
            <p className="font-bold text-ink">お電話でもご相談いただけます</p>
            <a href={TEL_HREF} className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded bg-primary-dark px-4 text-lg font-bold text-white no-underline hover:bg-primary-darker">
              <PhoneIcon className="h-5 w-5" />
              {org.tel}
            </a>
            <p className="mt-2 text-[13px] text-muted">FAX：{org.fax}<br />メール：{org.email}</p>
          </div>
        </div>
        <div className="rounded bg-white p-5 shadow-card sm:p-8">
          <h2 id="form-title" tabIndex={-1} className="scroll-mt-24 text-xl font-bold text-ink focus:outline-none">お問い合わせフォーム</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
