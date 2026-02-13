import { useEffect, useRef } from 'react';
import { X, Globe, Twitter, Share2, MoreHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import MarketplaceGrid from './MarketplaceGrid';

const CollectionModal = ({ collection, isOpen, onClose, nfts }: any) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && modalRef.current && overlayRef.current) {
            document.body.style.overflow = 'hidden';

            // Animation
            const tl = gsap.timeline();
            tl.to(overlayRef.current, { opacity: 1, duration: 0.3 })
                .fromTo(modalRef.current,
                    { opacity: 0, scale: 0.9, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" },
                    "-=0.2"
                );
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleClose = () => {
        if (modalRef.current && overlayRef.current) {
            const tl = gsap.timeline({ onComplete: onClose });
            tl.to(modalRef.current, { opacity: 0, scale: 0.9, y: 20, duration: 0.3 })
                .to(overlayRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");
        } else {
            onClose();
        }
    };

    if (!isOpen || !collection) return null;

    // Filter NFTs for this collection (mock)
    // In a real app, we would fetch NFTs by collection ID
    // For this mock, we just show a subset or all nfts to simulate content
    const collectionNFTs = nfts ? nfts.filter((nft: any) => nft.price) : [];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/90 backdrop-blur-md opacity-0"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] opacity-0"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"
                >
                    <X size={24} />
                </button>

                {/* Banner & Header */}
                <div className="flex-shrink-0 relative">
                    <div className="h-48 md:h-64 relative">
                        <img
                            src={`https://picsum.photos/seed/${collection.id}-banner/1200/400`}
                            alt="Banner"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                    </div>

                    <div className="px-6 md:px-12 -mt-16 relative z-10 flex flex-col md:flex-row gap-6 items-end md:items-start mb-8">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-2xl border-4 border-[#0a0a0a] overflow-hidden shadow-2xl bg-black flex-shrink-0">
                            <img
                                src={`https://picsum.photos/seed/${collection.id}/200/200`}
                                alt={collection.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left pt-2 min-w-0">
                            <h2 className="text-3xl font-bold text-white mb-2 truncate">{collection.name}</h2>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mb-4">
                                <span>Created by <span className="text-neon-green">Godsland</span></span>
                                <span>•</span>
                                <span>Items 10k</span>
                                <span>•</span>
                                <span>Created Jan 2026</span>
                            </div>
                            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed hidden md:block line-clamp-2">
                                Welcome to the {collection.name}. A curated collection of unique digital assets living on the Ethereum blockchain.
                                Each piece is a portal to a new dimension of artistic expression and utility.
                            </p>
                        </div>

                        {/* Stats & Actions */}
                        <div className="flex flex-col gap-4 min-w-[200px] flex-shrink-0 w-full md:w-auto">
                            <div className="flex gap-2 justify-center md:justify-end">
                                <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><Globe size={18} /></button>
                                <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><Twitter size={18} /></button>
                                <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><Share2 size={18} /></button>
                                <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"><MoreHorizontal size={18} /></button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Floor Price</p>
                                    <p className="text-xl font-bold text-white">{collection.floorPrice}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider">Volume</p>
                                    <p className="text-xl font-bold text-white">125 ETH</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Grid */}
                <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12 custom-scrollbar">
                    <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0a0a0a] py-4 z-10 border-b border-white/5">
                        <h3 className="text-xl font-bold text-white">Items</h3>
                        <div className="text-sm text-gray-400">Showing {collectionNFTs.length} results</div>
                    </div>
                    <MarketplaceGrid nfts={collectionNFTs} viewMode="grid" />
                </div>
            </div>
        </div>
    );
};

export default CollectionModal;
