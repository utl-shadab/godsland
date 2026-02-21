import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Compass, Sparkles, Layers, Globe, Palette, Lock } from "lucide-react";

const FEATURES = [
    {
        icon: Compass,
        title: "Metaverse Realms",
        description: "Explore immersive virtual worlds exclusive to Godsland members. Own land, build experiences, and connect.",
    },
    {
        icon: Sparkles,
        title: "Exclusive Drops",
        description: "Get priority access to limited edition NFT drops, artist collaborations, and surprise airdrops.",
    },
    {
        icon: Layers,
        title: "Staking Rewards",
        description: "Stake your NFTs to earn passive rewards, boost your tier ranking, and unlock premium features.",
    },
    {
        icon: Globe,
        title: "Global Events",
        description: "Attend invitation-only events worldwide — from gallery openings to luxury retreats.",
    },
    {
        icon: Palette,
        title: "Creator Tools",
        description: "Access professional-grade tools to create, mint, and sell your own NFT collections.",
    },
    {
        icon: Lock,
        title: "Private Vaults",
        description: "Secure your most valuable assets in encrypted, multi-sig vaults with insurance coverage.",
    },
];

const ExploreFeatures = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".explore-heading",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
            gsap.fromTo(
                ".feature-card",
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.2 }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="explore-heading text-center mb-14">
                    <span className="text-neon-green text-xs font-semibold uppercase tracking-widest mb-3 block">
                        Explore Features
                    </span>
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Discover{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-300">
                            The Club
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        Explore the exclusive features and experiences available to Godsland
                        members. From metaverse realms to physical wellness sanctuaries.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="feature-card group relative rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-6 md:p-8 overflow-hidden hover:border-neon-green/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Glow corner */}
                            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-neon-green/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-neon-green/[0.08] border border-neon-green/20 flex items-center justify-center mb-5 group-hover:bg-neon-green/15 transition-colors">
                                    <f.icon size={22} className="text-neon-green" />
                                </div>
                                <h3 className="text-white text-lg font-semibold mb-2">
                                    {f.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreFeatures;
