import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useDrag } from '@use-gesture/react';
import { useTexture } from '@react-three/drei';
import vertexShader from '../shaders/gradient.vert.glsl?raw';
import fragmentShader from '../shaders/gradient.frag.glsl?raw';

export default function ShaderPlane({ mouse, theme }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  const texture = useTexture('/arch_sketch.png', (tex) => {
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
  });

  const { viewport, size } = useThree();
  const [position, setPosition] = useState([0, 0, 0]);

  const bind = useDrag(({ offset: [x, y] }) => {
    const aspectX = viewport.width / size.width;
    const aspectY = viewport.height / size.height;
    setPosition([x * aspectX, -y * aspectY, 0]);
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTexture: { value: texture },
      uTheme: { value: theme === 'light' ? 1.0 : 0.0 }
    }),
    [texture, theme]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uTheme.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uTheme.value,
        theme === 'light' ? 1.0 : 0.0,
        0.1
      );
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mouse.current.x, mouse.current.y),
        0.05
      );
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mouse.current.y * -0.08,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mouse.current.x * 0.08,
        0.05
      );

      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        position[0],
        0.1
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        position[1],
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} {...bind()}>
      <planeGeometry args={[40, 40, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}
