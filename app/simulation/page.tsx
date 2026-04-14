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
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 text-white">
            <img src="/images/hero-banner.jpg" alt="Partner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1e40af]/90 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e40af] via-[#1e40af]/40 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="mx-auto w-fit bg-white/10 backdrop-blur-md border border-white/20 rounded mb-8 overflow-hidden shadow-lg hidden md:block">
              <div className="flex divide-x divide-white/10">
                <div className="px-6 py-2 flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center font-black text-[8px]">優良</div>
                  <span className="text-white font-bold text-[10px] tracking-widest">公式料金シミュレーション</span>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-white">
              <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                外国人技能実習生受入れ<br />
                <span className="text-orange-400 block mt-2 text-4xl md:text-6xl drop-shadow-md">費用シミュレーション</span>
              </h1>
            </div>
          </div>
        </section>

        {/* ===== SIMULATION INTERFACE ===== */}
        <section className="container mx-auto px-4 -mt-16 md:-mt-20 relative z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
            
            {/* Sidebar Settings */}
            <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded shadow-xl border-t-8 border-orange-500 sticky top-24">
              <div className="mb-8">
                <h3 className="text-sm font-black text-navy uppercase tracking-widest mb-1">受入れ条件</h3>
                <h2 className="text-xl font-black text-gray-800">条件設定</h2>
                <div className="w-10 h-1 bg-orange-500 mt-2"></div>
              </div>
              
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">受入れ人数 (名)</label>
                    <span className="text-2xl font-black text-navy">{people}<small className="text-xs ml-1 font-bold">名</small></span>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded border border-gray-100">
                    <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-12 h-12 rounded bg-white shadow-sm border border-gray-200 hover:bg-navy hover:text-white transition-all font-black text-xl">-</button>
                    <div className="flex-1 text-center font-black text-xl text-navy">{people}</div>
                    <button onClick={() => setPeople(people + 1)} className="w-12 h-12 rounded bg-white shadow-sm border border-gray-200 hover:bg-navy hover:text-white transition-all font-black text-xl">+</button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">送出国</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'vn', label: 'ベトナム', flag: '🇻🇳' },
                      { id: 'id', label: 'インドネシア', flag: '🇮🇩' },
                      { id: 'ph', label: 'フィリピン', flag: '🇵🇭' },
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
                          <p className={`text-[10px] font-black uppercase mb-0.5 ${
                            country === c.id ? 'text-orange-400' : 'text-gray-400'
                          }`}>{c.id.toUpperCase()}</p>
                          <p className="font-bold text-sm">{c.label}</p>
                        </div>
                        <span className="text-2xl">{c.flag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Dashboard */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Highlight Card */}
              <div className="bg-white rounded p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden group transition-all hover:shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-[100px] -mr-10 -mt-10"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-gray-100">
                    <div>
                      <h3 className="text-2xl font-black text-navy">試算結果サマリー</h3>
                      <p className="text-xs font-bold text-gray-400 mt-1">受入れ費用の試算結果</p>
                    </div>
                    <div className="bg-navy px-4 py-2 rounded text-white font-bold text-xs">
                      {people}名様 受入れの場合
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 overflow-hidden mt-10 rounded shadow-sm border border-gray-100">
                    <div className="bg-white p-8">
                      <p className="text-[10px] font-black text-gray-400 mb-4">初期費用</p>
                      <h4 className="text-sm font-bold text-gray-600 mb-2 font-black">初期費用合計</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-navy">¥</span>
                        <span className="text-4xl md:text-5xl font-black text-navy tracking-tighter">{calc.initialTotal.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-1 font-bold">(税込)</span>
                      </div>
                    </div>
                    <div className="bg-white p-8 border-t md:border-t-0 md:border-l border-gray-100">
                      <p className="text-[10px] font-black text-orange-400 mb-4">月額管理費</p>
                      <h4 className="text-sm font-bold text-gray-600 mb-2 font-black">月額管理費合計</h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-orange-600">¥</span>
                        <span className="text-4xl md:text-5xl font-black text-orange-600 tracking-tighter">{calc.monthlyTotal.toLocaleString()}</span>
                        <span className="text-xs text-orange-400 ml-1 font-bold">/月</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-white rounded shadow-xl border border-gray-100 p-8">
                 <h3 className="text-lg font-black text-navy uppercase tracking-widest mb-6">費用内訳明細</h3>
                 <div className="border border-gray-100 rounded overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase">
                          <th className="px-6 py-4">費用項目</th>
                          <th className="px-6 py-4 text-right">単価</th>
                          <th className="px-6 py-4 text-right">小計</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        <tr>
                          <td className="px-6 py-5">
                            <p className="font-bold text-gray-700">入国前講習委託費</p>
                            <p className="text-[10px] text-gray-400 font-medium">現地での教育費・面接調整等</p>
                          </td>
                          <td className="px-6 py-5 text-right font-medium text-gray-500">¥{calc.breakdown.preTraining.toLocaleString()}</td>
                          <td className="px-6 py-5 text-right font-black text-navy">¥{(calc.breakdown.preTraining * people).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-5">
                            <p className="font-bold text-gray-700">入国後講習費用一式</p>
                            <p className="text-[10px] text-gray-400 font-medium">法定講習・宿泊費・講師代含む</p>
                          </td>
                          <td className="px-6 py-5 text-right font-medium text-gray-500">¥{calc.breakdown.postTraining.toLocaleString()}</td>
                          <td className="px-6 py-5 text-right font-black text-navy">¥{(calc.breakdown.postTraining * people).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-5">
                            <p className="font-bold text-gray-700">入国後講習手当</p>
                            <p className="text-[10px] text-gray-400 font-medium">実習生へ直接支給される手当</p>
                          </td>
                          <td className="px-6 py-5 text-right font-medium text-gray-500">¥{calc.breakdown.allowance.toLocaleString()}</td>
                          <td className="px-6 py-5 text-right font-black text-navy">¥{(calc.breakdown.allowance * people).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
              </div>

              {/* 月額管理費用 - 独立カード */}
              <div className="bg-white rounded border-l-8 border-orange-500 shadow-xl overflow-hidden">
                <div className="px-8 py-5 border-b border-gray-50">
                  <p className="text-[10px] font-black text-orange-400 tracking-widest mb-1">月額費用（1名あたり）</p>
                  <h4 className="text-lg font-black text-navy">月額管理費用</h4>
                </div>
                <div className="divide-y divide-gray-50">
                  {/* 組合管理費 */}
                  <div className="flex items-center justify-between px-8 py-4">
                    <div>
                      <p className="text-sm font-black text-gray-700">組合監理費</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-0.5">監理組合への月額の監理委託料</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-navy text-white text-xs font-black px-4 py-2 rounded">お問い合わせ</span>
                    </div>
                  </div>
                  {/* 送出機関管理費 */}
                  <div className="flex items-center justify-between px-8 py-4">
                    <div>
                      <p className="text-sm font-black text-gray-700">送出機関管理費</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-0.5">
                        ベトナム・インドネシア ＝ ¥5,000 ／ フィリピン ＝ ¥10,000
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-lg font-black text-orange-500">¥</span>
                        <span className="text-3xl font-black text-orange-500 tracking-tight">{calc.breakdown.sendingOrgFee.toLocaleString()}</span>
                      </div>
                      <p className="text-[9px] text-orange-400 font-bold mt-0.5">／ 月（1名）</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Costs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded border border-gray-100 shadow-lg group">
                  <div className="w-10 h-10 bg-navy/5 rounded flex items-center justify-center text-xl mb-6">✈️</div>
                  <h4 className="font-black text-navy text-sm mb-4">実費精算項目（入国時）</h4>
                  <ul className="space-y-4 text-xs font-bold text-gray-500">
                    <li className="flex justify-between">
                      <span>航空運賃（片道）</span>
                      <span className="text-gray-800 bg-slate-50 px-2 py-1">
                        ¥{ ({vn:'50,000', id:'65,000', ph:'70,000'} as Record<string,string>)[country] ?? '50,000' }～
                      </span>
                    </li>
                    <li className="pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-600">実習生総合保険</span>
                          <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded">任意</span>
                        </div>
                        <span className="text-gray-800 bg-slate-50 px-2 py-1 shrink-0 font-black">¥23,830</span>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded p-3 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {[
                            '疾病・傷害',
                            '賠償責任',
                            '携行品損害',
                            '傷害死亡・後遺障害',
                            '治療・救援費用',
                          ].map(item => (
                            <span key={item} className="text-[9px] font-black bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded">✓ {item}</span>
                          ))}
                        </div>
                        <p className="text-[9px] text-blue-600 font-bold leading-relaxed border-t border-blue-100 pt-2">
                          💡 法定外のため加入は任意ですが、万一のリスク管理として強く推奨されます。
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-8 rounded border border-gray-100 shadow-lg group">
                  <div className="w-10 h-10 bg-orange-500/5 rounded flex items-center justify-center text-xl mb-6">🏛️</div>
                  <h4 className="font-black text-orange-600 text-sm mb-4 uppercase">公的申請・検定費用</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center text-[10px]">
                      <div><p className="font-bold text-gray-600">認定申請手数料</p><p className="text-orange-400">1年→2年変更時</p></div>
                      <span className="font-black text-gray-800 bg-slate-50 px-2 py-1">¥3,900</span>
                    </li>
                    <li className="flex justify-between items-center text-[10px]">
                      <div><p className="font-bold text-gray-600">ビザ更新印紙</p><p className="text-orange-400">2年→3年更新時</p></div>
                      <span className="font-black text-gray-800 bg-slate-50 px-2 py-1">¥6,000</span>
                    </li>
                    <li className="flex justify-between items-center text-[10px] border-t border-orange-50 pt-3">
                      <div><p className="font-bold text-gray-600">技能検定受検料 <span className="text-gray-400 font-normal">(基礎級)</span></p><p className="text-orange-400">入国8ヶ月目</p></div>
                      <span className="font-black text-gray-800 bg-slate-50 px-2 py-1">¥21,300</span>
                    </li>
                    <li className="flex justify-between items-center text-[10px]">
                      <div><p className="font-bold text-gray-600">技能検定受検料 <span className="text-gray-400 font-normal">(3級)</span></p><p className="text-orange-400">3年目終了時</p></div>
                      <span className="font-black text-gray-800 bg-slate-50 px-2 py-1">¥21,300</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ===== 実習生給与シミュレーション ===== */}
              <div className="bg-white rounded p-8 md:p-10 shadow-2xl border-t-8 border-green-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                    <div className="w-12 h-12 bg-green-100 text-green-700 rounded flex items-center justify-center text-2xl shadow-sm shrink-0">💰</div>
                    <div>
                      <h3 className="text-xl font-black text-navy tracking-tight">実習生給与シミュレーション</h3>
                      <p className="text-[10px] text-green-600 font-bold mt-0.5">労働基準法に基づく賃金試算ツール</p>
                    </div>
                  </div>

                  {/* ── 入力エリア（横並び3列） ── */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {/* 時給 */}
                    <div className="bg-green-50/60 p-4 rounded border border-green-100">
                      <label className="block text-[10px] font-black text-green-700 mb-2">設定時給</label>
                      <div className="flex items-baseline gap-1">
                        <input
                          type="number"
                          value={hourlyWage}
                          onChange={(e) => setHourlyWage(parseInt(e.target.value) || 0)}
                          className="w-full bg-white text-navy p-2 rounded border-2 border-green-200 text-xl font-black outline-none focus:border-green-500 text-center"
                        />
                      </div>
                      <p className="text-[9px] text-green-600 font-bold mt-1 text-center">円 / 時間</p>
                    </div>

                    {/* 1日の所定労働時間 */}
                    <div className="bg-green-50/60 p-4 rounded border border-green-100">
                      <label className="block text-[10px] font-black text-green-700 mb-2">1日の所定時間</label>
                      <select
                        value={workHours}
                        onChange={(e) => setWorkHours(parseFloat(e.target.value))}
                        className="w-full bg-white border-2 border-green-200 p-2 rounded font-black text-navy text-center text-base"
                      >
                        {[7, 7.5, 8].map(h => <option key={h} value={h}>{h}時間</option>)}
                      </select>
                      <p className="text-[9px] text-green-600 font-bold mt-1 text-center">法定上限 8時間 / 日</p>
                    </div>

                    {/* 月の出勤日数 */}
                    <div className="bg-green-50/60 p-4 rounded border border-green-100">
                      <label className="block text-[10px] font-black text-green-700 mb-2">月の出勤日数</label>
                      <select
                        value={workDays}
                        onChange={(e) => setWorkDays(parseFloat(e.target.value))}
                        className="w-full bg-white border-2 border-green-200 p-2 rounded font-black text-navy text-center text-base"
                      >
                        {[20, 21, 22, 23, 24, 25, 26].map(d => <option key={d} value={d}>{d}日</option>)}
                      </select>
                      <p className="text-[9px] text-green-600 font-bold mt-1 text-center">週40時間以内を基準</p>
                    </div>
                  </div>

                  {/* ── 結果エリア ── */}
                  <div className="grid grid-cols-12 gap-4 items-stretch">
                    {/* 日給 */}
                    <div className="col-span-4 bg-slate-50 p-5 rounded border border-gray-100 flex flex-col justify-between">
                      <p className="text-[10px] font-black text-gray-400 mb-2">日　給</p>
                      <div>
                        <p className="text-2xl font-black text-navy">¥{(hourlyWage * workHours).toLocaleString()}</p>
                        <p className="text-[9px] text-gray-400 mt-1 font-bold">{hourlyWage}円 × {workHours}時間</p>
                      </div>
                    </div>

                    {/* 月給 (Prominent) */}
                    <div className="col-span-8 bg-gradient-to-br from-navy to-[#1e3a8a] p-6 rounded shadow-2xl relative overflow-hidden text-center flex flex-col justify-center">
                      <div className="absolute top-0 right-0 opacity-5 text-white text-[120px] leading-none -mt-4 -mr-4">¥</div>
                      <p className="text-[10px] font-black text-green-300 mb-3 tracking-[0.2em]">月　給　目　安</p>
                      <div className="flex items-baseline justify-center gap-1 text-white">
                        <span className="text-xl font-black">¥</span>
                        <span className="text-5xl md:text-6xl font-black tracking-tighter">{workerSalary.basePay.toLocaleString()}</span>
                        <span className="text-sm font-bold opacity-50 ml-1">/ 月</span>
                      </div>
                      <p className="text-[9px] text-blue-200 font-bold mt-4 opacity-70 italic">
                        ※ 社会保険・所得税・寮費等の控除前の額面給与です。
                      </p>
                    </div>
                  </div>

                  {/* ── 給与支払いに関する規定 ── */}
                  <div className="mt-6 border border-amber-200 rounded overflow-hidden">
                    <div className="bg-amber-50 px-5 py-3 flex items-center gap-2 border-b border-amber-200">
                      <span className="text-amber-500">⚖️</span>
                      <p className="text-xs font-black text-amber-700 tracking-widest">給与支払いに関する規定</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-amber-100 bg-white">
                      
                      {/* Card 1 */}
                      <div className="p-5 flex gap-4">
                        <div className="w-9 h-9 bg-navy/5 rounded flex items-center justify-center text-base shrink-0">🏢</div>
                        <div>
                          <p className="text-xs font-black text-navy mb-1">直接払いの原則</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed">受入れ企業が実習生本人へ<b>直接・全額・毎月</b>支払う義務があります。<span className="text-gray-400">（労基法 第24条）</span></p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="p-5 flex gap-4">
                        <div className="w-9 h-9 bg-navy/5 rounded flex items-center justify-center text-base shrink-0">📋</div>
                        <div>
                          <p className="text-xs font-black text-navy mb-1">法定控除項目</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed">健康保険・厚生年金・雇用保険・所得税・住民税は給与から控除できます。</p>
                        </div>
                      </div>

                      {/* Card 3 */}
                      <div className="p-5 flex gap-4 border-t border-amber-100">
                        <div className="w-9 h-9 bg-navy/5 rounded flex items-center justify-center text-base shrink-0">🏠</div>
                        <div>
                          <p className="text-xs font-black text-navy mb-1">寮費・光熱費の控除</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed">家賃（目安 <b className="text-navy">¥20,000以内</b>）・電気・水道代は実費控除可。</p>
                        </div>
                      </div>

                      {/* Card 4 */}
                      <div className="p-5 flex gap-4 border-t border-amber-100">
                        <div className="w-9 h-9 bg-orange-50 rounded flex items-center justify-center text-base shrink-0">⏱️</div>
                        <div>
                          <p className="text-xs font-black text-orange-600 mb-1">残業代（割増賃金）</p>
                          <p className="text-[10px] text-gray-500 leading-relaxed">法定時間外（1日8h・週40h超）は時給の <b className="text-orange-600">×1.25以上</b> が必要です。<span className="text-gray-400">（労基法 第37条）</span></p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="py-10 text-center bg-white rounded border border-gray-100 shadow-xl p-8">
                 <h4 className="text-2xl font-black text-navy mb-4">正確なシミュレーション表をご希望ですか？</h4>
                 <p className="text-gray-500 font-medium mb-10 max-w-2xl mx-auto italic text-sm">
                   貴社の所在地や職種に応じた、PDF形式の個別見積書を無料で作成いたします。
                 </p>
                 <a href="/contact" className="inline-flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-6 px-12 rounded shadow-2xl transform hover:-translate-y-1 transition-all text-xl">
                    無料相談・見積もり依頼 ➔
                 </a>
              </div>

              <div className="bg-slate-100 p-8 rounded border border-dashed border-gray-300">
                <p className="text-[10px] text-gray-500 font-bold mb-4">📌 付記・留意事項</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-gray-400">
                  <p>※ 組合加入出資金：10,000円（脱退時に全額返金）。</p>
                  <p>※ 渡航費、健康診断、宿舎備品等の実費は含まず。</p>
                  <p>※ 家賃は20,000円以下を目安としてください。</p>
                  <p>※ 消費税は別途（非課税項目を除く）。</p>
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
