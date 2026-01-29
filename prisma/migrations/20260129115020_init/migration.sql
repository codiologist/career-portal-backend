/*
  Warnings:

  - You are about to drop the column `interstName` on the `intersts` table. All the data in the column will be lost.
  - Added the required column `interst_name` to the `intersts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "intersts" DROP COLUMN "interstName",
ADD COLUMN     "interst_name" TEXT NOT NULL;
