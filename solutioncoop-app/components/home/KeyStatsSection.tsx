import Image from 'next/image';

const STATS = [
  { val: '60', unit: '期', label: '技能実習生受入実績' },
  { val: '70', unit: '社+', label: '受入企業数' },
  { val: '12', unit: '名', label: '専任日本語教師' },
  { val: '2012', unit: '年〜', label: '設立・10年超の実績' },
];

export default function KeyStatsSection() {
  return (
    <section className="bg-white py-10 border-b border-gray-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-0">

        {/* SDGs Logo — bên trái */}
        <div className="flex flex-col items-center shrink-0 md:pr-10 md:border-r md:border-gray-200 w-72">
          <div className="relative h-20 w-64">
            <Image
              src="/images/sdgs-sakai.png"
              alt="SDGs未来都市・堺 ロゴ"
              fill
              className="object-contain object-center"
              sizes="256px"
            />
          </div>
          <p className="text-[7.5px] text-gray-400 font-medium text-center mt-2 whitespace-nowrap">
            ソリューション協同組合は、<span className="text-[#1e40af] font-bold">SDGs未来都市・堺</span>を応援しています。
          </p>
        </div>

        {/* 4 Con số thống kê — bên phải */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:pl-8">
          {STATS.map((s) => (
            <div key={s.label} className="group cursor-default">
              <p className="text-3xl font-black text-[#1e40af] group-hover:scale-105 transition-transform duration-300">
                {s.val}
                <span className="text-xl font-bold ml-1">{s.unit}</span>
              </p>
              <p className="text-gray-500 text-[10px] mt-2 tracking-widest uppercase font-bold">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
