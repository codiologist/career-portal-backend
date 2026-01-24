/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../config/prisma';
import { TProfileInput } from './user.validation';
import { AppError } from '../../utils/AppError';
import { TUserPayload } from '../../types/user';



//////////////////////////////////////// Profile Services //////////////////////////////////////////

const createProfile = async (payload: TProfileInput, user: TUserPayload, avatarUrl: string | null, resumeUrl: string | null) => {

    payload.avatar = avatarUrl || undefined;
    payload.resumeUpload = resumeUrl || undefined;
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
const me = async (user: TUserPayload) => {

    const result = await prisma.user.findUnique({
        where: { email: user.email },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            profile: true,
        }
    })
    return result
}
const createCertificate = async (user: TUserPayload, files: Express.Multer.File[], certNames: string[]) => {
 
    console.log(user, files, certNames)
    if (files.length !== certNames.length) {
        throw new AppError(400, "Number of files and certificate names must match");
    }   


    // const result = await prisma.certificate.createMany({
    //     data: {
    //         userId: user.id,
    //         filePath: files.map(file => file.path),
    //         certNames: certNames,
    //     },
    // });    


    // return result; 
}
//////////////////////////////// Profile Services //////////////////////////////////////////////////

export const UserService = {
    createProfile,
    me, 
    createCertificate
}



