import Image from "next/image";
import logo from "@/public/brand/SOL_Solution_Coop_official_2026-11-07.jpg";
import { loadOfficialPosts } from "@/lib/x/load-posts";
import type { XPostCard } from "@/lib/x/map-posts";
import { X_HANDLE, X_URL, org } from "@/lib/site";

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

function FallbackCard() {
  return (
    <div className="mx-auto w-full max-w-[550px] rounded border border-line bg-white px-5 py-8 text-center shadow-card">
      {/* 原本 1500×1200。切り抜きも変色もしません（表示は 180×144）。 */}
      <Image
        src={logo}
        alt=""
        sizes="180px"
        loading="eager"
        className="mx-auto h-[144px] w-[180px] max-w-full object-contain"
      />
      <p className="mt-4 text-base font-bold text-ink">{org.name}</p>
      <p className="mt-1 text-[15px] text-body">@{X_HANDLE}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink">最新の投稿をただいま表示できません。Xのページからご覧ください。</p>
    </div>
  );
}

function XMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="currentColor">
      <path d="M2.1 2.1h2.6L8 6.6l3.3-4.5h2.6L9.3 8l4.6 5.9h-2.6L8 9.4l-3.3 4.5H2.1L6.7 8 2.1 2.1Z" />
    </svg>
  );
}

function PostCard({ post }: { post: XPostCard }) {
  return (
    <article className="flex h-full w-full flex-col rounded border border-line bg-white shadow-card">
      {post.image ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t bg-pale">
          <Image src={post.image.url} alt={post.image.alt} fill sizes="(min-width: 1024px) 290px, (min-width: 768px) 360px, 100vw" className="object-cover" />
        </div>
      ) : null}
      <div className="px-4 pt-4 pb-4">
        <time dateTime={post.createdAt} className="text-[15px] text-body">
          {post.dateLabel}
        </time>
        <p className="mt-2 line-clamp-6 text-[15px] leading-relaxed text-ink">{post.text}</p>
      </div>
      <div className="mt-auto flex justify-center border-t border-line py-2">
        <a
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-bold text-primary-dark no-underline hover:bg-cta-tint hover:text-primary-darker hover:underline hover:underline-offset-4 focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-primary-dark!"
        >
          <XMark />
          公式Xで見る
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </div>
    </article>
  );
}

/** 公式Xの最新4件。取得できないときは案内カードだけを出します。 */
export async function OfficialXPosts() {
  const result = await loadOfficialPosts();
  return (
    <div>
      {result.source === "fixture" ? (
        <p className="mb-6 text-center text-[15px] font-bold text-ink">これは表示確認用の見本です。実際の投稿ではありません。</p>
      ) : null}
      {result.posts.length > 0 ? (
        <ul className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.posts.map((post) => (
            <li key={post.id} className="flex min-w-0">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      ) : (
        <FallbackCard />
      )}
      <ProfileLink />
    </div>
  );
}
