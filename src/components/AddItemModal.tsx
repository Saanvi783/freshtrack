import { Plus } from "lucide-react";
import { useState } from "react";

const AddItemModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="fab-button" aria-label="Add item">
        <Plus className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-full max-w-md mx-4 mb-4 sm:mb-0 glass-card-static p-6 animate-scale-in">
            <h2 className="font-heading font-semibold text-lg mb-4">Add Grocery Item</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Item Name</label>
                <input
                  type="text"
                  placeholder="e.g. Milk"
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
                >
                  Add Item
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground bg-secondary hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddItemModal;
