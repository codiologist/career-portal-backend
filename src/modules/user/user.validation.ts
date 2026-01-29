
import { z } from "zod";


const socialLinkSchema = z.array(
  z.object({
    label: z
      .string()
      .min(1, "Social platform label is required"),

    url: z
      .string()
      .url("Invalid URL format"),
  })
);

// Zod validation schema
export const userProfileSPersonalchema = z.object({
  careerTitle: z.string(),
  careerObjective: z.string(),
  dob: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    { message: "Invalid date format" }
  ),
  fullName: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  spouseName: z.string().nullable(),
  mobileNo: z.string(),
  alternatePhone: z.string().nullable(),
  gender: z.string(),
  maritalStatus: z.string(),
  nationality: z.string(),
  nationalId: z.string(),
  portfolioLink: z.string().url(),
  religionId: z.string().uuid(),
  bloodGroupId: z.string().uuid(),
  socialLink: socialLinkSchema,
  skillIds: z
    .array(z.string().uuid("Invalid skill id"))
    .min(1, "At least one skill is required"),
  interstIds: z.array(z.string().uuid("Invalid skill id"))
    .min(1, "At least one skill is required"),

});




export const UserProfileValidation = {
  userProfileSPersonalchema
}









// TypeScript type inferred from Zod
export type TCanditateProfile = z.infer<typeof userProfileSPersonalchema>;
