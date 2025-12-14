'use client';

import { forwardRef, useEffect } from 'react';
import gsap from 'gsap';
import VerticalBarsNoise from './VerticalBarsNoise';

interface HeroSectionProps {
    textTopRef: React.RefObject<HTMLHeadingElement | null>;
    textBottomRef: React.RefObject<HTMLHeadingElement | null>;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
    ({ textTopRef, textBottomRef }, ref) => {
        useEffect(() => {
            const ctx = gsap.context(() => {
                gsap.from('.hero-char', {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 1, // Optional delay to let the page load a bit
                });
            }, textTopRef);

            return () => ctx.revert();
        }, [textTopRef]);

        return (
            <section
                ref={ref}
                className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
            >
                {/* Animated Vertical Bars Background */}
                <VerticalBarsNoise
                    backgroundColor="#171717ff"
                    lineColor="#0e1a3fff"
                    barColor="#161828ff"
                />
                {/* Typography */}
                <div className="z-30 flex flex-col items-center justify-center gap-2 px-4 text-center pointer-events-none">
                    <h2
                        ref={textTopRef}
                        className="text-xl font-bold font-clash uppercase tracking-widest text-white sm:text-2xl md:text-3xl lg:text-4xl overflow-hidden"
                    >
                        {"Software Engineer".split('').map((char, index) => (
                            <span key={index} className="hero-char inline-block">
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </h2>
                    <h1
                        ref={textBottomRef}
                        className="mt-2 text-2xl font-bold font-satoshi uppercase tracking-wider text-white sm:text-4xl md:text-5xl lg:text-6xl text-nowrap"
                    >
                        Mohammad Rizaldy Ramadhan
                    </h1>
                </div>

                {/* ANIMATED ARROW - Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-bounce">
                    <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </section>
        );
    }
);

HeroSection.displayName = 'HeroSection';

export default HeroSection;

