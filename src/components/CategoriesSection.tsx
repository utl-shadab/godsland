import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Draggable);

const categories = [
    { name: 'Luxury', count: '234 NFTs', description: 'Exclusive, high-value assets', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600', color: 'bg-neon-green' },
    { name: 'Business', count: '567 NFTs', description: 'Utility-focused NFTs', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600', color: 'bg-neon-green' },
    { name: 'Wellness', count: '892 NFTs', description: 'Lifestyle & wellness access', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600', color: 'bg-neon-green' },
    { name: 'Entertainment', count: '445 NFTs', description: 'Experiences & events', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600', color: 'bg-neon-green' },
    { name: 'Art', count: '678 NFTs', description: 'Cultural collectibles', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=600', color: 'bg-neon-green' },
];

const CategoriesSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const proxyRef = useRef<HTMLDivElement>(document.createElement("div"));
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Initial Animation & Logic
    useEffect(() => {
        const slider = sliderRef.current;
        const proxy = proxyRef.current;
        if (!slider || !proxy) return;

        // Duplicate items for infinite loop if not already done
        if (slider.children.length === categories.length) {
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

        // Cleanup
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
            // Hide default cursor
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
                className="fixed top-0 left-0 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full pointer-events-none z-[9999] flex items-center justify-center border border-white/20 text-white font-bold tracking-widest text-xs opacity-0 transform -translate-x-1/2 -translate-y-1/2"
            >
                DRAG
            </div>

            <div className="w-full px-8 mb-12 flex justify-between items-end  mx-auto">
                <h2 className="text-4xl text-white font-bold uppercase tracking-wider">Browse Categories</h2>
                <Link to="/explore" className="text-neon-green uppercase tracking-widest text-sm hover:underline">View All</Link>
            </div>

            <div className="w-full overflow-hidden cursor-none">
                <div className="flex gap-6 w-max" ref={sliderRef}>
                    {categories.map((cat, index) => (
                        <div key={index} className={`relative w-[300px] h-[400px] ${cat.color} rounded-[30px] flex-shrink-0 flex flex-col items-center justify-end  transition-transform duration-300 hover:scale-[0.98]`}>
                            {/* Character Image */}
                            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
                                <img src={cat.image} alt={`${cat.name} category`} className="w-[90%] h-[70%] object-cover object-center rounded-t-2xl shadow-xl transform  hover:rotate-0 transition-all duration-500" loading="lazy" decoding="async" />
                            </div>

                            {/* Bottom Metadata Bar */}
                            <div className="w-full bg-black/90 rounded-b-[24px] p-4 flex justify-between items-center z-10 relative">
                                <div>
                                    <h3 className="text-white font-bold uppercase tracking-wide text-lg">{cat.name}</h3>
                                    <p className="text-gray-400 text-xs mt-1">{cat.description}</p>
                                    <p className="text-neon-green text-xs font-bold mt-1">{cat.count}</p>
                                </div>
                                <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold pb-1 text-xl hover:bg-neon-green transition-colors">
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
