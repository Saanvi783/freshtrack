import { BarChart3, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { day: "1", wasted: 120 },
  { day: "5", wasted: 80 },
  { day: "10", wasted: 200 },
  { day: "15", wasted: 60 },
  { day: "20", wasted: 150 },
  { day: "25", wasted: 40 },
  { day: "30", wasted: 90 },
];

const stats = [
  { label: "Saved", value: "₹1,240", positive: true },
  { label: "Wasted", value: "₹380", positive: false },
  { label: "Items Rescued", value: "18", positive: true },
  { label: "vs Last Month", value: "+12%", positive: true },
];

const ImpactChart = () => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-semibold text-foreground">This Month's Impact</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="p-3 rounded-xl bg-secondary/60">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-lg font-heading font-bold ${stat.positive ? "text-fresh" : "text-expiring"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(254, 100%, 68%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(254, 100%, 68%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(250, 30%, 92%)",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow: "0 4px 20px -4px rgb(124 92 255 / 0.12)",
              }}
              formatter={(value: number) => [`₹${value}`, "Wasted"]}
            />
            <Area
              type="monotone"
              dataKey="wasted"
              stroke="hsl(254, 100%, 68%)"
              strokeWidth={2.5}
              fill="url(#violetGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
        <TrendingUp className="w-3.5 h-3.5 text-fresh" />
        <span>You're improving! Waste down 12% this month.</span>
      </div>
    </div>
  );
};

export default ImpactChart;
