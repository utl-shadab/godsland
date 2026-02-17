import { useState } from 'react';
import LaunchpadCard from '../components/LaunchpadCard';
import MintingHistoryTable from '../components/Tables/MintingHistoryTable';

const drops = [
    {
        id: 1,
        title: "Meta Racing Pilots",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
        price: "0.25",
        items: "1.5K",
        mintedPercent: 24,
        endsIn: "02d 19h 37m",
        slug: "meta-racing-pilots",
        isFeatured: true,
        status: "Live"
    },
    {
        id: 2,
        title: "Cyber Samurai Gen2",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=800",
        price: "0.08",
        items: "5.5K",
        mintedPercent: 88,
        endsIn: "01d 04h 20m",
        slug: "cyber-samurai",
        isFeatured: true,
        status: "Live"
    },
    {
        id: 3,
        title: "Neon Genesis",
        image: "https://images.unsplash.com/photo-1633100589886-f6d892d77d73?auto=format&fit=crop&q=80&w=800",
        price: "0.1",
        items: "1K",
        mintedPercent: 12,
        endsIn: "05d 12h 00m",
        slug: "neon-genesis",
        isFeatured: false,
        status: "Upcoming"
    },
    {
        id: 4,
        title: "Void Walkers",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        price: "0.06",
        items: "8.8K",
        mintedPercent: 45,
        endsIn: "03d 08h 15m",
        slug: "void-walkers",
        isFeatured: false,
        status: "Upcoming"
    },
    {
        id: 5,
        title: "Ethereal Beings",
        image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=800",
        price: "0.15",
        items: "3.3K",
        mintedPercent: 67,
        endsIn: "00d 14h 45m",
        slug: "ethereal-beings",
        isFeatured: false,
        status: "Live"
    },
    {
        id: 6,
        title: "Digital Drifters",
        image: "https://images.unsplash.com/photo-1614728853970-32a22507da64?auto=format&fit=crop&q=80&w=800",
        price: "0.02",
        items: "10K",
        mintedPercent: 100,
        endsIn: "Ended",
        slug: "digital-drifters",
        isFeatured: false,
        status: "Ended"
    }
];

const DropPage = () => {
    const [activeTab, setActiveTab] = useState('Live');

    const filteredDrops = drops.filter(drop => drop.status === activeTab);

    return (
        <div className="min-h-screen bg-black pt-28 pb-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Launchpad Drops</h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        Discover the hottest upcoming and live NFT mints. Secure your spot in the next big collection.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-6 mb-8 border-b border-white/10 relative">
                    {['Live', 'Upcoming', 'Ended'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-2 font-bold transition-all relative ${activeTab === tab
                                ? 'text-white'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green shadow-[0_-2px_8px_rgba(0,255,163,0.5)]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
                    {filteredDrops.map((drop) => (
                        <LaunchpadCard
                            key={drop.id}
                            {...drop}
                        />
                    ))}
                    {filteredDrops.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-gray-500 text-lg">No {activeTab.toLowerCase()} drops found.</p>
                        </div>
                    )}
                </div>

                {/* History Section */}
                <div className=" mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Minting Activity</h2>
                    </div>
                    <MintingHistoryTable />
                </div>
            </div>
        </div>
    );
};

export default DropPage;
