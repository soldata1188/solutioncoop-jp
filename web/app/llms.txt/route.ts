import { SITE_URL, fullAddress, licenses, org } from "@/lib/site";

/**
 * /llms.txt（https://llmstxt.org/ の形式）。ビルド時に静的生成します。
 * 掲載するのは代表者様に確認済みの情報のみです（個人名や未確認の数値・許可は記載しません）。
 * URL はサイトマップと同じ SITE_URL を使用します。
 */
export const dynamic = "force-static";

const u = (path: string) => (path === "/" ? SITE_URL : `${SITE_URL}${path}`);

const body = `# ${org.name}

> 大阪府堺市堺区の監理団体（技能実習法に基づく一般監理事業の許可 ${licenses.kanri.number}）・登録支援機関（${licenses.toroku.number}）です。堺市・大阪府内の中小企業様（建設、機械・金属、食品製造など）の外国人材受入れをご支援しています。

- 所在地: ${fullAddress}
- 電話: ${org.tel} / FAX: ${org.fax} / メール: ${org.email}
- 主な対応地域: 堺市・大阪府
- 連携する送り出し国: ベトナム、インドネシア、フィリピン
- 技能実習生の受入れ実績: ${org.terms}
- 受入れ企業数: ${org.clients}
- 表彰: ${org.award}
- 育成就労制度は2027年4月1日施行です。

## 主なページ

- [トップページ](${u("/")}): 当組合の概要と外国人材受入れのご支援内容
- [最新情報](${u("/#news")}): 公式アカウントの投稿を、新しい順に掲載
- [よくある質問](${u("/faq")}): 制度や受入れに関するご質問と回答
- [外国人材・実習生のみなさまへ](${u("/for-workers")}): 実習生向けの相談窓口（Messenger・LINE・電話）
- [組合概要](${u("/about")}): 所在地・連絡先・受入れ実績・許可番号・登録番号
- [情報公開](${u("/about")}#disclosure): 監理支援機関の業務の運営に関する規程（監理費表を含む）、個人情報適正管理規程、監理団体許可証
- [メールでのお問い合わせ](${u("/contact")}): お電話またはフォームでのご相談

## その他

- [サイトマップ](${u("/sitemap.xml")})
- [個人情報保護方針](${u("/privacy")})
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
