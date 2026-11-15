import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LineButton } from "@/components/LineButton";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { LinkButton } from "@/components/ui";
import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import { CONTACT_HREF, CONTACT_LABEL, breadcrumbJsonLd, licenses } from "@/lib/site";

export const metadata = pageMeta(
  "/support",
  "受入れ後の支援｜監査・訪問指導・生活支援",
  "外国人材の配属後も、当組合が定期的な監査・訪問指導、病院の受診や役所の手続きなど生活面のご相談への対応、ベトナム・インドネシア・フィリピンの送り出し機関との連携を通じて、受入れ企業様を支えます。",
);

type Item = { title: string; body: string };

/**
 * 母国語での相談対応（ベトナム語・インドネシア語・タガログ語）。
 * Boss確認後に true にすると、各国カードの言語名の一行を再表示します。
 */
const SHOW_NATIVE_LANGUAGE_CONSULTATION = false;

const audit: Item[] = [
  {
    title: "定期監査（3か月に1回以上）",
    body: "技能実習制度では、監理団体が3か月に1回以上、受入れ企業様の実習が計画どおり適正に行われているかを監査することが法令で定められています。育成就労制度でも、監理支援機関による3か月に1回以上の監査が求められます。",
  },
  {
    title: "訪問指導",
    body: "技能実習の1年目（第1号）の期間は、月に1回以上の訪問指導が定められています。現場を訪問し、受入れ企業様と人材の双方からお話を伺います。",
  },
  {
    title: "書類・記録の整備のご助言",
    body: "法令で求められる帳簿や記録の整備について、監査の際にご助言いたします。初めて受け入れる企業様も安心してご相談ください。",
  },
];

const life: Item[] = [
  {
    title: "上陸後講習（1か月）",
    body: "入国後の1か月間、日本語や生活ルール、安全に関することなどを学んでいただいたうえで、企業様へ配属いたします。",
  },
  {
    title: "通院・手続きのサポート",
    body: "病院の受診や役所での手続きなど、生活の中で困りごとがあったときのご相談に対応いたします。",
  },
  {
    title: "生活の相談への対応",
    body: "仕事や生活の悩みを早めに把握し、受入れ企業様と連携して解決を図ります。人材の定着につながる大切な支援です。",
  },
];

const countries = [
  { name: "ベトナム", lang: "ベトナム語" },
  { name: "インドネシア", lang: "インドネシア語" },
  { name: "フィリピン", lang: "タガログ語" },
];

const h1 = "受入れ後の支援";

function Art({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-pale shadow-card ring-1 ring-line">
      <Image src={src} alt={alt} width={640} height={400} unoptimized className="aspect-[16/10] h-auto w-full object-cover" />
      <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-white/95 px-2 py-0.5 text-xs font-bold text-ink ring-1 ring-line">イメージ</span>
    </div>
  );
}

