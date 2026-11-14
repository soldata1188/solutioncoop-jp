import { readFileSync } from "node:fs";
import { unstable_cache } from "next/cache";
import { X_HANDLE } from "@/lib/site";
import { xFixturePayload } from "./fixture";
import {
  X_POSTS_CACHE_TAG,
  buildUserByUsernameUrl,
  buildUserTweetsUrl,
  mapTweetsToCards,
  readUserId,
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

async function lookupUserId(): Promise<string> {
  const token = bearerToken();
  if (!token) throw new Error("x posts unavailable");
  const response = await fetch(buildUserByUsernameUrl(X_HANDLE), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("x posts unavailable");
  const id = readUserId(await response.json());
  if (!id) throw new Error("x posts unavailable");
  return id;
}

async function fetchTweets(userId: string): Promise<XPostCard[]> {
  const token = bearerToken();
  if (!token) throw new Error("x posts unavailable");
  const response = await fetch(buildUserTweetsUrl(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("x posts unavailable");
  return mapTweetsToCards(await response.json(), X_HANDLE);
}

/** 成功した一覧だけを期限なしで保存します。失敗は例外のままにし、キャッシュしません。 */
async function loadFresh(): Promise<XPostCard[]> {
  if (xFixtureEnabled()) {
    const posts = mapTweetsToCards(readFixturePayload(), X_HANDLE);
    if (posts.length === 0) throw new Error("x posts unavailable");
    return posts;
  }
  if (!bearerToken()) throw new Error("x posts unavailable");
  const userId = userIdFromEnv() ?? (await lookupUserId());
  const posts = await fetchTweets(userId);
  if (posts.length === 0) throw new Error("x posts unavailable");
  return posts;
}

const loadSuccessCached = unstable_cache(loadFresh, ["x-posts-success"], {
  revalidate: false,
  tags: [X_POSTS_CACHE_TAG],
});

/** Next.js が静的生成をやめるための制御エラーは、案内カードに変えてはいけません。 */
function isNextControlFlowError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false;
  const digest = String((error as { digest?: unknown }).digest);
  return digest.startsWith("DYNAMIC_SERVER_USAGE") || digest.startsWith("HANGING_PROMISE_REJECTION");
}

/** 失敗しても空を返し、ページのビルドや表示を止めません。トークンは返しません。 */
export async function loadOfficialPosts(): Promise<OfficialPostsResult> {
  try {
    const posts = await loadSuccessCached();
    return { source: xFixtureEnabled() ? "fixture" : "api", posts };
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    return { source: "fallback", posts: [] };
  }
}
