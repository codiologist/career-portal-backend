import { AuthGard } from './../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import express from "express";
import { upload, uploadBystorage } from '../../utils/upload';


const router = express.Router();

///// Auth /////
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify-email", AuthController.verifyEmail);
router.post('/oauth/google', AuthController.googleAuth)
router.post("/logout", AuthController.logout);


///// Profile /////
router.get('/profile', auth(AuthGard.USER), AuthController.getSingleUser)
router.post("/certificates", uploadBystorage.array("certificates"),  auth(AuthGard.USER), AuthController.createCertificate);
router.get('/me', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.me);
router.post('/profile', upload.fields([
  { name: "avater", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]), auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.createProfile)




export const Authrouter = router;



