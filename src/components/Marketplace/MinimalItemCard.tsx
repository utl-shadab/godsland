import { useState } from "react";

interface NFTItem {
  id: string;
  title: string;
  image: string;
  price: string;
  lastSale?: string;
  collectionId?: string;
  category?: string;
  creator?: string;
  stars?: number;
  type?: string;
}

interface MinimalItemCardProps {
  item: NFTItem;
  onClick?: () => void;
}

const MinimalItemCard = ({ item, onClick }: MinimalItemCardProps) => {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const collectionName = item.collectionId
    ? item.collectionId
        .replace("col-", "")
        .split("-")
        .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ")
    : "Collection Name";

  return (
    <div
      onClick={onClick}
      className="group relative w-full rounded-2xl overflow-hidden cursor-pointer
        bg-[#0c0f0c] border border-white/[0.06]
        shadow-[0_4px_24px_rgba(0,0,0,0.5)]
        hover:shadow-[0_0_0_1px_rgba(0,211,44,0.35),0_12px_40px_rgba(0,211,44,0.12)]
        hover:border-[#00d32c]/30
        transition-all duration-500 ease-out
        hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#111611]">
        {/* Skeleton shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#111611] via-[#1a2119] to-[#111611] animate-pulse" />
        )}

        <img
          src={item.image}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700
            group-hover:scale-105
            ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Type Badge */}
        {item.type && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase
              bg-[#00d32c]/15 backdrop-blur-md border border-[#00d32c]/30 text-[#00d32c]">
              {item.type}
            </span>
          </div>
        )}

        {/* Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-2.5 right-2.5
            w-7 h-7 rounded-full flex items-center justify-center
            bg-black/50 backdrop-blur-md border border-white/10
            opacity-0 group-hover:opacity-100
            hover:bg-rose-500/20 hover:border-rose-400/40
            transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              liked ? "fill-rose-400 stroke-rose-400" : "fill-none stroke-white/70"
            }`}
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        {/* Stars — shown on hover */}
        {item.stars !== undefined && (
          <div className="absolute bottom-2.5 right-2.5
            flex items-center gap-1 px-2 py-0.5 rounded-full
            bg-black/60 backdrop-blur-md border border-white/10
            opacity-0 group-hover:opacity-100 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#00d32c" className="w-2.5 h-2.5">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[10px] font-semibold text-[#00d32c]">{item.stars}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2.5">
        {/* Collection + Category */}
        <div className="flex items-center justify-between gap-1 min-w-0">
          <span className="text-[10px] font-semibold text-[#00d32c]/70 tracking-wide truncate">
            {collectionName}
          </span>
          {item.category && (
            <span className="text-[9px] text-white/25 uppercase tracking-widest flex-shrink-0">
              {item.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[13px] font-semibold text-white/90 leading-tight truncate">
          {item.title}
        </h3>

        {/* Creator */}
        {item.creator && (
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#00d32c] to-[#00a020] flex-shrink-0" />
            <span className="text-[10px] text-white/35 truncate">{item.creator}</span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00d32c]/10 to-transparent" />

        {/* Price Row */}
        <div className="flex items-end justify-between gap-1">
          <div className="min-w-0">
            <p className="text-[9px] text-white/25 uppercase tracking-widest mb-0.5">Price</p>
            <div className="flex items-center gap-1">
              {/* ETH Icon */}
              <svg viewBox="0 0 24 24" className="w-3 h-3 flex-shrink-0" style={{ color: "#00d32c" }} fill="currentColor">
                <path d="M11.998 0L11.753.847v16.175l.245.243 11.25-6.65L11.998 0z" opacity=".6"/>
                <path d="M11.998 0L.75 10.615l11.248 6.65V0z"/>
                <path d="M11.998 17.968l-.136.165v8.535l.136.398 11.255-15.866-11.255 6.768z" opacity=".6"/>
                <path d="M11.998 27.066V17.968L.75 11.2l11.248 15.866z"/>
                <path d="M11.998 15.892l11.25-6.65-11.25-5.118v11.768z" opacity=".2"/>
                <path d="M.75 9.242l11.248 6.65V4.124L.75 9.242z" opacity=".6"/>
              </svg>
              <span className="text-[14px] font-bold text-white tracking-tight truncate">{item.price}</span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="text-[9px] text-white/25 uppercase tracking-widest mb-0.5">Last</p>
            <p className="text-[11px] font-medium text-white/40">{item.lastSale || "—"}</p>
          </div>
        </div>

        {/* Buy Button — slides in on hover */}
        <button
      onClick={onClick}
          
          className="w-full py-2 rounded-xl text-[11px] font-bold tracking-wider uppercase
            bg-[#00d32c]/10 border border-[#00d32c]/25 text-[#00d32c]
            opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0
            hover:bg-[#00d32c]/20 hover:border-[#00d32c]/50 hover:text-white
            transition-all duration-300 active:scale-[0.98]"
        >
          Buy Now
        </button>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px
        bg-gradient-to-r from-transparent via-[#00d32c]/40 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export default MinimalItemCard;