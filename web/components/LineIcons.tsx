/** 自作の線画アイコン（単純な幾何学図形のみ。装飾のため読み上げ対象外） */
const common = {
  "aria-hidden": true,
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 許可証（書類＋丸印） */
export function IconLicense({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="12" y="8" width="32" height="44" rx="2" />
      <path d="M19 18h18M19 25h18M19 32h10" />
      <circle cx="44" cy="44" r="9" />
      <path d="M40 44l3 3 5-6" />
    </svg>
  );
}

/** 地域の拠点（建物＋位置の目印） */
export function IconLocal({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="10" y="26" width="22" height="28" />
      <path d="M16 33h4M24 33h2M16 40h4M24 40h2M18 54v-7h6v7" />
      <path d="M46 40c-6-7-9-11-9-16a9 9 0 0118 0c0 5-3 9-9 16z" />
      <circle cx="46" cy="24" r="3" />
      <path d="M6 54h52" />
    </svg>
  );
}

/** 3か国との連携（3つの四角を線でつなぐ） */
export function IconPartners({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <rect x="24" y="6" width="16" height="16" />
      <rect x="6" y="42" width="16" height="16" />
      <rect x="42" y="42" width="16" height="16" />
      <path d="M32 22v10M32 32L14 42M32 32l18 10" />
    </svg>
  );
}

/** 管理実績（人物の並び） */
export function IconPeople({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="32" cy="20" r="7" />
      <path d="M20 48v-6a12 12 0 0124 0v6z" />
      <circle cx="13" cy="26" r="5" />
      <path d="M4 48v-3a9 9 0 0113-8" />
      <circle cx="51" cy="26" r="5" />
      <path d="M60 48v-3a9 9 0 00-13-8" />
      <path d="M4 54h56" />
    </svg>
  );
}
