import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import NFTCard from './NFTCard';
import SkeletonLoader from './SkeletonLoader';

import type { NFTCardProps } from './NFTCard';

const MarketplaceGrid = ({ nfts, viewMode, onItemClick }: { nfts: NFTCardProps[], viewMode: string, onItemClick?: (id: string) => void }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state for skeleton demonstration
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [nfts]);

    useEffect(() => {
        if (!gridRef.current || loading) return;

        // Context for scoped animations
        const ctx = gsap.context(() => {
            gsap.fromTo(".nft-card-item",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: "power2.out",
                    overwrite: 'auto'
                }
            );
        }, gridRef);

        return () => ctx.revert();
    }, [loading, nfts]);

    if (!loading && nfts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">👻</div>
                <h3 className="text-2xl text-white font-bold mb-2">No items found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    // Grid classes based on OpenSea/MagicEden density
    const gridClasses = viewMode === 'list'
        ? 'grid-cols-1 gap-4'
        : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-fluid';

    return (
        <div ref={gridRef} className={`grid ${gridClasses}`}>
            {loading ? (
                <SkeletonLoader count={12} />
            ) : (
                nfts.map((nft) => (
                    <div
                        key={nft.id}
                        className="nft-card-item opacity-0"
                        onClick={() => nft.id && onItemClick && onItemClick(nft.id)}
                    >
                        {viewMode === 'list' ? (
                            <div className="flex bg-[#111] p-4 rounded-xl border border-white/5 hover:border-neon-green/30 transition-colors cursor-pointer group">
                                <div className="w-20 h-20 rounded-lg overflow-hidden mr-6 flex-shrink-0">
                                    <img src={nft.image} alt={nft.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex justify-between items-center min-w-0">
                                    <div className="truncate pr-4">
                                        <h3 className="text-lg font-bold text-white mb-1 truncate">{nft.title}</h3>
                                        <p className="text-gray-400 text-xs truncate">Collection: <span className="text-neon-green">{nft.creator}</span></p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-neon-green font-black text-lg font-mono">{nft.price}</p>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">Current Price</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <NFTCard {...nft} />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default MarketplaceGrid;
