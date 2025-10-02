'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useScrollStore } from '@/lib/store';
import { Mesh } from 'three';

export function Boat(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<Mesh>(null!);
  const { scene } = useGLTF('/assets/3d/boat.glb');
  const boatPosition = useScrollStore((state) => state.boatPosition);

  useFrame((_state, delta) => {
    if (!ref.current) return;

    ref.current.position.lerp(boatPosition, delta * 2);
  });
  
  return (
    <group {...props}>
      <primitive ref={ref} object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/3d/boat.glb');
