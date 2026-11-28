/**
 * ホームの受入れ企業ショーケース。
 * 本番公開前に代表の公開承認が必要（プレビューのみ）
 *
 * データの入れ方:
 * - 1件は clientCompanies に追加する。列は分けて書かない。
 * - 文字だけの社は、すでに公開承認した20社だけ。それ以外は、公式ロゴが取れた社だけ足す。
 * - 公式サイトで商号（株式会社／有限会社の位置）が一致し、サイトに書かれた市区町村が
 *   受入れ名簿の市区町村と一致し、ロゴ画像が十分なときだけ logoSrc を付ける。ロゴは描かない。
 * - 代表から渡されたロゴファイルは、サイトから取った画像より優先する。
 * - 表示するのは logoSrc がある社だけ。名前だけの社はデータに残しても帯には出さない。
 * - 2列は交互に配る。上の列が先頭から1,3,5社目、下の列が2,4,6社目。
 */
export const CLIENTS_PUBLISHABLE = false;

export type ClientCard = {
  name: string;
  /** web/public 配下のロゴ。未設定は文字だけ */
  logoSrc?: string;
  /** ロゴ画像を取得した公式URL（監査用） */
  logoSourceUrl?: string;
  logoWidth?: number;
  logoHeight?: number;
};

/** 見出しは下書き。数字は別変数。文言の確定は代表の承認待ち。 */
export const clientCompaniesCount = 83;
export const clientPeopleCount = 839;

export const clientsHeadline = {
  companiesLead: "取引企業数",
  companiesUnit: "社！",
  peopleLead: "外国人材の受入れ累計",
  peopleUnit: "名の実績！",
} as const;

/** 文言は代表の承認待ち（プレビューのみ） */
export const clientStripSubline = "地域を支える優良企業の皆さまに、外国人材受入れのパートナーとして選ばれています。";

/** 受入れ企業。ロゴの有無にかかわらず追加順で書く。帯に出るのは visibleClientCompanies だけ。 */
export const clientCompanies: ClientCard[] = [
  {
    name: "株式会社村上工業",
    logoSrc: "/clients/murakami-kogyo.png",
    logoSourceUrl: "Boss cung cấp 28/11",
    logoWidth: 442,
    logoHeight: 198,
  },
  {
    name: "株式会社プライムエコ",
    logoSrc: "/clients/prime-eco.png",
    logoSourceUrl: "https://prime-eco.jp/202005/wp-content/uploads/2019/11/logo_primeeco-1.png",
    logoWidth: 229,
    logoHeight: 80,
  },
  {
    name: "鉄電塗装株式会社",
    logoSrc: "/clients/tetsuden-tosou.png",
    logoSourceUrl: "Boss 提供 2026-11-28",
    logoWidth: 230,
    logoHeight: 80,
  },
  { name: "林組株式会社" },
  { name: "山村土木興業株式会社" },
  {
    name: "有限会社高嶋建設",
    logoSrc: "/clients/takashima.png",
    logoSourceUrl: "https://takashimakensetsu.com/cms/wp-content/uploads/2017/02/takashimakensetsu_logo.png",
    logoWidth: 80,
    logoHeight: 80,
  },
  {
    name: "株式会社オービービー",
    logoSrc: "/clients/obb.png",
    logoSourceUrl: "Boss 提供 2026-11-28",
    logoWidth: 206,
    logoHeight: 62,
  },
  {
    name: "株式会社ふじえ",
    logoSrc: "/clients/fujie.png",
    logoSourceUrl: "https://www.fujie-web.com/images/logo.jpg",
    logoWidth: 244,
    logoHeight: 50,
  },
  { name: "株式会社スペース・グリーン" },
  { name: "株式会社SHINKO" },
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
  {
    name: "正栄工業株式会社",
    logoSrc: "/clients/shoei.png",
    logoSourceUrl: "https://xs361550.xsrv.jp/wp-content/uploads/2022/11/logo-shoei-680x280-2.png",
    logoWidth: 197,
    logoHeight: 80,
  },
  { name: "株式会社ケナフエンジニア" },
  { name: "北口精機株式会社" },
  { name: "有限会社野々村鉄筋" },
  { name: "株式会社三栄" },
  {
    name: "株式会社丸田工業",
    logoSrc: "/clients/maruta.png",
    logoSourceUrl: "https://maruta-kougyou.com/wp-content/themes/tpl-theme/images/common/logo.png",
    logoWidth: 468,
    logoHeight: 78,
  },
  {
    name: "株式会社山口商店",
    logoSrc: "/clients/yamaguchi.png",
    logoSourceUrl: "https://www.yamaguchi-inc.biz/wp-content/uploads/2026/10/logo.png",
    logoWidth: 243,
    logoHeight: 53,
  },
  { name: "株式会社荒木建設" },
  {
    name: "株式会社矢野組",
    logoSrc: "/clients/yanogumi.png",
    logoSourceUrl: "https://www.yanogumi.jp/img/common/logo.jpg",
    logoWidth: 324,
    logoHeight: 51,
  },
  {
    name: "株式会社弘翔建工",
    logoSrc: "/clients/kousyo.png",
    logoSourceUrl: "https://kousyo.jp/wp-content/uploads/2023/01/cropped-iogo.png",
    logoWidth: 433,
    logoHeight: 80,
  },
  {
    name: "株式会社トラストグリーン",
    logoSrc: "/clients/trustgreen.png",
    logoSourceUrl: "https://cdn.cuezilla-cms.com/trustgreen0720.com/images/743/c9kT70SUSI.webp",
    logoWidth: 400,
    logoHeight: 80,
  },
  {
    name: "株式会社ヤマエ",
    logoSrc: "/clients/yamae.png",
    logoSourceUrl: "https://yamae.jp/yamae_sp/wp-content/uploads/2024/07/logo.gif",
    logoWidth: 160,
    logoHeight: 45,
  },
  {
    name: "谷川工業株式会社",
    logoSrc: "/clients/canyonriver.png",
    logoSourceUrl: "http://www.canyonriver.co.jp/common/img/logo.png",
    logoWidth: 503,
    logoHeight: 51,
  },
];

function hasVerifiedLogo(company: ClientCard): boolean {
  return Boolean(company.logoSrc);
}

/** 帯に出す社。logoSrc があるものだけ。 */
export function visibleClientCompanies(companies: readonly ClientCard[] = clientCompanies): ClientCard[] {
  return companies.filter(hasVerifiedLogo);
}

/** 交互に2列へ配る。上の列が先。 */
export function splitClientRows(companies: readonly ClientCard[]): { rowOne: ClientCard[]; rowTwo: ClientCard[] } {
  const rowOne: ClientCard[] = [];
  const rowTwo: ClientCard[] = [];
  companies.forEach((company, index) => {
    (index % 2 === 0 ? rowOne : rowTwo).push(company);
  });
  return { rowOne, rowTwo };
}

const visibleRows = splitClientRows(visibleClientCompanies());

export const clientRowOne: readonly ClientCard[] = visibleRows.rowOne;
export const clientRowTwo: readonly ClientCard[] = visibleRows.rowTwo;
