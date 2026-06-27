import React from 'react';

export default function BusinessCategoriesSection() {
  const categories = [
    {
      title: 'グローバル人材の安定確保',
      subtitle: '外国人材受入事業',
      icon: '🌍',
      desc: '意欲ある若手・グローバル人材の安定的な確保と育成を支援。新制度「育成就労」や「特定技能」を見据え、母国語スタッフによる手厚い生活指導・メンタルケアで高い定着率を実現します。',
      items: [
        '外国人技能実習生共同受入れ事業',
        '特定技能外国人支援事業'
      ]
    },
    {
      title: '共同事業を通じたビジネス拡大支援',
      subtitle: '事業拡大サポート',
      icon: '🤝',
      desc: '組合員様向けに、事業拡大と業務効率化を直接的にバックアップ。受注の斡旋や必要な資材・設備の共同購買を通じて、組合員様のコスト削減と収益向上に貢献します。',
      items: [
        '組合員の行う事業・工事等の受注斡旋',
        '組合員の必要とする機械・設備等の購買斡旋'
      ]
    },
    {
      title: '海外進出サポート事業',
      subtitle: 'グローバルビジネス支援',
      icon: '✈️',
      desc: '労働力不足の解消だけでなく、組合員様のさらなる成長のために海外展開を支援。現地の強力なネットワークを活かし、安全かつ円滑なグローバルビジネスの第一歩をサポートします。',
      items: [
        '組合員の海外進出に関するサポート事業',
        '海外市場の調査及び関連情報の提供'
      ]
    },
    {
      title: '経営向上と福利厚生の充実',
      subtitle: '組織力強化支援',
      icon: '📈',
      desc: '企業としての持続的な成長を支援するため、最新の法令・業界動向の共有から、従業員の皆様の働きやすい環境づくりまで、多角的なサポートを提供します。',
      items: [
        '組合員の福利厚生に関する事業',
        '前各号の事業に附帯する事業'
      ]
    }
  ];

  return (
    <section id="business" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16 px-2 sm:px-0">
          <span className="text-[#f97316] font-black tracking-widest text-[10px] md:text-xs uppercase mb-2 md:mb-3 block">
            Business Content
          </span>
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black text-[#1e40af] mb-4">
            ソリューション協同組合の事業内容
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-xs md:text-sm leading-relaxed mb-6 md:mb-8">
            単なる人材紹介にとどまらず、受入企業様の「人手不足解消」から<br className="hidden md:block" />
            「事業拡大」「海外進出」までをトータルでサポートする4つの事業を柱としています。
          </p>

          {/* Highlight Supported Industries */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-blue-50/80 py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl border border-blue-100 shadow-sm w-full sm:w-auto">
            <span className="text-xs sm:text-sm font-black text-[#1e40af] tracking-wider whitespace-nowrap mb-1 sm:mb-0">【主な対応業種】</span>
            <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 md:gap-3">
              <span className="bg-[#1e40af] text-white text-[10px] sm:text-xs md:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded shadow-sm flex items-center gap-1 sm:gap-1.5"><span className="text-sm sm:text-base">🏗️</span> 建設業</span>
              <span className="bg-[#1e40af] text-white text-[10px] sm:text-xs md:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded shadow-sm flex items-center gap-1 sm:gap-1.5"><span className="text-sm sm:text-base">🏭</span> 製造業</span>
              <span className="bg-white text-[#1e40af] border border-[#1e40af]/30 text-[10px] sm:text-xs md:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded shadow-sm flex items-center gap-1 sm:gap-1.5"><span className="text-sm sm:text-base">🏢</span> その他業種</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid: 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {categories.map((cat, i) => (
            <div key={i} className="flex flex-col bg-slate-50 rounded-xl p-4 sm:p-6 md:p-8 border border-slate-200 hover:shadow-lg hover:border-[#1e40af]/30 transition-all duration-300">
              <div className="flex flex-row md:flex-col lg:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded flex items-center justify-center text-xl sm:text-2xl md:text-3xl shadow-sm border border-slate-100 shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] md:text-xs font-bold text-[#f97316] block mb-0.5 sm:mb-1">{cat.subtitle}</span>
                  <h3 className="text-sm sm:text-base md:text-lg font-black text-[#1e40af] leading-tight">{cat.title}</h3>
                </div>
              </div>
              <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm leading-relaxed mb-4 sm:mb-6 flex-grow">
                {cat.desc}
              </p>
              <div className="bg-white p-3 md:p-4 rounded border border-slate-100 mt-auto">
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mb-2 uppercase tracking-wider">定款記載事業(等)</p>
                <ul className="space-y-1.5 md:space-y-2">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="text-[11px] md:text-xs text-gray-700 font-medium flex items-start">
                      <span className="text-[#1e40af] mr-1.5 md:mr-2">▪</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