export default function Page() {
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

      <section className="relative min-h-[32rem] overflow-hidden bg-primary-darker text-white md:min-h-[38rem]">
        <Image
          src={photos.fireDrill.src}
          alt={photos.fireDrill.alt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darker from-20% via-primary-darker/90 via-55% to-primary-dark/40" />
        <div className="relative z-10 mx-auto flex min-h-[32rem] max-w-[1040px] items-end px-4 py-14 md:min-h-[38rem] md:py-20">
          <div className="max-w-3xl motion-safe:animate-[support-rise_0.7s_ease_both]">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">{h1}</h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white md:text-lg">
              外国人材が配属された後も、当組合が受入れ企業様と人材の双方を支えます。監査・訪問指導から生活面のご相談まで、継続してご支援いたします。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LineButton onDark className="inline-flex min-h-14 gap-2 px-8 text-base" iconClassName="h-5 w-5" />
              <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14">{CONTACT_LABEL}</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section id="audit" aria-labelledby="audit-title" className="bg-white">
        <div className="mx-auto grid max-w-[1040px] items-start gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <h2 id="audit-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">監査・訪問指導</h2>
            <ol className="relative mt-8 space-y-4">
              {audit.map((item, index) => (
                <li
                  key={item.title}
                  className="relative flex gap-4 motion-safe:animate-[support-rise_0.7s_ease_both]"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  {index < audit.length - 1 ? <span aria-hidden="true" className="absolute bottom-[-1rem] left-5 top-10 w-px bg-pale-border" /> : null}
                  <span aria-hidden="true" className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-xl bg-white p-5 shadow-card ring-1 ring-line">
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid gap-4">
            <Art src="/art/support/audit.svg" alt="書類と確認の印を描いた、監査のイメージイラスト" />
            <Art src="/art/support/visit.svg" alt="建物と地点を描いた、訪問のイメージイラスト" />
          </div>
        </div>
      </section>

      <section id="life" aria-labelledby="life-title" className="bg-pale">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="life-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">生活面のご支援</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Photo photo={photos.fireDrill} sizes="(min-width: 640px) 500px, 100vw" imgClassName="aspect-[16/10] object-cover" caption="上陸後講習での消火訓練の様子" />
            </div>
            <div className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Photo photo={photos.practice} sizes="(min-width: 640px) 500px, 100vw" imgClassName="aspect-[16/10] object-cover" caption="講習での実技練習の様子" />
            </div>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {life.map((item, index) => (
              <li
                key={item.title}
                className="rounded-xl bg-white p-5 shadow-card ring-1 ring-line motion-safe:animate-[support-rise_0.7s_ease_both]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Art src="/art/support/life.svg" alt="書類と窓口を描いた、生活支援のイメージイラスト" />
          </div>
        </div>
      </section>

      <section id="countries" aria-labelledby="countries-title" className="bg-white">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <h2 id="countries-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">ベトナム・インドネシア・フィリピンの人材に対応</h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed">当組合は、ベトナム・インドネシア・フィリピンの送り出し機関と連携しております。</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {countries.map((c) => (
              <li key={c.name} className="rounded-xl border-t-4 border-primary bg-pale p-6 text-center shadow-card">
                <p className="text-lg font-bold text-ink">{c.name}</p>
                <p className="mt-1 text-sm">送り出し機関と連携</p>
                {SHOW_NATIVE_LANGUAGE_CONSULTATION ? <p className="mt-1 text-sm">{c.lang}での相談対応</p> : null}
              </li>
            ))}
          </ul>
          {SHOW_NATIVE_LANGUAGE_CONSULTATION ? (
            <p className="mt-4 text-sm text-muted">
              相談窓口の対応言語・受付時間につきましては、個別にお問い合わせください。
            </p>
          ) : null}
        </div>
      </section>

      <section id="tokutei" aria-labelledby="tokutei-title" className="bg-pale">
        <div className="mx-auto grid max-w-[1040px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
            <Photo photo={photos.trainingPlate} sizes="(min-width: 768px) 500px, 100vw" imgClassName="aspect-[16/10] object-cover" />
          </div>
          <div>
            <h2 id="tokutei-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">特定技能の方への支援</h2>
            <p className="mt-5 text-[15px] leading-relaxed">
              当組合は登録支援機関（登録番号：{licenses.toroku.number}）として、特定技能1号の外国人の方への法令に基づく支援（生活オリエンテーション、相談への対応、定期的な面談など）を、受入れ企業様から受託することができます。
            </p>
            <p className="mt-4 text-[15px] leading-relaxed">当組合の研修センターです。講習などに使用しております。</p>
            <div className="mt-8">
              <LinkButton href="/faq" variant="outlineCta" className="min-h-14 sm:min-w-64">よくある質問を見る</LinkButton>
            </div>
          </div>
        </div>
      </section>

      <CtaSection title="受入れ後のご支援について、お気軽にご相談ください。" />
      <JsonLd data={breadcrumbJsonLd([{ name: h1, path: "/support" }])} />
    </>
  );
}
