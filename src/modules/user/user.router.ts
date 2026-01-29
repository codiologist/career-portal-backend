import { AuthGard } from '../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';
import express from "express";
// import { uploadBystorage } from '../../utils/upload';
import { UserController } from './user.controller';
import { validationSchema } from '../../middlewares/validationSchema';
import { UserProfileValidation } from './user.validation';
// import { validationSchema } from '../../middlewares/validationSchema';
// import { profileSchema } from './user.validation';



const router = express.Router();


// router.post("/certificates", uploadBystorage.array("certificates"),  auth(AuthGard.USER), UserController.createCertificate);
router.get('/me', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), UserController.me);

///// candidate personal /////////////
router.post('/profile/personal', validationSchema(UserProfileValidation.userProfileSPersonalchema), auth(AuthGard.USER), UserController.createCandidatePersonal)



//////////////////get /////////////////////


router.post('/profile/educations', auth(AuthGard.USER), UserController.createCandidatePersonal)
router.post('/profile/experiences', auth(AuthGard.USER), UserController.createCandidatePersonal)
// router.post('/profile/personal', auth(AuthGard.USER), UserController.createCandidatePersonal)
// router.post('/profile/personal', auth(AuthGard.USER), UserController.createCandidatePersonal)








export const UserRouter = router;



