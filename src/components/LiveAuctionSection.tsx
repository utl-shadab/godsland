import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/all';
import LiveAuctionCard from './LiveAuctionCard';

gsap.registerPlugin(ScrollTrigger, Draggable);

const auctions = [
    { title: 'Golden Phoenix Rising', image: 'https://images.unsplash.com/photo-1635492491273-455af7728453?auto=format&fit=crop&q=80&w=600', price: '3200 USDT' },
    { title: 'Cyber Samurai #88', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600', price: '1500 USDT' },
    { title: 'Neon Genesis Explorer', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600', price: '4500 USDT' },
    { title: 'Quantum Spirit God', image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600', price: '8000 USDT' },
    { title: 'Ethereal Angel', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600', price: '2100 USDT' },
];

const LiveAuctionSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const proxyRef = useRef<HTMLDivElement>(document.createElement("div"));
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initial Animation & Logic (Copied from CategoriesSection)
    useEffect(() => {
        const slider = sliderRef.current;
        const proxy = proxyRef.current;
        if (!slider || !proxy) return;

        // Duplicate items for infinite loop if not already done
        if (slider.children.length === auctions.length) {
            const originalContent = slider.innerHTML;
            slider.innerHTML += originalContent + originalContent; // Triple content
        }

        const totalWidth = slider.scrollWidth / 3;
        const wrap = gsap.utils.wrap(-totalWidth, 0);

        // Draggable Logic
        const draggable = Draggable.create(proxy, {
            type: "x",
            trigger: slider,
            inertia: true,
            onPress: () => setIsDragging(true),
            onRelease: () => setIsDragging(false),
            onDrag: function () {
                gsap.set(slider, { x: wrap(this.x) });
            },
            onThrowUpdate: function () {
                gsap.set(slider, { x: wrap(this.x) });
            }
        });

        return () => {
            if (draggable[0]) draggable[0].kill();
        };
    }, []);

    // Custom Cursor Logic
    useEffect(() => {
        const cursor = cursorRef.current;
        const section = sectionRef.current;
        if (!cursor || !section) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                rotate: isDragging ? 15 : 0,
                scale: isDragging ? 0.9 : 1
            });
        };

        const hoverSection = () => {
            gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
            section.style.cursor = 'none';
        };

        const leaveSection = () => {
            gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3 });
            section.style.cursor = 'auto';
        };

        window.addEventListener('mousemove', moveCursor);
        section.addEventListener('mouseenter', hoverSection);
        section.addEventListener('mouseleave', leaveSection);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            section.removeEventListener('mouseenter', hoverSection);
            section.removeEventListener('mouseleave', leaveSection);
        };
    }, [isDragging]);

    return (
        <section className="py-24 bg-black relative z-10 overflow-hidden select-none" ref={sectionRef}>
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-24 h-24 bg-neon-green/10 backdrop-blur-md rounded-full pointer-events-none z-[9999] flex items-center justify-center border border-neon-green/40 text-neon-green font-bold tracking-widest text-xs opacity-0 transform -translate-x-1/2 -translate-y-1/2"
            >
                DRAG
            </div>

            <div className="w-full px-8 mb-12 flex justify-between items-end mx-auto">
                <h2 className="text-4xl text-white font-bold uppercase tracking-wider">
                    Live <span className="text-neon-green">Auctions</span>
                </h2>
                <Link to="/auction" className="text-neon-green uppercase tracking-widest text-sm hover:underline">View All</Link>
            </div>

            <div className="w-full overflow-hidden cursor-none">
                <div className="flex gap-8 w-max pl-8" ref={sliderRef}>
                    {auctions.map((item, index) => (
                        <div key={index} className="transform transition-transform duration-300 hover:scale-[0.98]">
                            <LiveAuctionCard {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveAuctionSection;
