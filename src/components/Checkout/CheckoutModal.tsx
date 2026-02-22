import { useRef, useState, useEffect } from 'react';
import { X, ShieldCheck, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any; // Ideally strictly typed
}

const CheckoutModal = ({ isOpen, onClose, item }: CheckoutModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState<'wallet' | 'review'>('wallet');
    const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(modalRef.current,
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.3 }
            );
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
            );
        }
    }, { dependencies: [isOpen] });

    useEffect(() => {
        if (isOpen) {
            setStep('wallet'); // Always start at wallet for demo
            setSelectedWallet(null);
        }
    }, [isOpen]);

    const handleConnect = (wallet: string) => {
        setSelectedWallet(wallet);
        // Mock connection delay
        setTimeout(() => {
            setStep('review');
        }, 800);
    };

    if (!isOpen) return null;

    // Fees Calculation (Mock)
    const price = item ? parseFloat(item.price.replace(' ETH', '')) : 0;
    const serviceFee = price * 0.025; // 2.5%
    const royaltyFee = price * 0.05; // 5%
    const total = price + serviceFee + royaltyFee;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                ref={contentRef}
                className="w-full md:w-[600px] bg-[#0a0a0a] border border-white/10 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#111]">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                        {step === 'wallet' ? 'Connect Wallet' : 'Complete Checkout'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {step === 'wallet' ? (
                    <div className="p-6 md:p-8">
                        <p className="text-gray-400 mb-6 text-sm">
                            Connect your wallet to purchase <span className="text-white font-bold">{item?.title || item?.name}</span>.
                        </p>

                        <div className="space-y-3">
                            {[
                                { name: 'MetaMask', color: '#F6851B', icon: '🦊' },
                                { name: 'Coinbase Wallet', color: '#0052FF', icon: '🔵' },
                                { name: 'WalletConnect', color: '#3B99FC', icon: '📡' },
                                { name: 'Phantom', color: '#AB9FF2', icon: '👻' },
                            ].map((wallet) => (
                                <button
                                    key={wallet.name}
                                    onClick={() => handleConnect(wallet.name)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all group ${selectedWallet === wallet.name ? 'border-neon-green bg-neon-green/10' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-xl">
                                            {wallet.icon}
                                        </div>
                                        <span className="font-bold text-white group-hover:text-neon-green transition-colors">{wallet.name}</span>
                                    </div>
                                    {selectedWallet === wallet.name ? (
                                        <div className="w-4 h-4 border-2 border-neon-green border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <ChevronRight size={20} className="text-gray-500 group-hover:text-white" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <p className="mt-6 text-center text-xs text-gray-500">
                            By connecting, you agree to our <a href="#" className="underline hover:text-white">Terms of Service</a>.
                        </p>
                    </div>
                ) : (
                    <div className="p-6 md:p-8">
                        {/* Item Summary */}
                        {item && (
                            <div className="flex gap-4 mb-8">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                                    <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-neon-green text-sm font-bold uppercase tracking-wider mb-1">
                                        {item.collection?.name || "Collection"}
                                    </span>
                                    <h3 className="text-white font-bold text-lg">{item.title || item.name}</h3>
                                    <span className="text-gray-500 text-xs mt-1">Token ID: #{item.id}</span>
                                </div>
                            </div>
                        )}

                        {/* Price Breakdown */}
                        <div className="bg-white/5 rounded-lg p-4 mb-8 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Item Price</span>
                                <span className="text-white font-mono">{price.toFixed(4)} ETH</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Service Fee (2.5%)</span>
                                <span className="text-white font-mono">{serviceFee.toFixed(4)} ETH</span>
                            </div>
                                     <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Quantity </span>
                                <span className="text-white font-mono"> 7</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Creator Royalty (5%)</span>
                                <span className="text-white font-mono">{royaltyFee.toFixed(4)} ETH</span>
                            </div>
                            <div className="h-px bg-white/10 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-bold">Total</span>
                                <div className="text-right">
                                    <span className="text-xl font-bold text-neon-green font-mono block">{total.toFixed(4)} ETH</span>
                                    <span className="text-xs text-gray-500">~ ${(total * 2500).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                            <button className="w-full py-4 bg-neon-green text-black font-bold text-lg rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,163,0.3)] flex items-center justify-center gap-2">
                                Confirm Purchase
                            </button>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                <ShieldCheck size={14} className="text-neon-green" />
                                <span>Verified Safe Transaction</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
