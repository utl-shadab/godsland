import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  PackageOpen,
} from "lucide-react";
import { gsap } from "gsap";
import {
  OWNED_NFTS,
  COLLECTIONS_LIST,
  RARITY_TYPES,
  type OwnedNFT,
} from "../../data/ownedNftsData";

type SortOption = "newest" | "oldest" | "price_high" | "price_low";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest First",
  oldest: "Oldest First",
  price_high: "Highest Price",
  price_low: "Lowest Price",
};

/* ─── Price range slider ─── */
const DualRangeSlider = ({
  range,
  setRange,
  min = 0,
  max = 10,
}: {
  range: [number, number];
  setRange: (r: [number, number]) => void;
  min?: number;
  max?: number;
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), range[1] - 0.1);
    setRange([val, range[1]]);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), range[0] + 0.1);
    setRange([range[0], val]);
  };

  return (
    <div className="relative  h-6 mb-2">
      <div className="absolute w-full h-1 bg-white/10 rounded-full top-2.5" />
      <div
        className="absolute h-1 bg-[#00d32c] rounded-full top-2.5"
        style={{
          left: `${((range[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((range[1] - min) / (max - min)) * 100}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={0.1}
        value={range[0]}
        onChange={handleMinChange}
        className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00d32c] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,211,44,0.5)] z-20"
        style={{ zIndex: range[0] > max - 1 ? 22 : 20 }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={0.1}
        value={range[1]}
        onChange={handleMaxChange}
        className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00d32c] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(0,211,44,0.5)] z-[21]"
      />
    </div>
  );
};

const FilterDrawer = ({
  isOpen,
  onClose,
  selectedCollection,
  setSelectedCollection,
  priceRange,
  setPriceRange,
  selectedTypes,
  toggleType,
  selectedRarities,
  toggleRarity,
  onClearAll,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCollection: string;
  setSelectedCollection: (c: string) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  selectedTypes: string[];
  toggleType: (t: string) => void;
  selectedRarities: string[];
  toggleRarity: (r: string) => void;
  onClearAll: () => void;
}) => {
  const [openSections, setOpenSections] = useState({
    collection: true,
    price: true,
    type: true,
    rarity: true,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set("#owned-drawer", { y: "100%" });
      gsap.to("#owned-drawer", { y: "0%", duration: 0.4, ease: "power3.out" });
      gsap.fromTo(
        "#owned-drawer-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to("#owned-drawer", {
      y: "100%",
      duration: 0.3,
      ease: "power3.in",
      onComplete: onClose,
    });
    gsap.to("#owned-drawer-bg", { opacity: 0, duration: 0.3 });
  };

  if (!isOpen) return null;

  const toggle = (s: keyof typeof openSections) =>
    setOpenSections((p) => ({ ...p, [s]: !p[s] }));

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        id="owned-drawer-bg"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        id="owned-drawer"
        className="absolute bottom-0 left-0 w-full rounded-t-3xl border-t border-white/10 bg-[#0a0a0a] flex flex-col max-h-[85vh]"
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Filters</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-[#00d32c] hover:underline"
            >
              Clear All
            </button>
            <button
              onClick={handleClose}
              className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 custom-scrollbar">
          {/* Collection */}
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full text-left mb-3 group"
              onClick={() => toggle("collection")}
            >
              <span className="font-semibold text-white uppercase text-xs tracking-wider group-hover:text-[#00d32c] transition-colors">
                Collection
              </span>
              {openSections.collection ? (
                <ChevronUp size={14} className="text-gray-400" />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>
            {openSections.collection && (
              <div className="grid grid-cols-2 gap-2">
                {["All", ...COLLECTIONS_LIST].map((col) => (
                  <button
                    key={col}
                    className={`py-2.5 px-3 rounded-lg text-xs text-center border transition-all ${selectedCollection === col
                      ? "bg-[#00d32c]/15 border-[#00d32c] text-[#00d32c] font-bold"
                      : "border-white/10 text-gray-400 hover:border-white/25 hover:text-white"
                      }`}
                    onClick={() => setSelectedCollection(col)}
                  >
                    {col}
                  </button>
                ))}
              </div>
            )}
          </div>

          <hr className="border-white/10 my-4" />

          {/* Price range */}
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full text-left mb-3 group"
              onClick={() => toggle("price")}
            >
              <span className="font-semibold text-white uppercase text-xs tracking-wider group-hover:text-[#00d32c] transition-colors">
                Price Range
              </span>
              {openSections.price ? (
                <ChevronUp size={14} className="text-gray-400" />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>
            {openSections.price && (
              <div>
                <div className="flex justify-between text-white mb-4 font-mono text-xs">
                  <span>{priceRange[0].toFixed(1)} ETH</span>
                  <span>{priceRange[1].toFixed(1)} ETH</span>
                </div>
                <DualRangeSlider range={priceRange} setRange={setPriceRange} />
              </div>
            )}
          </div>

          <hr className="border-white/10 my-4" />

          {/* NFT Type */}
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full text-left mb-3 group"
              onClick={() => toggle("type")}
            >
              <span className="font-semibold text-white uppercase text-xs tracking-wider group-hover:text-[#00d32c] transition-colors">
                Token Standard
              </span>
              {openSections.type ? (
                <ChevronUp size={14} className="text-gray-400" />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>
            {openSections.type && (
              <div className="flex flex-col gap-3">
                {["ERC-721", "ERC-1155"].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(t)
                        ? "bg-[#00d32c] border-[#00d32c]"
                        : "border-white/20 bg-transparent group-hover:border-[#00d32c]"
                        }`}
                      onClick={() => toggleType(t)}
                    >
                      {selectedTypes.includes(t) && (
                        <Check size={12} className="text-black" />
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors ${selectedTypes.includes(t)
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                        }`}
                    >
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <hr className="border-white/10 my-4" />

          {/* Rarity */}
          <div className="mb-5">
            <button
              className="flex items-center justify-between w-full text-left mb-3 group"
              onClick={() => toggle("rarity")}
            >
              <span className="font-semibold text-white uppercase text-xs tracking-wider group-hover:text-[#00d32c] transition-colors">
                Rarity
              </span>
              {openSections.rarity ? (
                <ChevronUp size={14} className="text-gray-400" />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>
            {openSections.rarity && (
              <div className="flex flex-col gap-3">
                {RARITY_TYPES.map((r) => (
                  <label
                    key={r}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedRarities.includes(r)
                        ? "bg-[#00d32c] border-[#00d32c]"
                        : "border-white/20 bg-transparent group-hover:border-[#00d32c]"
                        }`}
                      onClick={() => toggleRarity(r)}
                    >
                      {selectedRarities.includes(r) && (
                        <Check size={12} className="text-black" />
                      )}
                    </div>
                    <span
                      className={`text-sm transition-colors ${selectedRarities.includes(r)
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                        }`}
                    >
                      {r}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0a0a0a]">
          <button
            onClick={handleClose}
            className="w-full py-3.5 bg-[#00d32c] text-black font-bold uppercase tracking-widest rounded-xl hover:bg-[#00ff36] transition-colors shadow-[0_0_15px_rgba(0,211,44,0.3)]"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

const RARITY_COLORS: Record<string, string> = {
  Basic: "bg-gray-500/80",
  Special: "bg-blue-500/80",
  Premium: "bg-purple-500/80",
  Legendary: "bg-amber-500/80",
};

const OwnedNFTs = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);

  const toggleType = (t: string) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleRarity = (r: string) =>
    setSelectedRarities((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const clearAll = () => {
    setSearchQuery("");
    setSelectedCollection("All");
    setSortOption("newest");
    setPriceRange([0, 10]);
    setSelectedTypes([]);
    setSelectedRarities([]);
  };

  const filteredNFTs = useMemo(() => {
    let result = [...OWNED_NFTS];

    // 1. Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((n) => n.name.toLowerCase().includes(q));
    }

    // 2. Collection
    if (selectedCollection !== "All") {
      result = result.filter((n) => n.collection === selectedCollection);
    }

    // 3. Price range
    result = result.filter(
      (n) => n.floorPrice >= priceRange[0] && n.floorPrice <= priceRange[1]
    );

    // 4. Token type
    if (selectedTypes.length > 0) {
      result = result.filter((n) => selectedTypes.includes(n.type));
    }

    // 5. Rarity
    if (selectedRarities.length > 0) {
      result = result.filter((n) => selectedRarities.includes(n.rarity));
    }

    // 6. Sort
    switch (sortOption) {
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.acquiredDate).getTime() -
            new Date(a.acquiredDate).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.acquiredDate).getTime() -
            new Date(b.acquiredDate).getTime()
        );
        break;
      case "price_high":
        result.sort((a, b) => b.floorPrice - a.floorPrice);
        break;
      case "price_low":
        result.sort((a, b) => a.floorPrice - b.floorPrice);
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedCollection,
    sortOption,
    priceRange,
    selectedTypes,
    selectedRarities,
  ]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".nft-card");
    if (cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }
    );
  }, [filteredNFTs]);

  const activeFilters: { label: string; onRemove: () => void }[] = [];
  if (searchQuery.trim())
    activeFilters.push({
      label: `"${searchQuery}"`,
      onRemove: () => setSearchQuery(""),
    });
  if (selectedCollection !== "All")
    activeFilters.push({
      label: selectedCollection,
      onRemove: () => setSelectedCollection("All"),
    });
  if (priceRange[0] > 0 || priceRange[1] < 10)
    activeFilters.push({
      label: `${priceRange[0].toFixed(1)} – ${priceRange[1].toFixed(1)} ETH`,
      onRemove: () => setPriceRange([0, 10]),
    });
  selectedTypes.forEach((t) =>
    activeFilters.push({ label: t, onRemove: () => toggleType(t) })
  );
  selectedRarities.forEach((r) =>
    activeFilters.push({ label: r, onRemove: () => toggleRarity(r) })
  );

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-white text-2xl md:text-3xl font-semibold">
          Owned NFTs
        </h1>
        <p className="text-gray-400 text-sm">
          Select an NFT to create a sell order.{" "}
          <span className="text-[#00d32c] font-semibold">
            {filteredNFTs.length}
          </span>{" "}
          item{filteredNFTs.length !== 1 && "s"} found
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-lg bg-[#0a0a0a] border border-[#1a3a2a] pl-9 pr-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d32c]/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Collection dropdown — hidden on mobile, visible on sm+ */}
          <div className="hidden sm:block relative">
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="h-10 rounded-lg bg-[#0a0a0a] border border-[#1a3a2a] px-3 pr-8 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#00d32c]/50 transition-colors"
            >
              <option value="All">All Collections</option>
              {COLLECTIONS_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>

          {/* Sort dropdown — hidden on mobile, visible on sm+ */}
          <div className="hidden sm:block relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="h-10 rounded-lg bg-[#0a0a0a] border border-[#1a3a2a] px-3 pr-8 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#00d32c]/50 transition-colors"
            >
              {Object.entries(SORT_LABELS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>

          {/* Mobile: sort + filter button row */}
          <div className="flex sm:hidden gap-3">
            <div className="relative flex-1">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full h-10 rounded-lg bg-[#0a0a0a] border border-[#1a3a2a] px-3 pr-8 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-[#00d32c]/50 transition-colors"
              >
                {Object.entries(SORT_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="h-10 px-4 rounded-lg bg-[#0a0a0a] border border-[#1a3a2a] flex items-center gap-2 text-sm text-white hover:border-[#00d32c]/40 transition-colors shrink-0"
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#00d32c] text-black text-[10px] font-bold flex items-center justify-center">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ─── Active filter pills ─── */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((f, i) => (
              <span
                key={`${f.label}-${i}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00d32c]/10 border border-[#00d32c]/30 text-[#00d32c] text-xs font-medium animate-[fadeIn_0.2s_ease-out]"
              >
                {f.label}
                <button
                  onClick={f.onRemove}
                  className="hover:text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-[#00d32c] transition-colors underline underline-offset-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ─── NFT Grid ─── */}
      {filteredNFTs.length > 0 ? (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          {filteredNFTs.map((nft: OwnedNFT) => (
            <div
              key={nft.id}
              className="nft-card group rounded-2xl border border-[#1a3a2a] bg-[#0a0a0a] overflow-hidden hover:border-[#00d32c]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,211,44,0.08)]"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0A2219] via-[#0d1d17] to-[#0D2B1F]">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Badges */}
                <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#00d32c]/90 text-black text-[10px] font-bold tracking-wide">
                  {nft.type}
                </span>
                <span
                  className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-[10px] font-bold tracking-wide ${RARITY_COLORS[nft.rarity]
                    }`}
                >
                  {nft.rarity}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-white text-sm font-semibold truncate">
                  {nft.name}
                </p>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-gray-500">Floor</span>
                  <span className="text-white font-medium">
                    {nft.floorPrice.toFixed(2)} ETH
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-500">Collection</span>
                  <span className="text-[#00d32c]/80 font-medium">
                    {nft.collection}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/user/owned/${nft.id}/sell`)}
                  className="mt-4 w-full h-9 rounded-full bg-[#00d32c] text-black text-sm font-semibold hover:bg-[#00ff36] active:scale-[0.97] transition-all duration-200 shadow-[0_0_12px_rgba(0,211,44,0.15)]"
                >
                  Create Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ─── Empty state ─── */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#0a1a14] border border-[#1a3a2a] flex items-center justify-center mb-5">
            <PackageOpen size={36} className="text-gray-600" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">
            No NFTs found
          </h3>
          <p className="text-gray-500 text-sm max-w-xs mb-6">
            Try adjusting your filters or search query to find what you're
            looking for.
          </p>
          <button
            onClick={clearAll}
            className="px-6 py-2.5 rounded-full border border-[#00d32c]/40 text-[#00d32c] text-sm font-semibold hover:bg-[#00d32c]/10 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* ─── Mobile filter drawer ─── */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedTypes={selectedTypes}
        toggleType={toggleType}
        selectedRarities={selectedRarities}
        toggleRarity={toggleRarity}
        onClearAll={clearAll}
      />
    </div>
  );
};

export default OwnedNFTs;
