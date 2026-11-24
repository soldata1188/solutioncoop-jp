import { PhoneIcon } from "@/components/Header";
import { LineButton } from "@/components/LineButton";
import { fullAddress, org, repoFacts, TEL_HREF } from "@/lib/site";

const focus = "focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-primary-dark!";

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

function PinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}

function MethodIcon({ children }: { children: React.ReactNode }) {
  return <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-pale text-primary-dark">{children}</span>;
}

/** /contact にあった連絡先。文言はそのまま。 */
export function ContactMethods() {
  return (
    <div className="contact-cards mx-auto grid max-w-[932px] gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <article className="flex flex-col rounded border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <MethodIcon><PhoneIcon className="h-5 w-5" /></MethodIcon>
            <h3 className="pt-2 text-lg font-bold leading-snug text-ink">お電話でもご相談いただけます</h3>
          </div>
          <a href={TEL_HREF} className={`mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded bg-primary-dark px-4 text-lg font-bold text-white no-underline hover:bg-primary-darker ${focus}`}>
            <PhoneIcon className="h-5 w-5" />
            {org.tel}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-muted">受付時間：{repoFacts.hours}<br />FAX：{org.fax}</p>
        </article>

        <article className="flex flex-col rounded border border-line bg-white p-5 shadow-card sm:p-6">
          <div className="flex items-start gap-3">
            <MethodIcon><MailIcon /></MethodIcon>
            <h3 className="pt-2 text-lg font-bold leading-snug text-ink">メール</h3>
          </div>
          <a href={`mailto:${org.email}`} className={`mt-5 flex min-h-14 w-full items-center justify-center break-all rounded border-2 border-primary-dark bg-white px-4 text-center text-base font-bold text-primary-dark no-underline hover:bg-pale ${focus}`}>
            {org.email}
          </a>
        </article>
      </div>

      <article className="rounded border border-line border-l-4 border-l-linegreen bg-white p-5 shadow-card sm:p-6">
        <h3 className="text-lg font-bold leading-snug text-ink">LINEでもご相談いただけます</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-body">当組合のLINE公式アカウントのトーク画面から、ご相談いただけます。</p>
        <LineButton className="mt-4 flex min-h-14 w-full gap-2 px-4 text-base sm:w-fit sm:min-w-64 sm:px-8" iconClassName="h-5 w-5" />
        <p className="mt-3 text-sm leading-relaxed text-muted">LINEでのご相談は、お返事までお時間をいただく場合がございます。あらかじめご了承ください。</p>
      </article>

      <article className="rounded border border-line bg-white p-5 shadow-card sm:p-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <MethodIcon><PinIcon /></MethodIcon>
            <div>
              <h3 className="text-lg font-bold leading-snug text-ink">所在地</h3>
              <address className="mt-2 text-[15px] leading-relaxed text-body not-italic">{fullAddress}</address>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MethodIcon><ClockIcon /></MethodIcon>
            <div>
              <h3 className="text-lg font-bold leading-snug text-ink">受付時間</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{repoFacts.hours}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
