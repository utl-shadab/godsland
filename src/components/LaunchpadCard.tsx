import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LaunchpadCardProps {
    title: string;
    image: string;
    price: string;
    items: string;
    mintedPercent: number;
    endsIn: string;
    slug: string;
    isFeatured?: boolean;
}

const LaunchpadCard = ({ title, image, price, items, mintedPercent, endsIn, slug, isFeatured }: LaunchpadCardProps) => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(endsIn);

    useEffect(() => {
        let targetDate = new Date();
        const parts = endsIn.match(/(\d+)d\s+(\d+)h\s+(\d+)m/);
        if (parts) {
            targetDate.setDate(targetDate.getDate() + parseInt(parts[1]));
            targetDate.setHours(targetDate.getHours() + parseInt(parts[2]));
            targetDate.setMinutes(targetDate.getMinutes() + parseInt(parts[3]));
        } else {
            targetDate = new Date(endsIn);
        }

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft("ENDED");
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`);
        }, 1000);

        return () => clearInterval(timer);
    }, [endsIn]);

    return (
        <div
            onClick={() => navigate(`/drops/${slug}`)}
            className="group relative bg-[#1a1a1e] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/10 transition-all duration-300 w-full max-w-[340px]"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {isFeatured && (
                        <div className="bg-black/40 backdrop-blur-md border border-neon-green/30 text-neon-green text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                            Featured
                        </div>
                    )}
                </div>

                <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
                        {/* Ethereum Logo (Generic) */}
                        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="text-gray-300">
                            <path d="M6.99998 0.5L6.87798 0.9145V15.1235L6.99998 15.245L13.245 11.554L6.99998 0.5Z" fill="currentColor" fillOpacity="0.6" />
                            <path d="M6.99998 0.5L0.754976 11.554L6.99998 15.245V8.086V0.5Z" fill="currentColor" />
                            <path d="M6.99998 16.5165L6.93848 16.591V21.163L6.99998 21.34L13.247 12.5695L6.99998 16.5165Z" fill="currentColor" fillOpacity="0.6" />
                            <path d="M6.99998 21.34V16.5165L0.754976 12.5695L6.99998 21.34Z" fill="currentColor" />
                            <path d="M6.99998 15.245L13.245 11.554L6.99998 8.08601V15.245Z" fill="currentColor" fillOpacity="0.2" />
                            <path d="M0.754976 11.554L6.99998 15.245V8.08601L0.754976 11.554Z" fill="currentColor" fillOpacity="0.6" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Content - Adjusted padding to match reference */}
            <div className="p-4 bg-[#1a1a1e]">
                <h3 className="text-white font-bold text-lg mb-4 truncate">{title}</h3>

                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Price</p>
                        <p className="text-white font-bold text-sm">{price} ETH</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Items</p>
                        <p className="text-white font-bold text-sm">{items}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Minted</p>
                        <p className="text-white font-bold text-sm">{mintedPercent}%</p>
                    </div>
                </div>

                {/* Footer Area - Relative for positioning hover button */}
                <div className="relative h-10 flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                    {/* Default State */}
                    <div className="absolute inset-0 flex items-center justify-between transition-opacity duration-200 group-hover:opacity-0 delay-75">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                            <span className="text-green-500 text-sm font-bold">Live</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#252529] px-2 py-1 rounded text-xs font-mono text-gray-400">
                            <span className="text-gray-500">ENDS:</span>
                            <span className="text-white tabular-nums">{timeLeft}</span>
                        </div>
                    </div>

                    {/* Hover State - Mint Button */}
                    <button className="absolute inset-0 w-full bg-neon-green hover:bg-white text-black font-bold uppercase tracking-wide rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,163,0.3)]">
                        Mint
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LaunchpadCard;
