/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../config/prisma';
import { TUserPayload } from '../../types/user';
import { TCanditateProfile } from './user.validation';




//////////////////////////////////////// Profile Services /////////////////////////////////////////////

const createCandidatePersonalService = async (
    payload: TCanditateProfile,
    user: TUserPayload
) => {
    const { skillIds, interstIds, socialLink, ...candidateData } = payload;

    const result = await prisma.candidatePersonal.upsert({
        where: {
            userId: user.id, // must be UNIQUE in schema
        },
        update: {
            ...candidateData,
            skills: {
                set: skillIds?.map((id: string) => ({ id })), // 🔥 replaces old skills
            },
            interests: {
                set: interstIds?.map((id: string) => ({ id })) // 🔥 replaces old interests
            },
            socialLink: {
                deleteMany: {},
                create: socialLink?.map((link: {label: string, url: string}) => ({
                    label: link.label,
                    url: link.url,
                })),
            },
        },
        create: {
            ...candidateData,
            userId: user.id,
            skills: {
                connect: skillIds?.map((id: string) => ({ id })), // 🔥 replaces old interests
            },
            interests: {
                connect: interstIds?.map((id: string) => ({ id }))
            },
            socialLink: {
                create: socialLink?.map((link: {label: string, url: string}) => ({
                    label: link.label,
                    url: link.url,
                })),
            },
        },
        include: {
            religion: true,
            bloodGroup: true,
            skills: true,
            interests: true,
            socialLink: true,
            user: true,
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
            candidatePersonal: {
                include: {
                    religion: true
                }
            }
        }
    })
    return result
}


// const createCertificate = async (user: TUserPayload, files: Express.Multer.File[], certNames: string[]) => {

//     console.log(user, files, certNames)
//     if (files.length !== certNames.length) {
//         throw new AppError(400, "Number of files and certificate names must match");
//     }


//     // const result = await prisma.certificate.createMany({
//     //     data: {
//     //         userId: user.id,
//     //         filePath: files.map(file => file.path),
//     //         certNames: certNames,
//     //     },
//     // });    


//     // return result; 
// }
//////////////////////////////// Profile Services //////////////////////////////////////////////////

export const UserService = {
    createCandidatePersonalService,
    me,
    // createCertificate
}



