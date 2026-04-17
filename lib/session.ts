// lib/session.ts — Cấu hình session (iron-session)
import { SessionOptions } from 'iron-session';

export interface SessionData {
  isAdmin?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET ?? 'fallback-secret-change-this-32chars!!',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' && process.env.HTTPS_ENABLED === 'true', // Chỉ bật `secure` nếu có HTTPS
    maxAge: 60 * 60 * 8, // 8 giờ
  },
};
