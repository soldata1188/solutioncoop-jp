import Image from "next/image";
import type { ReactNode } from "react";
import { CONSULT_CLAIMS, CONSULT_LANGUAGES } from "@/lib/consult";
import { LINE_URL, TEL_HREF, org } from "@/lib/site";

const btn =
  "inline-flex min-h-16 w-full flex-col items-center justify-center rounded-control px-4 py-3 text-center font-bold leading-tight no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark";

function PeopleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.6-2.8 2.8-4.5 5.5-4.5S14.4 16.2 15 19" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M16.2 14.6c1.8.3 3.2 1.6 3.8 3.4" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="currentColor">
      <path d="M14.8 8.2V6.6c0-.6.4-.9 1-.9H17V3.4h-2.1C12.3 3.4 11 4.7 11 6.7v1.5H9.2v2.6H11V20h3.1v-9.2h2.2l.3-2.6h-2.5z" />
    </svg>
  );
}

function LineMark() {
  return (
    <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-site bg-linegreen text-sm font-bold text-ink">
      LINE
    </span>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-12 w-12 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3.5h3.2l1.4 3.6-2 1.2a12 12 0 0 0 5.1 5.1l1.2-2 3.6 1.4V16a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 6.7 2 2 0 0 1 7 3.5z" />
    </svg>
  );
}

function QrFrame({ children }: { children: ReactNode }) {
  return <div className="mx-auto flex h-40 w-40 items-center justify-center overflow-hidden rounded-site border border-line bg-white p-4">{children}</div>;
}

