'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const STAR_COUNT = 5000;
const SPREAD = 50;
const MOUSE_SCALE = 20;
const BASE_SPEED = 0.5;

function SwirlingStars() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate initial random positions for stars
    const initialPositions = useMemo(() => {
        const positions = new Float32Array(STAR_COUNT * 3);
        for (let i = 0; i < STAR_COUNT; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * SPREAD * 2;     // x: -SPREAD to +SPREAD
            positions[i3 + 1] = (Math.random() - 0.5) * SPREAD * 2; // y: -SPREAD to +SPREAD
            positions[i3 + 2] = (Math.random() - 0.5) * SPREAD * 2; // z: -SPREAD to +SPREAD
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        // Convert normalized mouse coordinates (-1 to +1) to world space
        const mouseX = state.pointer.x * MOUSE_SCALE;
        const mouseY = state.pointer.y * MOUSE_SCALE;

        // Iterate through all stars
        for (let i = 0; i < STAR_COUNT * 3; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];

            // Calculate distance from star to mouse
            const dx = x - mouseX;
            const dy = y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Calculate angle from mouse to star
            let angle = Math.atan2(dy, dx);

            // Speed is inversely proportional to distance - closer stars move faster
            const speed = BASE_SPEED / (distance + 0.1);

            // Update angle based on speed and delta time
            angle += speed * delta;

            // Update star position orbiting around the mouse
            positions[i] = mouseX + Math.cos(angle) * distance;
            positions[i + 1] = mouseY + Math.sin(angle) * distance;
        }

        // Mark position buffer as needing update
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={pointsRef} positions={initialPositions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#606260"
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
}

interface CosmicBackgroundProps {
    className?: string;
}

export default function CosmicBackground({ className }: CosmicBackgroundProps) {
    return (
        <div className={`absolute inset-0 w-full h-full ${className || ''}`}>
            <Canvas
                camera={{ position: [0, 0, 30], fov: 75 }}
                style={{ background: '#101720' }}
            >
                <Suspense fallback={null}>
                    <SwirlingStars />
                </Suspense>
            </Canvas>
        </div>
    );
}
