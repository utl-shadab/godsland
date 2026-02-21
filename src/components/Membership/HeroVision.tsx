import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STATS = [
    { value: "4", label: "Membership Tiers" },
    { value: "5", label: "NFT Categories" },
    { value: "100%", label: "Utility Driven" },
    { value: "∞", label: "Possibilities" },
];

const HeroVision = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            tl.fromTo(".hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
            tl.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
            tl.fromTo(
                ".hero-stat",
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1 },
                "-=0.2"
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
            {/* BG Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,211,44,0.06),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,211,44,0.04),transparent_50%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-neon-green/[0.04] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-neon-green/[0.06] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
                <span className="hero-badge inline-block px-4 py-1.5 rounded-full bg-neon-green/[0.08] border border-neon-green/20 text-neon-green text-xs font-semibold uppercase tracking-widest mb-8">
                    Exclusive NFT Club
                </span>

                <h1 className="hero-title text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
                    Where{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-300">
                        Digital
                    </span>
                    <br />
                    Meets{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                        Physical
                    </span>
                </h1>

                <p className="hero-sub text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
                    Join the most exclusive NFT membership club where digital assets unlock
                    real-world experiences, wellness benefits, and governance rights in the
                    Godsland ecosystem.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="hero-stat rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-5 hover:border-neon-green/20 transition-all duration-300 group"
                        >
                            <p className="text-neon-green text-3xl md:text-4xl font-bold mb-1 group-hover:scale-105 transition-transform">
                                {stat.value}
                            </p>
                            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroVision;
