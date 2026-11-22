import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { OfficialXPosts } from "@/components/OfficialXPosts";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { loadOfficialPosts } from "@/lib/x/load-posts";
import { X_NEWS_POST_COUNT } from "@/lib/x/map-posts";

export const revalidate = 300;

const description = "ソリューション協同組合の最新情報です。公式アカウントの投稿を、新しい順に掲載しています。";

export async function generateMetadata(): Promise<Metadata> {
  const { posts } = await loadOfficialPosts();
  return {
    ...pageMeta("/news", "最新情報", description),
    robots: posts.length > 0 ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function NewsPage() {
  return (
    <>
      <PageHeader
        path="/news"
        title="最新情報"
        lead="当組合の公式アカウントの投稿を、新しい順に掲載しています。"
      />
      <Section width="wide">
        <OfficialXPosts limit={X_NEWS_POST_COUNT} />
      </Section>
    </>
  );
}
