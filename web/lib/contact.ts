export const INDUSTRIES = ["建設", "機械・金属", "食品製造", "その他"];
export const HEADCOUNTS = ["", "1〜2名", "3〜5名", "6〜10名", "11名以上", "未定"];

/** メール送信の準備ができないとき、画面と API が同じ文を返します。 */
export const CONTACT_PREPARING_MESSAGE =
  "フォームでの受付は現在準備中です。お手数ですが、お電話（072-224-8067）またはメール（info@solutioncoop-jp.com）にてお問い合わせください。";

export const CONTACT_TO_DEFAULT = "info@solutioncoop-jp.com";

type ContactEnv = Record<string, string | undefined>;

/** 未設定の変数は空文字にします。通知先だけ、空なら既定の info@ です。 */
export function contactMailConfig(env: ContactEnv = process.env) {
  const resendKey = env.RESEND_API_KEY?.trim() ?? "";
  const from = env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const to = env.CONTACT_TO_EMAIL?.trim() || CONTACT_TO_DEFAULT;
  const sheetsUrl = env.SHEETS_WEBHOOK_URL?.trim() ?? "";
  const mailReady = Boolean(resendKey && from);
  return { resendKey, from, to, sheetsUrl, mailReady, preparing: !mailReady && !sheetsUrl };
}
