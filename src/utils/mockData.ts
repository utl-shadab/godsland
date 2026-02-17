
export interface ICollection {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string;
    bannerImage: string;
    creator: {
        name: string;
        address: string;
        verified: boolean;
    };
    floorPrice: number;
    floorChange24h: number; // Added
    volume24h: number;
    volumeChange24h: number; // Added
    volume7d: number;
    volumeChange7d: number; // Added
    volume30d: number;
    volumeChange30d: number; // Added
    owners: number;
    itemCount: number;
    royalty: number;
    verified: boolean;
    chain: string;
    socials?: {
        twitter?: string;
        discord?: string;
        website?: string;
    };
    listedCount?: number;
    auctionCount?: number;
}

export const MOCK_COLLECTIONS: ICollection[] = [
    {
        id: "col_123",
        slug: "pudgy-penguins",
        name: "Pudgy Penguins",
        description: "A collection of 8,888 cute plump penguins sliding around on the freezing ETH blockchain.",
        image: "https://i.seadn.io/gae/yNi-XDGxsgTw5Ue9v3VyHF8lyEzD9mFAVqIAIFXX3F3P4eYt35d3Q7s6s4s8IH3q_2_2_2_2.png?auto=format&dpr=1&w=384",
        bannerImage: "https://i.seadn.io/gae/yNi-XDGxsgTw5Ue9v3VyHF8lyEzD9mFAVqIAIFXX3F3P4eYt35d3Q7s6s4s8IH3q_2.png?auto=format&dpr=1&w=1920",
        creator: {
            name: "Pudgy Penguins",
            address: "0xBd3531dA5CF5857e7CfAA94D55DAD787DD63EF8C",
            verified: true
        },
        floorPrice: 12.5,
        floorChange24h: 3.2,
        volume24h: 530,
        volumeChange24h: 2.1,
        volume7d: 18200,
        volumeChange7d: -1.2,
        volume30d: 45600,
        volumeChange30d: 8.5,
        owners: 4234,
        itemCount: 8888,
        royalty: 5,
        verified: true,
        chain: "ethereum",
        socials: {
            twitter: "https://twitter.com/pudgypenguins",
            discord: "https://discord.gg/pudgypenguins",
            website: "https://pudgypenguins.com"
        },
        listedCount: 450,
        auctionCount: 12
    },
    {
        id: "col_456",
        slug: "bored-ape-yacht-club",
        name: "Bored Ape Yacht Club",
        description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain.",
        image: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89A_hIpnGUIXsw_c_2.png?auto=format&dpr=1&w=384",
        bannerImage: "https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJ8tDa1M2tU5H9g9y8.png?auto=format&dpr=1&w=1920",
        creator: {
            name: "Yuga Labs",
            address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
            verified: true
        },
        floorPrice: 25.4,
        floorChange24h: -1.5,
        volume24h: 1200,
        volumeChange24h: 5.4,
        volume7d: 45000,
        volumeChange7d: 2.3,
        volume30d: 150000,
        volumeChange30d: 1.1,
        owners: 5600,
        itemCount: 10000,
        royalty: 2.5,
        verified: true,
        chain: "ethereum",
        socials: {
            twitter: "https://twitter.com/BoredApeYC",
            discord: "https://discord.gg/bayc",
            website: "https://boredapeyachtclub.com"
        },
        listedCount: 850,
        auctionCount: 45
    }
];

export const getCollectionBySlug = (slug: string): ICollection | undefined => {
    return MOCK_COLLECTIONS.find(c => c.slug === slug);
};

export const getCollectionStats = (collectionId: string) => {
    const collection = MOCK_COLLECTIONS.find(c => c.id === collectionId);
    return collection ? {
        floorPrice: collection.floorPrice,
        volume24h: collection.volume24h,
        volume7d: collection.volume7d,
        owners: collection.owners,
        itemCount: collection.itemCount
    } : null;
};

// Mock data generator helpers
export const generateEthAddress = () => {
    return '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export const formatPrice = (price: number) => {
    return price.toFixed(2) + ' ETH';
};

export const truncateAddress = (address: string, chars = 4) => {
    if (!address) return '';
    return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
};
