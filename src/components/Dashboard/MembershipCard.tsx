import { Award, ChevronRight } from "lucide-react";

interface MembershipCardProps {
    ownedCount: number;
}

const TIERS = [
    { name: "Bronze", min: 0, max: 99, color: "#CD7F32", next: "Silver" },
    { name: "Silver", min: 100, max: 249, color: "#C0C0C0", next: "Gold" },
    { name: "Gold", min: 250, max: 499, color: "#FFD700", next: "Platinum" },
    { name: "Platinum", min: 500, max: Infinity, color: "#E5E4E2", next: null },
];

const MembershipCard = ({ ownedCount }: MembershipCardProps) => {
    const currentTier = TIERS.find(
        (t) => ownedCount >= t.min && ownedCount <= t.max
    ) || TIERS[0];
    const nextTier = TIERS.find((t) => t.name === currentTier.next);
    const nftsToNext = nextTier ? nextTier.min - ownedCount : 0;
    const progress = nextTier
        ? ((ownedCount - currentTier.min) / (nextTier.min - currentTier.min)) * 100
        : 100;

    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr]">
                {/* Current Tier Card */}
                <div className="p-6 md:p-8 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#0a1a14] to-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/[0.06]">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2"
                        style={{
                            borderColor: currentTier.color,
                            background: `linear-gradient(135deg, ${currentTier.color}15, transparent)`,
                        }}
                    >
                        <Award size={36} style={{ color: currentTier.color }} />
                    </div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                        You are at
                    </p>
                    <h3 className="text-white text-2xl font-bold mb-1">
                        {currentTier.name}
                    </h3>
                    <p className="text-gray-500 text-xs mb-4">Subscription</p>

                    {nextTier && (
                        <div className="w-full max-w-[180px]">
                            <div className="text-neon-green text-xs font-semibold mb-1">
                                Congratulations!
                            </div>
                            <p className="text-neon-green/70 text-[10px]">
                                {nftsToNext} NFTs to go for{" "}
                                <span className="font-bold text-neon-green uppercase">
                                    {nextTier.name}
                                </span>{" "}
                                Subscription
                            </p>
                        </div>
                    )}
                    {!nextTier && (
                        <p className="text-neon-green text-xs font-semibold">
                            🎉 Maximum tier reached!
                        </p>
                    )}
                </div>

                {/* Next Tier Progress */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                    {nextTier ? (
                        <>
                            <div className="flex items-center gap-3 mb-5">
                                <h4 className="text-white text-lg md:text-xl font-bold">
                                    Buy{" "}
                                    <span className="text-neon-green">{nftsToNext}</span> more
                                    NFTs to reach
                                </h4>
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                                    style={{
                                        borderColor: nextTier.color,
                                        background: `${nextTier.color}10`,
                                    }}
                                >
                                    <Award size={20} style={{ color: nextTier.color }} />
                                </div>
                                <div>
                                    <p
                                        className="text-sm font-bold uppercase tracking-wider"
                                        style={{ color: nextTier.color }}
                                    >
                                        {nextTier.name}
                                    </p>
                                    <p className="text-gray-500 text-[10px]">Subscription</p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-gray-500">Progress</span>
                                    <span className="text-neon-green font-semibold">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-neon-green/60 to-neon-green transition-all duration-700"
                                        style={{ width: `${Math.min(100, progress)}%` }}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-gray-600 mt-1">
                                    <span>{ownedCount} owned</span>
                                    <span>{nextTier.min} needed</span>
                                </div>
                            </div>

                            {/* NFT Stack Preview */}
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <img
                                            key={i}
                                            src={`https://picsum.photos/seed/member${i}/60/60`}
                                            alt=""
                                            className="w-10 h-10 rounded-lg border-2 border-[#0a0a0a] object-cover"
                                        />
                                    ))}
                                </div>
                                <button className="flex items-center gap-1 text-neon-green text-xs font-semibold hover:underline">
                                    Browse Collection
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-center">
                            <p className="text-white text-lg font-bold mb-2">
                                You've reached the highest tier! 🏆
                            </p>
                            <p className="text-gray-500 text-sm">
                                Enjoy exclusive Platinum benefits and rewards.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MembershipCard;
