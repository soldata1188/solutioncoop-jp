import type { Metadata } from "next";
import { IconChartDown, IconChartUp, IconDocuments, IconGlobe, IconHandshake, IconPlane } from "@/components/LineIcons";
import { HomeHero } from "@/components/HomeHero";
import { LinkButton, Section, TabCard } from "@/components/ui";
import { StatsStrip } from "@/components/StatsStrip";
import { NewsBoard } from "@/components/NewsBoard";
import { ContactMethods } from "@/components/ContactSection";
import { pageMeta } from "@/lib/meta";

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

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* 実績（3つのカード）と、その下の SDGs未来都市・堺 */}
      <StatsStrip />

      {/* 事業内容（代表者様ご提供の文言） */}
      <Section
        id="business"
        eyebrow={<span lang="en">BUSINESS CONTENT</span>}
        title="ソリューション協同組合の事業内容"
        lead="技能実習における人材育成・技能移転・国際貢献と、事業拡大・海外進出まで、4つの事業でご支援します。"
        visual={
          <img
            src="/images/jigyo-naiyo-buildings-green_2026-11-22.svg"
            alt=""
            width={375}
            height={375}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="h-auto w-full max-w-[240px] lg:w-[320px] lg:max-w-[320px]"
          />
        }
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

      {/* 選ばれ続ける理由（代表者様ご提供の文言）。イラストは切り抜きせず全体を出す */}
      <Section
        id="reasons"
        width="wide"
        visualShare="half"
        title="80社以上に選ばれ続ける理由"
        sub="— 受入れ企業様が実感する4つの理由 —"
        lead="外国人材の採用に慣れていない中小企業様にも、煩雑な事務手続きのご負担を軽減しながら、「規律と礼節」を重んじる独自の教育体制で、グローバル人材の安定的な育成を支援します。"
        visual={
          <picture className="block w-full">
            <source
              type="image/avif"
              sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
              srcSet="/images/global-jinzai-illustration-480.avif 480w, /images/global-jinzai-illustration-640.avif 640w, /images/global-jinzai-illustration-880.avif 880w, /images/global-jinzai-illustration-1000.avif 1000w"
            />
            <source
              type="image/webp"
              sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
              srcSet="/images/global-jinzai-illustration-480.webp 480w, /images/global-jinzai-illustration-640.webp 640w, /images/global-jinzai-illustration-880.webp 880w, /images/global-jinzai-illustration-1000.webp 1000w"
            />
            <img
              src="/images/global-jinzai-illustration-1000.webp"
              alt="グローバル人材 若い力を日本企業へ（外国人材と日本企業をつなぐイメージ）"
              width={1000}
              height={746}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 440px, calc(100vw - 32px)"
              className="h-auto w-full"
            />
          </picture>
        }
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
      </Section>

      <Section
        id="countries"
        title={
          <>
            <span className="lg:block lg:whitespace-nowrap">外国人材・</span>
            <span className="lg:block lg:whitespace-nowrap">実習生のみなさまへ</span>
          </>
        }
        width="default"
        lead="仕事や生活で困ったときの案内ページです。"
        visual={
          <img
            src="/images/jigyo-sodan-conversation.svg"
            alt=""
            width={842}
            height={843}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
            className="h-auto w-full max-w-[240px] lg:w-[320px] lg:max-w-[320px]"
          />
        }
      >
        <p className="text-center">
          <LinkButton href="/for-workers">案内を見る</LinkButton>
        </p>
      </Section>

      {/* 活動情報。lib/news.ts の文章を静的なカードにしています。 */}
      <Section
        id="news"
        title="活動情報"
        width="wide"
        lead="当組合の活動や、講習・研修の様子を写真でご紹介します。"
      >
        <NewsBoard />
      </Section>

      <Section
        id="contact"
        title="お問い合わせ"
        tone="pale"
        width="wide"
        lead="外国人材の受入れや育成就労制度について、お電話、メール、またはLINEにてご相談いただけます。"
      >
        <ContactMethods />
      </Section>
    </>
  );
}
