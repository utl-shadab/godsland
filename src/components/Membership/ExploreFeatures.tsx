import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Sparkles, Layers, Globe, Palette, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Feature Data ─── */
const FEATURES = [
    {
        icon: Compass,
        title: "Metaverse Realms",
        description:
            "Explore immersive virtual worlds exclusive to Godsland members. Own land, build experiences, and connect with a global community.",
        gradient: "linear-gradient(135deg, #34d399 0%, #22c55e 100%)",
    },
    {
        icon: Sparkles,
        title: "Exclusive Drops",
        description:
            "Get priority access to limited edition NFT drops, artist collaborations, and surprise airdrops before anyone else.",
        gradient: "linear-gradient(135deg, #4ade80 0%, #2dd4bf 100%)",
    },
    {
        icon: Layers,
        title: "Staking Rewards",
        description:
            "Stake your NFTs to earn passive rewards, boost your tier ranking, and unlock premium features within the ecosystem.",
        gradient: "linear-gradient(135deg, #2dd4bf 0%, #06b6d4 100%)",
    },
    {
        icon: Globe,
        title: "Global Events",
        description:
            "Attend invitation-only events worldwide — from gallery openings and luxury retreats to exclusive networking experiences.",
        gradient: "linear-gradient(135deg, #06b6d4 0%, #34d399 100%)",
    },
    {
        icon: Palette,
        title: "Creator Tools",
        description:
            "Access professional-grade tools to create, mint, and sell your own NFT collections with zero technical barriers.",
        gradient: "linear-gradient(135deg, #a3e635 0%, #22c55e 100%)",
    },
    {
        icon: Lock,
        title: "Private Vaults",
        description:
            "Secure your most valuable assets in encrypted, multi-sig vaults with insurance coverage and full peace of mind.",
        gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    },
];

/* ─── Individual Card Component ─── */
const FeatureCard = ({
    feature,
    index,
}: {
    feature: (typeof FEATURES)[0];
    index: number;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!cardRef.current || !glowRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            glowRef.current.style.opacity = "1";
            glowRef.current.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(74,222,128,0.07), transparent 60%)`;

            // Subtle 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(0px)`;
        },
        []
    );

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current || !glowRef.current) return;
        glowRef.current.style.opacity = "0";
        cardRef.current.style.transform =
            "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    }, []);

    return (
        <div
            className="feature-card"
            style={{ willChange: "transform, opacity" }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-default"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 100%)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition:
                        "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease",
                }}
            >
                {/* Mouse-follow glow */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                    }}
                />

                {/* Top accent bar — reveals on hover */}
                <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-10"
                    style={{
                        background: feature.gradient,
                        transform: "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                >
                    <style>{`
                        .group:hover > div:nth-child(3) {
                            transform: scaleX(1) !important;
                        }
                    `}</style>
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
                    {/* Icon + Index */}
                    <div className="flex sm:flex-col items-center gap-4 sm:gap-2 shrink-0">
                        <div
                            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden"
                            style={{
                                background: "rgba(74, 222, 128, 0.06)",
                                border: "1px solid rgba(74, 222, 128, 0.12)",
                                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                            }}
                        >
                            {/* Icon glow pulse on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                style={{
                                    background: feature.gradient,
                                    filter: "blur(12px)",
                                    opacity: 0,
                                    transition: "opacity 0.6s ease",
                                }}
                            />
                            <feature.icon
                                size={40}
                                className="relative z-10"
                                style={{
                                    color: "#4ade80",
                                    transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                                }}
                            />
                        </div>
                        <span
                            className="font-mono tracking-widest"
                            style={{
                                fontSize: "20px",
                                color: "rgba(74, 222, 128, 0.3)",
                                transition: "color 0.4s ease",
                            }}
                        >
                            0{index + 1}
                        </span>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                        <h3
                            className="text-white text-lg sm:text-2xl md:text-4xl font-light! mb-2 leading-snug"
                            style={{
                                transition: "color 0.4s ease",
                            }}
                        >
                            {feature.title}
                        </h3>
                        <p
                            className="text-sm font-thin sm:text-[15px] md:text-2xl leading-relaxed max-w-xl"
                            style={{
                                color: "rgba(224, 224, 225, 0.85)",
                                transition: "color 0.4s ease",
                            }}
                        >
                            {feature.description}
                        </p>
                    </div>

                    {/* Arrow — visible on hover, hidden on mobile */}
                    <div
                        className="hidden  items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full shrink-0 self-center"
                        style={{
                            border: "1px solid rgba(255,255,255,0.06)",
                            background: "rgba(255,255,255,0.02)",
                            transition:
                                "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                            transform: "translateX(0)",
                        }}
                    >
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ transition: "stroke 0.4s ease" }}
                            />
                        </svg>
                    </div>
                </div>

                {/* Hover border glow effect */}
                <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100"
                    style={{
                        border: "1px solid rgba(74,222,128,0.12)",
                        transition: "opacity 0.5s ease",
                    }}
                />
            </div>
        </div>
    );
};

