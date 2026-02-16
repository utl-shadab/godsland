import { BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CollectionCardProps {
    collection: any; // Ideally strictly typed
}

const CollectionCard = ({ collection }: CollectionCardProps) => {
    const navigate = useNavigate();

    // Mock data for "Top Movers" look if missing, or use collection data
    // Assuming collection has 'change' or we mock it for the demo
    const percentChange = collection.change || "+" + (Math.random() * 100).toFixed(1) + "%";
    const isPositive = !percentChange.startsWith('-');

    const handleClick = () => {
        navigate(`/collection/${collection.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="group relative rounded-xl overflow-hidden aspect-[16/10] bg-[#111] border border-white/5 cursor-pointer isolate"
        >
            {/* Background Image */}
            <img
                src={collection.banner || collection.image || `https://picsum.photos/seed/${collection.id}/600/400`}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay - Stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

            {/* Hover visual feedback (optional border glow) */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-green/50 rounded-xl transition-colors z-20 pointer-events-none"></div>

            {/* Content (Bottom Overlay) */}
            <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end z-20">
                {/* Title & Verified Badge */}
                <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-white font-bold text-lg tracking-wide truncate drop-shadow-md">
                        {collection.name}
                    </h3>
                    <BadgeCheck size={18} className="text-blue-500 fill-blue-500/10" />
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-3 text-sm font-medium">
                    <span className="text-gray-300 text-xs uppercase tracking-wider">
                        Floor: <span className="text-white font-bold text-sm ml-1">{collection.floorPrice || "0.15 ETH"}</span>
                    </span>
                    <span className={`text-xs font-bold ${isPositive ? 'text-neon-green' : 'text-red-500'}`}>
                        {percentChange}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CollectionCard;
