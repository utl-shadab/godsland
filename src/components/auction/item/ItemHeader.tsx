import { Share2, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ItemHeaderProps {
    title: string;
    collection: string;
    owner: string;
}

const ItemHeader = ({ title, collection, owner }: ItemHeaderProps) => {
    return (
        <div className="flex flex-col gap-3 md:gap-4">
            {/* Breadcrumbs / Actions */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1 min-w-0">
                    <Link to="/collections" className="text-neon-green text-xs md:text-sm hover:underline font-medium flex items-center gap-1 truncate">
                        {collection} <CheckCircle2 size={12} className="text-blue-400 flex-shrink-0" />
                    </Link>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight capitalize truncate">{title}</h1>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                    <button className="p-1.5 md:p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300 text-white">
                        <Share2 size={16} />
                    </button>
                    <button className="p-1.5 md:p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300 text-white">
                        <MoreHorizontal size={16} />
                    </button>
                </div>
            </div>

            <div className="text-xs md:text-sm text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>Owned by <span className="text-neon-green cursor-pointer hover:underline">{owner}</span></span>
                <span className="hidden sm:inline">•</span>
                <span>Views: <span className="text-white">1.2K</span></span>
                <span className="hidden sm:inline">•</span>
                <span>Favorites: <span className="text-white">245</span></span>
            </div>
        </div>
    );
};

export default ItemHeader;

