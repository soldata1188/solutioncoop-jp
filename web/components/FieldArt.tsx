import Image from "next/image";

/**
 * 分野ごとの場面。人物・道具・作業場を同じ寸法と配色で描いた自作の図。
 * 文字・ロゴ・実在の会社や特定の人物は入れない。
 * 先頭以外は遅延読み込みする。表示サイズは幅と高さを固定し、画面上部の文章より大きくしない。
 */
export function FieldArt({ kind, eager = false, className = "" }: { kind: FieldArtKind; eager?: boolean; className?: string }) {
  return (
    <Image
      src={`/art/fields/${kind}.svg`}
      alt="イメージ"
      width={320}
      height={200}
      unoptimized
      loading={eager ? "eager" : "lazy"}
      className={`block aspect-[8/5] h-auto w-[200px] max-w-full sm:w-full sm:max-w-[320px] ${className}`}
    />
  );
}

const artBySlug = {
  kaigo: "kaigo",
  "building-cleaning": "cleaning",
  "linen-supply": "linen",
  "industrial-products": "industry",
  construction: "build",
  shipbuilding: "ship",
  "auto-maintenance": "auto",
  aviation: "air",
  lodging: "lodging",
  "road-transport": "road",
  railway: "railway",
  "logistics-warehouse": "warehouse",
  agriculture: "agriculture",
  fishery: "fish",
  "food-manufacturing": "food",
  "food-service": "dining",
  forestry: "forestry",
  wood: "wood",
  "resource-recycling": "recycling",
} as const;

export type FieldArtKind = (typeof artBySlug)[keyof typeof artBySlug];

export function artFor(slug: string): FieldArtKind {
  if (slug in artBySlug) return artBySlug[slug as keyof typeof artBySlug];
  return "industry";
}
