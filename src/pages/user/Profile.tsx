import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Copy,
  Check,
  ExternalLink,
  Settings,
  Share2,
  User,
  Image,
  Gavel,
  Clock,
  TrendingUp,
  Award,
  Flame,
  Zap,
  Star,
} from "lucide-react";
import { gsap } from "gsap";
import { OWNED_NFTS } from "../../data/ownedNftsData";

type Tab = "owned" | "activity" | "favorites";

const ACTIVITY_FEED = [
  { type: "purchase", title: "Bought Genesis Pharaoh #7", price: "4.20 ETH", time: "2d ago", icon: TrendingUp, color: "text-neon-green" },
  { type: "sale", title: "Sold Void Walker #12", price: "0.88 ETH", time: "5d ago", icon: Zap, color: "text-blue-400" },
  { type: "bid", title: "Placed bid on Crystal Titan #1", price: "7.50 ETH", time: "1w ago", icon: Gavel, color: "text-amber-400" },
  { type: "list", title: "Listed Neon Samurai #3", price: "2.00 ETH", time: "2w ago", icon: Star, color: "text-purple-400" },
  { type: "purchase", title: "Bought Digital Monarch #9", price: "2.30 ETH", time: "3w ago", icon: TrendingUp, color: "text-neon-green" },
  { type: "mint", title: "Minted Shadow Reaper #6", price: "Free", time: "1m ago", icon: Flame, color: "text-pink-400" },
];

const ACHIEVEMENTS = [
  { label: "Early Adopter", desc: "Joined in first 1000 users", icon: Award, unlocked: true },
  { label: "Collector", desc: "Own 100+ NFTs", icon: Image, unlocked: true },
  { label: "Trader", desc: "Complete 50 trades", icon: TrendingUp, unlocked: true },
  { label: "Whale", desc: "Spend 100+ ETH", icon: Flame, unlocked: false },
  { label: "Diamond Hands", desc: "Hold NFTs for 1+ year", icon: Zap, unlocked: false },
  { label: "Auctioneer", desc: "Win 25 auctions", icon: Gavel, unlocked: false },
];

const RARITY_COLORS: Record<string, string> = {
  Basic: "bg-gray-500/80",
  Special: "bg-blue-500/80",
  Premium: "bg-purple-500/80",
  Legendary: "bg-amber-500/80",
};

