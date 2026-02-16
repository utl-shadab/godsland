import { useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Gavel, User } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export interface Auction {
    id: string;
    title: string;
    image: string;
    currentBid: string;
    bids: number;
    endsAt: Date;
    category: string;
    status: 'live' | 'ended';
    winner?: string;
}

interface AuctionCardProps {
    auction: Auction;
    onPlaceBid?: (auction: Auction) => void;
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseEnter = () => {
        if (auction.status === 'live' && buttonRef.current) {
            gsap.to(buttonRef.current, {
                height: "auto",
                opacity: 1,
                marginTop: "1rem",
                duration: 0.4,
                ease: "power3.out"
            });
        }
    };

    const handleMouseLeave = () => {
        if (auction.status === 'live' && buttonRef.current) {
            gsap.to(buttonRef.current, {
                height: 0,
                opacity: 0,
                marginTop: 0,
                duration: 0.3,
                ease: "power3.in"
            });
        }
    };

    return (
        <div
            className="group relative w-full bg-[#0b0b0b] rounded-2xl overflow-hidden border border-white/5 hover:border-neon-green/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,255,163,0.1)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden p-3">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <img
                        src={auction.image}
                        alt={auction.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[9px] uppercase font-bold text-gray-300 tracking-wider">
                        {auction.category}
                    </div>

                    {/* Timer / Status Badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 whitespace-nowrap">
                        {auction.status === 'live' ? (
                            <>
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                                <CountdownTimer targetDate={auction.endsAt} />
                            </>
                        ) : (
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Auction Ended</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-4 pt-2">
                <h3 className="text-white font-bold text-sm mb-1 truncate">{auction.title}</h3>

                <div className="flex justify-between items-end mb-2">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Current Bid</p>
                        <p className="text-neon-green font-bold tabular-nums text-sm">{auction.currentBid}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Total Bids</p>
                        <p className="text-white font-bold tabular-nums text-sm">{auction.bids}</p>
                    </div>
                </div>

                {/* Animated Action Button - Only if Live */}
                {auction.status === 'live' && (
                    <Link to={`/auction/${auction.title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full">
                        <button
                            ref={buttonRef}
                            className="w-full flex justify-center py-2 bg-neon-green cursor-pointer text-black font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white transition-colors duration-300 items-center gap-2 h-0 opacity-0 overflow-hidden"
                        >
                            <Gavel size={14} /> Place Bid
                        </button>
                    </Link>
                )}

                {/* Footer for Ended Auctions */}
                {auction.status === 'ended' && auction.winner && (
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-gray-500 uppercase">Winner</span>
                        <div className="flex items-center gap-1.5">
                            <User size={10} className="text-gold-primary" />
                            <span className="text-xs font-mono text-gold-primary">{auction.winner}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuctionCard;
