import type { Metadata } from "next";
import { SITE_URL, org } from "./site";

/** OGP 画像（白背景の公式ロゴを 1200×630 に配置。ページ側で openGraph を上書きすると継承されないため明示） */
const ogImage = { url: "/brand/og_2026-11-19.png", width: 1200, height: 630, alt: org.name };

/** 各ページ共通のメタデータ（タイトル・説明・canonical・OGP・Twitter カード） */
export function pageMeta(path: string, title: string, description: string): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const socialTitle = path === "/" ? title : `${title}｜${org.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: org.name,
      url,
      title: socialTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage.url] },
  };
}
