import { newsCardTitle, newsItems, newsPhotos, newsSrcSet, type NewsItem, type NewsPhotoTile } from "@/lib/news";

/** 768px以上は3列で約295px。狭い画面は2列。 */
const IMAGE_SIZES = "(min-width: 768px) 295px, calc(50vw - 16px)";

type TileImage = { id: string; imageAlt?: string; imageWidths?: readonly number[] };

function CardImage({ item, alt }: { item: TileImage; alt: string }) {
  if (!alt) {
    return (
      <img
        src="/brand/SOL_Solution_Coop_2026-11-19_white.png"
        alt=""
        width={130}
        height={88}
        loading="lazy"
        decoding="async"
        className="news-photo absolute inset-0 m-auto h-auto max-h-[42%] w-auto max-w-[70%] object-contain"
      />
    );
  }
  const widths = item.imageWidths ?? [960];
  const fallbackWidth = Math.max(...widths);
  return (
    <picture className="news-frame absolute inset-0 block">
      <source type="image/avif" sizes={IMAGE_SIZES} srcSet={newsSrcSet(item, "avif")} />
      <source type="image/webp" sizes={IMAGE_SIZES} srcSet={newsSrcSet(item, "webp")} />
      <img
        src={`/news/${item.id}-640.webp`}
        alt={alt}
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

function NewsCard({ item, alt }: { item: NewsItem | NewsPhotoTile; alt: string }) {
  return (
    <article tabIndex={0} className="news-tile relative aspect-[4/3] overflow-hidden rounded-lg bg-[#eef8f1]">
      <CardImage item={item} alt={alt} />
    </article>
  );
}

/** 写真だけの展示。見出しの文字は出さない。 */
export function NewsBoard() {
  const tiles = [
    ...newsItems.map((item) => ({ item, alt: newsCardTitle(item) })),
    ...newsPhotos.map((item) => ({ item, alt: item.imageAlt })),
  ];
  return (
    <ul className="news-rows grid grid-cols-2 items-stretch gap-2 md:grid-cols-3">
      {tiles.map(({ item, alt }) => (
        <li key={item.id} className="news-tile-wrap min-w-0">
          <NewsCard item={item} alt={alt} />
        </li>
      ))}
    </ul>
  );
}
