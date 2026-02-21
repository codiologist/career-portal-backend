/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../config/prisma';
import { TUserPayload } from '../../types/user';
import { AppError } from '../../utils/AppError';
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

  return result;
};

const createCandidateEducationService = async (
  payload: TMultipleEducationInput[],
  files: Express.Multer.File[],
  user: TUserPayload,
) => {
  const userId = user.id;

  if (!payload || payload.length === 0) {
    throw new AppError(400, 'Education payload is required');
  }

  // 🔥 Create file map using tempId
  const fileMap = new Map<string, Express.Multer.File>();

  if (files && files.length > 0) {
    files.forEach((file) => {
      const tempId = file.fieldname.split('_')[1];
      fileMap.set(tempId, file);
    });
  }

  const result = await prisma.$transaction(async (tx) => {
    // 🔥 1. Get existing educations
    const existingEducations = await tx.candidateEducation.findMany({
      where: { userId },
      select: { id: true },
    });

    const existingIds = existingEducations.map((item) => item.id);

    const incomingIds = payload
      .filter((item) => item.id)
      .map((item) => item.id);

    // 🔥 2. Delete removed educations
    const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));

    if (idsToDelete.length > 0) {
      // delete related documents first
      await tx.document.deleteMany({
        where: {
          candidateEducationId: { in: idsToDelete },
        },
      });

      // then delete education
      await tx.candidateEducation.deleteMany({
        where: {
          id: { in: idsToDelete },
        },
      });
    }

    const finalEducations = [];

    // 🔥 3. Create or Update
    for (const item of payload) {
      let education;
      const educationData = {
        userId,
        levelId: item.levelId,
        degreeId: item.degreeId,
        boardId: item.boardId,
        subjectId: item.subjectId,
        resultTypeId: item.resultTypeId,
        majorGroupId: item.majorGroupId,
        institution: item.institution,
        passingYear: item.passingYear
          ? parseInt(String(item.passingYear))
          : null,
        result: item.result,
      };

      if (item.id) {
        // ✅ Update
        education = await tx.candidateEducation.update({
          where: { id: item.id },
          data: educationData,
        });
      } else {
        // ✅ Create
        education = await tx.candidateEducation.create({
          data: educationData,
        });
      }

      finalEducations.push(education);

      console.log(fileMap);

      // 🔥 4. Handle File (Replace old certificate)
      const file = fileMap.get(item.tempId!);

      if (file) {
        // delete old certificate
        await tx.document.deleteMany({
          where: {
            candidateEducationId: education.id,
          },
        });

        await tx.document.create({
          data: {
            userId,
            type: 'CERTIFICATE',
            folderName: file.fieldname,
            path: file.path,
            size: file.size,
            mimeType: file.mimetype,
            candidateEducationId: education.id,
          },
        });
      }
    }

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

  return result;
};

const createCandidateAchievement = async (
  payload: TAchievementInput[],
  files: Express.Multer.File[],
  user: TUserPayload,
) => {
  const userId = user.id;

  if (!payload || payload.length === 0) {
    throw new AppError(400, 'Achievement payload is required');
  }

  // 🔥 Create file map by tempId
  const fileMap = new Map<string, Express.Multer.File>();

  if (files && files.length > 0) {
    files.forEach((file) => {
      const tempId = file.fieldname.split('_')[1];
      console.log(tempId);
      fileMap.set(tempId, file);
    });
  }

  const result = await prisma.$transaction(async (tx) => {
    // 🔥 1. Get existing achievements
    const existingAchievements = await tx.candidateAchievement.findMany({
      where: { userId },
      select: { id: true },
    });

    const existingIds = existingAchievements.map((item) => item.id);

    const incomingIds = payload
      .filter((item) => item.id)
      .map((item) => item.id);

    // 🔥 2. Delete removed achievements
    const idsToDelete = existingIds.filter((id) => !incomingIds.includes(id));

    if (idsToDelete.length > 0) {
      await tx.document.deleteMany({
        where: {
          candidateAchievementId: { in: idsToDelete },
        },
      });

      await tx.candidateAchievement.deleteMany({
        where: { id: { in: idsToDelete } },
      });
    }

    const finalAchievements = [];

    // 🔥 3. Create or Update
    for (const item of payload) {
      let achievement;

      if (item.id) {
        // ✅ Update
        achievement = await tx.candidateAchievement.update({
          where: { id: item.id },
          data: {
            achievementType: item.achievementType,
            title: item.title,
            description: item.description,
            organizationName: item.organizationName,
            url: item.url,
            location: item.location,
            year: item.year,
          },
        });
      } else {
        // ✅ Create
        achievement = await tx.candidateAchievement.create({
          data: {
            userId,
            achievementType: item.achievementType,
            title: item.title,
            description: item.description,
            organizationName: item.organizationName,
            url: item.url,
            location: item.location,
            year: item.year,
          },
        });
      }

      finalAchievements.push(achievement);

      // 🔥 4. Handle File
      const file = fileMap.get(item.tempId!);
      console.log('file map', fileMap);

      if (file) {
        // Delete old document (replace file)
        await tx.document.deleteMany({
          where: {
            candidateAchievementId: achievement.id,
          },
        });

        await tx.document.create({
          data: {
            userId,
            type: 'ACHIEVEMENT',
            name: item.title,
            folderName: file.fieldname,
            path: file.path,
            size: file.size,
            mimeType: file.mimetype,
            candidateAchievementId: achievement.id,
          },
        });
      }
    }

    return finalAchievements;
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
          folderName: true,
          path: true,
          remarks: true,
          documentNo: true,
          isDeleted: true,
          issueAuthority: true,
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
          institution: true,
          result: true,
          board: {
            select: {
              boardName: true,
            },
          },

          degree: {
            select: {
              degreeName: true,
            },
          },
          level: {
            select: {
              levelName: true,
            },
          },
          majorGroup: {
            select: {
              groupName: true,
            },
          },
          resultType: {
            select: {
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

  // const address = await prisma.address.findMany({
  //   where: { userId: result?.id },
  //   include: {
  //     district: true
  //   }
  // });

  return result;
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

    console.log(payload);

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
        },
        orderBy: { levelName: 'asc' },
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
        orderBy: { degreeName: 'asc' },
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
        select: { id: true, groupName: true },
        orderBy: { groupName: 'asc' },
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
          institution: true,
          passingYear: true,
          result: true,
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
