import { useState } from 'react';
import AuctionStats from '../components/auction/AuctionStats';
import CategoryTabs from '../components/auction/CategoryTabs';
import AuctionGrid from '../components/auction/AuctionGrid';
import HistoryTable from '../components/auction/HistoryTable';
import type { Auction } from '../components/auction/AuctionCard';
import { Zap, Clock } from 'lucide-react';

// Mock Data
const MOCK_AUCTIONS: Auction[] = [
    {
        id: '1', title: 'Cyber Punk #2077',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
        currentBid: '2.5 ETH', bids: 12, endsAt: new Date(Date.now() + 1000 * 60 * 60 * 5),
        category: 'Art', status: 'live'
    },
    {
        id: '2', title: 'Golden Ape Exclusive',
        image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600',
        currentBid: '1.8 ETH', bids: 8, endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
        category: 'Collectibles', status: 'live'
    },
    {
        id: '3', title: 'Virtual Villa Key',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
        currentBid: '5.0 ETH', bids: 24, endsAt: new Date(Date.now() + 1000 * 60 * 30),
        category: 'Virtual Worlds', status: 'live'
    },
    {
        id: '4', title: 'Neon Genesis #001',
        image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600',
        currentBid: '0.9 ETH', bids: 5, endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        category: 'Photography', status: 'live'
    },
    {
        id: '5', title: 'Sound Wave Alpha',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
        currentBid: '1.2 ETH', bids: 15, endsAt: new Date(Date.now() - 1000 * 60 * 60),
        category: 'Music', status: 'ended', winner: '0x3f...8a2b'
    },
    {
        id: '6', title: 'Ethereal Spirit',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600',
        currentBid: '3.3 ETH', bids: 30, endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        category: 'Art', status: 'ended', winner: '0x9c...1d4e'
    },
    {
        id: '7', title: 'Future City Pass',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600',
        currentBid: '0.5 ETH', bids: 4, endsAt: new Date(Date.now() + 1000 * 60 * 60 * 10),
        category: 'Utility', status: 'live'
    },
    {
        id: '8', title: 'Retro Game Cartridge',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
        currentBid: '0.2 ETH', bids: 2, endsAt: new Date(Date.now() + 1000 * 60 * 45),
        category: 'Trading Cards', status: 'live'
    }
];

type StatusTab = 'live' | 'ended';

const AuctionPage = () => {
    const [auctions] = useState<Auction[]>(MOCK_AUCTIONS);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeStatus, setActiveStatus] = useState<StatusTab>('live');

    const liveCount = auctions.filter(a => a.status === 'live').length;
    const endedCount = auctions.filter(a => a.status === 'ended').length;

    // Grid: only live, filtered by category
    const liveAuctions = auctions.filter(a => {
        const matchesCategory = activeCategory === 'All' || a.category === activeCategory;
        return a.status === 'live' && matchesCategory;
    });

    // Table: all live or all ended based on tab (no category filter)
    const tableAuctions = auctions.filter(a => a.status === activeStatus);

    return (
        <div className="min-h-screen pt-32 pb-24 bg-black">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-4 text-white">
                        NFT <span className="text-neon-green">Auctions</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Bid on exclusive digital assets in real-time. Experience the thrill of live auctions with instant settlements.
                    </p>
                </div>

                {/* Stats */}
                <AuctionStats />

                {/* Category Tabs */}
                <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                {/* Live Auction Grid — always visible */}
                {liveAuctions.length > 0 ? (
                    <AuctionGrid auctions={liveAuctions} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <Zap size={40} className="text-white/10 mb-4" />
                        <p className="text-gray-600 font-bold uppercase tracking-widest text-sm">
                            No live auctions in this category
                        </p>
                    </div>
                )}

                {/* ── Records Section: tabs below grid ── */}
                <div className="mt-20">

                    {/* Section header + tab switcher */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-0">
                        <h2 className="text-2xl font-black uppercase tracking-widest text-white">
                            Auction <span className="text-[#00d32c]">Records</span>
                        </h2>

                        {/* Live / Ended pill tabs */}
                        <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.07] rounded-xl w-fit">
                            <button
                                onClick={() => setActiveStatus('live')}
                                className={`relative flex items-center gap-2.5 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300
                                    ${activeStatus === 'live'
                                        ? 'bg-[#00d32c]/15 text-[#00d32c] border border-[#00d32c]/30 shadow-[0_0_14px_rgba(0,211,44,0.1)]'
                                        : 'text-gray-500 hover:text-gray-300 border border-transparent'
                                    }`}
                            >
                                {activeStatus === 'live' ? (
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d32c] opacity-60" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d32c]" />
                                    </span>
                                ) : (
                                    <Zap size={13} />
                                )}
                                Live
                                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black tabular-nums
                                    ${activeStatus === 'live' ? 'bg-[#00d32c]/20 text-[#00d32c]' : 'bg-white/5 text-gray-500'}`}>
                                    {liveCount}
                                </span>
                            </button>

                            <button
                                onClick={() => setActiveStatus('ended')}
                                className={`flex items-center gap-2.5 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300
                                    ${activeStatus === 'ended'
                                        ? 'bg-white/8 text-white border border-white/15'
                                        : 'text-gray-500 hover:text-gray-300 border border-transparent'
                                    }`}
                            >
                                <Clock size={13} />
                                Ended
                                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black tabular-nums
                                    ${activeStatus === 'ended' ? 'bg-white/10 text-gray-300' : 'bg-white/5 text-gray-600'}`}>
                                    {endedCount}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Divider line connecting header to table */}
                    <div className="h-px bg-gradient-to-r from-[#00d32c]/20 via-white/5 to-transparent mt-5 mb-6" />

                    {/* Table */}
                    {tableAuctions.length > 0 ? (
                        <HistoryTable history={tableAuctions} activeStatus={activeStatus} />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-[#0b0b0b] border border-white/5 rounded-2xl text-center">
                            <Clock size={36} className="text-white/10 mb-3" />
                            <p className="text-gray-600 font-bold uppercase tracking-widest text-sm">
                                No {activeStatus} auctions to show
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AuctionPage;