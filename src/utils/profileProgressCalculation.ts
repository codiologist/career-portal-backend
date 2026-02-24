import { prisma } from "../config/prisma";
import { AppError } from "./AppError";

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

    if (!user) throw new AppError(500, "User not found");

    // Initialize breakdown
    const breakdown = {
        candidatePersonal: 0,
        candidateEducations: 0,
        candidateExperiences: 0,
        candidateAchievements: 0,
        addresses: 0,
        resume: 0,
        avatar: 0,
        signature: 0,
    };

    // Calculate each part
    if (user.candidatePersonal) breakdown.candidatePersonal = 15;
    if (user.candidateEducations.length > 0) breakdown.candidateEducations = 15;
    if (user.candidateExperiences.length > 0) breakdown.candidateExperiences = 20;
    if (user.candidateAchievements.length > 0) breakdown.candidateAchievements = 10;
    if (user.addresses) breakdown.addresses = 10;

    if (user.documents.filter(d => d.type === "RESUME").length > 0) breakdown.resume = 5;
    if (user.documents.filter(d => d.type === "AVATAR").length > 0) breakdown.avatar = 5;
    if (user.documents.filter(d => d.type === "SIGNATURE").length > 0) breakdown.signature = 5;

    // Total score
    const totalScore = Object.values(breakdown).reduce((acc, val) => acc + val, 0);

    // Save in DB
    await prisma.profileProgress.upsert({
        where: { userId }, // check by userId, not id
        update: { completionScore: totalScore },
        create: { userId, completionScore: totalScore },
    });
    return {
        totalScore,
        breakdown,
    };
};