import projects from '@/data/projects.json';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Generate static params for all projects
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.Column_1.Slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.Column_1.Slug === slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: `${project.Column_1.Title} | Mohammad Rizaldy Ramadhan`,
        description: project.Column_2.Project_Description.slice(0, 160),
    };
}

const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
        case 'github':
            return <Image src="/logos/github.svg" alt="GitHub" width={20} height={20} className="w-5 h-5" />;
        case 'youtube':
            return <Image src="/logos/youtube.svg" alt="YouTube" width={20} height={20} className="w-5 h-5" />;
        case 'instagram':
            return <Image src="/logos/instagram.svg" alt="Instagram" width={20} height={20} className="w-5 h-5" />;
        case 'play':
        case 'google play':
            return <Image src="/logos/play.svg" alt="Google Play" width={20} height={20} className="w-5 h-5" />;
        case 'figma':
            return <Image src="/logos/figma.svg" alt="Figma" width={20} height={20} className="w-5 h-5" />;
        case 'drive':
        case 'google drive':
            return <Image src="/logos/drive.svg" alt="Google Drive" width={20} height={20} className="w-5 h-5" />;
        case 'web':
        default:
            return <Image src="/logos/web.svg" alt="Web" width={20} height={20} className="w-5 h-5" />;
    }
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.Column_1.Slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main
            className="min-h-screen font-satoshi"
            style={{
                backgroundColor: project.Colors.Background,
                color: project.Colors.Foreground
            }}
        >
            {/* Hero Section */}
            <section className="relative">
                {/* Back Button */}
                <Link
                    href="/#projects"
                    className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 hover:opacity-70"
                    style={{
                        borderColor: project.Colors.Accent,
                        backgroundColor: project.Colors.Background,
                        color: project.Colors.Foreground
                    }}
                >
                    ← Back to Projects
                </Link>

                {/* Hero Image */}
                <div
                    className="w-full h-[60vh] relative border-b-4"
                    style={{ borderColor: project.Colors.Accent }}
                >
                    <img
                        src={project.Assets.landing}
                        alt={project.Column_1.Title}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom, transparent 50%, ${project.Colors.Background})`
                        }}
                    />
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-8">
                    <div className="max-w-6xl mx-auto">
                        <Badge
                            className="mb-4 text-sm"
                            style={{
                                backgroundColor: project.Colors.Accent,
                                color: project.Colors.Background
                            }}
                        >
                            {project.Column_1.Year}
                        </Badge>
                        <h1
                            className="text-5xl md:text-7xl font-clash font-bold uppercase leading-tight"
                            style={{ textShadow: `2px 2px 0 ${project.Colors.Accent}` }}
                        >
                            {project.Column_1.Title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-8 md:px-16 py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Sidebar - Metadata */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Role */}
                        <div>
                            <h3
                                className="text-xs font-bold uppercase tracking-wider mb-2"
                                style={{ color: project.Colors.Accent }}
                            >
                                Role
                            </h3>
                            <p className="whitespace-pre-line font-medium text-lg leading-tight">
                                {project.Column_1.Role}
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h3
                                className="text-xs font-bold uppercase tracking-wider mb-3"
                                style={{ color: project.Colors.Accent }}
                            >
                                Links
                            </h3>
                            <div className="flex flex-col gap-2">
                                {project.Column_1.Link.map((linkItem, idx) => (
                                    <a
                                        key={idx}
                                        href={linkItem.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:opacity-80"
                                        style={{
                                            borderColor: project.Colors.Accent,
                                            color: project.Colors.Foreground
                                        }}
                                    >
                                        <span style={{ color: project.Colors.Accent }}>
                                            {getIcon(linkItem.logo)}
                                        </span>
                                        <span>{linkItem.text}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Impact */}
                        <div>
                            <h3
                                className="text-xs font-bold uppercase tracking-wider mb-3"
                                style={{ color: project.Colors.Accent }}
                            >
                                Impact
                            </h3>
                            <ul className="space-y-3">
                                {project.Column_1.Impact.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-sm leading-relaxed"
                                    >
                                        <span
                                            className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                                            style={{ backgroundColor: project.Colors.Accent }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What I Learned */}
                        <div>
                            <h3
                                className="text-xs font-bold uppercase tracking-wider mb-3"
                                style={{ color: project.Colors.Accent }}
                            >
                                What I Learned
                            </h3>
                            <ul className="space-y-3">
                                {project.Column_1.What_I_learned.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-sm leading-relaxed"
                                    >
                                        <span
                                            className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                                            style={{ backgroundColor: project.Colors.Accent }}
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content - Description */}
                    <article className="lg:col-span-2">
                        <h2
                            className="text-2xl font-clash font-bold uppercase mb-6"
                            style={{ color: project.Colors.Accent }}
                        >
                            About the Project
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed opacity-90">
                            {project.Column_2.Project_Description}
                        </p>

                        {/* Accent Divider */}
                        <div
                            className="w-24 h-1 rounded-full my-12"
                            style={{ backgroundColor: project.Colors.Accent }}
                        />

                        {/* Project Colors Preview */}
                        <div>
                            <h3
                                className="text-xs font-bold uppercase tracking-wider mb-4"
                                style={{ color: project.Colors.Accent }}
                            >
                                Color Palette
                            </h3>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 rounded-lg border-2 mb-2"
                                        style={{
                                            backgroundColor: project.Colors.Background,
                                            borderColor: project.Colors.Foreground
                                        }}
                                    />
                                    <span className="text-xs opacity-60">Background</span>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 rounded-lg mb-2"
                                        style={{ backgroundColor: project.Colors.Foreground }}
                                    />
                                    <span className="text-xs opacity-60">Foreground</span>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="w-16 h-16 rounded-lg mb-2"
                                        style={{ backgroundColor: project.Colors.Accent }}
                                    />
                                    <span className="text-xs opacity-60">Accent</span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="border-t px-8 md:px-16 py-8"
                style={{ borderColor: project.Colors.Accent }}
            >
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link
                        href="/#projects"
                        className="text-sm font-medium hover:opacity-70 transition-opacity"
                        style={{ color: project.Colors.Accent }}
                    >
                        ← Back to all projects
                    </Link>
                    <span className="text-sm opacity-60">
                        {project.Column_1.Title} • {project.Column_1.Year}
                    </span>
                </div>
            </footer>
        </main>
    );
}
