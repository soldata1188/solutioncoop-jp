import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';

export const metadata: Metadata = {
  title: '組合概要・情報公開｜ソリューション協同組合',
  description: 'ソリューション協同組合の法人概要、監理団体許可証、監理費用の明細、運営規程などの情報公開書類。法令に基づき、透明性の高い適正な監理事業を行っています。',
  alternates: { canonical: 'https://solutioncoop-jp.com/about' },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20 bg-gray-50 min-h-screen">
        {/* Page Hero */}
        <section className="py-14 md:py-20 relative overflow-hidden text-white" 
          style={{background:'linear-gradient(135deg,#1e3a8a 0%,#1e40af 55%,#1d4ed8 100%)'}}>
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <nav className="flex items-center justify-center gap-2 text-xs text-blue-200 mb-6" aria-label="Breadcrumb">
              <a href="/" className="hover:text-white transition">🏠 ホーム</a>
              <span>›</span>
              <span className="text-white font-semibold">組合概要・情報公開</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              組合概要・<span className="text-yellow-300">情報公開</span>
            </h1>
            <p className="text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
              ソリューション協同組合は、法令遵守（コンプライアンス）を徹底し、<br className="hidden md:block" />
              透明性の高い適正な監理事業を通じて、受入企業様と実習生の信頼に応えます。
            </p>
          </div>
        </section>

        {/* ===== 組合概要 (Overview) ===== */}
        <section id="overview" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-blue-800 px-6 py-4 flex items-center gap-3">
                <span className="text-yellow-300 text-lg">🏛️</span>
                <span className="text-white font-bold">監理団体 法人情報</span>
              </div>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['法人名称', <strong key="n" className="text-gray-800">ソリューション協同組合</strong>],
                    ['住所', <>〒590-0953 大阪府堺市堺区甲斐町東4丁2番2号<br/><span className="text-xs text-gray-400">本社・日本語研修センター（泉北）</span></>],
                    ['監理団体許可番号', <><span className="font-mono font-bold text-blue-800">許12345678号</span><span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 font-sans font-semibold rounded-sm">一般監理事業（優良）</span></>],
                    ['代表理事', '新 雅志'],
                    ['電話番号', <><a key="t" href="tel:0722248067" className="text-blue-800 font-bold hover:text-blue-600 transition text-lg">072-224-8067</a><span className="text-gray-400 text-xs ml-2">（平日 9:00〜18:00）</span></>],
                    ['FAX', '072-224-2214'],
                    ['メール', <a key="e" href="mailto:info@solutioncoop-jp.com" className="text-blue-800 hover:underline">info@solutioncoop-jp.com</a>],
                    ['設立', '平成24年（2012年）3月'],
                    ['受賞歴', <><span key="a1" className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-300 text-yellow-800 px-2 py-1 text-[11px] font-bold rounded-sm mb-1">🏆 令和4年（2022）大阪府知事表彰受賞</span><br className="sm:hidden"/><span key="a2" className="sm:ml-2 inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 px-2 py-1 text-[11px] font-bold rounded-sm">🥇 大阪府中小企業団体中央会表彰</span></>],
                  ].map(([label, val]) => (
                    <tr key={String(label)} className="hover:bg-gray-50 transition-colors">
                      <th className="text-left px-6 py-4 font-bold text-blue-900 w-1/3 md:w-1/4 bg-blue-50/50 align-top">{label}</th>
                      <td className="px-6 py-4 text-gray-700 leading-relaxed">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Google Map Embed */}
            <div className="max-w-4xl mx-auto mt-6">
              <div className="bg-white p-2 border border-gray-100 rounded shadow-sm overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1843.716700756142!2d135.47474304472985!3d34.575587709688605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000dc91b5c5edab%3A0x54be330ca9ed6235!2z44K944Oq44Ol44O844K344On44Oz5Y2U5ZCM57WE5ZCI!5e0!3m2!1sja!2sjp!4v1775999901092!5m2!1sja!2sjp"
                  width="100%" 
                  height="450" 
                  style={{ border: 0, borderRadius: '4px' }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ソリューション協同組合 所在地マップ"
                ></iframe>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400 px-1">
                <p>📍 大阪府堺市堺区甲斐町東4丁2番2号</p>
                <a href="https://www.google.com/maps/search/?api=1&query=%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%8D%90%E5%90%8C%E7%B5%84%E5%90%88+%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%A0%BA%E5%B8%82%E5%A0%BA%E5%8C%BA%E7%94%B2%E6%96%90%E7%94%BA%E6%9D%B14%E4%B8%812%E7%95%AA2%E5%8F%B1" 
                  target="_blank" rel="noopener noreferrer" className="text-blue-800 font-bold hover:underline">
                  大きな地図で見る →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 情報公開 (Disclosure) ===== */}
        <section id="disclosure" className="py-12 md:py-16 bg-[#172554] text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full scale-150" />
          </div>
          <div className="container mx-auto px-4 relative z-10 max-w-4xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/50 px-4 py-2 mb-4 rounded-sm">
                <span className="text-yellow-300 font-bold text-xs">⚖️ 技能実習法 第32条・第37条 準拠</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4 text-white">情報公開・公開書類</h2>
              <div className="w-16 h-1 bg-yellow-400 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {[
                { label:'監理費用の明細', icon:'📄', file:'/documents/kanrihi-meisai.pdf', desc:'監理費用の内訳および用途の明細' },
                { label:'運営規程', icon:'📖', file:'/documents/uneikitei.pdf', desc:'当組合の事業運営に関する基本規則' },
                { label:'監理団体事業報告書', icon:'📋', file:'/documents/jigyou-houkokusho.pdf', desc:'年度ごとの事業実績および活動報告' },
                { label:'監理団体許可証の写し', icon:'🏅', file:'/documents/kyokasho.pdf', desc:'法務省・厚生労働省からの事業許可証' },
              ].map(d => (
                <a key={d.label} href={d.file} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 bg-white/5 border-2 border-white/20 rounded-lg hover:border-yellow-400 hover:bg-white hover:text-navy transition-all shadow-lg">
                  <span className="text-3xl bg-white/10 group-hover:bg-navy/10 p-3 rounded-lg transition">{d.icon}</span>
                  <div className="flex-1">
                    <span className="font-black text-sm block mb-1">{d.label}</span>
                    <span className="text-[10px] opacity-60 group-hover:opacity-100">{d.desc}</span>
                  </div>
                  <span className="ml-auto text-xl opacity-0 group-hover:opacity-100 transition">→</span>
                </a>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg text-center mb-12 border-2 border-red-500 shadow-xl">
              <p className="text-red-700 font-black text-sm md:text-base leading-relaxed">
                ⚠️ 監理費は受入企業（実習実施者）から徴収するものであり、<br className="hidden sm:block"/>
                技能実習生本人には一切負担させません。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
              {[
                { icon:'⚖️', title:'法令遵守', desc:'技能実習法に完全準拠した事業運営' },
                { icon:'👁️', title:'透明性の確保', desc:'全費用・手数料の書面による明示' },
                { icon:'🛡️', title:'実習生の保護', desc:'不当な徴収の禁止と人権の尊重' },
              ].map(p => (
                <div key={p.title} className="bg-white/10 p-5 text-center rounded border border-white/5">
                  <p className="text-yellow-300 text-3xl mb-3">{p.icon}</p>
                  <p className="text-white font-bold text-sm mb-1">{p.title}</p>
                  <p className="text-blue-300 text-xs mt-1 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 制度比較表 (Comparison) ===== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4 section-title">制度比較：技能実習 vs 育成就労</h2>
              <p className="text-sm text-gray-500 mt-5">2027年からの新制度移行についても、万全の体制でサポートいたします。</p>
            </div>

            <div className="border border-gray-200 rounded overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-gray-800 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">⇄</span>
                  <span className="text-white font-bold text-sm">制度比較ガイド</span>
                </div>
                <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">法務・公開情報</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600">
                      <th className="px-5 py-4 text-left font-bold w-1/4 bg-gray-100/50">比較項目</th>
                      <th className="px-5 py-4 text-center text-blue-800 font-black">技能実習制度（現行）</th>
                      <th className="px-5 py-4 text-center text-blue-950 font-black">育成就労制度（2027年〜）</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {[
                      ['根拠法令','技能実習法','育成就労法'],
                      ['主な目的','発展途上国への技能移転','人材の育成および確保'],
                      ['在留期間','最長3〜5年（1号〜3号）','最長3年（特定技能へ接続）'],
                      ['転籍の制限','原則不可（やむを得ない場合のみ）','一定条件を満たせば可能'],
                      ['監理体制','監理団体','監理支援機関（呼称変更予定）'],
                    ].map(([label, col1, col2]) => (
                      <tr key={label} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 font-bold bg-gray-50/50 text-blue-900">{label}</td>
                        <td className="px-5 py-4 text-center border-l border-gray-100">{col1}</td>
                        <td className={`px-5 py-4 text-center border-l border-gray-100 ${label === '転籍の制限' ? 'text-orange-600 font-black' : ''}`}>{col2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-blue-50 text-[11px] text-blue-800 text-center font-medium">
                ※新制度の詳細は今後省令等で確定いたします。最新情報は随時当サイトでお知らせします。
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-black text-navy mb-8">お気軽にご相談ください</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <TrackedLink href="/contact" eventAction="cta_click" eventLabel="about_bottom_contact"
                className="w-full sm:w-80 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
                ✉️ 無料相談フォームへ
              </TrackedLink>
              <a href="tel:0722248067"
                className="w-full sm:w-80 bg-white border-2 border-navy text-navy font-bold py-3.5 rounded-lg hover:bg-navy hover:text-white transition-all shadow-sm">
                📞 072-224-8067
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
