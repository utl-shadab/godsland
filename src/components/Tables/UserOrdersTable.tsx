export interface UserOrder {
    id: number;
    nftName: string;
    collection: string;
    type: "Fixed" | "Auction";
    price: string;
    status: "Active" | "Filled" | "Cancelled" | "Expired";
    date: string;
}

interface UserOrdersTableProps {
    data: UserOrder[];
}

const STATUS_STYLES: Record<string, string> = {
    Active: "bg-neon-green/10 text-neon-green border-neon-green/20",
    Filled: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
    Expired: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const UserOrdersTable = ({ data }: UserOrdersTableProps) => {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="text-white text-sm font-semibold">Your Orders</h3>
                <button className="text-neon-green text-xs font-semibold hover:underline">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                    <thead>
                        <tr className="bg-white/[0.02] text-gray-500 text-[10px] uppercase tracking-wider">
                            <th className="px-5 py-3 font-semibold">NFT</th>
                            <th className="px-5 py-3 font-semibold">Type</th>
                            <th className="px-5 py-3 font-semibold">Price</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                            <th className="px-5 py-3 font-semibold text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className="hover:bg-white/[0.02] transition-colors"
                            >
                                <td className="px-5 py-3">
                                    <div>
                                        <p className="text-white text-sm font-medium">{row.nftName}</p>
                                        <p className="text-gray-600 text-[10px]">{row.collection}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-md ${row.type === "Fixed"
                                                ? "bg-white/5 text-gray-300"
                                                : "bg-amber-500/10 text-amber-400"
                                            }`}
                                    >
                                        {row.type}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-white text-sm font-semibold tabular-nums">
                                        {row.price}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <span
                                        className={`text-[10px] font-bold px-2 py-1 rounded-md border ${STATUS_STYLES[row.status]
                                            }`}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <span className="text-gray-500 text-xs">{row.date}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserOrdersTable;
