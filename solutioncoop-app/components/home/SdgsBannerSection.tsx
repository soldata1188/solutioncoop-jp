import Image from 'next/image';

export default function SdgsBannerSection() {
  return (
    <section className="bg-white border-y border-gray-100 py-6">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex flex-col items-center w-64">
          <div className="relative h-16 w-64 shrink-0">
            <Image
              src="/images/sdgs-sakai.png"
              alt="SDGs未来都市・堺 ロゴ"
              fill
              className="object-contain object-center"
              sizes="256px"
            />
          </div>
          <p className="text-xs text-gray-500 font-medium text-center mt-2 leading-relaxed w-64">
            ソリューション協同組合は、<span className="text-[#1e40af] font-bold">SDGs未来都市・堺</span>を応援しています。
          </p>
        </div>
      </div>
    </section>
  );
}
