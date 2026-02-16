
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';


interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    { name: 'Luxury', image: 'https://images.unsplash.com/photo-1549488344-c7052fb516f2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Business', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { name: 'Wellness', image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=800' },
    { name: 'Entertainment', image: 'https://images.unsplash.com/photo-1470229722913-7ea05122f2a3?auto=format&fit=crop&q=80&w=800' },
    { name: 'Art', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800' },
];

const MegaMenu = ({ isOpen, onClose }: MegaMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const menu = menuRef.current;
        const content = contentRef.current;

        if (isOpen) {
            gsap.to(menu, {
                height: '600px', // Fixed height for dropdown
                opacity: 1,
                duration: 0.5,
                ease: 'power4.out',
            });
            gsap.to(content, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: 0.1,
                ease: 'power2.out',
            });
        } else {
            gsap.to(content, {
                opacity: 0,
                y: -20,
                duration: 0.2,
                ease: 'power2.in',
            });
            gsap.to(menu, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                delay: 0.1,
                ease: 'power4.in',
            });
        }
    }, [isOpen]);

    return (
        <div
            className="fixed top-20 left-0 w-full bg-black/95 backdrop-blur-3xl z-40 overflow-hidden border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            ref={menuRef}
            style={{ height: 0, opacity: 0 }}
        >
            <div className="max-w-[1400px] mx-auto p-12 h-full flex items-center justify-center pointer-events-auto" ref={contentRef} style={{ opacity: 0, transform: 'translateY(-20px)' }}>
                <div className="grid grid-cols-[1fr_1.5fr] gap-24 w-full h-full items-center">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6">Browse Categories</h4>
                        {categories.map((cat) => (
                            <Link to={`/collections?category=${cat.name.toLowerCase()}`} key={cat.name} onClick={onClose} className="group relative flex items-center justify-between py-2 border-b border-white/5 transition-all duration-300 hover:border-neon-green/50">
                                <h3 className="text-4xl font-black uppercase text-transparent stroke-white/30 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 group-hover:text-white group-hover:[-webkit-text-stroke:0px] group-hover:drop-shadow-[0_0_10px_rgba(0,255,163,0.5)]">
                                    {cat.name}
                                </h3>
                                <span className="text-xs text-neon-green opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                    Explore &#8594;
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="w-full h-[400px] bg-[#111] rounded-2xl overflow-hidden relative border border-white/10 group">
                        <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" alt="Category Preview" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-12">
                            <h4 className="text-3xl text-white font-bold mb-2">Explore Categories</h4>
                            <p className="text-text-secondary">Dive into the curated world of Godsland artifacts.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
