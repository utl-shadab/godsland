import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLoading } from '../context/LoadingContext';
import HeroSlider from './HeroSlider';
import { TRENDING_COLLECTIONS } from '../data/marketplaceData';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const { isLoading } = useLoading();
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);
    const trendingRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Animation Effect
    useEffect(() => {
        if (isLoading) return;

        const tl = gsap.timeline();

        // Initial Set
        gsap.set([titleRef.current, subtitleRef.current], { y: 50, opacity: 0 });
        gsap.set(searchRef.current, { scale: 0.9, opacity: 0 });
        gsap.set(ctaRef.current, { y: 20, opacity: 0 });
        gsap.set(trendingRef.current, { y: 30, opacity: 0 });
        gsap.set('#hero-slider', { opacity: 0, y: 50 });

        const startDelay = 0.5;

        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            delay: startDelay,
        })
        .to(subtitleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
        }, '-=0.8')
        .to(searchRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
        }, '-=0.6')
        .to(ctaRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
        }, '-=0.4')
        .to('#hero-slider', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
        }, '-=0.6')
        .to(trendingRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
        }, '-=0.8');

    }, [isLoading]);

    // Particle System (Keep existing)
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
                color: Math.random() > 0.5 ? 'rgba(0, 211, 44, 0.4)' : 'rgba(0, 211, 44, 0.2)'
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
        <section className="relative w-full min-h-screen flex flex-col pt-32 pb-24 items-center overflow-hidden z-10 bg-black px-fluid" ref={containerRef}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-neon-green/5 via-transparent to-black -z-10"></div>
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-5 opacity-40 pointer-events-none" />

            <div className="text-center max-w-[1400px] w-full z-20 flex flex-col items-center">
                {/* Headline */}
                <h1
                    className="text-[clamp(2.5rem,10vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-white mb-6"
                    ref={titleRef}
                >
                    Discover, Collect <br />
                    <span className="text-neon-green">& Sell</span> Rare NFTs
                </h1>

                {/* Subtitle */}
                <p
                    className="max-w-2xl text-lg md:text-xl text-gray-400 font-medium mb-10"
                    ref={subtitleRef}
                >
                    The world's first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs).
                </p>

                {/* Search Bar (OpenSea Style) */}
                <div
                    ref={searchRef}
                    className="w-full max-w-2xl relative mb-8 group"
                >
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon-green transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search items, collections, and accounts"
                        className="w-full py-5 pl-16 pr-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-neon-green/50 focus:bg-white/10 transition-all text-lg shadow-2xl"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-500 font-bold">
                        <span>/</span>
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex gap-4 justify-center mb-16" ref={ctaRef}>
                    <Link to="/explore" className="py-4 px-10 bg-neon-green text-black font-black uppercase tracking-widest rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] transition-all">
                        Explore
                    </Link>
                    <Link to="/create" className="py-4 px-10 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                        Create
                    </Link>
                </div>

                {/* Trending Collections (MagicEden Style) */}
                <div ref={trendingRef} className="w-full max-w-5xl">
                    <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                        <TrendingUp size={20} className="text-neon-green" />
                        <h3 className="text-xl font-bold uppercase tracking-tighter">Trending Collections</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {TRENDING_COLLECTIONS.map((col) => (
                            <Link key={col.id} to={`/collections/${col.id}`} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group">
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="text-left min-w-0">
                                    <div className="flex items-center gap-1 mb-1">
                                        <h4 className="text-sm font-bold truncate">{col.name}</h4>
                                        {col.verified && <CheckCircle2 size={12} className="text-blue-400 fill-blue-400/20" />}
                                    </div>
                                    <div className="flex gap-4">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">Floor</p>
                                            <p className="text-xs font-mono text-neon-green font-bold">{col.floorPrice}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold">24h Vol</p>
                                            <p className="text-xs font-mono text-white font-bold">{col.volume24h}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3D Slider */}
                <div className="mt-20 w-full">
                    <HeroSlider />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
