'use client';

import { useState, useEffect } from 'react';
import type { WorkerItem } from '@/lib/workers';
import ImageUploader from '@/components/ImageUploader';

export default function AdminWorkersPage() {
  const [workers, setWorkers] = useState<WorkerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // Form & Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', company: '', img: '', nationality: 'vn' });

  // Delete State
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function showToast(msg: string, type: 'ok' | 'err' = 'ok') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function loadData() {
    setLoading(true);
    const res = await fetch('/api/workers');
    const data = await res.json();
    setWorkers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openNewModal() {
    setEditingId(null);
    setFormData({ name: '', company: '', img: '', nationality: 'vn' });
    setIsModalOpen(true);
  }

  function openEditModal(w: WorkerItem) {
    setEditingId(w.id);
    setFormData({ name: w.name, company: w.company, img: w.img, nationality: w.nationality });
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      // Update
      const res = await fetch(`/api/workers/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast('更新が完了しました');
      } else {
        showToast('更新エラー', 'err');
      }
    } else {
      // Create
      const res = await fetch('/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        showToast('新規登録が完了しました');
      } else {
        showToast('登録エラー', 'err');
      }
    }
    setIsModalOpen(false);
    loadData();
  }

  async function handleDeleteConfirm() {
    if (!deleteId) return;
    const res = await fetch(`/api/workers/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('削除が完了しました');
    } else {
      showToast('削除エラー', 'err');
    }
    setDeleteId(null);
    loadData();
  }

  const NATIONALITIES: Record<string, string> = {
    vn: 'ベトナム',
    id: 'インドネシア',
    ph: 'フィリピン',
    mm: 'ミャンマー',
    kh: 'カンボジア',
    np: 'ネパール',
  };

  return (
    <div className="p-6 md:p-8">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded font-bold text-sm text-white transition-all ${toast.type === 'ok' ? 'bg-green-600' : 'bg-red-600'}`}>
          {toast.type === 'ok' ? '✅' : '❌'} {toast.msg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded p-6 max-w-sm w-full shadow-2xl">
            <h3 className="font-bold text-gray-800 text-center mb-4 text-lg">本当に削除しますか？</h3>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 border text-gray-600 font-bold rounded hover:bg-gray-50 transition">
                キャンセル
              </button>
              <button onClick={handleDeleteConfirm} className="flex-1 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition">
                削除する
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{editingId ? '実習生情報の編集' : '新規実習生の追加'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">氏名（アルファベット）</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例: NGUYEN VAN A" className="w-full border rounded p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">職種・配属先企業名</label>
                <input required type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="例: 建設業 / 堺建設㈱" className="w-full border rounded p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">国籍</label>
                <div className="relative">
                  <select value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    className="w-full border rounded p-2 pl-9 text-sm bg-white appearance-none">
                    {Object.entries(NATIONALITIES).map(([code, label]) => (
                      <option key={code} value={code}>{label}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <img src={`https://flagcdn.com/w20/${formData.nationality}.png`} alt={formData.nationality} className="w-4 h-auto shadow-sm rounded-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">アバター画像</label>
                <div className="border rounded-lg p-3 bg-gray-50/50">
                  <ImageUploader 
                    value={formData.img} 
                    onChange={v => setFormData({ ...formData, img: v })} 
                    seoHint={formData.name || 'worker-avatar'} 
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 border text-gray-600 font-bold rounded hover:bg-gray-50 transition">
                  キャンセル
                </button>
                <button type="submit" className="flex-1 py-2 bg-navy text-white font-bold rounded hover:bg-blue-900 transition">
                  保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-800">実習生ネットワーク管理</h1>
          <p className="text-gray-500 text-sm mt-1">LPに {workers.length} 名の実習生が表示されています</p>
        </div>
        <button onClick={openNewModal} className="bg-navy hover:bg-blue-900 text-white font-bold px-5 py-3 rounded transition flex items-center gap-2 shadow-sm">
          <span>➕</span> 新規追加
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">読み込み中...</div>
      ) : (
        <div className="bg-white rounded border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs w-16">画像</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">氏名</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">職種・配属先</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">国籍</th>
                <th className="px-4 py-3 w-32"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {workers.map(w => (
                <tr key={w.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={w.img} alt={w.name} className="w-full h-full object-cover" 
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/9.x/personas/svg?seed=${w.id}`; }} 
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-800 tracking-wide">{w.name}</td>
                  <td className="px-4 py-3 text-gray-600">{w.company}</td>
                  <td className="px-4 py-3">
                    <span className="bg-white pr-2 pl-1.5 py-1 rounded-full text-[10px] font-bold text-gray-600 border border-gray-200 shadow-sm inline-flex items-center gap-1.5">
                      <img src={`https://flagcdn.com/w20/${w.nationality}.png`} alt={w.nationality} className="w-3.5 h-auto rounded-[2px]" />
                      {NATIONALITIES[w.nationality] || w.nationality}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEditModal(w)} className="text-xs bg-blue-50 text-navy hover:bg-blue-100 transition px-3 py-1.5 rounded font-semibold mr-2 border border-blue-100">
                      編集
                    </button>
                    <button onClick={() => setDeleteId(w.id)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 transition px-3 py-1.5 rounded font-semibold border border-red-100">
                      削除
                    </button>
                  </td>
                </tr>
              ))}
              {workers.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400 font-bold">データがありません。</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
