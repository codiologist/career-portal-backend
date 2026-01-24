import { z } from "zod";

// Work Experience schema
const workExperienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required"),
  companyTitle: z.string().min(1, "Company title is required"),
  companyLocation: z.string().min(1, "Company location is required"),
  jobRole: z.string().min(1, "Job role is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z
    .string()
    .optional()
    .transform((date) => (date ? new Date(date) : null)),
});

// Education schema
const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  academy: z.string().min(1, "Academy is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
   endDate: z
    .string()
    .optional()
    .transform((date) => (date ? new Date(date) : null)),
});

// Main Profile schema
export const profileSchema = z.object({
  avatar: z.string().url().optional(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid DOB" }),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  zip: z.string().min(1, "ZIP is required"),
  maritalStatus: z.boolean(),
  bio: z.string().min(1, "Bio is required"),
  isVerified: z.boolean(),
  totalExperience: z.string().min(1, "Total experience is required"),
  portfolioLink: z.string().optional(),
  socialLink: z.array(z.string().url()).optional(),
  resumeUpload: z.string().url().optional(),
  skill: z.array(z.string().min(1)).optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  education: z.array(educationSchema).optional(),
});




export type TProfileInput = z.infer<typeof profileSchema>;



