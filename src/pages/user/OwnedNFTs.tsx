import { useNavigate } from "react-router-dom";

const OwnedNFTs = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <p className="text-[#20FFB0] text-xs font-semibold uppercase tracking-[0.3em]">
            Wallet
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-semibold">
            Owned NFTs
          </h1>
          <p className="text-[#4A7A65] text-sm mt-1">
            Select an NFT to create a sell order.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-[260px]">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full h-10 rounded-lg bg-[#050F0B] border border-[#0D2B1F] px-3 pr-9 text-sm text-white placeholder:text-[#4A7A65] focus:outline-none focus:border-[#20FFB0]/40"
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A7A65]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-3.5-3.5" />
            </svg>
          </div>
          <select className="h-10 rounded-lg bg-[#050F0B] border border-[#0D2B1F] px-3 text-sm text-white">
            <option>All Collections</option>
            <option>Luxury</option>
            <option>Business</option>
            <option>Art</option>
          </select>
          <select className="h-10 rounded-lg bg-[#050F0B] border border-[#0D2B1F] px-3 text-sm text-white">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Highest Price</option>
            <option>Lowest Price</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((id) => (
          <div
            key={id}
            className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] overflow-hidden hover:border-[#20FFB0]/20 transition-colors duration-200"
          >
            <div className="relative">
              <div className="h-40 bg-gradient-to-br from-[#0A2219] via-[#0A2219] to-[#0D2B1F]" />
              <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#0A2219]/80 text-[#20FFB0] text-[10px] font-semibold">
                ERC-721
              </span>
            </div>
            <div className="p-4">
              <p className="text-white text-sm font-semibold">Godsland NFT #{id}</p>
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-[#4A7A65]">Floor</span>
                <span className="text-white">0.42 ETH</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-[#4A7A65]">Collection</span>
                <span className="text-white">Luxury</span>
              </div>
              <button
                onClick={() => navigate(`/user/owned/${id}/sell`)}
                className="mt-4 w-full h-9 rounded-full bg-[#20FFB0] text-[#020F0A] text-sm font-semibold hover:bg-[#20FFB0]/90 transition-colors duration-200"
              >
                Create  Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnedNFTs;
