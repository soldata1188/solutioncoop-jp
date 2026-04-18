// app/api/upload/route.ts — Image upload for news articles
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'news');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'ファイルが選択されていません' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: '対応形式: JPG, PNG, WebP, GIF' }, { status: 400 });
    }

    // Validate file size (max 30MB)
    const MAX_SIZE = 30 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'ファイルサイズは30MB以下にしてください' }, { status: 400 });
    }

    // SEO tiếng Nhật: Hỗ trợ Kanji, Hiragana, Katakana và ký tự Latinh
    const hint = formData.get('hint') as string || 'article-image';
    const cleanHint = hint
      .toLowerCase()
      .trim()
      // Loại bỏ các ký tự đặc biệt gây lỗi URL, nhưng GIỮ LẠI ký tự Nhật Bản (Kanji/Kana)
      .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '') 
      .replace(/\s+/g, '-')      // Thay khoảng trắng bằng gạch ngang
      .substring(0, 80);          // Cho phép độ dài lớn hơn để chứa đủ Kanji

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const timestamp = Date.now();
    const safeName = `${cleanHint}-${timestamp}.${ext}`;

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(UPLOAD_DIR, safeName);
    await fs.writeFile(filePath, buffer);

    // Return public URL path
    const publicUrl = `/uploads/news/${safeName}`;
    return NextResponse.json({ ok: true, url: publicUrl }, { status: 201 });
  } catch (err) {

    return NextResponse.json({ error: 'アップロードに失敗しました' }, { status: 500 });
  }
}
