# ソリューション協同組合 新サイト（web/）

Next.js（App Router）+ TypeScript + Tailwind CSS v4 による静的サイトです。データベースはありません。
画面は静的に生成します。サーバーで動くのは、公式Xの投稿キャッシュを捨てる `app/api/x/refresh` だけです。

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

## 環境変数

`.env*` ファイルはコミットしないでください（`.env.example` を参照）。お問い合わせは電話・メール・LINEで受けます。

| 変数名 | 用途 |
| --- | --- |
| `X_BEARER_TOKEN` | 公式Xの投稿取得（X API v2 のアプリ用 Bearer トークン）。未設定のときは投稿欄の代わりに案内だけを表示します。値はサーバーだけで使い、ブラウザへは出しません |
| `X_USER_ID` | 任意。`@KumiaiSol` のユーザーID。設定するとユーザー名からの検索を省略します |
| `X_USE_FIXTURE` | ローカルの見本表示用。`1` のときだけ見本の投稿を出します。`VERCEL=1` の環境では無視されます |
| `X_REFRESH_SECRET` | 手動更新リンクの合言葉。`/api/x/refresh?key=` の値と一致したときだけ投稿キャッシュを破棄します。未設定ならそのURLは 404 です |

投稿の取得に成功した結果は最長1時間キャッシュし、そのあと自動で取り直します。更新用のリンクを開いたときも、待たずに取り直します。取得に失敗した結果はキャッシュせず、案内表示だけ約5分後の再生成で取り直します。
`X_BEARER_TOKEN` と `X_REFRESH_SECRET` をプレビューで使う場合は、Vercel の Preview に登録してください。本番には、使う段になってから同じ名前で登録します。トークンが無い間は、ページは案内表示のままビルドも表示も続きます。

## データの場所

- 組合情報・許可番号: `lib/site.ts`
- ロゴ: `public/brand/SOL_Solution_Coop_2026-11-19_white.png`（白背景。余白を切った 130×88。色と形は 2026-11-19 17:31 の支給画像のまま）。ヘッダーとフッターは高さ 44px。古い `SOL_Solution_Coop_2026-11-19.png` と `SOL_Solution_Coop_official_2026-11-07.jpg` は残しています。favicon・icon・apple-icon は「SOL」だけを白地にしています。SDGs のロゴは変更していません。
