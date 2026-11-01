import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { FaqList } from "@/components/FaqList";
import { IconLicense, IconLocal, IconPartners, IconPeople } from "@/components/LineIcons";
import { ArrowIcon, ImagePlaceholder, LineHeading, LinkButton, Section, SquaresPattern, TabCard } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { FlowTimeline } from "@/components/FlowTimeline";
import { photos } from "@/lib/images";
import { CONTACT_HREF, licenses, org } from "@/lib/site";
import { faqs } from "@/lib/faq";
import { pageMeta } from "@/lib/meta";
import { DEFAULT_COUNTRY, pricingByCountry } from "@/lib/pricing";

export const metadata: Metadata = {
  ...pageMeta("/", "堺の監理団体 ソリューション協同組合｜大阪の外国人材受入れ・育成就労", "堺市堺区の監理団体、ソリューション協同組合です。建設・機械金属・食品製造など大阪の中小企業様の外国人材受入れを、ベトナム・インドネシア・フィリピンの送り出し機関と連携してご支援し、2027年4月1日施行の育成就労制度に向けて準備中です。"),
  title: { absolute: "堺の監理団体 ソリューション協同組合｜大阪の外国人材受入れ・育成就労" },
};

const problems = [
  {
    title: "育成就労制度で何が変わるのか、まだ整理できていない",
    body: "2027年4月1日施行の新しい制度について、自社にどのような影響があり、いつまでに何を準備すればよいのかが見えにくいと感じていらっしゃる企業様もおられます。",
  },
  {
    title: "初めての受入れで、手続きや準備の進め方がわからない",
    body: "申請書類の作成、住まいの手配、受入れ後の体制づくりなど、何から手を付ければよいか迷われる企業様は少なくありません。",
  },
  {
    title: "受け入れた人材に、長く働いてもらえるか不安",
    body: "新制度では一定の要件のもとで転籍が認められる予定です。働き続けたいと思っていただける職場づくりが、これまで以上に大切になります。",
  },
];

