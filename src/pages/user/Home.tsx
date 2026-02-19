import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

export default function UserHome() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Welcome */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
        className="mb-8"
      >
        <p className="text-[#00d32c] font-readex text-sm font-medium tracking-widest uppercase mb-2">
          Dashboard
        </p>
        <h1 className="text-white font-readex text-3xl md:text-4xl font-bold leading-tight">
          Welcome back, <span className="text-[#00d32c]">0xdf....d9A0</span>
        </h1>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {[
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16.0667 1.66669H15.9333C15.048 1.66669 14.284 1.66669 13.672 1.74935C13.0173 1.83735 12.388 2.03602 11.8787 2.54535C11.3693 3.05469 11.1707 3.68402 11.0827 4.33869C11 4.95069 11 5.71469 11 6.60135V9.83735C10.6785 9.72534 10.3405 9.66766 10 9.66669H6C5.60603 9.66669 5.21593 9.74428 4.85195 9.89505C4.48797 10.0458 4.15725 10.2668 3.87868 10.5454C3.6001 10.8239 3.37912 11.1547 3.22836 11.5186C3.0776 11.8826 3 12.2727 3 12.6667V28.3334H2.66667C2.40145 28.3334 2.1471 28.4387 1.95956 28.6262C1.77202 28.8138 1.66667 29.0681 1.66667 29.3334C1.66667 29.5986 1.77202 29.8529 1.95956 30.0405C2.1471 30.228 2.40145 30.3334 2.66667 30.3334H29.3333C29.5985 30.3334 29.8529 30.228 30.0404 30.0405C30.228 29.8529 30.3333 29.5986 30.3333 29.3334C30.3333 29.0681 30.228 28.8138 30.0404 28.6262C29.8529 28.4387 29.5985 28.3334 29.3333 28.3334H29V19.3334C29 18.5377 28.6839 17.7746 28.1213 17.212C27.5587 16.6494 26.7956 16.3334 26 16.3334H22C21.648 16.3351 21.3147 16.392 21 16.504V6.60135C21 5.71469 21 4.95069 20.9173 4.33869C20.8293 3.68402 20.6307 3.05469 20.1213 2.54535C19.612 2.03602 18.984 1.83735 18.328 1.74935C17.716 1.66669 16.952 1.66669 16.0653 1.66669M26.9987 28.3334V19.3334C26.9987 19.0681 26.8933 18.8138 26.7058 18.6262C26.5182 18.4387 26.2639 18.3334 25.9987 18.3334H21.9987C21.7334 18.3334 21.4791 18.4387 21.2916 18.6262C21.104 18.8138 20.9987 19.0681 20.9987 19.3334V28.3334H26.9987ZM18.9987 28.3334V6.66669C18.9987 5.69602 18.996 5.06669 18.9347 4.60535C18.876 4.17202 18.7813 4.03602 18.7053 3.96002C18.6293 3.88402 18.4933 3.78935 18.06 3.73069C17.5973 3.66935 16.9693 3.66669 15.9987 3.66669C15.028 3.66669 14.3987 3.66935 13.9373 3.73069C13.504 3.78935 13.368 3.88402 13.292 3.96002C13.216 4.03602 13.1213 4.17202 13.0627 4.60535C13.0013 5.06802 12.9987 5.69602 12.9987 6.66669V28.3334H18.9987ZM10.9987 28.3334V12.6667C10.9987 12.4015 10.8933 12.1471 10.7058 11.9596C10.5182 11.772 10.2639 11.6667 9.99867 11.6667H5.99867C5.73345 11.6667 5.4791 11.772 5.29156 11.9596C5.10402 12.1471 4.99867 12.4015 4.99867 12.6667V28.3334H10.9987Z"
                  fill="#20FFB0"
                />
              </svg>
            ),
            title: "Total NFTs",
            value: "10,000+",
            subtitle: "and counting",
            trend: "+12.4%",
          },
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 16C12.7073 16 13.3855 15.719 13.8856 15.2189C14.3857 14.7188 14.6667 14.0406 14.6667 13.3333C14.6667 12.6261 14.3857 11.9478 13.8856 11.4477C13.3855 10.9476 12.7073 10.6666 12 10.6666C11.2928 10.6666 10.6145 10.9476 10.1144 11.4477C9.6143 11.9478 9.33334 12.6261 9.33334 13.3333C9.33334 14.0406 9.6143 14.7188 10.1144 15.2189C10.6145 15.719 11.2928 16 12 16ZM28.6667 8.66665L16 1.33331L3.33334 8.66665V23.3333L16 30.6666L28.6667 23.3333V8.66665ZM16 4.41465L26 10.204V19.3773L19.9173 15.7293L9.28934 23.7L6.00001 21.796V10.204L16 4.41465ZM16 27.5853L11.7973 25.152L20.0827 18.9386L25.4133 22.136L16 27.5853Z"
                  fill="#20FFB0"
                />
              </svg>
            ),
            title: "TMA Rank",
            value: "#16",
            subtitle: "Global ranking",
            trend: "↑3 positions",
          },
          {
            icon: (
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <path
                  d="M12 16C12.7073 16 13.3855 15.719 13.8856 15.2189C14.3857 14.7188 14.6667 14.0406 14.6667 13.3333C14.6667 12.6261 14.3857 11.9478 13.8856 11.4477C13.3855 10.9476 12.7073 10.6666 12 10.6666C11.2928 10.6666 10.6145 10.9476 10.1144 11.4477C9.6143 11.9478 9.33334 12.6261 9.33334 13.3333C9.33334 14.0406 9.6143 14.7188 10.1144 15.2189C10.6145 15.719 11.2928 16 12 16ZM28.6667 8.66665L16 1.33331L3.33334 8.66665V23.3333L16 30.6666L28.6667 23.3333V8.66665ZM16 4.41465L26 10.204V19.3773L19.9173 15.7293L9.28934 23.7L6.00001 21.796V10.204L16 4.41465ZM16 27.5853L11.7973 25.152L20.0827 18.9386L25.4133 22.136L16 27.5853Z"
                  fill="#20FFB0"
                />
              </svg>
            ),
            title: "Owned NFTs",
            value: "149",
            subtitle: "In your wallet",
            trend: "+2 this week",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            custom={i}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="flex items-start gap-5 p-5 rounded-2xl border border-[#00d32c] bg-black hover:border-[#00d32c]/20 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0A2219] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0D3B2B] transition-colors duration-300">
              {stat.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#4A7A65] font-readex text-xs font-medium mb-1">
                {stat.title}
              </p>
              <p className="text-white font-readex text-2xl font-bold leading-tight">
                {stat.value}
              </p>
              <p className="text-[#00d32c] font-readex text-xs mt-1">
                {stat.trend}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured + Info row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 mb-10">
        {/* Featured NFT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={3}
          className="w-full rounded-2xl border border-[#00d32c] overflow-hidden relative"
          style={{ minHeight: 280, maxHeight: 360 }}
        >
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/026003f9cdc3097060a256185891e363b000383e?width=1024"
            alt="Featured NFT"
            className="w-full h-full object-cover absolute inset-0"
            style={{ height: "100%", minHeight: 280 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020F0A] via-[#020F0A]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#00d32c]/15 border border-[#00d32c]/30 text-[#00d32c] text-xs font-readex font-medium mb-3">
              Featured Drop
            </span>
            <h3 className="text-white font-readex text-2xl font-semibold leading-tight mb-2">
              Post Photographic
            </h3>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[#4A7A65] font-readex text-xs">
                  Floor price
                </p>
                <p className="text-white font-readex text-sm font-semibold">
                  $80.32
                </p>
              </div>
              <div>
                <p className="text-[#4A7A65] font-readex text-xs">24h change</p>
                <p className="text-[#00d32c] font-readex text-sm font-semibold">
                  +0.00%
                </p>
              </div>
              <button className="ml-auto px-5 h-9 rounded-full bg-[#00d32c] text-[#020F0A] font-readex text-sm font-bold hover:bg-[#00d32c]/90 transition-colors duration-200">
                View NFT
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats panel */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={4}
          className="lg:w-[220px] rounded-2xl border border-[#00d32c] bg-black p-5 flex flex-col gap-4"
        >
          <p className="text-white font-readex text-sm font-semibold">
            Market Overview
          </p>
          {[
            { label: "Volume 24h", value: "2,451 ETH", up: true },
            { label: "Sales 24h", value: "1,820", up: true },
            { label: "Avg Price", value: "0.88 ETH", up: false },
            { label: "Buyers", value: "3,412", up: true },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-[#00d32c] last:border-0"
            >
              <p className="text-[#4A7A65] font-readex text-xs">{item.label}</p>
              <div className="text-right">
                <p className="text-white font-readex text-xs font-semibold">
                  {item.value}
                </p>
                <p
                  className={`font-readex text-[10px] ${item.up ? "text-[#00d32c]" : "text-red-400"}`}
                >
                  {item.up ? "▲" : "▼"} {item.up ? "2.4%" : "1.1%"}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trending NFTs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={5}
        className="mb-10"
      >
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-white font-readex text-2xl md:text-3xl font-semibold">
              Trending NFTs
            </h2>
            <p className="text-[#4A7A65] font-readex text-sm mt-1">
              Discover what's hot in the market
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[#00d32c] font-readex text-sm font-medium hover:opacity-80 transition-opacity">
            View all{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {[
          {
            label: "MUSIC",
            cards: [
              "https://api.builder.io/api/v1/image/assets/TEMP/aae78eee32bf50b90dad1713987656f2025adf24?width=492",
            ],
          },
          {
            label: "GAMING",
            cards: [
              "https://api.builder.io/api/v1/image/assets/TEMP/6861469b9961e9889f01dabc1e96eed45ce44ba1?width=492",
            ],
          },
        ].map((section, si) => (
          <motion.div
            key={section.label}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            custom={5 + si}
            className="mb-5 rounded-2xl border border-[#00d32c] bg-black overflow-hidden"
          >
            <div className="p-5 md:p-6 flex flex-col md:flex-row gap-6">
              {/* Label */}
              <div className="flex-shrink-0 md:w-[200px] flex flex-col justify-between">
                <div>
                  <p className="text-[#4A7A65] font-readex text-xs uppercase tracking-widest mb-2">
                    Top Art NFTs
                  </p>
                  <h3 className="text-white font-readex text-3xl md:text-4xl font-bold leading-none">
                    {section.label.split("").map((ch, i) => (
                      <span key={i} className={i < 2 ? "text-[#00d32c]" : ""}>
                        {ch}
                      </span>
                    ))}
                  </h3>
                </div>
                <button className="mt-5 md:mt-0 w-fit md:w-full h-10 px-5 rounded-full bg-gradient-to-r from-[#0A5438] to-[#00d32c] text-white font-readex text-sm font-bold hover:opacity-90 transition-opacity">
                  See More
                </button>
              </div>

              {/* Cards scroll */}
              <div
                className="flex items-center gap-4 overflow-x-auto pb-1 flex-1"
                style={{ scrollbarWidth: "none" }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex-shrink-0"
                  >
                    <NFTCard
                      image={section.cards[0]}
                      title="Tonly Talls"
                      price="0.01 ETH"
                      change="+8,274.21%"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Top Sellers */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={8}
        className="mb-10"
      >
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-white font-readex text-2xl md:text-3xl font-semibold">
              Top Sellers
            </h2>
            <p className="text-[#4A7A65] font-readex text-sm mt-1">
              This week's highest volume traders
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { name: "@john", eth: "5.5 ETH", rank: 1 },
            { name: "@emily", eth: "6.1 ETH", rank: 2 },
            { name: "@yasin", eth: "7.1 ETH", rank: 3 },
            { name: "@jane", eth: "8.3 ETH", rank: 4 },
            { name: "@peter", eth: "4.1 ETH", rank: 5 },
            { name: "@jackob", eth: "5.2 ETH", rank: 6 },
            { name: "@arham", eth: "5.2 ETH", rank: 7 },
            { name: "@sara", eth: "3.4 ETH", rank: 8 },
          ].map((seller, i) => (
            <motion.div
              key={i}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              custom={i}
              whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
              className="flex items-center gap-3 p-3 rounded-xl border border-[#00d32c] bg-black hover:border-[#00d32c]/20 transition-colors duration-200 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0D3B2B] to-[#00d32c]/30 border border-[#00d32c]/20" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blackborder border-[#00d32c] text-[#00d32c] font-readex text-[9px] font-bold flex items-center justify-center">
                  {seller.rank}
                </span>
              </div>
              <div>
                <p className="text-white font-readex text-sm font-semibold">
                  {seller.name}
                </p>
                <p className="text-[#00d32c] font-readex text-xs">
                  {seller.eth}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="px-8 h-11 rounded-full border border-[#00d32c] bg-[#00d32c]/5 text-[#00d32c] font-readex text-sm font-bold tracking-wide hover:bg-[#00d32c]/10 transition-colors duration-200">
            Explore All Sellers
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface NFTCardProps {
  image: string;
  title: string;
  price: string;
  change: string;
}

function NFTCard({ image, title, price, change }: NFTCardProps) {
  const isPositive = change.startsWith("+");
  return (
    <div className="w-52 rounded-xl border border-[#00d32c] bg-black overflow-hidden hover:border-[#00d32c]/20 transition-colors duration-200">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        <p className="text-white font-readex text-sm font-semibold">{title}</p>
        <p className="text-[#4A7A65] font-readex text-xs">Floor {price}</p>
        <div className="flex items-center justify-between">
          <p
            className={`font-readex text-xs font-medium ${isPositive ? "text-[#00d32c]" : "text-red-400"}`}
          >
            {change}
          </p>
          <button className="px-2 py-0.5 rounded-md bg-[#00d32c]/10 text-[#00d32c] font-readex text-[10px] font-bold hover:bg-[#00d32c]/20 transition-colors duration-200">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
