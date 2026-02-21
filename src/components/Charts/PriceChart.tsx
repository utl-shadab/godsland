import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface DataPoint {
    date: string;
    price: number;
}

interface PriceChartProps {
    data: DataPoint[];
    title?: string;
    height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
            <p className="text-gray-400 text-[10px] mb-0.5">{label}</p>
            <p className="text-neon-green text-sm font-bold">
                {payload[0].value.toFixed(4)} ETH
            </p>
        </div>
    );
};

const PriceChart = ({ data, title = "Price History", height = 260 }: PriceChartProps) => {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-5">
            <h3 className="text-white text-sm font-semibold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={height}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00d32c" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#00d32c" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#00d32c"
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                        dot={false}
                        activeDot={{ r: 4, fill: "#00d32c", stroke: "#000", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;
