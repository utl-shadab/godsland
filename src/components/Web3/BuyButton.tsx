import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import type { IItem } from '../../utils/mockItems';
import { MOCK_WALLET } from '../../utils/mockWallet';

interface BuyButtonProps {
    item: IItem;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    onBuy?: () => void;
}

const BuyButton = ({ item, onSuccess, onError, onBuy }: BuyButtonProps) => {
    const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
    const isListed = item.isListed;

    const handleBuy = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (onBuy) {
            onBuy();
            return;
        }

        if (!MOCK_WALLET.isConnected) {
            alert("Please connect your wallet first.");
            return;
        }

        setStatus('pending');

        // Simulate blockchain transaction
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Randomly succeed or fail for demo
            if (Math.random() > 0.1) {
                setStatus('success');
                onSuccess?.();
                // Reset after 3 seconds
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                throw new Error("Transaction rejected by network");
            }
        } catch (err: any) {
            setStatus('failed');
            onError?.(err.message);
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    if (!isListed) {
        return (
            <button disabled className="w-full py-4 bg-white/5 text-gray-500 font-black uppercase tracking-widest rounded-xl cursor-not-allowed opacity-50 border border-white/5">
                Not For Sale
            </button>
        );
    }

    const buttonStyles = {
        idle: "bg-neon-green text-black hover:bg-white hover:shadow-[0_0_20px_#00ffa366] hover:scale-[1.02]",
        pending: "bg-white/10 text-white cursor-wait",
        success: "bg-green-500 text-white cursor-default",
        failed: "bg-red-500 text-white cursor-default"
    };

    return (
        <div className="w-full flex flex-col gap-2 pb-[env(safe-area-inset-bottom)]">
            <button
                onClick={handleBuy}
                disabled={status !== 'idle'}
                className={`w-full py-4 font-black uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-transparent ${buttonStyles[status]}`}
                aria-label={status === 'idle' ? `Buy ${item.name} for ${item.price} ETH` : status}
            >
                {status === 'idle' && (
                    <span>Buy Now — {item.price} ETH</span>
                )}
                {status === 'pending' && (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Confirming...</span>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle2 size={20} />
                        <span>Purchased!</span>
                    </>
                )}
                {status === 'failed' && (
                    <>
                        <AlertCircle size={20} />
                        <span>Failed</span>
                    </>
                )}
            </button>

            {status === 'pending' && (
                <p className="text-[10px] text-center text-gray-500 animate-pulse uppercase font-bold tracking-widest">
                    Processing transaction on blockchain...
                </p>
            )}
        </div>
    );
};

export default BuyButton;
