import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, ExternalLink } from 'lucide-react';

const mockOrders = [
    {
        id: "ord_8821",
        item: "Cyber Samurai #4421",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
        price: "0.08 ETH",
        date: "Feb 18, 2026",
        status: "COMPLETED"
    },
    {
        id: "ord_1022",
        item: "Mecha Geisha #102",
        image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=800",
        price: "0.05 ETH",
        date: "Feb 15, 2026",
        status: "COMPLETED"
    },
    {
        id: "ord_9911",
        item: "Neon Genesis Unit-01",
        image: "https://images.unsplash.com/photo-1633100589886-f6d892d77d73?auto=format&fit=crop&q=80&w=800",
        price: "0.1 ETH",
        date: "Feb 10, 2026",
        status: "FAILED"
    }
];

const MyOrdersPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-28 pb-20 bg-black">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
                        <p className="text-gray-400">Track your purchases and sales history.</p>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
                            />
                        </div>
                        <button className="bg-[#111] border border-white/10 rounded-lg px-4 py-2 text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                            <Filter size={18} />
                            <span className="hidden md:inline text-sm font-bold">Filter</span>
                        </button>
                    </div>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black/20 text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th className="px-6 py-4 font-bold">Item</th>
                                    <th className="px-6 py-4 font-bold">Price</th>
                                    <th className="px-6 py-4 font-bold">Date</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => navigate(`/orders/${order.id}`)}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-800">
                                                    <img src={order.image} alt={order.item} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-sm">{order.item}</p>
                                                    <p className="text-gray-500 text-xs font-mono">ID: {order.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-neon-green font-bold tabular-nums">{order.price}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-400 text-sm">{order.date}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1.5 ${order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                                    order.status === 'FAILED' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'COMPLETED' ? 'bg-green-500' : order.status === 'FAILED' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                                                <ChevronRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyOrdersPage;
