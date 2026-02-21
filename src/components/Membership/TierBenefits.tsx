import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

type TierKey = "Bronze" | "Silver" | "Gold" | "Platinum";

interface BenefitRow {
    name: string;
    values: Record<TierKey, number>;
}

const TIERS: TierKey[] = ["Bronze", "Silver", "Gold", "Platinum"];

const TIER_COLORS: Record<TierKey, string> = {
    Bronze: "#CD7F32",
    Silver: "#C0C0C0",
    Gold: "#FFD700",
    Platinum: "#E5E4E2",
};

const BENEFITS: BenefitRow[] = [
    { name: "Metaverse Access", values: { Bronze: 25, Silver: 50, Gold: 80, Platinum: 100 } },
    { name: "Wellness Benefits", values: { Bronze: 15, Silver: 40, Gold: 75, Platinum: 100 } },
    { name: "Voting Rights", values: { Bronze: 10, Silver: 30, Gold: 70, Platinum: 100 } },
    { name: "Exclusive Events", values: { Bronze: 5, Silver: 25, Gold: 60, Platinum: 100 } },
    { name: "Private Drops", values: { Bronze: 0, Silver: 20, Gold: 65, Platinum: 100 } },
    { name: "Concierge Support", values: { Bronze: 0, Silver: 10, Gold: 50, Platinum: 100 } },
];

const TierBenefits = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const barsRef = useRef<HTMLDivElement>(null);
    const [activeTier, setActiveTier] = useState<TierKey>("Platinum");

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".tier-benefits-heading",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Animate bars on tier change
    useEffect(() => {
        if (!barsRef.current) return;
        const bars = barsRef.current.querySelectorAll(".benefit-bar-fill");
        gsap.fromTo(
            bars,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", transformOrigin: "left" }
        );
    }, [activeTier]);

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-28 px-4 relative"
        >
            <div className="max-w-7xl mx-auto">
                <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0a1a14]/80 via-[#0a0a0a] to-[#0a0a0a] p-6 md:p-10 lg:p-12 overflow-hidden relative">
                    {/* Corner glow */}
                    <div
                        className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-30 transition-colors duration-500"
                        style={{ backgroundColor: TIER_COLORS[activeTier] }}
                    />

                    <div className="relative grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-12">
                        {/* Left: Title + Tabs */}
                        <div className="tier-benefits-heading">
                            <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 italic">
                                Tier Benefits
                            </h2>
                            <p className="text-gray-400 text-sm mb-8">
                                Exclusive features by membership level
                            </p>

                            {/* Tier Tabs */}
                            <div className="flex flex-wrap gap-2">
                                {TIERS.map((tier) => (
                                    <button
                                        key={tier}
                                        onClick={() => setActiveTier(tier)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${activeTier === tier
                                            ? "border-transparent text-black"
                                            : "border-white/10 text-gray-400 hover:border-white/20 hover:text-white bg-transparent"
                                            }`}
                                        style={
                                            activeTier === tier
                                                ? { backgroundColor: TIER_COLORS[tier], color: "#000" }
                                                : undefined
                                        }
                                    >
                                        {tier}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Progress Bars */}
                        <div ref={barsRef} className="space-y-5">
                            {BENEFITS.map((benefit) => {
                                const value = benefit.values[activeTier];
                                return (
                                    <div key={benefit.name}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white text-sm font-medium">
                                                {benefit.name}
                                            </span>
                                            <span
                                                className="text-sm font-bold"
                                                style={{ color: TIER_COLORS[activeTier] }}
                                            >
                                                {value}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                                            <div
                                                className="benefit-bar-fill h-full rounded-full transition-colors duration-300"
                                                style={{
                                                    width: `${value}%`,
                                                    backgroundColor: TIER_COLORS[activeTier],
                                                    opacity: value === 0 ? 0.3 : 0.85,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TierBenefits;
