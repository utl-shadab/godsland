import { useRef } from 'react';


const categories = [
    "All", "Art", "Music", "Virtual Worlds", "Trading Cards", "Collectibles", "Photography", "Utility"
];

interface CategoryTabsProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

const CategoryTabs = ({ activeCategory, setActiveCategory }: CategoryTabsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative mb-8 group">
            <div
                ref={scrollRef}
                className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mask-fade-sides"
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`
                            relative px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300
                            ${activeCategory === category
                                ? 'text-black bg-neon-green shadow-[0_0_20px_rgba(0,255,163,0.4)]'
                                : 'text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white border border-white/5'}
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryTabs;
