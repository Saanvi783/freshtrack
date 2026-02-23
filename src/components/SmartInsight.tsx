import { Brain, Sparkles } from "lucide-react";

const SmartInsight = () => {
  return (
    <div className="insight-glow p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-semibold text-foreground">Smart Insight</h2>
        </div>
        <span className="badge-ai">
          <Sparkles className="w-3 h-3" />
          AI Powered
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        You often waste <span className="font-semibold text-foreground">spinach</span>. Buy less next time?
      </p>
      <div className="flex gap-2">
        <button className="px-4 py-2 rounded-xl text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity">
          Adjust Quantity
        </button>
        <button className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground bg-secondary hover:bg-muted transition-colors">
          Ignore
        </button>
      </div>
    </div>
  );
};

export default SmartInsight;
