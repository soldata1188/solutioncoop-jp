'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useAnimationFrame,
} from 'framer-motion';

// ── Spring config: thấp stiffness → kéo dãn nhiều hơn ───────────
const SPRING = { damping: 18, stiffness: 80, mass: 1.4 };

const NAT_COLORS: Record<string, string> = {
  vn: '#ef4444',
  id: '#22c55e',
  ph: '#3b82f6',
  mm: '#eab308',
  kh: '#14b8a6',
  np: '#6366f1',
};

const NAT_NAMES: Record<string, string> = {
  vn: 'ベトナム',
  id: 'インドネシア',
  ph: 'フィリピン',
  mm: 'ミャンマー',
  kh: 'カンボジア',
  np: 'ネパール',
};

interface NodeData {
  id: string;
  name: string;
  company: string;
  img: string;
  angle: number;
  radius: number;
  nationality?: string;
}

function getOrbital(angle: number, radius: number) {
  const r = (angle * Math.PI) / 180;
  return { x: Math.cos(r) * radius, y: Math.sin(r) * radius };
}

// ── SVG lines – cập nhật qua DOM trực tiếp (không re-render) ────
function SVGLines({
  nodes,
  cw,
  ch,
  centerX,
  centerY,
  springs,
}: {
  nodes: NodeData[];
  cw: number;
  ch: number;
  centerX: ReturnType<typeof useMotionValue<number>>;
  centerY: ReturnType<typeof useMotionValue<number>>;
  springs: Record<string, { sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring> }>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useAnimationFrame(() => {
    if (!svgRef.current) return;
    const cx = cw / 2 + centerX.get();
    const cy = ch / 2 + centerY.get();

    nodes.forEach(({ id }) => {
      const sp = springs[id];
      if (!sp) return;
      const el = svgRef.current!.querySelector(`#ln-${id}`) as SVGLineElement | null;
      if (!el) return;
      el.setAttribute('x1', String(cx));
      el.setAttribute('y1', String(cy));
      el.setAttribute('x2', String(cw / 2 + sp.sx.get()));
      el.setAttribute('y2', String(ch / 2 + sp.sy.get()));
    });
  });

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {nodes.map(({ id, angle, radius, nationality }) => {
        const { x: ox, y: oy } = getOrbital(angle, radius);
        const lineColor = NAT_COLORS[nationality || 'vn'] || '#1e40af';
        return (
          <line
            key={id}
            id={`ln-${id}`}
            x1={cw / 2}
            y1={ch / 2}
            x2={cw / 2 + ox}
            y2={ch / 2 + oy}
            stroke={lineColor}
            strokeWidth="2"
            strokeOpacity="0.4"
            strokeDasharray="5 4"
          />
        );
      })}
    </svg>
  );
}

