import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const filename = (await params).filename;
    
    // Bảo mật: Chặn path traversal
    if (filename.includes('..') || filename.includes('/')) {
      return new NextResponse('Invalid Resource', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'uploads', 'news', filename);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('File Not Found', { status: 404 });
    }

    // Đọc file dưới dạng stream
    const fileBuffer = fs.readFileSync(filePath);
    
    // Tự đoán định dạng (chủ yếu là file ảnh)
    let contentType = 'image/jpeg';
    if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.webp')) contentType = 'image/webp';
    else if (filename.endsWith('.gif')) contentType = 'image/gif';
    else if (filename.endsWith('.pdf')) contentType = 'application/pdf'; // fallback

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
