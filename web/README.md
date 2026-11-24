# ソリューション協同組合 新サイト（web/）

Next.js（App Router）+ TypeScript + Tailwind CSS v4 による静的サイトです。データベースはありません。
画面は静的に生成します。公式Xの投稿は `lib/news.ts` に写してあり、ページの表示では X API を呼びません。

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

サイトの表示に環境変数は要りません。`X_BEARER_TOKEN`、`X_USER_ID`、`X_USE_FIXTURE`、`X_REFRESH_SECRET` はもう読みません。Vercel に残っている値は消さなくて構いません。最新情報を足すときは `lib/news.ts` と `public/news/` を編集します。

## データの場所

- 組合情報・許可番号: `lib/site.ts`
- ロゴ: `public/brand/SOL_Solution_Coop_2026-11-19_white.png`（白背景。余白を切った 130×88。色と形は 2026-11-19 17:31 の支給画像のまま）。ヘッダーとフッターは高さ 44px。古い `SOL_Solution_Coop_2026-11-19.png` と `SOL_Solution_Coop_official_2026-11-07.jpg` は残しています。favicon・icon・apple-icon は「SOL」だけを白地にしています。SDGs のロゴは変更していません。
