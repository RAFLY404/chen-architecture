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
      <MoodboardOverlay />
    </div>
  );
}
