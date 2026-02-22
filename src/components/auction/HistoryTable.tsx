import type { Auction } from "./AuctionCard";
import { User, ExternalLink } from "lucide-react";

interface HistoryTableProps {
  history: Auction[];
  activeStatus: "live" | "ended";
}

const HistoryTable = ({ history, activeStatus }: HistoryTableProps) => {
  return (
    <div className="w-full bg-[#0b0b0b] border border-white/5 rounded-2xl overflow-hidden mb-12">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider">
          Auction {activeStatus ? activeStatus : "History"}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-4 font-bold">Item</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Winner</th>
              <th className="px-6 py-4 font-bold text-right">Final Price</th>
              <th className="px-6 py-4 font-bold text-right">Bids</th>
              <th className="px-6 py-4 font-bold text-right">Ended</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-white font-bold text-sm">
                      {item.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-300 border border-white/10 uppercase font-bold tracking-wide">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gold-primary">
                    <User size={14} />
                    <span className="font-mono text-sm">
                      {item.winner || "---"}
                    </span>
                    <ExternalLink
                      size={12}
                      className="opacity-50 hover:opacity-100 cursor-pointer"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-neon-green font-bold tabular-nums">
                    {item.currentBid}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-white font-medium tabular-nums">
                    {item.bids}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-gray-500 text-sm tabular-nums">
                  {item.endsAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
