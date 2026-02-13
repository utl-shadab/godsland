import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Globe, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    { icon: <Shield size={40} />, title: 'Bank-Grade Security', description: 'Advanced encryption and smart contract auditing ensuring your assets are always safe.' },
    { icon: <Zap size={40} />, title: 'Lightning Fast', description: 'Zero-latency transactions powered by our proprietary Layer-2 solution.' },
    { icon: <Globe size={40} />, title: 'Cross-Chain Support', description: 'Seamlessly trade assets across Ethereum, Solana, and Polygon networks.' },
    { icon: <Cpu size={40} />, title: 'AI-Powered Insights', description: 'Get real-time market predictions and valuation estimates powered by AI.' },
];

const WhyChooseUs = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const cards = sectionRef.current?.querySelectorAll('.feature-card');
        if (cards) {
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }
    }, []);

    return (
        <section className="py-32 bg-black relative z-10" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="text-center mb-20">
                    <span className="text-neon-green uppercase tracking-[0.2em] font-bold block mb-4">Why Godsland</span>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tight">The Future Standard</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card p-10 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-neon-green/50 transition-all duration-300 group hover:-translate-y-2">
                            <div className="text-neon-green mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,255,163,0.5)]">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-green transition-colors">{feature.title}</h3>
                            <p className="text-text-secondary leading-relaxed group-hover:text-white/80 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
