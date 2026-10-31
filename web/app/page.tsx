import Link from "next/link";
import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { FaqList } from "@/components/FaqList";
import { IconLicense, IconLocal, IconPartners, IconPeople } from "@/components/LineIcons";
import { ArrowIcon, ImagePlaceholder, LinkButton, Section, SquaresPattern } from "@/components/ui";
import { CONTACT_HREF, licenses, org } from "@/lib/site";
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

const problems = [
  {
    title: "育成就労制度で何が変わるのか、まだ整理できていない",
    body: "2027年4月に始まる新しい制度について、自社にどのような影響があり、いつまでに何を準備すればよいのかが見えにくいと感じていらっしゃる企業様もおられます。",
  },
  {
    title: "初めての受入れで、手続きや準備の進め方がわからない",
    body: "申請書類の作成、住まいの手配、受入れ後の体制づくりなど、何から手を付ければよいか迷われる企業様は少なくありません。",
  },
  {
    title: "せっかく受け入れた人材に、長く働いてもらえるか不安",
    body: "新制度では一定の要件のもとで転籍が認められる予定です。働き続けたいと思っていただける職場づくりが、これまで以上に大切になります。",
  },
];

const reasons = [
  {
    title: "監理団体の許可と登録支援機関の登録",
    body: `技能実習法に基づく監理団体（${licenses.kanri.kind}）の許可と、特定技能の登録支援機関の登録を受けております。`,
    fact: `許可番号 ${licenses.kanri.number}／登録番号 ${licenses.toroku.number}`,
    Icon: IconLicense,
    href: "/about",
    link: "許可・登録の内容を見る",
  },
  {
    title: "堺市に拠点、大阪の中小企業様に密着",
    body: `堺市堺区に事務所を構え、職員${org.staff}の体制で、大阪府内の中小企業様を中心にきめ細かくご支援いたします。`,
    fact: `${org.locality}（職員${org.staff}）`,
    Icon: IconLocal,
    href: "/about",
    link: "組合概要を見る",
  },
  {
    title: "3か国の送り出し機関と連携",
    body: "ベトナム、インドネシア、フィリピンの送り出し機関と連携し、貴社の業務に合った人材の受入れをご提案いたします。",
    fact: "ベトナム・インドネシア・フィリピン",
    Icon: IconPartners,
    href: "/flow",
    link: "受入れの流れを見る",
  },
  {
    title: `${org.managed}の管理実績`,
    body: "技能実習生・特定技能外国人あわせて約360名を管理しております。現場で培った経験をもとに、受入れ企業様をご支援いたします。",
    fact: `管理人数 ${org.managed}`,
    Icon: IconPeople,
    href: "/industries",
    link: "対象業種を見る",
  },
];

/** 比較表。「一般的な受入れ方法」列は特定の団体を指すものではなく、断定を避けた表現にとどめています。 */
const comparison: { item: string; ours: string; general: string; needsCheck?: boolean }[] = [
  { item: "拠点", ours: "堺市堺区（大阪府内の企業様を中心にご支援）", general: "団体により所在地・対応地域はさまざまです" },
  { item: "許可・登録", ours: "監理団体許可（一般監理事業）と登録支援機関の登録の両方", general: "団体により許可・登録の範囲が異なります" },
  { item: "連携する送り出し国", ours: "ベトナム・インドネシア・フィリピンの3か国", general: "団体により連携先の国・機関が異なります" },
  { item: "ご契約までの期間", ours: "最初のお問い合わせから約1〜2週間が目安", general: "団体や手続きの状況により異なります" },
  { item: "費用の目安", ours: "インドネシアからの受入れ費用の目安（暫定）をWebで公開", general: "団体により公開の有無が異なります" },
  { item: "特定技能への移行", ours: "登録支援機関として、育成就労後の特定技能への移行もご相談いただけます", general: "別の機関への依頼が必要となる場合があります", needsCheck: true },
  { item: "育成就労制度への対応", ours: "監理支援機関としての許可に向けて準備中です", general: "各団体が準備を進めている段階です", needsCheck: true },
];

