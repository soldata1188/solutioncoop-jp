import type { Metadata } from "next";
import { SITE_URL, org } from "./site";

export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: org.name,
      url: `${SITE_URL}${path}`,
      title,
      description,
    },
  };
}
