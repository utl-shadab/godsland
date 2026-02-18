import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CATEGORIES, COLLECTIONS, MOCK_NFTS } from "../data/marketplaceData";
import TrendingCollectionCard from "../components/TrendingCollectionCard";
import NFTCard from "../components/NFTCard";
import ItemModal from "../components/Items/ItemModal";
import CheckoutModal from "../components/Checkout/CheckoutModal";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);

  // Modal States
  const [selectedItem, setSelectedItem] = useState<any>(null); // For Item Details
  const [checkoutItem, setCheckoutItem] = useState<any>(null); // For Checkout

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  // Filtering Logic (Collections)
  let filteredCollections = COLLECTIONS.filter((col) => {
    if (selectedCategory !== "all" && col.categoryId !== selectedCategory)
      return false;
    return true;
  });

  // When "all" is selected, distribute from different categories
  if (selectedCategory === "all") {
    const byCategory = CATEGORIES.map(cat =>
      COLLECTIONS.filter(col => col.categoryId === cat.id).slice(0, 2)
    ).flat();
    filteredCollections = byCategory.slice(0, 8);
  } else {
    filteredCollections = filteredCollections.slice(0, 8);
  }

  // Mock Trending Items (from MOCK_NFTS or BIGGEST_MOVERS)
  const trendingItems = MOCK_NFTS.slice(0, 10);

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === "all") {
      navigate("/collections");
    } else {
      navigate(`/collections?category=${newCategory}`);
    }
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
  };

  const handleBuyItem = (item: any) => {
    setSelectedItem(null); // Close item modal if open
    setCheckoutItem(item); // Open checkout modal
  };

  const categoryData = CATEGORIES.find((c) => c.id === selectedCategory);
  const categoryName = categoryData ? categoryData.name : "All Categories";

  return (
    <div className="pt-24 min-h-screen bg-black text-white pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-4">
            Explore <span className="text-neon-green">{categoryName}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto md:mx-0 text-lg">
            Discover the best {categoryName.toLowerCase()} collections and
            items.
          </p>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm font-bold border ${selectedCategory === "all" ? "bg-white text-black border-white" : "bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white"} `}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold border ${selectedCategory === cat.id ? "bg-white text-black border-white" : "bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white"} `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Collections Grid */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-8 bg-neon-green rounded-sm"></span>
              Trending Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...filteredCollections, ...filteredCollections]
              .slice(0, 8)
              .map((col, index) => (
                <div
                  key={`${col.id}-${index}`}
                  onClick={() =>
                    navigate(`/collection/${col.categoryId}/${col.id}`)
                  }
                >
                  <TrendingCollectionCard collection={col} />
                </div>
              ))}
            {filteredCollections.length === 0 && (
              <div className="col-span-full py-20 text-center text-gray-500 border border-white/5 rounded-xl">
                No collections found in this category.
              </div>
            )}
          </div>
        </section>

        {/* Trending Items (Horizontal Scroll Slider) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-2">
              <span className="w-2 h-8 bg-neon-green rounded-sm"></span>
              Trending {categoryName} Items
            </h2>
            {/* Navigation hints could go here (Left/Right arrows) */}
          </div>

          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory">
            <div className="flex gap-6 min-w-max pb-8">
              {trendingItems.map((nft) => (
                <div key={nft.id} className="w-[280px] snap-center">
                  <NFTCard
                    title={nft.title}
                    price={nft.price}
                    image={nft.image}
                    rank={`#${nft.id}`}
                    lastSale={nft.price}
                    onClick={() => handleItemClick(nft)}
                    onBuy={() => handleBuyItem(nft)}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

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

export default CategoryPage;
