import { useRef } from 'react';
import ThreeScene from '../components/ThreeScene';
import MoodboardOverlay from '../components/MoodboardOverlay';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function Home() {
  const { settings } = useSiteSettings();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <ThreeScene mouse={mouse} />
      <MoodboardOverlay />
      <div className="absolute left-6 right-6 bottom-24 sm:left-10 sm:right-auto sm:max-w-md lg:left-[360px] lg:bottom-12 z-30 pointer-events-none">
        <p className="font-karla text-[10px] tracking-[0.25em] uppercase text-stone-600 dark:text-[#8a8580] mb-3">
          {settings.heroTagline}
        </p>
        <p className="font-karla text-sm sm:text-base leading-[1.75] text-stone-900 dark:text-[#e6e0d8]">
          {settings.heroDescription}
        </p>
      </div>
    </div>
  );
}
