import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/flow",
  "受入れの流れ｜大阪の外国人材受入れ",
  "育成就労制度での外国人材受入れの流れを、お申込みから面接、申請、入国、配属まで13の手順でご説明いたします。お問い合わせからご契約までの目安は約1〜2週間です。",
);

const steps: { title: string; body: string; badge?: string; check?: string }[] = [
  { title: "お申込み", body: "お問い合わせ・ヒアリングを経て、内容にご納得いただいたうえでお申込みいただきます。", badge: "最初のお問い合わせからご契約まで約1〜2週間" },
  { title: "必要書類の準備", body: "受入れに必要な書類を、当組合がご案内しながらご準備いただきます。" },
  { title: "現地への求人依頼", body: "連携する送り出し機関に、貴社の求人内容をお伝えします。" },
  { title: "Web面接", body: "オンラインで面接を行い、貴社に合った人材を選考いただきます。" },
  { title: "申請書類の作成", body: "育成就労計画などの申請書類を、当組合がサポートして作成いたします。" },
  { title: "機構への申請", body: "計画の認定を受けるため、所管の機構へ申請いたします。", check: "申請先の正式名称を確認中" },
  { title: "入管への申請", body: "在留資格に関する申請を出入国在留管理庁へ行います。" },
  { title: "在留資格の交付", body: "審査を経て、在留資格に関する書類が交付されます。" },
  { title: "入国準備", body: "送り出し国での入国前講習や渡航の準備を進めます。" },
  { title: "上陸・入国", body: "人材が日本に入国いたします。" },
  { title: "上陸後講習（1か月）", body: "日本語や生活ルールなどについて、1か月の集合研修を行います。" },
  { title: "企業様へ配属", body: "貴社での就労が始まります。", badge: "面接から配属まで約5〜6か月", check: "平均期間を確認中" },
  { title: "育成就労（原則3年間）", body: "配属後は原則3年間、当組合が定期的な訪問やご相談への対応を通じて、受入れ企業様と人材の双方をご支援いたします。" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        title="外国人材 受入れの流れ"
        lead="育成就労制度でインドネシアから人材を受け入れる場合の、お申込みから配属までの13の手順をご紹介いたします。国や時期により手順・期間が異なる場合がございます。"
      />
      <Section width="narrow" flushBottom>
        <aside role="note" className="rounded-md border-2 border-amber-600 bg-amber-50 p-5 text-amber-950">
          本ページの手順・期間は目安・暫定（改訂6版・2026年10月31日時点）です。育成就労制度の運用により変更となる可能性がございます。<CheckBadge />
        </aside>
      </Section>
      <Section width="narrow">
        <ol className="relative">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0 md:gap-6">
              {i < steps.length - 1 ? <span aria-hidden="true" className="absolute left-[21px] top-11 bottom-0 w-0.5 bg-navy-100" /> : null}
              <span aria-hidden="true" className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-navy-900 font-bold text-white">{i + 1}</span>
              <div className="flex-1 rounded-md border border-line bg-white p-5 shadow-card">
                <h2 className="text-lg font-bold leading-snug text-navy-900 md:text-xl">
                  <span className="sr-only">手順{i + 1}：</span>{s.title}
                </h2>
                <p className="mt-2 text-[15px] text-muted">{s.body}</p>
                {s.badge ? <p className="mt-3 inline-block rounded-full bg-navy-900 px-4 py-1 text-sm font-bold text-white">{s.badge}</p> : null}
                {s.check ? <p className="mt-2 text-sm text-muted">{s.check}<CheckBadge /></p> : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <CtaSection />
    </>
  );
}
