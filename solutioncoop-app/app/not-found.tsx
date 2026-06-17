import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4">
      {/* Error Code */}
      <div className="text-center mb-8">
        <p className="text-8xl md:text-9xl font-black text-[#1e40af]/10 leading-none select-none">
          404
        </p>
        <div className="mt-[-20px] md:mt-[-30px]">
          <h1 className="text-2xl md:text-3xl font-black text-[#1e40af] mb-3">
            ページが見つかりません
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            お探しのページは移動または削除された可能性があります。<br />
            URLをお確かめの上、再度お試しください。
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link
          href="/"
          className="bg-[#1e40af] text-white font-bold px-8 py-3 rounded hover:bg-[#1d4ed8] transition-all flex items-center gap-2 justify-center shadow-md"
        >
          🏠 トップページへ戻る
        </Link>
        <Link
          href="/#contact"
          className="bg-white text-[#1e40af] font-bold px-8 py-3 rounded border-2 border-[#1e40af] hover:bg-blue-50 transition-all flex items-center gap-2 justify-center"
        >
          ✉️ お問い合わせ
        </Link>
      </div>

      {/* Contact Info */}
      <div className="text-center text-xs text-gray-400 space-y-1">
        <p className="font-bold text-gray-500">ソリューション協同組合</p>
        <p>
          お電話でのお問い合わせ：
          <a href="tel:0722248067" className="text-[#1e40af] font-bold hover:underline ml-1">
            072-224-8067
          </a>
          <span className="ml-1">（平日 9:00〜18:00）</span>
        </p>
      </div>
    </div>
  );
}
