const Settings = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6">
        <div>
          <p className="text-[#20FFB0] text-xs font-semibold uppercase tracking-[0.3em]">
            Account
          </p>
          <h1 className="text-white text-2xl md:text-3xl font-semibold">Settings</h1>
          <p className="text-[#4A7A65] text-sm mt-1">
            Manage your profile, wallet, and auction activity.
          </p>
        </div>
        <button className="px-4 h-9 rounded-full bg-[#20FFB0] text-[#020F0A] text-sm font-semibold">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Owned NFTs", value: "148" },
          { label: "Active Bids", value: "6" },
          { label: "Bid Results", value: "12" },
          { label: "Live Auctions", value: "4" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-4"
          >
            <p className="text-[#4A7A65] text-xs uppercase tracking-widest">
              {item.label}
            </p>
            <p className="text-white text-2xl font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <h2 className="text-white text-lg font-semibold">Profile</h2>
          <p className="text-[#4A7A65] text-sm mt-1">Update display info.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="text-sm text-white">
              Display Name
              <input
                type="text"
                placeholder="CryptoKing"
                className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white"
              />
            </label>
            <label className="text-sm text-white">
              Username
              <input
                type="text"
                placeholder="@cryptoking"
                className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white"
              />
            </label>
            <label className="text-sm text-white md:col-span-2">
              Bio
              <textarea
                rows={3}
                placeholder="Collector and trader"
                className="mt-2 w-full rounded-lg bg-[#0A2219] border border-[#0D2B1F] px-3 py-2 text-white"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <h2 className="text-white text-lg font-semibold">Wallet</h2>
          <p className="text-[#4A7A65] text-sm mt-1">Connected accounts.</p>
          <div className="mt-4 space-y-3">
            {[
              { label: "Primary Wallet", value: "0xdf...d9A0" },
              { label: "Balance", value: "14.50 ETH" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-[#0D2B1F] bg-[#0A2219] px-3 py-2"
              >
                <span className="text-[#4A7A65] text-xs">{item.label}</span>
                <span className="text-white text-sm">{item.value}</span>
              </div>
            ))}
            <button className="w-full h-10 rounded-full border border-[#20FFB0] text-[#20FFB0] text-sm font-semibold">
              Manage Wallets
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <h2 className="text-white text-lg font-semibold">Notifications</h2>
          <p className="text-[#4A7A65] text-sm mt-1">Stay updated on bids and sales.</p>
          <div className="mt-4 space-y-3">
            {[
              "Outbid alerts",
              "Bid wins",
              "Auction ending",
              "New listings",
            ].map((label) => (
              <label key={label} className="flex items-center justify-between text-sm">
                <span className="text-white">{label}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#0D2B1F] bg-[#050F0B] p-5">
          <h2 className="text-white text-lg font-semibold">Auction Activity</h2>
          <p className="text-[#4A7A65] text-sm mt-1">Current and recent bids.</p>
          <div className="mt-4 space-y-3">
            {[
              { title: "Luxury Ape #182", status: "Leading", price: "1.24 ETH" },
              { title: "Golden Watch #44", status: "Outbid", price: "0.88 ETH" },
              { title: "Space Runner #09", status: "Won", price: "2.10 ETH" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-lg border border-[#0D2B1F] bg-[#0A2219] px-3 py-2"
              >
                <div>
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                  <p className="text-[#4A7A65] text-xs">{item.status}</p>
                </div>
                <span className="text-white text-sm">{item.price}</span>
              </div>
            ))}
            <button className="w-full h-10 rounded-full border border-[#20FFB0] text-[#20FFB0] text-sm font-semibold">
              View All Bids
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
