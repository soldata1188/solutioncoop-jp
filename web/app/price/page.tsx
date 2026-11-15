import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LineButton } from "@/components/LineButton";
import { PhoneIcon } from "@/components/Header";
import { pageMeta } from "@/lib/meta";
import { priceFaqs, priceItems, priceNotes, priceStages, type PriceItem } from "@/lib/price";
import { CONTACT_HREF, TEL_HREF, breadcrumbJsonLd, org, repoFacts } from "@/lib/site";

const title = "料金・費用の目安｜技能実習・育成就労｜ソリューション協同組合";
const description =
  "技能実習と育成就労の費用の目安です。年会費と人材紹介手数料、計画認定の公的手数料、航空券などの実費をご案内します。金額は概算・税別で、送出国や職種、人数により異なり、詳細はお見積りいたします。";

export const metadata = {
  ...pageMeta("/price", title, description),
  title: { absolute: title },
};

const h1 = "料金・費用の目安";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: priceFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const points = [
  { n: "01", title: "年会費と紹介手数料", body: "当組合の年会費と人材紹介手数料は、どちらも0円です。" },
  { n: "02", title: "計画の認定手数料", body: "技能実習と育成就労で、公的手数料の金額が異なります。1件ごとの金額です。" },
  { n: "03", title: "渡航と帰国は実費", body: "航空券と在留手続手数料、帰国費は実費です。帰国費は受入企業さまのご負担です。" },
  { n: "04", title: "ほかはお見積り", body: "監理費や講習費など、金額を載せていない項目はお見積りでご案内します。" },
];

function Amount({ item, large = false }: { item: PriceItem; large?: boolean }) {
  const confirmed = item.status === "confirmed" || item.status === "actual-cost";
  return (
    <p className={confirmed ? (large ? "text-4xl font-bold leading-none text-primary-dark md:text-5xl" : "text-2xl font-bold leading-none text-primary-dark") : "text-xl font-bold text-primary"}>
      {item.display}
    </p>
  );
}

