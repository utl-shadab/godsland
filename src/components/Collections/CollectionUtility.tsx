
import { Crown, Zap, Ticket, Briefcase } from 'lucide-react';

interface CollectionUtilityProps {
    category: string;
}

const CollectionUtility = ({ category }: CollectionUtilityProps) => {
    // Determine content based on category
    // Categories: 'Luxury', 'Art', 'Entertainment', 'Wellness', 'Business'

    // Normalize category
    const cat = category.toLowerCase();

    const getUtilityContent = () => {
        if (cat === 'luxury') {
            return {
                icon: <Crown size={32} className="text-gold-start" />,
                title: "Membership Benefits",
                description: "Holders receive exclusive access to VIP events, concierge services, and luxury brand partnerships.",
                features: ["Quarterly Gala Access", "Personal Concierge", "Brand Discounts"]
            };
        } else if (cat === 'art') {
            return {
                icon: <Zap size={32} className="text-neon-green" />,
                title: "Artist Spotlight & Airdrops",
                description: "Support the artist and receive limited edition prints, early access to future drops, and governance rights.",
                features: ["Signed Physical Prints", "DAO Voting Rights", "Private Discord"]
            };
        } else if (cat === 'entertainment') {
            return {
                icon: <Ticket size={32} className="text-purple-500" />,
                title: "Event Access Pass",
                description: "This NFT doubles as your ticket to concerts, movie premieres, and backstage experiences.",
                features: ["Backstage Passes", "Meet & Greets", "Merch Store Access"]
            };
        } else if (cat === 'business') {
            return {
                icon: <Briefcase size={32} className="text-blue-500" />,
                title: "Investment & Networking",
                description: "Unlock access to a network of high-net-worth individuals, angel investors, and exclusive deal flow.",
                features: ["Investor Circle", "Startup Pitch Days", "Legal Templates"]
            };
        }

        return null;
    };

    const content = getUtilityContent();

    if (!content) return null;

    return (
        <div className="mb-12 bg-gradient-to-r from-slate-900 to-black border border-white/10 rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                    {content.icon}
                </div>

                <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-2">{content.title}</h2>
                    <p className="text-gray-400 text-sm max-w-2xl">{content.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    {content.features.map(feature => (
                        <div key={feature} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                            {feature}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollectionUtility;
