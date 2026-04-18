'use client';
import { useState, useEffect } from 'react';

export default function DocumentManager() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocs(Array.isArray(data) ? data : []);
    } catch(e) {

    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return alert('ドキュメント名とファイルを選択してください。');

    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      
      setTitle('');
      setFile(null);
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
      fetchDocs();
    } catch (error) {
      alert('アップロード中にエラーが発生しました。ファイルサイズ等をご確認ください。');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, titleName: string) => {
    if(!confirm(`「${titleName}」を完全に削除してもよろしいですか？\n※この操作は取り消せません。`)) return;
    try {
      await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
      fetchDocs();
    } catch(e) {
      alert('ファイルの削除に失敗しました。');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('✅ リンクをクリップボードにコピーしました：\n' + url);
  };

  const totalCount = docs.length;
  const totalSizeMB = docs.reduce((acc, d) => acc + d.size, 0) / 1024 / 1024;
  
  function getDocTag(titleName: string) {
    if (titleName.includes('規程') || titleName.includes('規則')) return { label: '規程・ルール', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    if (titleName.includes('費') || titleName.includes('料金')) return { label: '費用・明細', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (titleName.includes('報告') || titleName.includes('実績')) return { label: '事業報告', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (titleName.includes('許可') || titleName.includes('証')) return { label: '許可証', color: 'bg-yellow-50 text-yellow-800 border-yellow-300' };
    return { label: '一般書類', color: 'bg-gray-100 text-gray-700 border-gray-200' };
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-[#1e40af] mb-1">公開書類・ファイル管理</h1>
        <p className="text-sm text-gray-500 font-bold">情報公開書類のアップロードと管理（ファイル自動分類機能搭載）</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-[#1e40af]">
          <div className="w-12 h-12 bg-blue-50 text-[#1e40af] rounded flex items-center justify-center text-xl font-black">📂</div>
          <div>
            <p className="text-[11px] text-gray-500 font-black tracking-widest uppercase mb-1">総書類数 (Files)</p>
            <p className="text-2xl font-black text-slate-800">{loading ? '-' : totalCount} <span className="text-sm font-bold text-gray-400">件</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded flex items-center justify-center text-xl font-black">💾</div>
          <div>
            <p className="text-[11px] text-gray-500 font-black tracking-widest uppercase mb-1">使用容量 (Storage)</p>
            <p className="text-2xl font-black text-slate-800">{loading ? '-' : totalSizeMB.toFixed(2)} <span className="text-sm font-bold text-gray-400">MB</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-[#f97316]">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded flex items-center justify-center text-xl font-black">⚡</div>
          <div>
            <p className="text-[11px] text-gray-500 font-black tracking-widest uppercase mb-1">システム状態</p>
            <p className="text-lg font-black text-emerald-600">正常稼働中</p>
          </div>
        </div>
      </div>
      
      {/* Upload Form */}
      <div className="bg-white p-6 md:p-8 rounded shadow-sm border border-gray-100 mb-8 border-t-4 border-t-[#f97316]">
        <h2 className="font-black text-lg mb-5 text-gray-800 flex items-center gap-2"><span className="text-orange-500">➕</span> 新規書類のアップロード</h2>
        <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-5 items-end">
          <div className="flex-1 w-full relative">
            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">ドキュメント名 <span className="text-red-500">*</span></label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="例：令和6年度 監理費表"
              className="w-full border-2 border-gray-200 px-4 py-2.5 rounded focus:border-[#1e40af] outline-none font-bold text-gray-800 bg-gray-50 focus:bg-white transition-colors" />
          </div>
          <div className="flex-1 w-full relative">
            <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">ファイル (PDF/Word/Excel/画像 等) <span className="text-red-500">*</span></label>
            <input type="file" id="fileInput" onChange={e => setFile(e.target.files?.[0] || null)} required accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
              className="w-full border-2 border-gray-200 px-4 py-2 rounded focus:border-[#1e40af] outline-none bg-gray-50 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-[#1e40af] file:text-white file:font-bold hover:file:bg-blue-800 transition-colors" />
          </div>
          <button type="submit" disabled={uploading || !file || !title}
            className="w-full md:w-auto bg-[#1e40af] hover:bg-blue-800 text-white font-black py-2.5 px-8 rounded transition h-[48px] disabled:opacity-50 disabled:cursor-not-allowed shadow hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
            {uploading ? 'アップロード中...' : '⬆ アップロード'}
          </button>
        </form>
      </div>

      {/* Document List */}
      <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-black tracking-widest uppercase text-gray-500">分類タグ</th>
                <th className="px-6 py-4 text-[11px] font-black tracking-widest uppercase text-gray-500">ドキュメント名</th>
                <th className="px-6 py-4 text-[11px] font-black tracking-widest uppercase text-gray-500 w-24">サイズ</th>
                <th className="px-6 py-4 text-[11px] font-black tracking-widest uppercase text-gray-500 w-32">登録日</th>
                <th className="px-6 py-4 text-[11px] font-black tracking-widest uppercase text-gray-500 text-right w-[280px]">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500 font-bold">データを読み込んでいます...</td></tr>
              ) : docs.length === 0 ? (
                <tr><td colSpan={5} className="p-16 text-center text-gray-400 font-bold">
                  <span className="text-4xl block mb-2">📭</span> アップロードされた書類はありません。
                </td></tr>
              ) : (
                docs.map(doc => {
                  const tagInfo = getDocTag(doc.title);
                  return (
                  <tr key={doc.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="px-6 py-5 w-36">
                       <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-black tracking-widest border ${tagInfo.color}`}>
                          {tagInfo.label}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-black text-gray-800 text-base mb-1 group-hover:text-[#1e40af] transition-colors">{doc.title}</p>
                      <p className="text-[10px] text-gray-400 font-mono bg-gray-100 inline-block px-2 py-0.5 rounded">{doc.filename}</p>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-500">
                      {(doc.size / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="px-6 py-5 text-xs font-black text-gray-500">
                      {new Date(doc.uploadedAt).toLocaleDateString('ja-JP')}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2 items-center">
                         <button onClick={() => copyToClipboard(doc.url)} className="text-xs border-2 border-gray-200 bg-white hover:border-[#1e40af] hover:text-[#1e40af] text-gray-700 px-3 py-1.5 rounded font-black transition-colors">🔗 コピー</button>
                         <a href={doc.url} target="_blank" className="text-xs bg-blue-50 hover:bg-blue-100 text-[#1e40af] px-3 py-1.5 rounded font-black transition-colors border border-blue-200">👀 表示</a>
                         <button onClick={() => handleDelete(doc.id, doc.title)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded font-black transition-colors border border-red-200">🗑️ 削除</button>
                      </div>
                    </td>
                  </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
