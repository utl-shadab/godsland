import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const categories = [
    'Luxury', 'Business', 'Wellness', 'Entertainment', 'Art'
];

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    useEffect(() => {
        const menu = menuRef.current;
        const links = linksRef.current?.children;

        if (isOpen) {
            gsap.to(menu, {
                x: 0,
                duration: 0.6,
                ease: 'power4.out',
            });
            if (links) {
                gsap.fromTo(links,
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
                );
            }
        } else {
            gsap.to(menu, {
                x: '100%',
                duration: 0.6,
                ease: 'power4.in',
            });
        }
    }, [isOpen]);

    return (
        <div
            className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-black/95 backdrop-blur-xl z-[100] border-l border-white/10 transform translate-x-full"
            ref={menuRef}
        >
            <div className="p-8 flex justify-end">
                <button onClick={onClose} className="text-white hover:text-neon-green transition-colors">
                    <X size={32} />
                </button>
            </div>

            <div className="flex flex-col gap-6 px-10 mt-10" ref={linksRef}>
                <Link to="/market" className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors" onClick={onClose}>Marketplace</Link>
                <Link to="/auction" className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors" onClick={onClose}>Auctions</Link>
                <Link to="/club" className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors" onClick={onClose}>NFT Club</Link>
                <Link to="/collections" className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors" onClick={onClose}>Collections</Link>

                <div className="flex flex-col">
                    <div
                        className="flex justify-between items-center text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors cursor-pointer"
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    >
                        <span>Categories</span>
                        {isCategoriesOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>

                    <div className={`flex flex-col gap-4 mt-4 pl-4 overflow-hidden transition-all duration-300 ${isCategoriesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        {categories.map((cat) => (
                            <Link
                                key={cat}
                                to={`/category/${cat.toLowerCase()}`}
                                className="text-lg text-text-secondary hover:text-white transition-colors uppercase tracking-wider"
                                onClick={onClose}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>

                <Link to="/pages" className="text-2xl font-bold uppercase tracking-widest text-white hover:text-neon-green transition-colors" onClick={onClose}>Pages</Link>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <button className="w-full py-4 bg-neon-green text-black font-black uppercase tracking-widest hover:bg-white transition-colors" onClick={onClose}>
                        Connect Wallet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
