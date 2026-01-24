/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { TUser } from '../../types/user';
import { prisma } from '../../config/prisma';
import { AppError } from '../../utils/AppError';
import { createEmailToken } from '../../utils/createEmailToken';
import sendEmail from '../../utils/sendEmail';
import bcrypt from "bcryptjs";
import { verifyEmailTemplate } from '../../utils/emailTemplate/VerifyLink';
import { googleOAuthClient } from '../../config/oauth';

/////// Auth Services ////////

const register = async (payload: TUser) => {


    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    const hash = bcrypt.hashSync(payload.password, salt);
    payload.password = hash;



    const isExist = await prisma.user.findUnique({ where: { email: payload.email } })
    if (isExist) {
        throw new AppError(404, "User already exists")
    }


    const result = await prisma.user.create({
        data: {
            ...payload
        }
    })

    if (!result.isEmailVerified) {
        const token = createEmailToken(result.id);
        const link = `${process.env.BASE_API}/auth/verify-email?token=${token}`;
        const emailTemplate = verifyEmailTemplate(link);

        await sendEmail(result.email, "Verify your email", emailTemplate);
        console.log("email send successfull")
    }

    return {}
}
const login = async (payload: TUser) => {
    const result = await prisma.user.findUnique({ where: { email: payload.email, } })
    if (!result) {
        throw new AppError(401, "Invalid credentials")
    }

    const veryfy = bcrypt.compareSync(payload.password, result.password); // true

    if (!veryfy) {
        throw new AppError(401, "Invalid credentials")
    }

    if (!result.isEmailVerified) {
        throw new AppError(401, "Please verify your email to login")
    }

    if (!result) {
        throw new Error("User not found")
    }
    const jwtPayload = {
        id: result.id,
        // name: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        // updatedAt: result.updatedAt
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "ebdwegweuweurgweurguwer6734873457" as string, {
        expiresIn: "7d"
    })
    console.log(token)
    return { token }
}
const googleAuth = async (idToken: string) => {
    if (!idToken) {
        throw new AppError(404, "requre idToken")
    }

    // 🔐 Verify token with Google
    const ticket = await googleOAuthClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // 

    // const { picture, email, name} = payload || {};

    // console.log(picture, email, name)

    if (!payload?.email) {
        throw new AppError(404, "Invalid OAuth token")
    }

    // 👤 Find or create user
    let user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: payload.email,
                fullName: payload.name,
                password: Math.random().toString(36).slice(-8), // Random password
                role: "USER",
                isEmailVerified: true,
            },
        });
    }

    const jwtPayload = {
        id: user.id,
        // name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        // updatedAt: user.updatedAt
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "ebdwegweuweurgweurguwer6734873457" as string, {
        expiresIn: "7d"
    })
    return { token }
}
const verifyEmail = async (token: string) => {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET as string) as {
        userId: string; id: string
    };
    console.log(decoded)
    const user = await prisma.user.findFirst({ where: { id: decoded.userId } });
    if (!user) {
        throw new AppError(404, "User not found");
    }
    await prisma.user.update({
        where: { id: decoded.userId },
        data: { isEmailVerified: true }
    });
    return { message: "Email verified successfully" };
};

const forgotPassword = async (payload: { email: string }) => {
    const { email } = payload;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new AppError(404, 'User not found! Please provide valid email !');
    }

    if (!user.isEmailVerified) {
        throw new AppError(404, 'Your email is not verified. Please verify your email');

    }
    if (!user?.isActive) {
        throw new AppError(502, 'Your account is inactive. Please contact support.');
    }

    const jwtPayload = {
        email: user.email,
    }

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "ebdwegweuweurgweurguwer6734873457" as string, {
        expiresIn: "1d"
    })

    const passwordresetLink = `${process.env.CLIENT_URL}/forgot-password?token=${token}&email=${user?.email}`;


    const emailSubject = 'Your Reset Password Link';
    const bodyHtml = `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa; padding: 40px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <div style="background-color: #28a745; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Password Reset Request</h1>
    </div>

    <!-- Body -->
    <div style="padding: 30px;">
      <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hi ${user.fullName},</p>
      <p style="font-size: 16px; color: #555; margin-bottom: 30px;">
        We received a request to reset your password. Click the button below to choose a new password. This link will expire in 15 minutes.
      </p>

      <div style="text-align: center; margin-bottom: 30px;">
        <a
          href="${passwordresetLink}"
          style="
            display: inline-block;
            background-color: #28a745;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 25px;
            border-radius: 4px;
            font-size: 18px;
          "
          target="_blank"
        >
          Reset Password
        </a>
      </div>

      <p style="font-size: 14px; color: #777; margin-bottom: 20px;">
        If you didn’t ask to reset your password, just ignore this email. No changes were made to your account.
      </p>
      <p style="font-size: 16px; color: #555;">Thanks,</p>
      <p style="font-size: 16px; color: #555; font-weight: bold;">Company Name</p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f0f0f0; padding: 15px; text-align: center;">
      <p style="font-size: 14px; color: #777; margin: 0;">&copy; ${new Date().getFullYear()} Company Name. All rights reserved.</p>
    </div>
  </div>
</div>

`;
    await sendEmail(email, emailSubject, bodyHtml);


    return {};

};



const resetPassword = async (payload: { token: string; newPassword: string;}) => {
  const { newPassword, token } = payload;

const deoded = jwt.verify(token, process.env.JWT_SECRET!) ;


//   const user = await prisma.user.findFirst({
//     where: {
//       OR: [
//         { deoded.email }, 
//       ]
//     }
//   });

//   if (!user) {
//     throw new AppError(404, 'User not found');
//   }

  // if (!user.emailVerified) {
  //   throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY,
  //     'Your email was not verifyed. Please verify your email before reset your password'
  //   );
  // }

//   if (!user?.isActive) {
//     throw new AppError(StatusCodes.UNPROCESSABLE_ENTITY, 'Your account is inactive. Please contact support.');
//   }

//   const passwordHashing = await passwordHash(newPassword);

//   await prisma.user.update({
//     where: { id: user.id }, // always use a unique field here
//     data: { password: passwordHashing },
//   });

  return {};
};



/////// Auth Services ////////



export const AuthService = {
    register,
    login,
    verifyEmail,
    googleAuth,
    forgotPassword, 
    resetPassword
}



