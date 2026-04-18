// middleware.ts — セッションクッキーによる /admin の保護
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /admin 配下のみを保護（/admin/login は除外）
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const res = NextResponse.next();
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    if (!session.isAdmin) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
