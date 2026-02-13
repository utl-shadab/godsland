import { Share2, Music, Camera, Grid, Watch } from 'lucide-react';

export const CATEGORIES = [
    { id: 'luxury', name: 'Luxury', icon: Share2, color: 'text-purple-400' },
    { id: 'business', name: 'Business', icon: Grid, color: 'text-blue-400' },
    { id: 'wellness', name: 'Wellness', icon: Watch, color: 'text-green-400' }, // Replaced Activity with Watch as proxy
    { id: 'entertainment', name: 'Entertainment', icon: Music, color: 'text-pink-400' },
    { id: 'art', name: 'Art', icon: Camera, color: 'text-yellow-400' },
];

export const COLLECTIONS = CATEGORIES.flatMap(cat =>
    Array.from({ length: 8 }).map((_, i) => ({
        id: `col-${cat.id}-${i + 1}`,
        name: `${cat.name} Collection ${i + 1}`,
        categoryId: cat.id,
        floorPrice: (Math.random() * 5 + 0.1).toFixed(2),
        image: `https://picsum.photos/seed/${cat.id}${i}/400/400`,
        bannerImage: `https://picsum.photos/seed/${cat.id}${i}banner/1600/400`,
        description: `This is a premium ${cat.name} collection featuring unique items and exclusive benefits for holders. Explore the world of ${cat.name} with Collection ${i + 1}.`,
        creator: {
            name: `${cat.name} Creator`,
            verified: Math.random() > 0.5,
            image: `https://picsum.photos/seed/${cat.id}creator/100/100`
        },
        verified: Math.random() > 0.3,
        volume: (Math.random() * 500).toFixed(1) + ' ETH',
        floorChange24h: (Math.random() * 20 - 10).toFixed(2),
        volume24h: Math.floor(Math.random() * 1000),
        volumeChange24h: (Math.random() * 20 - 10).toFixed(2),
        volume7d: Math.floor(Math.random() * 5000),
        volumeChange7d: (Math.random() * 20 - 10).toFixed(2),
        volume30d: Math.floor(Math.random() * 20000),
        volumeChange30d: (Math.random() * 20 - 10).toFixed(2),
        owners: Math.floor(Math.random() * 500),
        itemCount: 6,
        royalty: 5
    }))
);

export const MOCK_NFTS = COLLECTIONS.flatMap(col =>
    Array.from({ length: 6 }).map((_, i) => ({
        id: `${col.id}-item-${i + 1}`,
        title: `${col.name} #${i + 1}`,
        creator: `Creator of ${col.name}`,
        price: (Math.random() * 2 + 0.1).toFixed(2) + ' ETH',
        image: `https://picsum.photos/seed/${col.id}item${i}/400/400`,
        category: col.categoryId,
        collectionId: col.id,
        type: ['Basic', 'Special', 'Premium', 'Legendary'][Math.floor(Math.random() * 4)],
        stars: Math.floor(Math.random() * 500)
    }))
);

// NEW DASHBOARD DATA

export const TOP_PACKS = [
    { id: 'pack-1', title: 'Claynosaurz', price: '13.67 SOL', image: 'https://picsum.photos/seed/pack1/400/400', badge: 'Featured' },
    { id: 'pack-2', title: 'Skrumpeys', price: '3.8K MON', image: 'https://picsum.photos/seed/pack2/400/400', badge: 'Featured' },
    { id: 'pack-3', title: 'Ordinal Maxi Biz', price: '0.0123 BTC', image: 'https://picsum.photos/seed/pack3/400/400', badge: 'Featured' },
    { id: 'pack-4', title: 'Dead Doges', price: '0.0002 BTC', image: 'https://picsum.photos/seed/pack4/400/400', badge: 'Featured' },
    { id: 'pack-5', title: 'The 10k Squad', price: '1K MON', image: 'https://picsum.photos/seed/pack5/400/400', badge: 'Featured' },
];

export const BIGGEST_MOVERS = [
    { id: 'move-1', title: 'Bored Ape', change: '+12.5%', price: '45 ETH', image: 'https://picsum.photos/seed/move1/400/400' },
    { id: 'move-2', title: 'Azuki', change: '+8.2%', price: '12 ETH', image: 'https://picsum.photos/seed/move2/400/400' },
    { id: 'move-3', title: 'Doodles', change: '-2.1%', price: '5 ETH', image: 'https://picsum.photos/seed/move3/400/400' },
    { id: 'move-4', title: 'Moonbirds', change: '+5.4%', price: '8 ETH', image: 'https://picsum.photos/seed/move4/400/400' },
    { id: 'move-5', title: 'Clone X', change: '+1.1%', price: '6 ETH', image: 'https://picsum.photos/seed/move5/400/400' },
];

export const NEW_COLLECTIONS = [
    { id: 'new-1', title: 'CyberPunks 2077', floor: '0.5 ETH', image: 'https://picsum.photos/seed/new1/400/400' },
    { id: 'new-2', title: 'Galactic Diggers', floor: '0.1 ETH', image: 'https://picsum.photos/seed/new2/400/400' },
    { id: 'new-3', title: 'Neon District', floor: '2.5 ETH', image: 'https://picsum.photos/seed/new3/400/400' },
    { id: 'new-4', title: 'Pixel art World', floor: '0.05 ETH', image: 'https://picsum.photos/seed/new4/400/400' },
    { id: 'new-5', title: 'Metaverse Estates', floor: '10 ETH', image: 'https://picsum.photos/seed/new5/400/400' },
];

export const DROPS_CALENDAR = [
    { id: 'drop-1', title: 'Future Apes', date: 'Feb 14', time: '12:00 PM UTC', image: 'https://picsum.photos/seed/drop1/400/400' },
    { id: 'drop-2', title: 'Space Warriors', date: 'Feb 18', time: '02:00 PM UTC', image: 'https://picsum.photos/seed/drop2/400/400' },
    { id: 'drop-3', title: 'Crypto Kitties Gen 2', date: 'Feb 20', time: '10:00 AM UTC', image: 'https://picsum.photos/seed/drop3/400/400' },
    { id: 'drop-4', title: 'Virtual Lands', date: 'Feb 25', time: '06:00 PM UTC', image: 'https://picsum.photos/seed/drop4/400/400' },
    { id: 'drop-5', title: 'Golden Tickets', date: 'Mar 01', time: '00:00 AM UTC', image: 'https://picsum.photos/seed/drop5/400/400' },
];

export const MOCK_USER = {
    id: 'user-123',
    name: 'CryptoKing',
    avatar: 'https://i.pravatar.cc/150?u=user-123',
    balance: '14.50 ETH',
    stars: 1250,
    address: '0x1234...5678'
};
