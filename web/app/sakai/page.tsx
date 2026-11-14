import Image from "next/image";
import Link from "next/link";
import { PhoneIcon } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { KeepWords } from "@/components/KeepWords";
import { LineButton } from "@/components/LineButton";
import { Photo } from "@/components/Photo";
import { LinkButton, SquaresPattern } from "@/components/ui";
import { faqs, type Faq } from "@/lib/faq";
import { photos } from "@/lib/images";
import { pageMeta } from "@/lib/meta";
import {
  CONTACT_HREF,
  CONTACT_LABEL,
  TEL_HREF,
  breadcrumbJsonLd,
  fullAddress,
  licenses,
  org,
  repoFacts,
} from "@/lib/site";
import caseKensetsu from "@/public/images/cases/case-kensetsu.webp";
import caseKikai from "@/public/images/cases/case-kikai-kinzoku.webp";

const title = "堺市の外国人雇用・技能実習・育成就労｜ソリューション協同組合";
const description =
  "堺市堺区に事務所を置く監理団体、ソリューション協同組合です。技能実習の監理、特定技能の登録支援、育成就労制度に向けた準備を、建設・機械・金属・食品製造を中心に、堺市と大阪府内の中小企業様へご支援します。";
const h1 = "堺市の外国人雇用を、地元の監理団体がご支援します";

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

const kensetsu = { src: caseKensetsu, alt: "建設業のイメージ画像" };
const kikai = { src: caseKikai, alt: "機械・金属業のイメージ画像" };

function ImageNote() {
  return (
    <span className="pointer-events-none absolute bottom-3 left-3 rounded bg-white/95 px-2 py-0.5 text-xs font-bold text-ink ring-1 ring-line">
      イメージ
    </span>
  );
}

function Shot({
  photo,
  sizes,
  priority = false,
  note = false,
  flush = false,
}: {
  photo: { src: typeof photos.sakai.src; alt: string };
  sizes: string;
  priority?: boolean;
  note?: boolean;
  flush?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${flush ? "" : "rounded-xl shadow-card ring-1 ring-line"}`}>
      <Photo photo={photo} sizes={sizes} priority={priority} imgClassName="aspect-[16/10] object-cover" />
      {note ? <ImageNote /> : null}
    </div>
  );
}

function Art({ src, alt, flush = false }: { src: string; alt: string; flush?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-pale ${flush ? "" : "rounded-xl shadow-card ring-1 ring-line"}`}>
      <Image src={src} alt={alt} width={640} height={400} unoptimized className="aspect-[16/10] h-auto w-full object-cover" />
      <ImageNote />
    </div>
  );
}

function BadgeIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-pale text-primary-dark ring-1 ring-pale-border">
      {children}
    </span>
  );
}

