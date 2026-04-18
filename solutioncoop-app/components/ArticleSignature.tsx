'use client';
import React from 'react';

export default function ArticleSignature() {
  return (
    <div className="mt-16 pt-10 border-t border-slate-200/60 max-w-2xl">
      <div className="space-y-4">
        {/* Name & Slogan */}
        <div className="space-y-0.5">
          <h3 className="text-base md:text-lg font-black text-[#1e40af] tracking-tight leading-tight">
            ソリューション協同組合
          </h3>
          <p className="text-[10px] md:text-[11px] text-gray-400 font-bold tracking-wider">
            中小企業の未来を共に創る、いちばん身近なパートナー
          </p>
        </div>
        
        {/* Contact info in a clean list */}
        <div className="space-y-2 text-[11px] md:text-[11.5px] text-slate-500 font-medium leading-relaxed">
          <div className="flex items-center gap-2">
            <span className="opacity-70">📍</span>
            <span>〒590-0953 大阪府堺市堺区甲斐町東4-2-2</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-70">📞</span>
            <a href="tel:0722248067" className="hover:text-navy transition-colors font-bold">072-224-8067</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-70">⚖️</span>
            <span>一般監理事業 許可：許1708000610</span>
          </div>
          <div className="flex items-center gap-2 text-orange-600/80">
            <span className="opacity-70">✨</span>
            <span className="font-bold">育成就労制度・特定技能 完全対応</span>
          </div>
        </div>
      </div>
    </div>
  );
}
