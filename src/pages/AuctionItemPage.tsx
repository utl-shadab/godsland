
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ItemHeader from '../components/auction/item/ItemHeader';
import BidHistoryTable from '../components/Tables/BidHistoryTable';
import CountdownTimer from '../components/auction/CountdownTimer';
import PlaceBidModal from '../components/Modals/PlaceBidModal';
import CreateOrderModal from '../components/Modals/CreateOrderModal';
import ItemHistory from '../components/Tables/ItemHistory';
import { Heart } from 'lucide-react';

const AuctionItemPage = () => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState('Bids');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateOrderModalOpen, setIsCreateOrderModalOpen] = useState(false);

    // Mock target date (24 hours from now)
    const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return (
        <div className="min-h-screen pt-28 pb-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Image & Basic Info (Mobile first: Image on top) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="w-full aspect-square bg-[#111] rounded-2xl overflow-hidden border border-white/5 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
                                alt="Item"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                                Live Auction
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-neon-green transition-colors">
                                    <Heart size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                            <h3 className="text-white font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                <span className="w-1 h-4 bg-neon-green rounded-full" /> Description
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Created by the renowned digital artist, this piece explores the intersection of nature and technology.
                                Featuring generative patterns and organic textures, it represents the future of digital ownership.
                            </p>
                            <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Contract Address</span>
                                    <span className="text-blue-400 font-mono cursor-pointer hover:underline">0x7a9d...4f3e</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Token ID</span>
                                    <span className="text-white font-mono">2077</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Token Standard</span>
                                    <span className="text-white">ERC-721</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Blockchain</span>
                                    <span className="text-white">Ethereum</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Market (Pro View) */}
                    <div className="lg:col-span-7">
                        <ItemHeader
                            title={slug?.replace(/-/g, ' ') || 'Unknown Item'}
                            collection="Cyber Punks Collection"
                            owner="0x3f...8a2b"
                        />

                        {/* Bid Info Box */}
                        <div className="bg-[#111] border border-white/5 rounded-2xl p-6 mb-8">

                            {/* Grid Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Next Bid</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xl font-bold text-white tabular-nums">▼ 65,100</span>
                                        <span className="text-gray-500 text-xs font-medium">~$93,834</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Max Bid</p>
                                    <p className="text-white font-bold tabular-nums text-lg">-</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Bid Step</p>
                                    <p className="text-neon-green font-bold tabular-nums text-lg">5%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Extend Time</p>
                                    <p className="text-neon-green font-bold tabular-nums text-lg">1h</p>
                                </div>
                            </div>

                            {/* Timer Center */}
                            <div className="flex justify-center mb-6">
                                <div className="text-sm font-medium text-gray-400 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                                    <span>Ends in</span>
                                    <CountdownTimer
                                        targetDate={targetDate}
                                        onEnd={() => {
                                            // Mock Auction End Logic
                                            console.log("Auction Ended");
                                            // In a real app, this would check if there's a winner and create an order
                                            // For demo, let's simulate a winning bid and redirect to order page

                                            // Simulate delay then redirect
                                            setTimeout(() => {
                                                const mockOrderId = "ord_" + Math.random().toString(36).substr(2, 9);
                                                // navigate(`/orders/${mockOrderId}`); 
                                                // Uncomment above line to enable auto-redirect. Keeping it disabled for now to not disrupt viewing the page.
                                                alert("Auction Ended! Order Created: " + mockOrderId);
                                            }, 2000);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex-1 bg-neon-green hover:bg-white text-black font-bold py-3.5 rounded-lg transition-colors uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(0,255,163,0.2)]"
                                >
                                    Place bid
                                </button>
                                {/* <button
                                    onClick={() => setIsCreateOrderModalOpen(true)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3.5 rounded-lg transition-colors uppercase tracking-wider text-sm border border-white/10"
                                >
                                    Create Order
                                </button> */}
                            </div>

                            {/* Owner / Collection Info Rows */}
                            <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-white">Owner</span>
                                    <span className="text-neon-green cursor-pointer hover:underline font-medium">0x3f...8a2b</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-white/5 pt-3">
                                    <span className="font-bold text-white">Collection</span>
                                    <div className="flex items-center gap-1 text-neon-green cursor-pointer hover:underline font-medium">
                                        <span className="w-4 h-4 rounded-full bg-neon-green/20 flex items-center justify-center text-[8px] text-neon-green">💠</span>
                                        Cyber Punks Collection
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t border-white/5 pt-3">
                                    <span className="font-bold text-white">NFT address</span>
                                    <div className="flex items-center gap-2 text-neon-green font-mono text-xs">
                                        <span>EQD3OZN...fPqfpsM-A</span>
                                        <button className="text-gray-500 hover:text-white transition-colors">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs & Content */}
                        <div className="w-full">
                            <div className="flex gap-6 border-b border-white/10 mb-0">
                                {['Bids', 'Details', 'Deal Info'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb - 3 text - sm font - bold tracking - wide border-b-2 transition - colors relative top - [1px] ${activeTab === tab
                                            ? 'border-neon-green text-white'
                                            : 'border-transparent text-gray-500 hover:text-gray-300'
                                            } `}
                                    >
                                        {tab} {tab === 'Bids' && <span className="ml-1 bg-neon-green text-black text-[10px] px-1.5 py-0.5 rounded-sm font-bold">25</span>}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-[#111] min-h-[300px] border border-white/5 border-t-0 rounded-b-xl overflow-hidden">
                                {activeTab === 'Bids' && <BidHistoryTable />}

                                {activeTab === 'Deal Info' && (
                                    <div className="p-4">
                                        <div className="flex justify-between items-center text-sm bg-white/5 p-4 rounded-lg">
                                            <span className="font-bold text-white">Marketplace</span>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded bg-neon-green/20 text-neon-green text-xs font-bold uppercase tracking-wider">Fragment</span>
                                                <span className="text-neon-green font-mono text-xs cursor-pointer hover:underline">EQBAjaOy...Kpkla9nE</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Details' && (
                                    <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
                                        Details content coming soon
                                    </div>
                                )}
                            </div>
                        </div>

                        <PlaceBidModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            bidAmount="65,100"
                            itemTitle={slug?.replace(/-/g, ' ') || 'Unknown Item'}
                            collectionName="Cyber Punks Collection"
                            imageUrl="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
                        />
                        <CreateOrderModal
                            isOpen={isCreateOrderModalOpen}
                            onClose={() => setIsCreateOrderModalOpen(false)}
                        />
                    </div>
                </div>
                {/* History Section */}
                <div className="mt-12">
                    <ItemHistory />
                </div>
            </div>

        </div>

    );
};

export default AuctionItemPage;
