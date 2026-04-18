import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'documents.json');
const uploadDir = path.join(process.cwd(), 'public', 'documents');

/**
 * ディレクトリとDBファイルの初期化
 */
async function initFile() {
  await fs.mkdir(uploadDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([]));
  }
}

export async function GET() {
  await initFile();
  const data = await fs.readFile(dataFile, 'utf-8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  await initFile();
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'ファイルまたはタイトルが不足しています' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // URL表示エラー防止のためのファイル名サニタイズ
    const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, safeFilename);

    // 物理ファイルの保存
    await fs.writeFile(filePath, buffer);

    // DBの更新
    const newDoc = {
      id: Date.now().toString(),
      title,
      filename: file.name,
      url: `/documents/${safeFilename}`,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };

    const rawData = await fs.readFile(dataFile, 'utf-8');
    const docs = JSON.parse(rawData);
    docs.unshift(newDoc);
    await fs.writeFile(dataFile, JSON.stringify(docs, null, 2));

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await initFile();
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'IDが不足しています' }, { status: 400 });

  const rawData = await fs.readFile(dataFile, 'utf-8');
  let docs = JSON.parse(rawData);
  const doc = docs.find((d: any) => d.id === id);

  if (doc) {
    // DBから削除
    docs = docs.filter((d: any) => d.id !== id);
    await fs.writeFile(dataFile, JSON.stringify(docs, null, 2));
    
    // 物理ファイルの削除
    try {
      const filePath = path.join(process.cwd(), 'public', doc.url);
      await fs.unlink(filePath);
    } catch(e) {
      // ファイルが既に存在しない場合はスキップ
    }
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  await initFile();
  try {
    const { id, protected: isProtected } = await request.json();
    if (!id) return NextResponse.json({ error: 'IDが不足しています' }, { status: 400 });

    const rawData = await fs.readFile(dataFile, 'utf-8');
    let docs = JSON.parse(rawData);
    docs = docs.map((d: any) => d.id === id ? { ...d, protected: isProtected } : d);
    
    await fs.writeFile(dataFile, JSON.stringify(docs, null, 2));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
