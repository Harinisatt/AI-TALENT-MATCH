import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API prefix
  const apiPrefix = "/api";

  // Get all job requirements
  app.get(`${apiPrefix}/job-requirements`, async (req, res) => {
    try {
      const jobRequirements = await storage.getAllJobRequirements();
      res.json(jobRequirements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job requirements" });
    }
  });

  // Get job requirement by ID
  app.get(`${apiPrefix}/job-requirements/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const jobRequirement = await storage.getJobRequirement(id);
      if (!jobRequirement) {
        return res.status(404).json({ message: "Job requirement not found" });
      }
      
      res.json(jobRequirement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job requirement" });
    }
  });

  // Update job requirement skills importance
  app.patch(`${apiPrefix}/job-requirements/:id/skills`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const jobRequirement = await storage.getJobRequirement(id);
      if (!jobRequirement) {
        return res.status(404).json({ message: "Job requirement not found" });
      }
      
      const skillsSchema = z.array(
        z.object({
          name: z.string(),
          importance: z.number().min(1).max(5)
        })
      );
      
      const validationResult = skillsSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid skills data format",
          errors: validationResult.error.errors
        });
      }
      
      // Update only importance values for matching skills
      const skills = jobRequirement.skills as any[];
      const updatedSkills = skills.map((skill: any) => {
        const updatedSkill = validationResult.data.find(s => s.name === skill.name);
        if (updatedSkill) {
          return { ...skill, importance: updatedSkill.importance };
        }
        return skill;
      });
      
      const updatedRequirement = await storage.updateJobRequirement(id, {
        skills: updatedSkills
      });
      
      res.json(updatedRequirement);
    } catch (error) {
      res.status(500).json({ message: "Failed to update job requirement skills" });
    }
  });

  // Get all candidates
  app.get(`${apiPrefix}/candidates`, async (req, res) => {
    try {
      let candidates;
      
      // Handle search query
      if (req.query.search) {
        candidates = await storage.searchCandidates(req.query.search as string);
      } 
      // Handle match score filtering
      else if (req.query.matchScore) {
        const matchScore = req.query.matchScore as string;
        let minScore = 0;
        let maxScore = 100;
        
        if (matchScore === 'high') {
          minScore = 90;
          maxScore = 100;
        } else if (matchScore === 'medium') {
          minScore = 70;
          maxScore = 89;
        } else if (matchScore === 'low') {
          minScore = 0;
          maxScore = 69;
        }
        
        candidates = await storage.getCandidatesByMatchScore(minScore, maxScore);
      }
      // Handle status filtering
      else if (req.query.status) {
        const status = req.query.status as string;
        candidates = await storage.getCandidatesByStatus(status);
      }
      // Get all candidates
      else {
        candidates = await storage.getAllCandidates();
      }
      
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch candidates" });
    }
  });

  // Get candidate by ID
  app.get(`${apiPrefix}/candidates/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const candidate = await storage.getCandidate(id);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
      
      res.json(candidate);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch candidate" });
    }
  });

  return httpServer;
}
