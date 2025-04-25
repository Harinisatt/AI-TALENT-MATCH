import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Onboarding() {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;

  return (
    <Card className="bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-900 mb-6">
      <CardContent className="p-4 relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400"
          onClick={() => setIsVisible(false)}
        >
          <XIcon className="h-4 w-4" />
        </Button>
        
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 dark:text-blue-400 mt-1">
            <InfoIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              Welcome to TalentMatchAI!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              We help you find the perfect match for your technical roles. This interface shows you candidates 
              ranked by match score based on the job requirements.{" "}
              <Button 
                variant="link" 
                className="text-primary p-0 h-auto dark:text-primary font-medium"
              >
                Watch our quick tutorial
              </Button>{" "}
              to get started.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
