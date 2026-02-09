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
///Get my Profile
router.get('/me', auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR), UserController.me);

///// candidate Profile Personal /////////////
router.get('/profile/personal/dropdown', UserController.dropdown)
router.post('/profile/personal', validationSchema(UserProfileValidation.userProfileSPersonalchema), auth(AuthGard.USER), UserController.createCandidatePersonal)
///// candidate Profile Personal /////////////


router.post('/profile/experience',validationSchema(UserProfileValidation.workExperienceArraySchema), auth(AuthGard.USER), UserController.createCandidateExperience)
router.post('/profile/education', auth(AuthGard.USER), UserController.createCandidateEducation)
///// candidate Profile /////////////


/////user address /////
router.get('/profile/personal/dropdown', UserController.dropdown)

/////user address /////

//////////////////Dropdown api  /////////////////////
// router.get("/profile/cascade",UserController.getDivisionWithDistrictsAndUpazilas);




export const UserRouter = router;



