import {
    X, ChevronDown, ChevronUp,
    Globe, MoreHorizontal, Heart, RefreshCcw, BadgeCheck,
    Twitter, Disc, Minus, Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getItemById } from '../../utils/mockItems';
import type { IItemDetail } from '../../utils/mockItems';
import BuyConfirmDialog from '../Modals/BuyConfirmDialog';
import PlaceOfferDialog from '../Modals/PlaceOfferDialog';

interface ItemModalProps {
    isOpen: boolean;
    itemId: string;
    onClose: () => void;
    onBuy?: () => void;
}

const MAX_QTY = 10;

const ItemModal = ({ isOpen, itemId, onClose, onBuy }: ItemModalProps) => {
    const [item, setItem] = useState<IItemDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Accordion States
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        traits: true,
        priceHistory: false,
        about: false,
        details: false
    });

    // Modal states
    const [showBuyDialog, setShowBuyDialog] = useState(false);
    const [showOfferDialog, setShowOfferDialog] = useState(false);

    useEffect(() => {
        if (isOpen && itemId) {
            setLoading(true);
            setQuantity(1); // reset on new item
            setTimeout(() => {
                const data = getItemById(itemId);
                setItem(data || null);
                setLoading(false);
            }, 300);
        }
    }, [isOpen, itemId]);

    const toggleSection = (section: string) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleBuyClick = () => {
        if (onBuy) {
            onBuy();
        } else {
            setShowBuyDialog(true);
        }
    };

    const decrement = () => setQuantity(q => Math.max(1, q - 1));
    const increment = () => setQuantity(q => Math.min(MAX_QTY, q + 1));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val)) setQuantity(Math.min(MAX_QTY, Math.max(1, val)));
    };

    const totalPrice = item ? (parseFloat(item.price) * quantity).toFixed(4) : '0';
    const totalUsd = (parseFloat(totalPrice) * 3402.12).toFixed(2);

    if (!isOpen) return null;

    if (loading || !item) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green"></div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/90 backdrop-blur-xl">
            <div className="min-h-screen flex items-center justify-center p-0 md:p-4">

                {/* Modal Container */}
                <div className="relative bg-[#0a0a0a] md:border md:border-white/10 md:rounded-2xl w-full max-w-7xl h-full md:h-auto min-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">

                    {/* Close Button */}
                    <div className="absolute top-0 right-0 z-20 p-4 flex gap-2">
                        <button
                            onClick={onClose}
                            className="p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* LEFT COLUMN: Image */}
                    <div className="w-full md:w-[55%] bg-[#111] flex flex-col items-center justify-center p-4 md:p-12 relative border-b md:border-b-0 md:border-r border-white/5">
                        <div className="relative w-full aspect-square max-w-[600px] rounded-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5">
                            <img
                                src={item.images[currentImageIndex]}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-white/10 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    ETH
                                </span>
                            </div>
                        </div>

                        {item.images.length > 1 && (
                            <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide max-w-full">
                                {item.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${currentImageIndex === idx ? 'border-neon-green scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Details */}
                    <div className="w-full md:w-[45%] flex flex-col h-full max-h-[100vh] md:max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-neon-green/20 bg-[#0a0a0a]">

                        <div className="p-6 md:p-8 space-y-8">

                            {/* Header Section */}
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-1.5 text-neon-green font-bold text-sm md:text-base cursor-pointer hover:text-white transition-colors">
                                        <span>{item.collection.name}</span>
                                        <BadgeCheck size={18} fill="#00ffa3" className="text-black" />
                                    </div>
                                    <div className="flex gap-1 md:gap-2 text-gray-400">
                                        <button className="p-2 hover:text-white transition-colors"><Globe size={18} /></button>
                                        <button className="p-2 hover:text-white transition-colors"><Twitter size={18} /></button>
                                        <button className="p-2 hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
                                    </div>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{item.name}</h1>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                                    <span>Owned by <span className="text-neon-green font-bold cursor-pointer hover:underline">Underground_trader</span></span>
                                    <div className="flex items-center gap-1 text-xs md:text-sm">
                                        <Heart size={14} /> <span>124 favorites</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs md:text-sm">
                                        <RefreshCcw size={14} /> <span>143 views</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300">ERC721</span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300">BASE</span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-gray-300">TOKEN ID #{item.id}</span>
                                </div>
                            </div>

                            {/* Main Box: Price & Actions */}
                            <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                                {/* Timer */}
                                <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sale ends in 14h 23m 12s</span>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Current Price</span>
                                            <span className="text-xl md:text-2xl font-bold text-white">{item.price} ETH</span>
                                            <span className="text-xs text-gray-500 block">≈ $3,402.12</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Top Offer</span>
                                            <span className="text-base font-bold text-gray-300">0.85 WETH</span>
                                            <span className="text-xs text-gray-500 block">≈ $2,832.00</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Rarity</span>
                                            <span className="text-base font-bold text-neon-green">Top 5%</span>
                                            <span className="text-xs text-gray-500 block">Rank #342</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500 block mb-1">Last Sale</span>
                                            <span className="text-base font-bold text-gray-300">0.95 ETH</span>
                                            <span className="text-xs text-gray-500 block">3 days ago</span>
                                        </div>
                                    </div>

                                    {/* ── Quantity Selector ── */}
                                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Quantity</span>
                                            <span className="text-[10px] text-gray-600 font-mono">max {MAX_QTY} per wallet</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Decrement */}
                                            <button
                                                onClick={decrement}
                                                disabled={quantity <= 1}
                                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all
                                                    ${quantity <= 1
                                                        ? 'border-white/5 text-white/15 cursor-not-allowed'
                                                        : 'border-white/10 text-white hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5 active:scale-95'
                                                    }`}
                                            >
                                                <Minus size={15} />
                                            </button>

                                            {/* Input */}
                                            <div className="flex-1 relative">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={MAX_QTY}
                                                    value={quantity}
                                                    onChange={handleInputChange}
                                                    className="w-full h-10 bg-black/40 border border-white/10 rounded-lg text-center text-white font-bold text-base
                                                        focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/20
                                                        transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                            </div>

                                            {/* Increment */}
                                            <button
                                                onClick={increment}
                                                disabled={quantity >= MAX_QTY}
                                                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all
                                                    ${quantity >= MAX_QTY
                                                        ? 'border-white/5 text-white/15 cursor-not-allowed'
                                                        : 'border-white/10 text-white hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5 active:scale-95'
                                                    }`}
                                            >
                                                <Plus size={15} />
                                            </button>

                                            {/* Quick-select pills */}
                                            <div className="hidden sm:flex gap-1.5 ml-1">
                                                {[1, 3, 5, MAX_QTY].map(q => (
                                                    <button
                                                        key={q}
                                                        onClick={() => setQuantity(q)}
                                                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border
                                                            ${quantity === q
                                                                ? 'bg-neon-green/15 border-neon-green/40 text-neon-green'
                                                                : 'border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300'
                                                            }`}
                                                    >
                                                        {q === MAX_QTY ? 'Max' : q}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Total row */}
                                        <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                                            <span className="text-xs text-gray-500">
                                                {quantity} × {item.price} ETH
                                            </span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xs text-gray-500">Total</span>
                                                <span className="text-base font-black text-white">{totalPrice} ETH</span>
                                                <span className="text-[11px] text-gray-600">≈ ${totalUsd}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* ── End Quantity Selector ── */}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            onClick={handleBuyClick}
                                            className="flex-1 py-4 bg-neon-green text-black font-black text-lg uppercase tracking-wider rounded-lg hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,255,163,0.2)]"
                                        >
                                            Buy {quantity > 1 ? `${quantity}x` : 'Now'}
                                        </button>
                                        <button
                                            onClick={() => setShowOfferDialog(true)}
                                            className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold text-lg uppercase tracking-wider rounded-lg hover:bg-white/10 hover:border-white transition-all"
                                        >
                                            Make Offer
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Accordions Section */}
                            <div className="space-y-4">

                                {/* Traits Accordion */}
                                <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111]">
                                    <button
                                        onClick={() => toggleSection('traits')}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 font-bold text-white">
                                            <span>Traits</span>
                                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">{item.traits.length}</span>
                                        </div>
                                        {openSections['traits'] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                                    </button>

                                    {openSections['traits'] && (
                                        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5">
                                            {item.traits.map((trait: any, i: number) => (
                                                <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3 hover:border-neon-green/30 transition-colors cursor-default">
                                                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1 tracking-wider">{trait.name}</span>
                                                    <span className="text-white font-bold text-sm block mb-1">{trait.value}</span>
                                                    <div className="flex justify-between items-center text-[10px] text-neon-green">
                                                        <span>21% have this</span>
                                                        <span>Floor: 0.45</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* About Accordion */}
                                <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111]">
                                    <button
                                        onClick={() => toggleSection('about')}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 font-bold text-white">
                                            <span>About {item.collection.name}</span>
                                        </div>
                                        {openSections['about'] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                                    </button>

                                    {openSections['about'] && (
                                        <div className="p-6 border-t border-white/5 text-sm text-gray-400 leading-relaxed">
                                            <p>{item.description}</p>
                                            <div className="flex gap-4 mt-4">
                                                <button className="p-2 border border-white/10 rounded-lg hover:border-white transition-colors"><Twitter size={16} /></button>
                                                <button className="p-2 border border-white/10 rounded-lg hover:border-white transition-colors"><Globe size={16} /></button>
                                                <button className="p-2 border border-white/10 rounded-lg hover:border-white transition-colors"><Disc size={16} /></button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Details Accordion */}
                                <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111]">
                                    <button
                                        onClick={() => toggleSection('details')}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 font-bold text-white">
                                            <span>Details</span>
                                        </div>
                                        {openSections['details'] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                                    </button>

                                    {openSections['details'] && (
                                        <div className="p-0 border-t border-white/5 text-sm">
                                            {[
                                                { label: 'Contract Address', value: '0x123...abc', highlight: true },
                                                { label: 'Token ID', value: item.id },
                                                { label: 'Token Standard', value: 'ERC-721' },
                                                { label: 'Chain', value: 'Ethereum' },
                                                { label: 'Creator Earnings', value: `${item.royalty}%` },
                                            ].map((row, i) => (
                                                <div key={i} className="flex justify-between px-6 py-3 hover:bg-white/5 transition-colors">
                                                    <span className="text-gray-400">{row.label}</span>
                                                    <span className={`${row.highlight ? 'text-neon-green truncate w-32 text-right' : 'text-white'}`}>{row.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="h-10"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nested Dialogs */}
            <BuyConfirmDialog
                isOpen={showBuyDialog}
                item={item}
                onClose={() => setShowBuyDialog(false)}
                onSuccess={() => { console.log('Bought!'); }}
            />

            <PlaceOfferDialog
                isOpen={showOfferDialog}
                item={item}
                onClose={() => setShowOfferDialog(false)}
            />
        </div>
    );
};

export default ItemModal;