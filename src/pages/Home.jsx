import { useRef } from 'react';
import ThreeScene from '../components/ThreeScene';
import MoodboardOverlay from '../components/MoodboardOverlay';

export default function Home() {
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

      {/* Full interactive moodboard — desktop only */}
      <div className="hidden md:block">
        <MoodboardOverlay />
      </div>

      {/* Mobile hero text — shown only on small screens */}
      <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center px-8 text-center pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.4em] text-[#7a7570] uppercase mb-4">
          Est. Tokyo — 2019
        </p>
        <h2 className="font-editorial text-3xl sm:text-4xl font-light text-[#e6e0d8] uppercase tracking-widest leading-tight">
          Space.<br />Light.<br />Material.
        </h2>
        <p className="mt-6 font-serif text-sm text-[#a0a0a0] max-w-xs leading-relaxed">
          An architectural practice focused on the essential qualities of the built environment.
        </p>
      </div>
    </div>
  );
}
