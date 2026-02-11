/*
  Warnings:

  - You are about to drop the column `company_name` on the `candidate_references` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `candidate_references` table. All the data in the column will be lost.
  - Added the required column `email_address` to the `candidate_references` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationship` to the `candidate_references` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_references" DROP COLUMN "company_name",
DROP COLUMN "email",
ADD COLUMN     "email_address" TEXT NOT NULL,
ADD COLUMN     "relationship" TEXT NOT NULL;
