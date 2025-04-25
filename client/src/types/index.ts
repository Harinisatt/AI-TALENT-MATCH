import { Candidate, Skill, JobRequirement } from "@shared/schema";

export type CandidateForComparison = {
  candidate: Candidate;
  addedAt: Date;
}

export type SkillCategory = "Data Engineering" | "AI/ML" | "GenAI" | "Infrastructure";

export type FilterOptions = {
  search: string;
  matchScore: string;
  status: string;
};

export type SortOptions = {
  field: string;
  direction: 'asc' | 'desc';
};

export type PaginationState = {
  page: number;
  pageSize: number;
  total: number;
};