const steps = [
  "お問い合わせ・資料請求",
  "ヒアリング・ご提案",
  "ご契約（ここまで約1〜2週間）",
  "Web面接・各種申請",
  "入国・講習を経て配属（インドネシアの場合、面接から約5〜6か月）",
  "受入れ後の定期訪問・支援",
];

const industries = [
  { name: "建設", body: "建設現場での人材確保に関するご相談を承ります。" },
  { name: "機械・金属", body: "機械加工・金属加工などの製造現場をご支援いたします。" },
  { name: "食品製造", body: "食品工場など製造ラインの人材確保をご支援いたします。" },
];

export default function Home() {
  return (
    <>
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <SquaresPattern />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-sm bg-white/10 px-3 py-1 text-sm font-bold">
              <span aria-hidden="true" className="h-2 w-2 bg-accent-500" />
              2027年4月 育成就労制度スタート
            </p>
            <h1 className="mt-5 text-[1.85rem] font-bold leading-[1.45] sm:text-4xl md:text-5xl md:leading-[1.35]">
              <span className="block">堺の監理団体として、</span>
              <span className="block">大阪の外国人材受入れを</span>
              <span className="block">支えます。</span>
            </h1>
            <p className="mt-6 max-w-xl text-slate-100">
              ソリューション協同組合は、堺市を拠点に大阪府内の中小企業様の外国人材受入れをご支援する監理団体です。技能実習制度に代わる育成就労制度への移行についても、わかりやすくご案内いたします。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={CONTACT_HREF} className="min-h-14 text-lg">お問い合わせ・資料請求</LinkButton>
              <LinkButton href="/ikusei-shuro" variant="outlineWhite" className="min-h-14 text-lg">育成就労制度を知る</LinkButton>
            </div>
          </div>
          <div className="hidden lg:block">
            <ImagePlaceholder note="事務所・職員の写真をご支給いただく予定の枠です" />
          </div>
        </div>
      </section>

      {/* 確認済みの数値（ピル型バッジ） */}
      <section aria-label="当組合の概要（数値）" className="border-b border-line bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <ul className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <li className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-900 px-5 py-2 text-white">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8.5l3 3 7-7" /></svg>
              <span className="text-sm">管理人数</span>
              <strong className="text-lg">{org.managed}</strong>
              <span className="text-xs text-slate-200">※1</span>
            </li>
            <li className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-900 px-5 py-2 text-white">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8.5l3 3 7-7" /></svg>
              <span className="text-sm">連携する送り出し国</span>
              <strong className="text-lg">3か国</strong>
              <span className="text-xs text-slate-200">※2</span>
            </li>
          </ul>
          <p className="mt-3 text-center text-xs leading-6 text-muted">
            ※1 技能実習生・特定技能外国人の合計（集計時点<CheckBadge />）　※2 ベトナム・インドネシア・フィリピン
          </p>
        </div>
      </section>

      {/* お悩み */}
      <Section
        id="problems"
        tone="pale"
        title="外国人材の受入れで、このようなお悩みはありませんか"
        lead="育成就労制度の開始を前に、中小企業の経営者・ご担当者様が抱えやすいお悩みの例をまとめました。"
      >
        <ol className="grid gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <li key={p.title} className="rounded-md border-b-4 border-navy-900 bg-white p-6 shadow-card">
              <p aria-hidden="true" className="flex items-center gap-3 text-lg font-bold text-navy-900">
                <span className="h-px flex-1 bg-line" />
                {i + 1}
                <span className="h-px flex-1 bg-line" />
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug text-navy-900">
                <span className="sr-only">お悩み{i + 1}：</span>
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-center font-bold text-navy-900">そのお悩み、堺の監理団体である当組合が一緒に整理いたします。</p>
      </Section>

      {/* 選ばれる理由 */}
      <Section id="reasons" title="ソリューション協同組合が選ばれる4つの理由">
        <ol className="grid gap-6 md:grid-cols-2">
          {reasons.map(({ title, body, fact, Icon, href, link }, i) => (
            <li key={title} className="relative flex flex-col rounded-md border-2 border-navy-100 bg-white p-6 pt-10 shadow-card">
              <span aria-hidden="true" className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-br-md bg-navy-100 font-bold text-navy-900">
                {i + 1}
              </span>
              <div className="flex justify-center text-navy-700">
                <Icon className="h-16 w-16" />
              </div>
              <h3 className="mt-5 text-xl font-bold leading-snug text-navy-900">
                <span className="sr-only">理由{i + 1}：</span>
                {title}
              </h3>
              <p className="mt-3 text-[15px] text-muted">{body}</p>
              <p className="mt-3 text-sm font-bold text-navy-900">{fact}</p>
              <Link href={href} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-4 text-sm font-bold text-navy-700 no-underline hover:underline hover:underline-offset-4">
                {link}
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* 比較表 */}
      <Section
        id="compare"
        tone="pale"
        title="当組合の特長を比較でご紹介"
        lead="「一般的な受入れ方法」の欄は特定の団体を指すものではありません。団体ごとに対応は異なりますので、目安としてご覧ください。"
      >
        {/* スマートフォン：項目ごとに縦積み */}
        <ul className="space-y-4 sm:hidden">
          {comparison.map((c) => (
            <li key={c.item} className="overflow-hidden rounded-md bg-white shadow-card">
              <p className="bg-pale-gray px-4 py-2 text-center text-sm font-bold text-navy-900">{c.item}</p>
              <div className="bg-navy-900 px-4 py-3 text-white">
                <p className="text-xs text-slate-200">ソリューション協同組合</p>
                <p className="font-bold">
                  {c.ours}
                  {c.needsCheck ? <CheckBadge /> : null}
                </p>
              </div>
              <div className="bg-slate-100 px-4 py-3 text-slate-800">
                <p className="text-xs text-slate-600">一般的な受入れ方法</p>
                <p>{c.general}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden sm:block">
          <table className="w-full border-separate border-spacing-0 bg-white text-left text-[15px]">
            <caption className="sr-only">ソリューション協同組合と一般的な受入れ方法の比較</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[22%] bg-pale-gray p-3 text-center text-sm font-bold text-navy-900">比較項目</th>
                <th scope="col" className="w-[42%] bg-navy-900 p-3 text-center font-bold text-white">ソリューション協同組合</th>
                <th scope="col" className="bg-slate-200 p-3 text-center font-bold text-slate-800">一般的な受入れ方法</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.item}>
                  <th scope="row" className="border-t border-white bg-pale-gray p-3 text-center text-sm font-bold text-navy-900">{c.item}</th>
                  <td className="border-t border-white/20 bg-navy-900 p-3 font-bold text-white">
                    {c.ours}
                    {c.needsCheck ? <CheckBadge /> : null}
                  </td>
                  <td className="border-t border-white bg-slate-100 p-3 text-slate-800">{c.general}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">※費用の目安は暫定値です。最終金額は個別にご案内します。</p>
      </Section>

      {/* 受入れの流れ */}
      <Section id="flow" title="受入れの流れ" lead="お問い合わせからご契約までは約1〜2週間が目安です。">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-4 rounded-md border border-line bg-white p-5 shadow-card">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-900 font-bold text-white">
                <span className="sr-only">手順</span>
                {i + 1}
              </span>
              <span className="font-bold leading-snug text-navy-900">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <LinkButton href="/flow" variant="ghost">受入れの流れを詳しく見る</LinkButton>
        </div>
      </Section>

      {/* 対象業種 */}
      <Section id="industries" tone="pale" title="主な対象業種">
        <ul className="grid gap-5 md:grid-cols-3">
          {industries.map((s) => (
            <li key={s.name} className="rounded-md border-t-4 border-navy-900 bg-white p-6 shadow-card">
              <h3 className="text-xl font-bold text-navy-900">{s.name}</h3>
              <p className="mt-2 text-[15px] text-muted">{s.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <LinkButton href="/industries" variant="ghost">対象業種を詳しく見る</LinkButton>
        </div>
      </Section>

      {/* よくある質問 */}
      <Section id="faq" title="よくある質問" width="narrow">
        <FaqList items={faqs.slice(0, 5)} />
        <div className="mt-10 text-center">
          <LinkButton href="/faq" variant="ghost">よくある質問をすべて見る</LinkButton>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
