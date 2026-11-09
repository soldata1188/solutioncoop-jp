"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import logo from "@/public/brand/SOL_Solution_Coop_official_2026-11-07.jpg";
import { X_HANDLE, X_POST_ID, X_URL, org } from "@/lib/site";
import { buttonClass } from "@/components/ui";

const WIDGET_SRC = "https://platform.twitter.com/widgets.js";
/** スクリプトが読めない、または投稿が描画されないときの待ち時間 */
const RENDER_WAIT_MS = 8000;
/**
 * 投稿枠の高さ（枠線を含む）。
 * 未クリックの案内（約352px）と、表示後の投稿（1280px幅で約367px）のどちらよりも大きくし、
 * クリックしてもページ下の要素が動かないようにしています。
 */
const SLOT_MIN_PX = 380;

const FALLBACK_MESSAGE = "投稿を表示できませんでした。Xで直接ご覧ください。";
const LOADING_MESSAGE = "投稿を読み込んでいます。しばらくお待ちください。";
const READY_MESSAGE = "投稿を表示しました。";

type Phase = "idle" | "loading" | "ready" | "fallback";

type TwttrApi = {
  ready: (fn: (api: TwttrApi) => void) => void;
  widgets: { load: (root?: HTMLElement | null) => void };
};

function readTwttr(): TwttrApi | undefined {
  return (window as Window & { twttr?: TwttrApi }).twttr;
}

function loadWidgets(onReady: () => void, onError: () => void) {
  const ready = () => {
    const twttr = readTwttr();
    if (!twttr?.ready || !twttr.widgets) {
      onError();
      return;
    }
    twttr.ready(() => onReady());
  };

  if (readTwttr()?.widgets) {
    ready();
    return;
  }

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SRC}"]`);
  if (existing) {
    existing.addEventListener("load", ready, { once: true });
    existing.addEventListener("error", onError, { once: true });
    return;
  }

  const script = document.createElement("script");
  script.src = WIDGET_SRC;
  script.async = true;
  script.setAttribute("charset", "utf-8");
  script.addEventListener("load", ready, { once: true });
  script.addEventListener("error", onError, { once: true });
  document.body.appendChild(script);
}

/**
 * 公式Xの投稿を、押すまで外部スクリプトを読まずに案内するカード。
 * ページ読込時はロゴ・アカウント名・リンクのみ。ボタンで widgets.js と当該投稿だけを読み込みます。
 * Cookie や localStorage / sessionStorage は使いません。
 */
export function OfficialXCard() {
  const [phase, setPhase] = useState<Phase>("idle");
  const mountRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const startedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  useEffect(() => {
    if (phase === "idle") return;
    statusRef.current?.focus({ preventScroll: true });
  }, [phase]);

  function showPost() {
    if (startedRef.current) return;
    const mount = mountRef.current;
    if (!mount) {
      setPhase("fallback");
      return;
    }
    const root: HTMLElement = mount;
    startedRef.current = true;
    setPhase("loading");

    let settled = false;
    let timer = 0;
    const observer = new MutationObserver(() => {
      if (root.querySelector("iframe")) finish("ready");
    });

    function finish(next: "ready" | "fallback") {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      observer.disconnect();
      if (next === "fallback") root.replaceChildren();
      setPhase(next);
    }

    timer = window.setTimeout(() => finish("fallback"), RENDER_WAIT_MS);
    observer.observe(root, { childList: true, subtree: true });
    cleanupRef.current = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      observer.disconnect();
    };

    const quote = document.createElement("blockquote");
    quote.className = "twitter-tweet";
    quote.setAttribute("data-dnt", "true");
    quote.setAttribute("data-lang", "ja");
    quote.setAttribute("aria-hidden", "true");
    const permalink = document.createElement("a");
    permalink.href = `${X_URL}/status/${X_POST_ID}`;
    permalink.tabIndex = -1;
    permalink.textContent = "Xでこの投稿を見る";
    quote.appendChild(permalink);
    root.appendChild(quote);

    loadWidgets(
      () => {
        if (settled) return;
        try {
          readTwttr()?.widgets.load(root);
        } catch {
          finish("fallback");
        }
      },
      () => finish("fallback"),
    );
  }

  const message =
    phase === "loading" ? LOADING_MESSAGE : phase === "fallback" ? FALLBACK_MESSAGE : phase === "ready" ? READY_MESSAGE : "";

  return (
    <div className="mx-auto w-full min-w-0 max-w-[550px]">
      <div
        data-x-state={phase}
        className="relative grid w-full min-w-0 overflow-x-clip rounded border border-line bg-white shadow-card"
        style={{ minHeight: SLOT_MIN_PX }}
      >
        <div
          ref={mountRef}
          className="col-start-1 row-start-1 w-full min-w-0 self-start [&_blockquote.twitter-tweet]:pointer-events-none [&_blockquote.twitter-tweet]:absolute [&_blockquote.twitter-tweet]:h-px [&_blockquote.twitter-tweet]:w-px [&_blockquote.twitter-tweet]:overflow-hidden [&_blockquote.twitter-tweet]:opacity-0 [&_iframe]:max-w-full"
        />
        {phase === "ready" ? (
          <p ref={statusRef} tabIndex={-1} role="status" className="sr-only">
            {READY_MESSAGE}
          </p>
        ) : (
          <div className="z-10 col-start-1 row-start-1 flex flex-col items-center justify-center bg-white px-5 py-8 text-center">
            {/* 原本 1500×1200 のまま。切り抜きも変色もしません（表示は 180×144）。 */}
            <Image src={logo} alt="" sizes="180px" className="h-[144px] w-[180px] max-w-full object-contain" />
            <p className="mt-4 text-base font-bold text-ink">{org.name}</p>
            <p className="mt-1 text-[15px] text-body">@{X_HANDLE}</p>
            {phase === "idle" ? (
              <button type="button" onClick={showPost} className={buttonClass("primary", "mt-6 w-full max-w-xs cursor-pointer text-base")}>
                投稿を表示する
              </button>
            ) : (
              <p ref={statusRef} tabIndex={-1} role="status" className="mt-4 text-[15px] leading-relaxed text-ink outline-none">
                {message}
              </p>
            )}
          </div>
        )}
      </div>
      <p className="mt-4 text-center">
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center px-3 text-[15px] font-bold text-primary-dark underline underline-offset-4"
        >
          Xで最新情報を見る
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </p>
    </div>
  );
}
