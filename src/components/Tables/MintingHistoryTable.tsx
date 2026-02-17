import { ExternalLink } from 'lucide-react';

const mockHistory = [
    {
        id: 1,
        collection: "Cyber Samurai",
        item: "Samurai #4421",
        price: "0.08 ETH",
        from: "0x71...3A92",
        to: "0xb4...9C21",
        time: "2 mins ago",
        status: "Success"
    },
    {
        id: 2,
        collection: "Mecha Geisha",
        item: "Geisha #102",
        price: "0.05 ETH",
        from: "NullAddress",
        to: "0x82...1D44",
        time: "5 mins ago",
        status: "Success"
    },
    {
        id: 3,
        collection: "Cyber Samurai",
        item: "Samurai #8821",
        price: "0.08 ETH",
        from: "0x71...3A92",
        to: "0x11...2233",
        time: "12 mins ago",
        status: "Pending"
    },
    {
        id: 4,
        collection: "Neon Genesis",
        item: "Unit-01",
        price: "0.1 ETH",
        from: "NullAddress",
        to: "0x99...8877",
        time: "15 mins ago",
        status: "Success"
    },
    {
        id: 5,
        collection: "Void Walkers",
        item: "Walker #33",
        price: "0.06 ETH",
        from: "NullAddress",
        to: "0x44...5566",
        time: "1 hour ago",
        status: "Success"
    },
];

const MintingHistoryTable = () => {
    return (
        <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Recent Mints</h3>
                <button className="text-neon-green text-sm font-bold uppercase tracking-wider hover:text-white transition-colors">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-black/20 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-bold">Collection</th>
                            <th className="px-6 py-4 font-bold">Item</th>
                            <th className="px-6 py-4 font-bold">Price</th>
                            <th className="px-6 py-4 font-bold">From</th>
                            <th className="px-6 py-4 font-bold">To</th>
                            <th className="px-6 py-4 font-bold">Time</th>
                            <th className="px-6 py-4 font-bold text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {mockHistory.map((row) => (
                            <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="text-white font-bold">{row.collection}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-300">{row.item}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-neon-green font-bold tabular-nums">{row.price}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-400 font-mono text-xs">{row.from}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neon-green font-mono text-xs">{row.to}</span>
                                        <ExternalLink size={12} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-500 text-sm">{row.time}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${row.status === 'Success'
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                        }`}>
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MintingHistoryTable;
