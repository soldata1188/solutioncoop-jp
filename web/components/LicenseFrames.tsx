"use client";

import Image from "next/image";
import { useRef } from "react";
import { licenseImages, type LicenseImageItem } from "@/lib/license-images";

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
              <Image
                src={item.image}
                alt={item.alt}
                width={827}
                height={1170}
                sizes="(min-width: 768px) 400px, 100vw"
                className="h-full w-full object-contain"
              />
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
          className="license-dialog w-[min(100%-2rem,40rem)] border border-line bg-white p-4"
          onClick={(event) => {
            if (event.target === dialogRef.current) dialogRef.current?.close();
          }}
        >
          <Image
            src={item.image}
            alt={item.alt}
            width={827}
            height={1170}
            sizes="90vw"
            className="license-dialog-img mx-auto h-auto w-auto max-w-full object-contain"
          />
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
    <ul className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {licenseImages.map((item) => (
        <li key={item.slug}>
          <Frame item={item} />
        </li>
      ))}
    </ul>
  );
}
