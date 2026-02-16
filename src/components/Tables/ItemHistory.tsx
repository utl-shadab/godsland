import { useState } from 'react';

type HistoryType = 'Sales' | 'Offers' | 'Rents';

// Mock Data Interfaces
interface HistoryItem {
    price: string;
    type: string;
    date: string;
    seller: string;
    buyer: string;
}

interface ItemHistoryProps {
    className?: string;
}

const ItemHistory = ({ className }: ItemHistoryProps) => {
    const [activeTab, setActiveTab] = useState<HistoryType>('Sales');

    // Mock Data - Currently empty to match "Here is nothing" screenshot, 
    // but structured to be easily populated
    const historyData: Record<HistoryType, HistoryItem[]> = {
        'Sales': [],
        'Offers': [],
        'Rents': []
    };

    const currentData = historyData[activeTab];

    return (
        <div className={`w-full ${className}`}>
            <h2 className="text-xl font-bold text-white mb-6">History</h2>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-white/10 mb-6">
                {(['Sales', 'Offers', 'Rents'] as HistoryType[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-bold tracking-wide border-b-2 transition-colors relative top-[1px] ${activeTab === tab
                                ? 'border-neon-green text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table Area */}
            <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-white/5 border-b border-white/5 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <div className="col-span-1">Sale price</div>
                    <div className="col-span-1">Type</div>
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1">Seller</div>
                    <div className="col-span-1">Buyer</div>
                </div>

                {/* Table Body */}
                <div className="min-h-[150px]">
                    {currentData.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {currentData.map((item, index) => (
                                <div key={index} className="grid grid-cols-5 gap-4 px-6 py-4 items-center text-sm text-white hover:bg-white/5 transition-colors">
                                    <div className="col-span-1 font-mono">{item.price}</div>
                                    <div className="col-span-1 text-gray-400">{item.type}</div>
                                    <div className="col-span-1 text-gray-400">{item.date}</div>
                                    <div className="col-span-1 text-neon-green cursor-pointer hover:underline truncate">{item.seller}</div>
                                    <div className="col-span-1 text-neon-green cursor-pointer hover:underline truncate">{item.buyer}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[150px] text-gray-500 text-sm">
                            Here is nothing
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemHistory;
