
import { useRef } from 'react';
import type { IItem } from '../../utils/mockItems';
import LiveAuctionCard from '../LiveAuctionCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LiveAuctionHighlightProps {
    items: IItem[];
}

const LiveAuctionHighlight = ({ items }: LiveAuctionHighlightProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Filter items that are on auction (Mock: check if id is divisible by 5 as per filter logic, or just random subset)
    const auctionItems = (items || []).filter(item => item.isListed && parseInt(item.id.split('_')[1] || '0') % 5 === 0);

    if (auctionItems.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6 px-4 md:px-0">
                <div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Live Auctions
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Don't miss out on these active bids</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-0"
            >
                {auctionItems.map(item => (
                    <div key={item.id} className="min-w-[280px] md:min-w-[320px]">
                        <LiveAuctionCard
                            title={item.name}
                            image={item.image}
                            price={`${item.price || '0'} ETH`}
                            timeLeft="05h 23m" // Mock
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveAuctionHighlight;