export function ConsultDesk({
  lineQr,
  messengerQr,
  messengerHref,
  headingLevel = "h1",
  showQr = true,
  columns = "lg",
}: {
  lineQr: string;
  messengerQr: string;
  messengerHref: string;
  /** ホームでは h2。単体ページでは h1。 */
  headingLevel?: "h1" | "h2";
  /** ホームでは QR を出さない。 */
  showQr?: boolean;
  /** ホームは sm から3列。 */
  columns?: "sm" | "lg";
}) {
  const messengerReady = messengerHref.length > 0 && (showQr ? messengerQr.length > 0 : true);
  const Heading = headingLevel;
  const CardHeading = headingLevel === "h1" ? "h2" : "h3";
  return (
    <div className="flex flex-col items-center text-center">
      <p className="inline-flex max-w-full flex-col items-center rounded-control bg-primary px-6 py-3 text-white">
        <span className="inline-flex items-center gap-2 text-base font-bold md:text-lg">
          <PeopleIcon />
          {CONSULT_CLAIMS.badgeJa}
        </span>
        <span className="mt-0.5 text-xs font-bold tracking-wide text-white">{CONSULT_CLAIMS.badgeEn}</span>
      </p>

      <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-control bg-white px-4 py-1.5 text-sm font-bold text-ink shadow-sm ring-1 ring-line">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-primary" />
        {CONSULT_CLAIMS.pillJa} / {CONSULT_CLAIMS.pillEn}
      </p>

      <Heading id={headingLevel === "h2" ? "for-workers" : undefined} className="mt-6 text-3xl font-bold leading-tight text-primary-darker md:text-5xl">
        {CONSULT_CLAIMS.titlePrefix}
        <span className="text-primary">{CONSULT_CLAIMS.titleAccent}</span>
      </Heading>
      <p className="mt-3 text-xs font-bold tracking-[0.18em] text-primary md:text-sm">{CONSULT_CLAIMS.hotlineEn}</p>
      <p className="mx-auto mt-5 max-w-[40rem] text-base font-bold leading-relaxed text-ink md:text-lg">{CONSULT_CLAIMS.leadJa}</p>
      <p className="mx-auto mt-1 max-w-[40rem] text-sm text-muted">{CONSULT_CLAIMS.leadEn}</p>

      <ul className="mt-8 grid w-full grid-cols-3 gap-x-1 sm:flex sm:w-auto sm:flex-wrap sm:items-start sm:justify-center sm:gap-8">
        {CONSULT_LANGUAGES.map((lang) => (
          <li key={lang.en} className="flex min-w-0 flex-col items-center sm:w-28">
            <Image src={lang.flag} alt="" width={lang.width} height={lang.height} unoptimized className="h-8 w-12 object-contain ring-1 ring-line sm:w-auto" />
            <span className="mt-2 text-sm font-bold leading-tight text-ink">{lang.ja}</span>
            <span className="text-xs font-bold leading-tight tracking-normal text-muted sm:tracking-wide">{lang.en}</span>
          </li>
        ))}
      </ul>

      <ul className={`mt-10 grid grid-cols-1 items-stretch gap-4 ${columns === "sm" ? "sm:grid-cols-3" : "lg:grid-cols-3"}`}>
        <li className="card-lift flex h-full flex-col overflow-hidden rounded-site border border-line bg-white text-center">
          <div className="flex h-28 items-center justify-center bg-[#e7f1ff]">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-fb">
              <FacebookIcon />
            </span>
          </div>
          <div className="flex flex-1 flex-col px-5 py-6">
            <CardHeading className="text-xl font-bold text-fb">Facebookで相談</CardHeading>
            <p className="text-xs font-bold italic tracking-wide text-fb">CONSULT VIA FACEBOOK</p>
            <p className="mt-4 text-sm font-bold leading-relaxed text-ink">友だち追加をするとベトナム語、インドネシア語、タガログ語で相談できます</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">Message us on Messenger to consult in Vietnamese, Indonesian, or Tagalog.</p>
            {showQr ? (
              <div className="mt-5">
                {messengerHref.length > 0 && messengerQr.length > 0 ? (
                  <QrFrame>
                    <div className="line-qr h-full w-full" role="img" aria-label="MessengerのQRコード" dangerouslySetInnerHTML={{ __html: messengerQr }} />
                  </QrFrame>
                ) : (
                  <QrFrame>
                    <span className="text-base font-bold text-muted">準備中</span>
                  </QrFrame>
                )}
              </div>
            ) : null}
            <div className="mt-auto pt-5">
              {messengerReady ? (
                <a href={messengerHref} target="_blank" rel="noopener noreferrer" className={`${btn} bg-fb text-white hover:bg-fb-hover`}>
                  <span>Messengerを開く</span>
                  <span className="text-xs tracking-wide">OPEN MESSENGER</span>
                  <span className="sr-only">（新しいタブで開きます）</span>
                </a>
              ) : (
                <button type="button" disabled aria-disabled="true" className={`${btn} cursor-not-allowed bg-fb text-white opacity-60`}>
                  <span>Messengerを開く</span>
                  <span className="text-xs tracking-wide">OPEN MESSENGER</span>
                </button>
              )}
            </div>
          </div>
        </li>

        <li className="card-lift flex h-full flex-col overflow-hidden rounded-site border border-line bg-white text-center">
          <div className="flex h-28 items-center justify-center bg-[#e7f9ee]">
            <LineMark />
          </div>
          <div className="flex flex-1 flex-col px-5 py-6">
            <CardHeading className="text-xl font-bold text-linegreen-text">LINEで相談</CardHeading>
            <p className="text-xs font-bold italic tracking-wide text-linegreen-text">CONSULT VIA LINE</p>
            <p className="mt-4 text-sm font-bold leading-relaxed text-ink">友だち追加をするとベトナム語、インドネシア語、タガログ語で相談できます</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">After you add us as a friend, you can consult in Vietnamese, Indonesian, or Tagalog.</p>
            {showQr ? (
              <div className="mt-5">
                <QrFrame>
                  <div className="line-qr h-full w-full" role="img" aria-label="LINEの友だち追加用QRコード" dangerouslySetInnerHTML={{ __html: lineQr }} />
                </QrFrame>
              </div>
            ) : null}
            <div className="mt-auto pt-5">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className={`${btn} bg-linegreen text-ink hover:bg-linegreen-hover`}>
                <span>LINE 友だち登録へ</span>
                <span className="text-xs tracking-wide">ADD AS FRIEND</span>
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
            </div>
          </div>
        </li>

        <li className="card-lift flex h-full flex-col overflow-hidden rounded-site border border-line bg-white text-center">
          <div className="flex h-28 items-center justify-center bg-pale">
            <PhoneIcon />
          </div>
          <div className="flex flex-1 flex-col px-5 py-6">
            <CardHeading className="text-xl font-bold text-primary">電話で相談</CardHeading>
            <p className="text-xs font-bold italic tracking-wide text-primary">CONSULT BY PHONE</p>
            <p className="mt-4 text-sm font-bold leading-relaxed text-ink">急いで話したいときは、この番号に電話してください。</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">If you need to talk right away, please call this number.</p>
            <p className={`mt-5 flex items-center justify-center text-3xl font-bold tracking-wide text-primary ${showQr ? "min-h-40" : ""}`}>{org.tel}</p>
            <div className="mt-auto pt-5">
              <a href={TEL_HREF} className={`${btn} bg-primary text-white hover:bg-primary-dark`}>
                <span>今すぐ発信する</span>
                <span className="text-xs tracking-wide">CALL NOW</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
