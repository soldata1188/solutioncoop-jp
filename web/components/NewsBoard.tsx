import { newsCardTitle, newsItems, newsPhotos, newsSrcSet, type NewsItem, type NewsPhotoTile } from "@/lib/news";

/** 8枚目。折り鶴の集合写真を、防災センターの写真に差し替えた。 */
const REPLACED_PHOTO_ID = "2119705192216264798";

/** デスクトップは6列の大小モザイク。0始まり。8枚目（差し替え写真）は大きい枠。 */
const DESKTOP_LARGE = new Set([0, 1, 7]);
const DESKTOP_WIDE = new Set([6, 8, 9, 10, 13, 14]);
/** 狭い画面で2列をまたぐ。端数が残らない並びにしている。 */
const MOBILE_WIDE = new Set([0, 1, 6, 9, 14]);

const SIZES_STANDARD = "(max-width: 767px) calc((100vw - 40px) / 2), (max-width: 931px) calc((100vw - 72px) / 6), 143px";
const SIZES_DOUBLE = "(max-width: 767px) calc((100vw - 40px) / 2), (max-width: 931px) calc((100vw - 72px) / 3 + 8px), 294px";
const SIZES_FULL_MOBILE = "(max-width: 767px) calc(100vw - 32px), (max-width: 931px) calc((100vw - 72px) / 3 + 8px), 294px";

type TileImage = { id: string; imageAlt?: string; imageWidths?: readonly number[]; imageHeight?: number };

function tileSizes(index: number): string {
  if (MOBILE_WIDE.has(index)) return SIZES_FULL_MOBILE;
  if (DESKTOP_LARGE.has(index) || DESKTOP_WIDE.has(index)) return SIZES_DOUBLE;
  return SIZES_STANDARD;
}

function spanClass(index: number): string {
  const parts = ["news-tile-wrap", "min-w-0"];
  if (DESKTOP_LARGE.has(index)) parts.push("news-d-lg");
  if (DESKTOP_WIDE.has(index)) parts.push("news-d-wide");
  if (MOBILE_WIDE.has(index)) parts.push("news-m-wide");
  return parts.join(" ");
}

function CardImage({ item, alt, sizes }: { item: TileImage; alt: string; sizes: string }) {
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
      <source type="image/avif" sizes={sizes} srcSet={newsSrcSet(item, "avif")} />
      <source type="image/webp" sizes={sizes} srcSet={newsSrcSet(item, "webp")} />
      <img
        src={`/news/${item.id}-640.webp`}
        alt={alt}
        width={fallbackWidth}
        height={item.imageHeight ?? Math.round((fallbackWidth * 3) / 4)}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        className="news-photo absolute inset-0 h-full w-full object-cover"
      />
    </picture>
  );
}

function NewsCard({ item, alt, sizes }: { item: NewsItem | NewsPhotoTile; alt: string; sizes: string }) {
  return (
    <article tabIndex={0} className="news-tile relative h-full rounded-lg bg-[#eef8f1]">
      <div className="news-clip absolute inset-0 overflow-hidden rounded-lg">
        <CardImage item={item} alt={alt} sizes={sizes} />
      </div>
    </article>
  );
}

/** 写真だけの展示。見出しの文字は出さない。 */
export function NewsBoard() {
  const tiles = [
    ...newsItems.map((item) => ({
      item,
      alt: item.id === REPLACED_PHOTO_ID ? (item.imageAlt ?? "") : newsCardTitle(item),
    })),
    ...newsPhotos.map((item) => ({ item, alt: item.imageAlt })),
  ];
  return (
    <div className="news-mosaic">
      <ul className="news-rows grid">
        {tiles.map(({ item, alt }, index) => (
          <li key={item.id} className={spanClass(index)}>
            <NewsCard item={item} alt={alt} sizes={tileSizes(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
