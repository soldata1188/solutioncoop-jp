/**
 * ホームの受入れ企業ショーケース。
 * 本番公開前に代表の公開承認が必要（プレビューのみ）
 *
 * ロゴは、公式サイトで商号（株式会社／有限会社の位置）と大阪・関西の所在地が一致し、
 * ヘッダー等の公式ロゴ画像が十分なときだけ入れる。同名が複数ある、公式サイトや
 * ロゴが確認できない、画像が粗い場合は文字カードのままにする。
 */
export const CLIENTS_PUBLISHABLE = false;

export type ClientCard = {
  name: string;
  /** web/public 配下のロゴ。未設定は文字カード */
  logoSrc?: string;
  /** ロゴ画像を取得した公式URL（監査用） */
  logoSourceUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
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
  {
    name: "株式会社村上工業",
    logoSrc: "/clients/murakami-kogyo.png",
    logoSourceUrl: "https://mkkogyo.com/img/header_logo.png",
    logoWidth: 400,
    logoHeight: 78,
  },
  {
    name: "株式会社プライムエコ",
    logoSrc: "/clients/prime-eco.png",
    logoSourceUrl: "https://prime-eco.jp/202005/wp-content/uploads/2019/11/logo_primeeco-1.png",
    logoWidth: 229,
    logoHeight: 80,
  },
  { name: "鉄電塗装株式会社" },
  { name: "林組株式会社" },
  { name: "山村土木興業株式会社" },
  { name: "有限会社高嶋建設" },
  { name: "株式会社オービービー" },
  {
    name: "株式会社ふじえ",
    logoSrc: "/clients/fujie.png",
    logoSourceUrl: "https://www.fujie-web.com/images/logo.jpg",
    logoWidth: 244,
    logoHeight: 50,
  },
  { name: "株式会社スペース・グリーン" },
  { name: "株式会社SHINKO" },
];

export const clientRowTwo: ClientCard[] = [
  {
    name: "ＡＳＩＮＧ有限会社",
    logoSrc: "/clients/asing.png",
    logoSourceUrl: "http://asing-parking.co.jp/images/logo.gif",
    logoWidth: 231,
    logoHeight: 77,
  },
  {
    name: "株式会社タケミ・コーポレーション",
    logoSrc: "/clients/takemi.png",
    logoSourceUrl: "https://eco-roka.jp/wp-content/themes/eco-roka/img/cmn/hd_logo.png",
    logoWidth: 240,
    logoHeight: 60,
  },
  { name: "正栄工業株式会社" },
  { name: "株式会社ケナフエンジニア" },
  { name: "北口精機株式会社" },
  { name: "有限会社野々村鉄筋" },
  { name: "株式会社三栄" },
  { name: "株式会社丸田工業" },
  { name: "株式会社山口商店" },
  { name: "株式会社荒木建設" },
];
