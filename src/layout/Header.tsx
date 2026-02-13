import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Wallet, Star, User, Settings, LogOut, Grid } from 'lucide-react';
import gsap from 'gsap';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import { useLoading } from '../context/LoadingContext';


const Header = () => {
    const { isLoading } = useLoading();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const headerRef = useRef(null);
    const lastScrollY = useRef(0);


    const toggleMegaMenu = () => {
        setIsMegaMenuOpen(!isMegaMenuOpen);
    };

    // Handle Loading State
    useEffect(() => {
        if (!isLoading && headerRef.current) {
            // Animate header in on load
            gsap.fromTo(
                headerRef.current,
                { y: -80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, [isLoading]);

    // Handle GSAP Animation based on visibility
    useEffect(() => {
        if (!headerRef.current) return;

        if (isVisible) {
            gsap.to(headerRef.current, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(headerRef.current, {
                y: -100, // Slightly more than 80 to be safe
                duration: 0.3,
                ease: 'power2.in'
            });
        }
    }, [isVisible]);

    useEffect(() => {
        if (isLoading) return;

        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY.current;

            // Prevent negative scroll values
            if (currentScrollY < 0) return;

            // Update scrolled state for styling
            if (currentScrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            // Determine visibility
            if (currentScrollY > 50 && delta > 0) {
                // Scrolling down - Hide
                setIsVisible(false);
                setIsMegaMenuOpen(false);
            } else if (delta < 0 || currentScrollY <= 50) {
                // Scrolling up OR near top - Show
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    return (
        <>
            <header
                ref={headerRef}
                className={` w-full h-20 z-50 px-8 flex justify-between items-center transition-colors duration-300 ${isScrolled
                    ? 'bg-black/90 backdrop-blur-md border-b border-neon-green/30'
                    : 'bg-transparent border-transparent'
                    }`}
            >
                {/* <header
                ref={headerRef}
                className={`fixed top-0 left-0 w-full h-20 z-50 px-8 flex justify-between items-center transition-colors duration-300 ${isScrolled
                    ? 'bg-black/90 backdrop-blur-md border-b border-neon-green/30 shadow-[0_0_20px_rgba(0,255,163,0.15)]'
                    : 'bg-transparent border-transparent'
                    }`}
            > */}
                <div className="text-2xl font-bold uppercase tracking-widest text-white flex items-center gap-2 group z-[102]">
                    <Link to="/" className="flex items-center gap-1" aria-label="Godsland Home">
                        Gods<span className={`transition-all duration-300 ${isScrolled ? 'text-neon-green' : 'text-white group-hover:text-neon-green'}`}>land</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-10 items-center" aria-label="Main Navigation">
                    <Link to="/market" className={`text-sm font-bold uppercase tracking-widest relative cursor-pointer transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${isScrolled ? 'text-neon-green hover:text-white' : 'text-white hover:text-neon-green'}`}>
                        Marketplace
                    </Link>
                    <Link to="/auction" className={`text-sm font-bold uppercase tracking-widest relative cursor-pointer transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${isScrolled ? 'text-neon-green hover:text-white' : 'text-white hover:text-neon-green'}`}>
                        Auctions
                    </Link>
                    <Link to="/club" className={`text-sm font-bold uppercase tracking-widest relative cursor-pointer transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${isScrolled ? 'text-neon-green hover:text-white' : 'text-white hover:text-neon-green'}`}>
                        NFT Club
                    </Link>
                    <Link to="/collections" className={`text-sm font-bold uppercase tracking-widest relative cursor-pointer transition-colors duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${isScrolled ? 'text-neon-green hover:text-white' : 'text-white hover:text-neon-green'}`}>
                        Collections
                    </Link>
                    <button
                        className={`text-sm font-bold uppercase tracking-widest relative cursor-pointer transition-colors duration-300 flex items-center gap-1 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ${isScrolled || isMegaMenuOpen ? 'text-neon-green hover:text-white' : 'text-white hover:text-neon-green'}`}
                        onClick={toggleMegaMenu}
                        aria-expanded={isMegaMenuOpen}
                        aria-haspopup="true"
                    >
                        Categories <ChevronDown size={14} className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                </nav>

                <div className="flex items-center gap-6">
                    {/* Star Balance (Visible when logged in) */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#111] border border-gold-start/20 rounded-full text-gold-start font-bold text-sm shadow-[0_0_15px_rgba(255,215,0,0.1)]" aria-label="Points balance">
                        <Star size={16} className="fill-gold-start" />
                        <span>1,250</span>
                    </div>

                    {/* Connect Wallet Button */}
                    <button
                        className="hidden md:flex items-center gap-2 py-2 px-6 bg-white/5 border border-neon-green/50 rounded-full text-neon-green font-bold text-xs uppercase tracking-widest hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] transition-all duration-300"
                        aria-label="Connect Wallet"
                    >
                        <Wallet size={16} />
                        <span>Connect</span>
                    </button>

                    {/* User Dropdown */}
                    <div className="relative group z-50">
                        <div className="flex items-center gap-2 cursor-pointer border border-white/10 bg-white/5 rounded-full pl-2 pr-4 py-1 hover:border-neon-green/50 transition-colors">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-neon-green/30">
                                <img src="https://i.pravatar.cc/150?u=user-123" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-white text-sm font-bold hidden xl:block">CryptoKing</span>
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-neon-green transition-colors" />
                        </div>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full right-0 mt-4 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-neon-green/10 to-transparent">
                                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Balance</p>
                                <h4 className="text-xl font-bold text-white font-mono">14.50 ETH</h4>
                            </div>
                            <div className="py-2">
                                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    <User size={16} className="text-neon-green" /> My Profile
                                </Link>
                                <Link to="/collections" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    <Grid size={16} className="text-blue-400" /> My NFTs
                                </Link>
                                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                                    <Settings size={16} className="text-gray-400" /> Settings
                                </Link>
                            </div>
                            <div className="p-2 border-t border-white/5">
                                <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors">
                                    <LogOut size={14} /> DISCONNECT
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div
                        className={`flex md:hidden flex-col gap-[6px] cursor-pointer z-[102] group ${isMobileMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className={`w-[30px] h-[3px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px] bg-white' : (isScrolled ? 'bg-neon-green group-hover:bg-white' : 'bg-white group-hover:bg-neon-green')}`}></span>
                        <span className={`w-[30px] h-[3px] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : (isScrolled ? 'bg-neon-green group-hover:bg-white' : 'bg-white group-hover:bg-neon-green')}`}></span>
                        <span className={`w-[20px] h-[3px] rounded-full transition-all duration-300 self-end ${isMobileMenuOpen ? '-rotate-45 -translate-y-[9px] w-[30px] bg-white' : (isScrolled ? 'bg-neon-green group-hover:bg-white' : 'bg-white group-hover:bg-neon-green')}`}></span>
                    </div>
                </div>
            </header>

            <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};

export default Header;