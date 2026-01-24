import { AuthGard } from '../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';

import express from "express";
import { upload, uploadBystorage } from '../../utils/upload';
import { UserController } from './user.controller';



const router = express.Router();


///// User /////
router.post("/certificates", uploadBystorage.array("certificates"),  auth(AuthGard.USER), UserController.createCertificate);
router.get('/me', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), UserController.me);
router.post('/profile', upload.fields([
  { name: "avater", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]), auth(AuthGard.USER), UserController.createProfile)




export const UserRouter = router;



