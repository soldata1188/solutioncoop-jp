export default function OverviewSection() {
  const rows: [string, React.ReactNode][] = [
    [
      '法人名称',
      <div key="n">
        <strong className="text-slate-800 text-base">ソリューション協同組合</strong>
        <br />
        <span className="text-xs text-slate-500 font-bold tracking-widest">Solution Cooperative （略称：SKK）</span>
      </div>,
    ],
    [
      '住所',
      <div key="a">
        〒590-0953 大阪府堺市堺区甲斐町東4丁2番2号{' '}
        <a
          href="https://www.google.com/maps/search/?api=1&query=%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E5%8D%90%E5%90%8C%E7%B5%84%E5%90%88+%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%A0%BA%E5%B8%82%E5%A0%BA%E5%8C%BA%E7%94%B2%E6%96%90%E7%94%BA%E6%9D%B14%E4%B8%812%E7%95%AA2%E5%8F%B1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1 md:mt-0 md:inline-flex items-center gap-1 text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 px-2 py-0.5 rounded transition-colors font-bold md:ml-2"
        >
          📍 MAP
        </a>
        <br />
        <span className="text-xs text-slate-400 mt-1 block">本社・日本語研修センター</span>
      </div>,
    ],
    [
      '監理団体許可番号',
      <span key="l" className="font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded text-sm">
        許1708000610
      </span>,
    ],
    ['代表理事', '新 雅志'],
    [
      '電話番号',
      <>
        <a key="t" href="tel:0722248067" className="text-blue-800 font-bold hover:text-blue-600 transition text-lg">
          072-224-8067
        </a>
        <span key="d" className="text-slate-400 text-xs ml-2">（平日 9:00〜18:00）</span>
      </>,
    ],
    ['FAX', '072-224-2214'],
    [
      'メール',
      <a key="e" href="mailto:info@solutioncoop-jp.com" className="text-blue-800 hover:underline">
        info@solutioncoop-jp.com
      </a>,
    ],
    ['設立', '平成24年（2012年）3月'],
    [
      '受賞歴',
      <div key="a2" className="flex flex-col items-start gap-2 py-1">
        <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold rounded shadow-sm">
          🎖️ 令和8年5月 憲法記念日知事表彰受賞
        </span>
        <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold rounded shadow-sm">
          🥇 令和4年9月 大阪府知事表彰受賞
        </span>
        <span className="inline-flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 px-2 py-1 text-xs font-bold rounded shadow-sm">
          🏆 令和元年9月 大阪府中小企業団体表彰受賞
        </span>
      </div>,
    ],
  ];

  return (
    <section id="overview" className="py-20 md:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-blue-900 mb-4 section-title">組合概要・法人情報</h2>
        </div>
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded overflow-hidden shadow-sm">
          <div className="bg-[#1e40af] px-6 py-4 flex items-center gap-3">
            <span className="text-orange-400 text-lg">🏛️</span>
            <span className="text-white font-bold">監理団体 法人情報</span>
          </div>
          <div className="w-full">
            <div className="flex flex-col divide-y divide-blue-50/50">
              {rows.map(([label, val]) => (
                <div key={String(label)} className="grid grid-cols-1 md:grid-cols-12 hover:bg-slate-50 transition-colors group">
                  <div className="px-5 pt-4 pb-2 md:px-6 md:py-5 font-bold text-[#1e40af] bg-slate-50 group-hover:bg-blue-50/30 md:border-r border-gray-100 text-sm md:col-span-4 lg:col-span-3 flex items-center">
                    {label}
                  </div>
                  <div className="px-5 pb-4 md:px-6 md:py-5 text-slate-800 leading-relaxed text-sm flex items-center md:col-span-8 lg:col-span-9">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
