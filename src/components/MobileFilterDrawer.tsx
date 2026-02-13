import { useEffect, useState } from 'react';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES } from '../data/marketplaceData';
import { gsap } from 'gsap';

// Reusing the DualRangeSlider component logic locally for simplicity or we could export it
const DualRangeSlider = ({ range, setRange, min = 0, max = 10 }: { range: [number, number], setRange: (val: [number, number]) => void, min?: number, max?: number }) => {
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
                className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neon-green [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,163,0.5)] z-20"
                style={{ zIndex: range[0] > max - 1 ? 22 : 20 }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={0.1}
                value={range[1]}
                onChange={handleMaxChange}
                className="absolute w-full h-1 pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neon-green [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,163,0.5)] z-21"
            />
        </div>
    );
};

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    selectedTypes: string[];
    toggleType: (type: string) => void;
}

const MobileFilterDrawer = ({
    isOpen,
    onClose,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedTypes,
    toggleType
}: MobileFilterDrawerProps) => {
    const [openSections, setOpenSections] = useState({
        categories: true,
        price: true,
        type: true
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo("#mobile-drawer", { y: "100%" }, { y: "0%", duration: 0.4, ease: "power3.out" });
            gsap.fromTo("#mobile-drawer-bg", { opacity: 0 }, { opacity: 1, duration: 0.3 });
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to("#mobile-drawer", { y: "100%", duration: 0.3, ease: "power3.in", onComplete: onClose });
        gsap.to("#mobile-drawer-bg", { opacity: 0, duration: 0.3 });
    };

    if (!isOpen) return null;

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    return (
        <div className="fixed inset-0 z-[200] lg:hidden">
            {/* Backdrop */}
            <div
                id="mobile-drawer-bg"
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Drawer */}
            <div
                id="mobile-drawer"
                className="absolute bottom-0 left-0 w-full bg-[#111] rounded-t-3xl border-t border-white/10 max-h-[85vh] overflow-y-auto flex flex-col"
            >
                {/* Handle */}
                <div className="w-full flex justify-center pt-3 pb-1">
                    <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
                </div>

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Filters</h3>
                    <button onClick={handleClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" aria-label="Close filters">
                        <X size={20} className="text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 pb-32">

                    {/* Categories */}
                    <div className="mb-6">
                        <button
                            className="flex items-center justify-between w-full text-left mb-4"
                            onClick={() => toggleSection('categories')}
                        >
                            <span className="font-bold text-white uppercase text-xs tracking-widest">Categories</span>
                            {openSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {openSections.categories && (
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    className={`py-3 px-2 rounded-lg text-sm text-center border transition-all ${selectedCategory === 'all' ? 'bg-neon-green/20 border-neon-green text-neon-green font-bold' : 'border-white/10 text-gray-400'}`}
                                    onClick={() => setSelectedCategory('all')}
                                >
                                    All
                                </button>
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={`py-3 px-2 rounded-lg text-sm text-center border transition-all ${selectedCategory === cat.id ? 'bg-neon-green/20 border-neon-green text-neon-green font-bold' : 'border-white/10 text-gray-400'}`}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <hr className="border-white/5 my-6" />

                    {/* Price Range */}
                    <div className="mb-6">
                        <button
                            className="flex items-center justify-between w-full text-left mb-4"
                            onClick={() => toggleSection('price')}
                        >
                            <span className="font-bold text-white uppercase text-xs tracking-widest">Price Range</span>
                            {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {openSections.price && (
                            <div>
                                <div className="flex justify-between text-white mb-6 font-mono text-sm">
                                    <span>{priceRange[0].toFixed(1)} ETH</span>
                                    <span>{priceRange[1].toFixed(1)} ETH</span>
                                </div>
                                <DualRangeSlider range={priceRange} setRange={setPriceRange} />
                            </div>
                        )}
                    </div>

                    <hr className="border-white/5 my-6" />

                    {/* NFT Type */}
                    <div className="mb-6">
                        <button
                            className="flex items-center justify-between w-full text-left mb-4"
                            onClick={() => toggleSection('type')}
                        >
                            <span className="font-bold text-white uppercase text-xs tracking-widest">NFT Type</span>
                            {openSections.type ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        {openSections.type && (
                            <div className="flex flex-col gap-3">
                                {['Basic', 'Special', 'Premium', 'Legendary'].map(type => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer py-2 group">
                                        <div
                                            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${selectedTypes.includes(type) ? 'bg-neon-green border-neon-green' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}
                                            onClick={() => toggleType(type)}
                                        >
                                            {selectedTypes.includes(type) && <Check size={14} className="text-black" />}
                                        </div>
                                        <span className={`text-base font-medium transition-colors ${selectedTypes.includes(type) ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{type}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer Actions with Safe Area Inset */}
                <div className="p-6 border-t border-white/10 bg-[#111] absolute bottom-0 w-full pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
                    <button
                        onClick={handleClose}
                        className="w-full py-4 bg-neon-green text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,163,0.3)]"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileFilterDrawer;
