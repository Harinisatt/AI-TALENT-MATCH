import { useState } from "react";
import { Candidate } from "@shared/schema";
import { CandidateForComparison } from "@/types";

export function useComparisonDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [candidatesForComparison, setCandidatesForComparison] = useState<CandidateForComparison[]>([]);
  
  // Open drawer
  const openDrawer = () => setIsOpen(true);
  
  // Close drawer
  const closeDrawer = () => setIsOpen(false);
  
  // Toggle drawer
  const toggleDrawer = () => setIsOpen(prev => !prev);
  
  // Add candidate for comparison
  const addCandidateForComparison = (candidate: Candidate) => {
    // Check if already added
    const exists = candidatesForComparison.some(c => c.candidate.id === candidate.id);
    
    if (!exists && candidatesForComparison.length < 3) {
      setCandidatesForComparison(prev => [
        ...prev, 
        { candidate, addedAt: new Date() }
      ]);
      
      // Open drawer if adding first candidate
      if (candidatesForComparison.length === 0) {
        openDrawer();
      }
      
      return true;
    }
    
    return false;
  };
  
  // Remove candidate from comparison
  const removeCandidateFromComparison = (candidateId: number) => {
    setCandidatesForComparison(prev => 
      prev.filter(c => c.candidate.id !== candidateId)
    );
    
    // Close drawer if removing last candidate
    if (candidatesForComparison.length === 1) {
      closeDrawer();
    }
  };
  
  // Clear all candidates from comparison
  const clearComparison = () => {
    setCandidatesForComparison([]);
    closeDrawer();
  };
  
  // Check if candidate is in comparison
  const isInComparison = (candidateId: number) => {
    return candidatesForComparison.some(c => c.candidate.id === candidateId);
  };

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    candidatesForComparison,
    addCandidateForComparison,
    removeCandidateFromComparison,
    clearComparison,
    isInComparison
  };
}
