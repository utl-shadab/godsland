import { Heart, Clock, Gavel, TrendingUp, Sparkles, User } from 'lucide-react';

interface LiveAuctionCardProps {
    title: string;
    image: string;
    price: string;
    timeLeft?: string;
}

const LiveAuctionCard = ({ title, image, price }: LiveAuctionCardProps) => {
    return (
        <div className="group relative w-[320px] bg-[#050505] rounded-3xl overflow-hidden border border-white/5 hover:border-neon-green/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,163,0.15)]">

            {/* Image Container */}
            <div className="relative h-[400px] p-3">
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
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-gold-primary/30 text-[10px] uppercase font-bold text-gold-primary tracking-wider">
                        Luxury
                    </div>

                    {/* Bottom Overlays */}
                    <button className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-neon-green hover:text-black transition-colors">
                        <Heart size={14} />
                    </button>

                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-green-900/80 backdrop-blur-md rounded-full border border-neon-green/30 flex items-center gap-2">
                        <Clock size={12} className="text-neon-green animate-pulse" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Auction Active</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-5 pb-5 pt-2">

                {/* Creator */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green/50">
                        <User size={12} className="text-neon-green" />
                    </div>
                    <span className="text-xs text-gray-500 font-mono">0x9a1e...5d3f</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-neon-green mb-4 leading-tight group-hover:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] transition-all">
                    {title}
                </h3>

                {/* Bid Info & Action */}
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Current Bid</p>
                        <p className="text-2xl font-bold text-white tabular-nums">{price}</p>
                    </div>
                    <button className="px-6 py-2 bg-neon-green text-black font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white transition-colors flex items-center gap-2">
                        <Gavel size={14} /> Bid
                    </button>
                </div>

                {/* Footer Stats - Based on reference image layout */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <Heart size={12} /> 2103
                    </div>
                    <div className="flex items-center gap-1 hover:text-neon-green transition-colors cursor-pointer">
                        <TrendingUp size={12} /> Trending
                    </div>
                    <div className="flex items-center gap-1 hover:text-neon-green transition-colors cursor-pointer">
                        <Gavel size={12} /> Live Auction
                    </div>
                    <div className="flex items-center gap-1 hover:text-gold-primary transition-colors cursor-pointer">
                        <Sparkles size={12} className="text-gold-primary" /> Stars Eligible
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LiveAuctionCard;
