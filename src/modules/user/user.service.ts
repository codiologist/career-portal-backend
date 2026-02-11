/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../config/prisma';
import { TUserPayload } from '../../types/user';
import { TCanditateProfile, TReferance, TWorkExperiece } from './user.validation';

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
  user: TUserPayload
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
        responsibilities: exp.responsibilities ?? "",
      })),
    });

    // 3️⃣ Return updated list
    return tx.candidateExperience.findMany({
      where: { userId },
      orderBy: { startDate: "desc" },
    });
  });

  return result;
};

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
      documents: true,
      candidateExperiences: true,
    },
  });
  return result;
};

//////////////////////////////// Profile Services //////////////////////////////////////////////////

// const getDivisionWithDistrictsAndUpazilas = async (payload: {
//   divisionId: string;
//   districtId: string;
//   upazilaId: string;
// }) => {
//   try {
//     const { districtId, divisionId, upazilaId } = payload;

//     console.log(payload);

//     // 1️⃣ No params → return all divisions
//     if (!divisionId && !districtId && !upazilaId) {
//       const divisions = await prisma.division.findMany({
//         select: { id: true, name: true },
//       });
//       return { level: 'division', data: divisions };
//     }

//     // 2️⃣ Division selected → return districts
//     if (divisionId && !districtId && !upazilaId) {
//       const districts = await prisma.district.findMany({
//         where: { divisionId: divisionId as string },
//         select: { id: true, name: true },
//       });
//       return { level: 'district', data: districts };
//     }

//     // 3️⃣ District selected → return upazilas + police stations
//     if (districtId && !upazilaId) {
//       const upazilas = await prisma.upazila.findMany({
//         where: { districtId: districtId as string },
//         select: { id: true, name: true },
//       });
//       const policeStations = await prisma.policeStation.findMany({
//         where: { districtId: districtId as string },
//         select: { id: true, bnName: true },
//       });
//       return { level: 'upazila', upazilas, policeStations };
//     }

//     // 4️⃣ Upazila selected → return municipalities, unions, post offices
//     if (upazilaId) {
//       const municipalities = await prisma.municipality.findMany({
//         where: { upazilaId: upazilaId as string },
//         select: { id: true, name: true },
//       });
//       const unionParishads = await prisma.unionParishad.findMany({
//         where: { upazilaId: upazilaId as string },
//         select: { id: true, name: true },
//       });
//       const postOffices = await prisma.postOffice.findMany({
//         where: { upazilaId: upazilaId as string },
//         select: { id: true, postOffice: true, postCode: true },
//       });
//       return {
//         level: 'upazila-detail',
//         municipalities,
//         unionParishads,
//         postOffices,
//       };
//     }

//     return { message: 'Invalid query' };
//   } catch (error) {
//     console.error(error);
//     return { message: 'Invalid query' };
//   }
// };


const createCandidateEducationService = async (
  payload: any,
  user: TUserPayload,
) => {
  const result = await prisma.candidateEducation.create({
    data: {
      userId: user.id,
      // institutionName: payload.institutionName,
      // degree: payload.degree,
      // fieldOfStudy: payload.fieldOfStudy,
      // startDate: payload.startDate,
      // endDate: payload.endDate,
    },
  });

  return result;
};


const createCandidateReference = async (payload: TReferance[],  user: TUserPayload) => {
  const userId = user.id;

  const result = await prisma.$transaction(async (tx) => {
    // 1️⃣ Delete old references
    await tx.candidateReference.deleteMany({
      where: { userId },
    });

    // 2️⃣ Insert new references
    const created = await tx.candidateReference.createMany({
      data: payload.map((ref) => ({
        name: ref.name,
        designation: ref.designation,
        phone: ref.phone,
        emailAddress: ref.emailAddress,
        relationship: ref.relationship,
        userId,
      })),
    });

    return created;
  });

  return result;
};




export const UserService = {
  createCandidatePersonalService,
  createCandidateExperienceService,
  me,
  // getDivisionWithDistrictsAndUpazilas,
  dropdown,
  createCandidateEducationService,
  createCandidateReference,
};
