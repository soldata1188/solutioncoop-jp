import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { JsonLd } from "@/components/JsonLd";
import { LineButton } from "@/components/LineButton";
import { Photo } from "@/components/Photo";
import { LinkButton } from "@/components/ui";
import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import {
  itemsFor,
  priceFaqs,
  priceItems,
  priceNotes,
  priceStages,
  type PriceItem,
  type PriceStage,
} from "@/lib/price";
import { CONTACT_HREF, breadcrumbJsonLd } from "@/lib/site";

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

function Amount({ item }: { item: PriceItem }) {
  return (
    <p className="mt-2 text-lg font-bold text-primary-dark">
      {item.display}
    </p>
  );
}

function StageList({ system, stage }: { system: "ginou" | "ikusei"; stage: PriceStage }) {
  const items = itemsFor(system, stage);
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="rounded-xl bg-white p-4 shadow-card ring-1 ring-line">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-ink">{item.label}</h4>
            {item.tag ? <span className="rounded bg-pale px-2 py-0.5 text-xs font-bold text-primary-dark">{item.tag}</span> : null}
          </div>
          <Amount item={item} />
          {item.note ? <p className="mt-2 text-sm text-body">{item.note}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function SystemBlock({
  id,
  heading,
  lead,
  system,
}: {
  id: string;
  heading: string;
  lead: string;
  system: "ginou" | "ikusei";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">{heading}</h2>
      <p className="mt-4 max-w-3xl text-[15px] leading-relaxed">{lead}</p>
      <div className="mt-8 space-y-8">
        {priceStages.map((stage, index) => (
          <div key={stage.id} className="motion-safe:animate-[support-rise_0.7s_ease_both]" style={{ animationDelay: `${index * 60}ms` }}>
            <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
              <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-dark text-sm text-white">{index + 1}</span>
              {stage.label}
            </h3>
            <div className="mt-3">
              <StageList system={system} stage={stage.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const coop = priceItems.filter((item) => item.stage === "coop");
  const other = priceItems.filter((item) => item.stage === "other");
  return (
    <>
      <nav aria-label="パンくずリスト" className="border-b border-line bg-pale">
        <ol className="mx-auto flex max-w-[1040px] flex-wrap items-center gap-x-2 px-4 text-sm">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center text-primary-dark underline underline-offset-4">ホーム</Link>
          </li>
          <li className="inline-flex min-h-11 items-center gap-x-2">
            <span aria-hidden="true" className="text-muted">›</span>
            <span aria-current="page" className="text-ink">{h1}</span>
          </li>
        </ol>
      </nav>

      <section className="relative min-h-[30rem] overflow-hidden bg-primary-darker text-white md:min-h-[36rem]">
        <Image
          src={photos.office.src}
          alt={photos.office.alt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darker from-25% via-primary-darker/92 via-55% to-primary-dark/45" />
        <div className="relative z-10 mx-auto flex min-h-[30rem] max-w-[1040px] items-end px-4 py-14 md:min-h-[36rem] md:py-20">
          <div className="max-w-3xl motion-safe:animate-[support-rise_0.7s_ease_both]">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">{h1}</h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed md:text-lg">
              技能実習は、人材育成と技能移転による国際貢献としてご支援します。育成就労は2027年4月1日施行で、当組合は準備中です。費用は段階ごとに整理し、決まっている金額と、これからお見積りする金額を分けて記載しています。
            </p>
            <ul className="mt-5 space-y-1 text-sm font-bold">
              {priceNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LineButton onDark className="inline-flex min-h-14 gap-2 px-8 text-base" iconClassName="h-5 w-5" />
              <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14">お見積りを依頼する</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section id="coop" aria-labelledby="coop-title" className="bg-white">
        <div className="mx-auto grid max-w-[1040px] items-start gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <h2 id="coop-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">組合に関する費用</h2>
            <ul className="mt-6 grid gap-3">
              {coop.map((item) => (
                <li key={item.id} className="rounded-xl bg-pale p-5 shadow-card ring-1 ring-line">
                  <h3 className="font-bold text-ink">{item.label}</h3>
                  <Amount item={item} />
                  {item.note ? <p className="mt-2 text-sm text-body">{item.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            <div className="relative overflow-hidden rounded-xl bg-pale shadow-card ring-1 ring-line">
              <Image src="/art/price/estimate.svg" alt="書類と丸い印を描いた、お見積りのイメージイラスト" width={640} height={400} unoptimized className="aspect-[16/10] h-auto w-full object-cover" />
              <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-white/95 px-2 py-0.5 text-xs font-bold text-ink ring-1 ring-line">イメージ</span>
            </div>
            <div className="overflow-hidden rounded-xl shadow-card ring-1 ring-line">
              <Photo photo={photos.trainingPlate} sizes="(min-width: 768px) 480px, 100vw" imgClassName="aspect-[16/10] object-cover" caption="当組合の研修センターの表札" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-pale">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-3 px-4 py-6 sm:flex-row">
          <a href="#ginou" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 font-bold text-primary-dark shadow-card ring-1 ring-line">技能実習</a>
          <a href="#ikusei" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 font-bold text-primary-dark shadow-card ring-1 ring-line">育成就労（インドネシアの例）</a>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-[1040px] space-y-16 px-4 py-16 md:py-24">
          <SystemBlock
            id="ginou"
            system="ginou"
            heading="技能実習"
            lead="技能実習の費用は、入国前から帰国までを段階に分けて記載しています。技能の移転と人材育成のための受入れであり、労働力の需給を調整するためのものではありません。"
          />
          <SystemBlock
            id="ikusei"
            system="ikusei"
            heading="育成就労（インドネシアから受け入れる場合の例）"
            lead="育成就労は2027年4月1日施行です。ここでは、当組合が連携するインドネシアから受け入れる場合の並びを例にしています。金額の置き方は他の送出国でも同じで、送出国・職種・人数により異なります。"
          />
        </div>
      </div>

      <section id="other" aria-labelledby="other-title" className="bg-pale">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="other-title" className="text-2xl font-bold text-primary-dark md:text-3xl">支払時期を定めていない項目</h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed">次の項目は、お見積りでご案内します。</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {other.map((item) => (
              <li key={item.id} className="rounded-xl bg-white p-4 shadow-card ring-1 ring-line">
                <h3 className="font-bold text-ink">{item.label}</h3>
                <Amount item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="included" aria-labelledby="included-title" className="bg-white">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="included-title" className="text-2xl font-bold text-primary-dark md:text-3xl">このページで分かること</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            <li className="rounded-xl bg-pale p-5">年会費と、当組合の人材紹介手数料は、記載の金額です。</li>
            <li className="rounded-xl bg-pale p-5">計画認定の公的手数料は、1件ごとの金額です。</li>
            <li className="rounded-xl bg-pale p-5">航空券、在留手続手数料、帰国費は実費です。帰国費は受入企業さまのご負担です。</li>
            <li className="rounded-xl bg-pale p-5">金額を「お見積り」とした項目は、お見積りでご案内します。受入れ後の監査・訪問指導・生活面のご相談は、<Link href="/support" className="font-bold text-primary-dark underline underline-offset-4">受入れ後の支援</Link>に記載しています。</li>
          </ul>
          <p className="mt-4 text-sm text-muted">特定技能の支援費用は、このページには載せていません。お見積りでご案内します。</p>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="bg-pale">
        <div className="mx-auto max-w-[760px] px-4 py-16 md:py-24">
          <h2 id="faq-title" className="text-2xl font-bold text-primary-dark md:text-3xl">よくある質問</h2>
          <div className="mt-8 grid gap-3">
            {priceFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-white shadow-card ring-1 ring-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-bold leading-relaxed md:text-base">{faq.q}</h3>
                  <span aria-hidden="true" className="text-primary-dark group-open:hidden">＋</span>
                  <span aria-hidden="true" className="hidden text-primary-dark group-open:inline">－</span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-body">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title="費用の詳細は、お見積りでご案内します。" />
      <JsonLd data={breadcrumbJsonLd([{ name: h1, path: "/price" }])} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
