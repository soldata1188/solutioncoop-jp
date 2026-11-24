"use client";

import { useRef } from "react";
import { licenseImages, type LicenseImageItem } from "@/lib/license-images";

const DOC_WIDTHS: Record<LicenseImageItem["slug"], number[]> = {
  kanri: [480, 800, 1186],
  toroku: [480, 800, 1182],
};

function DocPicture({ item, sizes, className }: { item: LicenseImageItem; sizes: string; className: string }) {
  const widths = DOC_WIDTHS[item.slug];
  const set = (ext: "avif" | "webp") => widths.map((width) => `/licenses/${item.slug}-${width}.${ext} ${width}w`).join(", ");
  return (
    <picture className="block h-full w-full">
      <source type="image/avif" sizes={sizes} srcSet={set("avif")} />
      <source type="image/webp" sizes={sizes} srcSet={set("webp")} />
      <img
        src={`/licenses/${item.slug}-${widths[widths.length - 1]}.webp`}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading="lazy"
        decoding="async"
        sizes={sizes}
        className={className}
      />
    </picture>
  );
}

function DocumentIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-12 w-12 text-primary">
      <rect x="12" y="6" width="24" height="36" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M18 16h12M18 22h12M18 28h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Frame({ item }: { item: LicenseImageItem }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const caption = `${item.name} ${item.number}`;
  const placeholder = item.kind === "permit" ? "許可証の画像を掲載予定" : "登録証の画像を掲載予定";

  return (
    <figure className="flex flex-col">
      <div className="license-frame rounded border border-line bg-pale">
        <div className="license-frame-inner">
          {item.image ? (
            <button
              type="button"
              className="flex h-full w-full items-center justify-center bg-pale p-2"
              onClick={() => dialogRef.current?.showModal()}
              aria-label={`${item.alt}を拡大`}
            >
              <DocPicture item={item} sizes="(min-width: 768px) 400px, 100vw" className="h-full w-full object-contain" />
            </button>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
              <DocumentIcon />
              <p className="text-sm font-bold text-body">{placeholder}</p>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[13px] leading-relaxed text-ink">{caption}</figcaption>
      {item.image ? (
        <dialog
          ref={dialogRef}
          aria-label={item.alt}
          className="license-dialog w-[min(100%-2rem,1186px)] border border-line bg-white p-4"
          onClick={(event) => {
            if (event.target === dialogRef.current) dialogRef.current?.close();
          }}
        >
          <DocPicture item={item} sizes="(min-width: 768px) 1186px, 100vw" className="license-dialog-img mx-auto h-auto w-auto max-w-full object-contain" />
          <button
            type="button"
            className="mt-3 inline-flex min-h-11 items-center justify-center rounded bg-primary-dark px-6 font-bold text-white"
            onClick={() => dialogRef.current?.close()}
          >
            閉じる
          </button>
        </dialog>
      ) : null}
    </figure>
  );
}

export function LicenseFrames() {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {licenseImages.map((item) => (
        <li key={item.slug}>
          <Frame item={item} />
        </li>
      ))}
    </ul>
  );
}
