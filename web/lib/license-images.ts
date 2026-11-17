import { licenses } from "@/lib/site";

/**
 * 許可証・登録証の画像枠。
 * 実物の写真を載せる手順:
 * 1. 下の file と同じ名前で web/public/licenses/ に JPEG を置く
 *    - 監理団体許可: web/public/licenses/kanri.jpg
 *    - 登録支援機関: web/public/licenses/toroku.jpg
 * 2. その項目の image に、公開パス（"/licenses/kanri.jpg" など）を入れる
 * image が無いあいだは枠だけを出し、ファイルが無くてもビルドは壊れません。
 */
export type LicenseImageItem = {
  slug: "kanri" | "toroku";
  /** permit は許可証、registration は登録証 */
  kind: "permit" | "registration";
  name: string;
  number: string;
  alt: string;
  /** 例: "/licenses/kanri.jpg"。未設定ならプレースホルダー */
  image?: string;
};

export const licenseImages: LicenseImageItem[] = [
  {
    slug: "kanri",
    kind: "permit",
    name: licenses.kanri.label,
    number: licenses.kanri.number,
    alt: "監理団体許可証の写し",
  },
  {
    slug: "toroku",
    kind: "registration",
    name: licenses.toroku.label,
    number: licenses.toroku.number,
    alt: "登録支援機関の登録証の写し",
  },
];
