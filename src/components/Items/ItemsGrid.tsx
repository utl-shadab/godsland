
import { useState, useEffect } from 'react';
import { filterItems, sortItems, getItemsByCollection } from '../../utils/mockItems';
import type { IItem } from '../../utils/mockItems';
import { Grid, List } from 'lucide-react';
import NFTCard from '../NFTCard';

interface ItemsGridProps {
    items?: IItem[]; // New prop
    filters: any;
    onItemClick: (itemId: string) => void;
    onBuyItem?: (itemId: string) => void;
}

// ... ItemCard ...
const ItemCard = ({ item, onClick, onBuy }: { item: IItem; onClick: () => void; onBuy: () => void }) => {
    return (
        <div onClick={onClick} className="h-full">
            <NFTCard
                title={item.name}
                // creator={item.owner || "Creator"} 
                price={`${item.price} ETH`}
                image={item.image}
                onBuy={onBuy}
                // lastSale="< 0.01 ETH" // Using default for now
                rank={`#${item.id}`} // Using ID as rank/volume placeholder
            />
        </div>
    );
};

const ItemsGrid = ({ items: propItems, filters, onItemClick, onBuyItem }: ItemsGridProps) => {
    const [items, setItems] = useState<IItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<IItem[]>([]);
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        if (propItems) {
            setItems(propItems);
        } else {
            // Fallback to mock fetch if no items provided
            const allItems = getItemsByCollection('col_123');
            setItems(allItems);
        }
    }, [propItems]);

    useEffect(() => {
        let result = filterItems(items, filters);
        result = sortItems(result, sort);
        setFilteredItems(result);
        setPage(1); // Reset page on filter change
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
                        <ItemCard
                            key={item.id}
                            item={item}
                            onClick={() => onItemClick(item.id)}
                            onBuy={() => onBuyItem && onBuyItem(item.id)}
                        />
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
