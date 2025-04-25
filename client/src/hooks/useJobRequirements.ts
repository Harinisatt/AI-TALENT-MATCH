import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { JobRequirement, Skill } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export function useJobRequirements() {
  const [jobRequirementId, setJobRequirementId] = useState<number>(1);

  // Fetch all job requirements
  const allJobRequirementsQuery = useQuery({
    queryKey: ['/api/job-requirements'],
  });
  
  // Fetch single job requirement
  const jobRequirementQuery = useQuery({
    queryKey: [`/api/job-requirements/${jobRequirementId}`],
    enabled: !!jobRequirementId,
  });

  // Update job requirement skills importance
  const updateSkillsImportanceMutation = useMutation({
    mutationFn: async (skills: { name: string; importance: number }[]) => {
      const response = await apiRequest('PATCH', `/api/job-requirements/${jobRequirementId}/skills`, skills);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: [`/api/job-requirements/${jobRequirementId}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/job-requirements'] });
    },
  });

  // Set current job requirement
  const selectJobRequirement = (id: number) => {
    setJobRequirementId(id);
  };

  // Update skill importance
  const updateSkillImportance = (skillName: string, importance: number) => {
    const jobRequirement = jobRequirementQuery.data as JobRequirement;
    if (!jobRequirement) return;

    const skills = jobRequirement.skills as Skill[];
    const updatedSkills = skills.map(skill => {
      if (skill.name === skillName) {
        return {
          name: skill.name,
          importance
        };
      }
      return {
        name: skill.name,
        importance: skill.importance
      };
    });

    updateSkillsImportanceMutation.mutate(updatedSkills);
  };

  return {
    jobRequirement: jobRequirementQuery.data as JobRequirement,
    isLoading: jobRequirementQuery.isLoading,
    allJobRequirements: allJobRequirementsQuery.data as JobRequirement[],
    updateSkillImportance,
    selectJobRequirement,
    isUpdating: updateSkillsImportanceMutation.isPending,
  };
}
