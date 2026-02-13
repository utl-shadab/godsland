import { Search, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

const SearchSortBar = ({
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    viewMode,
    setViewMode,
    onOpenFilter // New prop
}: any) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 sticky top-20 z-30 bg-black/95 backdrop-blur-md py-4 border-b border-white/5 transition-all">

            {/* Search Input */}
            <div className="relative w-full md:w-96 group order-2 md:order-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-500 group-focus-within:text-neon-green transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 sm:text-sm transition-all duration-300"
                    placeholder="Search by name or creator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto order-1 md:order-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {/* Mobile Filter Button */}
                <button
                    onClick={onOpenFilter}
                    className="lg:hidden flex items-center gap-2 px-4 py-3 bg-[#111] border border-white/10 rounded-xl text-white font-bold whitespace-nowrap hover:bg-white/10 active:scale-95 transition-all"
                >
                    <List size={18} /> Filters
                </button>

                {/* Sort Dropdown */}
                <div className="relative group w-full md:w-auto min-w-[160px]">
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <ArrowUpDown size={16} className="text-neon-green" />
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-transparent text-white text-sm font-medium outline-none appearance-none w-full cursor-pointer"
                        >
                            <option value="recent" className="bg-black text-white">Recently Listed</option>
                            <option value="price_low" className="bg-black text-white">Price: Low to High</option>
                            <option value="price_high" className="bg-black text-white">Price: High to Low</option>
                            <option value="stars" className="bg-black text-white">Most Stars</option>
                        </select>
                    </div>
                </div>

                {/* View Toggle (Visual only for now) */}
                <div className="hidden md:flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10 ml-auto">
                    <button
                        className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-neon-green/20 text-neon-green' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-neon-green/20 text-neon-green' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setViewMode('list')}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchSortBar;
