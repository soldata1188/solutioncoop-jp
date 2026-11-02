import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { FaqList } from "@/components/FaqList";
import { IconChartDown, IconChartUp, IconDocuments, IconGlobe, IconHandshake, IconLicense, IconLocal, IconPartners, IconPlane } from "@/components/LineIcons";
import { ArrowIcon, LineHeading, LinkButton, Section, SquaresPattern, TabCard } from "@/components/ui";
import { Photo } from "@/components/Photo";
import { StatsStrip } from "@/components/StatsStrip";
import { Chunks, KeepWords } from "@/components/KeepWords";
import { FlowTimeline } from "@/components/FlowTimeline";
import { photos } from "@/lib/images";
import { licenses, org, sdgs } from "@/lib/site";
import { LineButton } from "@/components/LineButton";
import { faqs } from "@/lib/faq";
import { pageMeta } from "@/lib/meta";

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

/** 事業内容（代表者様ご提供の文言をそのまま掲載） */
const businesses = [
  {
    title: "外国人材受入事業",
    sub: "グローバル人材の安定確保",
    body: "意欲ある若手・グローバル人材の安定的な確保と育成を支援。新制度「育成就労」や「特定技能」を見据え、母国語スタッフによる手厚い生活指導・メンタルケアで高い定着率を実現します。",
    items: ["外国人技能実習生共同受入れ事業", "特定技能外国人支援事業"],
    Icon: IconGlobe,
  },
  {
    title: "事業拡大サポート",
    sub: "共同事業を通じたビジネス拡大支援",
    body: "組合員様向けに、事業拡大と業務効率化を直接的にバックアップ。受注の斡旋や必要な資材・設備の共同購買を通じて、組合員様のコスト削減と収益向上に貢献します。",
    items: ["組合員の行う事業・工事等の受注斡旋", "組合員の必要とする機械・設備等の購買斡旋"],
    Icon: IconHandshake,
  },
  {
    title: "グローバルビジネス支援",
    sub: "海外進出サポート事業",
    body: "労働力不足の解消だけでなく、組合員様のさらなる成長のために海外展開を支援。現地の強力なネットワークを活かし、安全かつ円滑なグローバルビジネスの第一歩をサポートします。",
    items: ["組合員の海外進出に関するサポート事業", "海外市場の調査及び関連情報の提供"],
    Icon: IconPlane,
  },
  {
    title: "組織力強化支援",
    sub: "経営向上と福利厚生の充実",
    body: "企業としての持続的な成長を支援するため、最新の法令・業界動向の共有から、従業員の皆様の働きやすい環境づくりまで、多角的なサポートを提供します。",
    items: ["組合員の福利厚生に関する事業", "前各号の事業に附帯する事業"],
    Icon: IconChartUp,
  },
];

/** 選ばれ続ける理由（代表者様ご提供の文言をそのまま掲載） */
const reasons = [
  {
    title: "明朗な費用で安心",
    sub: "適正な費用体系・透明性の高い運営",
    body: "仲介業者を介さず、海外の教育機関と直接連携して人材をご紹介。すべての費用を書面で明示し、透明性の高い適正な運営体制で企業様の信頼にお応えします。",
    Icon: IconChartDown,
  },
  {
    title: "事務負担を大幅に軽減",
    sub: "煩雑な事務手続きの負担軽減",
    body: "新制度移行に伴う煩雑な手続きの負担軽減と確実な法令順守をサポート。受入準備から各種申請への適切なアドバイスまで、専門スタッフが伴走し、企業様の適正な運用を支援します。",
    Icon: IconDocuments,
  },
  {
    title: "3カ国対応ハイブリッド",
    sub: "多国籍で優秀な人材の厳選",
    body: "ベトナム、インドネシア、フィリピンの3カ国から意欲ある人材を紹介可能。貴社の社風や業務ニーズに合わせ、グローバルな視点から最も定着しやすい人材を提案します。",
    Icon: IconGlobe,
  },
  {
    title: "手厚いフォローで安心",
    sub: "365日・24時間の母国語サポート",
    body: "入社後も独自のフォロー体制を提供。生活習慣の違いからくるトラブルやメンタルケアまで母国語で対応し、外国人材の迅速な環境適応と長期定着をバックアップします。",
    Icon: IconHandshake,
  },
];

