/*
  Warnings:

  - You are about to drop the column `label` on the `skills` table. All the data in the column will be lost.
  - Added the required column `skill_name` to the `skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "label",
ADD COLUMN     "skill_name" TEXT NOT NULL;
