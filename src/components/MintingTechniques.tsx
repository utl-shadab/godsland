import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    { id: 1, title: 'Connect Wallet', desc: 'Securely connect via Metamask/Phantom.', x: '10%', y: '75%' },
    { id: 2, title: 'Upload Artifact', desc: 'Upload your digital asset to IPFS.', x: '35%', y: '25%' },
    { id: 3, title: 'Set Properties', desc: 'Define royalties and scarcity.', x: '60%', y: '75%' },
    { id: 4, title: 'Instant Mint', desc: 'Gas-free minting on L2.', x: '85%', y: '25%' },
];

const MintingTechniques = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const path = pathRef.current;
        if (!path) return;

        const totalLength = path.getTotalLength();

        // Initialize path to be invisible
        gsap.set(path, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength
        });

        // Animate Path
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                // start: "top center",
                // start: "top 95%",
                start: "top+=5% bottom",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });

        // Animate Steps
        const stepElements = gsap.utils.toArray('.mint-step');
        stepElements.forEach((step: any, index) => {
            gsap.fromTo(step,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: `top+=${index * 15}% center`, // Staggered trigger based on scroll
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

    }, []);

    return (
        <section className="min-h-[100vh] bg-black relative overflow-hidden flex flex-col justify-center font-primary py-24" ref={sectionRef}>

            {/* Header - Aligned to left */}
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 mb-12">
                <h2 className="text-4xl md:text-6xl font-medium text-white mb-2">Minting Techniques</h2>
                <p className="text-gray-400 text-lg">4 Simple Steps to create your legacy</p>
            </div>

            <div className="w-full relative h-[650px] hidden md:block " ref={containerRef}>

                {/* Wave Line Container */}
                <div className="absolute inset-0 w-full h-full ">
                    {/* SVG Wave */}
                    <svg className="w-full h-full visible py-4" preserveAspectRatio="none" viewBox="0 0 1440 680">
                        <defs>
                            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(0, 255, 163, 0)" />
                                <stop offset="20%" stopColor="#00d32c" />
                                <stop offset="80%" stopColor="#00d32c" />
                                <stop offset="100%" stopColor="rgba(0, 255, 163, 0)" />
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                {/* <feGaussianBlur stdDeviation="15" result="coloredBlur" /> */}
                                <feGaussianBlur stdDeviation="25" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Background subtle line */}
                        <path
                            d="M -100 600 C 200 600, 300 100, 500 100 S 800 600, 1000 600 S 1300 100, 1540 100"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="4"
                        />
                        {/* Animated Neon Line */}
                        <path
                            ref={pathRef}
                            d="M -100 600 C 200 600, 300 100, 500 100 S 800 600, 1000 600 S 1300 100, 1540 100"
                            fill="none"
                            stroke="url(#neonGradient)"
                            strokeWidth="16"
                            filter="url(#glow)"
                        />
                    </svg>
                </div>

                {/* Steps positioned absolutely */}
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="mint-step absolute z-10 w-[300px]"
                        style={{ left: step.x, top: step.y }}
                    >
                        <div className="relative">
                            {/* Large Background Number */}
                            <span className="absolute -top-[120px] -left-10 text-[10rem] font-bold text-[#00d32c]/10 leading-none select-none -z-10 font-mono italic">
                                0{step.id}
                            </span>

                            <h3 className="text-2xl font-bold text-white mb-2 ml-4">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-[240px] ml-4 font-light">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Fallback (Hidden on large screens, simplified) */}
            <div className="md:hidden flex flex-col gap-12 relative z-10 px-8 mt-12">
                {/* Simplified list for mobile */}
                {steps.map((step) => (
                    <div key={step.id} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
                        <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-neon-green shadow-[0_0_10px_#00d32c]"></div>
                        <span className="text-neon-green font-bold text-lg mb-1 block">0{step.id}</span>
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-gray-400 text-sm">{step.desc}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default MintingTechniques;
