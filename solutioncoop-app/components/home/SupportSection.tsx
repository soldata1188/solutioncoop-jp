import Image from 'next/image';

export default function SupportSection() {
  return (
    <section id="support" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          {/* Target Audience Label */}
          <div className="inline-block bg-[#1e40af] text-white font-black px-5 py-2 rounded mb-6 shadow-md text-sm md:text-base tracking-widest">
            🧑‍🔧 外国人材・実習生のみなさまへ<br />
            <span className="text-[10px] md:text-xs opacity-80 font-bold block mt-0.5">To Foreign Talents and Interns</span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#1e40af]/10 border border-[#1e40af]/20 px-4 py-1.5 rounded">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#1e40af]">
                年中無休・24時間対応 <span className="opacity-60 ml-1">/ Open 24/7</span>
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1e40af] mb-4 leading-tight">
            24時間365日対応<br className="md:hidden" />
            <span className="text-[#f97316]">相談窓口</span>
          </h2>
          <p className="text-[10px] md:text-xs text-orange-500 font-bold tracking-[0.2em] uppercase mb-8">
            24/7 MULTILINGUAL CONSULTATION HOTLINE
          </p>
          <div className="mb-0">
            <p className="text-slate-700 text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-bold mb-2">
              実習生の安心な日本生活を、母国語スタッフが全力でサポートします。
              <span className="text-[10px] md:text-sm text-gray-400 font-medium md:ml-3 block md:inline-block mt-1 md:mt-0">
                Our native staff fully support your safe stay in Japan.
              </span>
            </p>
          </div>
          {/* Language Flags */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 transition-all duration-500">
            <div className="flex flex-col items-center gap-2">
              <Image src="https://flagcdn.com/vn.svg" alt="Vietnam" width={40} height={28} className="rounded-sm object-cover shadow-sm" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                ベトナム語<br /><span className="text-[9px] text-gray-400">Vietnamese</span>
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image src="https://flagcdn.com/id.svg" alt="Indonesia" width={40} height={28} className="rounded-sm object-cover shadow-sm" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                インドネシア語<br /><span className="text-[9px] text-gray-400">Indonesian</span>
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image src="https://flagcdn.com/ph.svg" alt="Philippines" width={40} height={28} className="rounded-sm object-cover shadow-sm" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">
                タガログ語<br /><span className="text-[9px] text-gray-400">Tagalog</span>
              </span>
            </div>
          </div>
        </div>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">

          {/* Facebook */}
          <div className="group bg-white rounded border border-gray-100 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
            <div className="bg-[#1877F2]/5 p-8 flex items-center justify-center border-b border-[#1877F2]/10 group-hover:bg-[#1877F2]/10 transition-colors">
              <span className="text-5xl group-hover:scale-110 transition-transform duration-500 text-[#1877F2]">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1 text-center">
              <h3 className="text-xl font-black text-[#1877F2] mb-1">Facebookで相談</h3>
              <p className="text-[10px] text-[#1877F2]/60 font-bold mb-4 tracking-widest uppercase italic font-mono">Consult via Facebook</p>
              <div className="flex-1 mb-4 flex flex-col justify-center">
                <p className="text-sm text-slate-600 leading-relaxed font-bold mb-1.5">Messengerからも母国語スタッフが個別に対応いたします。</p>
                <p className="text-[10px] text-slate-400 font-medium">Native staff will respond to you individually through Messenger.</p>
              </div>
              <div className="p-2 bg-white border border-gray-100 rounded shadow-inner inline-block mx-auto mb-4">
                <Image src="/images/fb-qr.png" alt="Facebook QR" width={112} height={112} className="object-contain" />
                <p className="text-[10px] text-slate-400 mt-1 font-bold">QR code for Messenger</p>
              </div>
              <a
                href="https://www.facebook.com/solution.sakai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1877F2] text-white font-black py-4 px-2 rounded hover:opacity-90 transition-all shadow-md text-sm flex flex-col items-center"
              >
                <span>Messengerを開く</span>
                <span className="text-[10px] font-bold opacity-80 mt-0.5 tracking-wider uppercase">Open Messenger</span>
              </a>
            </div>
          </div>

          {/* LINE */}
          <div className="group bg-white rounded border border-gray-100 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative">
            <div className="absolute top-0 right-0 bg-[#06C755] text-white text-[9px] font-bold px-3 py-1 rounded-bl tracking-widest uppercase">Popular</div>
            <div className="bg-[#06C755]/5 p-8 flex items-center justify-center border-b border-[#06C755]/10 group-hover:bg-[#06C755]/10 transition-colors">
              <span className="group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-14 h-14 object-contain" />
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1 text-center">
              <h3 className="text-xl font-black text-[#06C755] mb-1">LINEで相談</h3>
              <p className="text-[10px] text-[#06C755]/60 font-bold mb-4 tracking-widest uppercase italic font-mono">Consult via LINE</p>
              <div className="flex-1 mb-4 flex flex-col justify-center">
                <p className="text-sm text-slate-600 leading-relaxed font-bold mb-1.5">友だち追加後、チャットでいつでもメッセージをお送りいただけます。</p>
                <p className="text-[10px] text-slate-400 font-medium">You can send messages at any time via LINE chat.</p>
              </div>
              <div className="p-2 bg-white border border-gray-100 rounded shadow-inner inline-block mx-auto mb-4">
                <Image src="/images/line-qr.png" alt="LINE QR" width={112} height={112} className="object-contain" />
                <p className="text-[10px] text-slate-400 mt-1 font-bold">Add us on LINE</p>
              </div>
              <a
                href="https://lin.ee/rBe1tM6"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#06C755] text-white font-black py-4 px-2 rounded hover:opacity-90 transition-all shadow-md text-sm flex flex-col items-center"
              >
                <span>LINE 友だち登録へ</span>
                <span className="text-[10px] font-bold opacity-80 mt-0.5 tracking-wider uppercase">Add as Friend</span>
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="group bg-white rounded border border-gray-100 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
            <div className="bg-slate-50 p-8 flex items-center justify-center border-b border-gray-100 group-hover:bg-blue-50 transition-colors">
              <span className="text-5xl group-hover:scale-110 transition-transform duration-500">📞</span>
            </div>
            <div className="p-6 flex flex-col flex-1 text-center">
              <h3 className="text-xl font-black text-[#1e40af] mb-1">電話で相談</h3>
              <p className="text-[10px] text-[#1e40af]/60 font-bold mb-4 tracking-widest uppercase italic font-mono">Consult by Phone</p>
              <div className="flex-1 mb-3 flex flex-col justify-center">
                <p className="text-sm text-slate-600 leading-relaxed font-bold mb-1.5">緊急時、すぐにお話したい場合はこちらへお電話ください。</p>
                <p className="text-[10px] text-slate-400 font-medium">In case of emergency, please call us here immediately.</p>
              </div>
              <a href="tel:0722248067" className="block text-2xl font-black text-[#1e40af] hover:text-[#f97316] transition-colors mb-4">
                072-224-8067
              </a>
              <a
                href="tel:0722248067"
                className="w-full bg-[#1e40af] text-white font-black py-4 px-2 rounded hover:bg-[#1d4ed8] transition-all shadow-md text-sm flex flex-col items-center"
              >
                <span>今すぐ発信する</span>
                <span className="text-[10px] font-bold opacity-80 mt-0.5 tracking-wider uppercase">Call Now</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
