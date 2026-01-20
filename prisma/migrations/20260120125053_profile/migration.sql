/*
  Warnings:

  - The required column `id` was added to the `Profile` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `isVerified` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalStatus` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalExprience` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL,
ADD COLUMN     "maritalStatus" BOOLEAN NOT NULL,
ADD COLUMN     "totalExprience" TEXT NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Exprience" (
    "jobTitle" TEXT NOT NULL,
    "profileId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Exprience_profileId_key" ON "Exprience"("profileId");

-- AddForeignKey
ALTER TABLE "Exprience" ADD CONSTRAINT "Exprience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
