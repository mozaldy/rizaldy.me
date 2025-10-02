import { create } from 'zustand';
import * as THREE from 'three';

interface ScrollState {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  boatPosition: THREE.Vector3;
}

const START_Z = -25;
const END_Z = 50;

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  boatPosition: new THREE.Vector3(0, 1, START_Z),
  setScrollProgress: (progress) => {
    let targetZ;
    const FLIP_PROGRESS = 0.3;

    if (progress <= FLIP_PROGRESS) {
      targetZ = START_Z + (END_Z - START_Z) * progress;
    } else {
      const zAtFlip = START_Z + (END_Z - START_Z) * FLIP_PROGRESS;
      const NEW_END_Z = 100;

      const progressAfterFlip =
        (progress - FLIP_PROGRESS) / (1 - FLIP_PROGRESS);
      targetZ = zAtFlip + (NEW_END_Z - zAtFlip) * progressAfterFlip;
    }

    set({
      scrollProgress: progress,
      boatPosition: new THREE.Vector3(0, 1, targetZ),
    });
  },
}));
