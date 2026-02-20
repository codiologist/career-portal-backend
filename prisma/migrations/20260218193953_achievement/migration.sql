/*
  Warnings:

  - The values [WORKSHOP,SEMINAR,AWARD,HONOR,COMPETITION,PUBLICATION,PROJECT,OTHER] on the enum `AchievementType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AchievementType_new" AS ENUM ('PROFESSIONAL_CERTIFICATION', 'TRAINING');
ALTER TABLE "candidate_achievements" ALTER COLUMN "type" TYPE "AchievementType_new" USING ("type"::text::"AchievementType_new");
ALTER TYPE "AchievementType" RENAME TO "AchievementType_old";
ALTER TYPE "AchievementType_new" RENAME TO "AchievementType";
DROP TYPE "AchievementType_old";
COMMIT;
