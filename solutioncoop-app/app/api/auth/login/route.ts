// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/lib/session';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.ADMIN_PASSWORD ?? 'Solution2026@';

  if (password !== correct) {
    return NextResponse.json({ error: 'パスワードが正しくありません' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  session.isAdmin = true;
  await session.save();
  return res;
}
