/*
  Warnings:

  - You are about to drop the column `company_business` on the `candidate_experiences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidate_experiences" DROP COLUMN "company_business",
ADD COLUMN     "company_business_type" TEXT,
ADD COLUMN     "is_continue" BOOLEAN DEFAULT false;
