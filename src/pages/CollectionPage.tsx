import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { COLLECTIONS, MOCK_NFTS } from '../data/marketplaceData';
import CollectionHero from '../components/Collections/CollectionHero';
import CollectionStats from '../components/Collections/CollectionStats';
import FilterPanel from '../components/Filters/FilterPanel';
import ItemsGrid from '../components/Items/ItemsGrid';
import ItemModal from '../components/Items/ItemModal';
import ActivityTab from '../components/Collections/ActivityTab';
import MobileFilterDrawer from '../components/MobileFilterDrawer';
import CheckoutModal from '../components/Checkout/CheckoutModal';

const CollectionPage = () => {
    const { slug } = useParams<{ slug: string }>(); // Assuming route is /collection/:slug, but data uses IDs. We'll match by ID for now.
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [collection, setCollection] = useState<any>(null);
    const [collectionItems, setCollectionItems] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('items'); // 'items' | 'activity'
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [checkoutItem, setCheckoutItem] = useState<any>(null);

    const handleBuyItem = (itemId: string) => {
        const item = collectionItems.find(i => i.id === itemId);
        if (item) {
            setCheckoutItem(item);
        }
    };

    // Initial Data Load
    useEffect(() => {
        // Simulate API call or data lookup
        const foundCollection = COLLECTIONS.find(c => c.id === slug); // slug is technically ID in mock data
        if (foundCollection) {
            setCollection(foundCollection);
            // Load initial items
            const items = MOCK_NFTS.filter(nft => nft.collectionId === slug);
            // Mapper (reused logic)
            const mappedItems = items.map(nft => ({
                id: nft.id,
                name: nft.title,
                image: nft.image,
                price: parseFloat(nft.price.replace(' ETH', '')),
                isListed: true,
                rarity: { score: 0, rank: 0, level: 'Common' },
                traits: [],
                owner: '0x...',
                lastSalePrice: null,
                isFavorited: false,
                category: nft.category // Adding category for filtering
            }));
            setCollectionItems(mappedItems);
        } else {
            console.error('Collection not found');
            // navigate('/market');
        }
    }, [slug, navigate]);


    // Filter State Management via URL
    // We will pass `onFiltersChange` to FilterPanel which will update URL.
    // FilterPanel needs to read from URL to set its initial state.
    // For now, let's keep it simple: FilterPanel manages its own state and notifies parent.
    // Parent filters items.

    // In a real app, FilterPanel would initialize from URL params.

    // Initialize state from URL params
    const [filters, setFilters] = useState(() => {
        const min = searchParams.get('minPrice');
        const max = searchParams.get('maxPrice');
        return {
            status: { buyNow: false, onAuction: false },
            priceRange: {
                min: min ? parseFloat(min) : 0,
                max: max ? parseFloat(max) : 100
            },
            traits: {}
        };
    });

    const handleFiltersChange = (newFilters: any) => {
        setFilters(newFilters);

        // Update URL params
        const params = new URLSearchParams(searchParams);
        if (newFilters.priceRange.min > 0) params.set('minPrice', newFilters.priceRange.min.toString());
        else params.delete('minPrice');

        if (newFilters.priceRange.max < 100) params.set('maxPrice', newFilters.priceRange.max.toString()); // Assuming 100 is default max
        else params.delete('maxPrice');

        setSearchParams(params);
    };

    // Filter Logic
    const filteredItems = useMemo(() => {
        return collectionItems.filter(item => {
            // Price Filter
            if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) return false;

            // Status Filter (Mock)
            // if (filters.status.buyNow && !item.isListed) return false;

            return true;
        });
    }, [collectionItems, filters]);

    if (!collection) return <div className="min-h-screen bg-black text-white pt-24 text-center">Loading Collection...</div>;

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            {/* Hero Section */}
            <CollectionHero collection={collection} />

            {/* Stats Bar */}
            <CollectionStats collection={collection} />

            {/* Content Area */}
            <div className={`max-w-[1920px] mx-auto px-4 md:px-6 py-8`}>
                {/* Tabs */}
                <div className="flex items-center justify-between border-b border-white/10 mb-6">
                    <div className="flex gap-8 overflow-x-auto">
                        {(['items', 'activity', 'analytics'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green shadow-[0_0_10px_rgba(0,255,163,0.5)]"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        className="lg:hidden flex items-center gap-2 text-sm font-bold text-neon-green"
                        onClick={() => setIsMobileFilterOpen(true)}
                    >
                        FILTERS
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'items' && (
                    <div className="flex gap-8 relative items-start">
                        {/* Filters - Sticky Sidebar (Desktop) */}
                        <div className="hidden lg:block w-[280px] h-[calc(100vh-140px)] sticky top-24 flex-shrink-0">
                            <FilterPanel onFiltersChange={handleFiltersChange} />
                        </div>

                        {/* Grid */}
                        <div className="flex-1 w-full min-w-0">
                            <div className="mb-4 text-sm text-gray-400">
                                {filteredItems.length} Items
                            </div>

                            <ItemsGrid
                                items={filteredItems}
                                filters={filters}
                                onItemClick={(id) => setSelectedItemId(id)}
                                onBuyItem={handleBuyItem}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="max-w-5xl mx-auto">
                        <ActivityTab collectionId={collection.id} />
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
                        <p className="text-gray-400 text-xl font-bold mb-2">Analytics Coming Soon</p>
                    </div>
                )}
            </div>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                selectedCategory="all" // Placeholder
                setSelectedCategory={() => { }}
                priceRange={[filters.priceRange.min, filters.priceRange.max]}
                setPriceRange={(range: number[]) => handleFiltersChange({ ...filters, priceRange: { min: range[0], max: range[1] } })}
                selectedTypes={[]}
                toggleType={() => { }}
            />

            {/* Item Modal */}
            <ItemModal
                isOpen={!!selectedItemId}
                itemId={selectedItemId || ''}
                onClose={() => setSelectedItemId(null)}
            />

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={!!checkoutItem}
                onClose={() => setCheckoutItem(null)}
                item={checkoutItem}
            />
        </div>
    );
};

export default CollectionPage;
