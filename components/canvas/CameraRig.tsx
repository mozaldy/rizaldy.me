'use client';

import { useFrame } from '@react-three/fiber';
import { useScrollStore } from '@/lib/store';
import * as THREE from 'three';
import { useMemo } from 'react';

export function CameraRig() {
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const boatPosition = useScrollStore((state) => state.boatPosition);
  const lookAtTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const initialCameraPosition = new THREE.Vector3(0, 20, 20);
  const initialLookAt = new THREE.Vector3(0, 0, 0);

  useFrame(({ camera }, delta) => {
    const FLIP_PROGRESS = 0.3;

    const targetPosition = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    if (scrollProgress > FLIP_PROGRESS) {
      // Follow cam: behind the boat
      targetPosition.set(0, 20, boatPosition.z - 25);
      // Look slightly higher than the boat's center to tilt the camera up
      targetLookAt.copy(boatPosition).add(new THREE.Vector3(0, 20, 0));
    } else {
      // Initial cam
      targetPosition.copy(initialCameraPosition);
      targetLookAt.copy(initialLookAt);
    }

    camera.position.lerp(targetPosition, delta * 2);
    lookAtTarget.lerp(targetLookAt, delta * 2);
    camera.lookAt(lookAtTarget);
  });

  return null;
}
