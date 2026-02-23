/*
  Warnings:

  - A unique constraint covering the columns `[candidate_achievement_id]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "documents_candidate_achievement_id_key" ON "documents"("candidate_achievement_id");
