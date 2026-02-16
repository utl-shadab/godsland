import { Link } from 'react-router-dom';
import LiveAuctionCard from './LiveAuctionCard';

const auctions = [
    { title: 'Golden Phoenix Rising', image: 'https://images.unsplash.com/photo-1635492491273-455af7728453?auto=format&fit=crop&q=80&w=600', price: '3200 USDT' },
    { title: 'Cyber Samurai #88', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600', price: '1500 USDT' },
    { title: 'Neon Genesis Explorer', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600', price: '4500 USDT' },
    { title: 'Quantum Spirit God', image: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600', price: '8000 USDT' },
    { title: 'Ethereal Angel', image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600', price: '2100 USDT' },
    { title: 'Neon Genesis Explorer', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600', price: '4500 USDT' },
];

const LiveAuctionSection = () => {
    return (
        <section className="py-10 bg-black relative z-10">
            <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
                <h2 className="text-4xl text-white font-bold uppercase tracking-wider">
                    Live <span className="text-neon-green">Auctions</span>
                </h2>
                <Link to="/auction" className="text-neon-green uppercase tracking-widest text-sm hover:underline">View All</Link>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-start">
                    {auctions.map((item, index) => (
                        <div key={index} className="w-full">
                            <LiveAuctionCard {...item} />
                        </div>
                    ))}
                    {/* Reuse items to show full grid if necessary */}
                    {/* {auctions.map((item, index) => (
                        <div key={`dup-${index}`} className="w-full">
                            <LiveAuctionCard {...item} />
                        </div>
                    ))} */}
                </div>
            </div>
        </section>
    );
};

export default LiveAuctionSection;
