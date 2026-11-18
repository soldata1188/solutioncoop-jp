import type { Metadata } from "next";
import Link from "next/link";
import { IconChartDown, IconChartUp, IconDocuments, IconGlobe, IconHandshake, IconLicense, IconLocal, IconPartners, IconPlane } from "@/components/LineIcons";
import { HomeHero } from "@/components/HomeHero";
import { ArrowIcon, Section, SectionHeading, TabCard } from "@/components/ui";
import { StatsStrip } from "@/components/StatsStrip";
import { Chunks } from "@/components/KeepWords";
import { CONTACT_HREF, CONTACT_LABEL, licenses, org } from "@/lib/site";
import { LineButton } from "@/components/LineButton";
import { OfficialXPosts } from "@/components/OfficialXPosts";
import { pageMeta } from "@/lib/meta";

/**
 * 失敗した案内表示だけ、約5分後の再生成で取り直します。失敗はキャッシュしません。
 * 取得に成功した投稿は最長1時間残り、手動更新（タグ x-posts）でも破棄できます。
 */
export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMeta("/", "堺の監理団体 ソリューション協同組合｜大阪の外国人材受入れ・育成就労", "堺市堺区の監理団体、ソリューション協同組合です。建設・機械金属・食品製造など大阪の中小企業様の外国人材受入れを、ベトナム・インドネシア・フィリピンの送り出し機関と連携してご支援します。"),
  title: { absolute: "堺の監理団体 ソリューション協同組合｜大阪の外国人材受入れ・育成就労" },
};

/** 事業内容（代表者様ご提供の文言をそのまま掲載） */
const businesses = [
  {
    title: "外国人材受入事業",
    sub: "技能実習は育成と技能移転",
    body: "技能実習は、人材育成と技能移転による国際貢献としてご支援します。特定技能は、登録支援機関として受入れ後の支援を行います。生活面のご相談にも対応いたします。",
    Icon: IconGlobe,
  },
  {
    title: "事業拡大サポート",
    sub: "共同事業を通じたビジネス拡大支援",
    body: "組合員様向けに、事業拡大と業務効率化を直接的にバックアップ。受注のあっせんや必要な資材・設備の共同購買を通じて、組合員様のコスト削減と収益向上に貢献します。",
    Icon: IconHandshake,
  },
  {
    title: "グローバルビジネス支援",
    sub: "海外進出サポート事業",
    body: "組合員様のさらなる成長のために海外展開を支援します。現地の強力なネットワークを活かし、安全かつ円滑なグローバルビジネスの第一歩をサポートします。",
    Icon: IconPlane,
  },
  {
    title: "組織力強化支援",
    sub: "経営向上と福利厚生の充実",
    body: "企業としての持続的な成長を支援するため、最新の法令・業界動向の共有から、従業員の皆様の働きやすい環境づくりまで、多角的なサポートを提供します。",
    Icon: IconChartUp,
  },
];

