import { Archive, X } from "lucide-react";
import { GroceryItem, getDaysLeft } from "@/hooks/useGroceryStore";

interface ExpiredSectionProps {
  items: GroceryItem[];
  onRemove: (id: string) => void;
}

const ExpiredSection = ({ items, onRemove }: ExpiredSectionProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Archive className="w-4 h-4 text-expired" />
        <h2 className="font-medium text-sm text-foreground">Expired</h2>
        <span className="text-xs text-expired font-medium">({items.length})</span>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">No expired items. Great job!</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-background"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground line-through opacity-60">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-expired font-medium">{Math.abs(getDaysLeft(item))}d ago</span>
                <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpiredSection;
