'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

interface WorkerFace {
  id: number;
  src: string;
  x: number; // Tọa độ quỹ đạo mặc định
  y: number;
}

interface CountryProps {
  name: string;
  flag: string;
  workers: WorkerFace[];
  color: string;
}

const SatelliteWorker = ({ worker }: { worker: WorkerFace }) => {
  // Sử dụng Spring để tạo độ nảy đàn hồi (Elastic)
  const x = useMotionValue(worker.x);
  const y = useMotionValue(worker.y);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8} // Độ dãn của "dây thun"
      style={{
        x: springX,
        y: springY,
        position: 'absolute',
      }}
      className="z-20 cursor-grab active:cursor-grabbing"
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2, zIndex: 50 }}
    >
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-200">
        <img 
          src={worker.src} 
          alt="Worker" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Placeholder nếu chưa có ảnh
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Worker&background=random`;
          }}
        />
      </div>
    </motion.div>
  );
};

const CountryOrbit = ({ name, flag, workers, color }: CountryProps) => {
  return (
    <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm group">
      {/* Background Decor */}
      <div className={`absolute inset-0 opacity-[0.03] bg-${color}-500 group-hover:opacity-[0.05] transition-opacity`} />
      
      {/* Orbit Rings */}
      <div className="absolute w-40 h-40 md:w-56 md:h-56 border border-dashed border-gray-200 rounded-full animate-[spin_20s_linear_infinite]" />
      <div className="absolute w-64 h-64 md:w-80 md:h-80 border border-dotted border-gray-100 rounded-full animate-[spin_35s_linear_infinite_reverse]" />

      {/* Central Country Node */}
      <motion.div 
        className="z-10 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' }}
      >
        <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-gray-50 mb-4 overflow-hidden relative`}>
            <img src={flag} alt={name} className="w-full h-full object-cover opacity-20 absolute" />
            <span className="text-3xl md:text-4xl font-black text-[#1e40af] relative z-10">{name[0]}</span>
        </div>
        <h3 className="text-xl font-bold text-[#1e40af]">{name}</h3>
        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Satellite View</p>
      </motion.div>

      {/* Satellite Workers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {workers.map((worker) => (
          <SatelliteWorker key={worker.id} worker={worker} />
        ))}
      </div>
    </div>
  );
};

export default function CountrySatellite() {
  const data: CountryProps[] = [
    {
      name: 'ベトナム',
      flag: 'https://flagcdn.com/w160/vn.png',
      color: 'red',
      workers: [
        { id: 1, src: '/images/workers/vn_1.png', x: -80, y: -100 },
        { id: 2, src: '/images/workers/vn_2.png', x: 90, y: -80 },
        { id: 3, src: '/images/workers/vn_3.png', x: 100, y: 70 },
        { id: 4, src: '/images/workers/vn_4.png', x: -90, y: 80 },
      ]
    },
    {
      name: 'インドネシア',
      flag: 'https://flagcdn.com/w160/id.png',
      color: 'orange',
      workers: [
        { id: 1, src: '/images/workers/id_1.png', x: -100, y: -70 },
        { id: 2, src: '/images/workers/id_2.png', x: 80, y: -110 },
        { id: 3, src: '/images/workers/id_3.png', x: 90, y: 90 },
        { id: 4, src: '/images/workers/id_4.png', x: -80, y: 100 },
      ]
    },
    {
      name: 'フィリピン',
      flag: 'https://flagcdn.com/w160/ph.png',
      color: 'blue',
      workers: [
        { id: 1, src: '/images/workers/ph_1.png', x: -70, y: -90 },
        { id: 2, src: '/images/workers/ph_2.png', x: 110, y: -60 },
        { id: 3, src: '/images/workers/ph_3.png', x: 80, y: 110 },
        { id: 4, src: '/images/workers/ph_4.png', x: -110, y: 70 },
      ]
    }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {data.map((country, idx) => (
        <CountryOrbit key={idx} {...country} />
      ))}
    </div>
  );
}
