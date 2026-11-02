import { LINE_ARIA, LINE_LABEL, LINE_URL } from "@/lib/site";

/** 吹き出しアイコン（自作の簡易図形。LINE のロゴではありません。装飾のため読み上げ対象外） */
export function ChatIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4C7 4 3 7.1 3 11c0 2.3 1.4 4.3 3.6 5.6L6 20l3.9-2.2c.7.1 1.4.2 2.1.2 5 0 9-3.1 9-7s-4-7-9-7z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" strokeWidth="2.6" />
    </svg>
  );
}

/**
 * LINE公式アカウントへのボタン（新しいタブで開きます）。
 * サイト全体の主ボタン（文言「LINEで無料相談」）。色は #06C755 地に #222 文字（7.05:1、hover #2BD06B は 7.83:1）。タップ領域は高さ44px以上。
 */
export function LineButton({
  className = "",
  iconClassName = "h-4 w-4",
  children = LINE_LABEL,
}: {
  className?: string;
  iconClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={LINE_ARIA}
      className={`items-center justify-center whitespace-nowrap rounded bg-linegreen font-bold text-ink no-underline transition-colors hover:bg-linegreen-hover ${className}`}
    >
      <ChatIcon className={iconClassName} />
      {children}
    </a>
  );
}
