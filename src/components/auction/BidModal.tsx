import { useState, useEffect } from 'react';
import { X, Gavel, AlertCircle } from 'lucide-react';
import type { Auction } from './AuctionCard';

interface BidModalProps {
    isOpen: boolean;
    onClose: () => void;
    auction: Auction | null;
    onSubmitBid: (auctionId: string, amount: string) => void;
}

const BidModal = ({ isOpen, onClose, auction, onSubmitBid }: BidModalProps) => {
    const [bidAmount, setBidAmount] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setBidAmount('');
            setError('');
        }
    }, [isOpen]);

    if (!isOpen || !auction) return null;

    const currentBidValue = parseFloat(auction.currentBid.replace(/[^0-9.]/g, ''));
    const minBid = currentBidValue + 0.1; // Min increment logic

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const bid = parseFloat(bidAmount);

        if (isNaN(bid) || bid < minBid) {
            setError(`Bid must be at least ${minBid.toFixed(2)} ETH`);
            return;
        }

        onSubmitBid(auction.id, `${bid.toFixed(2)} ETH`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-6 shadow-[0_0_50px_rgba(0,255,163,0.1)] transform transition-all animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-wider">Place a Bid</h2>
                <p className="text-sm text-gray-400 mb-6">You are bidding on <span className="text-neon-green">{auction.title}</span></p>

                <div className="bg-white/5 rounded-xl p-4 mb-6 flex items-center gap-4">
                    <img src={auction.image} alt={auction.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Current Bid</p>
                        <p className="text-xl font-bold text-white tabular-nums">{auction.currentBid}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"> Your Bid (ETH) </label>
                        <input
                            type="number"
                            step="0.01"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-green focus:outline-none transition-colors tabular-nums font-bold"
                            placeholder={`Min ${minBid.toFixed(2)}`}
                            autoFocus
                        />
                        {error && (
                            <div className="flex items-center gap-2 mt-2 text-red-400 text-xs">
                                <AlertCircle size={12} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-white/5">
                        <span>Service Fee</span>
                        <span>0.001 ETH</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-neon-green text-black font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        <Gavel size={16} /> Place Bid
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BidModal;
