
import { useState, useEffect, useMemo } from 'react';
import { filterItems, sortItems, getItemsByCollection } from '../../utils/mockItems';
import type { IItem } from '../../utils/mockItems';
import { Heart, Grid, List, Eye } from 'lucide-react';

interface ItemsGridProps {
    items?: IItem[]; // New prop
    filters: any;
    onItemClick: (itemId: string) => void;
}

// ... ItemCard ...
const ItemCard = ({ item, onClick }: { item: IItem; onClick: () => void }) => {
    const [isFavorited, setIsFavorited] = useState(item.isFavorited);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorited(!isFavorited);
    };

    return (
        <div
            onClick={onClick}
            className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(0,255,163,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
            {/* Image */}
            <div className="aspect-square bg-slate-800 relative overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end p-3 pointer-events-none group-hover:pointer-events-auto">
                    <button
                        onClick={toggleFavorite}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors ${isFavorited ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                        <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
                    </button>
                </div>

                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 pointer-events-none group-hover:pointer-events-auto">
                    <button className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white hover:bg-white/20 flex items-center gap-1">
                        <Eye size={12} /> View
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white group-hover:text-neon-green transition-colors">{item.name}</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-gray-400 border border-slate-700">
                        Rank #{item.rarity.rank}
                    </span>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Price</p>
                        {item.price ? (
                            <p className="text-neon-green font-bold text-lg">{item.price} ETH</p>
                        ) : (
                            <p className="text-gray-400 text-sm italic">Not for sale</p>
                        )}
                    </div>
                    {item.lastSalePrice && (
                        <div className="text-right">
                            <p className="text-[10px] text-gray-600 mb-0.5">Last Sale</p>
                            <p className="text-xs text-gray-400">{item.lastSalePrice} ETH</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ItemsGrid = ({ items: propItems, filters, onItemClick }: ItemsGridProps) => {
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    const items = useMemo(() => {
        if (propItems) return propItems;
        return getItemsByCollection('col_123');
    }, [propItems]);

    const filteredItems = useMemo(() => {
        let result = filterItems(items, filters);
        result = sortItems(result, sort);
        return result;
    }, [items, filters, sort]);

    // Reset page on filter/sort change
    useEffect(() => {
        setPage(1);
    }, [items, filters, sort]);

    // Pagination
    const displayedItems = filteredItems.slice(0, page * itemsPerPage);
    const hasMore = displayedItems.length < filteredItems.length;

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <p className="text-gray-400 text-sm font-medium">
                    Showing <span className="text-white font-bold">{displayedItems.length}</span> of <span className="text-white font-bold">{filteredItems.length}</span> items
                </p>

                <div className="flex items-center gap-3">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-white text-sm rounded px-3 py-2 outline-none focus:border-neon-green"
                    >
                        <option value="newest">Newest Listed</option>
                        <option value="lowest_price">Price: Low to High</option>
                        <option value="highest_price">Price: High to Low</option>
                        <option value="rarity_rank">Rarity: High to Low</option>
                    </select>

                    <div className="flex bg-slate-900 rounded border border-slate-800 p-1">
                        <button className="p-1.5 rounded bg-slate-800 text-white shadow"><Grid size={16} /></button>
                        <button className="p-1.5 rounded text-gray-500 hover:text-white"><List size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {displayedItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {displayedItems.map(item => (
                        <ItemCard key={item.id} item={item} onClick={() => onItemClick(item.id)} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-slate-800 rounded-xl">
                    <p className="text-gray-400 text-lg">No items match your filters</p>
                    <button onClick={() => window.location.reload()} className="mt-4 text-neon-green hover:underline">Reset Filters</button>
                </div>
            )}

            {/* Load More */}
            {hasMore && (
                <div className="mt-12 text-center">
                    <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-slate-900 border border-slate-800 text-white font-bold rounded-full hover:bg-slate-800 hover:border-slate-700 transition-all hover:scale-105"
                    >
                        Load More Items
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemsGrid;
