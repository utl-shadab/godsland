import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, ExternalLink, Copy } from 'lucide-react';

const OrderDetailPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    // Mock Order Data (Replace with API call)
    const order = {
        orderId: orderId,
        auctionId: "auc_12345",
        nftId: "nft_9876",
        itemTitle: "Cyber Punk #2077",
        itemImage: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
        sellerId: "0x3f...8a2b",
        buyerId: "0x71...3A92",
        finalPrice: 65100, // In mock currency/tokens
        platformFee: 1627.5, // 2.5%
        royalty: 3255, // 5%
        transactionHash: "0x8a9d...4f3e2b1c",
        status: "COMPLETED", // PENDING, COMPLETED, FAILED
        timestamp: new Date().toLocaleString()
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Add toast notification here
    };

    return (
        <div className="min-h-screen pt-28 pb-20 bg-black">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Order Details</h1>
                        <p className="text-gray-400 text-sm">Order ID: <span className="text-white font-mono">{orderId}</span></p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 ${order.status === 'COMPLETED' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
                            order.status === 'PENDING' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' :
                                'bg-red-500/10 border-red-500/30 text-red-500'
                        }`}>
                        {order.status === 'COMPLETED' && <CheckCircle size={16} />}
                        {order.status === 'PENDING' && <Clock size={16} />}
                        {order.status === 'FAILED' && <XCircle size={16} />}
                        {order.status}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Left Column: Item Preview */}
                    <div className="flex flex-col gap-6">
                        <div className="w-full aspect-square bg-[#111] rounded-2xl overflow-hidden border border-white/5 relative group">
                            <img
                                src={order.itemImage}
                                alt={order.itemTitle}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                            <h3 className="text-white font-bold text-lg mb-4">{order.itemTitle}</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Seller</span>
                                    <span className="text-neon-green font-mono cursor-pointer">{order.sellerId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Buyer</span>
                                    <span className="text-neon-green font-mono cursor-pointer">{order.buyerId}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#111] border border-white/5 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-6">Payment Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Final Price</span>
                                    <span className="text-white font-bold text-lg tabular-nums">{order.finalPrice.toLocaleString()} UNIT</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Platform Fee (2.5%)</span>
                                    <span className="text-gray-300 tabular-nums">{order.platformFee.toLocaleString()} UNIT</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Creator Royalty (5%)</span>
                                    <span className="text-gray-300 tabular-nums">{order.royalty.toLocaleString()} UNIT</span>
                                </div>
                                <div className="h-px bg-white/10 my-2" />
                                <div className="flex justify-between items-center text-base">
                                    <span className="text-white font-bold">Total Paid</span>
                                    <span className="text-neon-green font-bold text-xl tabular-nums">
                                        {(order.finalPrice + order.platformFee + order.royalty).toLocaleString()} UNIT
                                    </span>
                                </div>
                            </div>

                            {/* Transaction Info */}
                            <div className="bg-black/40 rounded-lg p-4 border border-white/5">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Transaction Hash</p>
                                <div className="flex items-center justify-between gap-2">
                                    <code className="text-neon-green font-mono text-sm truncate">{order.transactionHash}</code>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => copyToClipboard(order.transactionHash)} className="text-gray-500 hover:text-white transition-colors">
                                            <Copy size={14} />
                                        </button>
                                        <a href={`https://etherscan.io/tx/${order.transactionHash}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button onClick={() => navigate('/my-orders')} className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 transition-colors uppercase tracking-wider text-sm">
                                View My Orders
                            </button>
                            <button onClick={() => navigate('/')} className="w-full text-gray-500 hover:text-white py-2 text-sm transition-colors">
                                Return Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPage;
