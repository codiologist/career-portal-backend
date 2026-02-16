/*
  Warnings:

  - You are about to drop the column `city_corporation` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "city_corporation",
DROP COLUMN "zip_code",
ADD COLUMN     "city_corporation_id" TEXT;
