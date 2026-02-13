
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        name: 'Bronze',
        nfts: '50',
        price: '2 ETH',
        features: ['Access to Discord', 'Basic Support', 'Voting Rights', 'Common Airdrops'],
        highlight: false
    },
    {
        name: 'Silver',
        nfts: '150',
        price: '5 ETH',
        features: ['Everything in Bronze', 'Priority Support', '2% Royalties', 'Rare Airdrops'],
        highlight: true // Highlighted as per reference image (2nd card)
    },
    {
        name: 'Gold',
        nfts: '500',
        price: '12 ETH',
        features: ['Everything in Silver', 'Zero Gas Fees', 'Early Access', 'Legendary Airdrops'],
        highlight: false
    },
    {
        name: 'Platinum',
        nfts: 'Unlimited',
        price: '25 ETH',
        features: ['Everything in Gold', 'VIP Lounge', 'Governance Token', 'Personal Manager'],
        highlight: false
    }
];

const MembershipSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate Header
        gsap.fromTo(headerRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );

        // Animate Cards
        const cards = gsap.utils.toArray('.plan-card');
        gsap.fromTo(cards,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section className="py-24 bg-[#020403] relative overflow-hidden" ref={sectionRef}>
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16" ref={headerRef}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
                    <p className="text-gray-400">Discover the perfect plan Tailored just for you</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`plan-card relative p-8 rounded-[2rem] border transition-all duration-300 group ${plan.highlight
                                ? 'bg-[#050505] border-neon-green shadow-[0_0_30px_rgba(0,211,44,0.15)]'
                                : 'bg-transparent border-white/10 hover:border-white/30'
                                }`}
                        >
                            {/* Card Glow if highlighted */}
                            {plan.highlight && (
                                <div className="absolute inset-0 bg-gradient-to-b from-neon-green/10 to-transparent rounded-[2rem] pointer-events-none"></div>
                            )}

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className={`text-lg font-bold mb-4 ${plan.highlight ? 'text-neon-green' : 'text-neon-green'}`}>
                                    {plan.name}
                                </h3>

                                <div className="flex items-baseline mb-2">
                                    <span className="text-5xl font-bold text-white tracking-tight">{plan.nfts}</span>
                                    <span className="ml-2 text-gray-500 font-medium text-sm">NFTs</span>
                                </div>

                                <p className="text-gray-500 text-sm mb-8">Lorem ipsum dolor sit amet</p>

                                <div className="w-full h-px bg-white/10 mb-8"></div>

                                {/* Features */}
                                <ul className="space-y-4 mb-auto">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle2 size={18} className="text-neon-green shrink-0" />
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <button
                                    className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide mt-8 transition-all duration-300 ${plan.highlight
                                        ? 'bg-neon-green text-black hover:bg-white hover:scale-[1.02]'
                                        : 'bg-transparent border border-white/10 text-white hover:border-neon-green hover:text-neon-green'
                                        }`}
                                >
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MembershipSection;
