

const bids = [
    { bidder: '@casino_bot', price: '65,100', time: '3h 12m', from: '---' },
    { bidder: '@gucci', price: '42,000', time: '13h 15m', from: '---' },
    { bidder: '@feibo', price: '30,389.1', time: '2d 14h', from: 'EQBqSipgL...vLz4FxTXo' },
    { bidder: '@frail', price: '26,250', time: '5d 1h', from: '---' },
    { bidder: '0x32...8a9c', price: '21,000', time: '5d 4h', from: '---' },
    { bidder: '0x1c...4d2e', price: '18,500', time: '6d 12h', from: '---' },
];

const BidHistoryTable = () => {
    return (
        <div className="w-full text-sm">
            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-[#111] border-b border-white/10 text-gray-500 uppercase text-xs font-bold tracking-wider">
                <div className="col-span-1">Bid</div>
                <div className="col-span-1">Bidder</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-white/5">
                {bids.map((bid, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 px-4 py-4 hover:bg-white/5 transition-colors items-center group">

                        {/* Price */}
                        <div className="col-span-1">
                            <div className="text-white font-bold tabular-nums text-base">▼ {bid.price}</div>
                            <div className="text-xs text-gray-500">
                                ~$42,500
                            </div>
                        </div>

                        {/* Bidder */}
                        <div className="col-span-1 flex flex-col justify-center">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-neon-green hover:text-white transition-colors cursor-pointer">{bid.bidder}</span>
                            </div>
                            <span className="text-xs text-gray-500">{bid.time} ago</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All */}
            <div className="px-4 py-3 border-t border-white/10 text-center">
                <button className="text-xs text-gray-500 hover:text-white uppercase tracking-wider transition-colors">View All Bids</button>
            </div>
        </div>
    );
};

export default BidHistoryTable;
