-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "candidate_achievement_id" TEXT;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_achievement_id_fkey" FOREIGN KEY ("candidate_achievement_id") REFERENCES "candidate_achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
