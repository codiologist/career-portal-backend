/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { TUser, TUserPayload } from '../../types/user';
import { prisma } from '../../config/prisma';
import { TProfileInput } from './profile.validation';








const register = async (payload: TUser) => {

    const result = await prisma.user.create({
        data: {
            ...payload
        }
    })
    return result
}


const login = async (payload: TUser) => {

    const result = await prisma.user.findUnique({
        where: {
            email: payload.email,
            password: payload.password
        }
    })
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



    return {token}
}



const getAllUsers = async () => {

    const result = await prisma.user.findMany()
    return result

}



const getSingleUser = async (payload: TUserPayload) => {

const {email} = payload

    const result = await prisma.user.findUnique({
        where: { email }, 
        select: {
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            profile: true,
        }
    })
    return result
}




/////// Profile ////////

const createProfile = async (payload: TProfileInput, user: TUserPayload) => {
  const { workExperience, education, ...rest } = payload;

  const result = await prisma.profile.upsert({
    where: { userId: user.id }, // unique field
    update: {
      ...rest,
      // For nested relations, you might want to replace or update existing entries
      workExperience: {
        deleteMany: {}, // optional: delete old entries
        create: workExperience?.map((we) => ({ ...we })),
      },
      education: {
        deleteMany: {},
        create: education?.map((edu) => ({ ...edu })),
      },
    },
    create: {
      ...rest,
      userId: user.id,
      workExperience: {
        create: workExperience?.map((we) => ({ ...we })),
      },
      education: {
        create: education?.map((edu) => ({ ...edu })),
      },
    },
  });

  return result;
};






export const AuthService = {
    register,
    getAllUsers,
    createProfile,
    getSingleUser,
    login
}



