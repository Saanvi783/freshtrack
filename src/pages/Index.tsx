import { Sparkles } from "lucide-react";
import SmartInsight from "@/components/SmartInsight";
import EatSoonSection from "@/components/EatSoonSection";
import FreshSection from "@/components/FreshSection";
import ImpactChart from "@/components/ImpactChart";
import AddItemModal from "@/components/AddItemModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="font-heading text-2xl font-bold gradient-text">FreshTrack</h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <SmartInsight />
          <EatSoonSection />
          <FreshSection />
          <ImpactChart />
        </div>
      </div>

      <AddItemModal />
    </div>
  );
};

export default Index;
