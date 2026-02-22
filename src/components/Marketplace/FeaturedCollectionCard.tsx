import { BadgeCheck, ArrowUpRight } from 'lucide-react';

interface FeaturedCollectionCardProps {
    collection: any;
    onClick?: () => void;
}

const FeaturedCollectionCard = ({ collection, onClick }: FeaturedCollectionCardProps) => {
    return (
        <div
            onClick={onClick}
            className="group relative rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 transition-all duration-300 hover:border-neon-green/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer isolate"
        >
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden bg-gray-900">
                <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-2">
                {/* Title + Verified Badge */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                        <h3 className="text-white font-bold text-sm tracking-wide truncate">
                            {collection.name}
                        </h3>
                        {collection.verified && (
                            <BadgeCheck size={14} className="text-neon-green fill-neon-green/10 flex-shrink-0" />
                        )}
                    </div>
                </div>

                {/* Stat Section (Floor & Volume) */}
                <div className="mt-1 flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Floor Price</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-white font-bold text-base">{collection.floorPrice}</span>
                            <span className="text-[10px] text-gray-400 font-mono">ETH</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Volume</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-gray-300 font-bold text-sm">{collection.volume || "12.5K"}</span>
                            <span className="text-[10px] text-gray-500 font-mono text-right">ETH</span>
                        </div>
                    </div>
                </div>

                {/* Interaction Button (Hidden by default, visible on hover) */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 via-black/60 to-transparent hidden lg:flex items-end justify-center">
                    <button
                        className="w-full py-2 bg-neon-green text-black font-bold text-sm uppercase tracking-wider rounded shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        View Collection
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCollectionCard;
