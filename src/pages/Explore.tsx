import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import SearchSortBar from '../components/SearchSortBar';
import MarketplaceGrid from '../components/MarketplaceGrid';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import ItemModal from '../components/Items/ItemModal';
import CollectionCard from '../components/CollectionCard';
import MarketplaceDashboard from '../components/MarketplaceDashboard'; // Import Dashboard
import { MOCK_NFTS, COLLECTIONS } from '../data/marketplaceData';

const Explore = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    // State derived from URL or local state
    const selectedCategory = category || 'all';
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 10]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState('recent');
    const [viewMode, setViewMode] = useState('grid');

    // UI State
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [browseMode, setBrowseMode] = useState<'items' | 'collections'>('items');

    // Determine if we are in "Dashboard" mode
    const isDashboard = !category && !searchQuery;

    const handleCategoryChange = (newCategory: string) => {
        if (newCategory === 'all') {
            navigate('/market');
        } else {
            navigate(`/market/${newCategory}`);
        }
    };

    // Filtering Logic (Memoized)
    const filteredCollections = useMemo(() => {
        return COLLECTIONS.filter(col => {
            if (selectedCategory !== 'all' && col.categoryId !== selectedCategory) return false;
            if (searchQuery && !col.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [selectedCategory, searchQuery]);

    const filteredNFTs = useMemo(() => {
        let result = [...MOCK_NFTS];
        if (selectedCategory !== 'all') {
            result = result.filter(nft => nft.category === selectedCategory);
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(nft =>
                nft.title.toLowerCase().includes(query) ||
                nft.creator.toLowerCase().includes(query)
            );
        }
        result = result.filter(nft => {
            const price = parseFloat(nft.price.replace(' ETH', ''));
            return price >= priceRange[0] && price <= priceRange[1];
        });
        if (selectedTypes.length > 0) {
            result = result.filter(nft => selectedTypes.includes(nft.type));
        }
        result.sort((a, b) => {
            const priceA = parseFloat(a.price.replace(' ETH', ''));
            const priceB = parseFloat(b.price.replace(' ETH', ''));
            switch (sortOption) {
                case 'price_low': return priceA - priceB;
                case 'price_high': return priceB - priceA;
                case 'stars': return b.stars - a.stars;
                case 'recent': default: return 0;
            }
        });
        return result;
    }, [selectedCategory, searchQuery, priceRange, selectedTypes, sortOption]);

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };



    // Handle clicking a Dashboard Item -> Opens Modal or Navigates to Browse
    const handleDashboardItemClick = (item: any) => {
        // If it's a collection-like item, open modal via route
        // We use 'all' as category for generic dashboard items
        navigate(`/market/all/${item.id}`);
    };

    return (
        <div className="pt-24 min-h-screen bg-black text-white pb-20">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8">

                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
                            Explore <span className="text-neon-green">NFTs</span>
                        </h1>
                        <p className="text-gray-400">Discover, collect, and sell extraordinary NFTs</p>
                    </div>
                </div>

                {/* Dashboard Mode */}
                {isDashboard ? (
                    <MarketplaceDashboard
                        onCategorySelect={handleCategoryChange}
                        onCollectionSelect={handleDashboardItemClick}
                    />
                ) : (
                    /* Browse Mode (Sidebar + Grid) */
                    <div className="flex relative items-start">

                        <div className={`${browseMode === 'collections' ? 'hidden lg:block' : 'block'}`}>
                            <FilterSidebar
                                selectedCategory={selectedCategory}
                                setSelectedCategory={handleCategoryChange}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedTypes={selectedTypes}
                                toggleType={toggleType}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 w-full min-w-0 pl-0 lg:pl-8">
                            {/* View Toggle (Items/Collections) */}
                            <div className="mb-6">
                                <SearchSortBar
                                    searchQuery={searchQuery}
                                    setSearchQuery={setSearchQuery}
                                    sortOption={sortOption}
                                    setSortOption={setSortOption}
                                    viewMode={viewMode}
                                    setViewMode={setViewMode}
                                    onOpenFilter={() => setIsMobileFilterOpen(true)}
                                />

                                {/* Sub-header Controls (Items/Collections Switch) */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                                        <button
                                            onClick={() => setBrowseMode('items')}
                                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${browseMode === 'items' ? 'bg-neon-green text-black' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Items
                                        </button>
                                        <button
                                            onClick={() => setBrowseMode('collections')}
                                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${browseMode === 'collections' ? 'bg-neon-green text-black' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            Collections
                                        </button>
                                    </div>

                                    {/* Additional counts or info could go here */}
                                    <div className="text-gray-400 text-sm hidden sm:block">
                                        Showing {browseMode === 'items' ? filteredNFTs.length : filteredCollections.length} results
                                    </div>
                                </div>
                            </div>

                            {browseMode === 'items' ? (
                                <MarketplaceGrid
                                    nfts={filteredNFTs}
                                    viewMode={viewMode}
                                    onItemClick={(id) => setSelectedItemId(id)}
                                />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredCollections.map(col => (
                                        <div key={col.id} onClick={() => navigate(`/market/${col.categoryId}/${col.id}`)} className="cursor-pointer">
                                            <CollectionCard collection={col} />
                                        </div>
                                    ))}
                                    {filteredCollections.length === 0 && (
                                        <div className="col-span-full py-20 text-center text-gray-500">
                                            No collections found.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategoryChange}
                priceRange={priceRange as [number, number]}
                setPriceRange={setPriceRange}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
            />

            {/* Item Details Modal */}
            <ItemModal
                isOpen={!!selectedItemId}
                itemId={selectedItemId || ''}
                onClose={() => setSelectedItemId(null)}
            />
        </div >
    );
};

export default Explore;