/** 許可・登録・拠点（旧「選ばれる理由」の3枚。確認済みの事実） */
const credentials = [
  {
    title: "監理団体の許可と登録支援機関の登録",
    body: `技能実習法に基づく監理団体（${licenses.kanri.kind}）の許可と、特定技能の登録支援機関の登録を受けております。`,
    note: `許可番号 ${licenses.kanri.number}／登録番号 ${licenses.toroku.number}`,
    Icon: IconLicense,
    href: "/about",
    link: "許可・登録の内容を見る",
  },
  {
    title: "堺市に拠点を構え、大阪の中小企業様に密着",
    body: `堺市堺区に事務所を構え、職員${org.staff}の体制で、大阪府内の中小企業様を中心にきめ細かくご支援いたします。`,
    note: `所在地 ${org.locality}／職員 ${org.staff}`,
    Icon: IconLocal,
    href: "/about",
    link: "組合概要を見る",
  },
  {
    title: "送り出し機関と連携",
    body: "ベトナム、インドネシア、フィリピンの送り出し機関と連携し、貴社の業務に合った人材の受入れをご提案いたします。",
    note: "ベトナム・インドネシア・フィリピン",
    Icon: IconPartners,
    href: "/flow",
    link: "受入れの流れを見る",
  },
];

/** 比較表。「一般的な受入れ方法」列は特定の団体を指すものではなく、断定を避けた表現にとどめています。 */
const comparison: { item: string; ours: string; general: string; needsCheck?: boolean }[] = [
  { item: "拠点", ours: "堺市堺区（大阪府内の企業様を中心にご支援）", general: "団体により所在地・対応地域はさまざまです" },
  { item: "許可・登録", ours: "監理団体許可（一般監理事業）と登録支援機関の登録の両方", general: "団体により許可・登録の範囲が異なります" },
  { item: "連携する送り出し国", ours: "ベトナム・インドネシア・フィリピン", general: "団体により連携先の国・機関が異なります" },
  { item: "ご契約までの期間", ours: "最初のお問い合わせから約1〜2週間が目安", general: "団体や手続きの状況により異なります" },
  { item: "特定技能への移行", ours: "登録支援機関として、育成就労後の特定技能への移行もご相談いただけます", general: "別の機関への依頼が必要となる場合があります", needsCheck: true },
  { item: "育成就労制度への対応", ours: "育成就労制度に向けて準備中です", general: "各団体が準備を進めている段階です", needsCheck: true },
];

/** 経営者様にお任せいただけること（確認済みの事実・lib のデータのみ） */
const benefits: { title: string; body: string; check?: boolean }[] = [
  { title: "申請書類の作成をサポート", body: "受入れに必要な書類や申請書類の作成を、当組合がご案内・サポートいたします。" },
  { title: "人材をご提案", body: "ベトナム・インドネシア・フィリピンの送り出し機関と連携し、Web面接で人材を選考いただけます。" },
  { title: "入国後1か月の講習", body: "上陸後講習で日本語や生活のルールを学んでから、貴社へ配属いたします。" },
  { title: "配属後の監査・訪問", body: "法令に基づく定期的な監査・訪問指導で、受入れ後も継続してご支援いたします。" },
  { title: "2027年4月への移行準備", body: "育成就労制度に向けて、現在の技能実習からの切り替えの準備を一緒に進めます。" },
];

/** 受入れ事例の写真（既存サイト index16.html の事例欄に使われていた写真と業種・地域の記載）。企業名・人数・ご感想は未確認のため掲載しません */
const cases = [
  { photo: photos.siteSteel, tag: "大阪府・金属加工" },
  { photo: photos.siteExcavation, tag: "大阪府・造園土木" },
  { photo: photos.siteInterior, tag: "京都府・土木工事" },
];

