import type { Auction } from './AuctionCard';
import AuctionCard from './AuctionCard';

interface AuctionGridProps {
    auctions: Auction[];
    onPlaceBid?: (auction: Auction) => void;
}

const AuctionGrid = ({ auctions, onPlaceBid }: AuctionGridProps) => {
    if (auctions.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-gray-500">
                No auctions found in this category.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mb-24 items-start">
            {auctions.map((auction) => (
                <AuctionCard
                    key={auction.id}
                    auction={auction}
                    onPlaceBid={onPlaceBid}
                />
            ))}
        </div>
    );
};

export default AuctionGrid;
