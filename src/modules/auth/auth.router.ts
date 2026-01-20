
import { auth } from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import express from "express";


const router = express.Router();

router.post("/register",  AuthController.register);
router.post("/login",  AuthController.login);
router.get("/user", auth('ADMIN'),  AuthController.getSingleUser);
router.get("/users",  AuthController.getAllUsers);





export const Authrouter = router;



