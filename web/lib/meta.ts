import type { Metadata } from "next";
import { SITE_URL, org } from "./site";

/** OGP 画像（公式ロゴ。ページ側で openGraph を上書きすると継承されないため明示） */
const ogImage = { url: "/brand/SOL_Solution_Coop_official_2026-11-19.jpg", width: 1147, height: 860, alt: org.name };

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
    twitter: { card: "summary", title: socialTitle, description, images: [ogImage.url] },
  };
}
