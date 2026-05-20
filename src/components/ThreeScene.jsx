import { Canvas } from '@react-three/fiber';
import ShaderPlane from './ShaderPlane';
import { useTheme } from '../ThemeContext';

export default function ThreeScene({ mouse }) {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <div className="w-[80vw] h-[80vh] md:w-[60vw] md:h-[70vh] pointer-events-auto cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ShaderPlane mouse={mouse} theme={theme} />
        </Canvas>
      </div>
    </div>
  );
}
