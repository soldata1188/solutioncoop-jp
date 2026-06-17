export default function PillarsSection() {
  const pillars = [
    { 
      title: '適正な費用体系・透明性の高い運営', 
      sub: '明朗な費用で安心',
      icon: '📉', 
      desc: '仲介業者を介さず、海外の教育機関と直接連携して人材をご紹介。すべての費用を書面で明示し、透明性の高い適正な運営体制で企業様の信頼にお応えします。' 
    },
    { 
      title: '煩雑な事務手続きの負担軽減', 
      sub: '事務負担を大幅に軽減',
      icon: '📄', 
      desc: '新制度移行に伴う複雑な手続きも当組合が全面的にサポート。書類作成からビザ（在留資格）申請まで、専門スタッフが丁寧に対応し、企業様の事務負担を大幅に軽減します。' 
    },
    { 
      title: '多国籍で優秀な人材の厳選', 
      sub: '3カ国対応ハイブリッド',
      icon: '🌏', 
      desc: 'ベトナム、インドネシア、フィリピンの3カ国から意欲ある人材を紹介可能。貴社の社風や業務ニーズに合わせ、グローバルな視点から最も定着しやすい人材を提案します。' 
    },
    { 
      title: '365日・24時間の母国語サポート', 
      sub: '手厚いフォローで安心',
      icon: '🤝', 
      desc: '入社後も独自のフォロー体制を提供。生活習慣の違いからくるトラブルやメンタルケアまで母国語で対応し、外国人材の迅速な環境適応と長期定着をバックアップします。' 
    }
  ];

  const trustBadges = [
    {
      icon: '🎓',
      title: '規律と礼節を育む日本語教育',
      detail: 'ベテラン教員12名が専任で指導',
    },
    {
      icon: '🏥',
      title: '24時間セーフティネット',
      detail: '母国語スタッフが緊急対応',
    },
    {
      icon: '🏆',
      title: '公的機関から認められた実績',
      detail: '設立2012年・70社超の信頼',
    },
  ];

  return (
    <section id="strengths" className="py-20 md:py-28 bg-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#f97316] font-black tracking-widest text-xs uppercase mb-3 block">
            70社超の企業様に選ばれた実績
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#1e40af] mb-4">
            なぜ<span className="text-orange-500">70社以上</span>に選ばれ続けるのか
          </h2>
          <p className="text-sm text-gray-500 font-bold">— 受入企業様が実感する、4つの理由 —</p>
          <p className="text-gray-500 mt-6 leading-relaxed max-w-2xl mx-auto font-medium text-sm">
            受入企業様が安心して「技能移転」に専念できるよう、煩雑な事務手続きのご負担を軽減。<br className="hidden md:block" />
            入国前からの<strong className="text-[#1e40af] font-bold mx-1">「規律と礼節」</strong>を重んじる独自の教育体制で、<br className="hidden md:block" />
            グローバル人材の安定的な育成を支援します。
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {pillars.map((p, i) => (
            <div key={i} className="bg-white p-6 md:p-8 rounded border-t-4 border-[#1e40af] hover:-translate-y-1 transition-transform">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="text-3xl bg-blue-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded text-[#1e40af] shrink-0">{p.icon}</div>
                <div>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded inline-block mb-2">{p.sub}</span>
                  <h3 className="text-lg font-black text-[#1e40af] mb-3 leading-tight">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges (merged from StrengthsSection) */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {trustBadges.map((b) => (
              <div
                key={b.title}
                className="bg-white border border-blue-100 rounded p-5 flex items-center gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <div className="w-12 h-12 bg-[#1e40af] flex items-center justify-center rounded shrink-0">
                  <span className="text-2xl">{b.icon}</span>
                </div>
                <div>
                  <h4 className="font-black text-[#1e40af] text-sm leading-tight mb-1">{b.title}</h4>
                  <p className="text-xs text-gray-500 font-medium">{b.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
