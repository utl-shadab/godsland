import { Share2, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ItemHeaderProps {
    title: string;
    collection: string;
    owner: string;
}

const ItemHeader = ({ title, collection, owner }: ItemHeaderProps) => {
    return (
        <div className="flex flex-col gap-4 mb-6">
            {/* Breadcrumbs / Actions */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <Link to="/collections" className="text-neon-green text-sm hover:underline font-medium flex items-center gap-1">
                        {collection} <CheckCircle2 size={12} className="text-blue-400" />
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
                </div>

                <div className="flex gap-2">
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white">
                        <Share2 size={18} />
                    </button>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            <div className="text-sm text-gray-500 flex gap-4">
                <span>Owned by <span className="text-neon-green cursor-pointer hover:underline">{owner}</span></span>
                <span>•</span>
                <span>Views: <span className="text-white">1.2K</span></span>
                <span>•</span>
                <span>Favorites: <span className="text-white">245</span></span>
            </div>
        </div>
    );
};

export default ItemHeader;
