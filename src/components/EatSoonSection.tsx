import { Flame } from "lucide-react";

interface GroceryItem {
  emoji: string;
  name: string;
  daysLeft: number;
}

const items: GroceryItem[] = [
  { emoji: "🥛", name: "Milk", daysLeft: 1 },
  { emoji: "🥬", name: "Spinach", daysLeft: 1 },
];

const EatSoonSection = () => {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-expiring" />
        <h2 className="font-heading font-semibold text-foreground">Eat Soon</h2>
        <span className="badge-expiring">{items.length}</span>
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
            <span className="badge-expiring">
              {item.daysLeft === 1 ? "Tomorrow" : `${item.daysLeft} days left`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EatSoonSection;
