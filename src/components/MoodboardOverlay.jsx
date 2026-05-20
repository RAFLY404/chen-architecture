import { useState, useEffect } from 'react';
import PolaroidCard from './PolaroidCard';

// Computes a scale factor relative to a reference desktop width.
// On mobile the whole moodboard shrinks uniformly so positions stay proportional.
function useViewportScale(referenceWidth = 1200) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setScale(w < referenceWidth ? w / referenceWidth : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [referenceWidth]);

  return scale;
}

export default function MoodboardOverlay() {
  const scale = useViewportScale(1200);
  // Compensate container size so after scaling it still fills the viewport
  const pct = `${(1 / scale) * 100}%`;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Scale the entire moodboard relative to top-left origin */}
      <div
        className="absolute top-0 left-0 pointer-events-none [&>*]:pointer-events-auto"
        style={{
          width: pct,
          height: pct,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* Row 1 */}
        <PolaroidCard
          label="OBS. 001 / CONCRETE"
          gradient="linear-gradient(135deg, #c0c0c0, #888)"
          imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.1}
          top="16%"
          left="calc(50% - 578px)"
          zIndexOffset={1}
        />

        <PolaroidCard
          label="SPATIAL VOL"
          gradient="linear-gradient(135deg, #888, #555)"
          imageUrl="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.2}
          top="16%"
          left="calc(50% - 278px)"
          zIndexOffset={2}
        />

        <PolaroidCard
          label="MATERIAL / TEXTURE"
          gradient="linear-gradient(135deg, #4db6ac, #7fb5a0)"
          imageUrl="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.3}
          top="16%"
          left="calc(50% + 22px)"
          zIndexOffset={3}
        />

        <PolaroidCard
          label="CONTEXT / SITE"
          gradient="linear-gradient(135deg, #3d7a74, #6aaca5)"
          imageUrl="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.4}
          top="16%"
          left="calc(50% + 322px)"
          zIndexOffset={4}
        />

        {/* Row 2 */}
        <PolaroidCard
          label="LIGHTING STUDY"
          gradient="linear-gradient(135deg, #1a3a5c, #c8b400)"
          imageUrl="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.5}
          top="56%"
          left="calc(50% - 578px)"
          zIndexOffset={5}
        />

        <PolaroidCard
          label="ELEVATION 04"
          gradient="linear-gradient(135deg, #4db6ac, #a8d5cc)"
          imageUrl="https://images.unsplash.com/photo-1428366890462-dd4baecf492b?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.6}
          top="56%"
          left="calc(50% - 278px)"
          zIndexOffset={6}
        />

        <PolaroidCard
          label="CORE DETAIL"
          gradient="linear-gradient(135deg, #5c8a85, #3d6b65)"
          imageUrl="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.7}
          top="56%"
          left="calc(50% + 22px)"
          zIndexOffset={7}
        />

        <PolaroidCard
          label="GEOMETRY / SPACE"
          gradient="linear-gradient(135deg, #7f8c8d, #95a5a6)"
          imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
          initRotation="0deg"
          delay={0.8}
          top="56%"
          left="calc(50% + 322px)"
          zIndexOffset={8}
        />
      </div>
    </div>
  );
}
