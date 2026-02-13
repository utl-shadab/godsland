import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreativeCTA = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(textRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'bottom center',
                    scrub: true,
                }
            }
        );
    }, []);

    return (
        <section className="py-20 bg-black flex items-center justify-center px-4" ref={sectionRef}>

            <div
                ref={textRef}
                className="relative w-full  bg-[#020403] border border-neon-green/30 rounded-[3rem] p-12 md:p-24 overflow-hidden group"
            >
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,211,44,0.1),transparent_70%)] opacity-50"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-screen"></div>

                <div className="relative z-10 flex flex-col items-start text-left max-w-3xl">
                    <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight mb-6">
                        Water For All
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl">
                        Every time you buy from us, you help one person get access to clean drinking water!
                        Our mission is to provide Safe Drinking Water to Everyone
                    </p>

                    <Link
                        to="/"
                        className="inline-block py-4 px-10 bg-neon-green text-black font-bold text-lg rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,211,44,0.4)] hover:shadow-[0_0_40px_rgba(0,211,44,0.6)] transform hover:-translate-y-1"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CreativeCTA;
