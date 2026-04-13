import nodemailer from 'nodemailer';

// ── SMTP設定 ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = process.env.SMTP_USER || 'noreply@solutioncoop-jp.com';
const NOTIFY_TO = process.env.NOTIFY_EMAIL || process.env.SMTP_USER || '';

/**
 * SMTP設定が有効かどうかチェック
 */
function isMailConfigured(): boolean {
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * 汎用メール送信関数
 */
async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  if (!isMailConfigured()) {
    console.warn('[Mail] SMTP未設定のためメール送信をスキップしました。');
    return false;
  }
  try {
    await transporter.sendMail({
      from: `"ソリューション協同組合" <${FROM}>`,
      to,
      subject,
      html,
    });
    console.log(`[Mail] 送信成功: ${to} — ${subject}`);
    return true;
  } catch (err) {
    console.error('[Mail] 送信失敗:', err);
    return false;
  }
}

// ── 見積もりリクエスト通知 ──
interface QuoteNotifyData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  occupationLabel: string;
  workplace: string;
  numberOfPeople: number;
  durationYears: number;
  grandTotal: number;
  message: string;
}

export async function notifyNewQuote(data: QuoteNotifyData): Promise<boolean> {
  const subject = `【新規見積もり】${data.companyName} 様（${data.numberOfPeople}名・${data.occupationLabel}）`;
  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#172554;color:#fff;padding:20px 24px;">
        <h2 style="margin:0;font-size:18px;">💰 新規見積もりリクエスト</h2>
        <p style="margin:8px 0 0;font-size:12px;color:#93c5fd;">費用シミュレーションから送信されました</p>
      </div>
      <div style="padding:24px;background:#f9fafb;border:1px solid #e5e7eb;">
        <h3 style="margin:0 0 16px;font-size:14px;color:#1e3a8a;">📋 企業情報</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px;">会社名</td><td style="padding:8px 0;font-weight:bold;">${data.companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">ご担当者名</td><td style="padding:8px 0;font-weight:bold;">${data.contactName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">メール</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">電話番号</td><td style="padding:8px 0;"><a href="tel:${data.phone}" style="color:#2563eb;">${data.phone}</a></td></tr>
        </table>

        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

        <h3 style="margin:0 0 16px;font-size:14px;color:#1e3a8a;">🔧 シミュレーション条件</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px;">送出し国</td><td style="padding:8px 0;">${data.country}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">職種</td><td style="padding:8px 0;">${data.occupationLabel}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">就業場所</td><td style="padding:8px 0;">${data.workplace}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">受入れ人数</td><td style="padding:8px 0;font-weight:bold;">${data.numberOfPeople}名</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">実習期間</td><td style="padding:8px 0;">${data.durationYears}年間</td></tr>
        </table>

        <div style="margin:16px 0;padding:16px;background:#172554;color:#fff;text-align:center;">
          <p style="margin:0;font-size:12px;color:#93c5fd;">概算総額</p>
          <p style="margin:4px 0 0;font-size:28px;font-weight:900;">¥${data.grandTotal.toLocaleString('ja-JP')}</p>
          <p style="margin:4px 0 0;font-size:11px;color:#93c5fd;">（税別）</p>
        </div>

        ${data.message ? `
          <div style="margin:16px 0;padding:12px;background:#fef3c7;border:1px solid #fde68a;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:bold;color:#92400e;">💬 ご質問・ご要望</p>
            <p style="margin:0;font-size:14px;color:#451a03;">${data.message}</p>
          </div>
        ` : ''}

        <div style="margin:20px 0 0;text-align:center;">
          <a href="mailto:${data.email}?subject=【ソリューション協同組合】お見積もりについて"
             style="display:inline-block;background:#2563eb;color:#fff;padding:12px 32px;font-weight:bold;font-size:14px;text-decoration:none;">
            📧 返信する
          </a>
        </div>
      </div>
      <div style="padding:12px 24px;text-align:center;font-size:11px;color:#9ca3af;">
        ソリューション協同組合 管理システム
      </div>
    </div>
  `;
  return sendMail(NOTIFY_TO, subject, html);
}

// ── お問い合わせ通知 ──
interface ContactNotifyData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export async function notifyNewContact(data: ContactNotifyData): Promise<boolean> {
  const subject = `【新規お問い合わせ】${data.company || data.name} 様`;
  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#172554;color:#fff;padding:20px 24px;">
        <h2 style="margin:0;font-size:18px;">📬 新規お問い合わせ</h2>
        <p style="margin:8px 0 0;font-size:12px;color:#93c5fd;">ウェブサイトのお問い合わせフォームから送信されました</p>
      </div>
      <div style="padding:24px;background:#f9fafb;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:8px 0;color:#6b7280;width:100px;">お名前</td><td style="padding:8px 0;font-weight:bold;">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">会社名</td><td style="padding:8px 0;">${data.company || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">メール</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;">電話番号</td><td style="padding:8px 0;">${data.phone || '—'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
        <p style="font-size:12px;font-weight:bold;color:#374151;margin:0 0 8px;">💬 お問い合わせ内容</p>
        <p style="font-size:14px;color:#1f2937;white-space:pre-wrap;margin:0;padding:12px;background:#fff;border:1px solid #e5e7eb;">${data.message}</p>
        <div style="margin:20px 0 0;text-align:center;">
          <a href="mailto:${data.email}?subject=【ソリューション協同組合】お問い合わせありがとうございます"
             style="display:inline-block;background:#2563eb;color:#fff;padding:12px 32px;font-weight:bold;font-size:14px;text-decoration:none;">
            📧 返信する
          </a>
        </div>
      </div>
      <div style="padding:12px 24px;text-align:center;font-size:11px;color:#9ca3af;">
        ソリューション協同組合 管理システム
      </div>
    </div>
  `;
  return sendMail(NOTIFY_TO, subject, html);
}
