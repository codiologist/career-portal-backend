/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import { auth } from '../../middlewares/auth';
import { upload } from '../../utils/uploadFileSystem';
import { AuthGard } from '../../utils/constant/auth.Constant';
import { UploadController } from './upload.controller';


const router = express.Router();

router.post('/user/avatar', auth(AuthGard.USER), upload.single('avatar'), UploadController.uploadAvater);
router.post('/user/signature', auth(AuthGard.USER), upload.single('signature'), UploadController.uploadSignature);
router.post('/user/resume', auth(AuthGard.USER), upload.single('resume'), UploadController.uploadResume);
router.post('/user/document', auth(AuthGard.USER), upload.single('document'), UploadController.uploadDocument);


// router.post(
//   '/user/certificate',
//   auth('USER'),
//   upload.single('certificate'),
//   async (req, res) => {
//     const file = req.file as CustomFile; // Cast to CustomFile to access custom properties
//     const user = req.user as JwtPayload;

//     console.log('File:', file);
//     if (!file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     if (!file.documentType) {
//       return res.status(400).json({ message: 'Document type is required' });
//     }

//     const result = await prisma.$transaction([
//       prisma.document.deleteMany({
//         where: {
//           userId: user.id,
//           type: 'CERTIFICATE',
//           name: file.documentName, // SSC / HSC / Masters
//         },
//       }),
//       prisma.document.create({
//         data: {
//           userId: user.id,
//           type: file.documentType as any, // CERTIFICATE
//           name: file.documentName, // SSC / HSC / Masters
//           path: file.path,
//           size: file.size,
//           mimeType: file.mimetype,
//         },
//       }),
//     ]);

//     console.log(result);

//     res.json({ message: 'File uploaded successfully', file });
//   },
// );



router.delete('/user/other/delete/:id', auth('USER'), UploadController.deleteDocumentSingle);



////////// Upload //////////

export const UploadRouter = router;
