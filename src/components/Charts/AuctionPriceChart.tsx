import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell,
} from "recharts";

interface AuctionDataPoint {
    name: string;
    price: number;
    status: "won" | "lost" | "active";
}

interface AuctionPriceChartProps {
    data: AuctionDataPoint[];
    title?: string;
    height?: number;
}

const BAR_COLORS = {
    won: "#00d32c",
    active: "#f59e0b",
    lost: "#6b7280",
};

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload as AuctionDataPoint;
    return (
        <div className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
            <p className="text-white text-xs font-semibold">{d.name}</p>
            <p className="text-neon-green text-sm font-bold mt-0.5">
                {d.price.toFixed(2)} ETH
            </p>
            <p className="text-gray-500 text-[10px] capitalize mt-0.5">{d.status}</p>
        </div>
    );
};

const AuctionPriceChart = ({
    data,
    title = "Auction History",
    height = 260,
}: AuctionPriceChartProps) => {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm font-semibold">{title}</h3>
                <div className="flex items-center gap-3">
                    {Object.entries(BAR_COLORS).map(([key, color]) => (
                        <div key={key} className="flex items-center gap-1.5">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-gray-500 text-[10px] capitalize">{key}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.04)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                    <Bar dataKey="price" radius={[6, 6, 0, 0]} maxBarSize={40}>
                        {data.map((entry, i) => (
                            <Cell key={i} fill={BAR_COLORS[entry.status]} fillOpacity={0.8} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AuctionPriceChart;