function ExampleCard({ heading, feeId }: { heading: string; feeId: string }) {
  const fee = priceItems.find((item) => item.id === feeId);
  const rows: { label: string; value: string; note?: string }[] = [
    { label: "年会費", value: "0円" },
    { label: "人材紹介手数料（当組合）", value: "0円" },
    { label: "出資金", value: "10,000円（1口）", note: "脱退時の取扱いは定款に基づきます" },
    { label: fee?.label ?? "", value: fee?.display ?? "", note: fee?.tag },
    { label: "入国前・入国後講習・実習中", value: "お見積り" },
    { label: "航空券・在留手続手数料", value: "実費" },
    { label: "帰国費", value: "実費", note: "受入企業さまのご負担です。" },
  ];
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-line">
      <h3 className="bg-primary px-5 py-4 text-center text-lg font-bold text-white">{heading}</h3>
      <dl>
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:items-baseline sm:gap-4">
            <dt className="text-sm font-bold text-primary">{row.label}</dt>
            <dd>
              <span className="text-2xl font-bold text-primary-dark">{row.value}</span>
              {row.note ? <span className="mt-1 block text-sm text-body sm:ml-3 sm:mt-0 sm:inline">{row.note}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default function Page() {
  return (
    <>
      <div className="bg-pale">
        <nav aria-label="パンくずリスト" className="mx-auto max-w-[1040px] px-4">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">ホーム</Link>
            </li>
            <li className="inline-flex min-h-11 items-center gap-x-2">
              <span aria-hidden="true" className="text-muted">›</span>
              <span aria-current="page">{h1}</span>
            </li>
          </ol>
        </nav>
        <div className="mx-auto max-w-[1040px] px-4 pb-10 pt-4 md:pb-16">
          <h1 className="text-4xl font-bold leading-tight text-ink md:text-6xl">{h1}</h1>
          <p className="mt-3 text-sm font-bold text-primary">概算</p>
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto max-w-[860px] px-4 py-16 text-center md:py-24">
          <p className="text-2xl font-bold leading-snug text-ink md:text-4xl">
            技能実習は<span className="bg-cta px-1">人材育成と技能移転</span>として、育成就労は<span className="bg-cta px-1">2027年4月1日施行</span>に向けて、費用の目安をご案内します。
          </p>
          <ul className="mx-auto mt-8 max-w-xl space-y-2 text-left text-[15px]">
            {priceNotes.map((note) => (
              <li key={note} className="text-center">{note}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#ginou" className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-bold text-white no-underline hover:bg-primary-dark">技能実習</a>
            <a href="#ikusei" className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-bold text-white no-underline hover:bg-primary-dark">育成就労（インドネシアの例）</a>
          </div>
        </div>
      </section>

      <section aria-labelledby="zero-title" className="bg-white">
        <div className="mx-auto max-w-[1040px] px-4 pb-16 text-center md:pb-24">
          <h2 id="zero-title" className="text-2xl font-bold text-ink md:text-3xl">
            <span className="bg-cta px-1">年会費 0円、人材紹介手数料 0円</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {priceItems.filter((item) => item.id === "annual-fee" || item.id === "referral-fee").map((item) => (
              <div key={item.id} className="rounded-2xl bg-pale px-6 py-10">
                <p className="text-sm font-bold text-body">{item.label}</p>
                <p className="mt-3 text-5xl font-bold text-primary-dark md:text-6xl">{item.display}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="items" aria-labelledby="items-title" className="bg-pale">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="items-title" className="text-center text-2xl font-bold text-ink md:text-3xl">
            <span className="bg-cta px-1">段階ごとの費用</span>
          </h2>
          <div className="mt-12 space-y-10">
            {priceStages.map((stage) => {
              const items = priceItems.filter((item) => item.stage === stage.id);
              if (items.length === 0) return null;
              return (
                <div key={stage.id}>
                  <h3 className="text-center text-lg font-bold text-primary-dark">{stage.label}</h3>
                  <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-cta-tint px-3 py-5 text-center">
                        <p className="text-sm font-bold leading-snug text-ink">{item.label}</p>
                        {item.tag ? <p className="mt-1 text-xs font-bold text-primary-dark">{item.tag}</p> : null}
                        <div className="mt-3"><Amount item={item} /></div>
                        {item.note ? <p className="mt-2 text-xs leading-relaxed text-body">{item.note}</p> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <div>
              <h3 className="text-center text-lg font-bold text-primary-dark">支払時期はお見積りでご案内</h3>
              <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {priceItems.filter((item) => item.stage === "other").map((item) => (
                  <li key={item.id} className="flex min-h-28 flex-col items-center justify-center rounded-2xl bg-cta-tint px-3 py-5 text-center">
                    <p className="text-sm font-bold text-ink">{item.label}</p>
                    <div className="mt-3"><Amount item={item} /></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="points-title" className="bg-white">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="points-title" className="text-center text-2xl font-bold text-ink md:text-3xl">
            <span className="bg-cta px-1">費用を見るときの4つの点</span>
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-2">
            {points.map((point) => (
              <li key={point.n} className="text-center">
                <p className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">{point.n}</p>
                <div className="mt-4 rounded-2xl bg-cta-tint px-5 py-6">
                  <h3 className="text-xl font-bold text-ink">{point.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{point.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px]">
            受入れ後の監査・訪問指導・生活面のご相談は、<Link href="/support" className="font-bold text-primary-dark underline underline-offset-4">受入れ後の支援</Link>に記載しています。特定技能の支援費用は、このページには載せていません。
          </p>
        </div>
      </section>

      <section id="examples" aria-labelledby="examples-title" className="bg-pale">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="examples-title" className="text-center text-2xl font-bold text-ink md:text-3xl">
            <span className="bg-cta px-1">費用の並び</span>
          </h2>
          <p className="mt-4 text-center text-sm text-body">金額は概算です。特記のない限り税別です。送出国・職種・人数により異なります。</p>
          <div className="mt-10 grid gap-8">
            <div id="ginou" className="scroll-mt-24">
              <ExampleCard heading="技能実習" feeId="ginou-cert" />
            </div>
            <div id="ikusei" className="scroll-mt-24">
              <ExampleCard heading="育成就労（インドネシアから受け入れる場合の例）" feeId="ikusei-cert" />
              <p className="mt-3 text-sm text-body">インドネシアは、当組合が連携する送り出し国のひとつです。他の送出国でも、掲載している金額の置き方は同じです。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="bg-white">
        <div className="mx-auto max-w-[760px] px-4 py-16 md:py-24">
          <h2 id="faq-title" className="text-center text-2xl font-bold text-ink md:text-3xl">よくある質問</h2>
          <div className="mt-10 grid gap-3">
            {priceFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-pale">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-bold leading-relaxed md:text-base">{faq.q}</h3>
                  <span aria-hidden="true" className="text-primary group-open:hidden">＋</span>
                  <span aria-hidden="true" className="hidden text-primary group-open:inline">－</span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-body">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="bg-pale">
        <div className="mx-auto max-w-[720px] px-4 py-16 text-center md:py-24">
          <h2 id="cta-title" className="text-2xl font-bold text-ink md:text-3xl">詳細はお見積りいたします。</h2>
          <p className="mt-4 text-[15px]">金額は概算です。特記のない限り税別です。</p>
          <a href={TEL_HREF} className="mx-auto mt-8 flex min-h-14 w-fit items-center gap-2 text-3xl font-bold text-primary-dark no-underline">
            <PhoneIcon className="h-7 w-7" />
            {org.tel}
          </a>
          <p className="mt-2 text-sm text-body">受付時間：{repoFacts.hours}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LineButton className="inline-flex min-h-14 gap-2 px-8 text-base" iconClassName="h-5 w-5" />
            <Link href={CONTACT_HREF} className="inline-flex min-h-14 items-center justify-center rounded-full bg-primary px-8 font-bold text-white no-underline hover:bg-primary-dark">お見積りを依頼する</Link>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: h1, path: "/price" }])} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
