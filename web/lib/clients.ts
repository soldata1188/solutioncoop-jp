/**
 * ホームの受入れ企業ショーケース。
 * 本番公開前に代表の公開承認が必要（プレビューのみ）
 */
export const CLIENTS_PUBLISHABLE = false;

export type ClientCard = {
  name: string;
};

/** 見出しは下書き。数字は別変数。文言の確定は代表の承認待ち。 */
export const clientCompaniesCount = 83;
export const clientPeopleCount = 639;

export const clientsHeadline = {
  companiesLead: "取引企業数",
  companiesUnit: "社！",
  peopleLead: "外国人材の受入れ累計",
  peopleUnit: "名の実績！",
} as const;

export const clientRowOne: ClientCard[] = [
  { name: "株式会社村上工業" },
  { name: "株式会社プライムエコ" },
  { name: "鉄電塗装株式会社" },
  { name: "林組株式会社" },
  { name: "山村土木興業株式会社" },
  { name: "有限会社高嶋建設" },
  { name: "株式会社オービービー" },
  { name: "株式会社ふじえ" },
  { name: "株式会社スペース・グリーン" },
  { name: "株式会社SHINKO" },
];

export const clientRowTwo: ClientCard[] = [
  { name: "ＡＳＩＮＧ有限会社" },
  { name: "株式会社タケミ・コーポレーション" },
  { name: "正栄工業株式会社" },
  { name: "株式会社ケナフエンジニア" },
  { name: "北口精機株式会社" },
  { name: "有限会社野々村鉄筋" },
  { name: "株式会社三栄" },
  { name: "株式会社丸田工業" },
  { name: "株式会社山口商店" },
  { name: "株式会社荒木建設" },
];
