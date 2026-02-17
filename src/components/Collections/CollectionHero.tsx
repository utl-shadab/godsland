
import { useState } from 'react';
import type { ICollection } from '../../utils/mockData';
import { Share2, MoreVertical, CheckCircle } from 'lucide-react';

interface CollectionHeroProps {
    collection: ICollection;
    onFollow?: () => void;
}

const CollectionHero = ({ collection, onFollow }: CollectionHeroProps) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
        if (onFollow) onFollow();
    };

    return (
        <div className="relative w-full h-[400px]">
            {/* Banner Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={collection.bannerImage}
                    alt={`${collection.name} banner`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-[1600px] mx-auto flex flex-col md:flex-row items-end gap-6 md:gap-8">
                {/* Logo */}
                <div className="relative shrink-0">
                    <div className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-2xl overflow-hidden border-4 border-black box-content shadow-2xl">
                        <img
                            src={collection.image}
                            alt={`${collection.name} logo`}
                            className="w-full h-full object-cover bg-gray-800"
                        />
                    </div>
                </div>

                {/* Info & Actions */}
                <div className="flex-1 w-full pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        {/* Title & Creator */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight">
                                    {collection.name}
                                </h1>
                                {collection.verified && (
                                    <CheckCircle size={24} className="text-neon-green fill-current" />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <span className="text-sm md:text-base">By <span className="text-white font-bold">{collection.creator.name}</span></span>
                                {collection.creator.verified && (
                                    <CheckCircle size={14} className="text-neon-green" />
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {collection.socials?.website && (
                                <a href={collection.socials.website} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                </a>
                            )}
                            {collection.socials?.twitter && (
                                <a href={collection.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 7.8 4.5c2.1-.2 1.9-2.2 1.9-2.2z" /></svg>
                                </a>
                            )}
                            {collection.socials?.discord && (
                                <a href={collection.socials.discord} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0c0 0 0 0 0 0zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
                                </a>
                            )}

                            <div className="w-px h-8 bg-white/20 mx-1" />

                            <button
                                onClick={handleFollow}
                                className={`px-6 py-2.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 ${isFollowing
                                    ? 'bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:text-white'
                                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105'
                                    }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>

                            <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105">
                                <Share2 size={20} />
                            </button>

                            <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="max-w-2xl">
                        <p className={`text-gray-400 text-sm md:text-base leading-relaxed transition-all duration-500 ${isDescExpanded ? '' : 'line-clamp-2'}`}>
                            {collection.description}
                        </p>
                        {collection.description.length > 150 && (
                            <button
                                onClick={() => setIsDescExpanded(!isDescExpanded)}
                                className="text-neon-green text-sm font-bold mt-1 hover:underline"
                            >
                                {isDescExpanded ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionHero;
