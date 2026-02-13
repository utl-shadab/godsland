import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import NFTCard from './NFTCard';

const MarketplaceGrid = ({ nfts, viewMode, onItemClick }: { nfts: any[], viewMode: string, onItemClick?: (id: string) => void }) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;

        // Context for scoped animations
        const ctx = gsap.context(() => {
            gsap.fromTo(".nft-card-item",
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    overwrite: 'auto'
                }
            );
        }, gridRef);

        return () => ctx.revert();
    }, [nfts]); // Re-animate when filter changes

    if (nfts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">👻</div>
                <h3 className="text-2xl text-white font-bold mb-2">No items found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query.</p>
            </div>
        );
    }

    return (
        <div ref={gridRef} className={`grid gap-6 ${viewMode === 'list'
            ? 'grid-cols-1'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>

            {nfts.map((nft, index) => (
                <div
                    key={nft.id}
                    className="nft-card-item opacity-0 cursor-pointer"
                    onClick={() => onItemClick && onItemClick(nft.id)}
                >
                    {viewMode === 'list' ? (
                        <div className="flex bg-[#111] p-4 rounded-xl border border-white/10 hover:border-neon-green/50 transition-colors">
                            <img src={nft.image} alt={nft.title} className="w-24 h-24 rounded-lg object-cover mr-6" />
                            <div className="flex-1 flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{nft.title}</h3>
                                    <p className="text-gray-400 text-sm">by <span className="text-neon-green">{nft.creator}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gold-start font-bold text-lg">{nft.price}</p>
                                    <p className="text-gray-500 text-xs">Floor: {nft.price}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NFTCard {...nft} delay={index * 50} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default MarketplaceGrid;
