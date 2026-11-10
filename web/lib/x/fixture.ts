/** ローカル確認用の見本。X API の形に合わせた固定データで、実際の投稿ではありません。 */

export const xFixturePayload = {
  data: [
    {
      id: "2118000000000000004",
      text: "堺市の事務所にて、受入れ企業様との打ち合わせを行いました。育成就労制度に向けた準備についてもご説明しています。",
      created_at: "2026-11-09T01:00:00.000Z",
      attachments: { media_keys: ["3_office"] },
    },
    {
      id: "2118000000000000003",
      text: "公式アカウントを開設しました。技能実習・特定技能の監理団体として、大阪の中小企業様の外国人材受入れをご支援します。#外国人材 #堺市",
      created_at: "2026-11-08T03:00:00.000Z",
      attachments: { media_keys: ["3_sakai"] },
    },
    {
      id: "2118000000000000002",
      text: "金属加工の現場でも、外国人材の方が作業に入っています。受入れ後のフォローも続けています。",
      created_at: "2026-11-07T04:00:00.000Z",
      attachments: { media_keys: ["3_steel"] },
    },
    {
      id: "2118000000000000006",
      text: "受入れ後の定期訪問では、職場でのご様子と生活面のご相談を伺っています。ご不明な点はお気軽にお問い合わせください。",
      created_at: "2026-11-06T06:30:00.000Z",
    },
    {
      id: "2118000000000000005",
      text: "土木の現場では、安全な作業の進め方を送り出し機関と確認しています。",
      created_at: "2026-11-05T02:00:00.000Z",
      attachments: { media_keys: ["3_excavation"] },
    },
    {
      id: "2118000000000000001",
      text: "2027年4月1日施行の育成就労制度について、現在の技能実習からの移行準備を一緒に進めております。",
      created_at: "2026-11-04T02:15:00.000Z",
    },
    {
      id: "2118000000000000000",
      text: "これは7件目なので、新しい6件だけを表示します。",
      created_at: "2026-10-01T00:00:00.000Z",
    },
  ],
  includes: {
    media: [
      {
        media_key: "3_office",
        type: "photo",
        url: "/images/office-exterior.webp",
      },
      {
        media_key: "3_sakai",
        type: "photo",
        url: "/images/sakai-lighthouse.webp",
      },
      {
        media_key: "3_steel",
        type: "photo",
        url: "/images/site-steel-workshop.webp",
      },
      {
        media_key: "3_excavation",
        type: "photo",
        url: "/images/site-excavation.webp",
      },
    ],
  },
};
