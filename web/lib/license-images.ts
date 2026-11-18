import { licenses } from "@/lib/site";

/**
 * 許可証・登録証の原寸 PNG。画面では next/image が WebP / AVIF に変換して出します。
 * image が無いあいだは枠だけを出し、ファイルが無くてもビルドは壊れません。
 */
export type LicenseImageItem = {
  slug: "kanri" | "toroku";
  /** permit は許可証、registration は登録証 */
  kind: "permit" | "registration";
  name: string;
  number: string;
  alt: string;
  /** 例: "/licenses/kanri-dantai-kyokasho.png"。未設定ならプレースホルダー */
  image?: string;
  width: number;
  height: number;
};

export const licenseImages: LicenseImageItem[] = [
  {
    slug: "kanri",
    kind: "permit",
    name: licenses.kanri.label,
    number: licenses.kanri.number,
    alt: "監理団体許可証（許可番号 許1708000610）",
    image: "/licenses/kanri-dantai-kyokasho.png",
    width: 1186,
    height: 1676,
  },
  {
    slug: "toroku",
    kind: "registration",
    name: licenses.toroku.label,
    number: licenses.toroku.number,
    alt: "登録支援機関登録（更新）通知書（登録番号 19登-001221）",
    image: "/licenses/toroku-shien-kikan-tsuchisho.png",
    width: 1182,
    height: 1676,
  },
];
