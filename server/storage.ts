import { 
  jobRequirements, 
  candidates, 
  type JobRequirement, 
  type Candidate,
  type InsertJobRequirement,
  type InsertCandidate 
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, like, ilike, or } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // Job Requirements
  getJobRequirement(id: number): Promise<JobRequirement | undefined>;
  getAllJobRequirements(): Promise<JobRequirement[]>;
  createJobRequirement(requirement: InsertJobRequirement): Promise<JobRequirement>;
  updateJobRequirement(id: number, requirement: Partial<InsertJobRequirement>): Promise<JobRequirement | undefined>;
  
  // Candidates
  getCandidate(id: number): Promise<Candidate | undefined>;
  getAllCandidates(): Promise<Candidate[]>;
  getCandidatesByMatchScore(minScore: number, maxScore: number): Promise<Candidate[]>;
  getCandidatesByStatus(status: string): Promise<Candidate[]>;
  searchCandidates(query: string): Promise<Candidate[]>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  updateCandidate(id: number, candidate: Partial<InsertCandidate>): Promise<Candidate | undefined>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // Job Requirements
  async getJobRequirement(id: number): Promise<JobRequirement | undefined> {
    const [jobRequirement] = await db.select().from(jobRequirements).where(eq(jobRequirements.id, id));
    return jobRequirement;
  }
  
  async getAllJobRequirements(): Promise<JobRequirement[]> {
    return await db.select().from(jobRequirements);
  }
  
  async createJobRequirement(requirement: InsertJobRequirement): Promise<JobRequirement> {
    const [jobRequirement] = await db.insert(jobRequirements).values(requirement).returning();
    return jobRequirement;
  }
  
  async updateJobRequirement(id: number, requirement: Partial<InsertJobRequirement>): Promise<JobRequirement | undefined> {
    const [jobRequirement] = await db
      .update(jobRequirements)
      .set(requirement)
      .where(eq(jobRequirements.id, id))
      .returning();
    return jobRequirement;
  }
  
  // Candidates
  async getCandidate(id: number): Promise<Candidate | undefined> {
    const [candidate] = await db.select().from(candidates).where(eq(candidates.id, id));
    return candidate;
  }
  
  async getAllCandidates(): Promise<Candidate[]> {
    return await db.select().from(candidates);
  }
  
  async getCandidatesByMatchScore(minScore: number, maxScore: number): Promise<Candidate[]> {
    return await db
      .select()
      .from(candidates)
      .where(and(
        gte(candidates.matchScore, minScore),
        lte(candidates.matchScore, maxScore)
      ));
  }
  
  async getCandidatesByStatus(status: string): Promise<Candidate[]> {
    return await db
      .select()
      .from(candidates)
      .where(eq(candidates.status, status));
  }
  
  async searchCandidates(query: string): Promise<Candidate[]> {
    // Search across name, position, location, and technologies
    return await db
      .select()
      .from(candidates)
      .where(or(
        ilike(candidates.name, `%${query}%`),
        ilike(candidates.position, `%${query}%`),
        ilike(candidates.location, `%${query}%`),
        ilike(candidates.highlightedExperience, `%${query}%`)
      ));
  }
  
  async createCandidate(candidate: InsertCandidate): Promise<Candidate> {
    const [newCandidate] = await db.insert(candidates).values(candidate).returning();
    return newCandidate;
  }
  
  async updateCandidate(id: number, candidate: Partial<InsertCandidate>): Promise<Candidate | undefined> {
    const [updatedCandidate] = await db
      .update(candidates)
      .set(candidate)
      .where(eq(candidates.id, id))
      .returning();
    return updatedCandidate;
  }
}

// Export storage instance
export const storage = new DatabaseStorage();