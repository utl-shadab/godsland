import { CheckCircle2 } from 'lucide-react';

export interface NFTCardProps {
    id?: string;
    title: string; // Token Name/ID
    creator: string; // Collection Name
    price: string;
    image: string;
    lastSale?: string;
    verified?: boolean;
}

const NFTCard = ({ title, creator, price, image, lastSale, verified = true }: NFTCardProps) => {
    return (
        <div className="group relative rounded-xl overflow-hidden bg-[#111] transition-all duration-300 cursor-pointer border border-white/5 hover:border-neon-green/30 hover:shadow-[0_0_20px_rgba(0,255,163,0.1)] flex flex-col h-full">
            {/* Image Container with reserved aspect ratio */}
            <div className="w-full aspect-square overflow-hidden relative bg-white/5">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                />

                {/* Quick Action Overlay (Subtle) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            alert("Quick Buy triggered for " + title);
                        }}
                        className="px-4 py-2 bg-neon-green text-black font-bold text-xs uppercase tracking-wider rounded-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        Quick Buy
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-3 flex flex-col flex-1 gap-1">
                {/* Collection Name & Verified Tick */}
                <div className="flex items-center gap-1">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider truncate font-medium">{creator}</span>
                    {verified && <CheckCircle2 size={10} className="text-blue-400 fill-blue-400/20" />}
                </div>

                {/* Token Name/ID */}
                <h3 className="text-sm font-bold text-white truncate mb-1">{title}</h3>

                {/* Price Information */}
                <div className="mt-auto pt-2 border-t border-white/5">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Price</span>
                            <span className="text-sm font-black text-neon-green font-mono">{price}</span>
                        </div>
                        {lastSale && (
                            <div className="flex flex-col text-right">
                                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Last Sale</span>
                                <span className="text-[10px] text-gray-400 font-mono">{lastSale}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 pointer-events-none border border-neon-green/0 group-hover:border-neon-green/20 transition-colors duration-300 rounded-xl" />
        </div>
    );
};

export default NFTCard;
