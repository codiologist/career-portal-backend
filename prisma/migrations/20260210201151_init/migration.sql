/*
  Warnings:

  - Made the column `department` on table `candidate_experiences` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "candidate_experiences" ALTER COLUMN "department" SET NOT NULL;