export default function Home() {
  return (
    <>
      {/* ヒーロー：緑 #1E7F46（白文字 5.02:1）。
          写真は掲載しない方針（代表者様のご指示）。文字を中央揃え・最大幅を絞り、左右の四角模様でバランスを取ります */}
      <section data-hero className="relative overflow-hidden bg-primary text-white">
        <SquaresPattern />
        <div className="relative mx-auto max-w-[880px] px-4 py-12 text-center md:py-20">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <p className="inline-block rounded-sm bg-white px-3 py-1 text-[13px] font-bold text-primary-dark">育成就労制度 2027年4月1日施行</p>
            {/* 応援の表明のみ（認定・選定を受けた旨ではありません）。ロゴ画像は使いません（承認範囲の確認前のため）。
                白地に #0F4D2A の文字（9.93:1）。組合名入りの定型文は 390px で2行になり見出しを押し下げるため、短い表現にしています */}
            <p className="inline-block rounded-sm bg-white px-3 py-1 text-sm font-bold text-primary-dark"><KeepWords text={sdgs.badge} /></p>
          </div>
          <h1 className="mt-5 text-[1.9rem] font-bold leading-[1.4] sm:text-[2.4rem] md:text-[2.75rem] lg:text-[3rem]">
            <span className="block">堺の監理団体として、</span>
            <span className="block">大阪の外国人材受入れを</span>
            <span className="block">支えます。</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[19px] font-bold leading-relaxed [word-break:auto-phrase]">
            堺市を拠点に、大阪府内の中小企業様の外国人材受入れと、育成就労制度への移行をご支援いたします。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <LineButton onDark className="flex min-h-14 gap-2 px-8 text-base sm:min-w-64" iconClassName="h-5 w-5" />
            <LinkButton href="/ikusei-shuro" variant="outlineWhite" className="min-h-14 sm:min-w-56">育成就労制度を知る</LinkButton>
          </div>
        </div>
      </section>

      {/* 実績ストリップ（代表者様確認済みの4項目と「SDGs未来都市・堺」） */}
      <StatsStrip />

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
              <li key={p.title} className="border-b-4 border-brand bg-white px-4 pb-6 pt-5">
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
        <p className="mt-4 text-xs text-muted">※上記は一般的なお悩みの例であり、調査結果ではありません。</p>
      </Section>

      {/* 事業内容（代表者様ご提供の文言） */}
      <Section
        id="business"
        eyebrow={<span lang="en">BUSINESS CONTENT</span>}
        title="ソリューション協同組合の事業内容"
        lead="単なる人材紹介にとどまらず、受入企業様の「人手不足解消」から「事業拡大」「海外進出」までをトータルでサポートする4つの事業を柱としています。"
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {businesses.map(({ title, sub, body, items, Icon }, i) => (
            <TabCard key={title} n={i + 1}>
              <div className="flex h-36 items-center justify-center border-b border-tab bg-white text-primary">
                <Icon className="h-20 w-20" />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">
                  <span className="sr-only">事業{i + 1}：</span>
                  {title}
                </h3>
                <p className="mt-1 text-sm font-bold text-primary-dark">{sub}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-body md:text-sm">{body}</p>
                <div className="mt-auto pt-4">
                  <p className="inline-block bg-label px-2 py-0.5 text-xs font-bold text-ink">定款記載事業(等)</p>
                  <ul className="mt-2 space-y-1">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-[13px] leading-snug text-ink">
                        <span aria-hidden="true" className="mt-[0.4em] h-2 w-2 shrink-0 bg-primary" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabCard>
          ))}
        </ol>
      </Section>

      {/* 選ばれ続ける理由（代表者様ご提供の文言）＋許可・登録・拠点 */}
      <Section
        id="reasons"
        tone="pale"
        eyebrow="70社超の企業様に選ばれた実績"
        title="70社以上に選ばれ続ける理由"
        sub={<Chunks parts={["— 受入企業様が実感する、", "技能実習・育成就労・", "特定技能対応の", "4つの理由 —"]} />}
        lead="技能実習生受入れから育成就労制度への移行、特定技能への対応まで。外国人採用に慣れていない中小企業様も、煩雑な事務手続きのご負担を軽減し、「規律と礼節」を重んじる独自の教育体制で、グローバル人材の安定的な育成を支援します。"
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {reasons.map(({ title, sub, body, Icon }, i) => (
            <TabCard key={title} n={i + 1}>
              <div className="flex h-36 items-center justify-center border-b border-tab bg-white text-primary">
                <Icon className="h-20 w-20" />
              </div>
              <div className="px-5 pb-6 pt-5">
                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">
                  <span className="sr-only">理由{i + 1}：</span>
                  {title}
                </h3>
                <p className="mt-1 text-sm font-bold text-primary-dark">{sub}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-body md:text-sm">{body}</p>
              </div>
            </TabCard>
          ))}
        </ol>

        <div className="mt-12">
          <LineHeading id="credentials-title">許可・登録・拠点</LineHeading>
          <ul aria-labelledby="credentials-title" className="mt-6 grid gap-4 md:grid-cols-3">
            {credentials.map(({ title, body, note, Icon, href, link }) => (
              <li key={title} className="flex flex-col bg-white p-5 shadow-card">
                <Icon className="h-10 w-10 text-primary" />
                <h4 className="mt-3 text-base font-bold leading-snug text-ink">{title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-body">{body}</p>
                <p className="mt-2 text-xs text-muted">※{note}</p>
                <Link href={href} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-2 text-sm font-bold text-primary-dark underline-offset-4 hover:underline">
                  {link}
                  <ArrowIcon className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 経営者様のメリット */}
      <Section id="benefits" title="経営者様にお任せいただけること" lead="手続きから配属後のご支援まで、当組合が一貫してお手伝いいたします。本業に専念しながら、外国人材の受入れを進めていただけます。">
        {/* 5項目：半端な段（3＋2）を作らないよう、全幅のカードを縦に並べます（PCは見出しと説明を横並び） */}
        <ul className="grid gap-3">
          {benefits.map((b) => (
            <li key={b.title} className="flex gap-3 bg-white p-5 shadow-card">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-primary-dark" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M4 12.5l5 5L20 6.5" /></svg>
              <div className="md:grid md:flex-1 md:grid-cols-[240px_1fr] md:gap-6">
                <h3 className="font-bold text-ink">{b.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed md:mt-0">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <LinkButton href="/support" variant="ghost" className="min-w-64">受入れ後の支援を見る</LinkButton>
        </div>
      </Section>

      {/* 受入れまでの期間 */}
      <Section id="timeline" tone="pale" title="受入れまでの流れと期間の目安" width="wide" lead="インドネシアからの受入れの場合の目安です。国や時期、手続きの状況により異なります。">
        <FlowTimeline />
        <div className="mt-8 text-center">
          <LinkButton href="/flow" variant="ghost" className="min-w-64">13の手順を詳しく見る</LinkButton>
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
                <p className="text-xs">ソリューション協同組合</p>
                <p className="font-bold">
                  {c.ours}
                  {c.needsCheck ? <CheckBadge /> : null}
                </p>
              </div>
              <div className="bg-white px-4 py-3 text-body">
                <p className="text-xs text-muted">一般的な受入れ方法</p>
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
      </Section>

      {/* LINEでのご相談（ホームの中段の枠。文章は /contact の LINE 案内と同じ既存の文言のみ） */}
      <Section id="line" title="LINEでのご相談" width="default">
        <LineHeading>当組合のLINE公式アカウント</LineHeading>
        <div className="mx-auto mt-6 max-w-[620px] rounded border border-line bg-white p-5 sm:text-center">
          <p className="text-[15px] text-body">当組合のLINE公式アカウントから、トークでご相談をお送りいただけます。</p>
          <p className="mt-2 text-sm text-muted">LINEでのご相談は、お返事までお時間をいただく場合がございます。あらかじめご了承ください。</p>
          <div className="mt-5">
            <LineButton className="flex min-h-14 w-full gap-2 px-8 text-base sm:mx-auto sm:w-auto sm:min-w-64 sm:inline-flex" iconClassName="h-5 w-5" />
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
