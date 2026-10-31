/**
 * お問い合わせフォームの受付（本サイト唯一のサーバー処理）。
 * 環境変数が設定されている場合のみ送信します。未設定時は「現在準備中」を返し、何も送信しません。
 *  - メール通知（Resend）: RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL（省略時 info@solutioncoop-jp.com）
 *  - スプレッドシート記録（Google Apps Script Web アプリ）: SHEETS_WEBHOOK_URL, SHEETS_WEBHOOK_SECRET（任意）
 */
import { INDUSTRIES, HEADCOUNTS } from "@/lib/contact";

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ status: "invalid", message: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  // ハニーポット：入力があればボットとみなし、送信せずに完了を返す
  if (str(body.website, 200)) {
    return Response.json({ status: "sent", message: "送信が完了いたしました。" });
  }

  const data = {
    company: str(body.company, 100),
    name: str(body.name, 60),
    phone: str(body.phone, 20),
    email: str(body.email, 120),
    industry: str(body.industry, 20),
    headcount: str(body.headcount, 20),
    message: str(body.message, 3000),
    agree: body.agree === "yes",
  };

  const errors: Record<string, string> = {};
  if (!data.company) errors.company = "会社名をご入力ください。";
  if (!data.name) errors.name = "ご担当者名をご入力ください。";
  if (!/^[0-9０-９+\-－ー() ]{10,20}$/.test(data.phone)) errors.phone = "電話番号を正しくご入力ください。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "メールアドレスを正しくご入力ください。";
  if (!INDUSTRIES.includes(data.industry)) errors.industry = "業種をお選びください。";
  if (!HEADCOUNTS.includes(data.headcount)) errors.headcount = "受入れ人数の目安をお選びください。";
  if (!data.message) errors.message = "お問い合わせ内容をご入力ください。";
  if (!data.agree) errors.agree = "個人情報の取扱いへのご同意をお願いいたします。";

  if (Object.keys(errors).length > 0) {
    return Response.json({ status: "invalid", message: "入力内容をご確認ください。", errors }, { status: 422 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "info@solutioncoop-jp.com";
  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;
  const mailReady = Boolean(resendKey && from);

  if (!mailReady && !sheetsUrl) {
    return Response.json(
      {
        status: "not_configured",
        message:
          "フォームでの受付は現在準備中です。お手数ですが、お電話（072-224-8067）またはメール（info@solutioncoop-jp.com）にてお問い合わせください。",
      },
      { status: 503 },
    );
  }

  const text = [
    `会社名：${data.company}`,
    `ご担当者名：${data.name}`,
    `電話番号：${data.phone}`,
    `メールアドレス：${data.email}`,
    `業種：${data.industry}`,
    `受入れ人数の目安：${data.headcount || "未選択"}`,
    "",
    "お問い合わせ内容：",
    data.message,
  ].join("\n");

  const results: boolean[] = [];

  if (mailReady) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `【Webお問い合わせ】${data.company} ${data.name}様`, text }),
    }).catch(() => null);
    results.push(Boolean(r?.ok));
  }

  if (sheetsUrl) {
    const r = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.SHEETS_WEBHOOK_SECRET || "", receivedAt: new Date().toISOString(), ...data }),
    }).catch(() => null);
    results.push(Boolean(r?.ok));
  }

  if (results.some(Boolean)) {
    return Response.json({ status: "sent", message: "送信が完了いたしました。担当者より折り返しご連絡いたします。" });
  }
  return Response.json(
    { status: "error", message: "送信に失敗いたしました。お手数ですが、お電話にてお問い合わせください。" },
    { status: 502 },
  );
}
