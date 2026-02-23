import SmartInsight from "@/components/SmartInsight";
import EatSoonSection from "@/components/EatSoonSection";
import FreshSection from "@/components/FreshSection";
import ExpiredSection from "@/components/ExpiredSection";
import ImpactChart from "@/components/ImpactChart";
import AddItemModal from "@/components/AddItemModal";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useGroceryStore } from "@/hooks/useGroceryStore";

const Index = () => {
  const { items, addItem, removeItem, eatSoon, fresh, expired, totalSaved, totalWasted, itemsRescued } = useGroceryStore();
  const hasData = items.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-5 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">FreshTrack</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Track what you buy. Waste less.</p>
          </div>
          <DarkModeToggle />
        </div>

        {/* Empty state */}
        {!hasData && (
          <div className="bg-card border border-border rounded-lg p-6 text-center mb-4">
            <p className="text-sm text-muted-foreground mb-4">
              No items yet. Add your first item to start tracking freshness.
            </p>
            <AddItemModal onAdd={addItem} />
          </div>
        )}

        {hasData && (
          <div className="mb-4">
            <AddItemModal onAdd={addItem} />
          </div>
        )}

        {/* Sections */}
        <div className="space-y-3">
          <EatSoonSection items={eatSoon} onRemove={removeItem} />
          <FreshSection items={fresh} onRemove={removeItem} />
          <ExpiredSection items={expired} onRemove={removeItem} />
          <ImpactChart totalSaved={totalSaved} totalWasted={totalWasted} itemsRescued={itemsRescued} hasData={hasData} items={items} />
          <SmartInsight items={items} />
        </div>
      </div>
    </div>
  );
};

export default Index;
