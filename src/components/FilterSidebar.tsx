import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { CATEGORIES } from '../data/marketplaceData';

const FilterSection = ({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) => (
    <div className="border-b border-white/10 py-6">
        <button
            className="flex items-center justify-between w-full text-left mb-4 group"
            onClick={onToggle}
        >
            <span className="font-bold text-white uppercase tracking-wider text-sm group-hover:text-neon-green transition-colors">{title}</span>
            {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {children}
        </div>
    </div>
);



const FilterSidebar = ({
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedTypes,
    toggleType
}: any) => {
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
        type: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <aside className="w-full lg:w-[300px] flex-shrink-0 pr-8 hidden lg:block sticky top-24 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">

            {/* Categories */}
            <FilterSection
                title="Categories"
                isOpen={openSections.categories}
                onToggle={() => toggleSection('categories')}
            >
                <div className="flex flex-col gap-2">
                    <button
                        className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all text-sm text-left ${selectedCategory === 'all' ? 'bg-neon-green/10 text-neon-green font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        <span>All Categories</span>
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all text-sm text-left ${selectedCategory === cat.id ? 'bg-neon-green/10 text-neon-green font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <cat.icon size={16} className={selectedCategory === cat.id ? 'text-neon-green' : 'text-gray-500'} />
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Price Range */}
            <FilterSection
                title="Price Range (ETH)"
                isOpen={openSections.price}
                onToggle={() => toggleSection('price')}
            >
                <div className="px-2 pb-4 pt-2">
                    <div className="flex items-center justify-between text-xs text-white mb-4 font-mono">
                        <span>{priceRange[0].toFixed(1)} ETH</span>
                        <span>{priceRange[1].toFixed(1)} ETH</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3 items-center">
                            <div className="relative w-full group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono group-focus-within:text-neon-green transition-colors">MIN</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={priceRange[0]}
                                    onChange={(e) => setPriceRange([Math.max(0, Number(e.target.value)), priceRange[1]])}
                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 pl-10 text-sm text-white focus:border-neon-green outline-none transition-all placeholder-gray-600"
                                    placeholder="0"
                                />
                            </div>
                            <span className="text-gray-600 font-medium">-</span>
                            <div className="relative w-full group">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono group-focus-within:text-neon-green transition-colors">MAX</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], Math.max(0, Number(e.target.value))])}
                                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 pl-10 text-sm text-white focus:border-neon-green outline-none transition-all placeholder-gray-600"
                                    placeholder="10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </FilterSection>

            {/* NFT Type */}
            <FilterSection
                title="NFT Type"
                isOpen={openSections.type}
                onToggle={() => toggleSection('type')}
            >
                <div className="flex flex-col gap-3">
                    {['Basic', 'Special', 'Premium', 'Legendary'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-neon-green border-neon-green' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}
                                onClick={() => toggleType(type)}
                            >
                                {selectedTypes.includes(type) && <Check size={12} className="text-black" />}
                            </div>
                            <span className={`text-sm ${selectedTypes.includes(type) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{type}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

        </aside>
    );
};

export default FilterSidebar;
