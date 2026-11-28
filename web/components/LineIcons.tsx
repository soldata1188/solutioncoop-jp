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

/** 送り出し機関との連携（3つの四角を線でつなぐ） */
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


/** 地球（円＋経線・緯線） */
export function IconGlobe({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="32" cy="32" r="22" />
      <ellipse cx="32" cy="32" rx="10" ry="22" />
      <path d="M10 32h44M13.6 20h36.8M13.6 44h36.8" />
    </svg>
  );
}

/** 握手（左右の袖口と組み合わせた手） */
export function IconHandshake({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M4 20h8v22H4M60 20h-8v22h8" />
      <path d="M52 24l-9-4-13 8a3 3 0 004 4l8-4 10 9" />
      <path d="M12 24l8-4h9" />
      <path d="M12 39l5 1 7 6a3 3 0 004-4M23 41l6 5a3 3 0 004-4l-5-4M29 37l6 5a3 3 0 004-4l-4-3" />
    </svg>
  );
}

/** 飛行機（上から見た機体） */
export function IconPlane({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M32 6c2 0 3 2 3 5v14l19 11v5l-19-6v12l6 5v4l-9-3-9 3v-4l6-5V35l-19 6v-5l19-11V11c0-3 1-5 3-5z" />
    </svg>
  );
}

/** 右上がりのグラフ（棒＋上向きの矢印） */
export function IconChartUp({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M8 8v48h48" />
      <rect x="16" y="44" width="7" height="12" />
      <rect x="29" y="36" width="7" height="20" />
      <rect x="42" y="28" width="7" height="28" />
      <path d="M14 34l12-10 8 6 16-16M42 14h8v8" />
    </svg>
  );
}

/** 右下がりのグラフ（棒＋下向きの矢印） */
export function IconChartDown({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M8 8v48h48" />
      <rect x="16" y="32" width="7" height="24" />
      <rect x="29" y="40" width="7" height="16" />
      <rect x="42" y="47" width="7" height="9" />
      <path d="M14 12l12 10 8-6 16 14M50 22v8h-8" />
    </svg>
  );
}

/** 書類（重ねた2枚の用紙） */
export function IconDocuments({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M22 12V8a2 2 0 012-2h24a2 2 0 012 2v36a2 2 0 01-2 2h-4" />
      <rect x="14" y="14" width="30" height="44" rx="2" />
      <path d="M21 26h16M21 33h16M21 40h16M21 47h9" />
    </svg>
  );
}
