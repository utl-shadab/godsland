
import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { MOCK_TRAITS } from '../../utils/mockTraits';

interface FilterPanelProps {
    onFiltersChange: (filters: any) => void;
}

const FilterPanel = ({ onFiltersChange }: FilterPanelProps) => {
    // TODO: Initialize from URL params if available
    const [filters, setFilters] = useState({
        status: {
            buyNow: false,
            onAuction: false,
            new: false,
            sold: false
        },
        priceRange: {
            min: 0,
            max: 1000
        },
        membershipOnly: false,
        rarityRank: { min: 0, max: 10000 },
        traits: {} as Record<string, string[]>,
        sortBy: 'newest'
    });

    const [expandedTraits, setExpandedTraits] = useState<Record<string, boolean>>({
        'Background': true,
        'Eyes': false,
        'Hat': false,
        'Rarity': false
    });

    const toggleTraitGroup = (group: string) => {
        setExpandedTraits(prev => ({ ...prev, [group]: !prev[group] }));
    };

    const handleStatusChange = (key: keyof typeof filters.status) => {
        const newStatus = { ...filters.status, [key]: !filters.status[key] };
        updateFilters({ ...filters, status: newStatus });
    };

    const handlePriceChange = (key: 'min' | 'max', value: string) => {
        const numVal = parseFloat(value) || 0;
        const newPrice = { ...filters.priceRange, [key]: numVal };
        updateFilters({ ...filters, priceRange: newPrice });
    };

    const handleTraitToggle = (group: string, value: string) => {
        const currentTraits = filters.traits[group] || [];
        const newGroupTraits = currentTraits.includes(value)
            ? currentTraits.filter(t => t !== value)
            : [...currentTraits, value];

        const newTraits = { ...filters.traits, [group]: newGroupTraits };
        if (newGroupTraits.length === 0) delete newTraits[group];

        updateFilters({ ...filters, traits: newTraits });
    };

    const updateFilters = (newFilters: any) => {
        setFilters(newFilters);
        onFiltersChange(newFilters); // Real-time
    };

    const applyFilters = () => {
        onFiltersChange(filters);
    };

    const clearAll = () => {
        const reset = {
            status: { buyNow: false, onAuction: false, new: false, sold: false },
            priceRange: { min: 0, max: 1000 },
            membershipOnly: false,
            rarityRank: { min: 0, max: 10000 },
            traits: {},
            sortBy: 'newest'
        };
        setFilters(reset);
        onFiltersChange(reset);
    };

    return (
        <div className="sticky top-24 bg-black/95 backdrop-blur-md border border-white/10 rounded-lg p-4 md:p-6 text-white h-[calc(100vh-140px)] scrollbar-hide overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">🎛️ FILTERS</h3>
                <button onClick={clearAll} className="text-xs text-neon-green hover:underline">Clear All</button>
            </div>

            {/* Status */}
            <div className="mb-6 border-b border-white/10 pb-6">
                <h4 className="text-xs font-bold text-neon-green uppercase mb-3">★ STATUS</h4>
                <div className="space-y-2">
                    {Object.entries(filters.status).map(([key, value]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${value ? 'bg-neon-green border-neon-green' : 'border-slate-600 group-hover:border-neon-green/50'}`}>
                                {value && <span className="text-black text-[10px] font-bold">✓</span>}
                            </div>
                            <input type="checkbox" className="hidden" checked={value} onChange={() => handleStatusChange(key as any)} />
                            <span className="text-sm text-gray-300 capitalize group-hover:text-white transition-colors">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Membership Only */}
            <div className="mb-6 border-b border-white/10 pb-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.membershipOnly ? 'bg-gold-start border-gold-start' : 'border-slate-600 group-hover:border-gold-start/50'}`}>
                        {filters.membershipOnly && <span className="text-black text-[10px] font-bold">✓</span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={filters.membershipOnly} onChange={() => updateFilters({ ...filters, membershipOnly: !filters.membershipOnly })} />
                    <span className="text-sm text-gold-start font-bold capitalize group-hover:text-yellow-200 transition-colors">
                        Membership Gated Only
                    </span>
                </label>
            </div>

            {/* Price Range */}
            <div className="mb-6 border-b border-slate-800 pb-6">
                <h4 className="text-xs font-bold text-neon-green uppercase mb-3">★ PRICE RANGE (ETH)</h4>
                <div className="flex gap-2 items-center">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min || ''}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:border-neon-green outline-none"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max || ''}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm focus:border-neon-green outline-none"
                    />
                </div>
            </div>

            {/* Traits */}
            <div className="mb-6">
                <h4 className="text-xs font-bold text-neon-green uppercase mb-3">★ TRAITS</h4>
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                    <input
                        type="text"
                        placeholder="Search traits..."
                        className="w-full bg-slate-800 border border-slate-700 rounded pl-9 pr-3 py-2 text-sm focus:border-neon-green outline-none"
                    />
                </div>

                <div className="space-y-2">
                    {Object.entries(MOCK_TRAITS).map(([group, traits]) => (
                        <div key={group} className="border border-slate-800 rounded overflow-hidden">
                            <button
                                onClick={() => toggleTraitGroup(group)}
                                className="w-full flex justify-between items-center p-3 bg-slate-800/50 hover:bg-slate-800 transition-colors"
                            >
                                <span className="text-sm font-medium">{group}</span>
                                {expandedTraits[group] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {expandedTraits[group] && (
                                <div className="p-3 bg-slate-900/50 space-y-2 max-h-40 overflow-y-auto scrollbar-hide">
                                    {traits.map(trait => {
                                        const isSelected = filters.traits[group]?.includes(trait.name);
                                        return (
                                            <label key={trait.name} className="flex justify-between items-center cursor-pointer group">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-sm border flex items-center justify-center transition-colors ${isSelected ? 'bg-neon-green border-neon-green' : 'border-slate-600 group-hover:border-neon-green/50'}`}>
                                                        {isSelected && <span className="text-black text-[8px] font-bold">✓</span>}
                                                    </div>
                                                    <input type="checkbox" className="hidden" checked={isSelected || false} onChange={() => handleTraitToggle(group, trait.name)} />
                                                    <span className={`text-sm ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                                        {trait.name}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-600">{trait.count}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={applyFilters}
                className="w-full py-3 bg-neon-green text-black font-bold rounded hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,255,163,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterPanel;
