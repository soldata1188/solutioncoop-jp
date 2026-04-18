import { NewsItem } from './news';

// Mở rộng NewsItem với các field mới
export interface ExtendedNewsItem extends NewsItem {
  deleted?: boolean;         // Nhóm 2: soft delete
  deletedAt?: string;        // Nhóm 2: thời gian xóa
  scheduledDate?: string;    // Nhóm 2: ngày đăng tự động (YYYY-MM-DDTHH:mm)
  updatedAt?: string;        // Nhóm 2: lần sửa cuối
  editLog?: EditLogEntry[];  // Nhóm 2: lịch sử sửa
}

export interface EditLogEntry {
  at: string;       // ISO timestamp
  field: string;    // field đã sửa
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
  date: string;     // ISO timestamp
  read: boolean;
  replied: boolean;
}

export interface LeadEntry {
  id: string;
  name: string;
  company: string;
  email: string;
  resource: string;  // which PDF was downloaded
  date: string;      // ISO timestamp
}
