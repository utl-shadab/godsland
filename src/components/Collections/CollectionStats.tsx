
import type { ICollection } from '../../utils/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CollectionStatsProps {
    collection: ICollection;
}

const StatItem = ({ label, value, change, subtext }: { label: string; value: string; change?: number; subtext?: string }) => {
    const isPositive = change && change >= 0;

    return (
        <div className="flex flex-col items-center justify-center p-4 border-r border-white/5 last:border-r-0 min-w-[140px]">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">{label}</span>
            <div className="flex items-end gap-2">
                <span className="text-xl md:text-2xl font-black text-white">{value}</span>
                {change !== undefined && (
                    <span className={`flex items-center text-xs font-bold mb-1 ${isPositive ? 'text-neon-green' : 'text-red-500'}`}>
                        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(change)}%
                    </span>
                )}
            </div>
            {subtext && <span className="text-[10px] text-gray-500 mt-1">{subtext}</span>}
        </div>
    );
};

const CollectionStats = ({ collection }: CollectionStatsProps) => {
    // Format helpers
    const formatVol = (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
        return `$${val}`;
    };

    const formatNum = (val: number) => {
        return val.toLocaleString();
    };

    return (
        <div className="z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 w-full overflow-x-auto scrollbar-hide">
            <div className="max-w-[1600px] mx-auto flex items-center min-w-max px-4 md:px-0">
                <StatItem
                    label="Floor"
                    value={`${collection.floorPrice} ETH`}
                    change={collection.floorChange24h}
                />
                <StatItem
                    label="24h Vol"
                    value={formatVol(collection.volume24h)}
                    change={collection.volumeChange24h}
                />
                <StatItem
                    label="7d Vol"
                    value={formatVol(collection.volume7d)}
                    change={collection.volumeChange7d}
                />
                <StatItem
                    label="30d Vol"
                    value={formatVol(collection.volume30d)}
                    change={collection.volumeChange30d}
                />
                <StatItem
                    label="Owners"
                    value={formatNum(collection.owners)}
                    subtext={`${((collection.owners / collection.itemCount) * 100).toFixed(0)}% unique`}
                />
                <StatItem
                    label="Items"
                    value={formatNum(collection.itemCount)}
                />
                <StatItem
                    label="Royalty"
                    value={`${collection.royalty}%`}
                    subtext="(Creator)"
                />
            </div>
        </div>
    );
};

export default CollectionStats;
