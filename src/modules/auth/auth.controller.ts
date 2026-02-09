import { TUserPayload } from '../../types/user';
import { catchAsync } from '../../utils/catchAsync';
import { AuthService } from './auth.service';

////// Auth /////////
const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

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
    secure: true,
    sameSite: 'none' as const,
  };

  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    status: true,
    message: 'User Login successfully',
    data: { token: token },
  })
})


const verifyEmail = catchAsync(async (req, res) => {
  const token = req.query.token as string;
  const result = await AuthService.verifyEmail(token);
  if (!result) {
    res.redirect(`${process.env.CLIENT_URL}/verify-error`);
  } else {
    res.redirect(`${process.env.CLIENT_URL}/verification-success`);
  }
});
const googleAuth = catchAsync(async (req, res) => {
  const { idToken } = req.body;
  const { token } = await AuthService.googleAuth(idToken);

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({
    status: true,
    message: 'User Login by Google successfully',
  });
});
const forgotPassword = catchAsync(async (req, res) => {
  const result = AuthService.forgotPassword(req.body);
  res.status(201).json({
    status: true,
    message: 'Check your email to reset your password',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.resetPassword(req.body);

  console.log(result);
  res.status(201).json({
    status: true,
    message: 'Your password reset successfully, please login',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user as TUserPayload;

  const result = await AuthService.changePassword(req.body, user);

  console.log(result);
  res.status(200).json({
    status: true,
    message: 'Your Password change Successfully',
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
});

////// Auth /////////

export const AuthController = {
  register,
  login,
  verifyEmail,
  googleAuth,
  forgotPassword,
  resetPassword,
  logout,
  changePassword,
};
