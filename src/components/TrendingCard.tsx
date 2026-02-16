
import { Heart, ShoppingCart, Sparkles, User } from "lucide-react";

interface TrendingCardProps {
    title: string;
    image: string;
    price: string;
}

const TrendingCard = ({ title, image, price }: TrendingCardProps) => {
    return (
        <div className="group relative w-full bg-[#0b0b0b] rounded-3xl overflow-hidden border border-white/5 hover:border-gold-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,215,0,0.12)]">

            {/* Image */}
            <div className="aspect-square relative overflow-hidden p-3">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[9px] uppercase font-bold text-gold-primary tracking-wider">
                        Trending
                    </div>

                    <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold-primary hover:text-black transition">
                        <Heart size={14} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-6">

                {/* Creator */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-900/20 flex items-center justify-center border border-green-500/30">
                        <User size={12} className="text-green-500" />
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                        0x7a9d...4f3e
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white mb-2 truncate">
                    {title}
                </h3>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                            Price
                        </p>
                        <p className="text-sm font-bold text-neon-green tabular-nums">
                            {price}
                        </p>
                    </div>

                    <button className="px-3 py-1 bg-white cursor-pointer text-black font-bold uppercase text-xs tracking-wider rounded-[6px] hover:bg-white transition-all duration-300 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                        <ShoppingCart size={14} /> Buy
                    </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <Heart size={14} /> 1243
                    </div>
                    <div className="flex items-center gap-1 hover:text-gold-primary transition-colors cursor-pointer">
                        <Sparkles size={14} className="text-gold-primary" /> Eligible
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrendingCard;

