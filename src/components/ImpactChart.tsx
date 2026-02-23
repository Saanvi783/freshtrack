import { BarChart3 } from "lucide-react";

interface ImpactChartProps {
  totalSaved: number;
  totalWasted: number;
  itemsRescued: number;
  hasData: boolean;
}

const ImpactChart = ({ totalSaved, totalWasted, itemsRescued, hasData }: ImpactChartProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h2 className="font-medium text-sm text-foreground">This Month's Impact</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
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
        <p className="text-xs text-muted-foreground">Data will appear here once items are tracked.</p>
      )}
    </div>
  );
};

export default ImpactChart;
