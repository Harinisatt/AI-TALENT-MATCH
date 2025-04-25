import { Candidate, JobRequirement, Skill } from "@shared/schema";

/**
 * Recalculate match score for a candidate based on job requirements
 * 
 * This is a simplified algorithm that:
 * 1. Compares candidate skills against job requirement skills
 * 2. Weighs each skill by its importance in the job requirement
 * 3. Returns a score between 0-100
 */
export function calculateMatchScore(
  candidate: Candidate,
  jobRequirement: JobRequirement
): number {
  if (!candidate.skills || !jobRequirement.skills) {
    return 0;
  }

  const candidateSkills = candidate.skills as Skill[];
  const jobSkills = jobRequirement.skills as Skill[];
  
  let totalWeightedScore = 0;
  let totalPossibleScore = 0;
  
  // For each job skill
  jobSkills.forEach(jobSkill => {
    // Find matching candidate skill
    const matchingSkill = candidateSkills.find(
      candidateSkill => candidateSkill.name === jobSkill.name
    );
    
    // Get importance (weight) of the skill
    const importance = jobSkill.importance || 3; // Default to medium importance
    
    // Add to total possible score
    totalPossibleScore += importance * 100;
    
    // If candidate has the skill, add weighted score
    if (matchingSkill) {
      totalWeightedScore += matchingSkill.proficiency * importance;
    }
  });
  
  // Calculate final percentage
  if (totalPossibleScore === 0) return 0;
  
  const matchScore = Math.round((totalWeightedScore / totalPossibleScore) * 100);
  
  // Ensure score is between 0-100
  return Math.max(0, Math.min(100, matchScore));
}

/**
 * Calculate skill match percentage for a candidate skill
 */
export function calculateSkillMatch(
  candidateSkill: Skill,
  jobSkills: Skill[]
): number {
  const matchingJobSkill = jobSkills.find(
    jobSkill => jobSkill.name === candidateSkill.name
  );
  
  if (!matchingJobSkill) {
    return 0; // Skill not required for the job
  }
  
  return candidateSkill.proficiency;
}
