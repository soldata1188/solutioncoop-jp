/**
 * お問い合わせの受付処理。ルートはこれだけを呼びます。
 * メールは RESEND_API_KEY と CONTACT_FROM_EMAIL が両方あるときだけ送ります。
 * 通知先は CONTACT_TO_EMAIL、無ければ info@solutioncoop-jp.com です。
 * 返信先は、検証を通ったお客様のメールアドレスです。
 * スプレッドシート用 URL は任意で、無くてもメール送信はできます。
 */
import { CONTACT_PREPARING_MESSAGE, HEADCOUNTS, INDUSTRIES, contactMailConfig } from "./contact.ts";

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function submitContact(body: Record<string, unknown>, env: Record<string, string | undefined> = process.env) {
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
  if (!data.name) errors.name = "お名前をご入力ください。";
  if (!/^[0-9０-９+\-－ー() ]{10,20}$/.test(data.phone)) errors.phone = "電話番号を正しくご入力ください。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "メールアドレスを正しくご入力ください。";
  if (data.industry && !INDUSTRIES.includes(data.industry)) errors.industry = "業種をお選びください。";
  if (data.headcount && !HEADCOUNTS.includes(data.headcount)) errors.headcount = "受入れ人数の目安をお選びください。";
  if (!data.message) errors.message = "ご相談内容をご入力ください。";
  if (!data.agree) errors.agree = "個人情報の取扱いへのご同意をお願いいたします。";

  if (Object.keys(errors).length > 0) {
    return Response.json({ status: "invalid", message: "入力内容をご確認ください。", errors }, { status: 422 });
  }

  const { resendKey, from, to, sheetsUrl, mailReady, preparing } = contactMailConfig(env);

  if (preparing) {
    return Response.json({ status: "not_configured", message: CONTACT_PREPARING_MESSAGE }, { status: 503 });
  }

  const text = [
    `会社名：${data.company}`,
    `お名前：${data.name}`,
    `電話番号：${data.phone}`,
    `メールアドレス：${data.email}`,
    ...(data.industry ? [`業種：${data.industry}`] : []),
    ...(data.headcount ? [`受入れ人数の目安：${data.headcount}`] : []),
    "",
    "ご相談内容：",
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
      body: JSON.stringify({ secret: env.SHEETS_WEBHOOK_SECRET || "", receivedAt: new Date().toISOString(), ...data }),
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
