import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LaunchpadCard from './LaunchpadCard';

gsap.registerPlugin(ScrollTrigger);

const futureDrops = [
    {
        id: 1,
        title: "Cyber Samurai",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
        price: "0.08",
        items: "5.5K",
        mintedPercent: 45,
        endsIn: "02d 12h 30m",
        slug: "cyber-samurai",
        isFeatured: true
    },
    {
        id: 2,
        title: "Mecha Geisha",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=800",
        price: "0.05",
        items: "3.3K",
        mintedPercent: 12,
        endsIn: "05d 18h 00m",
        slug: "mecha-geisha",
        isFeatured: false
    },
    {
        id: 3,
        title: "Neon Genesis",
        image: "https://images.unsplash.com/photo-1633100589886-f6d892d77d73?auto=format&fit=crop&q=80&w=800",
        price: "0.1",
        items: "1K",
        mintedPercent: 88,
        endsIn: "01d 04h 20m",
        slug: "neon-genesis",
        isFeatured: true
    },
    {
        id: 4,
        title: "Void Walkers",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        price: "0.06",
        items: "8.8K",
        mintedPercent: 25,
        endsIn: "03d 08h 15m",
        slug: "void-walkers",
        isFeatured: false
    }
];

const FutureDropSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const cards = gsap.utils.toArray('.drop-card');

        gsap.fromTo(cards,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                            <span className="text-neon-green font-bold text-sm tracking-widest uppercase">Upcoming Drops</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">
                            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Releases</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => navigate('/drop')}
                        className="group flex items-center gap-2 text-white hover:text-neon-green transition-colors pb-2 border-b border-white/20 hover:border-neon-green"
                    >
                        <span className="font-bold tracking-wide text-sm">View Calendar</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
                >
                    {futureDrops.map((drop) => (
                        // Using reusable LaunchpadCard component
                        <div key={drop.id} className="drop-card min-w-[300px] md:min-w-[340px] snap-center">
                            <LaunchpadCard {...drop} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FutureDropSection;
