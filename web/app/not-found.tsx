import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-navy-950">お探しのページが見つかりませんでした</h1>
      <p className="mt-4 text-muted">ページが移動または削除された可能性がございます。お手数ですが、トップページからお探しください。</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-navy-900 px-6 font-bold text-navy-900">トップページへ戻る</Link>
        <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-navy-900 px-6 font-bold text-white">お問い合わせ・資料請求</Link>
      </div>
    </div>
  );
}
