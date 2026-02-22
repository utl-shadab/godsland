
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
        <div className="min-h-screen pt-20 md:pt-28 pb-16 md:pb-24 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

                    {/* Left Column: Image & Basic Info */}
                    <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
                        <div className="lg:sticky lg:top-28">
                            <div className="w-full aspect-square bg-[#111] rounded-xl md:rounded-2xl overflow-hidden border border-white/5 relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
                                    alt="Item"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/60 backdrop-blur-md px-2.5 py-1 md:px-3 rounded-full border border-white/10 text-[10px] md:text-xs font-bold text-white uppercase tracking-wider">
                                    Live Auction
                                </div>
                                <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
                                    <button className="p-1.5 md:p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-neon-green transition-colors duration-300">
                                        <Heart size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Description Box */}
                            <div className="bg-[#111] border border-white/5 rounded-xl p-4 md:p-6 mt-4 md:mt-6">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-neon-green rounded-full" /> Description
                                </h3>
                                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                                    Created by the renowned digital artist, this piece explores the intersection of nature and technology.
                                    Featuring generative patterns and organic textures, it represents the future of digital ownership.
                                </p>
                                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/5 flex flex-col gap-2">
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-gray-500">Contract Address</span>
                                        <span className="text-blue-400 font-mono cursor-pointer hover:underline truncate ml-4">0x7a9d...4f3e</span>
                                    </div>
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-gray-500">Token ID</span>
                                        <span className="text-white font-mono">2077</span>
                                    </div>
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-gray-500">Token Standard</span>
                                        <span className="text-white">ERC-721</span>
                                    </div>
                                    <div className="flex justify-between text-xs md:text-sm">
                                        <span className="text-gray-500">Blockchain</span>
                                        <span className="text-white">Ethereum</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Market */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <ItemHeader
                            title={slug?.replace(/-/g, ' ') || 'Unknown Item'}
                            collection="Cyber Punks Collection"
                            owner="0x3f...8a2b"
                        />

                        {/* Bid Info Box */}
                        <div className="bg-[#111] border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-6">

                            {/* Grid Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-5 md:mb-6">
                                <div>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Next Bid</p>
                                    <div className="flex items-baseline gap-1 flex-wrap">
                                        <span className="text-lg md:text-xl font-bold text-white tabular-nums">▼ 65,100</span>
                                        <span className="text-gray-500 text-[10px] md:text-xs font-medium">~$93,834</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Max Bid</p>
                                    <p className="text-white font-bold tabular-nums text-base md:text-lg">-</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Bid Step</p>
                                    <p className="text-neon-green font-bold tabular-nums text-base md:text-lg">5%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Extend Time</p>
                                    <p className="text-neon-green font-bold tabular-nums text-base md:text-lg">1h</p>
                                </div>
                            </div>

                            {/* Timer Center */}
                            <div className="flex justify-center mb-5 md:mb-6">
                                <div className="text-xs md:text-sm font-medium text-gray-400 flex items-center gap-2 bg-white/5 px-3 md:px-4 py-2 rounded-lg border border-white/5">
                                    <span>Ends in</span>
                                    <CountdownTimer
                                        targetDate={targetDate}
                                        onEnd={() => {
                                            console.log("Auction Ended");
                                            setTimeout(() => {
                                                const mockOrderId = "ord_" + Math.random().toString(36).substr(2, 9);
                                                alert("Auction Ended! Order Created: " + mockOrderId);
                                            }, 2000);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-5 md:mb-6">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="flex-1 bg-neon-green hover:bg-white text-black font-bold py-3 md:py-3.5 rounded-lg transition-all duration-300 uppercase tracking-wider text-xs md:text-sm shadow-[0_0_20px_rgba(0,255,163,0.2)] hover:shadow-[0_0_30px_rgba(0,255,163,0.3)] active:scale-[0.98]"
                                >
                                    Place bid
                                </button>
                            </div>

                            {/* Owner / Collection Info Rows */}
                            <div className="flex flex-col gap-3 border-t border-white/5 pt-4">
                                <div className="flex justify-between items-center text-xs md:text-sm">
                                    <span className="font-bold text-white">Owner</span>
                                    <span className="text-neon-green cursor-pointer hover:underline font-medium">0x3f...8a2b</span>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm border-t border-white/5 pt-3">
                                    <span className="font-bold text-white">Collection</span>
                                    <div className="flex items-center gap-1 text-neon-green cursor-pointer hover:underline font-medium">
                                        <span className="w-4 h-4 rounded-full bg-neon-green/20 flex items-center justify-center text-[8px] text-neon-green">💠</span>
                                        Cyber Punks Collection
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs md:text-sm border-t border-white/5 pt-3">
                                    <span className="font-bold text-white">NFT address</span>
                                    <div className="flex items-center gap-2 text-neon-green font-mono text-[10px] md:text-xs">
                                        <span className="truncate max-w-[120px] sm:max-w-none">EQD3OZN...fPqfpsM-A</span>
                                        <button className="text-gray-500 hover:text-white transition-colors flex-shrink-0">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabs & Content */}
                        <div className="w-full">
                            <div className="flex gap-4 md:gap-6 border-b border-white/10 mb-0">
                                {['Bids', 'Details', 'Deal Info'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 text-xs md:text-sm font-bold tracking-wide border-b-2 transition-colors relative top-[1px] ${activeTab === tab
                                            ? 'border-neon-green text-white'
                                            : 'border-transparent text-gray-500 hover:text-gray-300'
                                            }`}
                                    >
                                        {tab} {tab === 'Bids' && <span className="ml-1 bg-neon-green text-black text-[10px] px-1.5 py-0.5 rounded-sm font-bold">25</span>}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-[#111] min-h-[250px] md:min-h-[300px] border border-white/5 border-t-0 rounded-b-xl overflow-hidden">
                                {activeTab === 'Bids' && <BidHistoryTable />}

                                {activeTab === 'Deal Info' && (
                                    <div className="p-3 md:p-4">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs md:text-sm bg-white/5 p-3 md:p-4 rounded-lg">
                                            <span className="font-bold text-white">Marketplace</span>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded bg-neon-green/20 text-neon-green text-[10px] md:text-xs font-bold uppercase tracking-wider">Fragment</span>
                                                <span className="text-neon-green font-mono text-[10px] md:text-xs cursor-pointer hover:underline">EQBAjaOy...Kpkla9nE</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Details' && (
                                    <div className="flex items-center justify-center h-48 text-gray-500 text-xs md:text-sm">
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
                <div className="mt-8 md:mt-12">
                    <ItemHistory />
                </div>
            </div>
        </div>
    );
};

export default AuctionItemPage;

