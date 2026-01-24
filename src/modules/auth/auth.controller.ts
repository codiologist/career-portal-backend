import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.service";


////// Auth /////////

const register = catchAsync(async (req, res) => {

  const result = await AuthService.register(req.body)

  res.status(201).json({
    status: true,
    message: "Registration successful. Please verify your email.",
    data: result
  })
})
const login = catchAsync(async (req, res) => {

  const { token } = await AuthService.login(req.body)


  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "none" as const,
  }

  res.cookie('token', token, cookieOptions)

  res.status(201).json({
    status: true,
    message: "User Login successfully",
    data: { token: token },
  })
})
const verifyEmail = catchAsync(async (req, res) => {

  const token = req.query.token as string;
  const result = await AuthService.verifyEmail(token)
  if (!result) {
    res.redirect(`${process.env.CLIENT_URL}/verify-error`);
  } else {
    res.redirect(`${process.env.CLIENT_URL}/profile-verified`);
  }
})

const googleAuth = catchAsync(async (req, res) => {
  const { idToken } = req.body
  const { token } = await AuthService.googleAuth(idToken)

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })

  res.status(200).json({
    status: true,
    message: "User Login by Google successfully",
  })
})


const forgotPassword = catchAsync(async (req, res) => {
  const result = AuthService.forgotPassword(req.body)
  res.status(201).json({
    status: true,
    message: "Check your email to reset your password",
    data: result,
  })

})

const resetPassword = catchAsync(async (req, res) => {
  const result = AuthService.resetPassword(req.body)
  res.status(201).json({
    status: true,
    message: "Your password reset successfully, please login",
    data: result,
  })
})
////// Auth /////////


export const AuthController = {
  register,
  login,
  verifyEmail,
  googleAuth,
  forgotPassword, 
  resetPassword
}





