import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '24時間365日対応 相談窓口｜ソリューション協同組合',
  description: '実習生・特定技能外国人のための24時間365日対応相談窓口。ベトナム語、インドネシア語、英語でのサポートが可能です。電話、LINE、Facebookからお気軽にご相談ください。',
  alternates: { canonical: 'https://solutioncoop-jp.com/support' },
};

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20 bg-slate-50 min-h-screen">
        {/* Page Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden bg-[#1e40af] text-white">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f97316]/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase">24 Hours / 365 Days Service</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              24時間365日対応<br className="md:hidden" />
              <span className="text-orange-400">相談窓口</span>
            </h1>
            <p className="text-sm md:text-lg text-blue-200 font-bold uppercase tracking-[0.2em] mb-8">
              24/7 Support Center
            </p>
            
            <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-4">
              実習生の皆様が安心して日本で過ごせるよう、<br className="hidden md:block" />
              母国語スタッフがいつでもお悩みにお答えします。
            </p>
            <p className="text-sm text-blue-300 max-w-2xl mx-auto leading-relaxed mb-10 italic">
              Our native-speaking staff are always here to help with your concerns <br className="hidden md:block" />
              to ensure you can stay in Japan with peace of mind.
            </p>

            {/* Language Support Icons */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl shadow-lg transform group-hover:scale-110 transition">🇻🇳</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Tiếng Việt</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl shadow-lg transform group-hover:scale-110 transition">🇮🇩</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Bahasa Indonesia</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-4xl shadow-lg transform group-hover:scale-110 transition">🇵🇭</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Tagalog / Philippines</span>
              </div>
            </div>
          </div>
        </section>

        {/* Communication Channels */}
        <section className="py-16 md:py-24 -mt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Channel 1: Facebook */}
              <div className="group bg-white rounded border border-gray-200 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="bg-[#1877F2]/5 p-8 flex items-center justify-center border-b border-[#1877F2]/10 group-hover:bg-[#1877F2]/10 transition-colors">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">👥</span>
                </div>
                <div className="p-8 flex flex-col flex-1 text-center">
                  <h2 className="text-xl font-black text-[#1877F2] mb-1">Facebookで相談</h2>
                  <p className="text-xs text-[#1877F2]/60 font-bold mb-6 tracking-widest uppercase italic">Contact via Facebook</p>
                  
                  <div className="flex-1 space-y-4 mb-8">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold">
                      Messengerからも母国語スタッフが<br/>個別に対応いたします。
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      Personal support via Messenger.
                    </p>

                    {/* FB QR Code */}
                    <div className="mt-6 p-2 bg-white border border-gray-100 rounded shadow-inner inline-block mx-auto">
                      <img 
                        src="/images/fb-qr.png" 
                        alt="Solution Cooperative Facebook QR Code" 
                        className="w-32 h-32 md:w-40 md:h-40 object-contain"
                      />
                      <p className="text-[10px] text-slate-400 mt-2 font-bold">Scan to open Messenger</p>
                    </div>
                  </div>
                  
                  <a href="https://www.facebook.com/solution.sakai" target="_blank" rel="noopener noreferrer" className="w-full bg-[#1877F2] text-white font-black py-4 rounded leading-none hover:opacity-90 transition-all shadow-md mt-auto flex flex-col items-center justify-center gap-1 group">
                    <span>Messengerを開く</span>
                    <span className="text-[10px] font-normal opacity-80 group-hover:opacity-100">Open Messenger</span>
                  </a>
                </div>
              </div>

              {/* Channel 2: LINE */}
              <div className="group bg-white rounded border border-gray-200 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col scale-105 z-10">
                <div className="absolute top-0 right-0 bg-[#06C755] text-white text-[10px] font-bold px-4 py-1 rounded-bl tracking-widest uppercase">Popular</div>
                <div className="bg-[#06C755]/5 p-8 flex items-center justify-center border-b border-[#06C755]/10 group-hover:bg-[#06C755]/10 transition-colors">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">💬</span>
                </div>
                <div className="p-8 flex flex-col flex-1 text-center">
                  <h2 className="text-xl font-black text-[#06C755] mb-1">LINEで相談</h2>
                  <p className="text-xs text-[#06C755]/60 font-bold mb-6 tracking-widest uppercase italic">Contact via LINE</p>
                  
                  <div className="flex-1 space-y-4 mb-8">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold">
                      友だち追加後、チャットでいつでも<br/>メッセージをお送りいただけます。
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      Add us and send messages anytime.
                    </p>
                    
                    {/* LINE QR Code */}
                    <div className="mt-6 p-2 bg-white border border-gray-100 rounded shadow-inner inline-block mx-auto">
                      <img 
                        src="/images/line-qr.png" 
                        alt="Solution Cooperative LINE QR Code" 
                        className="w-32 h-32 md:w-40 md:h-40 object-contain"
                      />
                      <p className="text-[10px] text-slate-400 mt-2 font-bold">Scan to add LINE</p>
                    </div>
                  </div>
                  
                  <a href="https://lin.ee/rBe1tM6" target="_blank" rel="noopener noreferrer" className="w-full bg-[#06C755] text-white font-black py-4 rounded leading-none hover:opacity-90 transition-all shadow-md mt-auto flex flex-col items-center justify-center gap-1 group">
                    <span>LINE 友だち登録へ</span>
                    <span className="text-[10px] font-normal opacity-80 group-hover:opacity-100">Add on LINE</span>
                  </a>
                </div>
              </div>

              {/* Channel 3: Phone */}
              <div className="group bg-white rounded border border-gray-200 overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="bg-slate-50 p-8 flex items-center justify-center border-b border-gray-100 group-hover:bg-[#1e40af]/5 transition-colors">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">📞</span>
                </div>
                <div className="p-8 flex flex-col flex-1 text-center">
                  <h2 className="text-xl font-black text-[#1e40af] mb-1">電話で相談</h2>
                  <p className="text-xs text-[#1e40af]/60 font-bold mb-6 tracking-widest uppercase italic">Call for Support</p>
                  
                  <div className="flex-1 space-y-4 mb-8">
                    <p className="text-sm text-slate-600 leading-relaxed font-bold">
                      緊急時、すぐにお話したい場合は<br/>こちらへお電話ください。
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      For urgent matters, please call us directly.
                    </p>
                    <a href="tel:0722248067" className="block text-2xl md:text-3xl font-black text-[#1e40af] hover:text-[#f97316] transition-colors pt-2">
                      072-224-8067
                    </a>
                  </div>
                  
                  <a href="tel:0722248067" className="w-full bg-[#1e40af] text-white font-black py-4 rounded leading-none hover:bg-[#1d4ed8] transition-all shadow-md mt-auto flex flex-col items-center justify-center gap-1 group">
                    <span>今すぐ発信する</span>
                    <span className="text-[10px] font-normal opacity-80 group-hover:opacity-100">Call Now</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Safety Note */}
        <section className="pb-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-[#1e40af] p-8 md:p-12 rounded text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="text-5xl">🛡️</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 underline decoration-orange-400 decoration-4 underline-offset-8">
                      プライバシー厳守・相談無料
                    </h3>
                    <p className="text-xs text-blue-300 font-bold tracking-widest uppercase mb-4">
                      Free Support & Privacy Guarantee
                    </p>
                    <p className="text-sm md:text-base leading-relaxed opacity-90 mb-2 font-bold">
                      相談内容は秘密保持を徹底いたします。実習実施者（受入企業様）へ無断で内容を伝えることはありません。
                      ひとりで悩まず、まずは私たち「ソリューション」に声をかけてください。
                    </p>
                    <p className="text-[10px] md:text-xs leading-relaxed opacity-70 italic">
                      Consultations are strictly confidential. We will not disclose information to your employer without your consent. 
                      Do not hesitate to reach out to Solution Cooperative Association.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
