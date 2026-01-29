/*
  Warnings:

  - You are about to drop the `blood_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "candidate_personals" DROP CONSTRAINT "candidate_personals_bloodGroupId_fkey";

-- DropTable
DROP TABLE "blood_group";

-- CreateTable
CREATE TABLE "blood_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blood_groups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "candidate_personals" ADD CONSTRAINT "candidate_personals_bloodGroupId_fkey" FOREIGN KEY ("bloodGroupId") REFERENCES "blood_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
