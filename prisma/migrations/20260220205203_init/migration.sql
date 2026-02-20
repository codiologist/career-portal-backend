/*
  Warnings:

  - You are about to drop the column `createdAt` on the `candidate_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `candidate_achievements` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `candidate_achievements` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `candidate_achievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_achievements" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
