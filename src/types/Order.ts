export interface Order {
    orderId: string;
    auctionId: string;
    nftId: string;
    itemTitle: string;
    itemImage: string;
    sellerId: string;
    buyerId: string;
    finalPrice: number;
    platformFee: number;
    royalty: number;
    transactionHash: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    timestamp: Date;
}
