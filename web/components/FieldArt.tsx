/** 手描きの単純な図形。文字・ロゴ・実在の作業場や人物は入れない。 */
export function FieldArt({ kind, className = "" }: { kind: FieldArtKind; className?: string }) {
  return (
    <svg viewBox="0 0 160 100" width="160" height="100" role="img" aria-label="イメージ" className={className}>
      <rect width="160" height="100" rx="12" fill="#eef8f1" />
      {kind === "industry" ? <Industry /> : null}
      {kind === "build" ? <Build /> : null}
      {kind === "air" ? <Air /> : null}
      {kind === "fish" ? <Fish /> : null}
      {kind === "food" ? <Food /> : null}
    </svg>
  );
}

export type FieldArtKind = "industry" | "build" | "air" | "fish" | "food";

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
