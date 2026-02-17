import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Minus, Plus, Globe, Twitter, MessageCircle } from 'lucide-react';
import CheckoutModal from '../components/Checkout/CheckoutModal';

const MintPage = () => {
    const { slug } = useParams();
    const [mintAmount, setMintAmount] = useState(1);
    const maxMintPerWallet = 5;
    const price = 0.05;
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    // Mock item for checkout
    const checkoutItem = {
        title: slug?.replace(/-/g, ' ') || 'Cyber Punks',
        price: `${price} ETH`,
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200",
        collection: { name: "DigitalArtLabs" },
        id: "Mint"
    };

    const handleIncrement = () => {
        if (mintAmount < maxMintPerWallet) setMintAmount(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (mintAmount > 1) setMintAmount(prev => prev - 1);
    };

    return (
        <div className="min-h-screen bg-black pt-28 pb-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Media Preview */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-[#111] rounded-2xl overflow-hidden border border-white/5 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200"
                                alt="Collection Preview"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs font-bold text-neon-green uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                                Live Minting
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Mint Interface */}
                    <div className="lg:col-span-5 flex flex-col gap-8">

                        {/* Header Info */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-tight">
                                {slug?.replace(/-/g, ' ') || 'Cyber Punks'}
                                <span className="text-neon-green">.</span>
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-neon-green to-blue-500" />
                                    <span className="text-gray-400 font-medium">By <span className="text-white hover:text-neon-green cursor-pointer transition-colors">DigitalArtLabs</span></span>
                                </div>
                                <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                                    <Globe size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
                                    <Twitter size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
                                    <MessageCircle size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                Dive into the neon-soaked streets of the metaverse. This connection features 10,000 unique avatars, each generated from over 150 hand-drawn traits. Owning a Cyber Punk grants you exclusive access to the hidden realms of GodsLand.
                            </p>
                        </div>

                        {/* Mint Progress */}
                        <div className="bg-[#111] rounded-xl p-6 border border-white/5">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Minted</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-neon-green font-bold text-xl tabular-nums">1,245</span>
                                    <span className="text-gray-500 text-sm font-medium">/ 10,000</span>
                                </div>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-neon-green w-[12.45%] shadow-[0_0_10px_#00d32c]" />
                            </div>
                        </div>

                        {/* Mint Controls */}
                        <div className="bg-[#111] rounded-xl p-6 border border-white/5 flex flex-col gap-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-blue-500 to-purple-500 opacity-50" />

                            {/* Price & Balance */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Price</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-white tabular-nums">{price} ETH</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Your Balance</p>
                                    <p className="text-white font-medium text-sm tabular-nums">0.42 ETH</p>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center justify-between bg-black/50 rounded-lg p-2 border border-white/5">
                                <button
                                    onClick={handleDecrement}
                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-white transition-colors disabled:opacity-50"
                                    disabled={mintAmount <= 1}
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-xl font-bold text-white tabular-nums">{mintAmount}</span>
                                <button
                                    onClick={handleIncrement}
                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-white transition-colors disabled:opacity-50"
                                    disabled={mintAmount >= maxMintPerWallet}
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-medium">Total Price</span>
                                <span className="text-xl font-bold text-white tabular-nums">{(price * mintAmount).toFixed(2)} ETH</span>
                            </div>

                            <button
                                onClick={() => setIsCheckoutModalOpen(true)}
                                className="w-full bg-neon-green hover:bg-white text-black font-bold py-4 rounded-lg transition-colors uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(0,255,163,0.2)]"
                            >
                                Connect wallet to Mint
                            </button>
                        </div>

                        {/* Phases Info */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#111] border border-neon-green/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                                    <div>
                                        <p className="text-white font-bold text-sm">Public Sale</p>
                                        <p className="text-gray-500 text-xs">Open to everyone</p>
                                    </div>
                                </div>
                                <span className="bg-neon-green/10 text-neon-green px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-neon-green/20">Live</span>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#111] border border-white/5 rounded-lg opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-gray-600" />
                                    <div>
                                        <p className="text-white font-bold text-sm">Whitelist</p>
                                        <p className="text-gray-500 text-xs">Ended yesterday</p>
                                    </div>
                                </div>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Ended</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                item={checkoutItem}
            />
        </div>
    );
};

export default MintPage;
