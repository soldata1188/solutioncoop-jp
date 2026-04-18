import { NewsItem } from './news';

// ニュース項目の拡張インターフェース
export interface ExtendedNewsItem extends NewsItem {
  deleted?: boolean;         // ソフトデリート
  deletedAt?: string;        // 削除日時
  scheduledDate?: string;    // 予約投稿日時 (YYYY-MM-DDTHH:mm)
  updatedAt?: string;        // 最終更新日時
  editLog?: EditLogEntry[];  // 編集履歴
}

export interface EditLogEntry {
  at: string;       // ISO タイムスタンプ
  field: string;    // 編集されたフィールド
  from: string;
  to: string;
}

export interface ContactEntry {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  purpose: string;   // ご相談の目的
  message: string;
  date: string;     // ISO タイムスタンプ
  read: boolean;
  replied: boolean;
}

export interface LeadEntry {
  id: string;
  name: string;
  company: string;
  email: string;
  resource: string;  // ダウンロードされたリソース
  date: string;      // ISO タイムスタンプ
}