const reasons = [
  {
    title: "監理団体の許可と\n登録支援機関の登録",
    body: `技能実習法に基づく監理団体（${licenses.kanri.kind}）の許可と、特定技能の登録支援機関の登録を受けております。`,
    note: `許可番号 ${licenses.kanri.number}／登録番号 ${licenses.toroku.number}`,
    Icon: IconLicense,
    href: "/about",
    link: "許可・登録の内容を見る",
  },
  {
    title: "堺市に拠点を構え、\n大阪の中小企業様に密着",
    body: `堺市堺区に事務所を構え、職員${org.staff}の体制で、大阪府内の中小企業様を中心にきめ細かくご支援いたします。`,
    note: `所在地 ${org.locality}／職員 ${org.staff}`,
    Icon: IconLocal,
    href: "/about",
    link: "組合概要を見る",
  },
  {
    title: "3か国の送り出し機関と\n連携",
    body: "ベトナム、インドネシア、フィリピンの送り出し機関と連携し、貴社の業務に合った人材の受入れをご提案いたします。",
    note: "ベトナム・インドネシア・フィリピン",
    Icon: IconPartners,
    href: "/flow",
    link: "受入れの流れを見る",
  },
  {
    title: `${org.managed}の\n管理実績`,
    body: "技能実習生・特定技能外国人あわせて約360名を管理しております。現場で培った経験をもとに、受入れ企業様をご支援いたします。",
    note: "技能実習生・特定技能外国人の合計",
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
  { item: "育成就労制度への対応", ours: "育成就労制度に向けて準備中です", general: "各団体が準備を進めている段階です", needsCheck: true },
];

/** トップの費用サマリー（lib/pricing.ts のデータをそのまま表示。金額の加工・合算はしません） */
const pricing = pricingByCountry[DEFAULT_COUNTRY];
const priceLabel = `目安・暫定（${pricing.version}・${pricing.asOf}時点）`;
const feeCards = [
  { key: "初期費用（ご加入時）", caption: "ご加入時" },
  { key: "入国時〜上陸後講習", caption: "入国時〜上陸後講習" },
  { key: "入国後（毎月）", caption: "配属後（毎月）" },
].flatMap(({ key, caption }) => {
  const g = pricing.groups.find((x) => x.title === key);
  return g ? [{ title: g.title, step: g.step, caption, rows: g.rows }] : [];
});

/** 経営者様にお任せいただけること（確認済みの事実・lib のデータのみ） */
const benefits: { title: string; body: string; check?: boolean }[] = [
  { title: "申請書類の作成をサポート", body: "受入れに必要な書類や申請書類の作成を、当組合がご案内・サポートいたします。" },
  { title: "3か国から人材をご提案", body: "ベトナム・インドネシア・フィリピンの送り出し機関と連携し、Web面接で人材を選考いただけます。" },
  { title: "入国後1か月の講習", body: "上陸後講習で日本語や生活のルールを学んでから、貴社へ配属いたします。" },
  { title: "配属後の監査・訪問", body: "法令に基づく定期的な監査・訪問指導で、受入れ後も継続してご支援いたします。" },
  { title: "費用の目安を事前に公開", body: "インドネシアからの受入れ費用の目安（暫定）を公開しております。最終金額は個別にご案内します。" },
  { title: "2027年4月への移行準備", body: "育成就労制度に向けて、現在の技能実習からの切り替えの準備を一緒に進めます。" },
];

/** 受入れ事例の写真（既存サイト index16.html の事例欄に使われていた写真と業種・地域の記載）。企業名・人数・ご感想は未確認のため掲載しません */
const cases = [
  { photo: photos.siteSteel, tag: "大阪府・金属加工" },
  { photo: photos.siteExcavation, tag: "大阪府・造園土木" },
  { photo: photos.siteInterior, tag: "京都府・土木工事" },
];

const badge = "inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-dark px-5 py-1.5 text-white";

export default function Home() {
  return (
    <>
      {/* ヒーロー：青 #1478E6。白文字は大きい文字（見出し・19px太字）のみ。
          写真は掲載しない方針（代表者様のご指示）。文字を中央揃え・最大幅を絞り、左右の四角模様でバランスを取ります */}
      <section className="relative overflow-hidden bg-primary text-white">
        <SquaresPattern />
        <div className="relative mx-auto max-w-[880px] px-4 py-12 text-center md:py-20">
          <p className="inline-block rounded-sm bg-white px-3 py-1 text-[13px] font-bold text-primary-dark">育成就労制度 2027年4月1日施行</p>
          <h1 className="mt-5 text-[1.9rem] font-bold leading-[1.4] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3rem]">
            <span className="block">堺の監理団体として、</span>
            <span className="block">大阪の外国人材受入れを</span>
            <span className="block">支えます。</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[19px] font-bold leading-relaxed [word-break:auto-phrase]">
            堺市を拠点に、大阪府内の中小企業様の外国人材受入れと、育成就労制度への移行をご支援いたします。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <LinkButton href={CONTACT_HREF} className="min-h-14 sm:min-w-64">お問い合わせ・資料請求</LinkButton>
            <LinkButton href="/ikusei-shuro" variant="outlineWhite" className="min-h-14 sm:min-w-56">育成就労制度を知る</LinkButton>
          </div>
        </div>
      </section>

      {/* 確認済みの数値（ピル型バッジ）。本文サイズの白文字のため背景は #0D5FC4 */}
      <section aria-label="当組合の概要（数値）" className="bg-white">
        <div className="mx-auto max-w-[812px] px-4 py-5">
          <ul className="flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center">
            <li className={badge}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3 3 7-7" /></svg>
              <span className="text-sm font-bold">管理人数</span>
              <strong className="text-lg">{org.managed}</strong>
              <span className="text-[11px]">※1</span>
            </li>
            <li className={badge}>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 8.5l3 3 7-7" /></svg>
              <span className="text-sm font-bold">連携する送り出し国</span>
              <strong className="text-lg">3か国</strong>
              <span className="text-[11px]">※2</span>
            </li>
          </ul>
          <p className="mt-2 text-center text-[11px] leading-6 text-muted">
            <span className="block sm:inline">※1 技能実習生・特定技能外国人の合計（集計時点<CheckBadge />）</span>
            <span className="hidden sm:inline">　</span>
            <span className="block sm:inline">※2 ベトナム・インドネシア・フィリピン</span>
          </p>
        </div>
      </section>

      {/* お悩み */}
      <Section id="problems" tone="pale" title="外国人材の受入れで、このようなお悩みはありませんか">
        <div className="bg-pale-strong px-4 py-8 md:px-6">
          <p className="text-center text-sm font-bold text-primary-dark">育成就労制度の開始を前に</p>
          <p className="mt-1 text-center text-xl font-bold text-primary-dark md:text-2xl">受入れ準備の見通し</p>
          <p className="mx-auto mt-3 max-w-[560px] text-center text-[13px] font-bold text-ink">
            中小企業の経営者・ご担当者様が抱えやすいお悩みの例です。
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {problems.map((p, i) => (
              <li key={p.title} className="border-b-4 border-primary bg-white px-4 pb-6 pt-5">
                <p aria-hidden="true" className="flex items-center gap-3 text-lg font-bold text-primary-dark">
                  <span className="h-px flex-1 bg-line" />
                  {i + 1}
                  <span className="h-px flex-1 bg-line" />
                </p>
                <h3 className="mt-2 text-base font-bold leading-snug text-primary-dark">
                  <span className="sr-only">お悩み{i + 1}：</span>
                  {p.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-4 text-[11px] text-muted">※上記は一般的なお悩みの例であり、調査結果ではありません。</p>
      </Section>

      {/* 選ばれる理由 */}
      <Section id="reasons" title="ソリューション協同組合が選ばれる4つの理由">
        <ol className="grid gap-5 md:grid-cols-2">
          {reasons.map(({ title, body, note, Icon, href, link }, i) => (
            <TabCard key={title} n={i + 1}>
              <div className="flex h-36 items-center justify-center border-b border-tab bg-white text-primary">
                <Icon className="h-20 w-20" />
              </div>
              <div className="px-5 pb-6 pt-5">
                <h3 className="whitespace-pre-line text-lg font-bold leading-snug text-ink md:text-xl">
                  <span className="sr-only">理由{i + 1}：</span>
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-body md:text-sm">{body}</p>
                <p className="mt-2 text-[11px] text-muted">※{note}</p>
                <Link href={href} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary-dark underline-offset-4 hover:underline">
                  {link}
                  <ArrowIcon className="h-3 w-3" />
                </Link>
              </div>
            </TabCard>
          ))}
        </ol>
      </Section>

      {/* 経営者様のメリット */}
      <Section id="benefits" tone="pale" title="経営者様にお任せいただけること" lead="手続きから配属後のご支援まで、当組合が一貫してお手伝いいたします。本業に専念しながら、外国人材の受入れを進めていただけます。">
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((b) => (
            <li key={b.title} className="flex gap-3 bg-white p-5 shadow-card">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-primary-dark" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M4 12.5l5 5L20 6.5" /></svg>
              <div>
                <h3 className="font-bold text-ink">{b.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed md:text-sm">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <LinkButton href="/support" variant="ghost" className="min-w-64">受入れ後の支援を見る</LinkButton>
        </div>
      </Section>

      {/* 受入れまでの期間 */}
      <Section id="timeline" title="受入れまでの流れと期間の目安" width="wide" lead="インドネシアからの受入れの場合の目安です。国や時期、手続きの状況により異なります。">
        <FlowTimeline />
        <div className="mt-8 text-center">
          <LinkButton href="/flow" variant="ghost" className="min-w-64">13の手順を詳しく見る</LinkButton>
        </div>
      </Section>

      {/* 費用の目安（プラン型） */}
      <Section
        id="fees"
        tone="pale"
        title="費用の目安"
        lead={`${pricing.countryLabel}から受け入れる場合の主な費用です（${priceLabel}・税別・1名あたり）。`}
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {feeCards.map((c) => (
            <li key={c.title} className="flex flex-col bg-white shadow-card">
              <p className="bg-primary-dark px-4 py-3 text-center font-bold text-white">
                {c.caption}
                {c.step ? <span className="block text-xs font-normal">（{c.step}）</span> : null}
              </p>
              <dl className="flex-1 px-4 py-3">
                {c.rows.map((r) => (
                  <div key={r.item} className="border-b border-line py-2.5 last:border-b-0">
                    <dt className="text-[13px] text-body">{r.item}</dt>
                    <dd className="text-lg font-bold text-primary-dark">{r.amount}</dd>
                    {r.note ? <dd className="text-[11px] text-muted">{r.note}</dd> : null}
                  </div>
                ))}
              </dl>
              <p className="border-t border-line px-4 py-2 text-[11px] text-muted">
                {priceLabel}・税別
                <CheckBadge />
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-l-4 border-primary bg-white p-4 text-sm font-bold text-ink">
          最終金額は個別にご案内します。現在の金額は技能実習制度の料金を転記した暫定値で、育成就労制度の正式な単価は確定しておりません。
        </p>
        <div className="mt-8 text-center">
          <LinkButton href="/pricing" variant="ghost" className="min-w-64">費用の詳細を見る</LinkButton>
        </div>
      </Section>

      {/* 事例（未確定のため要確認枠のみ） */}
      <Section id="cases" title="受入れ事例" lead="外国人材が活躍する分野の現場です。企業名・人数・ご感想などの詳細は、掲載のご了承と内容の確認が済み次第、掲載いたします。">
        <ul className="grid gap-4 sm:grid-cols-3">
          {cases.map((c) => (
            <li key={c.tag} className="flex flex-col overflow-hidden rounded bg-white shadow-card ring-1 ring-line">
              <Photo photo={c.photo} sizes="(min-width: 640px) 260px, 100vw" imgClassName="aspect-[16/10]" />
              <div className="flex-1 p-4">
                <p className="text-sm font-bold text-ink">{c.tag}</p>
                <p className="mt-1 text-[13px] text-body">
                  事例の詳細
                  <CheckBadge />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 比較表 */}
      <Section
        id="compare"
        tone="pale"
        width="wide"
        title="一般的な受入れ方法との比較"
        lead="「一般的な受入れ方法」の欄は特定の団体を指すものではありません。団体ごとに対応は異なりますので、目安としてご覧ください。"
      >
        <ul className="space-y-4 sm:hidden">
          {comparison.map((c) => (
            <li key={c.item} className="overflow-hidden bg-white shadow-card">
              <p className="bg-label px-4 py-2 text-center text-[13px] font-bold text-ink">{c.item}</p>
              <div className="bg-primary-dark px-4 py-3 text-white">
                <p className="text-[11px]">ソリューション協同組合</p>
                <p className="font-bold">
                  {c.ours}
                  {c.needsCheck ? <CheckBadge /> : null}
                </p>
              </div>
              <div className="bg-white px-4 py-3 text-body">
                <p className="text-[11px] text-muted">一般的な受入れ方法</p>
                <p className="text-sm">{c.general}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="hidden bg-white p-1.5 sm:block">
          <table className="w-full border-separate border-spacing-0 text-left text-[13px]">
            <caption className="sr-only">ソリューション協同組合と一般的な受入れ方法の比較</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[20%] bg-label p-3 text-center font-bold text-ink">比較項目</th>
                <th scope="col" className="w-[42%] bg-primary p-3 text-center text-[19px] font-bold text-white">ソリューション協同組合</th>
                <th scope="col" className="bg-[#eeeeee] p-3 text-center text-sm font-bold text-body">一般的な受入れ方法</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.item}>
                  <th scope="row" className="border-t border-white bg-label p-3 text-center font-bold text-ink">{c.item}</th>
                  <td className="border-t border-white/25 bg-primary-dark p-3 text-center text-sm font-bold text-white">
                    {c.ours}
                    {c.needsCheck ? <CheckBadge /> : null}
                  </td>
                  <td className="border-t border-line bg-white p-3 text-center text-body">{c.general}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[11px] text-muted">※費用の目安は暫定値です。最終金額は個別にご案内します。</p>
      </Section>

      {/* 資料のご案内 */}
      <Section id="documents" title="資料のご案内" width="default">
        <LineHeading>当組合のご案内資料</LineHeading>
        <div className="mx-auto mt-6 grid max-w-[620px] items-center gap-6 rounded border border-line bg-white p-5 sm:grid-cols-[200px_1fr]">
          <ImagePlaceholder label="資料画像要確認" className="aspect-[3/4]" />
          <div>
            <p className="text-[15px] text-body">
              育成就労制度の概要や受入れの流れについて、資料をご用意してお届けいたします。資料の内容・形式は、お問い合わせの際にご案内いたします。
            </p>
            <div className="mt-5">
              <LinkButton href={CONTACT_HREF} variant="ghost" className="w-full sm:w-auto sm:min-w-56">資料を請求する</LinkButton>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <LineHeading>制度について詳しく知る</LineHeading>
          <div className="mx-auto mt-6 max-w-[620px] rounded border border-line p-5 text-center">
            <p className="text-sm text-body">育成就労制度の概要、受入れの流れ、技能実習・特定技能との違い、2027年4月に向けた準備をまとめております。</p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/ikusei-shuro" variant="ghost" className="sm:min-w-52">育成就労制度とは</LinkButton>
              <LinkButton href="/flow" variant="ghost" className="sm:min-w-52">受入れの流れ</LinkButton>
            </div>
            <div className="mt-3 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/compare" variant="ghost" className="sm:min-w-52">制度の比較</LinkButton>
              <LinkButton href="/roadmap" variant="ghost" className="sm:min-w-52">2027年4月に向けた準備</LinkButton>
            </div>
          </div>
        </div>
      </Section>

      {/* よくある質問 */}
      <Section id="faq" tone="pale" title="よくある質問" width="narrow">
        <FaqList items={faqs.slice(0, 5)} />
        <div className="mt-8 text-center">
          <LinkButton href="/faq" variant="ghost" className="min-w-64">よくある質問をすべて見る</LinkButton>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
