"use client";

import Link from "next/link";
import { useState } from "react";
import { INDUSTRIES, HEADCOUNTS } from "@/lib/contact";

type Status = { kind: "idle" | "sending" | "ok" | "info" | "error"; message?: string; errors?: Record<string, string> };

const field = "mt-2 block w-full min-h-12 rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-base text-ink focus:border-navy-700";
const label = "block font-bold text-navy-950";
const req = <span className="ml-2 rounded bg-navy-900 px-1.5 py-0.5 text-xs font-bold text-white">必須</span>;

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
      <div>
        <label htmlFor="company" className={label}>会社名{req}</label>
        <input id="company" name="company" type="text" required autoComplete="organization" className={field} {...a11y("company")} />
        {errNode("company")}
      </div>
      <div>
        <label htmlFor="name" className={label}>ご担当者名{req}</label>
        <input id="name" name="name" type="text" required autoComplete="name" className={field} {...a11y("name")} />
        {errNode("name")}
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
        <label htmlFor="industry" className={label}>業種{req}</label>
        <select id="industry" name="industry" required defaultValue="" className={field} {...a11y("industry")}>
          <option value="" disabled>選択してください</option>
          {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        {errNode("industry")}
      </div>
      <div>
        <label htmlFor="headcount" className={label}>受入れ人数の目安</label>
        <select id="headcount" name="headcount" defaultValue="" className={field} {...a11y("headcount")}>
          <option value="">選択してください</option>
          {HEADCOUNTS.filter(Boolean).map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
        {errNode("headcount")}
      </div>
      <div>
        <label htmlFor="message" className={label}>お問い合わせ内容{req}</label>
        <textarea id="message" name="message" required rows={6} className={field} {...a11y("message")} placeholder="ご相談内容や、資料請求をご希望の旨をご記入ください。" />
        {errNode("message")}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">この欄には何も入力しないでください</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <div className="flex min-h-11 items-start gap-3">
          <input id="agree" name="agree" type="checkbox" value="yes" required className="mt-1 h-6 w-6 shrink-0 cursor-pointer accent-navy-900" {...a11y("agree")} />
          <label htmlFor="agree" className="cursor-pointer">
            個人情報の取扱いに同意します{req}
          </label>
        </div>
        <p className="ml-9 mt-1 text-sm">
          <Link href="/privacy" className="inline-flex min-h-11 items-center font-bold text-navy-700 underline underline-offset-4">個人情報保護方針を確認する</Link>
        </p>
        {errNode("agree")}
      </div>
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="inline-flex min-h-14 w-full items-center justify-center rounded-md bg-navy-900 px-8 text-lg font-bold text-white hover:bg-navy-700 disabled:opacity-60 sm:w-auto"
      >
        {status.kind === "sending" ? "送信中です…" : "入力内容を送信する"}
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
