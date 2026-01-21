/*
  Warnings:

  - You are about to drop the column `avater` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `protfolioLint` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `totalExprience` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `jobRole` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExperience` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobRole" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "avater",
DROP COLUMN "protfolioLint",
DROP COLUMN "totalExprience",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "portfolioLink" TEXT,
ADD COLUMN     "totalExperience" TEXT NOT NULL,
ALTER COLUMN "resumeUpload" DROP NOT NULL;
