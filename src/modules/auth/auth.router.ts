
import { AuthController } from './auth.controller';
import express from "express";




const router = express.Router();

///// Auth /////
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/verify-email", AuthController.verifyEmail);
router.post('/oauth/google', AuthController.googleAuth)
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword)


export const Authrouter = router;



