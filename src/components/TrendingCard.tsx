import { Heart, ShoppingCart, Sparkles, User } from 'lucide-react';

interface TrendingCardProps {
    title: string;
    image: string;
    price: string;
}

const TrendingCard = ({ title, image, price }: TrendingCardProps) => {
    return (
        <div className="group relative w-[220px] bg-[#050505] rounded-3xl overflow-hidden border border-white/5 hover:border-gold-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)]">

            {/* Image Container */}
            <div className="relative h-[220px] p-3">
                <div className=" aspect-square relative w-full h-full rounded-2xl overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-center object-contain  transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-gold-primary/30 text-[8px] uppercase font-bold text-gold-primary tracking-wider">
                        Premium
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-gold-primary/30 text-[8px] uppercase font-bold text-gold-primary tracking-wider">
                        Luxury
                    </div>

                    {/* Bottom Overlays */}
                    <button className="absolute bottom-3 left-3 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-gold-primary hover:text-black transition-colors">
                        <Heart size={10} />
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div className="px-5 pb-5 pt-2">

                {/* Creator */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-900/20 flex items-center justify-center border border-green-500/30">
                        <User size={9} className="text-green-500" />
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">0x7a9d...4f3e</span>
                </div>

                {/* Title */}
                <h3 className="text-xs font-bold text-neon-green mb-4 leading-tight group-hover:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] transition-all">
                    {title}
                </h3>

                {/* Price Info & Action */}
                <div className="flex items-center justify-between mb-2">
                    <div className='flex justify-center gap-10 items-center'>
                        <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">Price</p>
                        <p className="text-sm font-bold text-neon-green text-nowrap tabular-nums">{price}</p>
                    </div>
                    <button className="px-6 py-2 bg-gold-primary text-black font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-white transition-colors flex items-center gap-2">
                        <ShoppingCart size={14} /> Buy
                    </button>
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <Heart size={12} /> 1243
                    </div>
                    <div className="flex items-center gap-1 hover:text-gold-primary transition-colors cursor-pointer ml-auto">
                        <Sparkles size={12} className="text-gold-primary" /> Stars Eligible
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrendingCard;
