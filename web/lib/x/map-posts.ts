/** X API v2 のユーザー投稿レスポンスを、画面用のカードへ変換します。トークンは扱いません。 */

export const X_API_BASE = "https://api.x.com";
export const X_POSTS_REVALIDATE_SECONDS = 900;
export const X_USER_REVALIDATE_SECONDS = 60 * 60 * 24;

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
    max_results: "10",
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
    if (url) return { url, alt: "投稿の画像" };
  }
  return null;
}

export function mapTweetsToCards(payload: unknown, handle = "KumiaiSol", limit = 4): XPostCard[] {
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
