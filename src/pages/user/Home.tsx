import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  ShoppingBag,
  Gavel,
  TrendingUp,
  Image,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { gsap } from "gsap";

import PriceChart from "../../components/Charts/PriceChart";
import AuctionPriceChart from "../../components/Charts/AuctionPriceChart";
import BuySellTable from "../../components/Tables/BuySellTable";
import UserOrdersTable from "../../components/Tables/UserOrdersTable";
import OwnedNFTsTable from "../../components/Tables/OwnedNFTsTable";
import MembershipCard from "../../components/Dashboard/MembershipCard";
import { OWNED_NFTS } from "../../data/ownedNftsData";

/* ─── Mock Data ── */

const KPI_STATS = [
  { label: "Portfolio Value", value: "42.5 ETH", sub: "≈ $127,500", trend: "+8.3%", up: true, icon: Wallet },
  { label: "Owned NFTs", value: "148", sub: "Across 5 collections", trend: "+2 this week", up: true, icon: Image },
  { label: "Active Orders", value: "6", sub: "3 Fixed / 3 Auction", trend: "2 expiring soon", up: false, icon: ShoppingBag },
  { label: "Auctions Won", value: "23", sub: "61% win rate", trend: "+3 this month", up: true, icon: Gavel },
];

const MARKET_OVERVIEW = [
  { label: "Volume 24h", value: "2,451 ETH", trend: "+12.4%", up: true },
  { label: "Sales 24h", value: "1,820", trend: "+5.2%", up: true },
  { label: "Avg Price", value: "0.88 ETH", trend: "-1.1%", up: false },
  { label: "Buyers", value: "3,412", trend: "+8.7%", up: true },
];

const PRICE_HISTORY = [
  { date: "Jan", price: 0.45 }, { date: "Feb", price: 0.62 },
  { date: "Mar", price: 0.58 }, { date: "Apr", price: 0.91 },
  { date: "May", price: 1.12 }, { date: "Jun", price: 0.98 },
  { date: "Jul", price: 1.35 }, { date: "Aug", price: 1.78 },
  { date: "Sep", price: 1.55 }, { date: "Oct", price: 2.10 },
  { date: "Nov", price: 1.95 }, { date: "Dec", price: 2.42 },
];

const AUCTION_DATA = [
  { name: "Pharaoh #7", price: 4.2, status: "won" as const },
  { name: "Samurai #3", price: 1.85, status: "won" as const },
  { name: "Knight #8", price: 3.1, status: "lost" as const },
  { name: "Titan #1", price: 8.5, status: "won" as const },
  { name: "Phoenix #2", price: 2.4, status: "active" as const },
  { name: "Monarch #9", price: 2.3, status: "lost" as const },
  { name: "Nexus #11", price: 5.6, status: "won" as const },
  { name: "Sage #5", price: 0.95, status: "active" as const },
];

const BUY_SELL_DATA = [
  { id: 1, type: "Buy" as const, nftName: "Genesis Pharaoh #7", collection: "Luxury", price: "4.20 ETH", from: "0x82...1D44", to: "0xdf...d9A0", time: "2d ago" },
  { id: 2, type: "Sell" as const, nftName: "Void Walker #12", collection: "Entertainment", price: "0.88 ETH", from: "0xdf...d9A0", to: "0x1c...4d2e", time: "5d ago" },
  { id: 3, type: "Buy" as const, nftName: "Crystal Titan #1", collection: "Luxury", price: "8.50 ETH", from: "0x71...3A92", to: "0xdf...d9A0", time: "1w ago" },
  { id: 4, type: "Buy" as const, nftName: "Digital Monarch #9", collection: "Business", price: "2.30 ETH", from: "0x99...8877", to: "0xdf...d9A0", time: "2w ago" },
  { id: 5, type: "Sell" as const, nftName: "Pixel Dreamers #14", collection: "Art", price: "0.52 ETH", from: "0xdf...d9A0", to: "0x44...5566", time: "3w ago" },
];

const USER_ORDERS = [
  { id: 1, nftName: "Astral Phoenix #2", collection: "Art", type: "Auction" as const, price: "3.10 ETH", status: "Active" as const, date: "Feb 20, 2026" },
  { id: 2, nftName: "Emerald Sage #5", collection: "Wellness", type: "Fixed" as const, price: "0.95 ETH", status: "Active" as const, date: "Feb 18, 2026" },
  { id: 3, nftName: "Shadow Reaper #6", collection: "Entertainment", type: "Fixed" as const, price: "1.50 ETH", status: "Filled" as const, date: "Feb 15, 2026" },
  { id: 4, nftName: "Zen Garden #4", collection: "Wellness", type: "Auction" as const, price: "0.75 ETH", status: "Expired" as const, date: "Feb 10, 2026" },
  { id: 5, nftName: "Neon Samurai #3", collection: "Art", type: "Fixed" as const, price: "2.00 ETH", status: "Cancelled" as const, date: "Feb 5, 2026" },
];

