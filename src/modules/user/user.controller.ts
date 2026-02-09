
import { TUserPayload } from "../../types/user";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { UserProfileValidation } from "./user.validation";
// import { profileSchema } from "./user.validation";




////// Profile create /////////

const me = catchAsync(async (req, res) => {
  const user = req.user

  const result = await UserService.me(user as TUserPayload)

  res.status(201).json({
    status: true,
    message: "get my profile successfully",
    data: result
  })
})


const createCandidatePersonal = catchAsync(async (req, res) => {

  const user = req.user
  const result = await UserService.createCandidatePersonalService(req.body, user as TUserPayload)
  res.status(201).json({
    status: true,
    message: "Profile created successfully",
    data: result
  })
})

const createCandidateExperience = catchAsync(async (req, res) => {

  const result = await UserService.createCandidateExperienceService(req.body, req.user as TUserPayload)
  res.status(201).json({
    status: true,
    message: "Created user Exprience successfully",
    data: result
  })
})


const dropdown = catchAsync(async (req, res) => {

  const result = await UserService.dropdown()
  res.status(201).json({
    status: true,
    message: "get all personal dropdown successfully",
    data: result
  })
})



// const createCertificate = catchAsync(async (req, res) => {
//   const files = req.files;

//   const certNames = Array.isArray(req.body.certNames) ? req.body.certNames : req.body.certNames?.split(","); // if sent as comma-separated string
//   const user = req.user


//   const result = await UserService.createCertificate(user as TUserPayload, files as Express.Multer.File[], certNames)

//   res.status(201).json({
//     status: true,
//     message: "cartificate created successfully",
//     data: result
//   })
// })

////// Profile create /////////

////// Dropdown Data ///////////////


// const getDivisionWithDistrictsAndUpazilas = catchAsync(async (req, res) => {


//   const result = await UserService.getDivisionWithDistrictsAndUpazilas(req.query as {divisionId: string, districtId: string, upazilaId:string})

//   res.status(201).json({
//     status: true,
//     message: "get all locations",
//     data: result
//   })
// })

const createCandidateEducation = catchAsync(async (req, res) => {

  const result = await UserService.createCandidateEducationService(req.body, req.user as TUserPayload)
  res.status(201).json({
    status: true,
    message: "Created user Education successfully",
    data: result
  })
})


export const UserController = {
  createCandidatePersonal,
  createCandidateExperience,
  me,
  
  //// Dropdown query 
  // getDivisionWithDistrictsAndUpazilas, 
  dropdown, 
  createCandidateEducation
}





