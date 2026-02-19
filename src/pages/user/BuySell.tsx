import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const BuySell = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = useMemo(() => searchParams.get("mode") || "buy", [searchParams]);

  const handleModeChange = (nextMode: "buy" | "sell") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("mode", nextMode);
      return next;
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <p className="text-[#20FFB0] text-xs font-semibold uppercase tracking-[0.3em]">
            Marketplace
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-semibold">
            Buy & Sell
          </h1>
          <p className="text-[#4A7A65] text-sm mt-1">
            Switch between buying and selling views.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#0D2B1F] bg-[#050F0B] p-1">
          <button
            onClick={() => handleModeChange("buy")}
            className={`px-4 h-9 rounded-full text-sm font-semibold transition-colors duration-200 ${
              mode === "buy"
                ? "bg-[#20FFB0] text-[#020F0A]"
                : "text-[#4A7A65] hover:text-white"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => handleModeChange("sell")}
            className={`px-4 h-9 rounded-full text-sm font-semibold transition-colors duration-200 ${
              mode === "sell"
                ? "bg-[#20FFB0] text-[#020F0A]"
                : "text-[#4A7A65] hover:text-white"
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {mode === "buy" ? (
        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <h2 className="text-white text-lg font-semibold">Buy NFTs</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search listings"
                className="w-full md:w-[260px] h-10 rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 text-sm text-white placeholder:text-[#4A7A65]"
              />
              <select className="h-10 rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 text-sm text-white">
                <option>All Categories</option>
                <option>Luxury</option>
                <option>Business</option>
                <option>Art</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] overflow-hidden hover:border-[#20FFB0]/20 transition-colors duration-200"
              >
                <div className="h-36 bg-gradient-to-br from-[#0A2219] via-[#0A2219] to-[#0D2B1F]" />
                <div className="p-4">
                  <p className="text-white text-sm font-semibold">Listing #{id}</p>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-[#4A7A65]">Price</span>
                    <span className="text-white">0.42 ETH</span>
                  </div>
                  <button className="mt-4 w-full h-9 rounded-full bg-[#20FFB0] text-[#020F0A] text-sm font-semibold">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <h2 className="text-white text-lg font-semibold">Sell NFTs</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search owned NFTs"
                className="w-full md:w-[260px] h-10 rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 text-sm text-white placeholder:text-[#4A7A65]"
              />
              <select className="h-10 rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 text-sm text-white">
                <option>All Collections</option>
                <option>Luxury</option>
                <option>Business</option>
                <option>Art</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] overflow-hidden hover:border-[#20FFB0]/20 transition-colors duration-200"
              >
                <div className="h-36 bg-gradient-to-br from-[#0A2219] via-[#0A2219] to-[#0D2B1F]" />
                <div className="p-4">
                  <p className="text-white text-sm font-semibold">Owned NFT #{id}</p>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-[#4A7A65]">Floor</span>
                    <span className="text-white">0.32 ETH</span>
                  </div>
                  <button className="mt-4 w-full h-9 rounded-full border border-[#20FFB0] text-[#20FFB0] text-sm font-semibold">
                    Create Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuySell;
