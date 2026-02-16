import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TrendingCard from './TrendingCard';

gsap.registerPlugin(ScrollTrigger);

const trendingItems = [
    { title: 'Crown of Eternity', image: '/image-1.jpeg', price: '5000 USDT' },
    { title: 'Cyber Punk #2077', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', price: '2800 USDT' },
    { title: 'Mecha God', image: 'https://images.unsplash.com/photo-1635492491273-455af7728453?auto=format&fit=crop&q=80&w=600', price: '4200 USDT' },
    { title: 'Neo Tokyo Drifter', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600', price: '1900 USDT' },
    { title: 'Void Walker', image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600', price: '6600 USDT' },
];

const TrendingSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Horizontal Scroll Animation
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        gsap.to(scrollContainer, {
            x: () => -(scrollContainer.scrollWidth - window.innerWidth + 100),
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    }, []);

    return (
        <section className="py-24 bg-[#050505] overflow-hidden" ref={sectionRef}>
            <div className="w-full mx-auto px-8 mb-12 flex justify-between items-end">
                <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-tighter">Trending Now</h2>
                <a href="/explore" className="text-neon-green uppercase tracking-widest text-sm hover:underline font-bold">View All</a>
            </div>

            <div className="flex gap-8 px-8 w-fit" ref={scrollRef}>
                {/* Duplicate items for infinite-like scroll length */}
                {[...trendingItems, ...trendingItems, ...trendingItems].map((item, i) => (
                    <div key={i} className="min-w-[320px]">
                        <TrendingCard {...item} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingSection;
