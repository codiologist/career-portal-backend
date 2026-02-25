/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import { auth } from '../../middlewares/auth';
import { upload } from '../../utils/uploadFileSystem';
import { AuthGard } from '../../utils/constant/auth.Constant';
import { UploadController } from './upload.controller';

const router = express.Router();

router.post(
  '/user/avatar',
  auth(AuthGard.USER),
  upload.single('avatar'),
  UploadController.uploadAvater,
);
router.post(
  '/user/signature',
  auth(AuthGard.USER),
  upload.single('signature'),
  UploadController.uploadSignature,
);
router.post(
  '/user/resume',
  auth(AuthGard.USER),
  upload.single('resume'),
  UploadController.uploadResume,
);
router.post(
  '/user/document',
  auth(AuthGard.USER),
  upload.single('document'),
  UploadController.uploadDocument,
);
router.delete(
  '/user/document/delete/:id',
  auth('USER'),
  UploadController.deleteDocumentSingle,
);

////////// Upload //////////

export const UploadRouter = router;
