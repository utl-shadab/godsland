
import { useState, useEffect } from 'react';
import { ShoppingCart, List, ArrowRightLeft, Tag, Zap, ExternalLink } from 'lucide-react';
import { getCollectionActivity } from '../../utils/mockActivity';
import type { IActivity } from '../../utils/mockActivity';

interface ActivityTabProps {
    collectionId: string;
}

const ActivityTab = ({ collectionId }: ActivityTabProps) => {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Mock fetch
        const data = getCollectionActivity(collectionId);
        setActivities(data);
    }, [collectionId]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'sale': return <ShoppingCart size={16} className="text-neon-green" />;
            case 'list': return <List size={16} className="text-blue-400" />;
            case 'transfer': return <ArrowRightLeft size={16} className="text-purple-400" />;
            case 'offer': return <Tag size={16} className="text-pink-400" />;
            case 'mint': return <Zap size={16} className="text-yellow-400" />;
            default: return <Zap size={16} />;
        }
    };

    const getLabel = (type: string) => {
        switch (type) {
            case 'sale': return 'Sale';
            case 'list': return 'List';
            case 'transfer': return 'Transfer';
            case 'offer': return 'Offer';
            case 'mint': return 'Mint';
            default: return type;
        }
    };

    const filteredActivities = filter === 'all' ? activities : activities.filter(a => a.eventType === filter);

    return (
        <div className="relative">
            {/* Filter Bar */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
                {['all', 'sale', 'list', 'offer', 'transfer', 'mint'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all whitespace-nowrap ${filter === f ? 'bg-neon-green text-black' : 'bg-slate-900 text-gray-400 hover:bg-slate-800 hover:text-white border border-slate-800'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-black/20 border-b border-slate-800 text-xs uppercase text-gray-500 font-bold tracking-wider">
                                <th className="p-4">Event</th>
                                <th className="p-4">Item</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">From</th>
                                <th className="p-4">To</th>
                                <th className="p-4">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredActivities.map(activity => (
                                <tr key={activity.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {getIcon(activity.eventType)}
                                            <span className="text-sm font-bold text-white">{getLabel(activity.eventType)}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={activity.itemImage} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                            <span className="text-sm font-bold text-gray-300 hover:text-neon-green cursor-pointer">{activity.itemName}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {activity.price ? (
                                            <span className="text-sm font-bold text-white">{activity.price} ETH</span>
                                        ) : (
                                            <span className="text-xs text-gray-600">--</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-blue-400 hover:underline cursor-pointer">
                                            {activity.from.name || `${activity.from.address.substring(0, 6)}...`}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {activity.to ? (
                                            <span className="text-sm text-blue-400 hover:underline cursor-pointer">
                                                {activity.to.name || `${activity.to.address.substring(0, 6)}...`}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-gray-600">--</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {new Date(activity.timestamp).toLocaleDateString()}
                                            <a href={activity.blockExplorerUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white ml-2">
                                                <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex flex-col gap-4">
                {filteredActivities.map(activity => (
                    <div key={activity.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={activity.itemImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="font-bold text-white">{activity.itemName}</span>
                                    <span className="text-xs text-gray-500 px-1.5 py-0.5 bg-black rounded border border-slate-700 flex items-center gap-1">
                                        {getIcon(activity.eventType)} {getLabel(activity.eventType)}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                    {new Date(activity.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs mb-0.5">Price</p>
                                {activity.price ? (
                                    <p className="text-white font-bold">{activity.price} ETH</p>
                                ) : (
                                    <p className="text-gray-600">--</p>
                                )}
                            </div>
                            <div>
                                <p className="text-gray-500 text-xs mb-0.5">From</p>
                                <p className="text-blue-400 truncate w-full">
                                    {activity.from.name || `${activity.from.address.substring(0, 6)}...`}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredActivities.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                    No activity found for this filter.
                </div>
            )}
        </div>
    );
};

export default ActivityTab;
