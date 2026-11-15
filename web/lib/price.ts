/**
 * 料金ページの金額。
 * status が placeholder の項目は表示を「○○円（要確認）」のままにし、Bossの確認後に display と status だけ差し替える。
 * 本番公開は、placeholder が無くなるまで行わない。
 */

export type PriceStatus = "confirmed" | "placeholder" | "actual-cost";

/** 費用を載せる段階。coop は組合費。other は支払時期を断定しない。 */
export type PriceStage = "before" | "entry" | "orientation" | "during" | "return" | "coop" | "other";

export type PriceSystem = "both" | "ginou" | "ikusei";

export type PriceItem = {
  id: string;
  label: string;
  display: string;
  status: PriceStatus;
  stage: PriceStage;
  system: PriceSystem;
  tag?: string;
  note?: string;
};

export const PLACEHOLDER_AMOUNT = "○○円（要確認）";

export const priceNotes = [
  "金額は概算です。特記のない限り税別です。",
  "詳細はお見積りいたします。",
  "送出国・職種・人数により異なります。",
] as const;

export const priceStages: { id: Exclude<PriceStage, "coop" | "other">; label: string }[] = [
  { id: "before", label: "入国前" },
  { id: "entry", label: "入国時" },
  { id: "orientation", label: "入国後講習" },
  { id: "during", label: "実習中（月額）" },
  { id: "return", label: "帰国時" },
];

export const priceItems: PriceItem[] = [
  {
    id: "annual-fee",
    label: "年会費",
    display: "0円",
    status: "confirmed",
    stage: "coop",
    system: "both",
  },
  {
    id: "referral-fee",
    label: "人材紹介手数料（当組合）",
    display: "0円",
    status: "confirmed",
    stage: "coop",
    system: "both",
  },
  {
    id: "capital",
    label: "出資金",
    display: "10,000円（1口）",
    status: "confirmed",
    stage: "coop",
    system: "both",
    note: "脱退時の取扱いは定款に基づきます（要確認）",
  },
  {
    id: "ginou-cert",
    label: "技能実習計画認定手数料",
    display: "3,900円／件",
    status: "confirmed",
    stage: "before",
    system: "ginou",
    tag: "公的手数料",
  },
  {
    id: "ikusei-cert",
    label: "育成就労計画認定手数料",
    display: "6,100円／件",
    status: "confirmed",
    stage: "before",
    system: "ikusei",
    tag: "公的手数料",
  },
  {
    id: "pre-training",
    label: "入国前講習費",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "before",
    system: "both",
  },
  {
    id: "documents",
    label: "書類作成費",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "before",
    system: "both",
  },
  {
    id: "health-check",
    label: "健康診断",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "before",
    system: "both",
  },
  {
    id: "initial-fee",
    label: "着手金",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "before",
    system: "both",
  },
  {
    id: "airfare",
    label: "航空券",
    display: "実費",
    status: "actual-cost",
    stage: "entry",
    system: "both",
  },
  {
    id: "residence",
    label: "在留手続手数料",
    display: "実費",
    status: "actual-cost",
    stage: "entry",
    system: "both",
  },
  {
    id: "post-training",
    label: "入国後講習費",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "orientation",
    system: "both",
  },
  {
    id: "training-allowance",
    label: "講習手当",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "orientation",
    system: "both",
  },
  {
    id: "kanri-monthly",
    label: "監理費（月額）",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "during",
    system: "both",
  },
  {
    id: "sending-monthly",
    label: "送出機関管理費（月額）",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "during",
    system: "both",
  },
  {
    id: "return-cost",
    label: "帰国費",
    display: "実費",
    status: "actual-cost",
    stage: "return",
    system: "both",
    note: "受入企業さまのご負担です。",
  },
  {
    id: "insurance",
    label: "保険",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "other",
    system: "both",
  },
  {
    id: "exam-fee",
    label: "技能検定受検料",
    display: PLACEHOLDER_AMOUNT,
    status: "placeholder",
    stage: "other",
    system: "both",
  },
];

export function itemsFor(system: "ginou" | "ikusei", stage: PriceStage) {
  return priceItems.filter((item) => item.stage === stage && (item.system === "both" || item.system === system));
}

export const pricePlaceholders = priceItems.filter((item) => item.status === "placeholder");

export const priceFaqs = [
  {
    q: "年会費はかかりますか。",
    a: "年会費は0円です。金額は概算で、特記のない限り税別です。詳細はお見積りいたします。",
  },
  {
    q: "人材紹介手数料はかかりますか。",
    a: "当組合の人材紹介手数料は0円です。その他の費用は、送出国・職種・人数により異なります。",
  },
  {
    q: "出資金はいくらですか。",
    a: "出資金は10,000円（1口）です。脱退時の取扱いは定款に基づきます（要確認）。",
  },
  {
    q: "計画の認定手数料はいくらですか。",
    a: "公的手数料として、技能実習計画認定手数料は3,900円／件、育成就労計画認定手数料は6,100円／件です。",
  },
  {
    q: "帰国の費用は誰が負担しますか。",
    a: "帰国費は実費で、受入企業さまのご負担です。航空券と在留手続手数料も実費です。",
  },
  {
    q: "掲載している金額は確定ですか。",
    a: "金額は概算です。特記のない限り税別です。送出国・職種・人数により異なります。詳細はお見積りいたします。○○円（要確認）と記載した項目は、金額が未定です。",
  },
] as const;
