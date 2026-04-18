import fs from 'fs/promises';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclosureTable from '@/components/DisclosureTable';

async function getDocuments() {
  const filePath = path.join(process.cwd(), 'data', 'documents.json');
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export const metadata = {
  title: '情報公開 | ソリューション協同組合',
  description: 'ソリューション協同組合（大阪府堺市）の監理費表、運営規程などの公開書類をダウンロードいただけます。法令を順守し、透明性の高い運営を行っております。',
  alternates: { canonical: 'https://solutioncoop-jp.com/disclosure' },
};

export default async function DisclosurePage() {
  const docs = await getDocuments();

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-[#1e40af] mb-4 tracking-tight">情報公開</h1>
            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              関係法令を順守し、透明性の高い運営を行うため、当組合の監理費表および運営規程などの重要書類を公開しております。<br className="hidden md:block"/>
              各ドキュメントは直接ダウンロード、または閲覧が可能です。
            </p>
          </div>

          {/* Document Cards */}
          <div className="bg-white rounded shadow-sm overflow-hidden border-t-4 border-t-[#f97316]">
            <div className="bg-white px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-[#1e40af] font-black text-lg md:text-xl tracking-widest flex items-center gap-2">
                <span className="text-xl md:text-2xl">📋</span> 公開書類一覧
              </h2>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-100">
                全 {docs.length} 件
              </span>
            </div>
            
            {docs.length === 0 ? (
              <div className="p-16 text-center">
                <span className="text-5xl block mb-4 opacity-50">📄</span>
                <p className="text-gray-500 font-bold text-lg">現在、公開されている書類はありません。</p>
              </div>
            ) : (
              <DisclosureTable docs={docs} />
            )}
          </div>

          {/* Footer Guide text */}
          <div className="mt-8 text-center bg-gray-50 border-t border-gray-200 py-6 rounded">
             <p className="text-[11px] text-gray-500 font-bold mb-1">※PDFファイルを閲覧・印刷するには、Adobe Acrobat Reader等が必要です。</p>
             <p className="text-[11px] text-gray-500 font-bold">※その他、ご不明な点がございましたら「お問い合わせ」よりご連絡ください。</p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
