'use client';
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
    <div className="divide-y divide-gray-100">
      {docs.map((doc) => {
        const isPDF = doc.filename.toLowerCase().endsWith('.pdf');
        
        return (
          <div 
            key={doc.id} 
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
          >
            {/* Left side: Info */}
            <div className="flex gap-4 items-start min-w-0">
              <span className="text-2xl mt-0.5 shrink-0" aria-hidden="true">
                {isPDF ? '📄' : '📁'}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-[#1e40af] transition-colors">
                    {doc.title}
                  </h3>
                  {doc.protected && (
                    <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100 flex items-center gap-1">
                      🔒 会員限定
                    </span>
                  )}
                </div>
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mt-1">
                  <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span className="text-gray-200">•</span>
                  <span>更新日: {new Date(doc.uploadedAt).toLocaleDateString('ja-JP').replace(/\//g, '.')}</span>
                </div>
              </div>
            </div>

            {/* Right side: Action Button */}
            <a 
              href={doc.url} 
              target={doc.protected ? undefined : "_blank"} 
              rel="noopener noreferrer"
              onClick={(e) => handleDownload(doc, e)}
              className={`shrink-0 inline-flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded text-sm transition-all shadow-sm sm:w-auto text-center border ${
                doc.protected 
                  ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white hover:border-orange-500' 
                  : 'border-slate-200 bg-white text-[#1e40af] hover:bg-[#1e40af] hover:text-white hover:border-[#1e40af]'
              }`}
            >
              <span>{doc.protected ? '会員限定' : 'ダウンロード'}</span>
              <span className="text-base">{doc.protected ? '🔒' : '📥'}</span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
