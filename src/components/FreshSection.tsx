import { Leaf } from "lucide-react";

interface GroceryItem {
  emoji: string;
  name: string;
  daysLeft: number;
}

const items: GroceryItem[] = [
  { emoji: "🍎", name: "Apple", daysLeft: 7 },
  { emoji: "🥚", name: "Eggs", daysLeft: 12 },
  { emoji: "🧀", name: "Cheese", daysLeft: 9 },
  { emoji: "🥕", name: "Carrots", daysLeft: 5 },
  { emoji: "🍞", name: "Bread", daysLeft: 4 },
];

const FreshSection = () => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="w-5 h-5 text-fresh" />
        <h2 className="font-heading font-semibold text-foreground">Fresh</h2>
        <span className="badge-fresh">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <span className="font-medium text-foreground">{item.name}</span>
            </div>
            <span className="badge-fresh">{item.daysLeft} days</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreshSection;
