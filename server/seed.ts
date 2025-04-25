import { db } from "./db";
import { jobRequirements, candidates } from "@shared/schema";
import { eq } from "drizzle-orm";

async function seedDatabase() {
  console.log("Seeding database...");
  
  // Check if we already have data
  const existingReqs = await db.select().from(jobRequirements);
  const existingCandidates = await db.select().from(candidates);
  
  // Skip if we already have data
  if (existingReqs.length > 0 && existingCandidates.length > 0) {
    console.log("Database already has data, skipping seed");
    return;
  }
  
  // Add default job requirement
  const defaultJobReq = {
    title: "Data, AI/ML, GenAI Platform Engineer",
    summary: "We are seeking a versatile, highly skilled professional who combines strong expertise in data engineering, advanced AI/ML model development, and agent-based workflow orchestration. In this role, you will drive the development and optimization of our AI Talent Matching platform with a focus on Workday integration. You will design robust data pipelines, develop and fine-tune large language model (LLM) integrations, and architect intelligent, modular agent workflows that power enterprise-level semantic matching and HR data processing.",
    responsibilities: [
      "Design robust data pipelines for HR data processing",
      "Develop and fine-tune large language model (LLM) integrations",
      "Architect intelligent, modular agent workflows",
      "Build enterprise-level semantic matching algorithms",
      "Optimize ML models for candidate-job matching"
    ],
    skills: [
      {
        name: "Data Engineering",
        category: "Data Engineering",
        importance: 4, 
        color: "bg-primary",
        proficiency: 0 // Not applicable for job requirements
      },
      {
        name: "AI/ML Development",
        category: "AI/ML",
        importance: 5,
        color: "bg-secondary",
        proficiency: 0
      },
      {
        name: "GenAI & LLMs",
        category: "GenAI",
        importance: 5,
        color: "bg-accent",
        proficiency: 0
      },
      {
        name: "Agent Workflows",
        category: "AI/ML",
        importance: 4,
        color: "bg-primary",
        proficiency: 0
      },
      {
        name: "API Integration",
        category: "Infrastructure",
        importance: 3,
        color: "bg-secondary",
        proficiency: 0
      },
      {
        name: "Cloud Computing",
        category: "Infrastructure",
        importance: 3,
        color: "bg-accent",
        proficiency: 0
      }
    ]
  };
  
  const [jobRequirement] = await db.insert(jobRequirements).values(defaultJobReq).returning();
  console.log("Added job requirement:", jobRequirement.title);
  
  // Add sample candidates
  const sampleCandidates = [
    {
      name: "Alex Chen",
      position: "Data Scientist & ML Engineer",
      photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      location: "San Francisco, CA",
      experience: "5+ years",
      verified: true,
      featured: false,
      status: "shortlisted",
      matchScore: 95,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 95, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 98, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 90, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 85, color: "bg-primary" }
      ],
      highlightedExperience: "Led the development of a machine learning platform that processed over 10 million customer interactions daily. Implemented LLM-based semantic search that improved search relevance by 45%.",
      technologies: ["Python", "TensorFlow", "AWS", "LangChain", "Spark"],
      contactInfo: {
        email: "alex.chen@example.com",
        linkedin: "linkedin.com/in/alexchen"
      }
    },
    {
      name: "Priya Sharma",
      position: "ML Platform Engineer",
      photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      location: "Remote",
      experience: "4 years",
      verified: false,
      featured: true,
      status: "interviewed",
      matchScore: 88,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 83, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 92, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 95, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 75, color: "bg-primary" }
      ],
      highlightedExperience: "Built an enterprise-grade LLM platform that integrated with Workday for HR data processing. Created custom fine-tuned models for resume parsing and job matching with 89% accuracy.",
      technologies: ["Python", "PyTorch", "GCP", "LlamaIndex", "Kafka"],
      contactInfo: {
        email: "priya.sharma@example.com",
        linkedin: "linkedin.com/in/priyasharma"
      }
    },
    {
      name: "Marcus Johnson",
      position: "Senior Data Engineer",
      photoUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
      location: "Seattle, WA",
      experience: "7 years",
      verified: false,
      featured: false,
      status: "hired",
      matchScore: 79,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 97, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 68, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 65, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 72, color: "bg-primary" }
      ],
      highlightedExperience: "Architected and developed high-throughput data pipelines processing 5TB+ daily. Implemented data integration systems with multiple HR platforms including Workday and SAP SuccessFactors.",
      technologies: ["Python", "Scala", "AWS", "Airflow", "Snowflake"],
      contactInfo: {
        email: "marcus.johnson@example.com",
        linkedin: "linkedin.com/in/marcusjohnson"
      }
    },
    // Adding more candidates with different statuses
    {
      name: "Sarah Williams",
      position: "AI Research Scientist",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      location: "Boston, MA",
      experience: "6 years",
      verified: true,
      featured: true,
      status: "shortlisted",
      matchScore: 93,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 87, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 96, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 94, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 88, color: "bg-primary" }
      ],
      highlightedExperience: "Published 8 research papers on large language model optimization and interpretability. Developed an agent-based LLM architecture that reduced hallucinations by 35%.",
      technologies: ["Python", "PyTorch", "HuggingFace", "JAX", "LlamaIndex"],
      contactInfo: {
        email: "sarah.williams@example.com",
        linkedin: "linkedin.com/in/sarahwilliams"
      }
    },
    {
      name: "David Kim",
      position: "LLM Specialist",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      location: "New York, NY",
      experience: "3 years",
      verified: true,
      featured: false,
      status: "interviewed",
      matchScore: 89,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 78, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 86, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 97, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 84, color: "bg-primary" }
      ],
      highlightedExperience: "Specialized in LLM fine-tuning and deployment. Built an AI interview coach using a multi-agent framework that improved candidate interview scores by 28%.",
      technologies: ["Python", "TensorFlow", "LangChain", "Azure", "Pinecone"],
      contactInfo: {
        email: "david.kim@example.com",
        linkedin: "linkedin.com/in/davidkim"
      }
    },
    {
      name: "Aisha Patel",
      position: "Data Engineering Lead",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      location: "Chicago, IL",
      experience: "8 years",
      verified: true,
      featured: false,
      status: "hired",
      matchScore: 85,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 98, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 79, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 72, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 80, color: "bg-primary" }
      ],
      highlightedExperience: "Led a team of 12 engineers building enterprise data platforms. Designed a real-time HR analytics system integrated with multiple HRIS platforms that reduced data latency from days to minutes.",
      technologies: ["Python", "Scala", "Spark", "Databricks", "dbt"],
      contactInfo: {
        email: "aisha.patel@example.com",
        linkedin: "linkedin.com/in/aishapatel"
      }
    },
    {
      name: "Carlos Rodriguez",
      position: "AI Infrastructure Architect",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      location: "Austin, TX",
      experience: "7 years",
      verified: false,
      featured: true,
      status: "all",
      matchScore: 83,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 88, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 81, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 78, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 92, color: "bg-primary" }
      ],
      highlightedExperience: "Architected GPU infrastructure for a Fortune 500 company's AI center of excellence. Built distributed agent systems that allowed for parallel execution of complex AI workflows.",
      technologies: ["Python", "Kubernetes", "Docker", "TensorFlow", "Ray"],
      contactInfo: {
        email: "carlos.rodriguez@example.com",
        linkedin: "linkedin.com/in/carlosrodriguez"
      }
    },
    {
      name: "Emma Wilson",
      position: "Full-Stack AI Engineer",
      photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      location: "Portland, OR",
      experience: "4 years",
      verified: true,
      featured: false,
      status: "all",
      matchScore: 80,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 85, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 84, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 81, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 76, color: "bg-primary" }
      ],
      highlightedExperience: "Built end-to-end ML applications from data pipelines to frontend interfaces. Created an AI-powered recruitment platform that increased qualified candidate identification by 40%.",
      technologies: ["Python", "React", "FastAPI", "PyTorch", "Next.js"],
      contactInfo: {
        email: "emma.wilson@example.com",
        linkedin: "linkedin.com/in/emmawilson"
      }
    },
    {
      name: "Mohammed Al-Farsi",
      position: "ML Systems Engineer",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      location: "Denver, CO",
      experience: "5 years",
      verified: false,
      featured: false,
      status: "shortlisted",
      matchScore: 78,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 92, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 85, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 70, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 75, color: "bg-primary" }
      ],
      highlightedExperience: "Specialized in productionizing ML models at scale. Built monitoring and observability systems for LLMs that detected performance degradation and data drift in real-time.",
      technologies: ["Python", "MLflow", "Kubernetes", "Prometheus", "Grafana"],
      contactInfo: {
        email: "mohammed.alfarsi@example.com",
        linkedin: "linkedin.com/in/mohammedalfarsi"
      }
    },
    {
      name: "Julia Zhang",
      position: "AI Product Manager",
      photoUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
      location: "San Diego, CA",
      experience: "6 years",
      verified: true,
      featured: true,
      status: "interviewed",
      matchScore: 75,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 70, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 78, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 88, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 82, color: "bg-primary" }
      ],
      highlightedExperience: "Led cross-functional teams to build and launch AI products. Managed the development of an LLM-powered talent matching system that improved hiring efficiency by 35%.",
      technologies: ["Python", "JIRA", "SQL", "Tableau", "Figma"],
      contactInfo: {
        email: "julia.zhang@example.com",
        linkedin: "linkedin.com/in/juliazhang"
      }
    },
    {
      name: "Thomas Nkosi",
      position: "Language Model Researcher",
      photoUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3",
      location: "Washington, DC",
      experience: "3 years",
      verified: false,
      featured: false,
      status: "all",
      matchScore: 73,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 65, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 80, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 90, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 68, color: "bg-primary" }
      ],
      highlightedExperience: "Focused on developing more efficient LLM training techniques. Created a novel tokenizer that reduced inference time by 22% while maintaining output quality.",
      technologies: ["Python", "PyTorch", "HuggingFace", "CUDA", "FastAPI"],
      contactInfo: {
        email: "thomas.nkosi@example.com",
        linkedin: "linkedin.com/in/thomasnkosi"
      }
    },
    {
      name: "Sophia Garcia",
      position: "Data Science Team Lead",
      photoUrl: "https://images.unsplash.com/photo-1542206395-9feb3edaa68d",
      location: "Miami, FL",
      experience: "7 years",
      verified: true,
      featured: false,
      status: "hired",
      matchScore: 71,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 83, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 89, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 72, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 65, color: "bg-primary" }
      ],
      highlightedExperience: "Led a team of 8 data scientists building predictive models for HR applications. Implemented a talent attrition prediction model that achieved 87% accuracy and saved the company an estimated $2.4M in replacement costs.",
      technologies: ["Python", "R", "SQL", "Scikit-learn", "Power BI"],
      contactInfo: {
        email: "sophia.garcia@example.com",
        linkedin: "linkedin.com/in/sophiagarcia"
      }
    },
    {
      name: "James Wilson",
      position: "MLOps Engineer",
      photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      location: "Toronto, Canada",
      experience: "5 years",
      verified: false,
      featured: false,
      status: "shortlisted",
      matchScore: 69,
      skills: [
        { name: "Data Engineering", category: "Data Engineering", proficiency: 88, color: "bg-primary" },
        { name: "AI/ML Development", category: "AI/ML", proficiency: 76, color: "bg-secondary" },
        { name: "GenAI & LLMs", category: "GenAI", proficiency: 64, color: "bg-accent" },
        { name: "Agent Workflows", category: "AI/ML", proficiency: 72, color: "bg-primary" }
      ],
      highlightedExperience: "Modernized ML deployment pipeline reducing model release cycle from weeks to hours. Built automated testing framework for ML models that caught performance regressions before production deployment.",
      technologies: ["Python", "Docker", "Kubernetes", "Jenkins", "TensorFlow Serving"],
      contactInfo: {
        email: "james.wilson@example.com",
        linkedin: "linkedin.com/in/jameswilson"
      }
    }
  ];
  
  const results = await db.insert(candidates).values(sampleCandidates).returning();
  console.log(`Added ${results.length} candidates`);
  
  console.log("Database seeding complete!");
}

// Export the seed function
export default seedDatabase;