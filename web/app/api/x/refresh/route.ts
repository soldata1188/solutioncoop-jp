import { revalidatePath, revalidateTag } from "next/cache";
import { X_POSTS_CACHE_TAG } from "@/lib/x/map-posts";
import { refreshAuthDecision } from "@/lib/x/refresh-auth";

export const dynamic = "force-dynamic";

const SUCCESS_HTML = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>更新しました｜ソリューション協同組合</title>
</head>
<body style="margin:0;font-family:sans-serif;background:#fff;color:#222;">
  <main style="max-width:32rem;margin:4rem auto;padding:0 1rem;line-height:1.8;">
    <p style="font-size:1.125rem;font-weight:700;">Xの最新投稿を更新しました。</p>
    <p style="font-size:1rem;"><a href="/" style="color:#0f4d2a;">ホームへ戻る</a></p>
  </main>
</body>
</html>
`;

function hiddenHeaders(status: number): HeadersInit {
  return {
    "content-type": status === 200 ? "text/html; charset=utf-8" : "text/plain; charset=utf-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex",
  };
}

/** 合言葉つきのリンクを開いたときだけ、公式Xの投稿キャッシュを破棄します。 */
export function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  const decision = refreshAuthDecision(process.env["X_REFRESH_SECRET"], key);
  if (decision !== 200) {
    const message = decision === 404 ? "Not Found" : "Unauthorized";
    return new Response(message, { status: decision, headers: hiddenHeaders(decision) });
  }
  revalidateTag(X_POSTS_CACHE_TAG, { expire: 0 });
  revalidatePath("/");
  return new Response(SUCCESS_HTML, { status: 200, headers: hiddenHeaders(200) });
}
