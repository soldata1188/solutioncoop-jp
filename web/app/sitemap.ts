import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/news", "/faq", "/about", "/contact", "/privacy"];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p === "/news" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
