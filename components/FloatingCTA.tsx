'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  // Chỉ hiện CTA khi người dùng đã cuộn xuống một chút (tránh che mất Hero banner)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>


      {/* --- BẢN MOBILE (ĐIỆN THOẠI): Thanh ngang gọi điện/LINE dính đáy --- */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] flex shadow-[0_-5px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <a 
          href="tel:0722248067" 
          onClick={() => trackEvent('mobile_sticky_click', { event_category: 'conversion', event_label: 'phone' })}
          className="flex-1 bg-[#1e40af] text-white py-3 flex flex-col items-center justify-center gap-1 active:bg-blue-800 transition"
        >
          <span className="text-xl leading-none">📞</span>
          <span className="text-[10px] font-black tracking-widest leading-none">電話相談</span>
        </a>
        <a 
          href="https://lin.ee/rBe1tM6" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={() => trackEvent('mobile_sticky_click', { event_category: 'conversion', event_label: 'line' })}
          className="flex-1 bg-[#06C755] text-white py-3 flex flex-col items-center justify-center gap-1 active:bg-[#05b34c] transition"
        >
          <span className="text-xl leading-none">💬</span>
          <span className="text-[10px] font-black tracking-widest leading-none">LINE相談</span>
        </a>
      </div>
    </>
  );
}
