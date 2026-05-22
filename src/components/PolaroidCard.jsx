import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { useNavigate } from 'react-router-dom';

export default function PolaroidCard({ label, gradient, imageUrl, delay, top, left, zIndexOffset, isLarge, isSmall, dragX, dragY, width }) {
  const navigate = useNavigate();
  const [isZooming, setIsZooming] = useState(false);
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

  // Use percentage width for responsiveness, allowing override from width prop
  const cardWidth = width || (isLarge ? '26%' : isSmall ? '18%' : '22%');
  
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
        width: cardWidth,
        zIndex,
      }}
      className="pointer-events-auto"
    >
      <motion.div
        {...bind()}
        whileHover={!isZooming ? { scale: 1.02 } : {}}
        style={{
          x: springX,
          y: springY,
          rotate: 0,
        }}
        className="group p-1.5 sm:p-2 bg-white dark:bg-black backdrop-blur-md border border-black/10 dark:border-[rgba(255,255,255,0.08)] shadow-2xl cursor-grab active:cursor-grabbing transition-shadow hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] touch-none relative overflow-hidden w-full"
      >
        {/* Sketch Background Overlay */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" style={{ backgroundImage: "url('/arch_sketch.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

        {/* Pin in top corner */}
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)] z-10" />
        
        {/* Image / Gradient area */}
        <div 
          className="w-full aspect-square mb-1.5 sm:mb-2 border border-black/5 dark:border-[rgba(255,255,255,0.05)] relative overflow-hidden cursor-pointer group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-shadow duration-300" 
          style={{ background: gradient }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (isZooming) return;
            setIsZooming(true);
            setZIndex(99999);
            
            const root = document.getElementById('root');
            if (root) {
              document.body.style.overflow = 'hidden';
              root.style.transformOrigin = `${e.clientX}px ${e.clientY}px`;
              root.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.8s ease-in 0.2s';
              root.style.transform = 'scale(15)';
              root.style.opacity = '0';
            }

            const slug = label.replace(/\//g, '').trim().replace(/\s+/g, '-').toLowerCase();
            setTimeout(() => {
              navigate(`/project/${slug}`);
              if (root) {
                root.style.transition = 'none';
                root.style.transform = 'none';
                root.style.opacity = '1';
                document.body.style.overflow = 'auto';
              }
            }, 1000);
          }}
        >
          {imageUrl && (
            <img src={imageUrl} alt={label} draggable={false} className="absolute inset-0 w-full h-full object-cover opacity-90 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 pointer-events-none" />
          )}
          {/* subtle inner shadow */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
        </div>
        
        {/* Label */}
        <div className="font-karla text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest text-black/60 dark:text-[#a0a0a0] px-0.5 sm:px-1 pb-0.5 sm:pb-1 pt-0.5 sm:pt-1 truncate">
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}
