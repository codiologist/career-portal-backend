/*
  Warnings:

  - Added the required column `responsibilities` to the `candidate_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "candidate_experiences" ADD COLUMN     "responsibilities" TEXT NOT NULL;
