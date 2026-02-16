import { BadgeCheck } from 'lucide-react';

interface TrendingCollectionCardProps {
    collection: any;
}

const TrendingCollectionCard = ({ collection }: TrendingCollectionCardProps) => {
    const percentChange = collection.change || "+54.7%";
    const isPositive = !percentChange.startsWith('-');

    return (
        <div className="flex items-center p-4 bg-[#111] hover:bg-[#1a1a1a] border border-white/5 hover:border-neon-green/30 rounded-xl transition-all duration-300 group cursor-pointer w-full h-[88px]">
            {/* Rank (Optional, if we want to add it later like 1, 2, 3...) */}
            {/* {rank && <span className="text-gray-500 font-bold mr-4 w-4">{rank}</span>} */}

            {/* Image */}
            <div className="relative w-14 h-14 flex-shrink-0">
                <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover rounded-lg"
                />
                {/* Verified Badge on Image (Optional, reference puts it on name) */}
            </div>

            {/* Content */}
            <div className="ml-4 flex-1 min-w-0 flex flex-col justify-center">
                {/* Name Row */}
                <div className="flex items-center gap-1 mb-1">
                    <h3 className="text-white font-bold text-sm truncate group-hover:text-neon-green transition-colors">
                        {collection.name}
                    </h3>
                    <BadgeCheck size={14} className="text-blue-500 fill-blue-500/10 flex-shrink-0" />
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 font-mono">
                        <span className="text-white font-bold">{collection.floorPrice || "0.04"} ETH</span>
                    </div>

                    <span className={`font-medium ${isPositive ? 'text-neon-green' : 'text-red-500'}`}>
                        {percentChange}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TrendingCollectionCard;
