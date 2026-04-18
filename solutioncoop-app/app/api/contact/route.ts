// app/api/contact/route.ts — Form liên hệ
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { ContactEntry } from '@/lib/types';
import { notifyNewContact } from '@/lib/mail';

const CONTACT_FILE = path.join(process.cwd(), 'data', 'contacts.json');

async function readContacts(): Promise<ContactEntry[]> {
  try {
    return JSON.parse(await fs.readFile(CONTACT_FILE, 'utf-8'));
  } catch {
    return [];
  }
}
async function writeContacts(data: ContactEntry[]) {
  await fs.writeFile(CONTACT_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET — admin: list all contacts
export async function GET() {
  const contacts = await readContacts();
  return NextResponse.json(contacts.sort((a, b) => b.date.localeCompare(a.date)));
}

// POST — public: submit contact form
export async function POST(req: Request) {
  const body = await req.json();
  const { name, company, email, phone, purpose, message } = body;

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: '必須項目が未入力です' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'メールアドレスが正しくありません' }, { status: 400 });
  }

  const contacts = await readContacts();
  const newContact: ContactEntry = {
    id: `contact-${Date.now()}`,
    name: name.trim(),
    company: company?.trim() ?? '',
    email: email.trim(),
    phone: phone?.trim() ?? '',
    purpose: purpose?.trim() ?? '',
    message: message.trim(),
    date: new Date().toISOString(),
    read: false,
    replied: false,
  };

  contacts.unshift(newContact);
  await writeContacts(contacts);

  // メール通知（非同期・エラーでもレスポンスに影響しない）
  notifyNewContact({
    name: newContact.name,
    company: newContact.company,
    email: newContact.email,
    phone: newContact.phone || '',
    purpose: newContact.purpose,
    message: newContact.message,
  }).catch(() => {});

  return NextResponse.json({ ok: true, id: newContact.id }, { status: 201 });
}
