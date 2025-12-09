'use client';

const ProjectsSection = () => {
    return (
        <section className="relative z-50 min-h-screen w-full bg-[#111111] px-4 py-20 lg:px-12">
            <div className="container mx-auto flex flex-col gap-12 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-clash text-4xl font-bold uppercase tracking-widest text-white md:text-6xl">Selected Works</h2>
                    <p className="text-gray-400 max-w-xl text-lg">
                        Here are some of the projects I've worked on. A mix of professional work and personal experiments.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">

                    {/* Item 1: Featured Project (Large) - Spans 2 cols */}
                    <div className="group relative overflow-hidden rounded-3xl bg-neutral-900 md:col-span-2 border border-neutral-800 transition-all hover:border-neutral-600">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 p-8 z-20 flex flex-col gap-2 transition-transform group-hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-white">E-Commerce Dashboard</h3>
                            <p className="text-gray-300">A comprehensive analytics dashboard with real-time data visualization.</p>
                            <div className="flex gap-2 mt-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white">Next.js</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white">TypeScript</span>
                            </div>
                        </div>
                        {/* Placeholder visual */}
                        <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Item 2: Mobile App (Tall/Standard) */}
                    <div className="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 transition-all hover:border-neutral-600">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 p-8 z-20 flex flex-col gap-2 transition-transform group-hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-white">Finance App</h3>
                            <p className="text-gray-300">Mobile-first banking application layout.</p>
                            <div className="flex gap-2 mt-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white">React Native</span>
                            </div>
                        </div>
                        {/* Placeholder visual */}
                        <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Item 3: Tool / AI (Standard) */}
                    <div className="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 transition-all hover:border-neutral-600">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 p-8 z-20 flex flex-col gap-2 transition-transform group-hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-white">AI Image Gen</h3>
                            <p className="text-gray-300">Wrapper for Stable Diffusion API.</p>
                        </div>
                        {/* Placeholder visual */}
                        <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    {/* Item 4: Portfolio (Wide) - Spans 2 cols */}
                    <div className="group relative overflow-hidden rounded-3xl bg-neutral-900 md:col-span-2 border border-neutral-800 transition-all hover:border-neutral-600">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 p-8 z-20 flex flex-col gap-2 transition-transform group-hover:-translate-y-2">
                            <h3 className="text-2xl font-bold text-white">Portfolio v1</h3>
                            <p className="text-gray-300">Previous iteration of my personal site using Three.js.</p>
                            <div className="flex gap-2 mt-2">
                                <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white">Three.js</span>
                                <span className="px-3 py-1 text-xs rounded-full bg-white/10 text-white">WebGL</span>
                            </div>
                        </div>
                        {/* Placeholder visual */}
                        <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-500" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
