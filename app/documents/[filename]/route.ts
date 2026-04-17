import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const filename = params.filename;
    
    // Bảo mật: Chặn path traversal
    if (filename.includes('..') || filename.includes('/')) {
      return new NextResponse('Invalid Resource', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'documents', filename);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('File Not Found', { status: 404 });
    }

    // Đọc file dưới dạng stream
    const fileBuffer = fs.readFileSync(filePath);
    
    // Tự đoán định dạng
    let contentType = 'application/octet-stream';
    if (filename.endsWith('.pdf')) contentType = 'application/pdf';
    else if (filename.endsWith('.xls') || filename.endsWith('.xlsx')) contentType = 'application/vnd.ms-excel';
    else if (filename.endsWith('.png')) contentType = 'image/png';
    else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) contentType = 'image/jpeg';
    else if (filename.endsWith('.doc') || filename.endsWith('.docx')) contentType = 'application/msword';

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
