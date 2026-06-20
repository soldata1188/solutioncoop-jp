import Image from 'next/image';
import Link from 'next/link';

export default function CasesSection() {
  const cases = [
    {
      category: '建設業',
      location: '大阪府堺市',
      title: 'グローバル人材の育成で、現場に活気と技術継承を実現',
      problem: '次世代への技術継承が課題となり、新たな育成体制の構築が求められていた。',
      solution: 'ベトナムから意欲の高い3名の若手を受入れ、OJTによる技術指導を開始。',
      result: '技術の継承がスムーズに進み、現場全体の士気と生産性が向上した。',
      image: '/images/case-construction.webp',
      tagColor: 'bg-blue-600'
    },
    {
      category: '製造業（金属加工）',
      location: '大阪府東大阪市',
      title: '多国籍チームの育成で生産性が20%向上',
      problem: '受注増に対応するため、即戦力となる人材の育成体制が必要だった。',
      solution: 'インドネシアとフィリピンの混成チームを編成し、段階的に技能を移転。',
      result: '交代制勤務が可能になり、工場の稼働率が劇的に改善。',
      image: '/images/case-manufacturing.webp',
      tagColor: 'bg-slate-700'
    },
    {
      category: '農業',
      location: '関西広域',
      title: '安定した人材育成体制の構築で事業拡大へ',
      problem: '季節による繁閑差が激しく、継続的な技能指導が困難だった。',
      solution: '特定技能制度を活用し、通年での安定雇用と計画的な育成体制に移行。',
      result: '人材の定着率が向上し、浮いた採用・教育費を新設備の導入に活用。',
      image: '/images/case-agriculture.webp',
      tagColor: 'bg-emerald-600'
    }
  ];

  return (
    <section id="cases" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#f97316] font-black tracking-widest text-xs uppercase mb-3 block">
            導入企業様の声
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-[#1e40af] mb-6 leading-tight">
            導入企業の<span className="text-orange-500">成幸</span>事例
          </h2>
          <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full mb-8"></div>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium">
            課題を抱えていた企業様が、当組合を通じてどのように変革を遂げたのか。<br className="hidden md:block"/>
            地域・業種別のリアルな声をお届けします。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-w-7xl mx-auto">
          {cases.map((caseItem, idx) => (
            <div key={idx} className="bg-white rounded overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1 transition-all duration-500 group">
              <div className="relative h-56 overflow-hidden">
                <Image 
                  src={caseItem.image} 
                  alt={caseItem.title} 
                  fill 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className={`absolute top-4 left-4 ${caseItem.tagColor} text-white text-[10px] font-black px-3 py-1 rounded tracking-widest`}>
                  {caseItem.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white text-[10px] font-bold opacity-80 flex items-center gap-1">
                    <span>📍</span> {caseItem.location}
                  </p>
                </div>
              </div>
              <div className="p-5 md:p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-black text-[#1e40af] mb-5 leading-tight group-hover:text-orange-600 transition-colors">
                  {caseItem.title}
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-black text-[10px] border border-red-100">課題</span>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1.5">{caseItem.problem}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-blue-50 text-[#1e40af] flex items-center justify-center font-black text-[10px] border border-blue-100">施策</span>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed pt-1.5">{caseItem.solution}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black text-[10px] border border-orange-100">成果</span>
                    <p className="text-xs md:text-sm font-bold text-slate-800 leading-relaxed pt-1.5">{caseItem.result}</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-dotted border-gray-200">
                  <Link href="/#contact" className="text-[12px] font-black text-[#1e40af] flex items-center gap-2 hover:text-orange-500 transition-colors">
                    この事例の詳細を聞く <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
