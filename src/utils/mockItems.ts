
import { MOCK_TRAITS } from './mockTraits';

export interface ITrait {
    name: string;
    value: string;
    count?: number;
    percentage?: number;
    rarity?: string;
}

export interface IItem {
    id: string;
    name: string;
    image: string;
    price: number | null;
    isListed: boolean;
    rarity: {
        score: number;
        rank: number;
        level: string;
    };
    traits: ITrait[];
    owner: string;
    lastSalePrice: number | null;
    isFavorited: boolean;
}

export interface IItemDetail extends IItem {
    collection: { name: string; slug: string };
    images: string[];
    description: string;
    creator: {
        address: string;
        name: string;
        verified: boolean;
    };
    royalty: number;
    transactionHistory: any[];
    activeOffers: any[];
}

// Generate some mock items
const generateMockItems = (count: number): IItem[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `item_${i + 1}`,
        name: `#${1000 + i}`,
        image: `https://picsum.photos/400/400?random=${i}`,
        price: Math.random() > 0.3 ? Number((Math.random() * 2 + 0.1).toFixed(2)) : null,
        isListed: Math.random() > 0.3,
        rarity: {
            score: Math.floor(Math.random() * 100),
            rank: Math.floor(Math.random() * 5000),
            level: Math.random() > 0.9 ? 'Legendary' : Math.random() > 0.7 ? 'Rare' : 'Common'
        },
        traits: [
            { name: 'Background', value: Object.keys(MOCK_TRAITS['Background']).length > 0 ? MOCK_TRAITS['Background'][Math.floor(Math.random() * MOCK_TRAITS['Background'].length)].name : 'Blue' },
            { name: 'Eyes', value: MOCK_TRAITS['Eyes'][Math.floor(Math.random() * MOCK_TRAITS['Eyes'].length)].name },
            { name: 'Hat', value: MOCK_TRAITS['Hat'][Math.floor(Math.random() * MOCK_TRAITS['Hat'].length)].name }
        ],
        owner: '0x' + Math.random().toString(16).substr(2, 40),
        lastSalePrice: Math.random() > 0.5 ? Number((Math.random() * 1.5).toFixed(2)) : null,
        isFavorited: Math.random() > 0.8
    }));
};

export const MOCK_ITEMS = generateMockItems(100);

export const getItemsByCollection = (_collectionId: string): IItem[] => {
    // In a real app, filtering by collectionId would happen here
    return MOCK_ITEMS;
};

// ... imports
import { MOCK_NFTS, COLLECTIONS } from '../data/marketplaceData';

// ... other code ...

export const getItemById = (itemId: string): IItemDetail | undefined => {
    // 1. Try finding in local random MOCK_ITEMS
    const localItem = MOCK_ITEMS.find(i => i.id === itemId);

    if (localItem) {
        return {
            ...localItem,
            collection: { name: "Pudgy Penguins", slug: "pudgy-penguins" },
            images: [localItem.image, `https://picsum.photos/400/400?random=${localItem.id}_2`, `https://picsum.photos/400/400?random=${localItem.id}_3`],
            description: "A rare and unique NFT from the collection. Verified on the blockchain.",
            creator: {
                address: "0x123...",
                name: "Pudgy Penguins",
                verified: true
            },
            royalty: 5,
            transactionHistory: [],
            activeOffers: []
        };
    }

    // 2. Try finding in marketplaceData MOCK_NFTS (Explore/Collection Page items)
    const marketplaceItem = MOCK_NFTS.find(i => i.id === itemId);

    if (marketplaceItem) {
        // Find associated collection
        const col = COLLECTIONS.find(c => c.id === marketplaceItem.collectionId);

        return {
            id: marketplaceItem.id,
            name: marketplaceItem.title,
            image: marketplaceItem.image,
            price: parseFloat(marketplaceItem.price.replace(' ETH', '')),
            isListed: true,
            rarity: {
                score: marketplaceItem.stars, // Use stars as score proxy
                rank: Math.floor(Math.random() * 1000) + 1,
                level: marketplaceItem.type // 'Legendary', etc.
            },
            traits: [
                { name: 'Category', value: marketplaceItem.category },
                { name: 'Type', value: marketplaceItem.type }
            ],
            owner: '0x742...39ac',
            lastSalePrice: null,
            isFavorited: false,
            collection: {
                name: col ? col.name : 'Unknown Collection',
                slug: col ? col.id : 'unknown'
            },
            images: [
                marketplaceItem.image,
                `https://picsum.photos/seed/${itemId}extra1/400/400`,
                `https://picsum.photos/seed/${itemId}extra2/400/400`
            ],
            description: `A unique item from ${col ? col.name : 'the marketplace'}. This NFT features exclusive traits and is part of a verified collection.`,
            creator: {
                address: "0x123...abc",
                name: marketplaceItem.creator,
                verified: true
            },
            royalty: 5,
            transactionHistory: [],
            activeOffers: []
        };
    }

    // 3. Fallback for numeric IDs (Legacy support if needed)
    if (!isNaN(Number(itemId))) {
        return {
            id: itemId,
            name: `NFT #${itemId}`,
            image: `https://picsum.photos/seed/${itemId}/400/400`,
            price: 2.5,
            isListed: true,
            rarity: { score: 85, rank: 420, level: 'Rare' },
            traits: [],
            owner: '0x742...39ac',
            lastSalePrice: 1.8,
            isFavorited: false,
            collection: { name: "Godsland Prime", slug: "godsland-prime" },
            images: [`https://picsum.photos/seed/${itemId}/400/400`],
            description: `Detailed view for NFT #${itemId}.`,
            creator: { address: "0x123...abc", name: "Godsland Creator", verified: true },
            royalty: 5,
            transactionHistory: [],
            activeOffers: []
        };
    }

    return undefined;
};

export const filterItems = (items: IItem[], filters: any) => {
    let filtered = [...items];

    // Status
    if (filters.status.buyNow) {
        filtered = filtered.filter(item => item.isListed);
    }

    // Price
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
        filtered = filtered.filter(item => {
            const price = item.price || 0;
            return price >= filters.priceRange.min && price <= filters.priceRange.max;
        });
    }

    // Rarity
    if (filters.rarity && filters.rarity.length > 0) {
        filtered = filtered.filter(item => filters.rarity.includes(item.rarity.level));
    }

    // Traits
    if (filters.traits && Object.keys(filters.traits).length > 0) {
        filtered = filtered.filter(item => {
            return Object.entries(filters.traits).every(([traitName, values]: [string, any]) => {
                if (!values || values.length === 0) return true;
                return item.traits.some(t => t.name === traitName && values.includes(t.value));
            });
        });
    }

    return filtered;
};

export const sortItems = (items: IItem[], sortBy: string) => {
    const sorted = [...items];
    switch (sortBy) {
        case 'lowest_price':
            return sorted.sort((a, b) => (a.price || 9999) - (b.price || 9999));
        case 'highest_price':
            return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        case 'rarity_rank':
            return sorted.sort((a, b) => a.rarity.rank - b.rarity.rank);
        case 'newest':
        default:
            return sorted; // Assume already sorted by newest
    }
};
