import { useState } from "react";
import { Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

interface AddItemModalProps {
  onAdd: (item: { name: string; category: string; expiryDate: string; cost: number }) => void;
}

const categories = ["Dairy", "Produce", "Bakery", "Meat", "Other"];

const AddItemModal = ({ onAdd }: AddItemModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Other");
  const [date, setDate] = useState<Date>();
  const [cost, setCost] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !date) return;
    onAdd({
      name: name.trim(),
      category,
      expiryDate: date.toISOString().split("T")[0],
      cost: parseFloat(cost) || 0,
    });
    setName("");
    setCategory("Other");
    setDate(undefined);
    setCost("");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Item
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-foreground/20" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-full max-w-sm mx-4 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-medium text-foreground">Add Grocery Item</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Item Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Milk"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Expiry Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full px-3 py-2 rounded-lg bg-background border border-border text-sm text-left flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-ring",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, "PPP") : "Pick a date"}
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Cost (₹)</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !date}
                  className="flex-1 py-2.5 rounded-lg text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Save Item
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-muted-foreground bg-secondary hover:bg-muted transition-colors"
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
