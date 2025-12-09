'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/ProfileSection';
import ScrollLinkedTitle from '@/components/ScrollLinkedTitle';
import ProjectsSection from '@/components/ProjectsSection';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const ballRef = useRef<HTMLDivElement>(null);
    const textTopRef = useRef<HTMLHeadingElement>(null);
    const textBottomRef = useRef<HTMLHeadingElement>(null);
    const profileRef = useRef<HTMLElement>(null);
    const profileCardRef = useRef<HTMLDivElement>(null);
    const profileContentRef = useRef<HTMLDivElement>(null);
    // Refs for scroll-linked "Software / Engineer" title
    const profileTitleARef = useRef<HTMLHeadingElement>(null);
    const profileTitleBRef = useRef<HTMLHeadingElement>(null);

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

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=400%', // Increased to allow "cover" effect after animation
                    pin: true,
                    pinSpacing: false,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // Initial states
            // Title Lines: Start off-screen (A from left, B from right)
            gsap.set(profileTitleARef.current, { x: '-100vw' });
            gsap.set(profileTitleBRef.current, { x: '100vw' });
            // Card: Hidden, pushed down dramatically (off-screen)
            gsap.set(profileCardRef.current, { autoAlpha: 0, y: 800 });
            // Content: Children hidden
            gsap.set(profileContentRef.current?.children || [], { autoAlpha: 0, y: 50 });

            // Animation Sequence
            tl.to({}, { duration: 0.5 }) // 1. Spacer
                .to(ballRef.current, { autoAlpha: 1, scale: 120, duration: 2, ease: 'power1.inOut' })
                .to(textTopRef.current, { x: '-30%', autoAlpha: 0, duration: 1.5, ease: 'power1.in' }, '<')
                .to(textBottomRef.current, { x: '30%', autoAlpha: 0, duration: 1, ease: 'power1.in' }, '<')
                // Profile Reveal Sequence - Starts overlapping with Ball Expansion
                .to(profileTitleARef.current, { x: 0, duration: 1.5, ease: 'power3.out' }, '-=1.5')
                .to(profileTitleBRef.current, { x: 0, duration: 1.5, ease: 'power3.out' }, '<')
                .to(profileCardRef.current, { autoAlpha: 1, y: 0, duration: 1.5, ease: 'power3.out' }, '-=1')
                .to(profileContentRef.current?.children || [], { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, '-=1.2')
                // BUFFER for Parallax Cover: match the extra scroll distance (~150%)
                // This ensures animation finishes early, then holds while Projects cover it.
                .to({}, { duration: 2 });
        }, containerRef);

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
            ctx.revert();
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative w-full bg-[#111111]">
            {/* Pinned Container for Hero & Profile */}
            <div ref={containerRef} className="relative w-full h-screen overflow-hidden z-0">
                {/* Hero Section - Simple static section */}
                <HeroSection
                    ref={heroRef}
                    textTopRef={textTopRef}
                    textBottomRef={textBottomRef}
                    ballRef={ballRef}
                />

                {/* Scroll-Linked Title Component */}
                <ScrollLinkedTitle
                    titleARef={profileTitleARef}
                    titleBRef={profileTitleBRef}
                />

                {/* Profile Section Component */}
                <ProfileSection
                    ref={profileRef}
                    profileCardRef={profileCardRef}
                    profileContentRef={profileContentRef}
                />
            </div>

            {/* Projects Section - Slides up to cover */}
            {/* mt-[250vh] matches the ScrollTrigger 'end: +=250%' duration */}
            <div className="relative z-50 mt-[250vh]">
                <ProjectsSection />
            </div>
        </div>
    );
}