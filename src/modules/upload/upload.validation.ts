import { z } from 'zod';


const DocumentTypeNameEnum = z.enum([
  'NID',
  'PASSPORT',
  'BIRTH_CERTIFICATE',
  'DRIVING_LICENSE',
  'TIN_CERTIFICATE',
  'STUDENT_ID',
  'MARRIAGE_CERTIFICATE',
  'AVATER',
  "RESUME",
  "DOCUMENT",
  "SIGNATURE",
  "ACHIEVEMENT",
  "CERTIFICATE",
  "OTHER"
]);



const FolderNameEnum = z.enum([
  'AVATER',
  "RESUME",
  "DOCUMENT",
  "SIGNATURE",
  "ACHIEVEMENT",
  "CERTIFICATE",
  "OTHER"
])



export const createDocumentSchema = z.object({
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Name cannot be empty").optional(),
  folderName: FolderNameEnum,
  documentNo: z.string().optional(),
  issueDate: z.string().datetime().optional(),
  issueAuthority: z.string().optional(),
  remarks: z.string().optional(),
  path: z.string().min(1, "File path is required"),
  size: z.number().int().positive("File size must be positive"),
  mimeType: z.string().min(1, "Mime type is required"),
  userId: z.string().uuid("Invalid userId"),
  candidateExperienceId: z.string().uuid().optional(),
  candidateEducationId: z.string().uuid().optional(),
  candidateAchievementId: z.string().uuid().optional(),
});



export const DocumentPayloadSchema = z.object({
  type: DocumentTypeNameEnum,

  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  issueDate: z
    .string()
    .datetime({ message: "Invalid ISO date format" })
    .optional(),

  issueAuthority: z
    .string()
    .min(3, "Issue authority must be at least 3 characters")
    .max(100, "Issue authority cannot exceed 100 characters")
    .optional(),

  remarks: z
    .string()
    .max(300, "Remarks cannot exceed 300 characters")
    .optional(),
  documentNo: z.string()
    .max(300, "Remarks cannot exceed 300 characters")
    .optional(),
});




export const DocumentValidation = {
  createDocumentSchema,
  DocumentTypeNameEnum,
  DocumentPayloadSchema
}



export type TDocumentInputSchema = z.infer<typeof createDocumentSchema>
export type TDocumentTypeNameEnumSchema = z.infer<typeof DocumentTypeNameEnum>
export type TFolderDocumentNameEnumSchema = z.infer<typeof FolderNameEnum>
export type TDocumentPayloadSchema = z.infer<typeof DocumentPayloadSchema>
