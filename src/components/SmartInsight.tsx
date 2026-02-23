import { Lightbulb } from "lucide-react";
import { GroceryItem, categorizeItem } from "@/hooks/useGroceryStore";

interface SmartInsightProps {
  items: GroceryItem[];
}

const SmartInsight = ({ items }: SmartInsightProps) => {
  const hasData = items.length > 0;

  // Find most frequently expired item
  const expired = items.filter((i) => categorizeItem(i) === "expired");
  const expiredCounts: Record<string, number> = {};
  expired.forEach((i) => {
    expiredCounts[i.name] = (expiredCounts[i.name] || 0) + 1;
  });
  const topWasted = Object.entries(expiredCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-primary" />
        <h2 className="font-medium text-sm text-foreground">Smart Insight</h2>
      </div>
      {!hasData ? (
        <p className="text-sm text-muted-foreground">No data yet. Add items to see insights.</p>
      ) : topWasted ? (
        <p className="text-sm text-muted-foreground">
          You often waste <span className="font-medium text-foreground">{topWasted[0]}</span>. Consider buying less next time.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          You have {items.length} item{items.length !== 1 ? "s" : ""} tracked. Keep it up!
        </p>
      )}
    </div>
  );
};

export default SmartInsight;
