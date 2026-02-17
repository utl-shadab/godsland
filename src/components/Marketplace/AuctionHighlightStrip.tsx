
import { Clock } from 'lucide-react';

interface AuctionHighlightStripProps {
    items: any[];
}

const AuctionHighlightStrip = ({ items }: AuctionHighlightStripProps) => {
    return (
        <section className="border-t border-b border-white/5 py-6 bg-[#050505]">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 flex items-center gap-8 overflow-x-auto scrollbar-hide">

                {/* Section Title - Sticky/Static */}
                <div className="flex-shrink-0 pr-8 border-r border-white/10 h-full flex items-center">
                    <div className="flex flex-col">
                        <span className="text-neon-green text-[10px] font-bold uppercase tracking-widest mb-1">Live Auctions</span>
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider">Ending Soon</h3>
                    </div>
                </div>

                {/* Horizontal Cards */}
                <div className="flex gap-4">
                    {items.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex bg-[#111] rounded-lg border border-white/5 p-2 w-[280px] hover:border-neon-green/30 transition-colors group cursor-pointer">
                            <div className="w-16 h-16 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="ml-3 flex flex-col justify-center w-full">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-white font-bold text-xs truncate max-w-[100px]">{item.title}</span>
                                    <span className="text-neon-green font-mono text-xs font-bold">{item.price}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                    <Clock size={10} className="text-orange-500" />
                                    <span className="text-orange-400 font-mono">02h 45m 12s</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Ends */}
                <button className="flex-shrink-0 ml-4 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                    View All Auctions →
                </button>
            </div>
        </section>
    );
};

export default AuctionHighlightStrip;