/* ─── Main Section ─── */
const ExploreFeatures = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            /* ── Heading reveal ── */
            const headingParts = gsap.utils.toArray<HTMLElement>(".ef-heading-part");
            gsap.fromTo(
                headingParts,
                { opacity: 0, y: 30, filter: "blur(6px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".ef-heading-wrap",
                        start: "top 82%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            /* ── Decorative line ── */
            gsap.fromTo(
                ".ef-divider",
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 1.4,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: ".ef-divider",
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            /* ── Card reveals — smooth staggered entrance ── */
            const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.96,
                        filter: "blur(4px)",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            end: "top 60%",
                            toggleActions: "play none none reverse",
                        },
                        delay: i * 0.06, // subtle cascading feel
                    }
                );
            });

            /* ── Parallax drift for the ambient glow ── */
            gsap.to(".ef-ambient-glow", {
                y: -80,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{
                background: "#040404",
                paddingTop: "clamp(80px, 10vw, 140px)",
                paddingBottom: "clamp(80px, 10vw, 140px)",
            }}
        >
            {/* ── Ambient background glows ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="ef-ambient-glow absolute rounded-full"
                    style={{
                        width: "clamp(300px, 50vw, 700px)",
                        height: "clamp(300px, 50vw, 700px)",
                        top: "15%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background:
                            "radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 65%)",
                        filter: "blur(40px)",
                    }}
                />
                <div
                    className="ef-ambient-glow absolute rounded-full"
                    style={{
                        width: "clamp(200px, 30vw, 400px)",
                        height: "clamp(200px, 30vw, 400px)",
                        bottom: "10%",
                        right: "-5%",
                        background:
                            "radial-gradient(circle, rgba(34,197,94,0.03) 0%, transparent 70%)",
                        filter: "blur(50px)",
                    }}
                />
            </div>

            {/* Noise overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-[1]"
                style={{
                    opacity: 0.025,
                    backgroundImage:
                        "url('https://grainy-gradients.vercel.app/noise.svg')",
                }}
            />

            <div
                className="relative z-10 mx-auto"
                style={{
                    maxWidth: "min(900px, 92vw)",
                    padding: "0 clamp(16px, 4vw, 24px)",
                }}
            >
                {/* ── Heading Block ── */}
                <div className="ef-heading-wrap text-center" style={{ marginBottom: "clamp(48px, 8vw, 80px)" }}>
                    <span
                        className="ef-heading-part inline-block text-xs font-semibold uppercase mb-5 px-4 py-1.5 rounded-full"
                        style={{
                            letterSpacing: "0.25em",
                            color: "#4ade80",
                            border: "1px solid rgba(74, 222, 128, 0.12)",
                            background: "rgba(74, 222, 128, 0.04)",
                        }}
                    >
                        Explore Features
                    </span>

                    <h2
                        className="ef-heading-part text-white font-bold leading-tight"
                        style={{ fontSize: "clamp(28px, 5vw, 56px)", marginBottom: "clamp(12px, 2vw, 20px)" }}
                    >
                        Discover{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, #4ade80, #34d399, #2dd4bf)",
                            }}
                        >
                            The Club
                        </span>
                    </h2>

                    <p
                        className="ef-heading-part mx-auto leading-relaxed"
                        style={{
                            fontSize: "clamp(14px, 1.6vw, 18px)",
                            color: "#9ca3af",
                            maxWidth: "min(580px, 90%)",
                        }}
                    >
                        Explore the exclusive features and experiences available to
                        Godsland members. From metaverse realms to physical wellness
                        sanctuaries.
                    </p>
                </div>

                {/* ── Decorative divider ── */}
                <div
                    className="ef-divider mx-auto"
                    style={{
                        height: 1,
                        width: "clamp(60px, 20vw, 160px)",
                        background:
                            "linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent)",
                        transformOrigin: "center",
                        marginBottom: "clamp(40px, 6vw, 64px)",
                    }}
                />

                {/* ── Feature Cards ── */}
                <div
                    className="flex flex-col"
                    style={{ gap: "clamp(12px, 2vw, 20px)" }}
                >
                    {FEATURES.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreFeatures;