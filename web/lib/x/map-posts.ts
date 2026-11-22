/** X API v2 のユーザー投稿レスポンスを、画面用のカードへ変換します。トークンは扱いません。 */

export const X_API_BASE = "https://api.x.com";
/** 取得に成功した投稿のキャッシュタグ。1時間で切れ、手動更新でも破棄します。 */
export const X_POSTS_CACHE_TAG = "x-posts";
/** 成功した一覧を保持する秒数。手動更新（タグ破棄）でも先に捨てられます。 */
export const X_POSTS_SUCCESS_REVALIDATE_SECONDS = 3600;
/** 失敗した取得だけ、この秒数のあとにもう一度試します。失敗そのものはキャッシュしません。 */
export const X_POSTS_FAILURE_REVALIDATE_SECONDS = 300;
/** ホームに出す件数。取得キャッシュは最新情報ページと共有し、新しい順の先頭だけを使います。 */
export const X_HOME_POST_COUNT = 12;
/** 最新情報ページに出す件数。タイムラインは1回の取得でこの件数まで取り、同じキャッシュを使います。 */
export const X_NEWS_POST_COUNT = 20;

export type XPostCard = {
  id: string;
  text: string;
  createdAt: string;
  dateLabel: string;
  href: string;
  image: { url: string; alt: string } | null;
};

const USER_ID = /^\d{1,20}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function buildUserByUsernameUrl(username: string): string {
  return `${X_API_BASE}/2/users/by/username/${encodeURIComponent(username)}`;
}

export function buildUserTweetsUrl(userId: string): string {
  const params = new URLSearchParams({
    max_results: String(X_NEWS_POST_COUNT),
    exclude: "replies,retweets",
    "tweet.fields": "created_at,text,attachments,entities",
    expansions: "attachments.media_keys",
    "media.fields": "url,preview_image_url,width,height,type",
  });
  return `${X_API_BASE}/2/users/${encodeURIComponent(userId)}/tweets?${params.toString()}`;
}

export function readUserId(payload: unknown): string | null {
  if (!isRecord(payload) || !isRecord(payload.data)) return null;
  const id = payload.data.id;
  return typeof id === "string" && USER_ID.test(id) ? id : null;
}

/** 表示に使ってよい画像URL。pbs.twimg.com と、見本用のサイト内パスだけです。 */
/** pbs.twimg.com の画像は小さい版（name=small）だけを使います。サイト内の見本パスはそのままです。 */
export function smallMediaUrl(url: string): string {
  if (!url.startsWith("https://pbs.twimg.com/")) return url;
  const parsed = new URL(url);
  parsed.searchParams.set("name", "small");
  return parsed.toString();
}

export function safeImageUrl(url: string): string | null {
  if (url.startsWith("/images/") || url.startsWith("/brand/")) {
    if (url.includes("..") || url.includes("\\") || url.includes("?") || url.includes("#")) return null;
    return url;
  }
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || parsed.hostname !== "pbs.twimg.com") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function formatJapaneseDate(iso: string, timeZone = "Asia/Tokyo"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const year = get("year");
  const month = get("month");
  const day = get("day");
  if (!year || !month || !day) return "";
  return `${year}年${month}月${day}日`;
}

function mediaUrl(media: Record<string, unknown>): string | null {
  const type = media.type;
  const url = typeof media.url === "string" ? safeImageUrl(media.url) : null;
  const preview = typeof media.preview_image_url === "string" ? safeImageUrl(media.preview_image_url) : null;
  if (type === "video" || type === "animated_gif") return preview ?? url;
  return url ?? preview;
}

function isMediaLink(expanded: string): boolean {
  return /pic\.twitter\.com|pic\.x\.com|\/photo\/|\/video\//.test(expanded);
}

function displayText(text: string, entities: unknown): string {
  if (!isRecord(entities) || !Array.isArray(entities.urls)) return text.trim();
  let out = text;
  for (const item of entities.urls) {
    if (!isRecord(item) || typeof item.url !== "string" || item.url.length === 0) continue;
    const expanded = typeof item.expanded_url === "string" ? item.expanded_url : "";
    const display = typeof item.display_url === "string" ? item.display_url : "";
    const replacement = isMediaLink(expanded) ? "" : display;
    out = out.split(item.url).join(replacement);
  }
  return out.replace(/[ \t]{2,}/g, " ").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function firstImage(tweet: Record<string, unknown>, mediaByKey: Map<string, Record<string, unknown>>): XPostCard["image"] {
  if (!isRecord(tweet.attachments) || !Array.isArray(tweet.attachments.media_keys)) return null;
  for (const key of tweet.attachments.media_keys) {
    if (typeof key !== "string") continue;
    const media = mediaByKey.get(key);
    if (!media) continue;
    const url = mediaUrl(media);
    if (url) return { url: smallMediaUrl(url), alt: "投稿の画像" };
  }
  return null;
}

export function mapTweetsToCards(payload: unknown, handle = "KumiaiSol", limit = X_NEWS_POST_COUNT): XPostCard[] {
  if (!isRecord(payload) || !Array.isArray(payload.data)) return [];
  const mediaByKey = new Map<string, Record<string, unknown>>();
  if (isRecord(payload.includes) && Array.isArray(payload.includes.media)) {
    for (const item of payload.includes.media) {
      if (!isRecord(item) || typeof item.media_key !== "string") continue;
      mediaByKey.set(item.media_key, item);
    }
  }

  const cards: XPostCard[] = [];
  for (const item of payload.data) {
    if (!isRecord(item) || typeof item.id !== "string" || !USER_ID.test(item.id)) continue;
    if (typeof item.text !== "string" || typeof item.created_at !== "string") continue;
    const dateLabel = formatJapaneseDate(item.created_at);
    if (!dateLabel) continue;
    const text = displayText(item.text, item.entities);
    if (!text) continue;
    cards.push({
      id: item.id,
      text,
      createdAt: item.created_at,
      dateLabel,
      href: `https://x.com/${encodeURIComponent(handle)}/status/${item.id}`,
      image: firstImage(item, mediaByKey),
    });
  }

  cards.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  return cards.slice(0, limit);
}
