/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import { auth } from '../../middlewares/auth';
import { CustomFile, upload } from '../../utils/uploadFileSystem';
import { prisma } from '../../config/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { AuthGard } from '../../utils/constant/auth.Constant';
import { documentSchema } from './upload.validation';
import { UploadController } from './upload.controller';

const router = express.Router();

////////// Upload //////////
router.post(
  '/user/resume',
  auth(AuthGard.USER),
  upload.single('resume'),
  async (req, res) => {
    const file = req.file as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log(file);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!file.documentType) {
      return res.status(400).json({ message: 'Document type is required' });
    }

    const result = await prisma.$transaction([
      prisma.document.deleteMany({
        where: {
          userId: user.id,
          type: 'RESUME',
        },
      }),
      prisma.document.create({
        data: {
          userId: user.id,
          type: file.documentType as any, // CERTIFICATE
          name: file.documentName, // SSC / HSC / Masters
          path: file.path,
          size: file.size,
          mimeType: file.mimetype,
        },
      }),
    ]);

    console.log(result);

    res.json({ message: 'File uploaded successfully', file });
  },
);

router.post(
  '/user/avatar',
  auth('USER'),
  upload.single('avatar'),
  async (req, res) => {
    const file = req.file as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log(file);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!file.documentType) {
      return res.status(400).json({ message: 'Document type is required' });
    }

    const result = await prisma.$transaction([
      prisma.document.deleteMany({
        where: {
          userId: user.id,
          type: 'AVATAR',
        },
      }),
      prisma.document.create({
        data: {
          userId: user.id,
          type: file.documentType as any, // CERTIFICATE
          name: file.documentName, // SSC / HSC / Masters
          path: file.path,
          size: file.size,
          mimeType: file.mimetype,
        },
      }),
    ]);

    console.log(result);

    res.json({ message: 'File uploaded successfully', file });
  },
);

router.post(
  '/user/signature',
  auth('USER'),
  upload.single('signature'),
  async (req, res) => {
    const file = req.file as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log(file);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!file.documentType) {
      return res.status(400).json({ message: 'Document type is required' });
    }

    const result = await prisma.$transaction([
      prisma.document.deleteMany({
        where: {
          userId: user.id,
          type: 'SIGNATURE',
        },
      }),
      prisma.document.create({
        data: {
          userId: user.id,
          type: file.documentType as any, // CERTIFICATE
          name: file.documentName, // SSC / HSC / Masters
          path: file.path,
          size: file.size,
          mimeType: file.mimetype,
        },
      }),
    ]);

    console.log(result);

    res.json({ message: 'File uploaded successfully', file });
  },
);

router.post(
  '/user/other',
  auth('USER'),
  upload.single('other'),
  async (req, res) => {
    const file = req.file as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;
    const validateData = documentSchema.parse(JSON.parse(req.body.data));

    // Assuming metadata is sent as a JSON string in the 'data' field
    console.log('File:', validateData);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!file.documentType) {
      return res.status(400).json({ message: 'Document type is required' });
    }

    const result = await prisma.document.upsert({
      where: {
        // You need a unique constraint on (userId + name) in your Prisma schema
        userId_name: {
          userId: user.id,
          name: validateData.name,
        },
      },
      update: {
        type: validateData.type,
        documentNo: validateData.documentNo,
        issueDate: validateData.issueDate,
        issueAuthority: validateData.issueAuthority,
        remarks: validateData.remarks,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      },
      create: {
        userId: user.id,
        type: validateData.type,
        name: validateData.name,
        documentNo: validateData.documentNo,
        issueDate: validateData.issueDate,
        issueAuthority: validateData.issueAuthority,
        remarks: validateData.remarks,
        path: file.path,
        size: file.size,
        mimeType: file.mimetype,
      },
    });

    console.log(result);

    res.json({ message: 'File uploaded successfully', result });
  },
);

router.post(
  '/user/certificate',
  auth('USER'),
  upload.single('certificate'),
  async (req, res) => {
    const file = req.file as CustomFile; // Cast to CustomFile to access custom properties
    const user = req.user as JwtPayload;

    console.log('File:', file);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (!file.documentType) {
      return res.status(400).json({ message: 'Document type is required' });
    }

    const result = await prisma.$transaction([
      prisma.document.deleteMany({
        where: {
          userId: user.id,
          type: 'CERTIFICATE',
          name: file.documentName, // SSC / HSC / Masters
        },
      }),
      prisma.document.create({
        data: {
          userId: user.id,
          type: file.documentType as any, // CERTIFICATE
          name: file.documentName, // SSC / HSC / Masters
          path: file.path,
          size: file.size,
          mimeType: file.mimetype,
        },
      }),
    ]);

    console.log(result);

    res.json({ message: 'File uploaded successfully', file });
  },
);


router.delete('/user/other/delete/:id', auth('USER'), UploadController.deleteDocumentSingle);



////////// Upload //////////

export const UploadRouter = router;
