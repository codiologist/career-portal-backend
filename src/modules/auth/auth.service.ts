/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { TUser, TUserPayload } from '../../types/user';
import { prisma } from '../../config/prisma';








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
        throw new Error("result not found")
    }

    const jwtPayload = {
        id: result.id,
        // name: result.name,
        email: result.email,
        role: result.role,
        createdAt: result.createdAt,
        // updatedAt: result.updatedAt
    }

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
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
        where: { email }
    })
    return result

}


export const AuthService = {
    register,
    getAllUsers,
    getSingleUser,
    login
}



