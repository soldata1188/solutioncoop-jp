import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { Photo } from "@/components/Photo";
import { Section, LinkButton } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { licenses } from "@/lib/site";
import { photos } from "@/lib/images";

export const metadata = pageMeta(
  "/support",
  "受入れ後の支援｜監査・訪問指導・生活支援",
  "外国人材の配属後も、当組合が定期的な監査・訪問指導、病院の受診や役所の手続きなど生活面のご相談への対応、ベトナム・インドネシア・フィリピンの送り出し機関との連携を通じて、受入れ企業様を支えます。",
);

type Item = { title: string; body: string; check?: string };

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
  {
    title: "当組合独自の訪問の頻度",
    body: "法令で定められた頻度に加えた訪問（毎月の訪問など）の実施については、社内資料に記載がありますが、現在確認中です。",
    check: "訪問頻度",
  },
];

const life: Item[] = [
  {
    title: "上陸後講習（1か月）",
    body: "入国後の1か月間、日本語や生活ルール、安全に関することなどを学んでいただいたうえで、企業様へ配属いたします。",
  },
  {
    title: "入居時のオリエンテーション",
    body: "ごみの出し方、騒音、自転車の交通ルールなど、地域で暮らすための基本的なルールをご説明します。",
    check: "実施内容",
  },
  {
    title: "通院・手続きのサポート",
    body: "病院の受診や役所での手続きなど、生活の中で困りごとがあったときのご相談に対応いたします。",
    check: "対応範囲",
  },
  {
    title: "生活の相談への対応",
    body: "仕事や生活の悩みを早めに把握し、受入れ企業様と連携して解決を図ります。人材の定着のための大切なご支援です。",
  },
];

const countries = [
  { name: "ベトナム", lang: "ベトナム語" },
  { name: "インドネシア", lang: "インドネシア語" },
  { name: "フィリピン", lang: "タガログ語" },
];

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((it) => (
        <li key={it.title} className="border-l-4 border-primary bg-white p-5 shadow-card">
          <h3 className="font-bold text-ink">
            {it.title}
            {it.check ? <CheckBadge /> : null}
          </h3>
          <p className="mt-2 text-[15px]">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="受入れ後の支援"
        path="/support"
        lead="外国人材が配属された後も、当組合が受入れ企業様と人材の双方を支えます。監査・訪問指導から生活面のご相談まで、継続してご支援いたします。"
      />

      <Section id="audit" title="監査・訪問指導">
        <ItemList items={audit} />
      </Section>

      <Section id="life" title="生活面のご支援" tone="pale">
        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          <Photo photo={photos.fireDrill} sizes="(min-width: 640px) 390px, 100vw" caption="入国後講習での消火訓練の様子" />
          <Photo photo={photos.practice} sizes="(min-width: 640px) 390px, 100vw" caption="講習での実技練習の様子" />
        </div>
        <ItemList items={life} />
      </Section>

      <Section id="countries" title="ベトナム・インドネシア・フィリピンの人材に対応">
        <p className="text-[15px]">当組合は、ベトナム・インドネシア・フィリピンの送り出し機関と連携しております。</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {countries.map((c) => (
            <li key={c.name} className="border-t-4 border-primary bg-pale p-5 text-center">
              <p className="text-lg font-bold text-ink">{c.name}</p>
              <p className="mt-1 text-sm">送り出し機関と連携</p>
              <p className="mt-1 text-sm">{c.lang}での相談対応<CheckBadge /></p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          ※母国語での相談窓口（24時間対応を含む）については社内資料に記載がありますが、対応時間・体制は現在確認中です。
        </p>
      </Section>

      <Section id="tokutei" title="特定技能の方への支援" tone="pale" width="narrow">
        <p>
          当組合は登録支援機関（登録番号：{licenses.toroku.number}）として、特定技能1号の外国人の方への法令に基づく支援（生活オリエンテーション、相談への対応、定期的な面談など）を、受入れ企業様から受託することができます。
        </p>
        <div className="mt-8 grid items-center gap-5 sm:grid-cols-2">
          <Photo photo={photos.trainingPlate} sizes="(min-width: 640px) 290px, 100vw" />
          <p className="text-[15px]">
            当組合の研修センターです。講習などに使用しております。
            <span className="mt-1 block text-sm text-muted">所在地・利用内容の詳細<CheckBadge /></span>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/flow" variant="dark" className="min-h-14 sm:flex-1">受入れの流れを見る</LinkButton>
          <LinkButton href="/faq" variant="outlineCta" className="min-h-14 sm:flex-1">よくある質問</LinkButton>
        </div>
      </Section>

      <CtaSection title="受入れ後のご支援について、お気軽にご相談ください。" />
    </>
  );
}
