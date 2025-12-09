'use client';

import { forwardRef } from 'react';

interface ScrollLinkedTitleProps {
    titleARef: React.RefObject<HTMLHeadingElement | null>;
    titleBRef: React.RefObject<HTMLHeadingElement | null>;
}

const ScrollLinkedTitle = forwardRef<HTMLDivElement, ScrollLinkedTitleProps>(
    ({ titleARef, titleBRef }, ref) => {
        return (
            <div
                ref={ref}
                className="absolute inset-x-0 top-16 z-50 flex flex-col items-center justify-center mix-blend-difference pointer-events-none overflow-hidden"
            >
                <h3
                    ref={titleARef}
                    className="font-clash text-3xl font-bold uppercase tracking-wider text-white sm:text-5xl md:text-6xl lg:text-7xl text-left w-full max-w-2xl px-4"
                >
                    Software
                </h3>
                <h3
                    ref={titleBRef}
                    className="font-clash text-3xl font-bold uppercase tracking-wider text-white sm:text-5xl md:text-6xl lg:text-7xl text-right w-full max-w-2xl px-4"
                >
                    Engineer
                </h3>
            </div>
        );
    }
);

ScrollLinkedTitle.displayName = 'ScrollLinkedTitle';

export default ScrollLinkedTitle;
