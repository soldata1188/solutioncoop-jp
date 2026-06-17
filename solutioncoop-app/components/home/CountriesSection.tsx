import Image from 'next/image';

export default function CountriesSection() {
  const countries = [
    { 
      name: 'ベトナム', 
      flag: 'vn', 
      trait: '圧倒的なハングリー精神と手先の器用さ', 
      desc: '漢字文化圏に属しているため理解が早く、勤勉で向上心が非常に高いのが特徴です。精密さや手先の感覚が求められる現場で即座に活躍が期待できます。',
      sector: '機械加工・建設・食品製造' 
    },
    { 
      name: 'インドネシア', 
      flag: 'id', 
      trait: 'チームの和を重んじる、明るい親日家', 
      desc: '平均年齢が若く、体力があり、礼儀正しさとチームワークを大切にします。職場の雰囲気を明るくし、多様性を求める現場に活気をもたらす人材として最適です。',
      sector: '自動車整備・建設・農業' 
    },
    { 
      name: 'フィリピン', 
      flag: 'ph', 
      trait: '抜群の英語力と天性のホスピタリティ', 
      desc: '明るくフレンドリーな性格で、適応力やコミュニケーション能力は随一。人と接する業務や、思いやりが求められる対人サービスにおいて極めて高い評価を得ています。',
      sector: '介護・ビルクリ・宿泊接客' 
    }
  ];

  return (
    <section id="countries" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#f97316] font-black tracking-widest text-xs uppercase mb-3 block">
            適材適所のグローバル採用
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1e40af] mb-6 leading-tight">
            「辞めない人材」は、<br className="hidden md:block"/>
            最初の<span className="text-orange-500 border-b-4 border-orange-500 pb-1">国籍選び</span>から始まります
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
            「どこの国も同じだろう」という妥協が、早期離職のもとになります。<br className="hidden md:block"/>
            国民性、宗教観、得意な作業特性を深く分析し、貴社の「社風」や「業務内容」に<br className="hidden md:block"/>
            最も共鳴する人材を、厳選した3大送出国からオーダーメイドでご提案します。
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {countries.map(c => (
            <div key={c.name} className="border border-gray-200 rounded p-8 hover:border-[#1e40af] transition-all text-center group bg-gray-50 hover:bg-white hover:shadow-xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#1e40af] opacity-5 rounded-bl-full pointer-events-none" />
              <Image 
                src={`https://flagcdn.com/w80/${c.flag}.png`} 
                alt={c.name} 
                width={80} 
                height={53} 
                className="mx-auto mb-5 rounded shadow-md border border-gray-100" 
              />
              <h3 className="text-2xl font-black text-[#1e40af] tracking-wide mb-3">{c.name}</h3>
              <p className="text-orange-600 font-bold text-sm mb-5 leading-tight">{c.trait}</p>
              <p className="text-slate-600 text-xs md:text-sm leading-relaxed text-justify mb-8">{c.desc}</p>
              <div className="pt-5 border-t border-gray-200 mt-auto">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                  <span className="w-4 h-px bg-gray-300"></span>
                  真価を発揮する業種
                  <span className="w-4 h-px bg-gray-300"></span>
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {c.sector.split('・').map(s => (
                    <span key={s} className="bg-white text-[#1e40af] border border-blue-100 px-3 py-1.5 text-xs font-bold rounded shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
