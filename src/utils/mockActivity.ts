
export interface IActivity {
    id: string;
    itemId: string;
    itemName: string;
    itemImage: string;
    eventType: 'sale' | 'list' | 'transfer' | 'offer' | 'mint';
    price: number | null;
    from: { address: string; name?: string; verified: boolean };
    to: { address: string; name?: string; verified: boolean } | null;
    timestamp: string;
    txHash: string;
    blockExplorerUrl: string;
}

const EVENT_TYPES = ['sale', 'list', 'transfer', 'offer', 'mint'] as const;

const generateMockActivity = (count: number): IActivity[] => {
    return Array.from({ length: count }).map((_, i) => {
        const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
        return {
            id: `act_${i}`,
            itemId: `item_${Math.floor(Math.random() * 100)}`,
            itemName: `#${1000 + Math.floor(Math.random() * 100)}`,
            itemImage: `https://picsum.photos/400/400?random=${i}`,
            eventType: type,
            price: type === 'transfer' || type === 'mint' ? null : Number((Math.random() * 2).toFixed(2)),
            from: { address: '0x' + Math.random().toString(16).substr(2, 40), verified: Math.random() > 0.8 },
            to: type === 'list' ? null : { address: '0x' + Math.random().toString(16).substr(2, 40), verified: Math.random() > 0.8 },
            timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
            txHash: '0x' + Math.random().toString(16).substr(2, 40),
            blockExplorerUrl: '#'
        };
    });
};

export const MOCK_ACTIVITY = generateMockActivity(50);

export const getCollectionActivity = (_collectionId: string, limit = 100): IActivity[] => {
    return MOCK_ACTIVITY.slice(0, limit);
};
