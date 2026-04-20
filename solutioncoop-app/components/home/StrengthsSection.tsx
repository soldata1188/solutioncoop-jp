const STRENGTHS = [
  {
    bg: 'from-blue-50 to-white',
    border: 'border-blue-100/50',
    iconBg: 'bg-navy',
    icon: '🎓',
    titleColor: 'text-navy',
    title: '規律と礼節を育む日本語教育',
    body: (
      <>
        小中高校で長年教鞭をとった<strong className="text-navy">ベテラン教員12名</strong>が専任で指導.
        単なる語学教育を超えた「規律と礼節」を根幹に置く人づくりが他に類を見ない定着率を実現します.
      </>
    ),
  },
  {
    bg: 'from-orange-50 to-white',
    border: 'border-orange-100/50',
    iconBg: 'bg-orange-500',
    icon: '🏥',
    titleColor: 'text-orange-600',
    title: '24時間セーフティネット',
    body: (
      <>
        夜間・休日の緊急連絡にも母国語通訳スタッフが対応.
        生活トラブル, 通院同行, メンタルヘルスまで一貫してサポートし,
        <strong> 受入企業様の負担を最小化</strong>します.
      </>
    ),
  },
  {
    bg: 'from-green-50 to-white',
    border: 'border-green-100/50',
    iconBg: 'bg-[#06C755]',
    icon: '🏆',
    titleColor: 'text-green-700',
    title: '公的機関から認められた実績',
    body: (
      <>
        設立2012年より10年超・第60期生までの受入実績を持ち、70社超の受入企業様から信頼を頂いています.
      </>
    ),
  },
];

export default function StrengthsSection() {
  return (
    <section id="strengths" className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      {/* Subtle design element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-20" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#f97316] font-black tracking-widest text-xs uppercase mb-3 block">
            70社超の企業様に選ばれた実績
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e40af] section-title leading-tight">
            選ばれる理由
          </h2>
          <p className="text-[#f97316] font-bold mt-2">法令順守と手厚いサポートによる高い定着率。</p>
          <p className="text-gray-500 mt-6 leading-relaxed max-w-2xl mx-auto font-medium">
            受入企業様が安心して「技能移転」に専念できるよう、煩雑な事務手続きのご負担を軽減。<br className="hidden md:block" />
            入国前からの<strong className="text-[#1e40af] font-bold mx-1">「規律と礼節」</strong>を重んじる独自の教育体制で、<br className="hidden md:block" />
            グローバル人材の安定的な育成を支援します。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {STRENGTHS.map((s) => (
            <div
              key={s.title}
              className={`card-lift bg-gradient-to-br ${s.bg} border ${s.border} rounded p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}
            >
              <div className={`w-16 h-16 ${s.iconBg} flex items-center justify-center mx-auto mb-5 rounded shadow-lg transform -translate-y-2`}>
                <span className="text-3xl drop-shadow-md">{s.icon}</span>
              </div>
              <h3 className={`font-black tracking-tight ${s.titleColor} text-lg mb-3`}>{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed text-justify px-1">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
