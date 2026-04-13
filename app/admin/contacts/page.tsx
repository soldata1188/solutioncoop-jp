'use client';
import { useState, useEffect } from 'react';
import type { ContactEntry } from '@/lib/types';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<ContactEntry | null>(null);
  const [toast, setToast]       = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await fetch('/api/contact');
    if (res.ok) setContacts(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleField(id: string, field: 'read' | 'replied', value: boolean) {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    if (res.ok) {
      showToast(field === 'read' ? (value ? '既読にしました' : '未読にしました') : (value ? '返信済みにしました' : '未返信にしました'));
      load();
    }
  }

  async function deleteContact(id: string) {
    if (!confirm('この問い合わせを削除しますか？')) return;
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('削除しました');
      setSelected(null);
      load();
    }
  }

  const unread  = contacts.filter(c => !c.read).length;
  const unreplied = contacts.filter(c => !c.replied).length;

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all ${toast.type === 'ok' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'ok' ? '✅' : '❌'} {toast.msg}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold">📬 お問い合わせ詳細</h3>
              <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-xl transition">✕</button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">お名前</p>
                  <p className="font-semibold text-gray-800">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">会社名</p>
                  <p className="text-gray-700">{selected.company || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">メール</p>
                  <a href={`mailto:${selected.email}`} className="text-navy hover:underline font-medium">{selected.email}</a>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-1">電話番号</p>
                  <p className="text-gray-700">{selected.phone || '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 mb-1">お問い合わせ内容</p>
                <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </div>
              </div>
              <div className="text-xs text-gray-400">
                受信日時: {new Date(selected.date).toLocaleString('ja-JP')}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => toggleField(selected.id, 'read', !selected.read)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg border-2 transition-all ${selected.read ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:border-blue-300'}`}>
                  {selected.read ? '✅ 既読' : '📩 未読'}
                </button>
                <button
                  onClick={() => toggleField(selected.id, 'replied', !selected.replied)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg border-2 transition-all ${selected.replied ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
                  {selected.replied ? '✅ 返信済み' : '💬 未返信'}
                </button>
                <a href={`mailto:${selected.email}?subject=Re: お問い合わせの件（ソリューション協同組合）`}
                  className="text-xs font-bold px-4 py-2 rounded-lg bg-accent text-white hover:bg-orange-700 transition ml-auto">
                  ✉️ メールで返信
                </a>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <button onClick={() => deleteContact(selected.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold transition">
                  🗑️ この問い合わせを削除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800">お問い合わせ管理</h1>
        <p className="text-gray-500 text-sm mt-1">お客様からの問い合わせ一覧</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: '総件数', value: contacts.length, icon: '📬', color: 'bg-navy' },
          { label: '未読', value: unread, icon: '📩', color: unread > 0 ? 'bg-red-500' : 'bg-gray-400' },
          { label: '未返信', value: unreplied, icon: '💬', color: unreplied > 0 ? 'bg-orange-500' : 'bg-gray-400' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className={`w-9 h-9 ${s.color} rounded-xl flex items-center justify-center text-lg mb-2`}>{s.icon}</div>
            <p className="text-2xl font-black text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4 animate-spin inline-block">⏳</p>
          <p>読み込み中...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold">お問い合わせはまだありません</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">ステータス</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">お名前</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">会社名</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide hidden md:table-cell">メール</th>
                  <th className="text-left px-4 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide w-28">日時</th>
                  <th className="px-4 py-4 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.map(c => (
                  <tr key={c.id}
                    className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${!c.read ? 'bg-blue-50/30' : ''}`}
                    onClick={() => { setSelected(c); if (!c.read) toggleField(c.id, 'read', true); }}>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        {!c.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0" title="未読" />}
                        {!c.replied && <span className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0" title="未返信" />}
                        {c.read && c.replied && <span className="text-green-500 text-xs">✓</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className={`font-semibold text-gray-800 ${!c.read ? 'font-black' : ''}`}>{c.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-[200px]">{c.message}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-600 hidden md:table-cell">{c.company || '—'}</td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <a href={`mailto:${c.email}`} className="text-navy hover:underline text-xs" onClick={e => e.stopPropagation()}>
                        {c.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(c.date).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="px-4 py-4">
                      <button className="text-xs text-navy hover:text-accent font-semibold transition">
                        詳細 →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
