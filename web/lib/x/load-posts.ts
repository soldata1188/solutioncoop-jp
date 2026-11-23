import { readFileSync } from "node:fs";
import { unstable_cache, unstable_noStore as noStore } from "next/cache";
import { X_HANDLE, X_URL } from "@/lib/site";
import { xFixturePayload } from "./fixture";
import {
  X_ACCOUNT_USER_ID,
  X_NEWS_POST_COUNT,
  X_POSTS_CACHE_TAG,
  X_POSTS_SUCCESS_REVALIDATE_SECONDS,
  fetchUserTweets,
  mapTweetsToCards,
  type XPostCard,
} from "./map-posts";

export type OfficialPostsResult = {
  posts: XPostCard[];
  /** fixture はローカルの見本。api は X。fallback は案内カード。 */
  source: "fixture" | "api" | "fallback";
};

/**
 * 見本表示はローカルだけ。Vercel は本番もプレビューも VERCEL=1 を付けるため、そこでは有効になりません。
 */
export function xFixtureEnabled(): boolean {
  if (process.env.X_USE_FIXTURE !== "1") return false;
  if (process.env.VERCEL === "1") return false;
  return true;
}

function bearerToken(): string | null {
  const token = process.env.X_BEARER_TOKEN?.trim();
  return token ? token : null;
}

function userIdFromEnv(): string | null {
  const id = process.env.X_USER_ID?.trim();
  return id && /^\d{1,20}$/.test(id) ? id : null;
}

function readFixturePayload(): unknown {
  const file = process.env.X_FIXTURE_FILE;
  if (!file || !xFixtureEnabled()) return xFixturePayload;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as unknown;
  } catch {
    return xFixturePayload;
  }
}

function resolveUserId(): string {
  return userIdFromEnv() ?? X_ACCOUNT_USER_ID;
}

async function fetchTweets(userId: string): Promise<XPostCard[]> {
  const token = bearerToken();
  if (!token) throw new Error("x posts unavailable");
  const payload = await fetchUserTweets(userId, token);
  const posts = mapTweetsToCards(payload, X_HANDLE, X_NEWS_POST_COUNT);
  if (posts.length === 0) {
    console.error(`[x-posts] timeline for user ${userId} had no posts after filtering`);
  }
  return posts;
}

/**
 * 成功した一覧だけを1時間保存します。手動更新のタグ破棄でも捨てます。
 * 失敗は例外のままにし、キャッシュしません。
 * 見本のリンクは公式アカウントのページだけにし、実在しない投稿URLは出しません。
 */
async function loadFresh(): Promise<XPostCard[]> {
  if (xFixtureEnabled()) {
    const posts = mapTweetsToCards(readFixturePayload(), X_HANDLE, X_NEWS_POST_COUNT).map((post) => ({ ...post, href: X_URL }));
    if (posts.length === 0) throw new Error("x posts unavailable");
    return posts;
  }
  if (!bearerToken()) {
    console.error("[x-posts] X_BEARER_TOKEN is not set");
    throw new Error("x posts unavailable");
  }
  const userId = resolveUserId();
  const posts = await fetchTweets(userId);
  if (posts.length === 0) throw new Error("x posts unavailable");
  return posts;
}

const loadSuccessCached = unstable_cache(loadFresh, ["x-posts-success"], {
  revalidate: X_POSTS_SUCCESS_REVALIDATE_SECONDS,
  tags: [X_POSTS_CACHE_TAG],
});

/** Next.js が静的生成をやめるための制御エラーは、案内カードに変えてはいけません。 */
function isNextControlFlowError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false;
  const digest = String((error as { digest?: unknown }).digest);
  return digest.startsWith("DYNAMIC_SERVER_USAGE") || digest.startsWith("HANGING_PROMISE_REJECTION");
}

/** 失敗しても空を返し、ページのビルドや表示を止めません。空の結果はキャッシュしません。トークンは返しません。 */
export async function loadOfficialPosts(): Promise<OfficialPostsResult> {
  try {
    const posts = await loadSuccessCached();
    if (posts.length === 0) {
      noStore();
      console.error("[x-posts] empty timeline; the empty page is not cached");
      return { source: "fallback", posts: [] };
    }
    return { source: xFixtureEnabled() ? "fixture" : "api", posts };
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    noStore();
    const message = error instanceof Error ? error.message : "unknown";
    console.error(`[x-posts] load failed; the empty page is not cached: ${message}`);
    return { source: "fallback", posts: [] };
  }
}
