'use client';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SimulationPage() {
  const [people, setPeople] = useState(1);
  const [country, setCountry] = useState('vn');
  const [hourlyWage, setHourlyWage] = useState(1177); // Lương giờ
  const [workHours, setWorkHours] = useState(8);      // Giờ làm/ngày
  const [workDays, setWorkDays] = useState(22);    // Ngày làm/tháng

  // Logic tính toán phí xí nghiệp
  const calc = useMemo(() => {
    const isPH = country === 'ph';
    
    // 1. 初期費用 (Initial Costs)
    const preTraining  = isPH ? 100000 : 15000;     // 入国前講習委託費
    const postTraining = 70000;                    // 入国後講習費用一式
    const allowance    = isPH ? 85000 : 60000;      // 入国後講習手当
    
    const initialPerPerson = preTraining + postTraining + allowance;
    const initialTotal = initialPerPerson * people;

    // 2. 月額管理費用
    const sendingOrgFee  = isPH ? 10000 : 5000;    // 送出機関 管理費
    // 組合管理費は「お問い合わせ」のため計算対象外
    const monthlyTotal = sendingOrgFee * people;

    return {
      initialTotal,
      monthlyTotal,
      breakdown: {
        preTraining,
        postTraining,
        allowance,
        sendingOrgFee
      }
    };
  }, [people, country]);

  // Logic tính lương tuân thủ Luật Lao động Nhật Bản (Giờ làm quy định)
  const workerSalary = useMemo(() => {
    const baseHoursPerMonth = workHours * workDays;
    const basePay = Math.round(hourlyWage * baseHoursPerMonth);
    return { basePay, baseHoursPerMonth };
  }, [hourlyWage, workHours, workDays]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pb-20">
        
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 text-white">
            <img src="/images/hero-banner.jpg" alt="Partner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1e40af]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center mt-16 md:mt-0">
            <div className="mx-auto w-fit bg-white/10 backdrop-blur-md border border-white/20 rounded mb-6 overflow-hidden shadow-lg hidden md:block">
              <div className="flex divide-x divide-white/10">
                <div className="px-6 py-2 flex items-center gap-2">

                  <span className="text-white font-bold text-[10px] tracking-widest">公式料金シミュレーション</span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-white">
              <h1 className="text-2xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
                外国人技能実習生受入れ<br />
                <span className="text-3xl md:text-6xl text-orange-400 block mt-2 drop-shadow-md">費用シミュレーション</span>
              </h1>
              <p className="text-[10px] md:text-sm font-bold opacity-80 tracking-widest">※特定技能・育成就労 両制度対応</p>
            </div>
          </div>
        </section>

        {/* ===== SIMULATION INTERFACE ===== */}
        <section className="container mx-auto px-4 -mt-8 md:-mt-20 relative z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:items-start">
            
            {/* Sidebar Settings */}
            <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded shadow-xl border-t-8 border-orange-500 lg:sticky lg:top-24">
              <div className="mb-6">
                <h3 className="text-[10px] font-black text-navy uppercase tracking-widest mb-1 opacity-50">受入れ条件</h3>
                <h2 className="text-xl font-black text-gray-800">条件設定</h2>
                <div className="w-10 h-1 bg-orange-500 mt-2"></div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">受入れ人数 (名)</label>
                    <span className="text-2xl font-black text-navy">{people}<small className="text-xs ml-1 font-bold">名</small></span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded border border-gray-200">
                    <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-12 h-12 rounded bg-white shadow-sm border border-gray-200 hover:bg-navy hover:text-white transition-all font-black text-xl">-</button>
                    <div className="flex-1 text-center font-black text-xl text-navy">{people}</div>
                    <button onClick={() => setPeople(people + 1)} className="w-12 h-12 rounded bg-white shadow-sm border border-gray-200 hover:bg-navy hover:text-white transition-all font-black text-xl">+</button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">送出国を選択</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                    {[
                      { id: 'vn', label: 'ベトナム', flagSrc: 'https://flagcdn.com/vn.svg' },
                      { id: 'id', label: 'インドネシア', flagSrc: 'https://flagcdn.com/id.svg' },
                      { id: 'ph', label: 'フィリピン', flagSrc: 'https://flagcdn.com/ph.svg' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCountry(c.id)}
                        className={`w-full p-4 rounded border-2 text-left transition-all flex items-center justify-between ${
                          country === c.id
                            ? 'border-navy bg-navy text-white shadow-lg'
                            : 'border-gray-100 bg-white text-gray-500 hover:border-blue-200'
                        }`}
                      >
                        <div>
                          <p className={`text-[9px] font-black uppercase mb-0.5 ${
                            country === c.id ? 'text-orange-400' : 'text-gray-400'
                          }`}>{c.id.toUpperCase()}</p>
                          <p className="font-bold text-sm tracking-tighter">{c.label}</p>
                        </div>
                        <img src={c.flagSrc} alt={c.label} className="w-8 h-6 rounded-sm object-cover shadow-sm" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Dashboard */}
            <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8">
              
              {/* Highlight Card */}
              <div className="bg-white rounded p-6 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-[100px] -mr-10 -mt-10"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-navy">試算結果サマリー</h3>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">設定条件に基づく概算費用です</p>
                    </div>
                    <div className="bg-navy px-4 py-2 rounded text-white font-bold text-[10px] inline-block w-fit">
                      {people}名様 受入れの場合
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 overflow-hidden mt-6 md:mt-10 rounded shadow-sm">
                    <div className="bg-white p-6 md:p-8">
                      <p className="text-[9px] font-black text-gray-400 mb-2 md:mb-4 tracking-widest uppercase">Initial / 初期費用</p>
                      <h4 className="text-xs font-black text-gray-600 mb-2 uppercase">初期手続等 合計</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-navy">¥</span>
                        <span className="text-3xl md:text-5xl font-black text-navy tracking-tighter">{calc.initialTotal.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-400 ml-1 font-bold">(税込)</span>
                      </div>
                    </div>
                    <div className="bg-white p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-100">
                      <p className="text-[9px] font-black text-orange-400 mb-2 md:mb-4 tracking-widest uppercase">Monthly / 月額監理費</p>
                      <h4 className="text-xs font-black text-gray-600 mb-2 uppercase">月額監理費 合計</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-orange-600">¥</span>
                        <span className="text-3xl md:text-5xl font-black text-orange-600 tracking-tighter">{calc.monthlyTotal.toLocaleString()}</span>
                        <span className="text-[10px] text-orange-400 ml-1 font-bold">/月</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded shadow-xl border border-gray-100 p-6 md:p-8">
                 <h3 className="text-base md:text-lg font-black text-navy uppercase tracking-widest mb-6 border-l-4 border-navy pl-4">初期費用 内訳明細</h3>
                 <div className="border border-gray-100 rounded overflow-x-auto overflow-y-hidden">
                    <table className="w-full text-left min-w-[500px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-100 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                          <th className="px-6 py-4">費用項目</th>
                          <th className="px-6 py-4 text-right">単価</th>
                          <th className="px-6 py-4 text-right">小計 ({people}名)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {[
                          { name: '入国前講習委託費', desc: '現地教育・面接調整', price: calc.breakdown.preTraining },
                          { name: '入国後講習費用一式', desc: '法定講習・宿泊・講師代', price: calc.breakdown.postTraining },
                          { name: '入国後講習手当', desc: '実習生へ trực tiếp 支給される手当', price: calc.breakdown.allowance },
                        ].map(row => (
                          <tr key={row.name}>
                            <td className="px-6 py-4">
                              <p className="font-bold text-gray-700 text-xs">{row.name}</p>
                              <p className="text-[9px] text-gray-400 font-medium">{row.desc}</p>
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-gray-500 text-xs">¥{row.price.toLocaleString()}</td>
                            <td className="px-6 py-4 text-right font-black text-navy text-xs">¥{(row.price * people).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
              </div>

              {/* Monthly Management Fee Details */}
              <div className="bg-white rounded border-l-8 border-orange-50 shadow-xl overflow-hidden border-2 border-orange-100">
                <div className="px-6 md:px-8 py-5 border-b border-orange-50 bg-orange-50/30">
                  <p className="text-[9px] font-black text-orange-500 tracking-widest mb-1 uppercase">Monthly Fee Detail</p>
                  <h4 className="text-lg font-black text-navy">月額費用の内訳</h4>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="flex items-center justify-between px-6 md:px-8 py-4 bg-white/50">
                    <div>
                      <p className="text-sm font-black text-gray-700">組合監理費</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-0.5 whitespace-nowrap">監理組合への毎月の運営・サポート料</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded shadow-sm">お問い合わせ</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 md:px-8 py-6 bg-white">
                    <div>
                      <p className="text-sm font-black text-gray-700">送出機関管理費</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-0.5">
                        主要3カ国（VN/ID/PH）管理費
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-lg font-black text-orange-500">¥</span>
                        <span className="text-3xl font-black text-orange-500 tracking-tight">{calc.breakdown.sendingOrgFee.toLocaleString()}</span>
                      </div>
                      <p className="text-[9px] text-orange-400 font-bold mt-0.5 uppercase tracking-widest">/ Month (1 Per)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Costs and Salary Sections ... */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 md:p-8 rounded border border-gray-100 shadow-lg">
                  <div className="w-10 h-10 bg-navy/5 rounded flex items-center justify-center text-xl mb-6">✈️</div>
                  <h4 className="font-black text-navy text-sm mb-4">実費精算項目（目安）</h4>
                  <ul className="space-y-4 text-[11px] font-bold text-gray-500">
                    <li className="flex justify-between">
                      <span>航空運賃（片道）</span>
                      <span className="text-gray-800 font-black">
                        ¥{ ({vn:'50,000', id:'65,000', ph:'70,000'} as Record<string,string>)[country] ?? '50,000' }～
                      </span>
                    </li>
                    <li className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-gray-600">実習生総合保険</span>
                        <span className="text-gray-800 font-black">¥23,830</span>
                      </div>
                      <div className="bg-blue-50/50 p-2 rounded text-[9px] text-blue-600 font-medium leading-tight">
                        ※病気・ケガ・賠償責任を幅広くカバー。任意加入ですがリスク管理に必須。
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 md:p-8 rounded border border-gray-100 shadow-lg">
                  <div className="w-10 h-10 bg-orange-500/5 rounded flex items-center justify-center text-xl mb-6">🏛️</div>
                  <h4 className="font-black text-orange-600 text-sm mb-4">公的申請・検定費用</h4>
                  <ul className="space-y-3">
                    {[
                      { l: '認定申請手数料', v: '¥3,900' },
                      { l: 'ビザ更新印紙', v: '¥6,000' },
                      { l: '技能検定(基礎級)', v: '¥21,300' },
                      { l: '技能検定(3級)', v: '¥21,300' },
                    ].map(x => (
                      <li key={x.l} className="flex justify-between items-center text-[10px] border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <span className="font-bold text-gray-600">{x.l}</span>
                        <span className="font-black text-gray-800">{x.v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Salary Sim Section - Mobile Stackable */}
              <div className="bg-white rounded p-6 md:p-10 shadow-2xl border-t-8 border-green-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-40"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6 md:mb-8 pb-6 border-b border-gray-100">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded flex items-center justify-center text-2xl shadow-sm shrink-0">💰</div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-navy">実習生給与シミュレーション</h3>
                      <p className="text-[9px] text-green-600 font-bold">法令に基づく賃金額面試算ツール</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
                    <div className="bg-green-50/60 p-4 rounded border border-green-100">
                      <label className="block text-[9px] font-black text-green-700 mb-2 uppercase tracking-wide">設定時給 (円)</label>
                      <input type="number" value={hourlyWage} onChange={(e) => setHourlyWage(parseInt(e.target.value) || 0)}
                        className="w-full bg-white text-navy p-2 rounded border-2 border-green-200 text-xl font-black text-center outline-none focus:border-green-500" />
                    </div>
                    <div className="bg-green-50/60 p-4 rounded border border-green-100">
                      <label className="block text-[9px] font-black text-green-700 mb-2 uppercase tracking-wide">1日の労働時間</label>
                      <select value={workHours} onChange={(e) => setWorkHours(parseFloat(e.target.value))}
                        className="w-full bg-white border-2 border-green-200 p-2 rounded font-black text-navy text-center appearance-none">{ [7, 7.5, 8].map(h => <option key={h} value={h}>{h}時間</option>) }</select>
                    </div>
                    <div className="bg-green-50/60 p-4 rounded border border-green-100">
                      <label className="block text-[9px] font-black text-green-700 mb-2 uppercase tracking-wide">月の出勤日数</label>
                      <select value={workDays} onChange={(e) => setWorkDays(parseFloat(e.target.value))}
                        className="w-full bg-white border-2 border-green-200 p-2 rounded font-black text-navy text-center appearance-none">{ [20, 21, 22, 23, 24, 25, 26].map(d => <option key={d} value={d}>{d}日</option>) }</select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4 bg-slate-50 p-6 rounded border border-gray-100 text-center">
                      <p className="text-[9px] font-black text-gray-400 mb-1 uppercase">Daily / 日給</p>
                      <p className="text-2xl font-black text-navy">¥{(hourlyWage * workHours).toLocaleString()}</p>
                    </div>
                    <div className="md:col-span-8 bg-navy p-6 md:p-8 rounded shadow-xl text-center flex flex-col justify-center relative overflow-hidden">
                       <p className="text-[9px] font-black text-green-300 mb-2 tracking-widest uppercase relative z-10">Monthly Estimated Salary</p>
                       <div className="text-white relative z-10">
                          <span className="text-4xl md:text-6xl font-black tracking-tighter">¥{workerSalary.basePay.toLocaleString()}</span>
                          <span className="text-xs font-bold opacity-50 ml-1">/ 月</span>
                       </div>
                       <div className="absolute top-0 right-0 opacity-10 text-white text-9xl -mt-10 -mr-10 font-black">¥</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Info Summary */}
              <div className="bg-blue-50/50 p-6 rounded border border-blue-100 flex flex-col md:flex-row gap-6 items-center">
                 <div className="text-3xl bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-sm text-blue-600 border border-blue-100 shrink-0">⚖️</div>
                 <div className="text-center md:text-left">
                    <p className="text-xs font-black text-blue-800 mb-1 tracking-widest uppercase">Compliance Notice</p>
                    <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                      シミュレーション結果はあくまで概算です。地域別最低賃金の改定や業種別の割増賃金率により、実際の給与体系は異なります。法令を完全に順守した報酬設計については、弊組合の専門スタッフが個別にご提案いたします。
                    </p>
                 </div>
              </div>

              <div className="py-10 text-center bg-white rounded border border-gray-100 shadow-xl p-6 md:p-8">
                 <h4 className="text-xl md:text-2xl font-black text-navy mb-4">詳細な見積書が必要ですか？</h4>
                 <p className="text-gray-400 text-xs md:text-sm font-bold mb-8 italic">条件に合わせたPDF形式の個別見積書を無料で作成します。</p>
                 <a href="/contact" className="inline-flex w-full sm:w-auto items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-4 px-10 rounded shadow-xl transition-all text-base md:text-lg">
                    無料相談・見積もり依頼 ➔
                 </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== STICKY SUMMARY BAR (MOBILE ONLY) ===== */}
        <div className="fixed bottom-0 left-0 right-0 bg-navy/95 backdrop-blur-md text-white p-4 border-t border-white/10 z-[60] flex items-center justify-between lg:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">受入れ : {people}名 / {country.toUpperCase()}</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-[10px] opacity-70">月額:</span>
                 <span className="text-xl font-black">¥{calc.monthlyTotal.toLocaleString()}</span>
                 <span className="text-[8px] opacity-50">/月</span>
              </div>
           </div>
           <a href="#lead-form" onClick={(e) => { e.preventDefault(); document.querySelector('#simulation-bottom')?.scrollIntoView({ behavior: 'smooth' }); }} 
              className="bg-orange-500 text-white font-black text-[10px] px-5 py-2.5 rounded shadow-lg uppercase tracking-tighter">
              詳細を確認
           </a>
        </div>
        <div id="simulation-bottom"></div>

      </main>
      <Footer />
    </>
  );
}
