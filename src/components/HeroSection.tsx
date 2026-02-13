import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';
import HeroSlider from './HeroSlider';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const { isLoading } = useLoading();
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Animation Effect
    useEffect(() => {
        if (isLoading) return; // Wait for loading to finish

        const tl = gsap.timeline();

        // Initial Set
        gsap.set(titleRef.current, { y: '100%' });
        gsap.set(subtitleRef.current, { y: '100%', opacity: 0 });
        gsap.set(ctaRef.current, { y: 20, opacity: 0 });
        gsap.set(scrollRef.current, { opacity: 0 });
        gsap.set('#hero-slider', { opacity: 0, y: 50 }); // Target ID from HeroSlider

        // Sequence: Header is handled in Header.tsx (delays ~800ms)
        // We start Hero animations after a slight delay to allow header to start appearing
        const startDelay = 0.5;

        // Step 3: Hero Title Reveal
        tl.to(titleRef.current, {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: startDelay,
        })
            // Step 4: Subtitle Reveal
            .to(subtitleRef.current, {
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'power3.out',
            }, '-=1.0')
            // Step 5: Buttons Reveal
            .to(ctaRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
            }, '-=0.5')
            // Step 6: 3D Slider Entrance
            .to('#hero-slider', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power2.out',
            }, '-=0.4')

            .to(scrollRef.current, {
                opacity: 1,
                duration: 1,
            }, '-=0.5');

        // Continuous "Flow" animation inside text
        gsap.to(titleRef.current, {
            backgroundPosition: '200% center',
            duration: 4,
            ease: 'linear',
            repeat: -1,
        });

        /* Parallax Effect */
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                backgroundPosition: '50% 50%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }, [isLoading]);

    // Particle System
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];
        const particleCount = 70;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2,
                color: Math.random() > 0.5 ? 'rgba(52, 228, 21, 0.93)' : 'rgba(51, 255, 0, 0.5)'
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative w-full min-h-screen flex flex-col pt-32 pb-12 items-center overflow-hidden px-8 z-10 bg-black" ref={containerRef}>
            {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('/bg.avif')] bg-cover bg-center opacity-60 mix-blend-screen pointer-events-none -z-10"></div> */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/90 -z-10"></div>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-5 opacity-60 pointer-events-none" />

            <div className="text-center max-w-[1400px] w-full z-20 flex flex-col items-center">
                <div className="overflow-hidden mb-2">
                    <h1
                        className="text-[clamp(3.5rem,8vw,5rem)] font-black uppercase leading-[0.85] tracking-tighter text-[#00d32c]"
                        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', transform: 'translateY(100px)' }}
                        ref={titleRef}
                    >
                        Unique Collection
                        <span className="block mt-2">
                            Of NFT Arts
                        </span>
                    </h1>
                </div>

                <div className="overflow-hidden mb-8 max-w-2xl">
                    <p
                        className="text-[clamp(1rem,1.5vw,1.2rem)] text-text-secondary font-medium leading-relaxed"
                        style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', transform: 'translateY(50px)' }}
                        ref={subtitleRef}
                    >
                        The largest collection of nft artifacts among all marketplaces. Discover, collect, and sell extraordinary NFTs.
                    </p>
                </div>

                <div className="flex gap-6 justify-center mt-2 opacity-0 transform translate-y-5" ref={ctaRef}>
                    <Link to="/explore" className="group relative py-3 px-8 text-sm font-bold uppercase tracking-widest rounded-full overflow-hidden bg-neon-green text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,163,0.5)] hover:scale-105">
                        <span className="relative z-10">Explore Now</span>
                    </Link>
                    {/* <Link to="/create" className="group relative py-3 px-8 text-sm font-bold uppercase tracking-widest rounded-full overflow-hidden border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-black hover:scale-105">
                        <span className="relative z-10">Create NFT</span>
                    </Link> */}
                </div>

                {/* 3D Slider Component */}
                <HeroSlider />
            </div>

            {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0" ref={scrollRef}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
                <ChevronDown className="text-neon-green animate-bounce" size={20} />
            </div> */}
        </section>
    );
};

// import { ChevronDown } from 'lucide-react';

export default HeroSection;
