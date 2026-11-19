/**
 * お問い合わせフォームの受付（本サイト唯一のサーバー処理）。
 * 送信の条件と準備中の文言は lib/contact-submit.ts にあります。
 */
import { submitContact } from "@/lib/contact-submit";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ status: "invalid", message: "送信内容を読み取れませんでした。" }, { status: 400 });
  }
  return submitContact(body);
}
