import { useNavigate } from "react-router-dom";

export interface OwnedNFTRow {
    id: number;
    name: string;
    collection: string;
    image: string;
    floorPrice: number;
    rarity: string;
    acquiredDate: string;
}

interface OwnedNFTsTableProps {
    data: OwnedNFTRow[];
}

const RARITY_COLORS: Record<string, string> = {
    Basic: "bg-gray-500/80",
    Special: "bg-blue-500/80",
    Premium: "bg-purple-500/80",
    Legendary: "bg-amber-500/80",
};

const OwnedNFTsTable = ({ data }: OwnedNFTsTableProps) => {
    const navigate = useNavigate();

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="text-white text-sm font-semibold">Owned NFTs</h3>
                <button
                    onClick={() => navigate("/user/owned")}
                    className="text-neon-green text-xs font-semibold hover:underline"
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[640px]">
                    <thead>
                        <tr className="bg-white/[0.02] text-gray-500 text-[10px] uppercase tracking-wider">
                            <th className="px-5 py-3 font-semibold">NFT</th>
                            <th className="px-5 py-3 font-semibold">Collection</th>
                            <th className="px-5 py-3 font-semibold">Floor Price</th>
                            <th className="px-5 py-3 font-semibold">Rarity</th>
                            <th className="px-5 py-3 font-semibold text-right">Acquired</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => navigate(`/user/owned/${row.id}/sell`)}
                                className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                            >
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={row.image}
                                            alt={row.name}
                                            className="w-9 h-9 rounded-lg object-cover border border-white/[0.06] group-hover:border-neon-green/30 transition-colors"
                                        />
                                        <span className="text-white text-sm font-medium group-hover:text-neon-green transition-colors">
                                            {row.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-gray-400 text-sm">{row.collection}</span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="text-white text-sm font-semibold tabular-nums">
                                        {row.floorPrice.toFixed(2)} ETH
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <span
                                        className={`text-[10px] font-bold text-white px-2 py-1 rounded-full ${RARITY_COLORS[row.rarity] || "bg-gray-500/80"
                                            }`}
                                    >
                                        {row.rarity}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <span className="text-gray-500 text-xs">
                                        {new Date(row.acquiredDate).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
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

export default OwnedNFTsTable;
