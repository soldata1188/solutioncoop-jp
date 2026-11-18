import Image from "next/image";
import Link from "next/link";
import { loadOfficialPosts } from "@/lib/x/load-posts";
import { X_POST_COUNT, type XPostCard } from "@/lib/x/map-posts";
import { X_URL } from "@/lib/site";

function ProfileLink() {
  return (
    <p className="mt-4 text-center">
      <a
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center px-3 text-[15px] font-bold text-primary-dark underline underline-offset-4"
      >
        Xで最新情報を見る
        <span className="sr-only">（新しいタブで開きます）</span>
      </a>
    </p>
  );
}

/** 投稿日。Asia/Tokyo 固定で YYYY.MM.DD（ゼロ埋め）。 */
function formatJstDotDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  const year = pick("year");
  const month = pick("month");
  const day = pick("day");
  if (!year || !month || !day) return "";
  return `${year}.${month}.${day}`;
}

function PostCard({ post }: { post: XPostCard }) {
  return (
    <article className="flex h-full w-full flex-col rounded border border-line bg-white shadow-card">
      {post.image ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t bg-pale">
          <Image src={post.image.url} alt={post.image.alt} fill sizes="(min-width: 1024px) 290px, (min-width: 768px) 360px, 100vw" className="object-cover" />
        </div>
      ) : null}
      <div className="px-4 pt-3 pb-4">
        <time dateTime={post.createdAt} className="text-xs tabular-nums text-muted">
          {formatJstDotDate(post.createdAt) || post.dateLabel}
        </time>
        <p className="mt-1 line-clamp-6 text-[13px] leading-relaxed text-ink">{post.text}</p>
      </div>
      <div className="mt-auto flex justify-center border-t border-line py-2">
        <a
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-medium text-primary-dark no-underline hover:bg-cta-tint hover:text-primary-darker hover:underline hover:underline-offset-4 focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-primary-dark!"
        >
          公式Xで見る
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </div>
    </article>
  );
}

/** 公式Xの最新投稿。取得できないときは公式アカウントへのリンクだけを出します。 */
export async function OfficialXPosts({ limit = X_POST_COUNT, showMore = false }: { limit?: number; showMore?: boolean }) {
  const result = await loadOfficialPosts();
  const posts = result.posts.slice(0, limit);
  return (
    <div>
      {posts.length > 0 ? (
        <>
          {result.source === "fixture" ? (
            <p className="mb-6 text-center text-[13px] font-bold text-ink">これは表示確認用の見本です。実際の投稿ではありません。</p>
          ) : null}
          <ul className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.id} className="flex min-w-0">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {showMore ? (
        <p className="mt-6 text-center">
          <Link href="/news" className="lift inline-flex min-h-12 items-center justify-center rounded border border-line bg-white px-8 font-bold text-ink no-underline shadow-sm hover:border-primary">
            最新情報をもっと見る
          </Link>
        </p>
      ) : null}
      <ProfileLink />
    </div>
  );
}
