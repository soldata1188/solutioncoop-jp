import { newsHref, newsItems, newsSrcSet, type NewsItem } from "@/lib/news";
import { X_URL } from "@/lib/site";

/** 3列は約289px、2列は余白と隙間を引いた半分。 */
const IMAGE_SIZES = "(min-width: 1024px) 289px, calc(50vw - 20px)";

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
      <div className="relative aspect-square overflow-hidden bg-[#eef8f1]">
        <img
          src="/brand/SOL_Solution_Coop_2026-11-19_white.png"
          alt=""
          width={130}
          height={88}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 m-auto h-auto max-h-[46%] w-auto max-w-[72%] object-contain"
        />
      </div>
    );
  }
  return (
    <div className="relative aspect-square overflow-hidden bg-pale">
      <picture>
        <source type="image/avif" sizes={IMAGE_SIZES} srcSet={newsSrcSet(item.id, "avif")} />
        <source type="image/webp" sizes={IMAGE_SIZES} srcSet={newsSrcSet(item.id, "webp")} />
        <img
          src={`/news/${item.id}-640.webp`}
          alt={item.imageAlt}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          sizes={IMAGE_SIZES}
          className="news-photo absolute inset-0 h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const date = formatJstDotDate(item.createdAt);
  return (
    <a
      href={newsHref(item)}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card card-lift flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white text-left no-underline"
    >
      <CardImage item={item} />
      <div className="flex flex-1 flex-col gap-1.5 px-2.5 py-2.5 sm:px-3 sm:py-3">
        {item.label ? (
          <span className="self-start rounded-full border border-tab bg-pale px-2 py-0.5 text-[11px] font-bold leading-none text-primary-dark">{item.label}</span>
        ) : null}
        <time dateTime={item.createdAt} className="text-[11px] font-normal leading-none tabular-nums text-[#757575]">
          {date}
        </time>
        <p className="line-clamp-3 text-[12px] font-normal leading-[1.6] text-body sm:line-clamp-4 sm:text-[13px]">{item.text}</p>
      </div>
      <span className="sr-only">（新しいタブで開きます）</span>
    </a>
  );
}

/** 公式Xの投稿を静的なカードにしたもの。ページの生成時にAPIは呼びません。 */
export function NewsBoard() {
  return (
    <div>
      <ul className="news-rows grid grid-cols-2 items-stretch gap-2 min-[1024px]:grid-cols-3 min-[1024px]:gap-4">
        {newsItems.map((item) => (
          <li key={item.id} className="min-w-0">
            <NewsCard item={item} />
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center">
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="lift inline-flex min-h-11 items-center justify-center rounded border border-[#1e7f46] bg-white px-8 font-bold text-ink no-underline shadow-sm"
        >
          公式Xで見る
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </p>
    </div>
  );
}
