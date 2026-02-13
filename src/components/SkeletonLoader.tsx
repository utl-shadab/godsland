const SkeletonLoader = ({ count = 8 }: { count?: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-[#111] border border-white/5 flex flex-col h-full animate-pulse">
                    <div className="w-full aspect-square bg-white/5" />
                    <div className="p-3 flex flex-col gap-3">
                        <div className="h-2 w-1/3 bg-white/10 rounded" />
                        <div className="h-4 w-2/3 bg-white/10 rounded" />
                        <div className="mt-2 pt-2 border-t border-white/5 flex justify-between">
                            <div className="h-6 w-1/3 bg-white/10 rounded" />
                            <div className="h-3 w-1/4 bg-white/10 rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SkeletonLoader;
