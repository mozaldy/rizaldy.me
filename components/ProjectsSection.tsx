'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        title: "Adibasa",
        year: "2025",
        role: "Product Owner\nDeveloper",
        link: "Adibasa on Google Play",
        impact: [
            "Made learning the Javanese language easier and therefore foster better communication between Javanese people and 'nomads' living in Java"
        ],
        learned: [
            "Organizing people into working teams",
            "Converting user pains and gains into backlogs",
            "Working under pressure",
            "Collaboration and version control with Git and GitHub",
            "Deployment of working apps on Google Play Store"
        ],
        description: "Adibasa is a mobile app that helps preserve and teach Indonesian local languages through gamified, interactive learning. The project started with identifying limited access to regional language education and low interest among younger generations. I conducted research by analysing platforms like Duolingo and gathering insights from students and educators, revealing a strong need for culturally relevant tools. To address this, Adibasa offers mini dictionaries and interactive gamification with quizzes. These elements are designed to make learning effective and engaging. The app targets students, language enthusiasts, and travellers. Adibasa reflects a clear understanding of the problem. user-centric research, and thoughtful feature design to solve a real cultural challenge with technology.",
        img: "https://cdn.prod.website-files.com/678f62698d1043f9f15c0cec/6870b6eba2c6d2e0c2068fa6_OH_SAMFORD%C2%A9ANDYMACPHERSON-1%20(1).avif" // Placeholder
    },
    {
        title: "Ngumpulin",
        year: "2025",
        role: "Developer",
        link: "Ngumpulin",
        impact: [
            "For lecturers, it reduces administrative workload, enhances grading accuracy, and allows greater focus on academic activities.",
            "For institutions, it increases academic efficiency and supports digital transformation in education."
        ],
        learned: [
            "Studied key concepts like Cosine Similarity, LLMs, and Agentic AI",
            "Designed system architecture and task automation workflows",
            "Built the app using modern tools like Next.js, FastAPI, and PostgreSQL"
        ],
        description: "Ngumpulin is a SaaS (Software as a Service) application designed to manage and grade student assignments. This product integrates AI technology to automate assessment and plagiarism detection, while also providing an efficient platform for task submission. Its core features include digital assignment collection and accurate plagiarism detection.",
        img: "https://cdn.prod.website-files.com/678f62698d1043f9f15c0cec/68b8240475470413456f4c41_OH_SAMFORD%C2%A9ANDYMACPHERSON-47.avif" // Placeholder
    },
    {
        title: "Rahardjo Motor AHASS Admin",
        year: "2024-2025",
        role: "Product Owner\nDeveloper",
        link: "Source code: https://github.com/mozaldy/ahass-admin/\nProduction (not free to use): https://ahass-admin.vercel.app/",
        impact: [
            "This project streamlines the workshop's entire workflow by integrating service management, sales, and inventory into one digital system, ultimately improving operational efficiency, data accuracy.",
            "and providing clear performance insights through automated reporting and auditing."
        ],
        learned: [
            "Using cutting-edge technologies such as Next.js and Prisma ORM. Following industry standard for authentication in Next.js",
            "Implementing advanced form and stage management as well as robust and secure error handlings.",
            "Generating performance reports for data-based business decision-making by converting records into PDFs"
        ],
        description: "Rahardjo Motor Ahass Admin is a comprehensive administration system for a vehicle repair workshop, especially a Honda-authorized service station (AHASS). It manages all aspects of the business. from customer and vehicle registration to service orders, spare part inventory, sales, and financial reporting.",
        img: "https://cdn.prod.website-files.com/678f62698d1043f9f15c0cec/67ec89266a30d21bfc54e72a_OH_POOLHOUSE%C2%A9ANDYMACPHERSON-7%20(1).avif" // Placeholder
    },
    {
        title: "Advancing Sustainable Market (ASMAT)",
        year: "2021",
        role: "Front-end Web Developer",
        link: "Instagram: instagram.com/asmat.papua/\nYouTube: Advancing Sustainable Market (ASMAT)\nUI/UX: ASMAT-Google Drive",
        impact: [
            "This project directly improves the economic well-being of local farmers and producers in Papua by opening new market opportunities.",
            "By promoting sustainably sourced products, ASMAT plays an active role in the conservation and protection of Indonesia's forests."
        ],
        learned: [
            "Working in a cross-functional team",
            "Basics of web programming with HTML, CSS, and JavaScript",
            "Shipping front-end components to the back-end engineer in a zip file and why GitHub is a better alternative"
        ],
        description: "Advancing Sustainable Market (ASMAT) is an e-commerce platform dedicated to marketing agricultural and craft products from the indigenous communities of Papua. The project aims to provide fair and sustainable market access, supporting local community livelihoods without harming the jungle ecosystem.",
        img: "https://cdn.prod.website-files.com/678f62698d1043f9f15c0cec/6812e7c68ea5cdd4757464f3_Web%202.avif" // Placeholder
    },
    {
        title: "VISCA",
        year: "2025",
        role: "Product Owner\nLead Developer",
        link: "GitHub: mozaldy/visca: Vision Scan - An Android app for presention based on facial recognition.\nUI/UX: Visca - Figma",
        impact: [
            "The primary impact is the deployment of an advanced AI/ML solution to solve a traditional problem, an alternative to manual attendance tracking.",
            "The use of the Facenet model ensures high accuracy in verification.",
            "By performing all AI processing on the client's device, the application guarantees user privacy, low-latency performance, and makes sophisticated facial recognition technology practical for everyday use in schools and businesses"
        ],
        learned: [
            "Built a complete app with Flutter UI Riverpod for state management, and Firebase for backend auth and database services.",
            "Implemented the Facenet deep learning model with TensorFlow Lite to perform real-time, on-device facial recognition.",
            "Specialized Database for AI using ObjectBox"
        ],
        description: "Visca is an AI-powered attendance application built with Flutter that leverages a state-of-the-art deep learning model, Facenet, to deliver highly accurate, on-device face recognition. By running the model locally via TensorFlow Lite, the system generates unique facial embeddings for registered members, enabling secure and instantaneous identity verification for automated check-ins.",
        img: "https://cdn.prod.website-files.com/678f62698d1043f9f15c0cec/67cb922bdef0e1b3b391a682_THUMBNAIL.avif" // Placeholder
    }
];

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const progressAmount = progressRef.current;

        if (!section || !container || !progressAmount) return;

        // --- Lenis Setup ---
        const lenis = new Lenis();

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // --- Horizontal Scroll Setup ---
        const ctx = gsap.context(() => {
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
            // Cleanup Lenis
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#f5f5f5] text-black font-satoshi">
            {/* Overall header is removed or made static to the first item if needed, 
                but based on design each item is a screen. 
                We might want a global "Projects" title that stays fixed if requested, 
                but the new design implies each screen is self-contained.
                However, to keep the context, let's keep the global indicators.
            */}

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
                <div
                    className="w-2xl h-screen shrink-0 p-8 box-border bg-background text-foreground"
                >
                    <div className="flex flex-col justify-between h-full  overflow-y-auto pr-4 space-y-8">
                        <div>
                            <h3 className="text-4xl md:text-5xl font-clash font-bold uppercase leading-tight mb-2">
                                Selected Projects
                            </h3>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg">
                                A curated collection of work that spans from mobile apps to enterprise systems, each born from real problems and built with purposeful solutions. Scroll through to explore the stories behind the code—the challenges faced, lessons learned, and impact created.
                            </p>
                        </div>
                    </div>


                </div>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-screen h-screen shrink-0 grid grid-cols-1 md:grid-cols-6 gap-8 p-8 md:p-12 pt-20 box-border"
                    >
                        {/* Column 1 - Metadata (1 col wide in 6-col grid -> 1:5 ratio roughly) */}
                        <div className="md:col-span-2 flex flex-col justify-between h-full overflow-y-auto pr-4 space-y-8">
                            <div>
                                <h3 className="text-4xl md:text-5xl font-clash font-bold uppercase leading-tight mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 mb-6">{project.year}</p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Role</h4>
                                        <p className="whitespace-pre-line font-medium leading-tight">{project.role}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Links</h4>
                                        <p className="whitespace-pre-line text-sm break-words leading-tight hover:underline cursor-pointer">
                                            {project.link}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Impact</h4>
                                        <ul className="list-disc list-outside ml-4 text-sm leading-snug space-y-1">
                                            {project.impact.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Learned</h4>
                                        <ul className="list-disc list-outside ml-4 text-sm leading-snug space-y-1">
                                            {project.learned.map((item, idx) => (
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
                            <p className="text-lg md:text-xl leading-relaxed text-gray-800 max-w-4xl">
                                {project.description}
                            </p>

                            {/* Image */}
                            <div className="flex-1 w-full relative overflow-hidden rounded-xl bg-gray-200">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;
