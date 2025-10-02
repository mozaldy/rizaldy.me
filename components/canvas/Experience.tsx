'use client';

import { Canvas } from '@react-three/fiber';
import { Boat } from './Boat';
import { Ocean } from './Ocean';
import { SceneSky } from './SceneSky';
import { CameraRig } from './CameraRig';

export default function Experience() {
  return (
    <Canvas camera={{ position: [0, 20, 20], fov: 55 }}>
      <ambientLight intensity={0.25} />
      <directionalLight color="#6688cc" position={[1, 0.5, 1]} intensity={1.0} />
      
      <SceneSky />
      <Ocean />

      <Boat scale={1.5} position={[0, 1, 0]} />
      <CameraRig />
    </Canvas>
  );
}
