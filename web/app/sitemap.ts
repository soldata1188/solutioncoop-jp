import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/sakai", "/roadmap", "/support", "/faq", "/about", "/contact", "/disclosure", "/privacy"];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