/** 選ばれ続ける理由（代表者様ご提供の文言をそのまま掲載） */
const reasons = [
  {
    title: "明朗な費用で安心",
    sub: "適正な費用体系・透明性の高い運営",
    body: "海外の送り出し機関と連携し、外国人材の受入れを支援いたします。すべての費用を書面で明示し、透明性の高い適正な運営体制で企業様の信頼にお応えします。",
    Icon: IconChartDown,
  },
  {
    title: "事務負担を大幅に軽減",
    sub: "煩雑な事務手続きの負担軽減",
    body: "新制度移行に伴う煩雑な手続きの負担軽減と確実な法令順守をサポート。受入れ準備から各種申請に関する適切なアドバイスまで、専門スタッフが伴走し、企業様の適正な運用を支援します。",
    Icon: IconDocuments,
  },
  {
    title: "3か国対応ハイブリッド",
    sub: "多国籍で優秀な人材の厳選",
    body: "ベトナム、インドネシア、フィリピンの送り出し機関と連携しています。技能実習は育成と技能移転、特定技能は登録支援機関としての支援として、貴社の業務に沿ってご案内します。",
    Icon: IconGlobe,
  },
  {
    title: "手厚いフォローで安心",
    sub: "受入れ後の継続的なサポート",
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
    body: "堺市堺区に事務所を構え、大阪府内の中小企業様を中心にきめ細かくご支援いたします。",
    note: `所在地 ${org.locality}`,
    Icon: IconLocal,
    href: "/about",
    link: "組合概要を見る",
  },
  {
    title: "送り出し機関と連携",
    body: "ベトナム、インドネシア、フィリピンの送り出し機関と連携し、貴社の業務に合った人材の受入れをご提案いたします。",
    note: "ベトナム・インドネシア・フィリピン",
    Icon: IconPartners,
    href: CONTACT_HREF,
    link: CONTACT_LABEL,
  },
];

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* 実績ストリップ（代表者様確認済みの4項目と「SDGs未来都市・堺」） */}
      <StatsStrip />

      {/* 事業内容（代表者様ご提供の文言） */}
      <Section
        id="business"
        eyebrow={<span lang="en">BUSINESS CONTENT</span>}
        title="ソリューション協同組合の事業内容"
        lead="技能実習における人材育成・技能移転・国際貢献と、事業拡大・海外進出まで、4つの事業でご支援します。"
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {businesses.map(({ title, sub, body, Icon }, i) => (
            <TabCard key={title} n={i + 1}>
              <div className="hidden h-36 items-center justify-center border-b border-tab bg-white text-primary sm:flex">
                <Icon className="h-20 w-20" />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-5 text-center sm:text-left">
                <span className="mx-auto mb-3 flex size-20 items-center justify-center rounded-full bg-pale text-primary sm:hidden">
                  <Icon className="size-14" />
                </span>
                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">
                  <span className="sr-only">事業{i + 1}：</span>
                  {title}
                </h3>
                <p className="mt-1 text-sm font-bold text-primary-dark">{sub}</p>
                <p className="mt-3 text-pretty text-center text-sm leading-relaxed text-body sm:text-left">{body}</p>
              </div>
            </TabCard>
          ))}
        </ol>
      </Section>

      {/* 選ばれ続ける理由（代表者様ご提供の文言）＋許可・登録・拠点 */}
      <Section
        id="reasons"
        tone="pale"
        eyebrow="80社以上の企業様に選ばれた実績"
        title="80社以上に選ばれ続ける理由"
        sub={<Chunks parts={["— 受入れ企業様が実感する、", "技能実習・育成就労・", "特定技能対応の", "4つの理由 —"]} />}
        lead="技能実習生の受入れから育成就労制度への移行、特定技能への対応まで。外国人材の採用に慣れていない中小企業様にも、煩雑な事務手続きのご負担を軽減しながら、「規律と礼節」を重んじる独自の教育体制で、グローバル人材の安定的な育成を支援します。"
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {reasons.map(({ title, sub, body, Icon }, i) => (
            <TabCard key={title} n={i + 1}>
              <div className="hidden h-36 items-center justify-center border-b border-tab bg-white text-primary sm:flex">
                <Icon className="h-20 w-20" />
              </div>
              <div className="px-5 pb-6 pt-5 text-center sm:text-left">
                <span className="mx-auto mb-3 flex size-20 items-center justify-center rounded-full bg-pale text-primary sm:hidden">
                  <Icon className="size-14" />
                </span>
                <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">
                  <span className="sr-only">理由{i + 1}：</span>
                  {title}
                </h3>
                <p className="mt-1 text-sm font-bold text-primary-dark">{sub}</p>
                <p className="mt-3 text-pretty text-center text-sm leading-relaxed text-body sm:text-left">{body}</p>
              </div>
            </TabCard>
          ))}
        </ol>

        <div className="mt-12">
          <SectionHeading id="credentials-title">許可・登録・拠点</SectionHeading>
          <ul aria-labelledby="credentials-title" className="mt-6 grid gap-4 md:grid-cols-3">
            {credentials.map(({ title, body, note, Icon, href, link }) => (
              <li key={title} className="flex w-full flex-col bg-white p-5 text-center shadow-card sm:text-left">
                <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-pale text-primary sm:mx-0 sm:size-auto sm:bg-transparent">
                  <Icon className="size-14 sm:size-10" />
                </span>
                <h4 className="mt-3 text-base font-bold leading-snug text-ink">{title}</h4>
                <p className="mt-2 text-pretty text-center text-sm leading-relaxed text-body sm:text-left">{body}</p>
                <p className="mt-2 text-sm text-muted">※{note}</p>
                <Link href={href} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 pt-2 text-sm font-bold text-primary-dark underline underline-offset-4 hover:underline sm:justify-start">
                  {link}
                  <ArrowIcon className="h-3 w-3" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* LINEでのご相談（ホームの中段の枠。文章は /contact の LINE 案内と同じ既存の文言のみ） */}
      <Section id="line" tone="pale" title="LINEでのご相談" width="default">
        <div className="mx-auto max-w-[620px] rounded border border-line bg-white p-5 sm:text-center">
          <p className="text-[15px] text-body">当組合のLINE公式アカウントのトーク画面から、ご相談いただけます。</p>
          <p className="mt-2 text-sm text-muted">LINEでのご相談は、お返事までお時間をいただく場合がございます。あらかじめご了承ください。</p>
          <div className="mt-5">
            <LineButton className="flex min-h-14 w-full gap-2 px-8 text-base sm:mx-auto sm:w-auto sm:min-w-64 sm:inline-flex" iconClassName="h-5 w-5" />
          </div>
        </div>
      </Section>

      {/* 公式X。お知らせ欄は無いため、最後の相談枠の直前。取得はサーバー側のみで、widgets.js は使いません。 */}
      <Section
        id="official-x"
        tone="pale"
        title="公式X（旧Twitter）"
        width="wide"
        lead="当組合の公式アカウントの最新の投稿です。"
      >
        <OfficialXPosts showMore />
      </Section>
    </>
  );
}
