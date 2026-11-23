import Image from "next/image";
import { loadOfficialPosts } from "@/lib/x/load-posts";
import { X_HOME_POST_COUNT, type XPostCard } from "@/lib/x/map-posts";
import { X_URL } from "@/lib/site";

const IMAGE_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

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

/** 画像の代替テキスト。見出しと同じ文を短くする。 */
function shortAlt(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length <= 40 ? flat : flat.slice(0, 40);
}

function PostCard({ post }: { post: XPostCard }) {
  const date = formatJstDotDate(post.createdAt) || post.dateLabel;
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col overflow-hidden rounded border border-line bg-white text-left no-underline hover:border-primary focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-primary-dark!"
    >
      <div className={`relative aspect-square w-full shrink-0 overflow-hidden ${post.image ? "bg-pale" : "bg-[#f5f5f5]"}`}>
        {post.image ? (
          <Image src={post.image.url} alt={shortAlt(post.text)} fill sizes={IMAGE_SIZES} loading="lazy" className="object-cover" />
        ) : (
          <Image
            src="/brand/SOL_Solution_Coop_2026-11-19_white.png"
            alt="ソリューション協同組合"
            width={130}
            height={88}
            sizes={IMAGE_SIZES}
            loading="lazy"
            className="absolute inset-0 m-auto h-auto max-h-[46%] w-auto max-w-[72%] object-contain"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-2.5 py-2 sm:px-3 sm:py-3">
        <time dateTime={post.createdAt} className="text-[11px] font-normal leading-none tabular-nums text-[#757575]">
          {date}
        </time>
        <span className="line-clamp-4 text-[12px] font-normal leading-[1.6] text-[#555] sm:line-clamp-5 sm:text-[13px]">{post.text}</span>
      </div>
      <span className="sr-only">（新しいタブで開きます）</span>
    </a>
  );
}

/** 公式アカウントの最新投稿。取得できないときは一文と、公式アカウントへのボタンだけを出します。 */
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
          <ul className="news-rows grid grid-cols-2 items-stretch gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {posts.map((post) => (
              <li key={post.id} className="min-w-0">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="rounded border border-line bg-white px-4 py-3 text-[15px] leading-relaxed text-body">現在お知らせはありません。</p>
      )}
      <p className="mt-6 text-center">
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lift inline-flex min-h-11 items-center justify-center rounded border border-line bg-white px-8 font-bold text-ink no-underline shadow-sm hover:border-primary"
        >
          公式Xで見る
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </p>
    </div>
  );
}
