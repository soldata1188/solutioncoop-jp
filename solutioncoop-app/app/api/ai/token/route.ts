import { NextResponse } from 'next/server';

export async function GET() {
  // Vì route này nằm trong thư mục admin (đã được middleware bảo vệ bằng Iron Session cookie)
  // Chỉ có admin đã đăng nhập mới gọi được.
  const apiKey = process.env.GEMINI_API_KEY || '';
  return NextResponse.json({ key: apiKey });
}
