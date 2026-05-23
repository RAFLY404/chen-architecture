import { useState, useEffect } from 'react';
import PolaroidCard from './PolaroidCard';

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('desktop');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setBreakpoint('mobile');
      } else if (w < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return breakpoint;
}

const CARDS = [
  {
    id: 1,
    label: "OBS. 001 / CONCRETE",
    gradient: "linear-gradient(135deg, #c0c0c0, #888)",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 1,
    delay: 0.1,
    desktop: { top: "16%", left: "8.8%", width: "14%" },
    tablet: { top: "4%", left: "4%", width: "28%" },
    mobile: { top: "8%", left: "12%", width: "32%" }
  },
  {
    id: 2,
    label: "SPATIAL VOL",
    gradient: "linear-gradient(135deg, #888, #555)",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 2,
    delay: 0.2,
    desktop: { top: "16%", left: "31.6%", width: "14%" },
    tablet: { top: "4%", left: "36%", width: "28%" },
    mobile: { top: "8%", left: "56%", width: "32%" }
  },
  {
    id: 3,
    label: "MATERIAL / TEXTURE",
    gradient: "linear-gradient(135deg, #4db6ac, #7fb5a0)",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 3,
    delay: 0.3,
    desktop: { top: "16%", left: "54.4%", width: "14%" },
    tablet: { top: "4%", left: "68%", width: "28%" },
    mobile: { top: "30%", left: "12%", width: "32%" }
  },
  {
    id: 4,
    label: "CONTEXT / SITE",
    gradient: "linear-gradient(135deg, #3d7a74, #6aaca5)",
    imageUrl: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 4,
    delay: 0.4,
    desktop: { top: "16%", left: "77.2%", width: "14%" },
    tablet: { top: "36%", left: "4%", width: "28%" },
    mobile: { top: "30%", left: "56%", width: "32%" }
  },
  {
    id: 5,
    label: "LIGHTING STUDY",
    gradient: "linear-gradient(135deg, #1a3a5c, #c8b400)",
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 5,
    delay: 0.5,
    desktop: { top: "54%", left: "8.8%", width: "14%" },
    tablet: { top: "36%", left: "36%", width: "28%" },
    mobile: { top: "52%", left: "12%", width: "32%" }
  },
  {
    id: 6,
    label: "ELEVATION 04",
    gradient: "linear-gradient(135deg, #4db6ac, #a8d5cc)",
    imageUrl: "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 6,
    delay: 0.6,
    desktop: { top: "54%", left: "31.6%", width: "14%" },
    tablet: { top: "36%", left: "68%", width: "28%" },
    mobile: { top: "52%", left: "56%", width: "32%" }
  },
  {
    id: 7,
    label: "CORE DETAIL",
    gradient: "linear-gradient(135deg, #5c8a85, #3d6b65)",
    imageUrl: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 7,
    delay: 0.7,
    desktop: { top: "54%", left: "54.4%", width: "14%" },
    tablet: { top: "68%", left: "20%", width: "28%" },
    mobile: { top: "74%", left: "12%", width: "32%" }
  },
  {
    id: 8,
    label: "GEOMETRY / SPACE",
    gradient: "linear-gradient(135deg, #7f8c8d, #95a5a6)",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    zIndexOffset: 8,
    delay: 0.8,
    desktop: { top: "54%", left: "77.2%", width: "14%" },
    tablet: { top: "68%", left: "52%", width: "28%" },
    mobile: { top: "74%", left: "56%", width: "32%" }
  }
];

export default function MoodboardOverlay() {
  const breakpoint = useBreakpoint();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center">
      <div className="w-[80vw] h-[80vh] md:w-[75vw] md:h-[75vh] lg:w-[60vw] lg:h-[70vh] relative pointer-events-none [&>*]:pointer-events-auto">
        {CARDS.map((card) => {
          const config = card[breakpoint];
          return (
            <PolaroidCard
              key={card.id}
              label={card.label}
              gradient={card.gradient}
              imageUrl={card.imageUrl}
              initRotation="0deg"
              delay={card.delay}
              top={config.top}
              left={config.left}
              width={config.width}
              zIndexOffset={card.zIndexOffset}
            />
          );
        })}
      </div>
    </div>
  );
}
