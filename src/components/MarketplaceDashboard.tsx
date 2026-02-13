import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TrendingUp, Calendar, Box, Activity, Grid } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CATEGORIES, TOP_PACKS, BIGGEST_MOVERS, NEW_COLLECTIONS, DROPS_CALENDAR } from '../data/marketplaceData';

gsap.registerPlugin(ScrollTrigger);

const SectionHeader = ({ title, icon: Icon, onSeeAll }: any) => (
    <div className="flex items-center justify-between mb-6 px-4 md:px-0">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-green/10 rounded-lg text-neon-green">
                <Icon size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">{title}</h2>
        </div>
        <button
            onClick={onSeeAll}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
        >
            See All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
    </div>
);

const DashboardCard = ({ item, type, onClick }: any) => {
    return (
        <div
            onClick={onClick}
            className="flex-shrink-0 w-[240px] md:w-[280px] bg-[#111] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-neon-green/50 hover:shadow-[0_0_20px_rgba(0,255,163,0.1)] transition-all duration-300 group"
        >
            {/* Image Area */}
            <div className="h-[240px] md:h-[280px] relative overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                {item.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full text-black textxs font-bold uppercase tracking-wider flex items-center gap-1">
                        ★ {item.badge}
                    </div>
                )}
            </div>

            {/* Info Area */}
            <div className="p-4 relative">
                <h3 className="font-bold text-white text-lg truncate mb-1">{item.title}</h3>

                <div className="flex items-center justify-between mt-2">
                    {/* Price / Floor */}
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{type === 'mover' ? 'Price' : 'Floor'}</span>
                        <span className="text-neon-green font-mono font-bold">
                            {item.price || item.floor}
                        </span>
                    </div>

                    {/* Change / Date */}
                    {item.change && (
                        <div className={`text-sm font-bold ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {item.change}
                        </div>
                    )}
                    {item.date && (
                        <div className="text-xs text-white bg-white/10 px-2 py-1 rounded">
                            {item.date}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MarketplaceDashboard = ({ onCategorySelect, onCollectionSelect }: any) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useGSAP(() => {
        const sections = gsap.utils.toArray('.dashboard-section');
        sections.forEach((section: any) => {
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                    }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="pb-20">

            {/* Categories Rail */}
            <div className="dashboard-section mb-12">
                <div className="flex items-center gap-4 overflow-x-auto custom-scrollbar pb-4 px-4 md:px-0">
                    <button
                        onClick={() => onCategorySelect('all')}
                        className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-neon-green text-black rounded-xl font-bold hover:bg-white transition-colors"
                    >
                        <Grid size={18} /> All Items
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => onCategorySelect(cat.id)}
                            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#111] border border-white/10 text-white rounded-xl font-bold hover:border-neon-green hover:text-neon-green transition-all"
                        >
                            <cat.icon size={18} className={cat.color} />
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Top Pack Pulls */}
            <section className="dashboard-section mb-16">
                <SectionHeader title="Top Pack Pulls" icon={Box} onSeeAll={() => navigate('/market/all')} />
                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-6 px-4 md:px-0">
                    {TOP_PACKS.map(item => (
                        <DashboardCard
                            key={item.id}
                            item={item}
                            type="pack"
                            onClick={() => onCollectionSelect(item)} /* Mocking interaction */
                        />
                    ))}
                </div>
            </section>

            {/* Biggest Movers */}
            <section className="dashboard-section mb-16">
                <SectionHeader title="Biggest Movers in NFTs" icon={TrendingUp} onSeeAll={() => navigate('/market/all')} />
                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-6 px-4 md:px-0">
                    {BIGGEST_MOVERS.map(item => (
                        <DashboardCard
                            key={item.id}
                            item={item}
                            type="mover"
                            onClick={() => onCollectionSelect(item)}
                        />
                    ))}
                </div>
            </section>

            {/* New Collections */}
            <section className="dashboard-section mb-16">
                <SectionHeader title="New NFT Collections" icon={Activity} onSeeAll={() => navigate('/market/all')} />
                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-6 px-4 md:px-0">
                    {NEW_COLLECTIONS.map(item => (
                        <DashboardCard
                            key={item.id}
                            item={item}
                            type="new"
                            onClick={() => onCollectionSelect(item)}
                        />
                    ))}
                </div>
            </section>

            {/* Drops Calendar */}
            <section className="dashboard-section mb-16">
                <SectionHeader title="NFT Drops Calendar" icon={Calendar} onSeeAll={() => navigate('/market/all')} />
                <div className="flex gap-6 overflow-x-auto custom-scrollbar pb-6 px-4 md:px-0">
                    {DROPS_CALENDAR.map(item => (
                        <DashboardCard
                            key={item.id}
                            item={item}
                            type="drop"
                            onClick={() => onCollectionSelect(item)}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default MarketplaceDashboard;
