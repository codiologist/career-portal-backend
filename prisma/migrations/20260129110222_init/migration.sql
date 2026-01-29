/*
  Warnings:

  - You are about to drop the `social_link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "social_link" DROP CONSTRAINT "social_link_candidate_personal_id_fkey";

-- DropTable
DROP TABLE "social_link";

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "candidate_personal_id" TEXT NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_candidate_personal_id_fkey" FOREIGN KEY ("candidate_personal_id") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
