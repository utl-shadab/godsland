import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface BuySellRow {
    id: number;
    type: "Buy" | "Sell";
    nftName: string;
    collection: string;
    price: string;
    from: string;
    to: string;
    time: string;
}

interface BuySellTableProps {
    data: BuySellRow[];
}

const BuySellTable = ({ data }: BuySellTableProps) => {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="text-white text-sm font-semibold">Buy & Sell Activity</h3>
                <button className="text-neon-green text-xs font-semibold hover:underline">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead>
                        <tr className="bg-white/[0.02] text-gray-500 text-[10px] uppercase tracking-wider">
                            <th className="px-5 py-3 font-semibold">Type</th>
                            <th className="px-5 py-3 font-semibold">NFT</th>
                            <th className="px-5 py-3 font-semibold">Price</th>
                            <th className="px-5 py-3 font-semibold">From</th>
                            <th className="px-5 py-3 font-semibold">To</th>
                            <th className="px-5 py-3 font-semibold text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-white/[0.02] transition-colors group"
                            >
                                <td className="px-5 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${row.type === "Buy"
                                                ? "bg-neon-green/10 text-neon-green"
                                                : "bg-red-500/10 text-red-400"
                                            }`}
                                    >
                                        {row.type === "Buy" ? (
                                            <ArrowDownRight size={12} />
                                        ) : (
                                            <ArrowUpRight size={12} />
                                        )}
                                        {row.type}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <div>
                                        <p className="text-white text-sm font-medium">{row.nftName}</p>
                                        <p className="text-gray-600 text-[10px]">{row.collection}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-white text-sm font-semibold tabular-nums">
                                        {row.price}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-gray-400 font-mono text-xs">{row.from}</span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-neon-green/80 font-mono text-xs">{row.to}</span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <span className="text-gray-500 text-xs">{row.time}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BuySellTable;
