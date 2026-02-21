export interface OwnedNFT {
    id: number;
    name: string;
    collection: string;
    type: 'ERC-721' | 'ERC-1155';
    floorPrice: number;
    image: string;
    rarity: 'Basic' | 'Special' | 'Premium' | 'Legendary';
    acquiredDate: string;
}

export const COLLECTIONS_LIST = [
    'Luxury',
    'Business',
    'Art',
    'Wellness',
    'Entertainment',
] as const;

export const NFT_TYPES = ['ERC-721', 'ERC-1155'] as const;
export const RARITY_TYPES = ['Basic', 'Special', 'Premium', 'Legendary'] as const;

export const OWNED_NFTS: OwnedNFT[] = [
    {
        id: 1,
        name: 'Genesis Pharaoh #7',
        collection: 'Luxury',
        type: 'ERC-721',
        floorPrice: 4.20,
        image: 'https://picsum.photos/seed/owned1/400/400',
        rarity: 'Legendary',
        acquiredDate: '2025-12-01T10:00:00Z',
    },
    {
        id: 2,
        name: 'Neon Samurai #3',
        collection: 'Art',
        type: 'ERC-721',
        floorPrice: 1.85,
        image: 'https://picsum.photos/seed/owned2/400/400',
        rarity: 'Premium',
        acquiredDate: '2026-01-15T14:30:00Z',
    },
    {
        id: 3,
        name: 'Void Walker #12',
        collection: 'Entertainment',
        type: 'ERC-1155',
        floorPrice: 0.42,
        image: 'https://picsum.photos/seed/owned3/400/400',
        rarity: 'Basic',
        acquiredDate: '2026-02-01T09:00:00Z',
    },
    {
        id: 4,
        name: 'Crystal Titan #1',
        collection: 'Luxury',
        type: 'ERC-721',
        floorPrice: 8.50,
        image: 'https://picsum.photos/seed/owned4/400/400',
        rarity: 'Legendary',
        acquiredDate: '2025-11-20T16:00:00Z',
    },
    {
        id: 5,
        name: 'Digital Monarch #9',
        collection: 'Business',
        type: 'ERC-721',
        floorPrice: 2.30,
        image: 'https://picsum.photos/seed/owned5/400/400',
        rarity: 'Special',
        acquiredDate: '2026-01-05T11:00:00Z',
    },
    {
        id: 6,
        name: 'Zen Garden #4',
        collection: 'Wellness',
        type: 'ERC-1155',
        floorPrice: 0.75,
        image: 'https://picsum.photos/seed/owned6/400/400',
        rarity: 'Basic',
        acquiredDate: '2026-02-10T08:00:00Z',
    },
    {
        id: 7,
        name: 'Astral Phoenix #2',
        collection: 'Art',
        type: 'ERC-721',
        floorPrice: 3.10,
        image: 'https://picsum.photos/seed/owned7/400/400',
        rarity: 'Premium',
        acquiredDate: '2025-12-25T12:00:00Z',
    },
    {
        id: 8,
        name: 'Shadow Reaper #6',
        collection: 'Entertainment',
        type: 'ERC-721',
        floorPrice: 1.20,
        image: 'https://picsum.photos/seed/owned8/400/400',
        rarity: 'Special',
        acquiredDate: '2026-01-20T15:00:00Z',
    },
    {
        id: 9,
        name: 'Golden Nexus #11',
        collection: 'Business',
        type: 'ERC-1155',
        floorPrice: 5.60,
        image: 'https://picsum.photos/seed/owned9/400/400',
        rarity: 'Legendary',
        acquiredDate: '2025-10-30T10:00:00Z',
    },
    {
        id: 10,
        name: 'Emerald Sage #5',
        collection: 'Wellness',
        type: 'ERC-721',
        floorPrice: 0.95,
        image: 'https://picsum.photos/seed/owned10/400/400',
        rarity: 'Basic',
        acquiredDate: '2026-02-18T07:00:00Z',
    },
    {
        id: 11,
        name: 'Obsidian Knight #8',
        collection: 'Luxury',
        type: 'ERC-721',
        floorPrice: 6.75,
        image: 'https://picsum.photos/seed/owned11/400/400',
        rarity: 'Premium',
        acquiredDate: '2025-12-10T18:00:00Z',
    },
    {
        id: 12,
        name: 'Pixel Dreamers #14',
        collection: 'Art',
        type: 'ERC-1155',
        floorPrice: 0.05,
        image: 'https://picsum.photos/seed/owned12/400/400',
        rarity: 'Basic',
        acquiredDate: '2026-02-20T20:00:00Z',
    },
];
