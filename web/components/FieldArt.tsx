import type { JSX } from "react";

/** 手描きの単純な図形。文字・ロゴ・実在の作業場や人物は入れない。 */
export function FieldArt({ kind, className = "" }: { kind: FieldArtKind; className?: string }) {
  const Drawing = drawings[kind];
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" role="img" aria-label="イメージ" className={className}>
      <rect width="160" height="100" rx="12" fill="#eef8f1" />
      <Drawing />
    </svg>
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

function Industry() {
  return (
    <>
      <rect x="28" y="28" width="44" height="44" rx="4" fill="#34b268" />
      <rect x="80" y="40" width="48" height="32" rx="4" fill="#fff478" />
      <rect x="40" y="38" width="20" height="8" fill="#ffffff" />
    </>
  );
}

function Build() {
  return (
    <>
      <polygon points="80,18 128,52 32,52" fill="#34b268" />
      <rect x="48" y="52" width="64" height="30" fill="#fff478" />
      <rect x="74" y="62" width="12" height="20" fill="#ffffff" />
    </>
  );
}

function Air() {
  return (
    <>
      <circle cx="46" cy="50" r="16" fill="#34b268" />
      <polygon points="62,50 130,36 130,64" fill="#fff478" />
    </>
  );
}

function Fish() {
  return (
    <>
      <path d="M20 62c20-16 40-16 60 0s40 16 60 0" fill="none" stroke="#34b268" strokeWidth="6" />
      <path d="M20 78c20-12 40-12 60 0s40 12 60 0" fill="none" stroke="#fff478" strokeWidth="6" />
      <rect x="62" y="28" width="36" height="22" rx="4" fill="#34b268" />
    </>
  );
}

function Food() {
  return (
    <>
      <circle cx="58" cy="46" r="18" fill="#34b268" />
      <circle cx="96" cy="54" r="14" fill="#fff478" />
      <rect x="46" y="68" width="68" height="10" rx="5" fill="#ffffff" />
    </>
  );
}

function Kaigo() {
  return (
    <>
      <rect x="28" y="42" width="104" height="28" rx="8" fill="#34b268" />
      <rect x="36" y="28" width="28" height="18" rx="6" fill="#fff478" />
      <rect x="78" y="50" width="40" height="8" rx="4" fill="#ffffff" />
    </>
  );
}

function Cleaning() {
  return (
    <>
      <rect x="36" y="22" width="56" height="56" rx="4" fill="#ffffff" />
      <rect x="44" y="30" width="40" height="40" rx="2" fill="#34b268" />
      <circle cx="112" cy="64" r="16" fill="#fff478" />
    </>
  );
}

function Linen() {
  return (
    <>
      <rect x="36" y="28" width="88" height="16" rx="3" fill="#34b268" />
      <rect x="44" y="48" width="72" height="14" rx="3" fill="#fff478" />
      <rect x="52" y="66" width="56" height="12" rx="3" fill="#ffffff" />
    </>
  );
}

function Ship() {
  return (
    <>
      <polygon points="24,62 136,62 118,82 42,82" fill="#34b268" />
      <rect x="62" y="36" width="36" height="26" fill="#fff478" />
      <rect x="76" y="20" width="8" height="16" fill="#ffffff" />
    </>
  );
}

function Auto() {
  return (
    <>
      <rect x="32" y="42" width="96" height="24" rx="6" fill="#34b268" />
      <rect x="52" y="30" width="48" height="16" rx="4" fill="#fff478" />
      <circle cx="52" cy="70" r="10" fill="#ffffff" />
      <circle cx="112" cy="70" r="10" fill="#ffffff" />
    </>
  );
}

function Lodging() {
  return (
    <>
      <rect x="40" y="36" width="80" height="44" fill="#34b268" />
      <polygon points="32,36 80,16 128,36" fill="#fff478" />
      <rect x="52" y="48" width="14" height="14" fill="#ffffff" />
      <rect x="94" y="48" width="14" height="14" fill="#ffffff" />
    </>
  );
}

function Road() {
  return (
    <>
      <rect x="16" y="58" width="128" height="16" rx="4" fill="#34b268" />
      <rect x="36" y="64" width="18" height="4" fill="#fff478" />
      <rect x="72" y="64" width="18" height="4" fill="#fff478" />
      <rect x="108" y="64" width="18" height="4" fill="#fff478" />
      <rect x="48" y="32" width="40" height="18" rx="4" fill="#ffffff" />
    </>
  );
}

function Railway() {
  return (
    <>
      <rect x="18" y="68" width="124" height="6" fill="#34b268" />
      <rect x="18" y="82" width="124" height="6" fill="#34b268" />
      <rect x="46" y="28" width="68" height="40" rx="6" fill="#fff478" />
      <rect x="58" y="38" width="16" height="12" fill="#ffffff" />
      <rect x="86" y="38" width="16" height="12" fill="#ffffff" />
    </>
  );
}

function Warehouse() {
  return (
    <>
      <rect x="22" y="28" width="70" height="52" fill="#34b268" />
      <rect x="100" y="40" width="28" height="18" fill="#fff478" />
      <rect x="104" y="62" width="28" height="18" fill="#ffffff" />
      <rect x="40" y="48" width="22" height="32" fill="#ffffff" />
    </>
  );
}

function Agriculture() {
  return (
    <>
      <rect x="20" y="70" width="120" height="10" rx="3" fill="#34b268" />
      <circle cx="44" cy="48" r="12" fill="#fff478" />
      <circle cx="80" cy="40" r="12" fill="#34b268" />
      <circle cx="116" cy="48" r="12" fill="#ffffff" />
    </>
  );
}

function Dining() {
  return (
    <>
      <circle cx="80" cy="52" r="28" fill="#ffffff" />
      <circle cx="80" cy="52" r="16" fill="#34b268" />
      <rect x="28" y="44" width="16" height="8" rx="4" fill="#fff478" />
      <rect x="116" y="44" width="16" height="8" rx="4" fill="#fff478" />
    </>
  );
}

function Forestry() {
  return (
    <>
      <polygon points="42,78 42,58 28,58 50,28 72,58 58,58 58,78" fill="#34b268" />
      <polygon points="96,78 96,52 78,52 108,22 138,52 120,52 120,78" fill="#fff478" />
    </>
  );
}

function Wood() {
  return (
    <>
      <rect x="28" y="30" width="104" height="14" rx="2" fill="#34b268" />
      <rect x="36" y="48" width="88" height="14" rx="2" fill="#fff478" />
      <rect x="44" y="66" width="72" height="14" rx="2" fill="#ffffff" />
    </>
  );
}

function Recycling() {
  return (
    <>
      <circle cx="80" cy="32" r="14" fill="#34b268" />
      <circle cx="48" cy="70" r="14" fill="#fff478" />
      <circle cx="112" cy="70" r="14" fill="#ffffff" />
    </>
  );
}

const drawings: Record<FieldArtKind, () => JSX.Element> = {
  industry: Industry,
  build: Build,
  air: Air,
  fish: Fish,
  food: Food,
  kaigo: Kaigo,
  cleaning: Cleaning,
  linen: Linen,
  ship: Ship,
  auto: Auto,
  lodging: Lodging,
  road: Road,
  railway: Railway,
  warehouse: Warehouse,
  agriculture: Agriculture,
  dining: Dining,
  forestry: Forestry,
  wood: Wood,
  recycling: Recycling,
};
