import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Check, Crown, Shield, Star, Gem } from "lucide-react";

interface Tier {
    name: string;
    icon: typeof Crown;
    color: string;
    gradient: string;
    shadow: string;
    shine: string;
    description: string;
    features: string[];
}

const TIERS: Tier[] = [
    {
        name: "Bronze",
        icon: Shield,
        color: "#CD7F32",
        gradient: "linear-gradient(135deg, #CD7F32 0%, #8B4513 50%, #CD7F32 100%)",
        shadow: "0 20px 60px rgba(205,127,50,0.2)",
        shine: "linear-gradient(110deg, transparent 30%, rgba(205,127,50,0.3) 45%, rgba(255,215,0,0.1) 55%, transparent 70%)",
        description: "Your entry into the Godsland ecosystem. Bronze members gain foundational access and benefits.",
        features: [
            "Basic NFT Club access",
            "Community forum participation",
            "Standard marketplace access",
            "Monthly newsletter",
        ],
    },
    {
        name: "Silver",
        icon: Star,
        color: "#C0C0C0",
        gradient: "linear-gradient(135deg, #E8E8E8 0%, #A8A8A8 40%, #C0C0C0 60%, #D8D8D8 100%)",
        shadow: "0 20px 60px rgba(192,192,192,0.2)",
        shine: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 45%, rgba(192,192,192,0.2) 55%, transparent 70%)",
        description: "Enhanced privileges with priority event access and exclusive digital content drops.",
        features: [
            "Priority event invitations",
            "Exclusive digital drops",
            "Enhanced marketplace perks",
            "Wellness program access",
            "Silver badge recognition",
        ],
    },
    {
        name: "Gold",
        icon: Gem,
        color: "#FFD700",
        gradient: "linear-gradient(135deg, #FFD700 0%, #D4AF37 40%, #FFD700 60%, #FFF8DC 100%)",
        shadow: "0 20px 60px rgba(255,215,0,0.25)",
        shine: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 45%, rgba(255,215,0,0.3) 55%, transparent 70%)",
        description: "Premium access to governance, private vaults, and advanced investment tools.",
        features: [
            "Governance voting rights",
            "Private vault access",
            "VIP event seating",
            "Advanced analytics suite",
            "Priority support",
            "Gold badge & profile frame",
        ],
    },
    {
        name: "Platinum",
        icon: Crown,
        color: "#E5E4E2",
        gradient: "linear-gradient(135deg, #E5E4E2 0%, #B0AEB0 30%, #E5E4E2 50%, #FFFFFF 70%, #D0CED0 100%)",
        shadow: "0 20px 60px rgba(229,228,226,0.3)",
        shine: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.6) 42%, rgba(229,228,226,0.4) 58%, transparent 75%)",
        description: "The pinnacle of Godsland membership. Maximum privileges, governance rights, and lifetime access.",
        features: [
            "Highest NFT Club tier weighting",
            "Access to private drops & vaults",
            "Invitation-only events worldwide",
            "Priority governance influence",
            "Concierge-level platform support",
            "Lifetime wellness benefits",
        ],
    },
];

const TierCard = ({ tier, index }: { tier: Tier; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        setTilt({ x, y });
    };

    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="tier-card perspective-1000 cursor-pointer group"
            style={{ animationDelay: `${index * 0.5}s` }}
        >
            <div
                className="preserve-3d relative rounded-3xl overflow-hidden transition-transform duration-300 ease-out"
                style={{
                    transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                    boxShadow: tier.shadow,
                }}
            >
                {/* Card Face */}
                <div
                    className="relative p-6 md:p-8 min-h-[420px] flex flex-col"
                    style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)" }}
                >
                    {/* Metallic Top Edge */}
                    <div
                        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                        style={{ background: tier.gradient }}
                    />

                    {/* Shine Overlay */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: tier.shine,
                            backgroundSize: "200% 100%",
                            animation: "cardShine 3s linear infinite",
                        }}
                    />

                    {/* Glow Corner */}
                    <div
                        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{ backgroundColor: tier.color }}
                    />

                    {/* Icon */}
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border"
                        style={{
                            borderColor: `${tier.color}40`,
                            background: `linear-gradient(135deg, ${tier.color}15, transparent)`,
                        }}
                    >
                        <tier.icon size={28} style={{ color: tier.color }} />
                    </div>

                    {/* Title */}
                    <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: tier.color }}
                    >
                        {tier.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow-0">
                        {tier.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2.5 mt-auto">
                        {tier.features.map((f) => (
                            <div key={f} className="flex items-start gap-2.5">
                                <div
                                    className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                                    style={{ backgroundColor: `${tier.color}20` }}
                                >
                                    <Check size={10} style={{ color: tier.color }} />
                                </div>
                                <span className="text-gray-300 text-sm">{f}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom metallic divider */}
                    <div
                        className="mt-6 h-px w-full opacity-30"
                        style={{ background: tier.gradient }}
                    />

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: tier.color }}
                            />
                            <span className="text-gray-500 text-xs uppercase tracking-wider">
                                {tier.name} Tier
                            </span>
                        </div>
                        <span
                            className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: tier.color }}
                        >
                            Learn More →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MembershipTiers = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".tier-heading",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
            gsap.fromTo(
                ".tier-card",
                { opacity: 0, y: 50, rotateY: -10 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 0.6,
                    stagger: 0.12,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-28 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="tier-heading text-center mb-14">
                    <span className="text-neon-green text-xs font-semibold uppercase tracking-widest mb-3 block">
                        Choose Your Path
                    </span>
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Membership{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-300">
                            Tiers
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base max-w-2xl mx-auto">
                        Four exclusive tiers designed to elevate your digital and physical experiences.
                        Each tier unlocks progressively more powerful benefits.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {TIERS.map((tier, i) => (
                        <TierCard key={tier.name} tier={tier} index={i} />
                    ))}
                </div>

                {/* Governance Footer */}
                <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-center">
                    {[
                        { label: "Governance", sub: "DAO" },
                        { label: "Structure", sub: "4 Tiers / System" },
                    ].map((item) => (
                        <div key={item.label} className="px-6 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                            <p className="text-neon-green text-lg font-bold">{item.label}</p>
                            <p className="text-gray-500 text-xs">{item.sub}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipTiers;
