type Props = { children?: React.ReactNode; label?: string };

/** 未確定情報を明示するための「要確認」表示 */
export function Placeholder({ children, label = "要確認" }: Props) {
  return (
    <span className="inline-flex flex-wrap items-center gap-2 rounded-md border-2 border-dashed border-amber-600 bg-amber-50 px-2 py-0.5 text-amber-900">
      <strong className="text-sm font-bold">【{label}】</strong>
      {children ? <span>{children}</span> : null}
    </span>
  );
}

export function CheckBadge() {
  return (
    <span className="ml-2 inline-block rounded border border-amber-600 bg-amber-50 px-1.5 text-sm font-bold text-amber-900">
      要確認
    </span>
  );
}
