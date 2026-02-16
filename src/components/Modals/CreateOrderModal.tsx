import { X, ChevronDown, Info } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface CreateOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateOrderModal = ({ isOpen, onClose }: CreateOrderModalProps) => {
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
                <div className="flex items-center justify-between p-6 pb-2">
                    <h2 className="text-xl font-bold text-white">Create order</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-5">

                    {/* Price Input */}
                    <div>
                        <label className="text-sm font-bold text-white mb-2 block">Price per 1 NFT</label>
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3 focus-within:border-neon-green transition-colors">
                            <span className="text-neon-green font-bold text-sm">▼</span>
                            <input
                                type="text"
                                placeholder="Min: 0.1"
                                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600 font-medium"
                            />
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="text-sm font-bold text-white mb-2 block">Amount of NFTs</label>
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 flex items-center gap-3 focus-within:border-neon-green transition-colors">
                            <input
                                type="text"
                                placeholder="Min: 1"
                                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600 font-medium"
                            />
                        </div>
                    </div>

                    {/* Duration Input */}
                    <div>
                        <label className="text-sm font-bold text-white mb-2 block">Duration</label>
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer hover:border-white/20 transition-colors group">
                            <span className="text-gray-400 text-sm font-medium">30 days max.</span>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-sm">Days</span>
                                <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Create Button */}
                    <button className="w-full bg-neon-green hover:bg-white text-black font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(0,255,163,0.2)]">
                        <span className="text-lg font-bold">+</span> Create Order
                    </button>

                    {/* Info Box */}
                    <div className="bg-[#1a1a1a] rounded-lg p-4 flex gap-3 items-start border border-white/5">
                        <div className="mt-0.5 text-neon-green shrink-0">
                            <Info size={16} />
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Plus <span className="text-neon-green font-bold">▼ 0.5</span>. This value will be used to cover blockchain fees and the rest will back to you after order is done.
                        </p>
                    </div>

                    {/* Other Params */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">Other params</h3>
                        <div className="bg-[#1a1a1a] rounded-lg border border-white/5 overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b border-white/5">
                                <span className="text-sm font-bold text-white">Marketplace fee</span>
                                <span className="text-sm font-bold text-white">1%</span>
                            </div>
                            <div className="flex justify-between items-center p-4">
                                <span className="text-sm font-bold text-white">Royalty</span>
                                <span className="text-sm font-bold text-white">No</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
};

export default CreateOrderModal;
