import { TUserPayload } from '../../types/user';
import { catchAsync } from '../../utils/catchAsync';
import { UserService } from './user.service';
import { UserProfileValidation } from './user.validation';
// import { UserProfileValidation } from "./user.validation";
// import { profileSchema } from "./user.validation";

////// Profile create /////////

const me = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserService.me(user as TUserPayload);

  res.status(201).json({
    status: true,
    message: 'get my profile successfully',
    data: result,
  });
});

const createCandidatePersonal = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await UserService.createCandidatePersonalService(
    req.body,
    user as TUserPayload,
  );
  res.status(201).json({
    status: true,
    message: 'Profile created successfully',
    data: result,
  });
});

const createCandidateExperience = catchAsync(async (req, res) => {
  const result = await UserService.createCandidateExperienceService(
    req.body,
    req.user as TUserPayload,
  );
  res.status(201).json({
    status: true,
    message: 'Created user Exprience successfully',
    data: result,
  });
});

const dropdown = catchAsync(async (req, res) => {
  const result = await UserService.dropdown();
  res.status(201).json({
    status: true,
    message: 'get all personal dropdown successfully',
    data: result,
  });
});

const getAddressTypeDropdown = catchAsync(async (req, res) => {
  const result = await UserService.getAddressTypeDropdown();
  res.status(201).json({
    status: true,
    message: 'get all address type dropdown successfully',
    data: result,
  });
});

const createCandidateEducation = catchAsync(async (req, res) => {
  const result = await UserService.createCandidateEducationService(
    req.body,
    req.user as TUserPayload,
  );
  res.status(201).json({
    status: true,
    message: 'Created user Education successfully',
    data: result,
  });
});

const createCandidateReference = catchAsync(async (req, res) => {

  const validation = UserProfileValidation.ReferanceArraySchema.parse(req.body)
  const result = await UserService.createCandidateReference(
    validation,
    req.user as TUserPayload,
  );
  res.status(201).json({
    status: true,
    message: 'Created user Reference successfully',
    data: result,
  });
});

const createCandidateAddress = catchAsync(async (req, res) => {
  const result = await UserService.createCandidateAddress(
    req.body,
    req.user as TUserPayload,
  );
  res.status(201).json({
    status: true,
    message: 'Created user Address successfully',
    data: result,
  });
});

const getDivisionWithDistrictsAndUpazilas = catchAsync(async (req, res) => {
  const query = req.query as {
    divisionId: string;
    districtId: string;
    upazilaId: string;
  };

  const result = await UserService.getDivisionWithDistrictsAndUpazilas(query);
  res.status(200).json({
    status: true,
    message: 'get all division/district/upazila successfully',
    data: result,
  });
});

const createCandidateAchievement = catchAsync(async (req, res) => {

  const files = req.files as Express.Multer.File[];

  const data = JSON.parse(req.body.data)

  const validation = UserProfileValidation.multipleAchievementSchema.parse(data)


  const result = await UserService.createCandidateAchievement(
    validation,
    files,
    req.user as TUserPayload,

  );
  res.status(201).json({
    status: true,
    message: 'Created user Achievement successfully',
    data: result,
  });
});

export const UserController = {
  createCandidatePersonal,
  createCandidateExperience,
  me,

  //// Dropdown query
  getDivisionWithDistrictsAndUpazilas,
  getAddressTypeDropdown,
  dropdown,
  createCandidateEducation,
  createCandidateReference,
  createCandidateAddress,
  createCandidateAchievement,
};
