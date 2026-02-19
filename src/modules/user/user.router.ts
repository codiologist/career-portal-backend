import { AuthGard } from '../../utils/constant/auth.Constant';
import { auth } from '../../middlewares/auth';
import express from 'express';
// import { uploadBystorage } from '../../utils/upload';
import { UserController } from './user.controller';
import { validationSchema } from '../../middlewares/validationSchema';
import {
  //   achievementSchema,
  multipleAchievementSchema,
  UserProfileValidation,
} from './user.validation';
import { upload, uploadArray } from '../../utils/uploadFileSystem';

// import { validationSchema } from '../../middlewares/validationSchema';
// import { profileSchema } from './user.validation';

const router = express.Router();

// router.post("/certificates", uploadBystorage.array("certificates"),  auth(AuthGard.USER), UserController.createCertificate);
///Get my Profile
router.get(
  '/me',
  auth(AuthGard.ADMIN, AuthGard.MODERATOR, AuthGard.USER, AuthGard.HR),
  UserController.me,
);

///// candidate Profile Personal /////////////
router.get('/profile/personal/dropdown', UserController.dropdown);
router.post(
  '/profile/personal',
  validationSchema(UserProfileValidation.userProfileSPersonalchema),
  auth(AuthGard.USER),
  UserController.createCandidatePersonal,
);
///// candidate Profile Personal /////////////

router.post(
  '/profile/experience',
  validationSchema(UserProfileValidation.workExperienceArraySchema),
  auth(AuthGard.USER),
  UserController.createCandidateExperience,
);

router.post(
  '/profile/education',
  auth(AuthGard.USER),
  UserController.createCandidateEducation,
);
router.post(
  '/profile/reference',
  auth(AuthGard.USER),
  UserController.createCandidateReference,
);
router.post(
  '/profile/achievement',
  auth(AuthGard.USER),
   upload.array("certificateAchivement"),
  // validationSchema(multipleAchievementSchema),
  UserController.createCandidateAchievement,
);

router.post(
  '/profile/address',
  auth(AuthGard.USER),
  UserController.createCandidateAddress,
);

/////Dropdown data /////
router.get('/profile/personal/dropdown', UserController.dropdown);
router.get(
  '/profile/address-type/dropdown',
  UserController.getAddressTypeDropdown,
);
router.get(
  '/profile/address/dropdown',
  UserController.getDivisionWithDistrictsAndUpazilas,
);
router.get(
  '/profile/education/dropdown',
  UserController.getEducationDropdown,
);



/////user address /////

//////////////////Dropdown api  /////////////////////
// router.get("/profile/cascade",UserController.getDivisionWithDistrictsAndUpazilas);

export const UserRouter = router;
