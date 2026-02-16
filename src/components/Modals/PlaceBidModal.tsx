import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PlaceBidModalProps {
    isOpen: boolean;
    onClose: () => void;
    bidAmount: string;
    itemTitle: string;
    collectionName: string;
    imageUrl: string;
}

const PlaceBidModal = ({ isOpen, onClose, bidAmount, itemTitle, collectionName, imageUrl }: PlaceBidModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white">Confirm transaction</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-6">
                    {/* Item Info */}
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <img
                            src={imageUrl}
                            alt={itemTitle}
                            className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20H5.5L12 5.5z" /></svg>
                                </span>
                                <h3 className="font-bold text-white text-sm">{collectionName}</h3>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{itemTitle}</p>
                        </div>
                    </div>

                    {/* Bid Input */}
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Your bid</label>
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-neon-green font-bold">▼</span>
                                <span className="text-xl font-bold text-white tabular-nums">{bidAmount}</span>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-neon-green hover:bg-white text-black font-bold py-3.5 rounded-lg transition-colors uppercase tracking-wider text-sm mb-6 shadow-[0_0_20px_rgba(0,255,163,0.2)]">
                        Place bid
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default PlaceBidModal;
