export const SITE_URL = "https://solutioncoop-jp.com";

export const org = {
  name: "ソリューション協同組合",
  postalCode: "590-0953",
  // 住所表記は「堺市堺区」で記載。正式表記は要確認。
  region: "大阪府",
  locality: "堺市堺区",
  street: "甲斐町東4丁2番2号",
  tel: "072-224-8067",
  fax: "072-224-2214",
  email: "info@solutioncoop-jp.com",
  /** 以下3項目は代表者様に確認済み（2026年11月1日）。集計時点の日付は未確認のため表示しません */
  terms: "65期",
  clients: "80社以上",
  award: "令和8年 大阪府知事表彰",
  representative: "新 雅志",
};

/** 許可・登録の名称と番号。フッター、ホーム、許可証の枠、llms.txt で使います。 */
export const licenses = {
  kanri: {
    label: "監理団体許可（技能実習法）",
    number: "許1708000610",
    kind: "一般監理事業",
  },
  toroku: {
    label: "登録支援機関（特定技能）",
    number: "19登-001221",
  },
};

/**
 * 「SDGs未来都市・堺」関連（堺市の公式ページで確認した事実のみ）。
 * 選定：堺市「SDGs未来都市」ページ「堺市は、平成30年（2018年）6月、SDGs未来都市に大阪府内の自治体で初めて選定され…」
 * 応援の一文は、堺市「ロゴマーク使用ガイド」が定める表現『[他の主体名]は、SDGs未来都市・堺を応援しています。』に従います。
 */
export const sdgs = {
  support: "ソリューション協同組合は、SDGs未来都市・堺を応援しています。",
  /** support を改行してよい位置で2つに分けたもの（1〜2行で表示するため） */
  supportParts: ["ソリューション協同組合は、", "SDGs未来都市・堺を応援しています。"],
  heading: "SDGs未来都市・堺",
  badge: "SDGs未来都市・堺を応援しています",
  selected: "堺市は、平成30年（2018年）6月、国から「SDGs未来都市」に選定されました。",
  sourceUrl: "https://www.city.sakai.lg.jp/shisei/toshi/sdgs/",
  sourceLabel: "堺市「SDGs未来都市」",
} as const;

/** トップの実績。label が上、value が下（最大の文字）。各文言はここ一度だけ。 */
export const achievements = [
  { label: "技能実習生受入れ実績", value: "65期", count: 65, unit: "期" },
  { label: "受入れ企業数", value: "80社以上", count: 80, unit: "社以上" },
  { label: "令和8年", value: "大阪府知事表彰" },
];

export const fullAddress = `〒${org.postalCode} ${org.region}${org.locality}${org.street}`;

/** ヘッダー・フッター・モバイルメニュー。ホーム内の節は実在する id へ飛ばします */
export const nav = [
  { href: "/#business", label: "事業内容" },
  { href: "/#reasons", label: "選ばれる理由" },
  { href: "/for-workers", label: "実習生の方へ" },
  { href: "/#news", label: "活動情報" },
  { href: "/about", label: "組合概要" },
  { href: "/about#disclosure", label: "情報公開" },
];

/** モバイルメニューはヘッダーと同じ順 */
export const allPages = [...nav];

/** 電話リンク（全ページのCTAで使用） */
export const TEL_HREF = "tel:0722248067";

/**
 * LINE公式アカウント（@122kbyao）の友だち追加・トーク画面へのリンク。
 * 公式の lin.ee 短縮リンクを発行した場合は、この定数だけを差し替えてください。
 */
export const LINE_URL = "https://line.me/R/ti/p/@122kbyao";
export const LINE_LABEL = "LINEで無料相談";
export const LINE_ARIA = "LINEで無料相談する（新しいタブで開きます）";

/** 公式 Facebook ページ。 */
export const FACEBOOK_URL = "https://www.facebook.com/solution.sakai";
/** Messenger のスレッド。空のときは FACEBOOK_URL をボタンとQRに使います。 */
export const MESSENGER_URL = "https://m.me/solution.sakai";

/** 相談カードのボタンとQRが開くURL。Messenger が空なら Facebook ページです。 */
export function consultMessengerHref(messenger = MESSENGER_URL, facebook = FACEBOOK_URL) {
  return messenger.trim() || facebook.trim();
}

/**
 * 既存リポジトリ（solutioncoop-app/・gino-jisshu.html・index16.html）に記載のある情報。
 * 記載どうしで食い違いがある、または代表者様の確認が済んでいないため、表示時は必ず「要確認」を付けます。
 * ただし established（設立）と confirmed: true の沿革項目は代表者様に確認済みのため、要確認を付けません。
 */
export const repoFacts = {
  /** 代表者様に確認済み（2026年11月1日） */
  established: "2012年3月",
  /** 代表者様に確認済み（2026年11月9日） */
  hours: "平日 9:00〜18:00（土日祝休み）",
  /** 沿革（index16.html の記載。年表の各項目は要確認） */
  history: [
    { year: "2012年（平成24年）3月", text: "設立", confirmed: true },
    { year: "2017年（平成29年）12月", text: "監理団体の許可（一般監理事業）を取得", confirmed: true },
    { year: "2019年（令和元年）7月", text: "登録支援機関として登録", confirmed: true },
    { year: "令和8年（2026年）", text: "大阪府知事表彰を受賞", confirmed: true },
    { year: "2024年（令和6年）10月", text: "第50期生の受入れ", confirmed: true },
  ] as { year: string; text: string; confirmed?: boolean }[],
};

export const CONTACT_HREF = "/#contact";
/** ホームのお問い合わせ節へのボタンの文言（代表者様のご指示により全ボタンで統一） */
export const CONTACT_LABEL = "メールでのお問い合わせ";
/** 電話ボタンの読み上げ名（アイコンのみのボタン用） */
export const TEL_ARIA = "お電話でのご相談";

/** Organization / LocalBusiness（確認済みの情報のみ。営業時間は平日 9:00〜18:00） */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: org.name,
  url: SITE_URL,
  sameAs: [FACEBOOK_URL],
  logo: `${SITE_URL}/brand/SOL_Solution_Coop_2026-11-19_white.png`,
  image: `${SITE_URL}/brand/SOL_Solution_Coop_2026-11-19_white.png`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: { "@type": "AdministrativeArea", name: "大阪府" },
  telephone: "+81-72-224-8067",
  faxNumber: "+81-72-224-2214",
  email: org.email,
  address: {
    "@type": "PostalAddress",
    postalCode: org.postalCode,
    addressRegion: org.region,
    addressLocality: org.locality,
    streetAddress: org.street,
    addressCountry: "JP",
  },
  award: org.award,
  identifier: [
    { "@type": "PropertyValue", name: "監理団体許可番号", value: "許1708000610" },
    { "@type": "PropertyValue", name: "登録支援機関登録番号", value: "19登-001221" },
  ],
};

/** パンくずリストの構造化データ */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "ホーム", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
