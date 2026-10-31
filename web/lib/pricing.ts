/**
 * 費用データ（国別）。新しい送り出し国を追加する場合は `pricingByCountry` にキーを追加してください。
 * 出典：SOL.2026.04I 育成就労×インドネシア 費用一覧（改訂6 発行版、2026年10月31日時点）
 * ※すべて暫定値（技能実習の料金を転記）。育成就労の正式単価は未確定。
 * 金額はすべて1名あたり・税別（非課税・実費の項目は備考に記載）。
 */
export type CostRow = {
  item: string;
  amount: string;
  note?: string;
  /** 未確定のため「要確認」を表示する */
  needsCheck: boolean;
  /** 要確認の理由 */
  checkReason?: string;
};

export type CostGroup = { title: string; step?: string; rows: CostRow[] };

export type CountryPricing = {
  countryLabel: string;
  docNo: string;
  version: string;
  asOf: string;
  groups: CostGroup[];
};

const PROVISIONAL = "暫定（技能実習の料金を転記。育成就労の正式単価は未確定）";

export const pricingByCountry: Record<string, CountryPricing> = {
  indonesia: {
    countryLabel: "インドネシア",
    docNo: "SOL.2026.04I",
    version: "改訂6版",
    asOf: "2026年10月31日",
    groups: [
      {
        title: "初期費用（ご加入時）",
        step: "手順1",
        rows: [
          { item: "組合加入出資金", amount: "10,000円", note: "脱退時に全額返金・課税対象外", needsCheck: true, checkReason: PROVISIONAL },
          { item: "人材紹介料", amount: "0円", note: "当組合は無料", needsCheck: true, checkReason: PROVISIONAL },
          { item: "ビザ申請書類作成費", amount: "0円", note: "当組合は無料", needsCheck: true, checkReason: PROVISIONAL },
        ],
      },
      {
        title: "入国前",
        step: "手順3〜9",
        rows: [
          { item: "入国前講習委託費", amount: "15,000円", note: "送り出し機関・非課税", needsCheck: true, checkReason: "育成就労での取扱いを確認中" },
        ],
      },
      {
        title: "機構申請時",
        step: "手順6",
        rows: [
          { item: "計画認定等手数料", amount: "6,100円", note: "申請先機構の正式名称は確認中", needsCheck: true, checkReason: "育成就労での正式名称・手数料を確認中" },
        ],
      },
      {
        title: "入国時〜上陸後講習",
        step: "手順10〜11",
        rows: [
          { item: "上陸後講習費用一式", amount: "70,000円", note: "1か月の集合研修", needsCheck: true, checkReason: PROVISIONAL },
          { item: "上陸後講習手当", amount: "60,000円", note: "ご本人へ支給・非課税", needsCheck: true, checkReason: PROVISIONAL },
          { item: "総合保険（任意）", amount: "23,830円", note: "3年分一括", needsCheck: true, checkReason: "育成就労向けの保険商品名を確認中" },
          { item: "航空運賃（片道）", amount: "50,000〜80,000円", note: "実費", needsCheck: true, checkReason: "実費のため変動・金額を確認中" },
        ],
      },
      {
        title: "入国後（毎月）",
        step: "手順12〜13・原則3年間",
        rows: [
          { item: "監理費（当組合）", amount: "25,000円／月", needsCheck: true, checkReason: PROVISIONAL },
          { item: "送り出し機関管理費", amount: "5,000円／月", needsCheck: true, checkReason: PROVISIONAL },
          { item: "月額合計", amount: "30,000円／月", note: "配属後、原則3年間", needsCheck: true, checkReason: PROVISIONAL },
        ],
      },
      {
        title: "その他（必要に応じて）",
        rows: [
          { item: "雇入れ時健康診断", amount: "10,250円", note: "ご要望時のみ", needsCheck: true, checkReason: "金額を確認中" },
          { item: "宿舎・家電等", amount: "企業様ご負担", note: "家賃控除の目安は20,000円以下", needsCheck: true, checkReason: PROVISIONAL },
        ],
      },
      {
        title: "技能検定・在留更新時（配属後）",
        rows: [
          { item: "技能検定等（基礎級）", amount: "21,300円（建設機械は34,000円）", needsCheck: true, checkReason: "育成就労での試験体系を確認中" },
          { item: "技能検定等（3級）", amount: "基礎級と同額", needsCheck: true, checkReason: "育成就労での試験体系を確認中" },
          { item: "在留更新の印紙代", amount: "実費", needsCheck: true, checkReason: "金額を確認中" },
        ],
      },
    ],
  },
};

export const DEFAULT_COUNTRY = "indonesia";
