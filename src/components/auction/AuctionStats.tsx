import { TrendingUp, Activity, Clock, BarChart3 } from 'lucide-react';

const stats = [
    { label: 'Total Auctions', value: '12.4K', icon: TrendingUp, color: 'text-neon-green' },
    { label: 'Live Auctions', value: '452', icon: Activity, color: 'text-blue-400' },
    { label: 'Ended Auctions', value: '11.9K', icon: Clock, color: 'text-orange-400' },
    { label: 'Total Volume', value: '84.2M', icon: BarChart3, color: 'text-purple-400' },
];

const AuctionStats = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300"
                >
                    <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                        <stat.icon size={24} />
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color} tabular-nums`}>{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AuctionStats;
