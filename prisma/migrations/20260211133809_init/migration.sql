/*
  Warnings:

  - You are about to drop the column `responsibilities` on the `candidate_experiences` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,company_name,designation,department,company_business_type]` on the table `candidate_experiences` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "candidate_experiences_user_id_company_name_designation_key";

-- AlterTable
ALTER TABLE "candidate_experiences" DROP COLUMN "responsibilities";

-- CreateIndex
CREATE UNIQUE INDEX "candidate_experiences_user_id_company_name_designation_depa_key" ON "candidate_experiences"("user_id", "company_name", "designation", "department", "company_business_type");
