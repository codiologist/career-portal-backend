/*
  Warnings:

  - Added the required column `marital_status` to the `candidate_personals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('married', 'unmarried');

-- AlterTable
ALTER TABLE "candidate_personals" ADD COLUMN     "gender" "Gender",
ADD COLUMN     "marital_status" "MaritalStatus" NOT NULL;
