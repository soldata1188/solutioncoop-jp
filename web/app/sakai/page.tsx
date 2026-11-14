import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Section } from "@/components/ui";
import { faqs, type Faq } from "@/lib/faq";
import { pageMeta } from "@/lib/meta";
import { CONTACT_HREF, fullAddress, licenses, org, repoFacts } from "@/lib/site";

const title = "堺市の外国人雇用・技能実習・育成就労｜ソリューション協同組合";
const description =
  "堺市堺区に事務所を置く監理団体、ソリューション協同組合です。技能実習の監理、特定技能の登録支援、育成就労制度に向けた準備を、建設・機械・金属・食品製造を中心に、堺市と大阪府内の中小企業様へご支援します。";

export const metadata = {
  ...pageMeta("/sakai", title, description),
  title: { absolute: title },
};

const sakaiFaqQuestions = [
  "どのような業種の企業で受入れが可能ですか。",
  "どの国の人材を受け入れられますか。",
  "お問い合わせからご契約まで、どのくらいの期間がかかりますか。",
  "受入れ後はどのような支援を受けられますか。",
  "初めて外国人材を受け入れるのですが、相談できますか。",
  "育成就労制度はいつから始まりますか。",
] as const;

const sakaiFaqs: Faq[] = sakaiFaqQuestions.map((q) => {
  const item = faqs.find((faq) => faq.q === q);
  if (!item) throw new Error(q);
  return item;
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sakaiFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Page() {
  return (
    <>
      <PageHeader
        path="/sakai"
        title="堺市の外国人雇用を、地元の監理団体がご支援します"
        lead="ソリューション協同組合は、堺市堺区に事務所を置く監理団体です。技能実習、育成就労、特定技能について、堺市と大阪府内の企業様からご相談をいただいております。"
      />

      <Section id="local" title="堺市の企業様へ" width="narrow">
        <p>
          当組合は、堺市堺区に事務所を構え、職員{org.staff}の体制で、大阪府内の中小企業様の外国人材受入れをご支援しております。堺市に事業所がある企業様には、同じ市内の監理団体として、訪問を含めたご支援をご相談いただけます。
        </p>
        <p className="mt-4">
          受付時間は{repoFacts.hours}です。訪問の時期やご連絡の目安は、企業様ごとの状況により異なりますので、お問い合わせのうえご案内いたします。
        </p>
      </Section>

      <Section id="systems" title="対応できる制度" tone="pale" width="narrow">
        <p>当組合の事業は、技能実習制度に基づく監理事業（{licenses.kanri.kind}）と、特定技能外国人の支援業務（登録支援機関）です。育成就労制度は2027年4月1日施行で、当組合は同制度に向けて準備中です。</p>
        <div className="mt-6 grid gap-4">
          <article className="rounded bg-white p-5 shadow-card">
            <h3 className="text-lg font-bold text-ink">技能実習</h3>
            <p className="mt-2 text-[15px]">
              技能実習法に基づく監理団体（{licenses.kanri.kind}）として、許可番号 {licenses.kanri.number} の許可を受けております。
            </p>
          </article>
          <article className="rounded bg-white p-5 shadow-card">
            <h3 className="text-lg font-bold text-ink">育成就労</h3>
            <p className="mt-2 text-[15px]">
              育成就労制度は2027年4月1日施行です。現行の技能実習制度に代わる制度として位置付けられており、当組合は移行に向けた準備をご説明しています。
            </p>
          </article>
          <article className="rounded bg-white p-5 shadow-card">
            <h3 className="text-lg font-bold text-ink">特定技能</h3>
            <p className="mt-2 text-[15px]">
              特定技能の登録支援機関として登録しています。登録番号は {licenses.toroku.number} です。
            </p>
          </article>
        </div>
        <p className="mt-4 text-sm">
          <Link href="/roadmap" className="font-bold text-primary-dark underline underline-offset-4">2027年4月に向けた準備</Link>
          <span aria-hidden="true"> ／ </span>
          <Link href="/faq" className="font-bold text-primary-dark underline underline-offset-4">よくある質問</Link>
        </p>
      </Section>

      <Section id="fields" title="対応分野" width="narrow">
        <p>
          当組合では、建設、機械・金属、食品製造の分野を中心に、大阪府内の中小企業様をご支援しております。受入れ可能な分野・業務は制度上定められておりますので、貴社の業務内容が対象となるかは個別に確認いたします。
        </p>
        <p className="mt-4 text-sm text-muted">
          監理団体許可の条件には、「{licenses.kanri.conditions[0]}」が含まれます。取扱職種は、技能実習計画作成指導者が在籍する範囲です。
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {["建設", "機械・金属", "食品製造"].map((name) => (
            <li key={name} className="rounded bg-pale px-4 py-5 text-center text-lg font-bold text-primary-dark">{name}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/#cases" className="font-bold text-primary-dark underline underline-offset-4">受入れ事例を見る</Link>
        </p>
      </Section>

      <Section id="flow" title="受入れまでの目安" tone="pale" width="narrow">
        <p>期間は、国や時期、手続きの状況により異なります。次の目安は、当組合のよくある質問に掲載している内容です。</p>
        <ol className="mt-6 grid gap-4">
          <li className="rounded bg-white p-5 shadow-card">
            <h3 className="text-lg font-bold text-ink">お問い合わせからご契約まで</h3>
            <p className="mt-2 text-[15px]">最初のお問い合わせからご契約までは、おおむね1〜2週間が目安です。</p>
          </li>
          <li className="rounded bg-white p-5 shadow-card">
            <h3 className="text-lg font-bold text-ink">面接から配属まで（インドネシア）</h3>
            <p className="mt-2 text-[15px]">インドネシアからの受入れの場合、面接から配属までは約5〜6か月が目安です。</p>
          </li>
          <li className="rounded bg-white p-5 shadow-card">
            <h3 className="text-lg font-bold text-ink">受入れ後</h3>
            <p className="mt-2 text-[15px]">配属後は、定期的な訪問・監査、受入れ企業様へのご助言、生活面のご相談への対応を行っております。</p>
          </li>
        </ol>
        <p className="mt-4 text-sm">
          <Link href="/support" className="font-bold text-primary-dark underline underline-offset-4">受入れ後の支援</Link>
          <span aria-hidden="true"> ／ </span>
          <Link href={CONTACT_HREF} className="font-bold text-primary-dark underline underline-offset-4">メールでのお問い合わせ</Link>
        </p>
      </Section>

      <Section id="about" title="組合概要" width="narrow">
        <p>所在地は{fullAddress}です。電話番号は{org.tel}、受付時間は{repoFacts.hours}です。</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded bg-pale p-5">
            <dt className="text-sm font-bold text-ink">{licenses.kanri.label}</dt>
            <dd className="mt-2 text-[15px]">許可番号 {licenses.kanri.number}（{licenses.kanri.kind}）</dd>
          </div>
          <div className="rounded bg-pale p-5">
            <dt className="text-sm font-bold text-ink">{licenses.toroku.label}</dt>
            <dd className="mt-2 text-[15px]">登録番号 {licenses.toroku.number}</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm">
          <Link href="/about" className="font-bold text-primary-dark underline underline-offset-4">組合概要を見る</Link>
        </p>
      </Section>

      <Section id="faq" title="よくある質問" tone="pale" width="narrow">
        <FaqList items={sakaiFaqs} />
      </Section>

      <CtaSection title="堺市の外国人雇用について、ご相談ください。" />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
