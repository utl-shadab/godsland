
interface MinimalItemCardProps {
    item: any;
    onClick?: () => void;
}

const MinimalItemCard = ({ item, onClick }: MinimalItemCardProps) => {
    return (
        <div
            onClick={onClick}
            className="group relative cursor-pointer group-hover:z-10 bg-black"
        >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-[#111] transition-colors duration-300 group-hover:border-neon-green/30">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Heart / Action Overlay */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-neon-green/20">
                        <svg className="w-4 h-4 text-white hover:text-neon-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Clean Content */}
            <div className="mt-3 flex justify-between items-start">
                <div>
                    <h4 className="text-white font-bold text-sm truncate max-w-[140px] group-hover:text-neon-green transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate max-w-[120px]">
                        {item.collectionId ? item.collectionId.replace('col-', '').split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') : 'Collection Name'}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-white font-mono font-bold text-sm">
                        {item.price}
                    </p>
                    <p className="text-[10px] text-gray-500">
                        last: {item.lastSale || "-"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MinimalItemCard;
