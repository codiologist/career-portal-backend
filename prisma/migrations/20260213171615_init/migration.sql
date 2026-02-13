/*
  Warnings:

  - You are about to drop the column `user_id` on the `base_police_stations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "base_police_stations" DROP CONSTRAINT "base_police_stations_user_id_fkey";

-- DropIndex
DROP INDEX "police_stations_user_id_foreign";

-- AlterTable
ALTER TABLE "base_police_stations" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "base_police_stations" ADD CONSTRAINT "base_police_stations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
