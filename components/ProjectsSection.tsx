'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
        case 'github':
            return <Image src="/logos/github.svg" alt="GitHub" width={16} height={16} className="w-4 h-4" />;
        case 'youtube':
            return <Image src="/logos/youtube.svg" alt="YouTube" width={16} height={16} className="w-4 h-4" />;
        case 'instagram':
            return <Image src="/logos/instagram.svg" alt="Instagram" width={16} height={16} className="w-4 h-4" />;
        case 'play':
        case 'google play':
            return <Image src="/logos/play.svg" alt="Google Play" width={16} height={16} className="w-4 h-4" />;
        case 'figma':
            return <Image src="/logos/figma.svg" alt="Figma" width={16} height={16} className="w-4 h-4" />;
        case 'drive':
        case 'google drive':
            return <Image src="/logos/drive.svg" alt="Google Drive" width={16} height={16} className="w-4 h-4" />;
        case 'web':
        default:
            return <Image src="/logos/web.svg" alt="Web" width={16} height={16} className="w-4 h-4" />;

    }
};

import projects from '@/data/projects.json';

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const progressAmount = progressRef.current;

        if (!section || !container || !progressAmount) return;

        // --- Horizontal Scroll Setup ---
        const ctx = gsap.context(() => {
            // Force refresh to ensure correct calculations
            ScrollTrigger.refresh();

            const getScrollAmount = () => {
                const scrollWidth = container.scrollWidth;
                const windowWidth = window.innerWidth;
                return -(scrollWidth - windowWidth);
            };

            const scrollAmount = getScrollAmount();

            gsap.to(container, {
                x: scrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    // Start when the top of the section hits the top of the viewport
                    start: "top top",
                    // The duration of the scroll (how long to pin)
                    // We can adjust the multiplier based on how long we want the user to scroll
                    end: () => `+=${Math.abs(scrollAmount)}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const percent = (self.progress * 100).toFixed(0).padStart(2, '0');
                        progressAmount.textContent = `(${percent}%)`;
                    }
                }
            });
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#f5f5f5] text-black font-satoshi">

            {/* Progress Indicator - Fixed */}
            <div className="fixed top-8 right-8 flex items-center text-xs md:right-12 md:text-sm z-50 font-medium">
                SCROLL DOWN TO EXPLORE
                <span ref={progressRef} className="ml-2 text-base md:text-lg font-bold">
                    (00%)
                </span>
            </div>

            {/* Horizontal Container */}
            <div
                ref={containerRef}
                className="flex h-full w-max flex-nowrap"
            >
                {/* Intro Card */}
                <div
                    className="w-screen md:w-2xl h-screen shrink-0 p-8 box-border bg-background text-foreground flex flex-col justify-center items-center md:items-start"
                >
                    <div className="px-4 md:px-20">
                        <h3 className="text-5xl md:text-7xl font-clash font-bold uppercase leading-tight mb-8">
                            Selected Projects
                        </h3>
                        <p className="text-lg md:text-2xl text-gray-500 leading-relaxed">
                            A curated collection of work that spans from mobile apps to enterprise systems, each born from real problems and built with purposeful solutions. Scroll through to explore the stories behind the code—the challenges faced, lessons learned, and impact created.
                        </p>
                    </div>
                </div>

                {/* Projects */}
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-screen h-screen shrink-0 grid grid-cols-1 md:grid-cols-6 gap-8 p-8 md:p-12 pt-20 box-border border-l-[10px]"
                        style={{
                            backgroundColor: project.Colors.Background,
                            color: project.Colors.Foreground,
                            borderLeftColor: project.Colors.Accent
                        }}
                    >
                        {/* Column 1 - Metadata (1 col wide in 6-col grid -> 1:5 ratio roughly) */}
                        <div className="md:col-span-2 flex flex-col justify-between h-full overflow-y-auto pr-4 space-y-8 no-scrollbar">
                            <div>
                                <Link
                                    href={`/projects/${project.Column_1.Slug}`}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    <h3
                                        className="text-4xl md:text-5xl font-clash font-bold uppercase leading-tight mb-2 underline underline-offset-8"
                                        style={{ textDecorationColor: project.Colors.Accent }}
                                    >
                                        {project.Column_1.Title}
                                    </h3>
                                </Link>
                                <Badge
                                    className="mb-6 text-sm"
                                    style={{
                                        backgroundColor: project.Colors.Accent,
                                        color: project.Colors.Background
                                    }}
                                >
                                    {project.Column_1.Year}
                                </Badge>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: project.Colors.Accent }}>Role</h4>
                                        <p className="whitespace-pre-line font-medium leading-tight">{project.Column_1.Role}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: project.Colors.Accent }}>Links</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.Column_1.Link.map((linkItem, idx) => (
                                                <a
                                                    key={idx}
                                                    href={linkItem.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 group hover:bg-[var(--accent)] hover:!text-[var(--bg)] hover:border-[var(--accent)]"
                                                    style={{
                                                        '--accent': project.Colors.Accent,
                                                        '--bg': project.Colors.Background,
                                                        borderColor: project.Colors.Accent,
                                                        color: project.Colors.Foreground
                                                    } as React.CSSProperties}
                                                >
                                                    <span className="transition-colors duration-200 group-hover:!text-[var(--bg)]" style={{ color: project.Colors.Accent }}>
                                                        {getIcon(linkItem.logo)}
                                                    </span>
                                                    <span>{linkItem.text}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: project.Colors.Accent }}>Impact</h4>
                                        <ul className="list-disc list-outside ml-4 text-sm leading-snug space-y-1">
                                            {project.Column_1.Impact.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: project.Colors.Accent }}>Learned</h4>
                                        <ul className="list-disc list-outside ml-4 text-sm leading-snug space-y-1">
                                            {project.Column_1.What_I_learned.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Content (5 cols wide) */}
                        <div className="md:col-span-4 flex flex-col h-full space-y-6">
                            {/* Description */}
                            <div className="max-w-4xl">
                                <p className="text-lg md:text-xl leading-relaxed opacity-90 line-clamp-2">
                                    {project.Column_2.Project_Description}
                                </p>
                                <Link
                                    href={`/projects/${project.Column_1.Slug}`}
                                    className="inline-block mt-2 text-lg md:text-xl font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
                                    style={{ color: project.Colors.Accent }}
                                >
                                    Read More →
                                </Link>
                            </div>

                            {/* Image */}
                            <Link
                                href={`/projects/${project.Column_1.Slug}`}
                                className="flex-1 w-full relative overflow-hidden rounded-xl bg-black/10 border-2 hover:opacity-90 transition-opacity"
                                style={{ borderColor: project.Colors.Accent }}
                            >
                                <img
                                    src={project.Assets.landing}
                                    alt={project.Column_1.Title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    draggable={false}
                                />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
