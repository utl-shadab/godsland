import { BadgeCheck, ArrowUpRight } from 'lucide-react';

interface FeaturedCollectionCardProps {
    collection: any;
    onClick?: () => void;
}

const FeaturedCollectionCard = ({ collection, onClick }: FeaturedCollectionCardProps) => {
    return (
        <div
            onClick={onClick}
            className="group relative h-[400px] w-full overflow-hidden rounded-2xl cursor-pointer"
        >
            {/* Image Background */}
            <div className="absolute inset-0">
                <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
            </div>

            {/* Content Content - Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-2 mb-2 transform transition-all duration-300 translate-y-0 group-hover:-translate-y-1">
                            <h3 className="text-2xl font-bold text-white font-primary uppercase tracking-wide">
                                {collection.name}
                            </h3>
                            {collection.verified && (
                                <BadgeCheck size={20} className="text-neon-green fill-neon-green/10" />
                            )}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 delay-75">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Floor</span>
                                <span className="font-mono font-bold text-white">{collection.floorPrice} ETH</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wider">Volume</span>
                                <span className="font-mono font-bold text-white">{collection.volume || "12.5K"} ETH</span>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 delay-100">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-neon-green group-hover:border-neon-green transition-colors">
                            <ArrowUpRight size={20} className="text-white group-hover:text-black" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover Border Glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-green/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
        </div>
    );
};

export default FeaturedCollectionCard;
