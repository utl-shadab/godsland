// Force re-check
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COLLECTIONS, MOCK_NFTS } from '../data/marketplaceData';
import CollectionHero from '../components/Collections/CollectionHero';
import CollectionStats from '../components/Collections/CollectionStats';
import FilterPanel from '../components/Filters/FilterPanel';
import ItemsGrid from '../components/Items/ItemsGrid';
import ItemModal from '../components/Items/ItemModal';
import ActivityTab from '../components/Collections/ActivityTab';

const CollectionDetails = () => {
    const { category, collectionId } = useParams<{ category: string; collectionId: string }>();
    const navigate = useNavigate();

    const [collection, setCollection] = useState<any>(null); // Use existing shape or import mapped type
    const [collectionItems, setCollectionItems] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState('items'); // 'items' | 'activity' | 'analytics'
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            if (collectionId) {
                const data = COLLECTIONS.find(c => c.id === collectionId);
                // Optional: Validate category matches data.categoryId
                if (data) {
                    setCollection(data);
                    // Filter items for this collection
                    const items = MOCK_NFTS.filter(nft => nft.collectionId === collectionId);
                    // Map MOCK_NFTS to IItem shape if needed (ItemsGrid expects IItem)
                    // Currently MOCK_NFTS has shape: { id, title, creator, price, image, category, type, stars }
                    // IItem expects: { id, name, image, price, isListed, rarity, traits, owner, lastSalePrice, isFavorited }
                    // We need a mapping here or update MOCK_NFTS to match IItem. 
                    // Let's map it for now to ensure compatibility.
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
                        isFavorited: false
                    }));
                    setCollectionItems(mappedItems);
                } else {
                    console.error('Collection not found');
                    // navigate('/market'); // Fallback
                }
            }
        }, 500);
    }, [category, collectionId, navigate]);

    if (!collection) return <div className="min-h-screen bg-black text-white pt-24 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white pt-20">
            {/* Hero Section */}
            <CollectionHero collection={collection} />

            {/* Stats Bar */}
            <CollectionStats collection={collection} />

            {/* Content Area */}
            <div className="max-w-[1600px] mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="mb-6 flex gap-8 border-b border-white/10 overflow-x-auto">
                    {(['items', 'activity', 'analytics', 'traits', 'discussion'] as const).map(tab => (
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

                {/* Tab Content */}
                {activeTab === 'items' && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters - Sticky Sidebar */}
                        <div className="lg:col-span-1 hidden lg:block h-full sticky top-24">
                            <FilterPanel onFiltersChange={(filters) => console.log(filters)} />
                        </div>

                        {/* Grid */}
                        <div className="lg:col-span-3">
                            {/* Mobile Filter Toggle (Simplified) */}
                            <div className="lg:hidden mb-4">
                                <button className="w-full py-3 bg-slate-900 text-white font-bold rounded border border-slate-800">
                                    Show Filters
                                </button>
                            </div>

                            <ItemsGrid
                                items={collectionItems}
                                filters={{ status: {}, priceRange: {}, traits: {} }}
                                onItemClick={(id) => setSelectedItemId(id)}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'activity' && (
                    <ActivityTab collectionId={collection.id} />
                )}

                {(activeTab === 'analytics' || activeTab === 'traits' || activeTab === 'discussion') && (
                    <div className="py-20 text-center border border-dashed border-white/10 rounded-xl">
                        <p className="text-gray-400 text-xl font-bold mb-2">Coming Soon</p>
                        <p className="text-gray-500">This feature is currently under development.</p>
                    </div>
                )}
            </div>

            {/* Item Modal */}
            <ItemModal
                isOpen={!!selectedItemId}
                itemId={selectedItemId || ''}
                onClose={() => setSelectedItemId(null)}
            />
        </div>
    );
};

export default CollectionDetails;
