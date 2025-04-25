import { Button } from "@/components/ui/button";
import { useComparisonDrawer } from "@/hooks/useComparisonDrawer";
import { X, UserPlus, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SkillMeter } from "./SkillMeter";
import { getInitials } from "@/lib/utils";
import { useJobRequirements } from "@/hooks/useJobRequirements";
import { Skill } from "@shared/schema";
import { useState } from "react";

export function ComparisonDrawer() {
  const { 
    isOpen, 
    closeDrawer, 
    candidatesForComparison, 
    removeCandidateFromComparison 
  } = useComparisonDrawer();
  
  const { jobRequirement } = useJobRequirements();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (!isOpen) return null;

  const renderDropZone = (index: number) => {
    const candidate = candidatesForComparison[index]?.candidate;
    
    if (!candidate) {
      return (
        <div className="bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <UserPlus className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Drag candidate here to compare
            </p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-4 h-auto">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-0 right-0 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-400 h-8 w-8"
            onClick={() => removeCandidateFromComparison(candidate.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex flex-col items-center mb-3 pt-2">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
              <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
            </Avatar>
            <h4 className="font-medium text-slate-800 dark:text-slate-200 text-center">{candidate.name}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{candidate.position}</p>
            <div className="text-xs font-medium text-white bg-primary rounded-full px-2 py-0.5 mb-2">
              {candidate.matchScore}% Match
            </div>
          </div>
          
          <div className="space-y-2">
            {(candidate.skills as Skill[]).map((skill, skillIndex) => (
              <SkillMeter key={skillIndex} skill={skill} compact />
            ))}
          </div>
          
          {isExpanded && (
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
              <p className="font-medium mb-1">Key Technologies:</p>
              <div className="flex flex-wrap gap-1">
                {candidate.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
                {candidate.technologies.length > 3 && (
                  <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full px-2 py-0.5">
                    +{candidate.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 shadow-lg rounded-t-xl z-20 transition-transform duration-300 ${
        isExpanded ? 'h-[75vh]' : 'h-[60vh]'
      }`}
      style={{ transform: 'translateY(0)' }}
    >
      <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          Compare Candidates
        </h3>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpand}
            className="mr-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            {isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={closeDrawer}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 overflow-auto" style={{ maxHeight: isExpanded ? 'calc(75vh - 60px)' : 'calc(60vh - 60px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map(index => renderDropZone(index))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button 
            variant="secondary"
            disabled={candidatesForComparison.length < 2}
            className="bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Detailed Comparison
          </Button>
        </div>
      </div>
    </div>
  );
}
