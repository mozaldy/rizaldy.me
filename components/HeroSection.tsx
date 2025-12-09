'use client';

import { forwardRef } from 'react';

interface HeroSectionProps {
    textTopRef: React.RefObject<HTMLHeadingElement | null>;
    textBottomRef: React.RefObject<HTMLHeadingElement | null>;
    ballRef: React.RefObject<HTMLDivElement | null>;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
    ({ textTopRef, textBottomRef, ballRef }, ref) => {
        return (
            <section
                ref={ref}
                className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
            >
                {/* Typography - TOP LAYER (z-30) for Mix Blend Mode */}
                {/* mix-blend-difference on WHITE text against WHITE ball = BLACK Text */}
                <div className="z-30 flex flex-col items-center justify-center gap-2 px-4 text-center mix-blend-difference pointer-events-none">
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

                {/* White Ball Trigger - MIDDLE LAYER (z-20) */}
                <div
                    ref={ballRef}
                    className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white z-20 pointer-events-none"
                ></div>

                {/* ANIMATED ARROW - Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 mix-blend-difference pointer-events-none animate-bounce">
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
