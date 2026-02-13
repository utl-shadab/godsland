
import type { IItem } from '../../utils/mockItems';
import { MOCK_WALLET } from '../../utils/mockWallet';

interface BuyButtonProps {
    item: IItem;
    onSuccess?: () => void;
    onError?: (error: string) => void;
    onBuy: () => void; // Trigger the confirmation dialog in parent
}

const BuyButton = ({ item, onBuy }: BuyButtonProps) => {
    const isListed = item.isListed;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!MOCK_WALLET.isConnected) {
            alert("Connect wallet first (Mock: Assume connected)");
            return;
        }
        onBuy();
    };

    if (!isListed) {
        return (
            <button disabled className="w-full py-3 bg-slate-800 text-gray-400 font-bold rounded-lg cursor-not-allowed opacity-50">
                Not For Sale
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,163,0.3)] hover:scale-[1.02]"
        >
            Buy Now for {item.price} ETH
        </button>
    );
};

export default BuyButton;
