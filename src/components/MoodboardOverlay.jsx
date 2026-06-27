import { useState, useEffect } from 'react';
import PolaroidCard from './PolaroidCard';
import { fetchJson, resolveImageUrl } from '../utils/api';

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

const CARD_LAYOUT = [
  {
    slot: 1,
    zIndexOffset: 1,
    delay: 0.1,
    desktop: { top: "16%", left: "8.8%", width: "14%" },
    tablet: { top: "8%", left: "18%", width: "20%" },
    mobile: { top: "8%", left: "12%", width: "32%" }
  },
  {
    slot: 2,
    zIndexOffset: 2,
    delay: 0.2,
    desktop: { top: "16%", left: "31.6%", width: "14%" },
    tablet: { top: "8%", left: "62%", width: "20%" },
    mobile: { top: "8%", left: "56%", width: "32%" }
  },
  {
    slot: 3,
    zIndexOffset: 3,
    delay: 0.3,
    desktop: { top: "16%", left: "54.4%", width: "14%" },
    tablet: { top: "30%", left: "18%", width: "20%" },
    mobile: { top: "30%", left: "12%", width: "32%" }
  },
  {
    slot: 4,
    zIndexOffset: 4,
    delay: 0.4,
    desktop: { top: "16%", left: "77.2%", width: "14%" },
    tablet: { top: "30%", left: "62%", width: "20%" },
    mobile: { top: "30%", left: "56%", width: "32%" }
  },
  {
    slot: 5,
    zIndexOffset: 5,
    delay: 0.5,
    desktop: { top: "54%", left: "8.8%", width: "14%" },
    tablet: { top: "52%", left: "18%", width: "20%" },
    mobile: { top: "52%", left: "12%", width: "32%" }
  },
  {
    slot: 6,
    zIndexOffset: 6,
    delay: 0.6,
    desktop: { top: "54%", left: "31.6%", width: "14%" },
    tablet: { top: "52%", left: "62%", width: "20%" },
    mobile: { top: "52%", left: "56%", width: "32%" }
  },
  {
    slot: 7,
    zIndexOffset: 7,
    delay: 0.7,
    desktop: { top: "54%", left: "54.4%", width: "14%" },
    tablet: { top: "74%", left: "18%", width: "20%" },
    mobile: { top: "74%", left: "12%", width: "32%" }
  },
  {
    slot: 8,
    zIndexOffset: 8,
    delay: 0.8,
    desktop: { top: "54%", left: "77.2%", width: "14%" },
    tablet: { top: "74%", left: "62%", width: "20%" },
    mobile: { top: "74%", left: "56%", width: "32%" }
  }
];

export default function MoodboardOverlay() {
  const breakpoint = useBreakpoint();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchJson('/moodboard')
      .then((data) => setCards(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error('Error fetching moodboard:', error);
      });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 flex items-center justify-center">
      <div className="w-[80vw] h-[80vh] md:w-[75vw] md:h-[75vh] lg:w-[60vw] lg:h-[70vh] relative pointer-events-none [&>*]:pointer-events-auto">
        {CARD_LAYOUT.map((layout) => {
          const card = cards.find((item) => item.slot === layout.slot);
          if (!card) return null;
          const config = layout[breakpoint];
          return (
            <PolaroidCard
              key={card.id || card.slot}
              label={card.label}
              gradient={card.gradient}
              imageUrl={resolveImageUrl(card.imageUrl)}
              projectId={card.projectId}
              initRotation="0deg"
              delay={layout.delay}
              top={config.top}
              left={config.left}
              width={config.width}
              zIndexOffset={layout.zIndexOffset}
            />
          );
        })}
      </div>
    </div>
  );
}
