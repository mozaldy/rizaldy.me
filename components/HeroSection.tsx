'use client';

import { forwardRef } from 'react';
import VerticalBarsNoise from './VerticalBarsNoise';

interface HeroSectionProps {
    textTopRef: React.RefObject<HTMLHeadingElement | null>;
    textBottomRef: React.RefObject<HTMLHeadingElement | null>;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
    ({ textTopRef, textBottomRef }, ref) => {
        return (
            <section
                ref={ref}
                className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
            >
                {/* Animated Vertical Bars Background */}
                <VerticalBarsNoise
                    backgroundColor="#171717ff"
                    lineColor="#1e388eff"
                    barColor="#0f1228ff"
                />
                {/* Typography */}
                <div className="z-30 flex flex-col items-center justify-center gap-2 px-4 text-center pointer-events-none">
                    <h2
                        ref={textTopRef}
                        className="text-xl font-bold font-clash uppercase tracking-widest text-white sm:text-2xl md:text-3xl lg:text-4xl"
                    >
                        Software Engineer
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

