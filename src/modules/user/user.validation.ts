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

/////////// Expriencez alidation schema //////////////////////

export const workExperienceSchema = z.object({
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
  .optional(),}).refine(
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
const workExperienceArraySchema = z.array(workExperienceSchema);

/////////// Expriencez alidation schema //////////////////////

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

export const addressTypeEnum = z.enum(['PRESENT', 'PERMANENT']);

export const AddressSchema = z.object({
  divisionId: z.number().int('Division must be a valid number'),

  districtId: z.number().int('District must be a valid number'),

  upazilaId: z.number().int().optional().nullable(),
  cityCorporationId: z.number().int().optional().nullable(),
  unionParishadId: z.number().int().optional().nullable(),
  municipalityId: z.number().int().optional().nullable(),
  policeStationId: z.number().int().optional().nullable(),
  postOfficeId: z.number().int().optional().nullable(),

  wardNo: z
    .string()
    .max(10, 'Ward number cannot exceed 10 characters')
    .optional()
    .nullable(),

  addressLine: z.string().min(5, 'Address must be at least 5 characters'),

  isSameAsPresent: z.boolean().optional().default(false),

  addressTypeId: z
    .string()
    .min(5, 'Address type ID must be at least 5 characters'),
});

export const multipleAddressSchema = z.array(AddressSchema).min(1);

export const achievementTypeEnum = z.enum([
  'PROFESSIONAL_CERTIFICATION',
  'TRAINING',
  'WORKSHOP',
]);

export const achievementSchema = z.object({
  id: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(150, 'Title is too long')
    .optional(),
  tempId: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(150, 'Title is too long')
    .optional(),
  achievementType: achievementTypeEnum,
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

export const candidateEducationSchema = z.object({
  id: z.string().uuid('Invalid Level ID format').optional(),

  levelId: z.string().uuid('Invalid Level ID format'),
  degreeId: z.string().uuid('Invalid Degree ID format'),
  tempId: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(150, 'Title is too long')
    .optional(),
  resultTypeId: z.string().uuid('Invalid Result Type ID format'),

  boardId: z.string().uuid('Invalid Board ID format').optional(),

  subjectId: z.string().uuid('Invalid Subject ID format').optional(),

  majorGroupId: z.string().uuid('Invalid Major Group ID format').optional(),

  subjectName: z.string().optional().nullable(),

  instituteName: z
    .string()
    .min(2, 'Institute name must be at least 2 characters')
    .max(255, 'Institute name cannot exceed 255 characters'),

  passingYear: z
    .number()
    .int('Passing year must be an integer')
    .min(1900, 'Passing year must be after 1900')
    .max(new Date().getFullYear(), 'Passing year cannot be in the future'),

  totalMarksCGPA: z
    .string()
    .min(1, 'Total Marks/CGPA cannot be empty')
    .max(20, 'Total Marks/CGPA is too long'),
});

export const candidateEducationArraySchema = z.array(candidateEducationSchema);



export const UserProfileValidation = {
  userProfileSPersonalchema,
  workExperienceArraySchema,
  AddressSchema,
  ReferanceArraySchema,
  multipleAchievementSchema,
  candidateEducationArraySchema,
};





// TypeScript type inferred from Zod
export type TCanditateProfile = z.infer<typeof userProfileSPersonalchema>;
export type TWorkExperiece = z.infer<typeof workExperienceArraySchema>;
export type TAddress = z.infer<typeof AddressSchema>;
export type TReferance = z.infer<typeof referenceSchema>;
export type TAddressInput = z.infer<typeof AddressSchema>;
export type TMultipleAddressInput = z.infer<typeof multipleAddressSchema>;
export type TAddressType = z.infer<typeof addressTypeEnum>;
export type TAchievementInput = z.infer<typeof achievementSchema>;
export type TAchievementEnum = z.infer<typeof addressTypeEnum>;
export type TMultipleEducationInput = z.infer<typeof candidateEducationSchema>;
