import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Eye, Shuffle, Accessibility } from "lucide-react";

const BENEFITS = [
    {
        icon: Eye,
        title: "Physical Wellness",
        description:
            "Access to our world-class wellness facilities including spa treatments, fitness programs, and holistic health services.",
        items: ["Spa & Massage", "Yoga & Meditation", "Nutrition Plans", "Health Tracking"],
    },
    {
        icon: Shuffle,
        title: "Digital Experiences",
        description:
            "Immersive metaverse access with private rooms, virtual events, and exclusive digital content and drops.",
        items: ["Metaverse Access", "Private Rooms", "Digital Events", "NFT Drops"],
    },
    {
        icon: Accessibility,
        title: "Governance Rights",
        description:
            "Participate in DAO decisions with voting power proportional to your membership tier. Shape the future of Godsland.",
        items: ["Voting Power", "Proposal Rights", "Treasury Input", "Partnership Votes"],
    },
];

const WellnessBenefits = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".wellness-heading",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
            gsap.fromTo(
                ".wellness-card",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out", delay: 0.2 }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 px-4 relative overflow-hidden"
        >
            {/* BG Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a1a14]/30 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Heading */}
                <div className="wellness-heading text-center mb-14">
                    <span className="text-neon-green text-xs font-semibold uppercase tracking-[0.3em] mb-3 block">
                        Wellness Benefits
                    </span>
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Member
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                            Privileges
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        Every Godsland membership tier unlocks a world of wellness, luxury,
                        and exclusive experiences. Discover what awaits you.
                    </p>
                </div>

                {/* Benefits Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {BENEFITS.map((b) => (
                        <div
                            key={b.title}
                            className="wellness-card rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#0a1a14]/60 to-[#0a0a0a] p-6 md:p-8 hover:border-neon-green/15 transition-all duration-300 group"
                        >
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-full border border-amber-500/30 bg-amber-500/[0.08] flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-colors">
                                <b.icon size={22} className="text-amber-400" />
                            </div>

                            {/* Content */}
                            <h3 className="text-white text-xl font-bold mb-3">{b.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {b.description}
                            </p>

                            {/* Feature List */}
                            <div className="space-y-2.5">
                                {b.items.map((item) => (
                                    <div key={item} className="flex items-center gap-2.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
                                        <span className="text-gray-300 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WellnessBenefits;
