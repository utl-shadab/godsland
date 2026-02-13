
import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import type { IItem } from '../../utils/mockItems';
import { MOCK_WALLET } from '../../utils/mockWallet';

interface PlaceOfferDialogProps {
    isOpen: boolean;
    item: IItem;
    onClose: () => void;
}

const PlaceOfferDialog = ({ isOpen, item, onClose }: PlaceOfferDialogProps) => {
    const [offerPrice, setOfferPrice] = useState('');
    const [duration, setDuration] = useState('7days');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Offer Placed!</h2>
                    <p className="text-gray-400 mb-6">Your offer of <span className="text-white font-bold">{offerPrice} ETH</span> has been submitted.</p>
                    <button onClick={onClose} className="w-full py-3 bg-neon-green text-black font-bold rounded-lg">Done</button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X size={20} />
                </button>

                <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Make an Offer</h2>

                    <div className="flex items-center gap-4 mb-6">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded bg-slate-800" />
                        <div>
                            <p className="font-bold text-white">{item.name}</p>
                            <p className="text-xs text-gray-400">Floor: 0.52 ETH</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Offer Price (ETH)</label>
                            <input
                                type="number"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                min="0.001"
                                step="0.001"
                                placeholder="Amount"
                                required
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-neon-green outline-none font-mono"
                            />
                            <div className="flex justify-end mt-1">
                                <span className="text-xs text-gray-500">Balance: {MOCK_WALLET.balance} ETH</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Duration</label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-neon-green outline-none cursor-pointer"
                            >
                                <option value="1day">1 Day</option>
                                <option value="3days">3 Days</option>
                                <option value="7days">7 Days</option>
                                <option value="30days">30 Days</option>
                            </select>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-3 mb-6">
                            <AlertCircle className="text-blue-400 shrink-0" size={18} />
                            <p className="text-xs text-blue-200/80">
                                You must wrap your ETH to WETH to make an offer. We can handle this conversion for you in the next step.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 bg-neon-green text-black font-bold rounded-lg transition-all ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-white'}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Make Offer'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlaceOfferDialog;
