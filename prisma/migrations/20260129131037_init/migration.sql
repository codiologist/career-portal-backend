/*
  Warnings:

  - Added the required column `gender` to the `candidate_personals` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `marital_status` on the `candidate_personals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "candidate_personals" DROP COLUMN "gender",
ADD COLUMN     "gender" TEXT NOT NULL,
DROP COLUMN "marital_status",
ADD COLUMN     "marital_status" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "MaritalStatus";
