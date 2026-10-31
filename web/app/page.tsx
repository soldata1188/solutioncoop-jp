import Link from "next/link";
import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { CONTACT_HREF, CONTACT_LABEL, org } from "@/lib/site";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: { absolute: "堺の監理団体 ソリューション協同組合｜大阪の外国人材受入れ・育成就労" },
  description:
    "堺市の監理団体、ソリューション協同組合です。建設・機械金属・食品製造など大阪の中小企業様の外国人材受入れと、2027年4月開始の育成就労制度への対応をご支援いたします。",
  alternates: { canonical: "/" },
  openGraph: {
    url: "https://solutioncoop-jp.com/",
    title: "堺の監理団体 ソリューション協同組合",
    description: "大阪の外国人材受入れと育成就労制度への対応をご支援いたします。",
  },
};

const strengths = [
  { title: `${org.managed}の管理実績`, body: "技能実習生・特定技能外国人あわせて約360名を管理しております。現場で培った経験をもとに、受入れ企業様をご支援いたします。" },
  { title: "3か国の送り出し機関と連携", body: "ベトナム、インドネシア、フィリピンの送り出し機関と連携し、貴社の業務に合った人材の受入れをご提案いたします。" },
  { title: "堺市に拠点、大阪の中小企業に密着", body: `堺市堺区に事務所を構え、職員${org.staff}体制で大阪府内の中小企業様を中心にきめ細かく対応いたします。` },
];

const steps = ["お問い合わせ・資料請求", "ヒアリング・ご提案", "ご契約（ここまで約1〜2週間）", "Web面接・各種申請", "入国・講習を経て配属（インドネシアの場合、面接から約5〜6か月）", "受入れ後の定期訪問・支援"];

const industries = [
  { name: "建設", body: "建設現場での人材確保に関するご相談を承ります。" },
  { name: "機械・金属", body: "機械加工・金属加工などの製造現場をご支援いたします。" },
  { name: "食品製造", body: "食品工場など製造ラインの人材確保をご支援いたします。" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <svg aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 opacity-20" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#ffffff" strokeWidth="2" />
          <circle cx="100" cy="100" r="30" fill="#1f4e8c" />
        </svg>
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="inline-block rounded border border-accent-500 bg-white/10 px-3 py-1 text-sm font-bold">2027年4月 育成就労制度スタート</p>
          <h1 className="mt-5 text-3xl font-bold leading-snug md:text-5xl md:leading-tight">
            堺の監理団体として、
            <br className="hidden sm:block" />
            大阪の外国人材受入れを支えます。
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-100">
            ソリューション協同組合は、堺市を拠点に大阪府内の中小企業様の外国人材受入れをご支援する監理団体です。技能実習制度に代わる育成就労制度への移行についても、わかりやすくご案内いたします。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={CONTACT_HREF} className="inline-flex min-h-14 items-center justify-center rounded-md bg-accent-500 px-7 text-lg font-bold text-navy-950 hover:bg-accent-400">
              {CONTACT_LABEL}
            </Link>
            <Link href="/ikusei-shuro" className="inline-flex min-h-14 items-center justify-center rounded-md border-2 border-white px-7 text-lg font-bold text-white hover:bg-white/10">
              育成就労制度を知る
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="strengths" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="strengths" className="text-2xl font-bold text-navy-950 md:text-3xl">当組合の特長</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {strengths.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-slate-200 p-6 shadow-sm">
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 font-bold text-navy-900">{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold text-navy-900">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="flow" className="bg-navy-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="flow" className="text-2xl font-bold text-navy-950 md:text-3xl">受入れの流れ</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-bold text-white">{i + 1}</span>
                <span className="font-bold">{s}</span>
              </li>
            ))}
          </ol>
          <Link href="/flow" className="mt-8 inline-flex min-h-11 items-center font-bold text-navy-700 underline underline-offset-4">受入れの流れを詳しく見る</Link>
        </div>
      </section>

      <section aria-labelledby="industries" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="industries" className="text-2xl font-bold text-navy-950 md:text-3xl">主な対象業種</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {industries.map((s) => (
            <li key={s.name} className="rounded-xl border-l-4 border-navy-700 bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-xl font-bold text-navy-900">{s.name}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
        <Link href="/industries" className="mt-8 inline-flex min-h-11 items-center font-bold text-navy-700 underline underline-offset-4">対象業種を詳しく見る</Link>
      </section>

      <section aria-labelledby="faq" className="bg-navy-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 id="faq" className="text-2xl font-bold text-navy-950 md:text-3xl">よくある質問</h2>
          <dl className="mt-8 space-y-4">
            {faqs.slice(0, 3).map((f) => (
              <div key={f.q} className="rounded-lg bg-white p-5 shadow-sm">
                <dt className="font-bold text-navy-900">Q. {f.q}</dt>
                <dd className="mt-2 text-muted">A. {f.a}</dd>
              </div>
            ))}
          </dl>
          <Link href="/faq" className="mt-8 inline-flex min-h-11 items-center font-bold text-navy-700 underline underline-offset-4">よくある質問をすべて見る</Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
