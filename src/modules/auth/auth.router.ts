import { AuthGard } from './../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import express from "express";
import upload from '../../utils/upload';


const router = express.Router();

router.post("/register",  AuthController.register);
router.post("/login",  AuthController.login);


///// Profile /////

router.post('/profile', upload.any(), auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.createProfile)

router.get('/profile', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), AuthController.getSingleUser)


export const Authrouter = router;



