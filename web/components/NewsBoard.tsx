import { newsCardTitle, newsItems, newsSrcSet, type NewsItem } from "@/lib/news";

/** 2列。デスクトップの枠は最大約450px、狭い画面は余白を引いた半分。 */
const IMAGE_SIZES = "(min-width: 1024px) 450px, calc(50vw - 16px)";

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

function CardImage({ item }: { item: NewsItem }) {
  if (!item.imageAlt) {
    return (
      <img
        src="/brand/SOL_Solution_Coop_2026-11-19_white.png"
        alt=""
        width={130}
        height={88}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 m-auto h-auto max-h-[42%] w-auto max-w-[70%] object-contain"
      />
    );
  }
  const fallbackWidth = 960;
  return (
    <picture>
      <source type="image/avif" sizes={IMAGE_SIZES} srcSet={newsSrcSet(item, "avif")} />
      <source type="image/webp" sizes={IMAGE_SIZES} srcSet={newsSrcSet(item, "webp")} />
      <img
        src={`/news/${item.id}-640.webp`}
        alt={item.imageAlt}
        width={fallbackWidth}
        height={Math.round((fallbackWidth * 3) / 4)}
        loading="lazy"
        decoding="async"
        sizes={IMAGE_SIZES}
        className="news-photo absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const title = newsCardTitle(item);
  return (
    <article className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#eef8f1]">
      <CardImage item={item} />
      <time
        dateTime={item.createdAt}
        className="absolute left-2 top-2 rounded-full bg-[#0a3720] px-2 py-1 text-[11px] font-normal leading-none text-white"
      >
        {formatJstDotDate(item.createdAt)}
      </time>
      <p className="news-caption absolute inset-x-0 bottom-0 line-clamp-2 px-2.5 pb-2.5 pt-10 text-[13px] font-bold leading-snug text-white sm:text-[15px]">
        {title}
      </p>
    </article>
  );
}

/** 写真を主にしたお知らせ。本文は出さず、見出しと日付だけです。 */
export function NewsBoard() {
  return (
    <ul className="news-rows grid grid-cols-2 items-stretch gap-2">
      {newsItems.map((item) => (
        <li key={item.id} className="min-w-0">
          <NewsCard item={item} />
        </li>
      ))}
    </ul>
  );
}
