
import { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { CATEGORIES } from '../../data/marketplaceData';
import { AnimatePresence, motion } from 'framer-motion';

// Reusing the DualRangeSlider component logic 
const DualRangeSlider = ({ range, setRange, min = 0, max = 10 }: any) => {
    const handleMinChange = (e: any) => {
        const val = Math.min(Number(e.target.value), range[1] - 0.5);
        setRange([val, range[1]]);
    };

    const handleMaxChange = (e: any) => {
        const val = Math.max(Number(e.target.value), range[0] + 0.5);
        setRange([range[0], val]);
    };

    return (
        <div className="relative h-6 mb-6">
            <div className="absolute w-full h-1 bg-white/10 rounded-full top-2.5"></div>
            <div
                className="absolute h-1 bg-neon-green rounded-full top-2.5"
                style={{ left: `${(range[0] / max) * 100}%`, right: `${100 - (range[1] / max) * 100}%` }}
            ></div>
            <input
                type="range"
                min={min}
                max={max}
                step={0.1}
                value={range[0]}
                onChange={handleMinChange}
                className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neon-green [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,163,0.5)] z-20"
                style={{ zIndex: range[0] > max - 1 ? 22 : 20 }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={0.1}
                value={range[1]}
                onChange={handleMaxChange}
                className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neon-green [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,163,0.5)] z-21"
            />
        </div>
    );
};

interface DesktopFilterSidebarProps {
    isOpen: boolean;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    selectedTypes: string[];
    toggleType: (type: string) => void;
}

const DesktopFilterSidebar = ({
    isOpen,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedTypes,
    toggleType
}: DesktopFilterSidebarProps) => {
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
        type: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 h-full overflow-hidden border-r border-white/10 hidden lg:block sticky top-36 self-start bg-black"
                    style={{ height: 'calc(100vh - 100px)' }}
                >
                    <div className="w-[300px] pr-6 py-4 overflow-y-auto h-full custom-scrollbar">

                        {/* Categories */}
                        <div className="mb-8">
                            <button
                                className="flex items-center justify-between w-full text-left mb-4 group"
                                onClick={() => toggleSection('categories')}
                            >
                                <span className="font-bold text-white uppercase text-xs tracking-widest group-hover:text-neon-green transition-colors">Categories</span>
                                {openSections.categories ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                            </button>

                            <AnimatePresence>
                                {openSections.categories && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-1">
                                            <button
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === 'all' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                onClick={() => setSelectedCategory('all')}
                                            >
                                                All Categories
                                            </button>
                                            {CATEGORIES.map(cat => (
                                                <button
                                                    key={cat.id}
                                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.id ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                >
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="h-px bg-white/5 my-6"></div>

                        {/* Price Range */}
                        <div className="mb-8">
                            <button
                                className="flex items-center justify-between w-full text-left mb-4 group"
                                onClick={() => toggleSection('price')}
                            >
                                <span className="font-bold text-white uppercase text-xs tracking-widest group-hover:text-neon-green transition-colors">Price Range (ETH)</span>
                                {openSections.price ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                            </button>

                            <AnimatePresence>
                                {openSections.price && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden px-1"
                                    >
                                        <div className="flex justify-between text-white mb-6 font-mono text-xs">
                                            <div className="px-3 py-1 bg-white/5 rounded border border-white/10">
                                                {priceRange[0].toFixed(2)}
                                            </div>
                                            <div className="px-3 py-1 bg-white/5 rounded border border-white/10">
                                                {priceRange[1].toFixed(2)}
                                            </div>
                                        </div>
                                        <DualRangeSlider range={priceRange} setRange={setPriceRange} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="h-px bg-white/5 my-6"></div>

                        {/* NFT Type */}
                        <div className="mb-8">
                            <button
                                className="flex items-center justify-between w-full text-left mb-4 group"
                                onClick={() => toggleSection('type')}
                            >
                                <span className="font-bold text-white uppercase text-xs tracking-widest group-hover:text-neon-green transition-colors">Status & Type</span>
                                {openSections.type ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                            </button>

                            <AnimatePresence>
                                {openSections.type && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="space-y-2">
                                            {['Basic', 'Special', 'Premium', 'Legendary'].map(type => (
                                                <label key={type} className="flex items-center gap-3 cursor-pointer py-1.5 group select-none">
                                                    <div
                                                        className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all ${selectedTypes.includes(type) ? 'bg-neon-green border-neon-green' : 'border-white/20 bg-transparent group-hover:border-white'}`}
                                                        onClick={() => toggleType(type)}
                                                    >
                                                        {selectedTypes.includes(type) && <Check size={10} className="text-black stroke-[4]" />}
                                                    </div>
                                                    <span className={`text-sm transition-colors ${selectedTypes.includes(type) ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DesktopFilterSidebar;
