CREATE TABLE "candidates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"photo_url" text NOT NULL,
	"location" text NOT NULL,
	"experience" text NOT NULL,
	"verified" boolean DEFAULT false,
	"featured" boolean DEFAULT false,
	"match_score" integer NOT NULL,
	"status" text DEFAULT 'all' NOT NULL,
	"skills" jsonb NOT NULL,
	"highlighted_experience" text NOT NULL,
	"technologies" text[] NOT NULL,
	"contact_info" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_requirements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"responsibilities" text[] NOT NULL,
	"skills" jsonb NOT NULL
);
