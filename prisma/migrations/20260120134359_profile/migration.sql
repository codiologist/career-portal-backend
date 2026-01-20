/*
  Warnings:

  - You are about to drop the `Exprience` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `protfolioLint` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUpload` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'REMOTE', 'HYBIRD');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MODERATOR';

-- DropForeignKey
ALTER TABLE "Exprience" DROP CONSTRAINT "Exprience_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "protfolioLint" TEXT NOT NULL,
ADD COLUMN     "resumeUpload" TEXT NOT NULL,
ADD COLUMN     "skill" TEXT[],
ADD COLUMN     "socialLink" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "fullName" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- DropTable
DROP TABLE "Exprience";

-- CreateTable
CREATE TABLE "WorkExprience" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "companyTitle" TEXT NOT NULL,
    "companyLocation" TEXT NOT NULL,
    "jobRole" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "WorkExprience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "academy" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "jobUniqueId" TEXT NOT NULL,
    "responsibilities" TEXT[],
    "features" TEXT[],
    "requirments" TEXT[],
    "requirSkills" TEXT[],
    "jobType" "JobType" NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "expDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobCategoryId" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobAlart" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "JobAlart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkExprience_profileId_key" ON "WorkExprience"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_profileId_key" ON "Education"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobUniqueId_key" ON "Job"("jobUniqueId");

-- CreateIndex
CREATE UNIQUE INDEX "JobCategory_jobId_key" ON "JobCategory"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "JobAlart_email_key" ON "JobAlart"("email");

-- AddForeignKey
ALTER TABLE "WorkExprience" ADD CONSTRAINT "WorkExprience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
