import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the job requirements table
export const jobRequirements = pgTable("job_requirements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  responsibilities: text("responsibilities").array().notNull(),
  skills: jsonb("skills").notNull(), // Store skills with importance weights
});

// Define the candidates table
export const candidates = pgTable("candidates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  photoUrl: text("photo_url").notNull(),
  location: text("location").notNull(),
  experience: text("experience").notNull(),
  verified: boolean("verified").default(false),
  featured: boolean("featured").default(false),
  matchScore: integer("match_score").notNull(),
  status: text("status").default("all").notNull(), // all, shortlisted, interviewed, hired
  skills: jsonb("skills").notNull(), // Skills with proficiency percentage
  highlightedExperience: text("highlighted_experience").notNull(),
  technologies: text("technologies").array().notNull(),
  contactInfo: jsonb("contact_info").notNull(),
});

// Define insert schemas using drizzle-zod
export const insertJobRequirementSchema = createInsertSchema(jobRequirements).omit({
  id: true,
});

export const insertCandidateSchema = createInsertSchema(candidates).omit({
  id: true,
});

// Define skill schema for type safety
export const skillSchema = z.object({
  name: z.string(),
  category: z.enum(["Data Engineering", "AI/ML", "GenAI", "Infrastructure"]),
  proficiency: z.number().min(0).max(100),
  importance: z.number().min(1).max(5).optional(),
  color: z.string().optional(),
});

export const contactInfoSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

export type InsertJobRequirement = z.infer<typeof insertJobRequirementSchema>;
export type JobRequirement = typeof jobRequirements.$inferSelect;

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;

export type Skill = z.infer<typeof skillSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
