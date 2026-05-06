import { useState, useEffect } from 'react';
import PolaroidCard from './PolaroidCard';
import TextCard from './TextCard';

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
        <PolaroidCard
          label="OBS. 001 / CONCRETE"
          gradient="linear-gradient(135deg, #c0c0c0, #888)"
          imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
          initRotation="-4deg"
          delay={0.1}
          top="20%"
          left="25%"
          zIndexOffset={1}
        />

        <PolaroidCard
          label="SPATIAL VOL"
          gradient="linear-gradient(135deg, #888, #555)"
          imageUrl="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
          initRotation="2deg"
          delay={0.2}
          top="18%"
          left="45%"
          zIndexOffset={0}
        />

        <PolaroidCard
          label="MATERIAL / TEXTURE"
          gradient="linear-gradient(135deg, #4db6ac, #7fb5a0)"
          imageUrl="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
          initRotation="5deg"
          delay={0.3}
          top="22%"
          left="62%"
          zIndexOffset={2}
        />

        <PolaroidCard
          label="CORE DETAIL"
          gradient="linear-gradient(135deg, #5c8a85, #3d6b65)"
          imageUrl="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=800&auto=format&fit=crop"
          initRotation="-3deg"
          delay={0.4}
          top="48%"
          left="60%"
          zIndexOffset={3}
          isSmall={true}
        />

        <PolaroidCard
          label="LIGHTING STUDY"
          gradient="linear-gradient(135deg, #1a3a5c, #c8b400)"
          imageUrl="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop"
          initRotation="6deg"
          delay={0.5}
          top="55%"
          left="28%"
          zIndexOffset={1}
        />

        <PolaroidCard
          label="ELEVATION 04"
          gradient="linear-gradient(135deg, #4db6ac, #a8d5cc)"
          imageUrl="https://images.unsplash.com/photo-1428366890462-dd4baecf492b?q=80&w=800&auto=format&fit=crop"
          initRotation="-2deg"
          delay={0.6}
          top="60%"
          left="45%"
          zIndexOffset={2}
          isLarge={true}
        />

        <PolaroidCard
          label="CONTEXT / SITE"
          gradient="linear-gradient(135deg, #3d7a74, #6aaca5)"
          imageUrl="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=800&auto=format&fit=crop"
          initRotation="4deg"
          delay={0.7}
          top="52%"
          left="68%"
          zIndexOffset={1}
        />

        <TextCard
          title="SITE ANALYSIS / WIND"
          body="Prevailing currents from the North-East dictate the carved geometry of the central atrium. Thermal massing strategies applied to the South facade."
          top="42%"
          left="18%"
          delay={0.8}
          initRotation="-1deg"
          width="340px"
          zIndexOffset={5}
        />

        <TextCard
          italic={true}
          body="&quot;The light here at 4 PM is crucial. It must bleed into the lower gallery.&quot;"
          top="35%"
          left="72%"
          delay={0.9}
          initRotation="3deg"
          width="260px"
          zIndexOffset={4}
        />
      </div>
    </div>
  );
}
