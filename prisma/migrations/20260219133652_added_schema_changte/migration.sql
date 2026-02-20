/*
  Warnings:

  - You are about to drop the column `type` on the `candidate_achievements` table. All the data in the column will be lost.
  - Added the required column `name` to the `candidate_achievements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_achievements" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "AchievementType";
