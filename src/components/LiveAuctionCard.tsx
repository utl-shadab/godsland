import { Link } from 'react-router-dom';
import { Heart, Clock, Gavel, Sparkles, User } from 'lucide-react';

interface LiveAuctionCardProps {
    title: string;
    image: string;
    price: string;
    timeLeft?: string;
}

const LiveAuctionCard = ({ title, image, price }: LiveAuctionCardProps) => {
    return (
        <div className="group relative w-full bg-[#0b0b0b] rounded-3xl overflow-hidden border border-white/5 hover:border-gold-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,215,0,0.12)]">

            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden p-3">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[10px] uppercase font-bold text-neon-green tracking-wider">
                        Featured
                    </div>

                    {/* Timer Badge */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-neon-green/30 flex items-center gap-2">
                        <Clock size={12} className="text-neon-green animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">05h 23m 12s</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-5 pb-5 pt-2">

                {/* Creator */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green/50">
                        <User size={12} className="text-neon-green" />
                    </div>
                    <span className="text-xs text-gray-500 font-mono">0x9a1e...5d3f</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white mb-2 truncate">
                    {title}
                </h3>

                {/* Bid Info & Action */}
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Bid</p>
                    <p className="text-sm font-bold text-white tabular-nums">{price}</p>

                </div>
                <Link to={`/auction/${title.toLowerCase().replace(/\s+/g, '-')}`} className="w-full">
                    <button className="w-full flex justify-center py-2 bg-neon-green cursor-pointer text-black font-bold uppercase text-xs tracking-wider rounded-[6px] hover:bg-white transition-all duration-300 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <Gavel size={14} /> Bid
                    </button>
                </Link>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-[10px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <Heart size={12} /> 2103
                    </div>
                    <div className="flex items-center gap-1 hover:text-gold-primary transition-colors cursor-pointer ml-auto">
                        <Sparkles size={12} className="text-gold-primary" /> Stars Eligible
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LiveAuctionCard;