export default function Page() {
  const crumb = [{ name: h1, path: "/sakai" }];
  return (
    <>
      <nav aria-label="パンくずリスト" className="border-b border-line bg-pale">
        <ol className="mx-auto flex max-w-[1040px] flex-wrap items-center gap-x-2 px-4 text-sm">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center text-primary-dark underline underline-offset-4">
              ホーム
            </Link>
          </li>
          <li className="inline-flex min-h-11 items-center gap-x-2">
            <span aria-hidden="true" className="text-muted">›</span>
            <span aria-current="page" className="text-ink">{h1}</span>
          </li>
        </ol>
      </nav>

      <section className="relative min-h-[34rem] overflow-hidden bg-primary-darker text-white md:min-h-[40rem]">
        <Image
          src={photos.sakai.src}
          alt={photos.sakai.alt}
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        {/* 下側をほぼ不透明な #0A3720 にし、白文字が写真の明部に乗らないようにする */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-darker from-25% via-primary-darker/92 via-55% to-primary-dark/45" />
        <div className="relative z-10 mx-auto flex min-h-[34rem] max-w-[1040px] items-end px-4 py-14 md:min-h-[40rem] md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">{h1}</h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white md:text-lg">
              ソリューション協同組合は、堺市堺区に事務所を置く監理団体です。技能実習、育成就労、特定技能について、堺市と大阪府内の企業様からご相談をいただいております。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LineButton onDark className="inline-flex min-h-14 gap-2 px-8 text-base" iconClassName="h-5 w-5" />
              <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14">
                {CONTACT_LABEL}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <section id="local" aria-labelledby="local-title" className="bg-white">
        <div className="mx-auto grid max-w-[1040px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <Shot photo={photos.office} sizes="(min-width: 768px) 480px, 100vw" />
          <div>
            <BadgeIcon>
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 20V9l8-5 8 5v11" strokeLinejoin="round" />
                <path d="M10 20v-6h4v6" />
              </svg>
            </BadgeIcon>
            <h2 id="local-title" className="mt-4 text-2xl font-bold leading-snug text-primary-dark md:text-3xl">
              堺市の企業様へ
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed">
              当組合は、堺市堺区に事務所を構え、職員{org.staff}の体制で、大阪府内の中小企業様の外国人材受入れをご支援しております。堺市に事業所がある企業様には、同じ市内の監理団体として、訪問を含めたご支援をご相談いただけます。
            </p>
            <p className="mt-4 text-[15px] leading-relaxed">
              受付時間は{repoFacts.hours}です。訪問の時期やご連絡の目安は、企業様ごとの状況により異なりますので、お問い合わせのうえご案内いたします。
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-[1040px] px-4 pb-16 md:pb-24">
          <Shot photo={photos.siteExcavation} sizes="(min-width: 1040px) 1008px, 100vw" />
        </div>
      </section>

      <section id="systems" aria-labelledby="systems-title" className="bg-pale">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <h2 id="systems-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">
              対応できる制度
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed">
              当組合の事業は、技能実習制度に基づく監理事業（{licenses.kanri.kind}）と、特定技能外国人の支援業務（登録支援機関）です。育成就労制度は2027年4月1日施行で、当組合は同制度に向けて準備中です。
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Art flush src="/art/sakai/clipboard.svg" alt="書類とチェックを描いた、緑のイメージイラスト" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-ink">技能実習</h3>
                <p className="mt-2 text-[15px] leading-relaxed">
                  技能実習法に基づく監理団体（{licenses.kanri.kind}）として、許可番号 {licenses.kanri.number} の許可を受けております。
                </p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Art flush src="/art/sakai/path.svg" alt="三つの地点をつなぐ道を描いた、緑のイメージイラスト" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-ink">育成就労</h3>
                <p className="mt-2 text-[15px] leading-relaxed">
                  育成就労制度は2027年4月1日施行です。現行の技能実習制度に代わる制度として位置付けられており、当組合は移行に向けた準備をご説明しています。
                </p>
              </div>
            </article>
            <article className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Art flush src="/art/sakai/support.svg" alt="書類と丸い確認印を描いた、緑のイメージイラスト" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-ink">特定技能</h3>
                <p className="mt-2 text-[15px] leading-relaxed">
                  特定技能の登録支援機関として登録しています。登録番号は {licenses.toroku.number} です。
                </p>
              </div>
            </article>
          </div>
          <p className="mt-8 text-sm">
            <Link href="/roadmap" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
              2027年4月に向けた準備
            </Link>
            <span aria-hidden="true"> ／ </span>
            <Link href="/faq" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
              よくある質問
            </Link>
          </p>
        </div>
      </section>

      <section id="fields" aria-labelledby="fields-title" className="bg-white">
        <div className="mx-auto max-w-[1040px] px-4 py-16 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="md:order-2">
              <Shot photo={photos.siteSteel} sizes="(min-width: 768px) 480px, 100vw" />
            </div>
            <div className="md:order-1">
              <h2 id="fields-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">
                対応分野
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed">
                当組合では、建設、機械・金属、食品製造の分野を中心に、大阪府内の中小企業様をご支援しております。受入れ可能な分野・業務は制度上定められておりますので、貴社の業務内容が対象となるかは個別に確認いたします。
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                監理団体許可の条件には、「{licenses.kanri.conditions[0]}」が含まれます。取扱職種は、技能実習計画作成指導者が在籍する範囲です。
              </p>
            </div>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            <li className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Shot flush photo={kensetsu} sizes="(min-width: 768px) 320px, 100vw" note />
              <p className="px-5 py-4 text-lg font-bold text-primary-dark">建設</p>
            </li>
            <li className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Shot flush photo={kikai} sizes="(min-width: 768px) 320px, 100vw" note />
              <p className="px-5 py-4 text-lg font-bold text-primary-dark">機械・金属</p>
            </li>
            <li className="overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-line">
              <Art flush src="/art/sakai/food.svg" alt="作業台と容器を描いた、食品製造のイメージイラスト" />
              <p className="px-5 py-4 text-lg font-bold text-primary-dark">食品製造</p>
            </li>
          </ul>
          <p className="mt-8 text-sm">
            <Link href="/#cases" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
              受入れ事例を見る
            </Link>
          </p>
        </div>
      </section>

      <section id="flow" aria-labelledby="flow-title" className="bg-pale">
        <div className="mx-auto grid max-w-[1040px] items-start gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <h2 id="flow-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">
              受入れまでの目安
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed">
              期間は、国や時期、手続きの状況により異なります。次の目安は、当組合のよくある質問に掲載している内容です。
            </p>
            <ol className="relative mt-8 space-y-4">
              {[
                ["お問い合わせからご契約まで", "最初のお問い合わせからご契約までは、おおむね1〜2週間が目安です。"],
                ["面接から配属まで（インドネシア）", "インドネシアからの受入れの場合、面接から配属までは約5〜6か月が目安です。"],
                ["受入れ後", "配属後は、定期的な訪問・監査、受入れ企業様へのご助言、生活面のご相談への対応を行っております。"],
              ].map(([stepTitle, body], index) => (
                <li key={stepTitle} className="relative flex gap-4">
                  {index < 2 ? <span aria-hidden="true" className="absolute bottom-[-1rem] left-5 top-10 w-px bg-pale-border" /> : null}
                  <span aria-hidden="true" className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-xl bg-white p-5 shadow-card ring-1 ring-line">
                    <h3 className="text-lg font-bold text-ink">{stepTitle}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm">
              <Link href="/support" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
                受入れ後の支援
              </Link>
              <span aria-hidden="true"> ／ </span>
              <Link href={CONTACT_HREF} className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
                メールでのお問い合わせ
              </Link>
            </p>
          </div>
          <Shot photo={photos.siteInterior} sizes="(min-width: 768px) 480px, 100vw" />
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="bg-white">
        <div className="mx-auto grid max-w-[1040px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
          <Shot photo={photos.trainingPlate} sizes="(min-width: 768px) 480px, 100vw" />
          <div>
            <h2 id="about-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">
              組合概要
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed">
              所在地は{fullAddress}です。電話番号は
              <a href={TEL_HREF} className="font-bold text-primary-dark underline underline-offset-4">{org.tel}</a>
              、受付時間は{repoFacts.hours}です。
            </p>
            <dl className="mt-6 grid gap-4">
              <div className="rounded-xl bg-pale p-5 shadow-card ring-1 ring-line">
                <dt className="text-sm font-bold text-ink">{licenses.kanri.label}</dt>
                <dd className="mt-2 text-[15px]">許可番号 {licenses.kanri.number}（{licenses.kanri.kind}）</dd>
              </div>
              <div className="rounded-xl bg-pale p-5 shadow-card ring-1 ring-line">
                <dt className="text-sm font-bold text-ink">{licenses.toroku.label}</dt>
                <dd className="mt-2 text-[15px]">登録番号 {licenses.toroku.number}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm">
              <Link href="/about" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
                組合概要を見る
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="bg-pale">
        <div className="mx-auto max-w-[760px] px-4 py-16 md:py-24">
          <h2 id="faq-title" className="text-2xl font-bold leading-snug text-primary-dark md:text-3xl">
            よくある質問
          </h2>
          <div className="mt-8 grid gap-3">
            {sakaiFaqs.map((faq) => (
              <details key={faq.q} className="group rounded-xl bg-white shadow-card ring-1 ring-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-ink hover:text-primary-dark [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-bold leading-relaxed md:text-base">
                    <span aria-hidden="true" className="mr-2 text-primary-dark">Q</span>
                    {faq.q}
                  </h3>
                  <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-primary" />
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-primary group-open:hidden" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-body">
                  <span aria-hidden="true" className="mr-2 font-bold text-cta-text">A</span>
                  <KeepWords text={faq.a} />
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-title" className="relative overflow-hidden bg-primary-dark text-white">
        <SquaresPattern variant="band" />
        <div className="relative mx-auto max-w-[760px] px-4 py-16 text-center md:py-24">
          <h2 id="cta-title" className="text-2xl font-bold leading-snug md:text-3xl">
            堺市の外国人雇用について、ご相談ください。
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-left text-[15px] leading-relaxed sm:text-center">
            外国人材の受入れや育成就労制度について、堺市の監理団体である当組合が丁寧にご説明いたします。どうぞお気軽にご相談ください。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LineButton onDark className="inline-flex min-h-14 gap-2 px-8 text-base sm:min-w-64" iconClassName="h-5 w-5" />
            <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14 sm:min-w-64">
              {CONTACT_LABEL}
            </LinkButton>
          </div>
          <p className="mt-6 text-[15px]">
            お電話でのご相談
            <a href={TEL_HREF} className="mx-auto mt-2 flex min-h-12 w-fit items-center gap-2 rounded-xl border-2 border-white px-5 text-xl font-bold text-white no-underline hover:bg-white/10">
              <PhoneIcon className="h-5 w-5" />
              {org.tel}
            </a>
            <span className="mt-2 block text-sm">受付時間：{repoFacts.hours}</span>
          </p>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumb)} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
