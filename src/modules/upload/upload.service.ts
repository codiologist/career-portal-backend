import {
  TFolderDocumentNameEnumSchema,
  TDocumentPayloadSchema,
} from './upload.validation';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../config/prisma';
import { TUserPayload } from '../../types/user';
import { AppError } from '../../utils/AppError';
import { TCustomFileMulter } from '../../utils/uploadFileSystem';
import { TDocumentTypeNameEnumSchema } from './upload.validation';

const uploadAvater = async (file: TCustomFileMulter, user: TUserPayload) => {
  if (!file) {
    throw new AppError(400, 'No file uploaded');
  }

  if (!file.documentType) {
    throw new AppError(400, 'Document type is required');
  }

  const result = await prisma.$transaction([
    prisma.document.deleteMany({
      where: {
        userId: user.id,
        folderName: file.fieldname,
      },
    }),
    prisma.document.create({
      data: {
        userId: user.id,
        name: 'AVATAR',
        type: file.documentType as TDocumentTypeNameEnumSchema, // CERTIFICATE
        folderName: file.fieldname as TFolderDocumentNameEnumSchema,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      },
    }),
  ]);

  console.log(result);

  return result;
};

const uploadResume = async (file: TCustomFileMulter, user: TUserPayload) => {
  if (!file) {
    throw new AppError(400, 'No file uploaded');
  }

  if (!file.documentType) {
    throw new AppError(400, 'Document type is required');
  }

  const result = await prisma.$transaction([
    prisma.document.deleteMany({
      where: {
        userId: user.id,
        folderName: file.fieldname,
      },
    }),
    prisma.document.create({
      data: {
        userId: user.id,
        name: file.originalname,
        type: file.documentType as TDocumentTypeNameEnumSchema, // CERTIFICATE
        folderName: file.fieldname as TFolderDocumentNameEnumSchema,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      },
    }),
  ]);

  console.log(result);

  return result;
};

const uploadSignature = async (file: TCustomFileMulter, user: TUserPayload) => {
  if (!file) {
    throw new AppError(400, 'No file uploaded');
  }

  if (!file.documentType) {
    throw new AppError(400, 'Document type is required');
  }

  const result = await prisma.$transaction([
    prisma.document.deleteMany({
      where: {
        userId: user.id,
        folderName: file.fieldname,
      },
    }),
    prisma.document.create({
      data: {
        userId: user.id,
        name: 'SIGNATURE',
        type: file.documentType as TDocumentTypeNameEnumSchema, // CERTIFICATE
        folderName: file.fieldname as TFolderDocumentNameEnumSchema,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      },
    }),
  ]);

  console.log(result);

  return result;
};

const uploadSDocument = async (
  file: TCustomFileMulter,
  user: TUserPayload,
  payload: TDocumentPayloadSchema,
) => {
  // Assuming metadata is sent as a JSON string in the 'data' field
  console.log('File:', payload);

  if (!file) {
    throw new AppError(400, 'No file uploaded');
  }

  if (!file.documentType) {
    throw new AppError(400, 'Document type is required');
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.document.findFirst({
      where: {
        userId: user.id,
        type: payload.type,
      },
    });

    if (existing) {
      await tx.document.update({
        where: { id: existing.id },
        data: {
          type: payload.type,
          name: payload.name,
          folderName: file.fieldname,
          issueDate: payload.issueDate,
          issueAuthority: payload.issueAuthority,
          remarks: payload.remarks,
          path: file.path,
          size: file.size,
          mimeType: file.mimetype,
        },
      });
    } else {
      await tx.document.create({
        data: {
          userId: user.id,
          type: payload.type,
          name: payload.name,
          folderName: file.fieldname,
          documentNo: payload.documentNo,
          issueDate: payload.issueDate,
          issueAuthority: payload.issueAuthority,
          remarks: payload.remarks,
          path: file.path,
          size: file.size,
          mimeType: file.mimetype,
        },
      });
    }
  });

  console.log(result);

  return result;
};

const deleteDocumentSingle = async (id: string) => {
  const result = await prisma.document.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const UploadService = {
  uploadAvater,
  uploadResume,
  uploadSignature,
  deleteDocumentSingle,
  uploadSDocument,
};
