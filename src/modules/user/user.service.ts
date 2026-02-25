/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../config/prisma';
import { TUserPayload } from '../../types/user';
import { AppError } from '../../utils/AppError';
import { profileProgressCalculation } from '../../utils/profileProgressCalculation';
import {
  TAchievementInput,
  TAddressInput,
  TCanditateProfile,
  TMultipleEducationInput,
  TReferance,
  TWorkExperiece,
} from './user.validation';

//////////////////////////////////////// Profile Services /////////////////////////////////////////////

const createCandidatePersonalService = async (
  payload: TCanditateProfile,
  user: TUserPayload,
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
        set: interstIds?.map((id: string) => ({ id })), // 🔥 replaces old interests
      },
      socialLink: {
        deleteMany: {},
        create: socialLink?.map((link: { label: string; url: string }) => ({
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
        connect: interstIds?.map((id: string) => ({ id })),
      },
      socialLink: {
        create: socialLink?.map((link: { label: string; url: string }) => ({
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

  await profileProgressCalculation(user?.id);

  return result;
};
const createCandidateExperienceService = async (
  payload: TWorkExperiece,
  user: TUserPayload,
) => {
  const userId = user.id;

  const result = await prisma.$transaction(async (tx) => {
    // 1️⃣ Delete old experiences
    await tx.candidateExperience.deleteMany({
      where: { userId },
    });

    // 2️⃣ Insert new ones
    await tx.candidateExperience.createMany({
      data: payload.map((exp) => ({
        userId,
        companyName: exp.companyName,
        companyBusinessType: exp.companyBusinessType,
        location: exp.location,
        designation: exp.designation,
        isContinue: exp.isContinue,
        startDate: new Date(exp.startDate),
        endDate: exp.endDate ? new Date(exp.endDate) : null,
        department: exp.department,
        responsibilities: exp.responsibilities ?? '',
      })),
    });

    // 3️⃣ Return updated list
    return tx.candidateExperience.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });
  });
  await profileProgressCalculation(user?.id);
  return result;
};

// const createCandidateEducationService = async (
//   payload: TMultipleEducationInput[],
//   files: Express.Multer.File[],
//   user: TUserPayload,
// ) => {
//   const userId = user.id;

//   if (!payload || payload.length === 0) {
//     throw new AppError(400, 'Education payload is required');
//   }

//   const result = await prisma.$transaction(async (tx) => {
//     // 1️⃣ Get existing educations
//     const existingEducations = await tx.candidateEducation.findMany({
//       where: { userId },
//       select: { id: true },
//     });

//     const existingIds = existingEducations.map((item) => item.id);

//     const incomingIds = payload
//       .filter((item) => item.id)
//       .map((item) => item.id);

//     // 2️⃣ Delete removed educations
//     const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));

//     if (idsToDelete.length > 0) {
//       await tx.document.deleteMany({
//         where: {
//           candidateEducationId: { in: idsToDelete },
//         },
//       });

//       await tx.candidateEducation.deleteMany({
//         where: {
//           id: { in: idsToDelete },
//         },
//       });
//     }

//     const finalEducations = [];

//     // 3️⃣ Create or Update
//     for (let index = 0; index < payload.length; index++) {
//       const item = payload[index];
//       const file = files?.[index]; // 🔥 SAFE FIX

//       const educationData = {
//         userId,
//         levelId: item.levelId,
//         degreeId: item.degreeId,
//         boardId: item.boardId,
//         subjectId: item.subjectId,
//         resultTypeId: item.resultTypeId,
//         majorGroupId: item.majorGroupId,
//         subjectName: item.subjectName ?? null,
//         instituteName: item.instituteName,
//         passingYear: item.passingYear,
//         totalMarksCGPA: item.totalMarksCGPA,
//       };

//       let education;

//       if (item.id) {
//         education = await tx.candidateEducation.update({
//           where: { id: item.id },
//           data: educationData,
//         });
//       } else {
//         education = await tx.candidateEducation.create({
//           data: educationData,
//         });
//       }

//       finalEducations.push(education);

//       // 4️⃣ Handle File
//       if (file) {
//         // delete old certificate
//         await tx.document.deleteMany({
//           where: {
//             candidateEducationId: education.id,
//           },
//         });

//         await tx.document.create({
//           data: {
//             userId,
//             type: 'CERTIFICATE',
//             name: file.originalname,
//             folderName: file.fieldname,
//             path: file.path,
//             size: file.size,
//             mimeType: file.mimetype,
//             candidateEducationId: education.id,
//           },
//         });
//       }
//     }

//     return finalEducations;
//   });

//   return result;
// };

const createCandidateEducationService = async (
  payload: TMultipleEducationInput[],
  files: Express.Multer.File[],
  user: TUserPayload,
) => {
  const userId = user.id;

  if (!payload || payload.length === 0) {
    throw new AppError(400, 'Education payload is required');
  }

  const result = await prisma.$transaction(async (tx) => {
    // 1️⃣ Get existing educations
    const existingEducations = await tx.candidateEducation.findMany({
      where: { userId },
      select: { id: true },
    });

    // ✅ Payload-এ যেসব ID আছে সেগুলো collect করো
    const incomingIds = payload
      .map((item) => item.id)
      .filter(Boolean) as string[];

    // ✅ আগে education গুলো খুঁজে বের করো যেগুলো delete হবে
    const educationsToDelete = await tx.candidateEducation.findMany({
      where: {
        userId,
        ...(incomingIds.length > 0 ? { id: { notIn: incomingIds } } : {}),
      },
      select: { id: true },
    });

    const educationIdsToDelete = educationsToDelete.map((e) => e.id);

    if (educationIdsToDelete.length > 0) {
      // ✅ Document আগে delete (foreign key constraint)
      await tx.document.deleteMany({
        where: {
          candidateEducationId: { in: educationIdsToDelete },
        },
      });

      // ✅ তারপর Education delete
      await tx.candidateEducation.deleteMany({
        where: {
          id: { in: educationIdsToDelete },
        },
      });
    }

    for (let i = 0; i < payload.length; i++) {
      const item = payload[i];
      const educationId = item.id;

      // ✅ Schema অনুযায়ী সঠিক field names
      const education = await tx.candidateEducation.upsert({
        where: {
          id: educationId || '00000000-0000-0000-0000-000000000000',
        },
        update: {
          levelId: item.levelId,
          degreeId: item.degreeId ?? null,
          boardId: item.boardId ?? null,
          subjectId: item.subjectId ?? null,
          resultTypeId: item.resultTypeId ?? null,
          majorGroupId: item.majorGroupId ?? null,
          subjectName: item.subjectName ?? null,
          instituteName: item.instituteName,
          passingYear: item.passingYear,
          totalMarksCGPA: item.totalMarksCGPA,
        },
        create: {
          levelId: item.levelId,
          degreeId: item.degreeId ?? null,
          boardId: item.boardId ?? null,
          subjectId: item.subjectId ?? null,
          resultTypeId: item.resultTypeId ?? null,
          majorGroupId: item.majorGroupId ?? null,
          subjectName: item.subjectName ?? null,
          instituteName: item.instituteName,
          passingYear: item.passingYear,
          totalMarksCGPA: item.totalMarksCGPA,
          userId,
        },
      });

      const file = files?.[i];

      // ✅ empty blob (size === 0) ignore করো
      if (file && file.size > 0) {
        const existingDoc = await tx.document.findFirst({
          where: {
            candidateEducationId: education.id,
            userId,
            isDeleted: false,
          },
        });

        if (existingDoc) {
          await tx.document.update({
            where: { id: existingDoc.id },
            data: {
              path: file.path,
              size: file.size,
              mimeType: file.mimetype,
              name: file.originalname,
              folderName: file.destination,
            },
          });
        } else {
          await tx.document.create({
            data: {
              type: 'EDUCATION',
              name: file.originalname,
              folderName: file.destination,
              path: file.path,
              size: file.size,
              mimeType: file.mimetype,
              userId,
              candidateEducationId: education.id,
            },
          });
        }
      }

      result.push(education);
    }
    await profileProgressCalculation(user?.id);
    return finalEducations;
  });

  return result;
};
const createCandidateReference = async (
  payload: TReferance[],
  user: TUserPayload,
) => {
  const userId = user.id;

  const result = await prisma.$transaction(async (tx) => {
    // 1️⃣ Delete old references
    await tx.candidateReference.deleteMany({
      where: { userId },
    });

    // 2️⃣ Insert new references
    const created = await tx.candidateReference.createMany({
      data: payload.map((ref) => ({
        userId,
        name: ref.name,
        companyName: ref.companyName,
        designation: ref.designation,
        phone: ref.phone,
        emailAddress: ref.emailAddress,
        relationship: ref.relationship,
      })),
    });

    return created;
  });
  await profileProgressCalculation(user?.id);
  return result;
};
const createCandidateAddress = async (
  payload: TAddressInput[],
  user: TUserPayload,
) => {
  const userId = user.id;

  const result = await prisma.$transaction(async (tx) => {
    // 1️⃣ Delete old addresses
    await tx.address.deleteMany({
      where: { userId },
    });

    // 2️⃣ Create new addresses
    const addresses = payload.map((item) => ({
      userId,
      divisionId: item.divisionId,
      districtId: item.districtId,
      cityCorporationId: item.cityCorporationId ?? null,
      upazilaId: item.upazilaId,
      unionParishadId: item.unionParishadId ?? null,
      municipalityId: item.municipalityId ?? null,
      postOfficeId: item.postOfficeId ?? null,
      policeStationId: item.policeStationId ?? null,
      wardNo: item.wardNo ?? null,
      addressLine: item.addressLine,
      isSameAsPresent: item.isSameAsPresent ?? false,
      addressTypeId: item.addressTypeId,
    }));

    return await tx.address.createMany({
      data: addresses,
    });
  });
  await profileProgressCalculation(user?.id);
  return result;
};

////////
// const createCandidateAchievement = async (
//   payload: TAchievementInput[],
//   files: Express.Multer.File[],
//   user: TUserPayload,
// ) => {
//   const userId = user.id;

//   if (!payload || payload.length === 0) {
//     throw new AppError(400, 'Achievement payload is required');
//   }

//   return await prisma.$transaction(async (tx) => {
//     const result = [];

//     for (let i = 0; i < payload.length; i++) {
//       const item = payload[i];
//   console.log(item)
//       // 🔥 If ID not provided → check existing by unique fields
//       const achievementId = item.achievementId;

//       // if (!achievementId) {
//       //   const existing = await tx.candidateAchievement.findFirst({
//       //     where: {userId},
//       //   });

//       //   if (existing) {
//       //     achievementId = existing.id;
//       //   }
//       // }

//       console.log(achievementId)

//       const achievement = await tx.candidateAchievement.upsert({
//         where: {
//           id: achievementId || '00000000-0000-0000-0000-000000000000', // fake id if not found
//         },
//         update: {
//           achievementType: item.achievementType,
//           title: item.title,
//           organizationName: item.organizationName,
//           url: item.url,
//           location: item.location,
//           year: item.year,
//           description: item.description,
//         },
//         create: {
//           achievementType: item.achievementType,
//           title: item.title,
//           organizationName: item.organizationName,
//           url: item.url,
//           location: item.location,
//           year: item.year,
//           description: item.description,
//           userId,
//         },
//       });

//       // =========================
//       // FILE SECTION (NO DUPLICATE)
//       // =========================

//       const file = files?.[i];

//       if (file) {
//         const existingDoc = await tx.document.findFirst({
//           where: {
//             candidateAchievementId: achievement.id,
//             userId,
//             isDeleted: false,
//           },
//         });

//         if (existingDoc) {
//           await tx.document.update({
//             where: { id: existingDoc.id },
//             data: {
//               path: file.path,
//               size: file.size,
//               mimeType: file.mimetype,
//               name: file.originalname,
//               folderName: file.destination,
//             },
//           });
//         } else {
//           await tx.document.create({
//             data: {
//               type: 'ACHIEVEMENT',
//               name: file.originalname,
//               folderName: file.destination,
//               path: file.path,
//               size: file.size,
//               mimeType: file.mimetype,
//               userId,
//               candidateAchievementId: achievement.id,
//             },
//           });
//         }
//       }

//       result.push(achievement);
//     }

//     return result;
//   });
// };

const createCandidateAchievement = async (
  payload: TAchievementInput[],
  files: Express.Multer.File[],
  user: TUserPayload,
) => {
  const userId = user.id;

  if (!payload || payload.length === 0) {
    throw new AppError(400, 'Achievement payload is required');
  }

  return await prisma.$transaction(async (tx) => {
    const result = [];

    const incomingIds = payload
      .map((item) => item.achievementId)
      .filter(Boolean) as string[];

    // ✅ আগে achievement গুলো খুঁজে বের করো যেগুলো delete হবে
    const achievementsToDelete = await tx.candidateAchievement.findMany({
      where: {
        userId,
        ...(incomingIds.length > 0 ? { id: { notIn: incomingIds } } : {}),
      },
      select: { id: true },
    });

    const achievementIdsToDelete = achievementsToDelete.map((a) => a.id);

    if (achievementIdsToDelete.length > 0) {
      // ✅ সেই achievement-গুলোর document আগে delete করো
      await tx.document.deleteMany({
        where: {
          userId,
          candidateAchievementId: { in: achievementIdsToDelete },
        },
      });

      // ✅ তারপর achievement delete করো
      await tx.candidateAchievement.deleteMany({
        where: {
          id: { in: achievementIdsToDelete },
        },
      });
    }

    for (let i = 0; i < payload.length; i++) {
      const item = payload[i];
      const achievementId = item.achievementId;

      const achievement = await tx.candidateAchievement.upsert({
        where: {
          id: achievementId || '00000000-0000-0000-0000-000000000000',
        },
        update: {
          achievementType: item.achievementType,
          title: item.title,
          organizationName: item.organizationName,
          url: item.url,
          location: item.location,
          year: item.year,
          description: item.description,
        },
        create: {
          achievementType: item.achievementType,
          title: item.title,
          organizationName: item.organizationName,
          url: item.url,
          location: item.location,
          year: item.year,
          description: item.description,
          userId,
        },
      });

      const file = files?.[i];

      // ✅ empty blob (size === 0) ignore করো
      if (file && file.size > 0) {
        const existingDoc = await tx.document.findFirst({
          where: {
            candidateAchievementId: achievement.id,
            userId,
            isDeleted: false,
          },
        });

        if (existingDoc) {
          await tx.document.update({
            where: { id: existingDoc.id },
            data: {
              path: file.path,
              size: file.size,
              mimeType: file.mimetype,
              name: file.originalname,
              folderName: file.destination,
            },
          });
        } else {
          await tx.document.create({
            data: {
              type: 'ACHIEVEMENT',
              name: file.originalname,
              folderName: file.destination,
              path: file.path,
              size: file.size,
              mimeType: file.mimetype,
              userId,
              candidateAchievementId: achievement.id,
            },
          });
        }
      }

      result.push(achievement);
    }

    return result;
  });
};

const me = async (user: TUserPayload) => {
  const result = await prisma.user.findUnique({
    where: { email: user.email },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      candidatePersonal: {
        include: {
          religion: true,
          interests: true,
          bloodGroup: true,
          skills: true,
          socialLink: true,
        },
      },
      addresses: {
        include: {
          division: {
            select: {
              name: true,
            },
          },
          district: {
            select: {
              name: true,
            },
          },
          upazila: {
            select: {
              name: true,
            },
          },
          cityCorporation: {
            select: {
              name: true,
            },
          },
          unionParishad: {
            select: {
              name: true,
            },
          },
          municipality: {
            select: {
              name: true,
            },
          },
          policeStation: {
            select: {
              name: true,
            },
          },
          postOffice: {
            select: {
              postOffice: true,
              postCode: true,
            },
          },
        },
      },
      documents: {
        where: {
          type: {
            notIn: ['CERTIFICATE', 'ACHIEVEMENT'],
          },
          isDeleted: false,
        },
        select: {
          id: true,
          type: true,
          name: true,
          issueDate: true,
          folderName: true,
          path: true,
          size: true,
          remarks: true,
          documentNo: true,
          isDeleted: true,
          issueAuthority: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      candidateExperiences: true,
      candidateReferences: {
        select: {
          id: true,
          name: true,
          companyName: true,
          designation: true,
          phone: true,
          emailAddress: true,
          relationship: true,
        },
      },
      candidateAchievements: {
        include: {
          documents: {
            select: {
              id: true,
              type: true,
              name: true,
              folderName: true,
              path: true,
            },
            where: {
              isDeleted: false,
            },
          },
        },
      },
      candidateEducations: {
        select: {
          id: true,
          passingYear: true,
          subjectName: true,
          instituteName: true,
          totalMarksCGPA: true,
          board: {
            select: {
              id: true,
              boardName: true,
            },
          },

          degree: {
            select: {
              id: true,
              degreeName: true,
            },
          },
          level: {
            select: {
              id: true,
              levelName: true,
            },
          },
          majorGroup: {
            select: {
              id: true,
              groupName: true,
            },
          },
          resultType: {
            select: {
              id: true,
              resultType: true,
            },
          },
          subject: {
            select: {
              subjectName: true,
            },
          },

          documents: {
            where: {
              isDeleted: false,
            },
            select: {
              id: true,
              type: true,
              name: true,
              folderName: true,
              path: true,
              remarks: true,
              documentNo: true,
              isDeleted: true,
              issueAuthority: true,
            },
          },
        },
      },
    },
  });

  if (!result) throw new AppError(500, 'user not found');
  const profileProgress = await profileProgressCalculation(result?.id);

  // console.log(profileProgress)

  return { ...result, profileProgress };
};
//////////////////////////////// Profile Services //////////////////////////////////////////////////

//////////////////////////////////// dropdown //////////////////////////////////////////

const dropdown = async () => {
  const religion = await prisma.religion.findMany();
  const skills = await prisma.skill.findMany();
  const interests = await prisma.interst.findMany();
  const bloodGroup = await prisma.bloodGroup.findMany();

  return {
    religion,
    skills,
    interests,
    bloodGroup,
  };
};
const getAddressTypeDropdown = async () => {
  const addressType = await prisma.addressType.findMany();
  return addressType;
};
const getDivisionWithDistrictsAndUpazilas = async (payload: {
  divisionId: string;
  districtId: string;
  upazilaId: string;
}) => {
  try {
    const { districtId, divisionId, upazilaId } = payload;

    // console.log(payload);

    // 1️⃣ No params → return all divisions
    if (!divisionId && !districtId && !upazilaId) {
      const divisions = await prisma.baseDivision.findMany({
        select: { id: true, name: true },
      });
      return { level: 'division', data: divisions };
    }

    // 2️⃣ Division selected → return districts
    if (divisionId && !districtId && !upazilaId) {
      const districts = await prisma.baseDistrict.findMany({
        where: { divisionId: Number(divisionId) },
        select: { id: true, name: true, divisionId: true },
      });
      return { level: 'district', data: districts };
    }

    // 3️⃣ District selected → return upazilas + police stations + post offices + city corporations
    if (districtId && !upazilaId) {
      const upazilas = await prisma.baseUpazila.findMany({
        where: { districtId: Number(districtId) },
        select: { id: true, name: true, districtId: true, geoCode: true },
      });
      const policeStations = await prisma.basePoliceStation.findMany({
        where: { districtId: Number(districtId) },
        select: {
          id: true,
          name: true,
          bnName: true,
          districtId: true,
        },
      });
      const postOffices = await prisma.basePostOffice.findMany({
        where: { districtId: Number(districtId) },
        select: {
          id: true,
          postOffice: true,
          postCode: true,
          districtId: true,
        },
      });
      const cityCorporations = await prisma.baseCityCorporation.findMany({
        where: { districtId: Number(districtId) },
        select: { id: true, name: true, districtId: true },
      });
      return {
        level: 'upazila , police station, post office, city corporation',
        upazilas,
        policeStations,
        postOffices,
        cityCorporations,
      };
    }

    // 4️⃣ Upazila selected → return municipalities, unions, post offices
    if (upazilaId) {
      const municipalities = await prisma.baseMunicipality.findMany({
        where: { upazilaId: Number(upazilaId) },
        select: { id: true, name: true, upazilaId: true, geoCode: true },
      });
      const unionParishads = await prisma.baseUnionParishad.findMany({
        where: { upazilaId: Number(upazilaId) },
        select: { id: true, name: true, upazilaId: true, geoCode: true },
      });
      // const postOffices = await prisma.basePoliceStation.findMany({
      //   where: { upazilaId: Number(upazilaId) },
      //   select: { id: true, name: true },
      // });
      return {
        level: 'upazila-detail',
        municipalities,
        unionParishads,
        //  postOffices,
      };
    }

    return { message: 'Invalid query' };
  } catch (error) {
    console.error(error);
    return { message: 'Invalid query' };
  }
};
const getEducationDropdown = async (payload: {
  levelId?: string;
  degreeId?: string;
  candidateId?: string; // this is actually userId
}) => {
  try {
    const { levelId, degreeId, candidateId } = payload;

    // 1️⃣ No params → return all education levels
    if (!levelId && !degreeId && !candidateId) {
      const levels = await prisma.levelOfEducation.findMany({
        select: {
          id: true,
          levelName: true,
          orderBy: true,
        },
        orderBy: { orderBy: 'asc' },
      });

      return { type: 'level', data: levels };
    }

    // 2️⃣ Level selected → return degrees under that level
    if (levelId && !degreeId && !candidateId) {
      const degrees = await prisma.degree.findMany({
        where: { levelId },
        select: {
          id: true,
          degreeName: true,
          levelId: true,
        },
        // orderBy: { orderBy: 'asc' },
      });

      return { type: 'degree', data: degrees };
    }

    // 3️⃣ Degree selected → return related dropdown data (board, group, resultType)
    if (degreeId && !candidateId) {
      const boards = await prisma.educationBoard.findMany({
        select: { id: true, boardName: true },
        orderBy: { boardName: 'asc' },
      });

      const majorGroups = await prisma.majorGroup.findMany({
        select: { id: true, groupName: true, orderBy: true },
        orderBy: { orderBy: 'asc' },
      });

      const resultTypes = await prisma.resultType.findMany({
        select: { id: true, resultType: true, orderBy: true },
        orderBy: { orderBy: 'asc' },
      });

      const subjects = await prisma.subject.findMany({
        where: { status: true },
        select: { id: true, subjectName: true },
        orderBy: { subjectName: 'asc' },
      });

      return {
        type: 'education-meta',
        data: {
          boards,
          majorGroups,
          resultTypes,
          subjects,
        },
      };
    }

    // 4️⃣ Candidate selected → return full candidate education details
    if (candidateId) {
      const candidateEducation = await prisma.candidateEducation.findMany({
        where: { userId: candidateId }, // ✅ corrected
        select: {
          id: true,
          instituteName: true,
          passingYear: true,
          totalMarksCGPA: true,
          level: {
            select: { id: true, levelName: true },
          },
          degree: {
            select: { id: true, degreeName: true },
          },
          board: {
            select: { id: true, boardName: true },
          },
          majorGroup: {
            select: { id: true, groupName: true },
          },
          resultType: {
            select: { id: true, resultType: true },
          },
          subject: {
            select: { id: true, subjectName: true },
          },
          documents: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      return {
        type: 'candidate-education-detail',
        data: candidateEducation,
      };
    }

    return { message: 'Invalid query parameters' };
  } catch (error) {
    console.error(error);
    return { message: 'Error fetching education dropdown data' };
  }
};

export const UserService = {
  createCandidatePersonalService,
  createCandidateExperienceService,
  me,
  getDivisionWithDistrictsAndUpazilas,
  getAddressTypeDropdown,
  dropdown,
  createCandidateEducationService,
  createCandidateReference,
  createCandidateAddress,
  createCandidateAchievement,
  getEducationDropdown,
};