const Profile = () => {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<Tab>("owned");
  const [copied, setCopied] = useState(false);

  const walletDisplay = "0xdf8B...d9A0";
  const fullAddress = "0xdf8B4C520e1234ab567890cdef123456789d9A0";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!pageRef.current) return;
    const sections = pageRef.current.querySelectorAll(".profile-section");
    gsap.fromTo(
      sections,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" }
    );
  }, []);

  // Animate tab content on change
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".tab-item");
    if (items.length === 0) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto py-20">
      {/* Banner + Avatar */}
      <div className="profile-section relative mb-8">
        <div className="h-40 sm:h-52 rounded-2xl bg-gradient-to-r from-[#0a1a14] via-[#0d2b1f] to-[#0a1a14] border border-white/[0.06] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,211,44,0.08),transparent_60%)]" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 sm:-mt-14 px-4 sm:px-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-neon-green/40 to-neon-green/5 border-4 border-black flex items-center justify-center shadow-[0_0_30px_rgba(0,211,44,0.15)]">
            <User size={48} className="text-neon-green" />
          </div>
          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-white text-xl sm:text-2xl font-bold truncate">
                CryptoKing
              </h1>
              <div className="w-5 h-5 rounded-full bg-neon-green/20 flex items-center justify-center shrink-0">
                <Check size={12} className="text-neon-green" />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-gray-400 hover:text-neon-green transition-colors text-xs font-mono"
              >
                {walletDisplay}
                {copied ? <Check size={12} className="text-neon-green" /> : <Copy size={12} />}
              </button>
              <span className="text-gray-700 text-xs">•</span>
              <span className="text-gray-500 text-xs">Joined Dec 2024</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:pb-1">
            <button
              onClick={() => navigate("/user/settings")}
              className="h-9 px-4 rounded-xl border border-white/10 text-gray-400 text-sm flex items-center gap-2 hover:text-white hover:border-white/20 transition-all"
            >
              <Settings size={14} />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
            <button className="h-9 w-9 rounded-xl border border-white/10 text-gray-400 flex items-center justify-center hover:text-white hover:border-white/20 transition-all">
              <Share2 size={14} />
            </button>
            <button className="h-9 w-9 rounded-xl border border-white/10 text-gray-400 flex items-center justify-center hover:text-white hover:border-white/20 transition-all">
              <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bio + Stats */}
      <div className="profile-section grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-8">
        {/* Bio */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Collector and trader since 2024. Focused on luxury and art NFTs.
            Building the future of digital ownership, one token at a time. 🚀
          </p>
          <div className="flex flex-wrap gap-2">
            {["Luxury", "Art", "Premium Collector", "Early Adopter"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-neon-green/[0.06] border border-neon-green/20 text-neon-green text-[10px] font-semibold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Value", value: "42.5 ETH", sub: "≈ $127,500" },
            { label: "Items Owned", value: String(OWNED_NFTS.length), sub: "Across 5 collections" },
            { label: "Volume Traded", value: "118 ETH", sub: "All time" },
            { label: "Auctions Won", value: "23", sub: "61% win rate" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-3 md:p-4 hover:border-neon-green/20 transition-colors"
            >
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-white text-lg font-bold">{stat.value}</p>
              <p className="text-gray-600 text-[10px]">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="profile-section mb-8">
        <h2 className="text-white text-base font-semibold mb-4 flex items-center gap-2">
          <Award size={18} className="text-neon-green" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.label}
              className={`rounded-xl border p-3 flex flex-col items-center text-center transition-all ${ach.unlocked
                  ? "border-neon-green/20 bg-neon-green/[0.03] hover:border-neon-green/40"
                  : "border-white/[0.06] bg-[#0a0a0a] opacity-50"
                }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${ach.unlocked ? "bg-neon-green/15" : "bg-white/5"
                  }`}
              >
                <ach.icon
                  size={20}
                  className={ach.unlocked ? "text-neon-green" : "text-gray-600"}
                />
              </div>
              <p className={`text-xs font-semibold ${ach.unlocked ? "text-white" : "text-gray-500"}`}>
                {ach.label}
              </p>
              <p className="text-gray-600 text-[9px] mt-0.5">{ach.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-section">
        <div className="flex items-center gap-1 border-b border-white/[0.06] mb-6 overflow-x-auto scrollbar-hide">
          {[
            { id: "owned" as Tab, label: "Owned", icon: Image, count: OWNED_NFTS.length },
            { id: "activity" as Tab, label: "Activity", icon: Clock, count: ACTIVITY_FEED.length },
            { id: "favorites" as Tab, label: "Favorites", icon: Star, count: 8 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id
                  ? "border-neon-green text-neon-green"
                  : "border-transparent text-gray-500 hover:text-white"
                }`}
            >
              <tab.icon size={14} />
              {tab.label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === tab.id
                    ? "bg-neon-green/15 text-neon-green"
                    : "bg-white/5 text-gray-500"
                  }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div ref={gridRef}>
          {/* Owned Tab */}
          {activeTab === "owned" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {OWNED_NFTS.slice(0, 8).map((nft) => (
                <div
                  key={nft.id}
                  onClick={() => navigate(`/user/owned/${nft.id}/sell`)}
                  className="tab-item group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden hover:border-neon-green/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,211,44,0.06)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0A2219] via-[#0d1d17] to-[#0D2B1F]">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-neon-green/90 text-black text-[10px] font-bold">
                      {nft.type}
                    </span>
                    <span
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-[10px] font-bold ${RARITY_COLORS[nft.rarity]
                        }`}
                    >
                      {nft.rarity}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-semibold truncate">{nft.name}</p>
                    <div className="flex items-center justify-between text-xs mt-2">
                      <span className="text-gray-500">Floor</span>
                      <span className="text-white font-medium">{nft.floorPrice.toFixed(2)} ETH</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-gray-500">Collection</span>
                      <span className="text-neon-green/80 font-medium">{nft.collection}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-2">
              {ACTIVITY_FEED.map((item, i) => (
                <div
                  key={i}
                  className="tab-item flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#0a0a0a] px-4 py-3 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center">
                      <item.icon size={18} className={item.color} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-white text-sm font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {OWNED_NFTS.slice(4, 12).map((nft) => (
                <div
                  key={nft.id}
                  className="tab-item group rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden hover:border-neon-green/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,211,44,0.06)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0A2219] via-[#0d1d17] to-[#0D2B1F]">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-[10px] font-bold ${RARITY_COLORS[nft.rarity]
                        }`}
                    >
                      {nft.rarity}
                    </span>
                    <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-semibold truncate">{nft.name}</p>
                    <div className="flex items-center justify-between text-xs mt-2">
                      <span className="text-gray-500">Floor</span>
                      <span className="text-white font-medium">{nft.floorPrice.toFixed(2)} ETH</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View All */}
        {activeTab === "owned" && OWNED_NFTS.length > 8 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/user/owned")}
              className="px-6 py-2.5 rounded-xl border border-neon-green/30 text-neon-green text-sm font-semibold hover:bg-neon-green/5 transition-colors"
            >
              View All {OWNED_NFTS.length} NFTs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
