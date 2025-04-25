import { useState } from "react";
import { Candidate, Skill } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SkillMeter } from "./SkillMeter";
import { Heart, Briefcase, MapPin, Check, Star } from "lucide-react";
import { getInitials, formatPercent, matchScoreToColorClass, getTechBadgeColor } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onAddToComparison: (candidate: Candidate) => void;
  isInComparison: boolean;
}

export function CandidateCard({ candidate, onAddToComparison, isInComparison }: CandidateCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const handleAddToComparison = () => {
    onAddToComparison(candidate);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Left column - Candidate info */}
        <div className="md:col-span-1 p-6 flex flex-col md:border-r border-slate-100 dark:border-slate-800">
          <div className="flex items-start space-x-4 md:space-x-0 md:flex-col">
            <div className="relative">
              <Avatar className="w-16 h-16 md:w-24 md:h-24">
                <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
                <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
              </Avatar>
              
              {candidate.verified && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-success text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    <Check className="h-3 w-3" />
                  </div>
                </div>
              )}
              
              {candidate.featured && (
                <div className="absolute -top-1 -right-1">
                  <div className="bg-warning text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    <Star className="h-3 w-3" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:mt-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {candidate.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
                {candidate.position}
              </p>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                {candidate.status !== "all" && (
                  <Badge className={`
                    ${candidate.status === "shortlisted" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : ""}
                    ${candidate.status === "interviewed" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" : ""}
                    ${candidate.status === "hired" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
                    rounded-full font-medium text-xs px-2.5 py-0.5
                  `}>
                    {candidate.status === "shortlisted" ? "Shortlisted" : 
                     candidate.status === "interviewed" ? "Interviewed" : 
                     candidate.status === "hired" ? "Hired" : ""}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`text-xs font-medium rounded-full px-2.5 py-1 ${matchScoreToColorClass(candidate.matchScore)}`}>
                  <span className="mr-1">%</span> 
                  {formatPercent(candidate.matchScore)} Match
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-slate-500 hover:text-primary text-sm p-0 h-auto ${isFavorite ? 'text-primary' : ''}`}
                  onClick={toggleFavorite}
                >
                  <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 hidden md:block">
            <div className="flex flex-col space-y-2">
              <Button 
                variant="link" 
                className="justify-start p-0 text-sm text-primary hover:text-primary/80 h-auto"
              >
                <span className="mr-2">📄</span> View Resume
              </Button>
              
              <Button 
                variant="link" 
                className="justify-start p-0 text-sm text-primary hover:text-primary/80 h-auto"
              >
                <span className="mr-2">✉️</span> Contact
              </Button>
              
              <Button 
                variant="link" 
                className="justify-start p-0 text-sm text-primary hover:text-primary/80 h-auto"
              >
                <span className="mr-2">🔗</span> LinkedIn Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Skills and experience */}
        <div className="md:col-span-3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-base font-medium text-slate-800 dark:text-slate-200">Experience</h4>
              <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <span>
                  <Briefcase className="h-3 w-3 inline mr-1" /> 
                  {candidate.experience}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span>
                  <MapPin className="h-3 w-3 inline mr-1" /> 
                  {candidate.location}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              >
                Schedule Interview
              </Button>
              
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={handleAddToComparison}
                disabled={isInComparison}
              >
                {isInComparison ? "Added for Comparison" : "Add to Compare"}
              </Button>
            </div>
          </div>
          
          <div className="space-y-5">
            {/* Skills match */}
            <div>
              <h5 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Skills Match</h5>
              <div className="space-y-2">
                {(candidate.skills as Skill[]).map((skill, index) => (
                  <SkillMeter key={index} skill={skill} />
                ))}
              </div>
            </div>
            
            {/* Highlighted experience */}
            <div>
              <h5 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Highlighted Experience</h5>
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {candidate.highlightedExperience}
                </p>
              </div>
            </div>
            
            {/* Technologies */}
            <div className="pt-2">
              <div className="flex justify-between">
                <div className="flex flex-wrap gap-2">
                  {candidate.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className={`${getTechBadgeColor(tech)} rounded-full font-medium text-xs px-2.5 py-0.5`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
