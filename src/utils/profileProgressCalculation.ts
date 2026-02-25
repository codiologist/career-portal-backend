import { prisma } from '../config/prisma';
import { AppError } from './AppError';

export const profileProgressCalculation = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      candidatePersonal: { select: { id: true } },
      candidateEducations: { select: { id: true } },
      candidateExperiences: { select: { id: true } },
      candidateAchievements: { select: { id: true } },
      candidateReferences: { select: { id: true } },
      addresses: { select: { id: true } },
      documents: { select: { id: true, type: true } },
    },
  });

  if (!user) throw new AppError(404, 'User not found');

  // -------------------------
  // Breakdown Calculation
  // -------------------------
  const breakdown = {
    candidatePersonal: 0,
    candidateEducations: 0,
    candidateExperiences: 0,
    candidateAchievements: 0,
    candidateReferences: 0,
    addresses: 0,
    resume: 0,
    avatar: 0,
    signature: 0,
  };

  if (user.candidatePersonal) breakdown.candidatePersonal = 20;
  if (user.candidateEducations.length > 0) breakdown.candidateEducations = 10;
  if (user.candidateExperiences.length > 0) breakdown.candidateExperiences = 10;
  if (user.candidateAchievements.length > 0)
    breakdown.candidateAchievements = 10;
  if (user.candidateReferences.length > 0) breakdown.candidateReferences = 10;
  if (user.addresses) breakdown.addresses = 10;

  const hasResume = user.documents.some((d) => d.type === 'RESUME');
  const hasAvatar = user.documents.some((d) => d.type === 'AVATAR');
  const hasSignature = user.documents.some((d) => d.type === 'SIGNATURE');

  if (hasResume) breakdown.resume = 10;
  if (hasAvatar) breakdown.avatar = 10;
  if (hasSignature) breakdown.signature = 10;

  const totalScore = Object.values(breakdown).reduce(
    (acc, val) => acc + val,
    0,
  );

  // -------------------------
  // Missing Fields Check
  // -------------------------
  const missingFields: string[] = [];

  if (!user.candidatePersonal) missingFields.push('Personal Information');

  if (!user.addresses) missingFields.push('Address');

  if (user.candidateEducations.length === 0) missingFields.push('Education');

  if (user.candidateExperiences.length === 0) missingFields.push('Experience');

  if (user.candidateReferences.length === 0) missingFields.push('Reference');

  if (!hasResume) missingFields.push('Resume');

  if (!hasAvatar) missingFields.push('Avatar');

  if (!hasSignature) missingFields.push('Signature');

  const isPossibleJobApply = missingFields.length === 0;

  // -------------------------
  // Save in DB
  // -------------------------
  await prisma.profileProgress.upsert({
    where: { userId },
    update: {
      completionScore: totalScore,
      isPossibleJobApply,
    },
    create: {
      userId,
      completionScore: totalScore,
      isPossibleJobApply,
    },
  });

  return {
    totalScore,
    breakdown,
    eligibleForApply: {
      isPossibleJobApply,
      missingFields,
    },
  };
};
