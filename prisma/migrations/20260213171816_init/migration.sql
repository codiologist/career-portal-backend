/*
  Warnings:

  - You are about to drop the column `userId` on the `base_police_stations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "base_police_stations" DROP CONSTRAINT "base_police_stations_userId_fkey";

-- AlterTable
ALTER TABLE "base_police_stations" DROP COLUMN "userId";
