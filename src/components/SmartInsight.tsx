import { Lightbulb } from "lucide-react";
import { GroceryItem, categorizeItem } from "@/hooks/useGroceryStore";

interface SmartInsightProps {
  items: GroceryItem[];
}

const SmartInsight = ({ items }: SmartInsightProps) => {
  const hasData = items.length > 0;

  // Count how many times each product name has been wasted (expired)
  const expired = items.filter((i) => categorizeItem(i) === "expired");
  const expiredCounts: Record<string, number> = {};
  let totalWastedCost = 0;
  expired.forEach((i) => {
    expiredCounts[i.name] = (expiredCounts[i.name] || 0) + 1;
    totalWastedCost += i.cost;
  });

  const sorted = Object.entries(expiredCounts).sort((a, b) => b[1] - a[1]);
  const topWasted = sorted[0];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary" />
        <h2 className="font-medium text-sm text-foreground">Smart Insight</h2>
      </div>
      {!hasData ? (
        <p className="text-sm text-muted-foreground">No data yet. Add items to see insights.</p>
      ) : expired.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No wasted items so far. You're doing great with {items.length} item{items.length !== 1 ? "s" : ""} tracked!
        </p>
      ) : (
        <div className="space-y-2">
          {topWasted && (
            <p className="text-sm text-muted-foreground">
              You've wasted <span className="font-medium text-foreground">{topWasted[0]}</span>{" "}
              <span className="font-medium text-expiring">{topWasted[1]} time{topWasted[1] !== 1 ? "s" : ""}</span>. Consider buying less next time.
            </p>
          )}
          {sorted.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mt-1">
              {sorted.slice(0, 5).map(([name, count]) => (
                <span key={name} className="text-xs px-2 py-0.5 rounded-md bg-background text-muted-foreground">
                  {name} × {count}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Total wasted: ₹{totalWastedCost} across {expired.length} item{expired.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartInsight;
