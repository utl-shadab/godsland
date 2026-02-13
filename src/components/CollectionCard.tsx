import { useNavigate } from 'react-router-dom';

const CollectionCard = ({ collection }: { collection: any }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the collection route, which serves as the "modal trigger"
        // Route: /market/:category/:collectionId
        navigate(`/market/${collection.categoryId}/${collection.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="group relative rounded-2xl overflow-hidden bg-[#111] border border-white/10 cursor-pointer hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(0,255,163,0.15)] transition-all duration-300 hover:-translate-y-1"
        >
            {/* Banner */}
            <div className="h-32 overflow-hidden relative">
                <img
                    src={`https://picsum.photos/seed/${collection.id}-banner/600/300`}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Avatar - Centered overlapping */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-20 rounded-xl border-4 border-[#111] overflow-hidden shadow-lg">
                <img
                    src={`https://picsum.photos/seed/${collection.id}/200/200`}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Info */}
            <div className="pt-12 pb-6 px-4 text-center">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-neon-green transition-colors">{collection.name}</h3>
                <div className="flex justify-center gap-4 text-xs text-gray-400 mt-3">
                    <div className="flex flex-col">
                        <span className="uppercase tracking-wider text-[10px]">Floor</span>
                        <span className="text-white font-bold">{collection.floorPrice}</span>
                    </div>
                    <div className="w-[1px] bg-white/10"></div>
                    <div className="flex flex-col">
                        <span className="uppercase tracking-wider text-[10px]">Volume</span>
                        <span className="text-white font-bold">125 ETH</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionCard;