// ── Satellite: vị trí = spring(center + orbital) → lag = dây chun
function Satellite({
  node,
  centerX,
  centerY,
  onSpring,
  onDragState,
}: {
  node: NodeData;
  centerX: ReturnType<typeof useMotionValue<number>>;
  centerY: ReturnType<typeof useMotionValue<number>>;
  onSpring: (id: string, sx: ReturnType<typeof useSpring>, sy: ReturnType<typeof useSpring>) => void;
  onDragState: (dragging: boolean) => void;
}) {
  const { x: ox, y: oy } = getOrbital(node.angle, node.radius);

  // Target = center + orbital offset (no spring here – instant)
  const targetX = useMotionValue(ox);
  const targetY = useMotionValue(oy);

  useEffect(() => {
    const unX = centerX.on('change', (cx) => targetX.set(cx + ox));
    const unY = centerY.on('change', (cy) => targetY.set(cy + oy));
    return () => {
      unX();
      unY();
    };
  }, [centerX, centerY, ox, oy, targetX, targetY]);

  // Spring lags behind target → elastic stretch effect
  const sx = useSpring(targetX, SPRING);
  const sy = useSpring(targetY, SPRING);

  // Report spring values to parent for SVG lines
  const reported = useRef(false);
  useEffect(() => {
    if (!reported.current) {
      reported.current = true;
      onSpring(node.id, sx, sy);
    }
  }, [node.id, onSpring, sx, sy]);

  return (
    <motion.div
      onPanStart={() => onDragState(true)}
      onPanEnd={() => onDragState(false)}
      onPan={(_, info) => {
        centerX.set(centerX.get() + info.delta.x);
        centerY.set(centerY.get() + info.delta.y);
      }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -34,
        marginTop: -34,
        x: sx,
        y: sy,
        zIndex: 20,
        touchAction: 'none',
        userSelect: 'none',
        cursor: 'grab',
      }}
      whileHover={{ scale: 1.12, zIndex: 50 }}
      whileDrag={{ cursor: 'grabbing', zIndex: 100 }}
    >
      <div className="relative z-10 w-[68px] h-[68px] rounded-full border-[3px] shadow-xl overflow-hidden bg-gray-100 mx-auto" style={{ borderColor: NAT_COLORS[node.nationality || 'vn'] || '#fff' }}>
        <img
          src={node.img}
          alt={node.name}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://api.dicebear.com/9.x/personas/svg?seed=${node.id}`;
          }}
        />
      </div>
      <div className="relative z-0 mt-2 text-center drop-shadow-md flex flex-col items-center">
        <p className="flex items-center gap-1.5 justify-center text-[10px] font-black text-gray-800 whitespace-nowrap leading-tight">
          <img src={`https://flagcdn.com/w20/${node.nationality || 'vn'}.png`} alt={node.nationality} className="w-3.5 h-auto rounded-[1px] shadow-sm block" />
          {node.name}
        </p>
        <p className="text-[8px] text-slate-500 font-bold whitespace-nowrap leading-tight mt-1 max-w-[100px] overflow-hidden text-ellipsis mx-auto">
          {node.company}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function UnionNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [springs, setSprings] = useState<
    Record<string, { sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring> }>
  >({});
  
  const [nodes, setNodes] = useState<NodeData[]>([]);

  // Center badge position (pure motion values, driven by drag)
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  const isDragging = useRef(false);

  // Automatic homing: drift back to 0 when not dragging
  useAnimationFrame(() => {
    if (isDragging.current) return;
    
    const curX = centerX.get();
    const curY = centerY.get();
    
    // Slow drift: reduce distance by 1% each frame
    if (Math.abs(curX) > 0.1) centerX.set(curX * 0.99);
    else if (curX !== 0) centerX.set(0);
    
    if (Math.abs(curY) > 0.1) centerY.set(curY * 0.99);
    else if (curY !== 0) centerY.set(0);
  });

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDims({ w: width, h: height });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/workers');
        const data = await res.json();
        
        const N = data.length;
        if (N === 0) return;
        
        const angleStep = 360 / N;
        const radii = [250, 310, 220, 280, 340, 240, 290, 210, 350, 260];
        
        const dynamicNodes = data.map((w: any, i: number) => ({
          ...w,
          angle: (angleStep * i) - 90,
          radius: radii[i % radii.length]
        }));
        
        setNodes(dynamicNodes);
      } catch (err) {
        console.error('Failed to load workers', err);
      }
    }
    loadData();
  }, []);

  const handleSpring = (
    id: string,
    sx: ReturnType<typeof useSpring>,
    sy: ReturnType<typeof useSpring>
  ) => {
    setSprings((prev) => ({ ...prev, [id]: { sx, sy } }));
  };

  const ready = dims.w > 0 && nodes.length > 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] md:h-[820px] overflow-hidden select-none"
    >

      {/* SVG Lines (DOM-patched every frame) */}
      {ready && Object.keys(springs).length === nodes.length && (
        <SVGLines
          nodes={nodes}
          cw={dims.w}
          ch={dims.h}
          centerX={centerX}
          centerY={centerY}
          springs={springs}
        />
      )}

      {/* Satellites – each follows center via spring */}
      {ready &&
        nodes.map((node) => (
          <Satellite
            key={node.id}
            node={node}
            centerX={centerX}
            centerY={centerY}
            onSpring={handleSpring}
            onDragState={(s) => (isDragging.current = s)}
          />
        ))}

      {/* Center badge – the only draggable element */}
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => (isDragging.current = false)}
        onDrag={(_, info) => {
          centerX.set(centerX.get() + info.delta.x);
          centerY.set(centerY.get() + info.delta.y);
        }}
        dragConstraints={containerRef}
        dragElastic={0.15}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: -100,
          marginTop: -32,
          x: centerX,
          y: centerY,
          zIndex: 30,
          touchAction: 'none',
          userSelect: 'none',
          cursor: 'grab',
        }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
      >
        {/* Pulse rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className="w-64 h-64 rounded-full border border-blue-400/20 animate-ping"
            style={{ animationDuration: '3s' }}
          />
        </div>

        {/* Badge - Minimalist */}
        <div className="relative bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl rounded-[4px] w-[200px] h-[64px] flex flex-col items-center justify-center text-center transition-all duration-300">
          <p className="text-[9px] font-bold tracking-[0.05em] text-gray-400 uppercase mb-0.5">
            監理団体・支援機関
          </p>
          <h2 className="text-[17px] font-black text-[#1e40af] tracking-wider leading-none">
            Solution-Coop
          </h2>
        </div>
      </motion.div>

    </div>
  );
}
