import { newsCardTitle, newsItems, newsPhotos, newsSrcSet, type NewsItem, type NewsPhotoTile } from "@/lib/news";

/** 768px以上は3列で約295px。狭い画面は2列。 */
const IMAGE_SIZES = "(min-width: 768px) 295px, calc(50vw - 16px)";

function CardImage({ item }: { item: { id: string; imageAlt?: string; imageWidths?: readonly number[] } }) {
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
  const widths = item.imageWidths ?? [960];
  const fallbackWidth = Math.max(...widths);
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

function NewsCard({ item, title }: { item: NewsItem | NewsPhotoTile; title?: string }) {
  return (
    <article className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#eef8f1]">
      <CardImage item={item} />
      {title ? (
        <p className="news-caption absolute inset-x-0 bottom-0 line-clamp-2 px-2.5 pb-2.5 pt-10 text-[13px] font-bold leading-snug text-white sm:text-[15px]">
          {title}
        </p>
      ) : null}
    </article>
  );
}

/** 写真を主にしたお知らせ。本文は出さず、見出しだけです。 */
export function NewsBoard() {
  const tiles = [
    ...newsItems.map((item) => ({ item, title: newsCardTitle(item) })),
    ...newsPhotos.map((item) => ({ item, title: item.shortTitle })),
  ];
  return (
    <ul className="news-rows grid grid-cols-2 items-stretch gap-2 md:grid-cols-3">
      {tiles.map(({ item, title }) => (
        <li key={item.id} className="min-w-0">
          <NewsCard item={item} title={title} />
        </li>
      ))}
    </ul>
  );
}
