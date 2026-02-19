import { useParams } from "react-router-dom";

const CreateOrder = () => {
  const { tokenId } = useParams();

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <p className="text-[#20FFB0] text-xs font-semibold uppercase tracking-[0.3em]">
            Sell NFT
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-semibold">Create Order</h1>
          <p className="text-[#4A7A65] text-sm mt-1">
            Listing NFT <span className="text-[#20FFB0]">#{tokenId}</span> for sale.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 h-9 rounded-full border border-[#0D2B1F] text-[#4A7A65] text-sm">
            Preview
          </button>
          <button className="px-4 h-9 rounded-full border border-[#20FFB0] text-[#20FFB0] text-sm">
            Save Draft
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <div className="mb-5">
            <h2 className="text-white text-lg font-semibold">Listing Details</h2>
            <p className="text-[#4A7A65] text-sm mt-1">
              Set your price, duration, and quantity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm text-white">
              Price
              <input
                type="number"
                placeholder="0.00"
                className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white focus:outline-none focus:border-[#20FFB0]/40"
              />
            </label>
            <label className="text-sm text-white">
              Currency
              <select className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white">
                <option>ETH</option>
                <option>APE</option>
                <option>USDC</option>
              </select>
            </label>
            <label className="text-sm text-white">
              Duration
              <select className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white">
                <option>1 day</option>
                <option>3 days</option>
                <option>7 days</option>
                <option>30 days</option>
              </select>
            </label>
            <label className="text-sm text-white">
              Quantity
              <input
                type="number"
                placeholder="1"
                className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white focus:outline-none focus:border-[#20FFB0]/40"
              />
            </label>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm text-white">
              Royalty (%)
              <input
                type="number"
                placeholder="2.5"
                className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white focus:outline-none focus:border-[#20FFB0]/40"
              />
            </label>
            <label className="text-sm text-white">
              Listing Type
              <select className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white">
                <option>Fixed Price</option>
                <option>Auction</option>
              </select>
            </label>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button className="px-5 h-10 rounded-full bg-[#20FFB0] text-[#020F0A] text-sm font-semibold hover:bg-[#20FFB0]/90 transition-colors duration-200">
              Create Listing
            </button>
            <button className="px-5 h-10 rounded-full border border-[#20FFB0] text-[#20FFB0] text-sm font-semibold">
              Cancel
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <div className="h-44 rounded-xl bg-gradient-to-br from-[#0A2219] via-[#0A2219] to-[#0D2B1F]" />
          <div className="mt-4">
            <p className="text-white text-sm font-semibold">Godsland NFT #{tokenId}</p>
            <p className="text-[#4A7A65] text-xs mt-1">Collection: Luxury</p>
          </div>
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#4A7A65]">Service fee</span>
              <span className="text-white">2.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4A7A65]">Royalty</span>
              <span className="text-white">2.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#4A7A65]">You will receive</span>
              <span className="text-white">0.00 ETH</span>
            </div>
          </div>
          <div className="mt-5 text-xs text-[#4A7A65]">
            By creating a listing, you agree to the marketplace terms.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
