
import { useState } from 'react';
import { X, CheckCircle, ExternalLink, AlertTriangle } from 'lucide-react';
import type { IItem } from '../../utils/mockItems';

interface BuyConfirmDialogProps {
    isOpen: boolean;
    item: IItem;
    onClose: () => void;
    onSuccess: () => void;
}

const BuyConfirmDialog = ({ isOpen, item, onClose, onSuccess }: BuyConfirmDialogProps) => {
    const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
    const [txHash, setTxHash] = useState('');
    const [agreed, setAgreed] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = () => {
        setStep('processing');

        // Mock transaction
        setTimeout(() => {
            const mockHash = '0x' + Math.random().toString(16).substr(2, 40);
            setTxHash(mockHash);
            setStep('success');
        }, 2000);
    };

    const handleDone = () => {
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl">
                {/* Close Button */}
                {step !== 'processing' && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                )}

                <div className="p-6">
                    {step === 'confirm' && (
                        <>
                            <h2 className="text-xl font-bold text-white mb-6">Confirm Purchase</h2>

                            <div className="flex items-center gap-4 mb-6 bg-slate-800/50 p-4 rounded-xl">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div>
                                    <p className="text-gray-400 text-xs uppercase font-bold">You are buying</p>
                                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                    <p className="text-gray-400 text-sm">from collection</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Item Price</span>
                                    <span className="text-white font-bold">{item.price} ETH</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Gas Fee (est.)</span>
                                    <span className="text-white">0.0087 ETH</span>
                                </div>
                                <div className="h-px bg-slate-700 my-2"></div>
                                <div className="flex justify-between text-base">
                                    <span className="text-white font-bold">Total</span>
                                    <span className="text-neon-green font-bold">{(item.price! + 0.0087).toFixed(4)} ETH</span>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex gap-3 mb-6">
                                <AlertTriangle className="text-yellow-500 shrink-0" size={18} />
                                <div className="text-xs text-yellow-200/80">
                                    This transaction cannot be reversed. Please confirm you are buying the correct item.
                                </div>
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                                <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${agreed ? 'bg-neon-green border-neon-green' : 'border-slate-500 group-hover:border-neon-green'}`}>
                                    {agreed && <CheckCircle size={10} className="text-black" />}
                                </div>
                                <input type="checkbox" className="hidden" checked={agreed} onChange={() => setAgreed(!agreed)} />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                    I understand that I am interacting with a smart contract and this action is final.
                                </span>
                            </label>

                            <button
                                onClick={handleConfirm}
                                disabled={!agreed}
                                className={`w-full py-3 rounded-lg font-bold transition-all ${agreed ? 'bg-neon-green text-black hover:bg-white shadow-[0_0_15px_rgba(0,255,163,0.3)]' : 'bg-slate-800 text-gray-500 cursor-not-allowed'}`}
                            >
                                Confirm Purchase
                            </button>
                        </>
                    )}

                    {step === 'processing' && (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 border-4 border-slate-700 border-t-neon-green rounded-full animate-spin mb-6"></div>
                            <h3 className="text-white font-bold text-lg mb-2">Processing Transaction</h3>
                            <p className="text-gray-400 text-sm text-center">Please wait while your transaction is confirmed on the blockchain...</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h2>
                            <p className="text-gray-400 text-center mb-6">You are now the owner of <span className="text-white font-bold">{item.name}</span></p>

                            <a
                                href={`https://etherscan.io/tx/${txHash}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-neon-green text-sm hover:underline mb-8"
                            >
                                View on Etherscan <ExternalLink size={14} />
                            </a>

                            <button
                                onClick={handleDone}
                                className="w-full py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuyConfirmDialog;
