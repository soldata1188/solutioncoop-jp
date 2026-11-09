# ソリューション協同組合 新サイト（web/）

Next.js（App Router）+ TypeScript + Tailwind CSS v4 による静的サイトです。データベースはありません。
サーバー処理は `app/api/contact/route.ts`（お問い合わせフォーム受付）のみです。

既存の `solutioncoop-app/`（さくらVPSで稼働中の現行サイト）には一切手を加えていません。

## 開発

```bash
cd web
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build && npm start
```

## Vercel 設定（参考）

このアプリはリポジトリ直下ではなく `web/` にあります。Vercel プロジェクトの Root Directory を `web` に設定してください。

## お問い合わせフォームの環境変数

いずれも未設定の場合、フォームは「現在準備中」を返し、メール送信・記録は一切行いません。
`.env*` ファイルはコミットしないでください（`.env.example` を参照）。

| 変数名 | 用途 |
| --- | --- |
| `RESEND_API_KEY` | Resend の API キー（メール通知） |
| `CONTACT_FROM_EMAIL` | 送信元アドレス（Resend で認証済みのドメイン） |
| `CONTACT_TO_EMAIL` | 通知先（省略時 `info@solutioncoop-jp.com`） |
| `SHEETS_WEBHOOK_URL` | Google Apps Script Web アプリの URL（スプレッドシートへ1行追記） |
| `SHEETS_WEBHOOK_SECRET` | 任意。Apps Script 側で照合する共有シークレット |
| `X_BEARER_TOKEN` | 公式Xの投稿取得（X API v2 のアプリ用 Bearer トークン）。未設定のときは投稿欄の代わりに案内だけを表示します。値はサーバーだけで使い、ブラウザへは出しません |
| `X_USER_ID` | 任意。`@KumiaiSol` のユーザーID。設定するとユーザー名からの検索を省略します |
| `X_USE_FIXTURE` | ローカルの見本表示用。`1` のときだけ見本の投稿を出します。`VERCEL=1` の環境では無視されます |

メール通知は `RESEND_API_KEY` と `CONTACT_FROM_EMAIL` の両方が設定された場合のみ有効です。
`X_BEARER_TOKEN` を本番とプレビューで使う場合は、Vercel の Production と Preview に登録してから再デプロイしてください。トークンが無い間は、ページは案内表示のままビルドも表示も続きます。

## データの場所

- 組合情報・許可番号: `lib/site.ts`
- よくある質問（画面表示と FAQPage JSON-LD の共通データ）: `lib/faq.ts`
- ロゴ: 公式画像 `public/brand/SOL_Solution_Coop_official_2026-11-07.jpg`（1500×1200。緑地、白の S/L、淡い黄色の O、下段の「Solution Coop」）。ヘッダーとフッターはこの全体を同じ比率で表示します。`sol-logo-main-512.png` は同じ全体の縮小です。favicon・icon・apple-icon・OGP は、ロゴと同じ緑の余白の中に全体を収めています。SDGs のロゴは変更していません。
