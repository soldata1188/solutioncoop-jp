/**
 * 情報公開の書類。ファイルは fileUrl を入れたときだけ出す。
 * status が preparing のあいだは「準備中」と表示し、リンクは出さない。
 */
export type DisclosureDocument = {
  id: string;
  name: string;
  status: "preparing" | "published";
  fileUrl?: string;
};

export const disclosureDocuments: DisclosureDocument[] = [
  { id: "kanrihi", name: "監理費表", status: "preparing" },
  { id: "unei-kitei", name: "運営規程", status: "preparing" },
];
