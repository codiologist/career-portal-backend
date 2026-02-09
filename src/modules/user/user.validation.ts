
import { z } from "zod";




/////////// personal validation schema //////////////////////

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

/////////// personal validation schema //////////////////////

/////////// Exprience validation schema //////////////////////


export const workExperienceSchema = z.object({
  companyName: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters"),

  companyBusinessType: z
    .string()
    .min(1, "Company business type is required"),

  location: z
    .string()
    .min(1, "Location is required"),

  designation: z
    .string()
    .min(1, "Designation is required"),

  department: z
    .string()
    .min(1, "Department is required"),

  isContinue: z.boolean(),

  startDate: z
    .string()
    .datetime({ message: "Start date must be a valid ISO datetime" }),

  endDate: z
    .string()
    .datetime({ message: "End date must be a valid ISO datetime" })
    .nullable()
    .optional(),
})
.refine(
  (data) => {
    // If not continuing, endDate must exist
    if (!data.isContinue) {
      return !!data.endDate
    }
    return true
  },
  {
    message: "End date is required if the job is not ongoing",
    path: ["endDate"],
  }
)

/////////// Exprience validation schema //////////////////////
const workExperienceArraySchema = z.array(workExperienceSchema);

const AddressTypeEnum = z.enum(["PRESENT", "PERMANENT"]);

const AddressSchema = z.object({
  id: z.string().uuid().optional(),
  addressLine: z.string().min(1, "Address line is required"),
  divisionId: z.string().uuid(),
  districtId: z.string().uuid(),
  upazilaId: z.string().uuid().nullable().optional(),
  municipalityId: z.string().uuid().nullable().optional(),
  unionParishadId: z.string().uuid().nullable().optional(),
  policeStationId: z.string().uuid().nullable().optional(),
  postOfficeId: z.string().uuid().nullable().optional(),
  wardNo: z.string().nullable().optional(),
  zipCode: z.string().nullable().optional(),
  isCityCorporation: z.boolean().default(false),
  isSameAsPresent: z.boolean().default(false),
  addressTypeId: AddressTypeEnum,
})












export const UserProfileValidation = {
  userProfileSPersonalchema, 
  workExperienceArraySchema, 
  AddressSchema
}









// TypeScript type inferred from Zod
export type TCanditateProfile = z.infer<typeof userProfileSPersonalchema>;
export type TWorkExperiece = z.infer<typeof workExperienceArraySchema>;