const ItemStatsBar = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111] border border-white/5 rounded-xl p-4 mb-8">
            <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Floor Price</p>
                <p className="text-white font-bold text-lg">2.5 ETH</p>
            </div>
            <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Top Bid</p>
                <p className="text-neon-green font-bold text-lg">2.8 ETH</p>
            </div>
            <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Volume (24h)</p>
                <p className="text-white font-bold text-lg">14.5 ETH</p>
            </div>
            <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Owners</p>
                <p className="text-white font-bold text-lg">3.2K</p>
            </div>
        </div>
    );
};

export default ItemStatsBar;
