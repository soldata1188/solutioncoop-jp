import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { loadOfficialPosts } from "@/lib/x/load-posts";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts } = await loadOfficialPosts();
  const paths = ["/", "/faq", "/about", "/for-workers", "/contact", "/privacy"];
  if (posts.length > 0) paths.splice(1, 0, "/news");
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p === "/news" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));
}
