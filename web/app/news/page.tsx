import { PageHeader } from "@/components/PageHeader";
import { OfficialXPosts } from "@/components/OfficialXPosts";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { X_NEWS_POST_COUNT } from "@/lib/x/map-posts";

export const revalidate = 300;

export const metadata = pageMeta(
  "/news",
  "最新情報",
  "ソリューション協同組合の公式Xに投稿した最新の情報です。",
);

export default function NewsPage() {
  return (
    <>
      <PageHeader
        path="/news"
        title="最新情報"
        lead="公式Xの投稿を、新しい順に掲載しています。"
      />
      <Section title="公式Xの投稿" width="wide" lead="当組合の公式アカウントの投稿です。">
        <OfficialXPosts limit={X_NEWS_POST_COUNT} />
      </Section>
    </>
  );
}
