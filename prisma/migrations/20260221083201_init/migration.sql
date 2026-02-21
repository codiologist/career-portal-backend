/*
  Warnings:

  - The `achievement_type` column on the `candidate_achievements` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "achievementTypeEnum" AS ENUM ('PROFESSIONAL_CERTIFICATION', 'TRAINING', 'WORKSHOP');

-- AlterTable
ALTER TABLE "candidate_achievements" DROP COLUMN "achievement_type",
ADD COLUMN     "achievement_type" "achievementTypeEnum";
