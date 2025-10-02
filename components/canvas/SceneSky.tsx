'use client';

import { Stars } from '@react-three/drei';

export function SceneSky() {
  return <Stars radius={500} depth={5} count={5000} factor={30} saturation={0} fade speed={1} />;
}
