import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const categories = [
    { name: 'Luxury', redirect: '/categories/luxury', rank: '#1', items: '10,000', owners: '3,241', verified: true, floorPrice: '2.5 ETH', volume: '12.4K ETH', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600' },
    { name: 'Business', redirect: '/categories/business', rank: '#2', items: '5,000', owners: '1,892', verified: true, floorPrice: '0.8 ETH', volume: '5.2K ETH', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600' },
    { name: 'Wellness', redirect: '/categories/wellness', rank: '#3', items: '8,000', owners: '2,430', verified: false, floorPrice: '1.2 ETH', volume: '8.9K ETH', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600' },
    { name: 'Entertainment', redirect: '/categories/entertainment', rank: '#4', items: '12,000', owners: '4,567', verified: true, floorPrice: '0.5 ETH', volume: '3.1K ETH', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600' },
    { name: 'Art', redirect: '/categories/art', rank: '#5', items: '6,000', owners: '2,109', verified: false, floorPrice: '3.0 ETH', volume: '15.6K ETH', image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=600' },
];

const CategoryCard = ({ cat }: { cat: typeof categories[0] }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                height: "auto",
                opacity: 1,
                marginTop: "0.5rem",
                duration: 0.4,
                ease: "power3.out"
            });
        }
    };

    const handleMouseLeave = () => {
        if (buttonRef.current) {
            gsap.to(buttonRef.current, {
                height: 0,
                opacity: 0,
                marginTop: 0,
                duration: 0.3,
                ease: "power3.in"
            });
        }
    };

    return (
        <div
            className="w-full max-w-[340px] bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-neon-green/50 hover:shadow-[0_10px_40px_rgba(0,255,128,0.15)] hover:-translate-y-3 transition-all duration-300 group cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image - 1:1 Aspect Ratio */}
            <div className="aspect-square relative overflow-hidden">
                <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Rank Badge */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                    {cat.rank}
                </div>

                {/* Verified Badge */}
                {cat.verified && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-green-400 text-xs px-3 py-1 rounded-full">
                        ✔ Verified
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Details */}
            <div className="p-3">
                <h3 className="text-neon-green! font-bold  mb-2 tracking-wide">{cat.name}</h3>

                <div className="flex justify-between items-center text-sm border-t border-white/10 pt-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Floor</span>
                        <span className="text-neon-green! text-xs font-bold">{cat.floorPrice}</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Volume</span>
                        <span className="text-white! text-xs font-bold">{cat.volume}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-2 mt-2">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                            Items
                        </p>
                        <p className="text-white text-xs font-semibold">
                            {cat.items}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                            Owners
                        </p>
                        <p className="text-white! text-xs font-semibold">
                            {cat.owners}
                        </p>
                    </div>
                </div>

                {/* Animated Button */}
                <button
                    ref={buttonRef}
                    onClick={()=>navigate(`/collections/${cat.name.toLocaleLowerCase()}`)}
                    className="w-full cursor-pointer bg-neon-green text-black py-3 rounded-lg font-bold hover:bg-white transition-colors duration-300 h-0 opacity-0 overflow-hidden"
                >
                    View Collection
                </button>
            </div>
        </div>
    );
};

const CategoriesSection = () => {
    return (
        <section className="py-24 bg-black relative z-10">
            <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
                <h2 className="text-4xl text-white font-bold uppercase tracking-wider">Browse Categories</h2>
                <Link to="/explore" className="text-neon-green uppercase tracking-widest text-sm hover:underline">View All</Link>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center items-start">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} cat={cat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
