
import { auth } from '../../middlewares/auth';
import { AuthGard } from '../../utils/constant/auth.Constant';
import { AuthController } from './auth.controller';
import express from "express";



const router = express.Router();


////////// Auth //////////
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify-email", AuthController.verifyEmail);
router.post('/oauth/google', AuthController.googleAuth)
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword)
router.post("/logout", AuthController.logout)
router.post("/change-password", auth(AuthGard.USER), AuthController.changePassword)
////////// Auth //////////



export const Authrouter = router;



