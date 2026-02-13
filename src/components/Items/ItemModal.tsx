
import { useState, useEffect } from 'react';
import { X, ExternalLink, Share2 } from 'lucide-react';
import { getItemById } from '../../utils/mockItems';
import type { IItemDetail } from '../../utils/mockItems';
import BuyButton from '../Web3/BuyButton';
import BuyConfirmDialog from '../Modals/BuyConfirmDialog';
import PlaceOfferDialog from '../Modals/PlaceOfferDialog';

interface ItemModalProps {
    isOpen: boolean;
    itemId: string;
    onClose: () => void;
}

const ItemModal = ({ isOpen, itemId, onClose }: ItemModalProps) => {
    const [item, setItem] = useState<IItemDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState<'overview' | 'traits' | 'activity'>('overview');

    // Modal states
    const [showBuyDialog, setShowBuyDialog] = useState(false);
    const [showOfferDialog, setShowOfferDialog] = useState(false);

    useEffect(() => {
        if (isOpen && itemId) {
            setLoading(true);
            setTimeout(() => {
                const data = getItemById(itemId);
                setItem(data || null);
                setLoading(false);
            }, 500);
        }
    }, [isOpen, itemId]);

    if (!isOpen) return null;

    if (loading || !item) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-green"></div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md">
            <div className="min-h-screen flex items-center justify-center p-4">
                {/* Modal Container */}
                <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl">

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all"
                    >
                        <X size={24} />
                    </button>

                    {/* Left: Image Gallery */}
                    <div className="w-full md:w-1/2 bg-black/50 p-6 md:p-10 flex flex-col justify-center items-center relative">
                        <div className="relative w-full aspect-square max-w-[500px] rounded-xl overflow-hidden bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                            <img
                                src={item.images[currentImageIndex]}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Image Nav */}
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide max-w-[500px]">
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
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col h-[600px] md:h-auto overflow-y-auto scrollbar-thin scrollbar-thumb-neon-green/20">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-neon-green font-bold text-sm uppercase tracking-wider mb-1">
                                        {item.collection.name}
                                    </h4>
                                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{item.name}</h1>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <Share2 size={18} />
                                    </button>
                                    <button className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>Owned by</span>
                                <span className="text-blue-400 font-bold hover:underline cursor-pointer">0x12..34</span>
                            </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 mb-8">
                            <div className="flex flex-col gap-2 mb-6">
                                <span className="text-gray-400 text-sm">Current Price</span>
                                <div className="flex items-end gap-3">
                                    <span className="text-3xl md:text-4xl font-bold text-white">{item.price} ETH</span>
                                    <span className="text-gray-500 mb-1">$1,850.42</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <BuyButton
                                        item={item}
                                        onBuy={() => setShowBuyDialog(true)}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowOfferDialog(true)}
                                    className="flex-1 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
                                >
                                    Make Offer
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-6 border-b border-white/10 mb-6">
                            {(['overview', 'traits', 'activity'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab ? 'text-neon-green' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green"></span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-white mb-2">Description</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-xs text-gray-500 uppercase block mb-1">Creator Royalty</span>
                                            <span className="font-bold text-white">{item.royalty}%</span>
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-xs text-gray-500 uppercase block mb-1">Token Standard</span>
                                            <span className="font-bold text-white">ERC-721</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'traits' && (
                                <div className="grid grid-cols-2 gap-3">
                                    {item.traits.map((trait: any, i: number) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                                            <span className="text-xs text-neon-green uppercase font-bold block mb-1">{trait.name}</span>
                                            <span className="text-white font-bold block mb-1">{trait.value}</span>
                                            <span className="text-xs text-gray-500">21% have this</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'activity' && (
                                <div className="space-y-4">
                                    {item.transactionHistory.map((tx: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold capitalize">{tx.type}</span>
                                                <span className="text-xs text-gray-500">{tx.date}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-white font-bold block">{tx.price} ETH</span>
                                                <span className="text-xs text-blue-400 font-mono">From: 0x...{tx.from.slice(-4)}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {item.transactionHistory.length === 0 && <p className="text-gray-500 italic text-sm">No activity yet</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Nested Dialogs */}
            <BuyConfirmDialog
                isOpen={showBuyDialog}
                item={item}
                onClose={() => setShowBuyDialog(false)}
                onSuccess={() => {
                    // Refresh item or show global success
                    console.log('Bought!');
                }}
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
