import { useState } from 'react';
import AuctionStats from '../components/auction/AuctionStats';
import CategoryTabs from '../components/auction/CategoryTabs';
import AuctionGrid from '../components/auction/AuctionGrid';
import HistoryTable from '../components/auction/HistoryTable';
import type { Auction } from '../components/auction/AuctionCard';

// Mock Data
const MOCK_AUCTIONS: Auction[] = [
    {
        id: '1',
        title: 'Cyber Punk #2077',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
        currentBid: '2.5 ETH',
        bids: 12,
        endsAt: new Date(Date.now() + 1000 * 60 * 60 * 5), // 5 hours from now
        category: 'Art',
        status: 'live'
    },
    {
        id: '2',
        title: 'Golden Ape Exclusive',
        image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600',
        currentBid: '1.8 ETH',
        bids: 8,
        endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours
        category: 'Collectibles',
        status: 'live'
    },
    {
        id: '3',
        title: 'Virtual Villa Key',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
        currentBid: '5.0 ETH',
        bids: 24,
        endsAt: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
        category: 'Virtual Worlds',
        status: 'live'
    },
    {
        id: '4',
        title: 'Neon Genesis #001',
        image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600',
        currentBid: '0.9 ETH',
        bids: 5,
        endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        category: 'Photography',
        status: 'live'
    },
    {
        id: '5',
        title: 'Sound Wave Alpha',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600',
        currentBid: '1.2 ETH',
        bids: 15,
        endsAt: new Date(Date.now() - 1000 * 60 * 60), // Ended 1 hour ago
        category: 'Music',
        status: 'ended',
        winner: '0x3f...8a2b'
    },
    {
        id: '6',
        title: 'Ethereal Spirit',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600',
        currentBid: '3.3 ETH',
        bids: 30,
        endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // Ended 1 day ago
        category: 'Art',
        status: 'ended',
        winner: '0x9c...1d4e'
    },
    {
        id: '7',
        title: 'Future City Pass',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600',
        currentBid: '0.5 ETH',
        bids: 4,
        endsAt: new Date(Date.now() + 1000 * 60 * 60 * 10),
        category: 'Utility',
        status: 'live'
    },
    {
        id: '8',
        title: 'Retro Game Cartridge',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600',
        currentBid: '0.2 ETH',
        bids: 2,
        endsAt: new Date(Date.now() + 1000 * 60 * 45),
        category: 'Trading Cards',
        status: 'live'
    }
];

const AuctionPage = () => {
    const [auctions] = useState<Auction[]>(MOCK_AUCTIONS);
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredAuctions = auctions.filter(auc => {
        const matchesCategory = activeCategory === 'All' || auc.category === activeCategory;
        const matchesStatus = auc.status === 'live'; // Filter grid to show only live auctions
        return matchesCategory && matchesStatus;
    });

    const endedAuctions = auctions.filter(auc => auc.status === 'ended');

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

                {/* Tabs */}
                <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

                {/* Grid */}
                <AuctionGrid auctions={filteredAuctions} />

                {/* History */}
                <HistoryTable history={endedAuctions} />

            </div>

        </div>
    );
};

export default AuctionPage;
