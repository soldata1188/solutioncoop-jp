"use client";

import Link from "next/link";
import { useState } from "react";

type Status = { kind: "idle" | "sending" | "ok" | "info" | "error"; message?: string; errors?: Record<string, string> };

const field = "mt-2 block w-full min-h-12 rounded border-2 border-[#949494] bg-white px-3 py-2 text-base text-ink focus:border-primary-dark";
const label = "block font-bold text-ink";
const req = <span className="ml-2 rounded bg-primary-dark px-1.5 py-0.5 text-xs font-bold text-white">必須</span>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { status?: string; message?: string; errors?: Record<string, string> };
      if (res.ok && json.status === "sent") setStatus({ kind: "ok", message: json.message });
      else if (json.status === "not_configured") setStatus({ kind: "info", message: json.message });
      else setStatus({ kind: "error", message: json.message, errors: json.errors });
    } catch {
      setStatus({ kind: "error", message: "通信エラーが発生いたしました。お手数ですが、お電話にてお問い合わせください。" });
    }
  }

  const err = (k: string) => status.errors?.[k];
  const a11y = (k: string) => ({ "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `${k}-error` : undefined });
  const errNode = (k: string) => (err(k) ? <p id={`${k}-error`} className="mt-1 font-bold text-red-700">{err(k)}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <p className="text-sm text-muted">ご入力いただくのは5項目です（すべて必須）。</p>
      <div>
        <label htmlFor="name" className={label}>お名前{req}</label>
        <input id="name" name="name" type="text" required autoComplete="name" className={field} {...a11y("name")} />
        {errNode("name")}
      </div>
      <div>
        <label htmlFor="company" className={label}>会社名{req}</label>
        <input id="company" name="company" type="text" required autoComplete="organization" className={field} {...a11y("company")} />
        {errNode("company")}
      </div>
      <div>
        <label htmlFor="phone" className={label}>電話番号{req}</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} {...a11y("phone")} />
        {errNode("phone")}
      </div>
      <div>
        <label htmlFor="email" className={label}>メールアドレス{req}</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} {...a11y("email")} />
        {errNode("email")}
      </div>
      <div>
        <label htmlFor="message" className={label}>ご相談内容{req}</label>
        <p id="message-hint" className="mt-1 text-sm text-muted">例：2027年4月からの受入れを相談したい／費用を詳しく知りたい　など</p>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={field}
          {...a11y("message")}
          aria-describedby={err("message") ? "message-hint message-error" : "message-hint"}
        />
        {errNode("message")}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">この欄には何も入力しないでください</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <div className="flex min-h-11 items-start gap-3">
          <input id="agree" name="agree" type="checkbox" value="yes" required className="mt-1 h-6 w-6 shrink-0 cursor-pointer accent-primary-dark" {...a11y("agree")} />
          <label htmlFor="agree" className="cursor-pointer">
            個人情報の取扱いに同意します{req}
          </label>
        </div>
        <p className="ml-9 mt-1 text-sm">
          <Link href="/privacy" className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">個人情報保護方針を確認する</Link>
        </p>
        {errNode("agree")}
      </div>
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded bg-cta px-8 text-lg font-bold text-ink shadow-sm hover:bg-cta-hover disabled:opacity-60 sm:w-auto"
      >
        {status.kind === "sending" ? "送信中です…" : "入力内容を送信する"}
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
      </button>
      <div role="status" aria-live="polite">
        {status.message ? (
          <p className={"rounded-lg p-4 font-bold " + (status.kind === "ok" ? "bg-green-50 text-green-900" : status.kind === "info" ? "bg-amber-50 text-amber-950" : "bg-red-50 text-red-800")}>
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
