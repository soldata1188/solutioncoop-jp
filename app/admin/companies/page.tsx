'use client';
import { useState, useEffect } from 'react';

export default function CompaniesAdminPage() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newCompany, setNewCompany] = useState('');

  useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCompanies(data);
        setLoading(false);
      });
  }, []);

  const handleRemove = (index: number) => {
    const updated = [...companies];
    updated.splice(index, 1);
    setCompanies(updated);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;
    setCompanies([...companies, newCompany.trim()]);
    setNewCompany('');
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...companies];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setCompanies(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companies),
      });
      if (res.ok) alert('正常に保存されました。');
      else alert('保存に失敗しました。');
    } catch {
      alert('サーバーエラーが発生しました。');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">読み込み中...</div>;

  return (
    <div className="p-4 md:p-8 text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-navy">🏢 受入企業様リスト管理</h1>
          <p className="text-sm text-gray-500 mt-1">トップページの「受入企業様」に表示される名前を編集します。</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md transition disabled:opacity-50"
        >
          {saving ? '⏳ 保存中...' : '💾 保存する'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Add New Section */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <form onSubmit={handleAdd} className="flex gap-3">
            <input 
              type="text" 
              value={newCompany} 
              onChange={e => setNewCompany(e.target.value)} 
              placeholder="新しい企業名を入力..."
              className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold transition shadow-sm whitespace-nowrap">
              ➕ 追加
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="p-6">
          <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">現在のリスト ({companies.length}社)</p>
          {companies.length === 0 ? (
            <p className="text-gray-500 text-center py-8">データがありません</p>
          ) : (
            <ul className="space-y-2">
              {companies.map((c, idx) => (
                <li key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:border-blue-200 transition group">
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-gray-300 w-6 text-center">{idx + 1}</span>
                    <span className="font-bold text-gray-700">{c}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition">
                    <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} className="w-8 h-8 rounded bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center disabled:opacity-30">
                      ↑
                    </button>
                    <button onClick={() => handleRemove(idx)} className="w-8 h-8 rounded bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition ml-2">
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
