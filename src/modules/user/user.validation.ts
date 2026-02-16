import { z } from 'zod';

/////////// personal validation schema //////////////////////

const socialLinkSchema = z.array(
  z.object({
    label: z.string().min(1, 'Social platform label is required'),

    url: z.string().url('Invalid URL format'),
  }),
);

// Zod validation schema
export const userProfileSPersonalchema = z.object({
  careerTitle: z.string(),
  careerObjective: z.string(),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
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
  portfolioLink: z.string().optional(),
  religionId: z.string().uuid(),
  bloodGroupId: z.string().uuid(),
  socialLink: socialLinkSchema,
  skillIds: z
    .array(z.string().uuid('Invalid skill id'))
    .min(1, 'At least one skill is required'),
  interstIds: z
    .array(z.string().uuid('Invalid skill id'))
    .min(1, 'At least one skill is required'),
});

/////////// personal validation schema //////////////////////

/////////// Exprience validation schema //////////////////////

export const workExperienceSchema = z
  .object({
    companyName: z
      .string()
      .min(1, 'Company name is required')
      .min(2, 'Company name must be at least 2 characters'),

    companyBusinessType: z.string().min(1, 'Company business type is required'),

    location: z.string().min(1, 'Location is required'),

    designation: z.string().min(1, 'Designation is required'),

    department: z.string().min(1, 'Department is required'),

    isContinue: z.boolean(),

    responsibilities: z.string().optional(),

    startDate: z
      .string()
      .datetime({ message: 'Start date must be a valid ISO datetime' }),

    endDate: z
      .string()
      .datetime({ message: 'End date must be a valid ISO datetime' })
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      // If not continuing, endDate must exist
      if (!data.isContinue) {
        return !!data.endDate;
      }
      return true;
    },
    {
      message: 'End date is required if the job is not ongoing',
      path: ['endDate'],
    },
  );

/////////// Exprience validation schema //////////////////////
const workExperienceArraySchema = z.array(workExperienceSchema);

export const referenceSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long'),

  designation: z
    .string()
    .min(2, 'Designation must be at least 2 characters')
    .max(100, 'Designation is too long'),

  phone: z
    .string()
    .min(6, 'Phone number is too short')
    .max(20, 'Phone number is too long'),

  emailAddress: z.string().email('Invalid email address'),

  relationship: z
    .string()
    .min(2, 'Relationship must be at least 2 characters')
    .max(100, 'Relationship is too long'),
});

const ReferanceArraySchema = z.array(referenceSchema);

/**
 * Address Type Enum
 */

export const addressTypeEnum = z.enum(['PRESENT', 'PERMANENT']);

/**
 * Single Address Schema
 */
export const AddressSchema = z.object({
  divisionId: z.string().min(1, 'Division ID must be at least 5 characters'),
  districtId: z.string().min(1, 'District ID must be at least 5 characters'),
  upazilaId: z.string().optional().nullable(),
  cityCorporationId: z.string().optional().nullable(),
  unionParishadId: z.string().optional().nullable(),
  municipalityId: z.string().optional().nullable(),
  policeStationId: z.string().optional().nullable(),
  postOfficeId: z.string().optional().nullable(),
  wardNo: z.string().max(10).optional().nullable(),
  addressLine: z.string().min(5, 'Address must be at least 5 characters'),
  isSameAsPresent: z.boolean().optional().default(false),

  addressTypeId: z
    .string()
    .min(5, 'Address type ID must be at least 5 characters'),
});
/**
 * Multiple Address Schema (optional)
 */
export const multipleAddressSchema = z.array(AddressSchema).min(1);

export const achievementTypeEnum = z.enum([
  'PROFESSIONAL_CERTIFICATION',
  'TRAINING',
  'WORKSHOP',
  'SEMINAR',
  'AWARD',
  'HONOR',
  'COMPETITION',
  'PUBLICATION',
  'PROJECT',
  'OTHER',
]);

export const achievementSchema = z.object({
  type: achievementTypeEnum,

  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(150, 'Title is too long'),

  organizationName: z.string().min(2, 'Organization name is required').max(120),

  url: z.string().url('Invalid URL').optional().or(z.literal('')),

  location: z.string().min(2, 'Location is required').max(100),

  year: z
    .number()
    .int()
    .gte(1950, 'Invalid year')
    .lte(new Date().getFullYear(), 'Year cannot be in the future'),

  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(2000),
});

export const multipleAchievementSchema = z.array(achievementSchema).min(1);

export const UserProfileValidation = {
  userProfileSPersonalchema,
  workExperienceArraySchema,
  AddressSchema,
  ReferanceArraySchema,

  multipleAchievementSchema,
};

// TypeScript type inferred from Zod
export type TCanditateProfile = z.infer<typeof userProfileSPersonalchema>;
export type TWorkExperiece = z.infer<typeof workExperienceArraySchema>;
export type TAddress = z.infer<typeof AddressSchema>;
export type TReferance = z.infer<typeof referenceSchema>;
// Single Address Type
export type TAddressInput = z.infer<typeof AddressSchema>;

// Multiple Address Type
export type TMultipleAddressInput = z.infer<typeof multipleAddressSchema>;

// Address Type Enum
export type TAddressType = z.infer<typeof addressTypeEnum>;
export type TAchievementInput = z.infer<typeof achievementSchema>;
export type TAchievementEnum = z.infer<typeof achievementTypeEnum>;
