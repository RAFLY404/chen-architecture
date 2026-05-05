import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useNavigate } from 'react-router-dom';

export default function PolaroidCard({ label, gradient, imageUrl, initRotation, delay, top, left, zIndexOffset, isLarge, isSmall, dragX, dragY }) {
  const navigate = useNavigate();
  const localX = useMotionValue(0);
  const localY = useMotionValue(0);
  
  const x = dragX || localX;
  const y = dragY || localY;

  // Add physics spring to the drag motion
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const [zIndex, setZIndex] = useState(10 + zIndexOffset);
  
  const bind = useDrag((params) => {
    x.set(params.offset[0]);
    y.set(params.offset[1]);
  });

  const width = isLarge ? 'w-72' : isSmall ? 'w-48' : 'w-64';
  const height = isLarge ? 'h-72' : isSmall ? 'h-48' : 'h-64';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onPointerDown={() => setZIndex(z => z + 50)}
      onPointerUp={() => setZIndex(z => z - 40)}
      style={{
        position: 'absolute',
        top,
        left,
        zIndex,
      }}
      className="pointer-events-auto"
    >
      <motion.div
        {...bind()}
        whileHover={{ scale: 1.02 }}
        style={{
          x: springX,
          y: springY,
          rotate: initRotation,
        }}
        className={`group p-2 bg-[#1a1715]/90 backdrop-blur-md border border-[rgba(255,255,255,0.08)] shadow-2xl cursor-grab active:cursor-grabbing transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] touch-none relative overflow-hidden ${width}`}
      >
        {/* Sketch Background Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/arch_sketch.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

        {/* Pin in top corner */}
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)] z-10" />
        
        {/* Image / Gradient area */}
        <div 
          className={`w-full ${height} mb-3 border border-[rgba(255,255,255,0.05)] relative overflow-hidden cursor-pointer group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-shadow duration-300`} 
          style={{ background: gradient }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            const slug = label.replace(/\//g, '').trim().replace(/\s+/g, '-').toLowerCase();
            navigate(`/project/${slug}`);
          }}
        >
          {imageUrl && (
            <img src={imageUrl} alt={label} draggable={false} className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 pointer-events-none" />
          )}
          {/* subtle inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
        </div>
        
        {/* Label */}
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#a0a0a0] px-1 pb-1 pt-1">
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}
