/*
  Warnings:

  - You are about to drop the column `passing_year` on the `candidate_educations` table. All the data in the column will be lost.
  - You are about to drop the column `result_type` on the `candidate_educations` table. All the data in the column will be lost.
  - You are about to drop the column `study_year` on the `candidate_educations` table. All the data in the column will be lost.
  - You are about to drop the column `total_cgpa` on the `candidate_educations` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `candidate_references` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subject_name]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `level_id` to the `candidate_educations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subjects" DROP CONSTRAINT "subjects_user_id_fkey";

-- DropIndex
DROP INDEX "subjects_user_id_key";

-- AlterTable
ALTER TABLE "candidate_educations" DROP COLUMN "passing_year",
DROP COLUMN "result_type",
DROP COLUMN "study_year",
DROP COLUMN "total_cgpa",
ADD COLUMN     "board_id" TEXT,
ADD COLUMN     "degree_id" TEXT,
ADD COLUMN     "institution" TEXT,
ADD COLUMN     "level_id" TEXT NOT NULL,
ADD COLUMN     "major_group_id" TEXT,
ADD COLUMN     "passingYear" INTEGER,
ADD COLUMN     "result_type_id" TEXT,
ADD COLUMN     "subject_id" TEXT;

-- AlterTable
ALTER TABLE "candidate_references" DROP COLUMN "companyName",
ADD COLUMN     "company_name" TEXT;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "level_of_educations" (
    "id" TEXT NOT NULL,
    "level_name" TEXT NOT NULL,

    CONSTRAINT "level_of_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degrees" (
    "id" TEXT NOT NULL,
    "degree_name" TEXT NOT NULL,
    "level_id" TEXT NOT NULL,

    CONSTRAINT "degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_boards" (
    "id" TEXT NOT NULL,
    "board_name" TEXT NOT NULL,

    CONSTRAINT "education_boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "major_groups" (
    "id" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "major_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_types" (
    "id" TEXT NOT NULL,
    "result_type" TEXT NOT NULL,

    CONSTRAINT "result_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "level_of_educations_level_name_key" ON "level_of_educations"("level_name");

-- CreateIndex
CREATE UNIQUE INDEX "education_boards_board_name_key" ON "education_boards"("board_name");

-- CreateIndex
CREATE UNIQUE INDEX "major_groups_group_name_key" ON "major_groups"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "result_types_result_type_key" ON "result_types"("result_type");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_subject_name_key" ON "subjects"("subject_name");

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level_of_educations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_degree_id_fkey" FOREIGN KEY ("degree_id") REFERENCES "degrees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "education_boards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_result_type_id_fkey" FOREIGN KEY ("result_type_id") REFERENCES "result_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_major_group_id_fkey" FOREIGN KEY ("major_group_id") REFERENCES "major_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degrees" ADD CONSTRAINT "degrees_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level_of_educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
