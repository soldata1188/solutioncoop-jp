// middleware.ts — セッションクッキーによる /admin および /api の保護
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // ── 1. Giao diện Admin (/admin) ──
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (!session.isAdmin) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── 2. Các API endpoints (/api) ──
  if (pathname.startsWith('/api')) {
    // Danh sách API công khai (Public):
    // - Đăng nhập/Đăng xuất
    // - Gửi thông tin form Liên hệ (POST)
    // - Gửi thông tin form Tài liệu (POST)
    // - Lấy danh sách tin tức (GET)
    const isPublicAuth = pathname.startsWith('/api/auth');
    const isPublicContact = pathname === '/api/contact' && method === 'POST';
    const isPublicLeads = pathname === '/api/leads' && method === 'POST';
    const isPublicNewsGet = pathname.startsWith('/api/news') && method === 'GET';

    if (!isPublicAuth && !isPublicContact && !isPublicLeads && !isPublicNewsGet) {
      const res = NextResponse.next();
      const session = await getIronSession<SessionData>(req, res, sessionOptions);

      if (!session.isAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};

