'use client';
import { useState, useEffect } from 'react';
import type { ContactEntry } from '@/lib/types';
import Link from 'next/link';

type TabType = 'contacts' | 'quotes';

export default function AdminContactsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('contacts');
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [quotes, setQuotes]     = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactEntry | null>(null);
  const [selectedQuote, setSelectedQuote]     = useState<any | null>(null);
  const [toast, setToast]       = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function load() {
    setLoading(true);
    try {
      const [cRes, qRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/quotes')
      ]);
      if (cRes.ok) setContacts(await cRes.json());
      if (qRes.ok) setQuotes(await qRes.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => { 
    // Handle tab from URL
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'quotes') setActiveTab('quotes');
    
    load(); 
  }, []);

  // Actions for Contact
  async function toggleContactField(id: string, field: 'read' | 'replied', value: boolean) {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: value }),
    });
    if (res.ok) {
      showToast('更新しました');
      load();
    }
  }

  async function deleteContact(id: string) {
    if (!confirm('削除しますか？')) return;
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('削除しました');
      setSelectedContact(null);
      load();
    }
  }

  // Actions for Quote
  async function updateQuoteStatus(id: string, status: string) {
    const res = await fetch(`/api/quotes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      showToast('ステータスを更新しました');
      load();
    }
  }

  async function deleteQuote(id: string) {
    if (!confirm('この依頼を削除しますか？')) return;
    const res = await fetch(`/api/quotes?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('削除しました');
      setSelectedQuote(null);
      load();
    }
  }

  const unreadContacts = contacts.filter(c => !c.read).length;
  const newQuotes      = quotes.filter(q => q.status === 'new').length;

  return (
    <div className="p-6 md:p-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded font-bold text-sm text-white shadow-lg transition-all ${toast.type === 'ok' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'ok' ? '✅' : '❌'} {toast.msg}
        </div>
      )}

      {/* Modal: Contact Detail */}
      {selectedContact && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedContact(null)}>
          <div className="bg-white rounded max-w-lg w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-navy px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold">📬 お問い合わせ詳細</h3>
              <button onClick={() => setSelectedContact(null)} className="text-white/60 hover:text-white text-xl transition">✕</button>
            </div>
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <DetailItem label="お名前" value={selectedContact.name} />
                  <DetailItem label="会社名" value={selectedContact.company || '—'} />
                  <DetailItem label="メール" value={selectedContact.email} isEmail />
                  <DetailItem label="電話番号" value={selectedContact.phone || '—'} />
                  <div className="col-span-2">
                    <DetailItem label="ご相談の目的" value={selectedContact.purpose || '—'} />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">メッセージ内容</p>
                  <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border border-gray-100">
                    {selectedContact.message}
                  </div>
                </div>
                <div className="text-[10px] text-gray-400 text-right">
                  受信: {new Date(selectedContact.date).toLocaleString('ja-JP')}
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-50">
                  <ActionBtn onClick={() => toggleContactField(selectedContact.id, 'read', !selectedContact.read)} 
                    active={selectedContact.read} label={selectedContact.read ? '既読' : '未読'} icon="📩" />
                  <ActionBtn onClick={() => toggleContactField(selectedContact.id, 'replied', !selectedContact.replied)} 
                    active={selectedContact.replied} label={selectedContact.replied ? '返信済' : '未返信'} icon="💬" />
                  <button onClick={() => deleteContact(selectedContact.id)} className="text-xs text-red-400 hover:text-red-600 ml-auto transition">🗑️ 削除</button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Quote Detail */}
      {selectedQuote && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedQuote(null)}>
          <div className="bg-white rounded max-w-2xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="bg-orange-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold">💰 見積依頼・シミュレーション詳細</h3>
              <button onClick={() => setSelectedQuote(null)} className="text-white/60 hover:text-white text-xl transition">✕</button>
            </div>
            <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
                {/* Basic Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-b border-gray-100 pb-4">
                  <DetailItem label="会社名" value={selectedQuote.companyName} />
                  <DetailItem label="氏名" value={selectedQuote.contactName} />
                  <DetailItem label="メール" value={selectedQuote.email} isEmail />
                  <DetailItem label="電話" value={selectedQuote.phone} />
                </div>

                {/* Requirements */}
                <div className="bg-orange-50/50 p-4 rounded border border-orange-100 grid grid-cols-3 gap-4 text-sm">
                   <div>
                     <p className="text-xs text-orange-600 font-bold mb-1">職種</p>
                     <p className="font-bold">{selectedQuote.occupationLabel}</p>
                   </div>
                   <div>
                     <p className="text-xs text-orange-600 font-bold mb-1">人数</p>
                     <p className="font-bold">{selectedQuote.numberOfPeople}名</p>
                   </div>
                   <div>
                     <p className="text-xs text-orange-600 font-bold mb-1">期間</p>
                     <p className="font-bold">{selectedQuote.durationYears}年間</p>
                   </div>
                </div>

                {/* Estimate Summary */}
                <div>
                   <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">試算結果合計 (1名あたり)</p>
                   <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 whitespace-pre border border-gray-100 grid grid-cols-2 gap-y-2">
                      <span>初期費用:</span> <span className="text-right font-mono">¥{selectedQuote.estimate.perPerson.initial.toLocaleString()}</span>
                      <span>月額費用 (平均):</span> <span className="text-right font-mono">¥{selectedQuote.estimate.perPerson.monthlyFee.toLocaleString()}</span>
                      <div className="col-span-2 border-t border-gray-200 my-1"></div>
                      <span className="font-bold">総計 ({selectedQuote.durationYears}年):</span> 
                      <span className="text-right font-bold text-navy font-mono">¥{selectedQuote.estimate.totals.grandTotal.toLocaleString()}</span>
                   </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-400 mb-1">メッセージ</p>
                  <div className="bg-gray-50 rounded p-4 text-sm text-gray-600 italic border border-gray-100">
                    {selectedQuote.message || '（メッセージなし）'}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button onClick={() => updateQuoteStatus(selectedQuote.id, 'read')} 
                    className={`text-xs font-bold px-4 py-2 rounded transition border-2 ${selectedQuote.status === 'read' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-gray-200 text-gray-500'}`}>
                    {selectedQuote.status === 'read' ? '✅ 対応済み' : '📩 未対応'}
                  </button>
                  <button onClick={() => deleteQuote(selectedQuote.id)} className="text-xs text-red-400 hover:text-red-600 ml-auto transition">🗑️ 削除</button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800">顧客管理</h1>
          <p className="text-gray-500 text-sm mt-1">お問い合わせとシミュレーション依頼の一覧</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg self-start">
          <TabBtn active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')} label="お問い合わせ" count={unreadContacts} />
          <TabBtn active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')} label="見積/シミュレーション" count={newQuotes} accent="orange" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-4 animate-spin inline-block">⏳</p>
          <p>読み込み中...</p>
        </div>
      ) : (activeTab === 'contacts' ? (
        /* CONTACTS TABLE */
        contacts.length === 0 ? <EmptyState icon="📭" msg="お問い合わせはありません" /> : (
          <div className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                    <th className="px-5 py-3 text-left w-12"></th>
                    <th className="px-4 py-3 text-left">お名前 / 相談目的</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">会社名 / 連絡先 (Email/Tel)</th>
                    <th className="px-4 py-3 text-left w-24">日時</th>
                    <th className="px-4 py-3 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contacts.map(c => (
                    <tr key={c.id} className={`hover:bg-blue-50/20 cursor-pointer transition group ${!c.read ? 'bg-blue-50/40' : ''}`}
                      onClick={() => { setSelectedContact(c); if(!c.read) toggleContactField(c.id, 'read', true); }}>
                      <td className="px-5 py-4">
                        <div className="flex gap-1">
                          {!c.read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                          {!c.replied && <span className="w-2 h-2 bg-orange-400 rounded-full" />}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className={`font-bold text-gray-800 ${!c.read ? 'text-navy' : ''}`}>{c.name}</p>
                        <p className="text-[10px] text-navy-dark font-semibold bg-blue-50 px-1.5 py-0.5 rounded inline-block mt-1">{c.purpose || '—'}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <p className="text-gray-700 font-medium mb-1">{c.company || '—'}</p>
                        <div className="flex flex-col gap-0.5 text-[10px] text-gray-400">
                           <span className="flex items-center gap-1">📧 {c.email}</span>
                           <span className="flex items-center gap-1">📞 {c.phone || '—'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">{new Date(c.date).toLocaleDateString('ja-JP')}</td>
                      <td className="px-4 py-4 text-right">
                         <span className="text-navy text-xs font-bold opacity-30 group-hover:opacity-100 transition">詳細 →</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : (
        /* QUOTES TABLE */
        quotes.length === 0 ? <EmptyState icon="💰" msg="見積依頼はありません" /> : (
          <div className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
             <div className="overflow-x-auto">
                <table className="w-full text-sm">
                   <thead>
                      <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 text-[10px] uppercase tracking-wider font-bold">
                        <th className="px-5 py-3 text-left w-12"></th>
                        <th className="px-4 py-3 text-left">会社名 / 職種</th>
                        <th className="px-4 py-3 text-left hidden md:table-cell text-center">条件 (人数/期間)</th>
                        <th className="px-4 py-3 text-left hidden md:table-cell">連絡先 / Email</th>
                        <th className="px-4 py-3 text-left text-orange-600">概算総額</th>
                        <th className="px-4 py-3 text-left w-24">日時</th>
                        <th className="px-4 py-3 w-16"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                      {quotes.map(q => (
                        <tr key={q.id} className={`hover:bg-orange-50/20 cursor-pointer transition group ${q.status === 'new' ? 'bg-orange-50/40' : ''}`}
                          onClick={() => { setSelectedQuote(q); if(q.status === 'new') updateQuoteStatus(q.id, 'read'); }}>
                           <td className="px-5 py-4">
                              {q.status === 'new' && <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />}
                           </td>
                           <td className="px-4 py-4">
                              <p className="font-bold text-gray-800">{q.companyName}</p>
                              <p className="text-[10px] text-orange-700 font-bold bg-orange-100 px-1.5 py-0.5 rounded inline-block mt-1">{q.occupationLabel}</p>
                           </td>
                           <td className="px-4 py-4 text-center hidden md:table-cell">
                              <p className="bg-gray-100 px-2 py-0.5 rounded font-black text-gray-700 text-xs">{q.numberOfPeople}名</p>
                              <p className="text-[10px] text-gray-400 mt-1">{q.durationYears}年間</p>
                           </td>
                           <td className="px-4 py-4 hidden md:table-cell">
                              <p className="text-xs text-gray-600 font-bold mb-1">{q.contactName}</p>
                              <p className="text-[10px] text-gray-400">📧 {q.email}</p>
                           </td>
                           <td className="px-4 py-4">
                              <p className="font-black text-navy text-sm">¥{q.estimate.totals.grandTotal.toLocaleString()}</p>
                              <p className="text-[9px] text-gray-400">（実習期間累計）</p>
                           </td>
                           <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">{q.createdAt.split('T')[0]}</td>
                           <td className="px-4 py-4 text-right">
                              <span className="text-orange-600 text-xs font-bold opacity-30 group-hover:opacity-100 transition">詳細 →</span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )
      ))}
    </div>
  );
}

// Small helper components
function DetailItem({ label, value, isEmail }: any) {
  return (
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
      {isEmail ? (
        <a href={`mailto:${value}`} className="text-navy hover:underline font-bold text-sm block truncate">{value}</a>
      ) : (
        <p className="text-gray-800 font-semibold text-sm">{value}</p>
      )}
    </div>
  );
}

function ActionBtn({ onClick, active, label, icon }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all border-2 ${active ? 'bg-navy text-white border-navy' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'}`}>
      <span>{icon}</span> {label}
    </button>
  );
}

function TabBtn({ active, onClick, label, count, accent = 'navy' }: any) {
  const activeStyles = accent === 'orange' ? 'bg-white text-orange-600 shadow-sm' : 'bg-white text-navy shadow-sm';
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-5 py-2 rounded-md text-xs font-black transition-all ${active ? activeStyles : 'text-gray-400 hover:text-gray-600'}`}>
      {label}
      {count > 0 && <span className={`${accent === 'orange' ? 'bg-orange-500' : 'bg-navy'} text-white text-[10px] px-1.5 py-0.5 rounded-full`}>{count}</span>}
    </button>
  );
}

function EmptyState({ icon, msg }: any) {
  return (
    <div className="bg-white rounded border border-gray-100 p-16 text-center text-gray-400 shadow-sm">
      <p className="text-5xl mb-4">{icon}</p>
      <p className="font-bold text-gray-500">{msg}</p>
    </div>
  );
}
