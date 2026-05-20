import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDrag } from '@use-gesture/react';

export default function TextCard({ title, body, italic, top, left, delay, initRotation, width, zIndexOffset, dragX, dragY }) {
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
          width,
        }}
        className={`p-6 ${italic ? 'bg-white/90 dark:bg-[#1a1715]/90' : 'bg-gray-50/90 dark:bg-[#120e0c]/90'} backdrop-blur-md border border-black/5 dark:border-[rgba(255,255,255,0.08)] shadow-2xl cursor-grab active:cursor-grabbing hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] touch-none`}
      >
        {/* Tape piece */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/5 dark:bg-white/10 backdrop-blur-sm -rotate-2" />
        
        {title && (
          <h3 className="font-mono text-[10px] tracking-widest text-black dark:text-[#e8e4e0] uppercase mb-4 font-bold">
            {title}
          </h3>
        )}
        <p className={`font-editorial text-sm leading-relaxed ${italic ? 'italic text-black/70 dark:text-[#c8c4c0]' : 'text-black/60 dark:text-[#a0a0a0]'}`}>
          {body}
        </p>
      </motion.div>
    </motion.div>
  );
}
