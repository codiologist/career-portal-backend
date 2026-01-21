import { z } from "zod";

//// category ////
export const jobCategorySchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long"),

  desc: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description is too long")
    .optional(),
});





/// job ////////////////
export const JobTypeEnum = z.enum([
  "FULL_TIME",
  "REMOTE",
  "HYBIRD",
]);


export const JobSchema = z.object({
  jobUniqueId: z.string().min(1, "Job ID is required"),
  title: z.string().min(1, "Job title is required"),     
  slug : z.string().min(1, "Slug is required").optional(),      
  jobRole: z.string().min(1, "Job role is required"),         
  category: z.string().min(1, "Category is required"),
  jobType: JobTypeEnum,
  salaryRange: z.string().min(1, "Salary range is required"),
  location: z.string().min(1, "Location is required"),
  expDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  requirSkills: z
    .array(z.string().min(1))
    .min(1, "At least one skill is required"),
  responsibilities: z.string().min(1, "Responsibilities cannot be empty"),
  features: z.string().min(1, "Features cannot be empty"),
  requirments: z.string().min(1, "Requirements cannot be empty"),
});

// TypeScript type inferred from Zod schema
export type TJobType = z.infer<typeof JobTypeEnum>;


export const jobUpdateSchema = JobSchema.partial();
export type TJobUpdateInput = z.infer<typeof jobUpdateSchema>;



export type TJobCreateInput = z.infer<typeof JobSchema>;



export type TJobCategoryInput = z.infer<typeof jobCategorySchema>;
