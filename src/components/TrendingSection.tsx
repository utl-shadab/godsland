import TrendingCard from "./TrendingCard";

const trendingItems = [
    { title: "Crown of Eternity", image: "/image-1.jpeg", price: "5000 USDT" },
    { title: "Cyber Punk #2077", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600", price: "2800 USDT" },
    { title: "Mecha God", image: "https://images.unsplash.com/photo-1635492491273-455af7728453?auto=format&fit=crop&q=80&w=600", price: "4200 USDT" },
    { title: "Neo Tokyo Drifter", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=600", price: "1900 USDT" },
    { title: "Void Walker", image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&q=80&w=600", price: "6600 USDT" },
    { title: "Dark Samurai", image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=600", price: "3100 USDT" },
];

const TrendingSection = () => {
    return (
        <section className="py-10 bg-[#050505]">
            <div className="max-w-[1600px] mx-auto px-6">

                {/* Header */}
                <div className="mb-16 flex justify-between items-end">
                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase tracking-tight">
                        Trending NFTs
                    </h2>

                    <a
                        href="/explore"
                        className="text-neon-green uppercase tracking-widest text-sm hover:underline font-bold"
                    >
                        View All
                    </a>
                </div>

                {/* GRID SYSTEM */}
                <div className="
          grid 
          gap-2
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          2xl:grid-cols-6
        ">
                    {trendingItems.map((item, i) => (
                        <TrendingCard key={i} {...item} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrendingSection;
