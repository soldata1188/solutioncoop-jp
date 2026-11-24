# ソリューション協同組合 新サイト（web/）

Next.js（App Router）+ TypeScript + Tailwind CSS v4 による静的サイトです。データベースはありません。
`npm run build` は静的ファイルを `out/` に書き出します。表示用のサーバー処理はありません。

既存の `solutioncoop-app/`（さくらVPSで稼働中の現行サイト）には一切手を加えていません。

## 開発

```bash
cd web
npm ci
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build        # web/out/ に静的ファイルを書き出す
```

## Vercel 設定（参考）

このアプリはリポジトリ直下ではなく `web/` にあります。Vercel プロジェクトの Root Directory を `web` に設定してください。

## 環境変数

`.env*` ファイルはコミットしないでください（`.env.example` を参照）。お問い合わせは電話・メール・LINEで受けます。

表示に環境変数は要りません。Vercel に残っている値は消さなくて構いません。

## 最新情報の足し方

`lib/news.ts` の `newsItems` の先頭に1件足します。書くのは日付（ISO）、任意のラベル、任意の見出し `title`、本文です。本文は支給された原文のままにし、新しい事実は作りません。

写真を出すときは `imageAlt` を書き、次の6ファイルを `public/news/` に置きます。

- `{id}-320.avif` `{id}-320.webp`
- `{id}-480.avif` `{id}-480.webp`
- `{id}-640.avif` `{id}-640.webp`

写真が無いときは `imageAlt` を省きます。カードはリンクではありません。640px 未満で枚数が奇数のとき、最後の1枚だけ横幅いっぱいになります。

## データの場所

- 組合情報・許可番号: `lib/site.ts`
- ロゴ: `public/brand/SOL_Solution_Coop_2026-11-19_white.png`（白背景。余白を切った 130×88。色と形は 2026-11-19 17:31 の支給画像のまま）。ヘッダーとフッターは高さ 44px。古い `SOL_Solution_Coop_2026-11-19.png` と `SOL_Solution_Coop_official_2026-11-07.jpg` は残しています。favicon・icon・apple-icon は「SOL」だけを白地にしています。SDGs のロゴは変更していません。
