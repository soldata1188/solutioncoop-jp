import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせ",
  alternates: { canonical: "/" },
};

/** 静的書き出しにはサーバーのリダイレクトが無い。nginx の例では 301。 */
export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/#contact" />
      <p className="px-4 py-16 text-center text-[15px]">
        <Link href="/#contact" prefetch={false} className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">
          お問い合わせ
        </Link>
      </p>
    </>
  );
}
