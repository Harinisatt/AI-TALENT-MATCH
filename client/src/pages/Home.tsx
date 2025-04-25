import { Header } from "@/components/Header";
import { JobDescription } from "@/components/JobDescription";
import { CandidatesList } from "@/components/CandidatesList";
import { ComparisonDrawer } from "@/components/ComparisonDrawer";
import { Onboarding } from "@/components/Onboarding";
import { Button } from "@/components/ui/button";
import { useComparisonDrawer } from "@/hooks/useComparisonDrawer";
import { Columns } from "lucide-react";

export default function Home() {
  const { toggleDrawer, isOpen } = useComparisonDrawer();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Onboarding />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Job Description */}
          <div className="lg:col-span-1">
            <JobDescription />
          </div>
          
          {/* Right Column - Candidates */}
          <div className="lg:col-span-2">
            <CandidatesList />
          </div>
        </div>
      </main>
      
      {/* Comparison Drawer */}
      <ComparisonDrawer />
      
      {/* Fixed Compare Button */}
      <div className="fixed bottom-6 right-6">
        <Button 
          onClick={toggleDrawer}
          className={`rounded-full w-14 h-14 flex items-center justify-center shadow-lg ${
            isOpen ? 'bg-secondary hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          <Columns className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
