import { unstable_cache } from "next/cache";
import { X_HANDLE } from "@/lib/site";
import { xFixturePayload } from "./fixture";
import {
  X_POSTS_REVALIDATE_SECONDS,
  X_USER_REVALIDATE_SECONDS,
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

async function lookupUserId(): Promise<string> {
  const token = bearerToken();
  if (!token) throw new Error("x user unavailable");
  const response = await fetch(buildUserByUsernameUrl(X_HANDLE), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("x user unavailable");
  const id = readUserId(await response.json());
  if (!id) throw new Error("x user unavailable");
  return id;
}

const lookupUserIdCached = unstable_cache(lookupUserId, ["official-x-user-id"], {
  revalidate: X_USER_REVALIDATE_SECONDS,
});

async function fetchTweets(userId: string): Promise<XPostCard[]> {
  const token = bearerToken();
  if (!token) throw new Error("x posts unavailable");
  const response = await fetch(buildUserTweetsUrl(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 401 || response.status === 403 || response.status === 429 || response.status >= 500) {
    throw new Error("x posts unavailable");
  }
  if (!response.ok) throw new Error("x posts unavailable");
  return mapTweetsToCards(await response.json(), X_HANDLE);
}

const fetchTweetsCached = unstable_cache(fetchTweets, ["official-x-posts"], {
  revalidate: X_POSTS_REVALIDATE_SECONDS,
});

/** Next.js が静的生成をやめるための制御エラーは、案内カードに変えてはいけません。 */
function isNextControlFlowError(error: unknown): boolean {
  if (typeof error !== "object" || error === null || !("digest" in error)) return false;
  const digest = String((error as { digest?: unknown }).digest);
  return digest.startsWith("DYNAMIC_SERVER_USAGE") || digest.startsWith("HANGING_PROMISE_REJECTION");
}

/** 失敗しても空を返し、ページのビルドや表示を止めません。トークンは返しません。 */
export async function loadOfficialPosts(): Promise<OfficialPostsResult> {
  if (xFixtureEnabled()) {
    return { source: "fixture", posts: mapTweetsToCards(xFixturePayload, X_HANDLE) };
  }
  if (!bearerToken()) return { source: "fallback", posts: [] };
  try {
    const userId = userIdFromEnv() ?? (await lookupUserIdCached());
    const posts = await fetchTweetsCached(userId);
    if (posts.length === 0) return { source: "fallback", posts: [] };
    return { source: "api", posts };
  } catch (error) {
    if (isNextControlFlowError(error)) throw error;
    return { source: "fallback", posts: [] };
  }
}
