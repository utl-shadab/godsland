import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Twitter, Instagram, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const brandRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const footer = footerRef.current;
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo(brandRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    delay: 0.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top 70%',
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer className="relative bg-black text-white overflow-hidden pt-24 pb-8 px-8 border-t border-white/10" ref={footerRef}>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,#1a2a22_0%,#000_50%)] -z-10 opacity-30"></div>

            <div className="max-w-[1400px] mx-auto z-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20" ref={contentRef}>
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold uppercase tracking-widest text-white block mb-6">
                            Gods<span className="text-neon-green">land</span>
                        </Link>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6">
                            The premier marketplace for rare digital artifacts. Join the revolution and own a piece of the future.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex justify-center items-center text-white transition-all duration-300 hover:border-neon-green hover:text-neon-green hover:shadow-glow-neon"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex justify-center items-center text-white transition-all duration-300 hover:border-discord hover:text-[#5865F2] hover:shadow-[0_0_15px_rgba(88,101,242,0.4)]"><Send size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex justify-center items-center text-white transition-all duration-300 hover:border-pink-500 hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]"><Instagram size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6">Marketplace</h4>
                        <ul className="space-y-4 text-text-secondary text-sm">
                            <li><Link to="/market" className="hover:text-neon-green transition-colors">All NFTs</Link></li>
                            <li><Link to="/art" className="hover:text-neon-green transition-colors">Art</Link></li>
                            <li><Link to="/collectibles" className="hover:text-neon-green transition-colors">Collectibles</Link></li>
                            <li><Link to="/virtual-worlds" className="hover:text-neon-green transition-colors">Virtual Worlds</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6">Account</h4>
                        <ul className="space-y-4 text-text-secondary text-sm">
                            <li><Link to="/profile" className="hover:text-neon-green transition-colors">Profile</Link></li>
                            <li><Link to="/favorites" className="hover:text-neon-green transition-colors">Favorites</Link></li>
                            <li><Link to="/settings" className="hover:text-neon-green transition-colors">Settings</Link></li>
                            <li><Link to="/wallet" className="hover:text-neon-green transition-colors">My Wallet</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-text-secondary text-sm mb-4">Subscribe for the latest drops and updates.</p>
                        <div className="relative">
                            <input type="email" placeholder="Enter your email" className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all" />
                            <button className="absolute right-1 top-1 w-10 h-10 rounded-full bg-neon-green text-black flex items-center justify-center hover:bg-white transition-colors">
                                <Send size={16} className="-ml-1 translate-x-0.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center" ref={brandRef}>
                    <h1 className="text-[12vw] md:text-[14vw] font-black uppercase leading-[0.8] text-transparent stroke-white/5 [-webkit-text-stroke:2px_rgba(255,255,255,0.03)] select-none pointer-events-none">
                        Godsland
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 mt-12 text-xs text-text-secondary uppercase tracking-widest">
                    <p>© 2026 Godsland Inc.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
