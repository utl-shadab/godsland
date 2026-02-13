
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
