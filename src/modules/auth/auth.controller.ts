

import { TUserPayload } from "../../types/user";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";


const  register = catchAsync(async (req, res) => {

const result = await AuthService.register(req.body)

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: result,
    },
})
})

const  login = catchAsync(async (req, res) => {

const {token} = await AuthService.login(req.body)


    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }
    
  res.cookie('accessTokenAuth', token, cookieOptions)

  res.status(201).json({
    status: "success",
    message: "User Login successfully",
    data: {accessToken: token},
})

})

const  getAllUsers = catchAsync(async (req, res) => {


const result = await AuthService.getAllUsers()

  res.status(201).json({
    status: "success",
    message: "get all users successfully",
    data: result
})

})
const  getSingleUser = catchAsync(async (req, res) => {
  const user = req.user


const result = await AuthService.getSingleUser(user as TUserPayload)

  res.status(201).json({
    status: "success",
    message: "get single user successfully",
    data: result
})

})

  export const AuthController = {
    register,
    getAllUsers, 
    getSingleUser, 
    login
  }





