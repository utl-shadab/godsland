import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Tag,
  Gavel,
  Info,
  CheckCircle,
  ChevronDown,
  Loader2,
  Shield,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { gsap } from "gsap";
import { OWNED_NFTS } from "../../data/ownedNftsData";

type ListingType = "fixed" | "auction";

const CURRENCIES = [
  { value: "ETH", label: "ETH", icon: "Ξ" },
  { value: "WETH", label: "WETH", icon: "Ξ" },
  { value: "USDC", label: "USDC", icon: "$" },
];

const DURATIONS = [
  { value: "1", label: "1 Day" },
  { value: "3", label: "3 Days" },
  { value: "7", label: "7 Days" },
  { value: "14", label: "14 Days" },
  { value: "30", label: "30 Days" },
  { value: "90", label: "90 Days" },
];

const SERVICE_FEE_PERCENT = 2.5;
const CREATOR_ROYALTY_PERCENT = 5.0;

const RARITY_COLORS: Record<string, string> = {
  Basic: "bg-gray-500/80",
  Special: "bg-blue-500/80",
  Premium: "bg-purple-500/80",
  Legendary: "bg-amber-500/80",
};

const CreateOrder = () => {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const nft = useMemo(
    () => OWNED_NFTS.find((n) => n.id === Number(tokenId)),
    [tokenId]
  );

  const [listingType, setListingType] = useState<ListingType>("fixed");
  const [price, setPrice] = useState("");
  const [reservePrice, setReservePrice] = useState("");
  const [currency, setCurrency] = useState("ETH");
  const [duration, setDuration] = useState("7");
  const [quantity, setQuantity] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const priceNum = parseFloat(price) || 0;
  const serviceFee = priceNum * (SERVICE_FEE_PERCENT / 100);
  const creatorRoyalty = priceNum * (CREATOR_ROYALTY_PERCENT / 100);
  const youReceive = Math.max(0, priceNum - serviceFee - creatorRoyalty);

  const expiryDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(duration));
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [duration]);

  // Entrance animation
  useEffect(() => {
    if (!formRef.current || !sidebarRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
    tl.fromTo(
      sidebarRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );
  }, []);

  const handleSubmit = () => {
    if (!price || priceNum <= 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  // Not found state
  if (!nft) {
    return (
      <div className="max-w-7xl mx-auto py-20 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="w-20 h-20 rounded-2xl bg-[#0a1a14] border border-[#1a3a2a] flex items-center justify-center mb-5">
          <AlertTriangle size={36} className="text-amber-500" />
        </div>
        <h2 className="text-white text-xl font-semibold mb-2">
          NFT Not Found
        </h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          The NFT you're trying to list doesn't exist or isn't in your wallet.
        </p>
        <button
          onClick={() => navigate("/user/owned")}
          className="px-6 py-2.5 rounded-full bg-neon-green text-black text-sm font-semibold hover:bg-[#00ff36] transition-colors"
        >
          Back to Owned NFTs
        </button>
      </div>
    );
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto py-20 flex flex-col items-center justify-center text-center min-h-[60vh] animate-[fadeIn_0.4s_ease-out]">
        <div className="w-24 h-24 rounded-full bg-neon-green/10 border-2 border-neon-green flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-neon-green" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">
          Listing Created!
        </h2>
        <p className="text-gray-400 text-sm mb-2 max-w-sm">
          <span className="text-white font-semibold">{nft.name}</span> has been
          listed for{" "}
          <span className="text-neon-green font-semibold">
            {priceNum.toFixed(4)} {currency}
          </span>
        </p>
        <p className="text-gray-500 text-xs mb-8">
          Expires on {expiryDate}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/user/owned")}
            className="px-6 py-2.5 rounded-full bg-neon-green text-black text-sm font-semibold hover:bg-[#00ff36] transition-colors"
          >
            Back to Owned NFTs
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setPrice("");
              setReservePrice("");
            }}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:border-neon-green/40 hover:text-neon-green transition-colors"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-20">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/user/owned")}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-neon-green hover:border-neon-green/40 transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="text-neon-green text-xs font-semibold uppercase tracking-wider">
              {listingType === "fixed" ? "Fixed Price" : "Auction"} Listing
            </p>
            <h1 className="text-white text-2xl md:text-3xl font-semibold">
              Create Order
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* ─── Left: Form ─── */}
        <div ref={formRef} className="space-y-6">
          {/* Listing Type Toggle */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
            <h2 className="text-white text-base font-semibold mb-1">
              Listing Type
            </h2>
            <p className="text-gray-500 text-xs mb-4">
              Choose how you want to sell your NFT.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setListingType("fixed")}
                className={`relative flex flex-col items-center gap-2 py-5 px-4 rounded-xl border transition-all duration-200 ${listingType === "fixed"
                    ? "border-neon-green bg-neon-green/[0.06] shadow-[0_0_20px_rgba(0,211,44,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
              >
                <Tag
                  size={22}
                  className={
                    listingType === "fixed" ? "text-neon-green" : "text-gray-500"
                  }
                />
                <span
                  className={`text-sm font-semibold ${listingType === "fixed" ? "text-white" : "text-gray-400"
                    }`}
                >
                  Fixed Price
                </span>
                <span className="text-[10px] text-gray-500">
                  Sell at a set price
                </span>
                {listingType === "fixed" && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-neon-green shadow-[0_0_6px_rgba(0,211,44,0.6)]" />
                )}
              </button>
              <button
                onClick={() => setListingType("auction")}
                className={`relative flex flex-col items-center gap-2 py-5 px-4 rounded-xl border transition-all duration-200 ${listingType === "auction"
                    ? "border-neon-green bg-neon-green/[0.06] shadow-[0_0_20px_rgba(0,211,44,0.08)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
              >
                <Gavel
                  size={22}
                  className={
                    listingType === "auction"
                      ? "text-neon-green"
                      : "text-gray-500"
                  }
                />
                <span
                  className={`text-sm font-semibold ${listingType === "auction" ? "text-white" : "text-gray-400"
                    }`}
                >
                  Auction
                </span>
                <span className="text-[10px] text-gray-500">
                  Let buyers bid
                </span>
                {listingType === "auction" && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-neon-green shadow-[0_0_6px_rgba(0,211,44,0.6)]" />
                )}
              </button>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
            <h2 className="text-white text-base font-semibold mb-1">
              {listingType === "fixed" ? "Set Your Price" : "Starting Price"}
            </h2>
            <p className="text-gray-500 text-xs mb-5">
              {listingType === "fixed"
                ? "Set a fixed price for your NFT listing."
                : "Set the minimum starting bid for your auction."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                  {listingType === "fixed" ? "Price" : "Starting Bid"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 pr-16 text-white text-lg font-medium placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_0_3px_rgba(0,211,44,0.06)] transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                    {currency}
                  </span>
                </div>
                {priceNum > 0 && priceNum < (nft.floorPrice * 0.8) && (
                  <p className="text-amber-400 text-[10px] mt-1.5 flex items-center gap-1">
                    <AlertTriangle size={10} />
                    Below 80% of floor price ({nft.floorPrice.toFixed(2)} ETH)
                  </p>
                )}
              </div>

              {/* Currency */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                  Currency
                </label>
                <div className="relative">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 pr-10 text-white appearance-none cursor-pointer focus:outline-none focus:border-neon-green/50 transition-all"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.value} value={c.value} className="bg-black">
                        {c.icon} {c.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              {/* Reserve Price (Auction only) */}
              {listingType === "auction" && (
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                    Reserve Price
                    <span className="text-gray-600 ml-1">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    placeholder="0.00"
                    value={reservePrice}
                    onChange={(e) => setReservePrice(e.target.value)}
                    className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_0_3px_rgba(0,211,44,0.06)] transition-all"
                  />
                  <p className="text-gray-600 text-[10px] mt-1.5 flex items-center gap-1">
                    <Info size={10} />
                    Minimum price to complete the sale
                  </p>
                </div>
              )}

              {/* Duration */}
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                  Duration
                </label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 pr-10 text-white appearance-none cursor-pointer focus:outline-none focus:border-neon-green/50 transition-all"
                  >
                    {DURATIONS.map((d) => (
                      <option key={d.value} value={d.value} className="bg-black">
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
                <p className="text-gray-600 text-[10px] mt-1.5 flex items-center gap-1">
                  <Clock size={10} />
                  Expires {expiryDate}
                </p>
              </div>

              {/* Quantity (ERC-1155 only) */}
              {nft.type === "ERC-1155" && (
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2 block">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-neon-green/50 focus:shadow-[0_0_0_3px_rgba(0,211,44,0.06)] transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5 md:p-6">
            <h2 className="text-white text-base font-semibold mb-4">
              Fee Summary
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield size={14} className="text-gray-500" />
                  Service Fee
                </div>
                <div className="text-right">
                  <span className="text-white text-sm font-medium">
                    {serviceFee.toFixed(4)} {currency}
                  </span>
                  <span className="text-gray-600 text-xs ml-2">
                    ({SERVICE_FEE_PERCENT}%)
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Zap size={14} className="text-gray-500" />
                  Creator Royalty
                </div>
                <div className="text-right">
                  <span className="text-white text-sm font-medium">
                    {creatorRoyalty.toFixed(4)} {currency}
                  </span>
                  <span className="text-gray-600 text-xs ml-2">
                    ({CREATOR_ROYALTY_PERCENT}%)
                  </span>
                </div>
              </div>
              <hr className="border-white/[0.06]" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-white font-semibold">
                  You Receive
                </span>
                <span className="text-neon-green text-lg font-bold">
                  {youReceive.toFixed(4)} {currency}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={!price || priceNum <= 0 || isSubmitting}
              className="flex-1 sm:flex-none h-12 px-8 rounded-xl bg-neon-green text-black text-sm font-bold uppercase tracking-wider hover:bg-[#00ff36] active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neon-green flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,211,44,0.15)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                `Create ${listingType === "fixed" ? "Listing" : "Auction"}`
              )}
            </button>
            <button
              onClick={() => navigate("/user/owned")}
              className="h-12 px-8 rounded-xl border border-white/10 text-gray-400 text-sm font-semibold hover:text-white hover:border-white/25 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* ─── Right: NFT Preview Sidebar ─── */}
        <div
          ref={sidebarRef}
          className="lg:sticky lg:top-24 space-y-5"
        >
          {/* NFT Card Preview */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0A2219] via-[#0d1d17] to-[#0D2B1F]">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-neon-green/90 text-black text-[10px] font-bold tracking-wide">
                {nft.type}
              </span>
              <span
                className={`absolute top-3 right-3 px-2 py-1 rounded-full text-white text-[10px] font-bold tracking-wide ${RARITY_COLORS[nft.rarity]
                  }`}
              >
                {nft.rarity}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-white font-semibold text-base">{nft.name}</h3>
              <p className="text-gray-500 text-xs mt-1">{nft.collection}</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Floor Price</span>
                  <span className="text-white font-medium">
                    {nft.floorPrice.toFixed(2)} ETH
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Token Standard</span>
                  <span className="text-white font-medium">{nft.type}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Acquired</span>
                  <span className="text-white font-medium">
                    {new Date(nft.acquiredDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Listing Preview */}
          {priceNum > 0 && (
            <div className="rounded-2xl border border-neon-green/20 bg-neon-green/[0.03] p-5 animate-[fadeIn_0.3s_ease-out]">
              <h4 className="text-neon-green text-xs font-semibold uppercase tracking-wider mb-3">
                Listing Preview
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white font-medium capitalize">
                    {listingType === "fixed" ? "Fixed Price" : "Auction"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    {listingType === "fixed" ? "Price" : "Starting Bid"}
                  </span>
                  <span className="text-neon-green font-bold text-sm">
                    {priceNum.toFixed(4)} {currency}
                  </span>
                </div>
                {listingType === "auction" && reservePrice && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Reserve</span>
                    <span className="text-white font-medium">
                      {parseFloat(reservePrice).toFixed(4)} {currency}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-medium">
                    {DURATIONS.find((d) => d.value === duration)?.label}
                  </span>
                </div>
                {nft.type === "ERC-1155" && parseInt(quantity) > 1 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Quantity</span>
                    <span className="text-white font-medium">{quantity}</span>
                  </div>
                )}
                <hr className="border-neon-green/10" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">You Receive</span>
                  <span className="text-neon-green font-bold text-base">
                    {youReceive.toFixed(4)} {currency}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Terms */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5">
            <div className="flex items-start gap-3">
              <Info size={16} className="text-gray-500 mt-0.5 shrink-0" />
              <p className="text-gray-500 text-xs leading-relaxed">
                By creating this listing, you agree to the{" "}
                <button className="text-neon-green hover:underline">
                  marketplace terms
                </button>{" "}
                and authorize the transfer of your NFT upon sale. Service fees
                and creator royalties will be deducted from the final sale price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
