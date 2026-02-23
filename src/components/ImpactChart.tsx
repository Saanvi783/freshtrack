import { BarChart3 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { GroceryItem, categorizeItem } from "@/hooks/useGroceryStore";

interface ImpactChartProps {
  totalSaved: number;
  totalWasted: number;
  itemsRescued: number;
  hasData: boolean;
  items: GroceryItem[];
}

function buildChartData(totalWasted: number) {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();

  // Simple flat line at total waste value up to current day, 0 after
  const step = Math.max(1, Math.floor(daysInMonth / 6));
  const points: { day: string; total: number }[] = [];
  for (let d = 1; d <= daysInMonth; d += step) {
    points.push({ day: String(d), total: d <= currentDay ? totalWasted : 0 });
  }
  return points;
}

const ImpactChart = ({ totalSaved, totalWasted, itemsRescued, hasData, items }: ImpactChartProps) => {
  const chartData = buildChartData(totalWasted);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h2 className="font-medium text-sm text-foreground">This Month's Impact</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="py-2 px-3 rounded-lg bg-background">
          <p className="text-xs text-muted-foreground mb-0.5">Saved</p>
          <p className="text-sm font-medium text-fresh">₹{totalSaved}</p>
        </div>
        <div className="py-2 px-3 rounded-lg bg-background">
          <p className="text-xs text-muted-foreground mb-0.5">Wasted</p>
          <p className="text-sm font-medium text-expiring">₹{totalWasted}</p>
        </div>
        <div className="py-2 px-3 rounded-lg bg-background">
          <p className="text-xs text-muted-foreground mb-0.5">Items Rescued</p>
          <p className="text-sm font-medium text-foreground">{itemsRescued}</p>
        </div>
        <div className="py-2 px-3 rounded-lg bg-background">
          <p className="text-xs text-muted-foreground mb-0.5">vs Last Month</p>
          <p className="text-sm font-medium text-foreground">0%</p>
        </div>
      </div>

      {!hasData && (
        <p className="text-xs text-muted-foreground mb-3">Data will appear here once items are tracked.</p>
      )}

      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} layout="vertical">
            <defs>
              <linearGradient id="brownGradient" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(22, 25%, 48%)" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(22, 25%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis
              dataKey="day"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(37, 5%, 41%)" }}
            />
            <XAxis type="number" hide />
            <Tooltip
              contentStyle={{
                background: "hsl(40, 25%, 93%)",
                border: "1px solid hsl(37, 16%, 82%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`₹${value}`, "Total Wasted"]}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="hsl(22, 25%, 48%)"
              strokeWidth={2}
              fill="url(#brownGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ImpactChart;
