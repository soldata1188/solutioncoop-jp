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
  staff: "10名",
  managed: "約360名",
  representative: "新 雅志",
};

/** 許可・登録情報（許可証・登録通知の記載内容。画像は掲載しない） */
export const licenses = {
  kanri: {
    label: "監理団体許可（技能実習法）",
    number: "許1708000610",
    kind: "一般監理事業",
    corpType: "中小企業団体",
    grantedOn: "平成29年12月1日",
    validity: "令和4年12月1日から令和11年11月30日まで",
    conditions: [
      "介護職種の介護作業を除く",
      "取扱職種は、技能実習計画作成指導者が在籍する範囲",
      "受入国籍は、相談体制を構築済みの範囲",
    ],
  },
  toroku: {
    label: "登録支援機関（特定技能）",
    number: "19登-001221",
    registeredOn: "2019年7月18日",
    validity: "2024年7月18日から2029年7月17日まで",
  },
};

export const fullAddress = `〒${org.postalCode} ${org.region}${org.locality}${org.street}`;

/** ヘッダーのメニュー（PC表示の幅に収まる7項目） */
export const nav = [
  { href: "/ikusei-shuro", label: "育成就労制度とは" },
  { href: "/compare", label: "制度の比較" },
  { href: "/flow", label: "受入れの流れ" },
  { href: "/support", label: "受入れ後の支援" },
  { href: "/pricing", label: "費用・料金" },
  { href: "/faq", label: "よくある質問" },
  { href: "/about", label: "組合概要" },
];

/** フッター・モバイルメニュー用の全ページ一覧 */
export const allPages = [
  ...nav.slice(0, 2),
  { href: "/roadmap", label: "2027年4月に向けた準備" },
  ...nav.slice(2, 4),
  { href: "/industries", label: "対象業種" },
  ...nav.slice(4),
];

/** 電話リンク（全ページのCTAで使用） */
export const TEL_HREF = "tel:0722248067";

/**
 * LINE公式アカウント（@122kbyao）の友だち追加・トーク画面へのリンク。
 * 公式の lin.ee 短縮リンクを発行した場合は、この定数だけを差し替えてください。
 */
export const LINE_URL = "https://line.me/R/ti/p/@122kbyao";
export const LINE_LABEL = "LINEで相談";
export const LINE_ARIA = "LINEで相談する（新しいタブで開きます）";

/**
 * 既存リポジトリ（solutioncoop-app/・gino-jisshu.html・index16.html）に記載のある情報。
 * 記載どうしで食い違いがある、または代表者様の確認が済んでいないため、表示時は必ず「要確認」を付けます。
 * ただし established（設立）と confirmed: true の沿革項目は代表者様に確認済みのため、要確認を付けません。
 */
export const repoFacts = {
  /** 代表者様に確認済み（2026年11月1日） */
  established: "2012年3月",
  /** gino-jisshu.html「（平日 9:00〜18:00）」。代表者様の確認前のため要確認 */
  hours: "平日 9:00〜18:00",
  /** 沿革（index16.html の記載。年表の各項目は要確認） */
  history: [
    { year: "2012年（平成24年）3月", text: "設立", confirmed: true },
    { year: "2017年（平成29年）12月", text: "監理団体の許可（一般監理事業）を取得", confirmed: true },
    { year: "2019年（令和元年）7月", text: "登録支援機関として登録", confirmed: true },
    { year: "2022年（令和4年）", text: "大阪府知事表彰を受賞（社内資料の記載）" },
    { year: "2024年（令和6年）10月", text: "第50期生の受入れ（社内資料の記載）" },
  ] as { year: string; text: string; confirmed?: boolean }[],
};

export const CONTACT_HREF = "/contact";
export const CONTACT_LABEL = "お問い合わせ・資料請求";

/** Organization / LocalBusiness（確認済みの情報のみ。営業時間などの未確認情報は含めません） */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: org.name,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/icon-512.png`,
  image: `${SITE_URL}/opengraph-image.png`,
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
