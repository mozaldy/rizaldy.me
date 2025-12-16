'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/ProfileSection';
import ProjectsSection from '@/components/ProjectsSection';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const textTopRef = useRef<HTMLHeadingElement>(null);
    const textBottomRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis();

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable lag smoothing
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative w-full overflow-x-hidden">
            {/* Hero Section - Scrolls normally */}
            <HeroSection
                ref={heroRef}
                textTopRef={textTopRef}
                textBottomRef={textBottomRef}
            />

            {/* Profile Section - Self-contained with GSAP animations */}
            <ProfileSection />

            {/* Projects Section - Slides up to cover (parallax effect) */}
            <div className="relative z-50">
                <ProjectsSection />
            </div>
        </div>
    );
}
