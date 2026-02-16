import { Layers } from 'lucide-react';

interface NFTCardProps {
    title: string;
    creator?: string; // Optional now
    price: string; // e.g. "0.118 RON"
    image: string;
    lastSale?: string; // New prop
    rank?: number | string; // New prop
    onBuy?: () => void;
    onClick?: () => void;
}

const NFTCard = ({ title, price, image, lastSale = "< 0.0001 WETH", rank = "2.2M", onBuy, onClick }: NFTCardProps) => {
    return (
        <div
            className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:border-neon-green/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer isolate"
            onClick={onClick}
        >
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden bg-gray-900">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-2">
                {/* Title + Badge Row */}
                <div className="flex justify-between items-start">
                    <h3 className="text-white font-bold text-sm tracking-wide truncate pr-2">{title}</h3>
                    <div className="flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-gray-300 font-medium">
                        <Layers size={10} />
                        <span>{rank}</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="mt-1">
                    <div className="flex items-baseline gap-1">
                        <span className="text-white font-bold text-lg">{price}</span>
                        {/* <span className="text-xs text-gray-500">RON</span> */}
                    </div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                        Last sale: <span className="text-gray-400">{lastSale}</span>
                    </div>
                </div>

                {/* Buy Button (Hidden by default, visible on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 via-black/60 to-transparent hidden lg:flex items-end justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onBuy && onBuy();
                        }}
                        className="w-full py-2 bg-neon-green text-black font-bold text-sm uppercase tracking-wider rounded shadow-lg hover:bg-white transition-colors"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NFTCard;
