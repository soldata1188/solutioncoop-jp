'use client';
import Link from 'next/link';

interface Document {
  id: string;
  title: string;
  filename: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  protected?: boolean;
}

export default function DisclosureTable({ docs }: { docs: Document[] }) {
  const BADGE: Record<string, string> = {
    pdf: 'bg-red-50 text-red-600 border-red-200',
    file: 'bg-green-50 text-green-600 border-green-200',
  };

  const handleDownload = (doc: Document, e: React.MouseEvent) => {
    if (doc.protected) {
      e.preventDefault();
      const code = prompt('🔒 会員コード（パスワード）を入力してください:');
      if (code === 'solution@') {
        const link = document.createElement('a');
        link.href = doc.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (code !== null) {
        alert('❌ 会員コードが正しくありません。');
      }
    }
  };

  return (
    <div className="overflow-x-auto pb-2">
      <table className="w-full min-w-[600px] text-left border-collapse">
        <thead className="bg-[#1e40af] text-white">
          <tr>
            <th className="px-5 py-4 text-xs font-black tracking-widest uppercase border-r border-[#173085] w-24 text-center">形式</th>
            <th className="px-5 py-4 text-xs font-black tracking-widest uppercase border-r border-[#173085]">書類名</th>
            <th className="px-5 py-4 text-xs font-black tracking-widest uppercase border-r border-[#173085] whitespace-nowrap w-32">更新日</th>
            <th className="px-5 py-4 text-xs font-black tracking-widest uppercase text-center whitespace-nowrap w-40">ダウンロード</th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-200">
          {docs.map((doc, idx) => {
            const isPDF = doc.filename.toLowerCase().endsWith('.pdf');
            const bgClass = idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]';
            
            return (
              <tr key={doc.id} className={`${bgClass} hover:bg-blue-50 transition-colors group`}>
                <td className="px-5 py-4 border-r border-gray-200 text-center">
                   <div className={`inline-flex items-center justify-center px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase border shadow-sm ${isPDF ? BADGE.pdf : BADGE.file}`}>
                     {isPDF ? 'PDF' : 'FILE'}
                   </div>
                </td>
                <td className="px-5 py-4 border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-800 text-[15px] group-hover:text-[#1e40af] transition-colors">{doc.title}</p>
                    {doc.protected && <span className="text-orange-500 text-xs" title="会員限定">🔒</span>}
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono mt-1">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                </td>
                <td className="px-5 py-4 border-r border-gray-200 text-[11px] font-bold text-gray-500 whitespace-nowrap">
                  {new Date(doc.uploadedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}
                </td>
                <td className="px-5 py-4 text-center">
                   <a href={doc.url} target={doc.protected ? undefined : "_blank"} rel="noopener noreferrer"
                     onClick={(e) => handleDownload(doc, e)}
                     className={`inline-flex items-center justify-center gap-1.5 bg-white border font-black px-4 py-2.5 rounded text-[12px] transition-colors shadow-sm w-full ${doc.protected ? 'border-orange-400 text-orange-600 hover:bg-orange-500 hover:text-white' : 'border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white'}`}>
                     <span>{doc.protected ? '会員限定・保存' : '閲覧・保存'}</span>
                     <span className="text-sm">{doc.protected ? '🔒' : '📥'}</span>
                   </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
