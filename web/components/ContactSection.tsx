import { PhoneIcon } from "@/components/Header";
import { ChatIcon, LineButton } from "@/components/LineButton";
import { org, repoFacts, TEL_HREF } from "@/lib/site";

/** 下書き。メールカードの説明だけを直すときは、この一文を差し替える。 */
const MAIL_DESCRIPTION =
  "受入れに関するご質問やご相談は、メールでも承っております。資料のご請求やお見積りのご依頼は、LINEからもお気軽にご連絡いただけます。";

const focus = "focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-primary-dark!";
const card = "flex h-full flex-col items-center rounded-site border border-line bg-white p-5 text-center";
const action = "mt-auto w-full pt-5";
const button = `flex min-h-14 w-full items-center justify-center rounded-control px-4 text-center font-bold no-underline ${focus}`;

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

function MethodIcon({ children }: { children: React.ReactNode }) {
  return <span className="flex h-12 w-12 items-center justify-center rounded-site bg-pale text-primary">{children}</span>;
}

/** ホームのお問い合わせ。文言・電話・メール・LINEのリンクはそのまま。 */
export function ContactMethods() {
  return (
    <ul className="contact-cards mx-auto grid max-w-[932px] grid-cols-1 items-stretch gap-4 md:grid-cols-3">
      <li className={card}>
        <MethodIcon><PhoneIcon className="h-5 w-5" /></MethodIcon>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">お電話でもご相談いただけます</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">受付時間：{repoFacts.hours}<br />FAX：{org.fax}</p>
        <div className={action}>
          <a href={TEL_HREF} className={`${button} gap-2 bg-primary text-lg text-white hover:bg-primary-dark`}>
            <PhoneIcon className="h-5 w-5" />
            {org.tel}
          </a>
        </div>
      </li>

      <li className={card}>
        <MethodIcon><MailIcon /></MethodIcon>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">メール</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body">{MAIL_DESCRIPTION}</p>
        <div className={action}>
          <a href={`mailto:${org.email}`} className={`${button} break-all border border-line bg-white text-base text-primary hover:bg-pale`}>
            {org.email}
          </a>
        </div>
      </li>

      <li className={card}>
        <MethodIcon><ChatIcon className="h-5 w-5" /></MethodIcon>
        <h3 className="mt-4 text-lg font-bold leading-snug text-ink">LINEでもご相談いただけます</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-body">当組合のLINE公式アカウントのトーク画面から、ご相談いただけます。</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">LINEでのご相談は、お返事までお時間をいただく場合がございます。あらかじめご了承ください。</p>
        <div className={action}>
          <LineButton className={`${button} gap-2 bg-linegreen text-base text-ink hover:bg-linegreen-hover`} iconClassName="h-5 w-5" />
        </div>
      </li>
    </ul>
  );
}
