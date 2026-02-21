import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import FeaturedCollectionCard from "../components/Marketplace/FeaturedCollectionCard";
import MinimalItemCard from "../components/Marketplace/MinimalItemCard";
import AuctionHighlightStrip from "../components/Marketplace/AuctionHighlightStrip";
import MarketplaceDropdown from "../components/Marketplace/MarketplaceDropdown";
import DesktopFilterSidebar from "../components/Marketplace/DesktopFilterSidebar";
import { CATEGORIES, COLLECTIONS, MOCK_NFTS } from "../data/marketplaceData";
import MobileFilterDrawer from "../components/MobileFilterDrawer";
import ItemModal from "../components/Items/ItemModal";
import CheckoutModal from "../components/Checkout/CheckoutModal";

const Marketplace = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isDesktopFilterOpen, setIsDesktopFilterOpen] = useState(true);
    const [sortOption, setSortOption] = useState("Recently Listed");

    // Modal States
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [checkoutItem, setCheckoutItem] = useState<any>(null);

    // Filter States
    const [priceRange, setPriceRange] = useState([0, 10]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
    };

    const handleBuyItem = (item: any) => {
        setSelectedItem(null);
        setCheckoutItem(item);
    };

    const handleCollectionClick = (collection: any) => {
        navigate(`/collection/${collection.categoryId}/${collection.id}`);
    };

    // Initial Data
    const featuredCollections = COLLECTIONS.slice(0, 4);
    const mockAuctions = MOCK_NFTS.filter(n => n.id.includes('item-1') || n.id.includes('item-3'));

    // Filter Logic
    const filteredItems = MOCK_NFTS.filter(item => {
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = parseFloat(item.price) >= priceRange[0] && parseFloat(item.price) <= priceRange[1];
        // Note: Mock data doesn't have 'type', assuming all match if empty or logic needed update in data
        return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
        if (sortOption === "Price: Low to High") return parseFloat(a.price) - parseFloat(b.price);
        if (sortOption === "Price: High to Low") return parseFloat(b.price) - parseFloat(a.price);
        return 0; // Default (Recently Listed)
    });

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 font-primary">

            {/* 1. Hero Section */}
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 mb-12 md:mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-4 md:mb-2 leading-tight">
                            Explore <span className="text-neon-green block md:inline">All Categories</span>
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg max-w-xl">
                            Discover curated digital assets crafted for status and utility.
                        </p>
                    </div>

                    {/* Minimal Pill Filters */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 ${selectedCategory === "all" ? "bg-white text-black border-white" : "bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white"}`}
                        >
                            All
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 ${selectedCategory === cat.id ? "bg-white text-black border-white" : "bg-transparent text-gray-400 border-white/10 hover:border-white hover:text-white"}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Control Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-4 gap-4 sticky top-20 bg-black/80 backdrop-blur-md z-40 py-4 -mx-4 px-4 md:mx-0 md:px-0">
                    {/* Search */}
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-b border-white/10 w-full pl-8 py-2 text-sm text-white focus:outline-none focus:border-neon-green transition-colors placeholder-gray-600"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                        <MarketplaceDropdown
                            options={["Recently Listed", "Price: Low to High", "Price: High to Low"]}
                            selected={sortOption}
                            onSelect={setSortOption}
                        />

                        <button
                            onClick={() => {
                                if (window.innerWidth >= 1024) {
                                    setIsDesktopFilterOpen(!isDesktopFilterOpen);
                                } else {
                                    setIsMobileFilterOpen(true);
                                }
                            }}
                            className={`flex items-center gap-2 text-sm font-bold transition-colors ${isDesktopFilterOpen ? 'text-neon-green' : 'text-gray-400 hover:text-neon-green'}`}
                        >
                            <SlidersHorizontal size={16} /> <span className="hidden sm:inline">Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Layout with Sidebar */}
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 flex gap-8">

                {/* Desktop Sidebar */}
                <DesktopFilterSidebar
                    isOpen={isDesktopFilterOpen}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    selectedTypes={selectedTypes}
                    toggleType={toggleType}
                />

                <div className="flex-1 min-w-0">
                    {/* 3. Featured Collections */}
                    {selectedCategory === "all" && !searchQuery && (
                        <section className="mb-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">Featured Collections</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {featuredCollections.map((col, idx) => (
                                    <FeaturedCollectionCard 
                                        key={idx} 
                                        collection={col} 
                                        onClick={() => handleCollectionClick(col)}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 6. Auction Highlight (Optional) */}
                    {selectedCategory === "all" && !searchQuery && (
                        <AuctionHighlightStrip items={mockAuctions} />
                    )}

                    {/* 4. Trending/All Items Grid */}
                    <section className="mt-16 md:mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500">
                                {searchQuery ? `Search Results for "${searchQuery}"` : "Trending Items"}
                            </h2>
                            <span className="text-[10px] md:text-xs text-gray-600 font-mono">{filteredItems.length} ITEMS</span>
                        </div>

                        <div className={`grid gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 ${isDesktopFilterOpen
                            ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                            }`}>
                            {filteredItems.map((item, idx) => (
                                <MinimalItemCard 
                                    key={idx} 
                                    item={item} 
                                    onClick={() => handleItemClick(item)}
                                />
                            ))}
                        </div>

                        {filteredItems.length === 0 && (
                            <div className="col-span-full py-20 text-center text-gray-500 border border-white/5 rounded-xl">
                                No items found matching your criteria.
                            </div>
                        )}

                        {/* Load More (Visual only) */}
                        {filteredItems.length > 0 && (
                            <div className="mt-20 flex justify-center">
                                <button className="px-8 py-3 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                    Load More
                                </button>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* 7. Bottom CTA */}
            <section className="mt-32 border-t border-white/5 bg-[#050505]">
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-tight">
                        Launch Your Collection <br /> on <span className="text-neon-green">Godsland</span>
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-lg mx-auto text-sm md:text-base">
                        Join an exclusive ecosystem of verified creators. Apply for access to our launchpad and reach serious collectors.
                    </p>
                    <button className="px-10 py-4 bg-neon-green text-black font-bold text-xs md:text-sm uppercase tracking-widest rounded hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,255,163,0.3)]">
                        Apply for Access
                    </button>
                </div>
            </section>

            {/* Filter Drawer */}
            <MobileFilterDrawer
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
            />

            {/* Modals */}
            <ItemModal
                isOpen={!!selectedItem}
                itemId={selectedItem?.id}
                onClose={() => setSelectedItem(null)}
                onBuy={() => handleBuyItem(selectedItem)}
            />

            <CheckoutModal
                isOpen={!!checkoutItem}
                onClose={() => setCheckoutItem(null)}
                item={checkoutItem}
            />

        </div>
    );
};

export default Marketplace;
