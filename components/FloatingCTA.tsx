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
    <div className={`fixed right-4 bottom-24 z-50 flex flex-col gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      
      {/* Nút 1: Tải tài liệu (Mồi nhử) */}
      <Link 
        href="/#lead-magnet" 
        onClick={() => trackEvent('floating_cta_click', { event_category: 'engagement', event_label: 'document_download' })}
        className="group relative flex items-center justify-center w-14 h-14 bg-green-600 rounded-full shadow-lg hover:w-48 transition-all duration-300 overflow-hidden"
      >
        <span className="text-2xl z-10 group-hover:mr-32 transition-all duration-300">📥</span>
        <span className="absolute right-4 text-white font-bold text-sm opacity-0 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-300 delay-100">
          資料ダウンロード
        </span>
      </Link>

      {/* Nút 2: Đăng ký tư vấn */}
      <Link 
        href="/contact" 
        onClick={() => trackEvent('floating_cta_click', { event_category: 'conversion', event_label: 'free_consultation' })}
        className="group relative flex items-center justify-center w-14 h-14 bg-orange-600 rounded-full shadow-lg hover:w-48 transition-all duration-300 overflow-hidden"
      >
        <span className="text-2xl z-10 group-hover:mr-32 transition-all duration-300">✉️</span>
        <span className="absolute right-4 text-white font-bold text-sm opacity-0 whitespace-nowrap group-hover:opacity-100 transition-opacity duration-300 delay-100">
          無料相談を予約
        </span>
      </Link>
    </div>
  );
}
