import { loadOfficialPosts } from "@/lib/x/load-posts";
import { X_HOME_POST_COUNT, type XPostCard } from "@/lib/x/map-posts";
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

function PostRow({ post }: { post: XPostCard }) {
  const date = formatJstDotDate(post.createdAt) || post.dateLabel;
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full min-h-11 items-start gap-3 rounded border border-line bg-white px-4 py-3 no-underline hover:border-primary focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-primary-dark!"
    >
      <time dateTime={post.createdAt} className="shrink-0 pt-0.5 text-xs tabular-nums text-muted">
        {date}
      </time>
      <span className="line-clamp-2 min-w-0 flex-1 text-[15px] font-bold leading-snug text-ink">{post.text}</span>
      <span className="sr-only">（新しいタブで開きます）</span>
    </a>
  );
}

/** 公式アカウントの最新投稿。取得できないときは一文と、公式アカウントへのリンクだけを出します。 */
export async function OfficialXPosts({ limit = X_HOME_POST_COUNT }: { limit?: number }) {
  const result = await loadOfficialPosts();
  const posts = result.posts.slice(0, limit);
  return (
    <div>
      {posts.length > 0 ? (
        <>
          {result.source === "fixture" ? (
            <p className="mb-4 text-center text-[13px] font-bold text-ink">これは表示確認用の見本です。実際の投稿ではありません。</p>
          ) : null}
          <ul className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
            {posts.map((post) => (
              <li key={post.id} className="min-w-0">
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="rounded border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-body">現在お知らせはありません。</p>
      )}
      <ProfileLink />
    </div>
  );
}