const PORTFOLIO_PRICE = [
  { date: "Week 1", price: 32.1 }, { date: "Week 2", price: 34.8 },
  { date: "Week 3", price: 33.5 }, { date: "Week 4", price: 36.2 },
  { date: "Week 5", price: 38.9 }, { date: "Week 6", price: 37.1 },
  { date: "Week 7", price: 40.5 }, { date: "Week 8", price: 42.5 },
];

/* ─── Component ── */

export default function UserHome() {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageRef.current) return;
    const sections = pageRef.current.querySelectorAll(".dash-section");
    gsap.fromTo(
      sections,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }
    );
  }, []);

  return (
    <div ref={pageRef} className="max-w-7xl mx-auto pt-10 pb-20 space-y-6 md:space-y-8">
      {/* ─── Welcome ─── */}
      <div className="dash-section">
        <p className="text-neon-green text-xs font-semibold uppercase tracking-widest mb-1">
          Dashboard
        </p>
        <h1 className="text-white text-2xl md:text-3xl font-bold">
          Welcome back, <span className="text-neon-green">0xdf...d9A0</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's an overview of your NFT portfolio and market activity.
        </p>
      </div>

      {/* ─── KPI Blocks ─── */}
      <div className="dash-section grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {KPI_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-4 md:p-5 hover:border-neon-green/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl bg-neon-green/[0.08] flex items-center justify-center group-hover:bg-neon-green/15 transition-colors">
                <stat.icon size={18} className="text-neon-green" />
              </div>
              <span
                className={`text-[10px] font-semibold flex items-center gap-0.5 ${stat.up ? "text-neon-green" : "text-amber-400"
                  }`}
              >
                {stat.up && <ArrowUpRight size={10} />}
                {stat.trend}
              </span>
            </div>
            <p className="text-white text-xl md:text-2xl font-bold">{stat.value}</p>
            <p className="text-gray-500 text-[10px] md:text-xs mt-0.5">{stat.sub}</p>
            <p className="text-gray-600 text-[9px] uppercase tracking-wider mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ─── Membership Card ─── */}
      <div className="dash-section">
        <MembershipCard ownedCount={148} />
      </div>

      {/* ─── Market Overview + Price Chart ─── */}
      <div className="dash-section grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        <PriceChart data={PRICE_HISTORY} title="Market Price Trend" height={280} />
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} className="text-neon-green" />
            <h3 className="text-white text-sm font-semibold">Market Overview</h3>
          </div>
          <div className="space-y-0">
            {MARKET_OVERVIEW.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3.5 border-b border-white/[0.04] last:border-0"
              >
                <span className="text-gray-500 text-xs">{item.label}</span>
                <div className="text-right">
                  <p className="text-white text-sm font-semibold">{item.value}</p>
                  <p
                    className={`text-[10px] font-medium ${item.up ? "text-neon-green" : "text-red-400"
                      }`}
                  >
                    {item.up ? "▲" : "▼"} {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Buy & Sell Activity ─── */}
      <div className="dash-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-neon-green" />
            <h2 className="text-white text-lg font-semibold">Buy & Sell Activity</h2>
          </div>
        </div>
        <BuySellTable data={BUY_SELL_DATA} />
      </div>

      {/* ─── Auctions ─── */}
      <div className="dash-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Gavel size={18} className="text-neon-green" />
            <h2 className="text-white text-lg font-semibold">Auction Performance</h2>
          </div>
        </div>
        <AuctionPriceChart data={AUCTION_DATA} title="Your Auction History" height={280} />
      </div>

      {/* ─── User Orders ─── */}
      <div className="dash-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-neon-green" />
            <h2 className="text-white text-lg font-semibold">Your Orders</h2>
          </div>
          <button
            onClick={() => navigate("/user/owned")}
            className="text-neon-green text-xs font-semibold hover:underline flex items-center gap-1"
          >
            Create Order <ArrowUpRight size={12} />
          </button>
        </div>
        <UserOrdersTable data={USER_ORDERS} />
      </div>

      {/* ─── Owned NFTs + Portfolio Chart ─── */}
      <div className="dash-section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image size={18} className="text-neon-green" />
            <h2 className="text-white text-lg font-semibold">Owned NFTs</h2>
          </div>
          <button
            onClick={() => navigate("/user/owned")}
            className="text-neon-green text-xs font-semibold hover:underline flex items-center gap-1"
          >
            View All <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
          <OwnedNFTsTable
            data={OWNED_NFTS.slice(0, 6).map((n) => ({
              id: n.id,
              name: n.name,
              collection: n.collection,
              image: n.image,
              floorPrice: n.floorPrice,
              rarity: n.rarity,
              acquiredDate: n.acquiredDate,
            }))}
          />
          <PriceChart data={PORTFOLIO_PRICE} title="Portfolio Value" height={280} />
        </div>
      </div>
    </div>
  );
}
