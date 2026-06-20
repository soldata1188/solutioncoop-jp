import { redirect } from 'next/navigation';

// /admin → /admin/news に自動リダイレクト
export default function AdminRootPage() {
  redirect('/admin/news');
}
