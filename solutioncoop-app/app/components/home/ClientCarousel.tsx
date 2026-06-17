// file:///c:/Users/solut/OneDrive/KAITO-SOL/solutioncoop-jp.com/solutioncoop-app/app/components/home/ClientCarousel.tsx
'use client';
import Image from 'next/image';

const logos = [
  '/client_logo_1.png',
  '/client_logo_2.png',
  // Thêm các logo placeholder khác nếu cần
];

export default function ClientCarousel() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center text-[#1e40af] mb-8">
          導入事例
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
          {logos.map((src, idx) => (
            <div key={idx} className="p-4 border border-gray-100 rounded shadow-sm">
              <Image src={src} alt={`導入企業 ${idx + 1}`} width={200} height={120} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
