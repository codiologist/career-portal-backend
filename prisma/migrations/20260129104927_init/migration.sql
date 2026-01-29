-- AlterTable
ALTER TABLE "candidate_personals" ADD COLUMN     "bloodGroupId" TEXT;

-- CreateTable
CREATE TABLE "social_link" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "candidate_personal_id" TEXT NOT NULL,

    CONSTRAINT "social_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intersts" (
    "id" TEXT NOT NULL,
    "interstName" TEXT NOT NULL,

    CONSTRAINT "intersts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blood_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidateInterests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CandidateInterests_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CandidateSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CandidateSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CandidateInterests_B_index" ON "_CandidateInterests"("B");

-- CreateIndex
CREATE INDEX "_CandidateSkills_B_index" ON "_CandidateSkills"("B");

-- AddForeignKey
ALTER TABLE "candidate_personals" ADD CONSTRAINT "candidate_personals_bloodGroupId_fkey" FOREIGN KEY ("bloodGroupId") REFERENCES "blood_group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_link" ADD CONSTRAINT "social_link_candidate_personal_id_fkey" FOREIGN KEY ("candidate_personal_id") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateInterests" ADD CONSTRAINT "_CandidateInterests_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateInterests" ADD CONSTRAINT "_CandidateInterests_B_fkey" FOREIGN KEY ("B") REFERENCES "intersts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateSkills" ADD CONSTRAINT "_CandidateSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateSkills" ADD CONSTRAINT "_CandidateSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
