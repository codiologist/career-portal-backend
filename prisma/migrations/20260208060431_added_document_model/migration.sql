-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('AVATAR', 'RESUME', 'SIGNATURE', 'CERTIFICATE', 'OTHER');

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "name" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidate_experience_id" TEXT,
    "candidate_education_id" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "documents_user_id_idx" ON "documents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "documents_user_id_type_name_key" ON "documents"("user_id", "type", "name");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_experience_id_fkey" FOREIGN KEY ("candidate_experience_id") REFERENCES "candidate_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_education_id_fkey" FOREIGN KEY ("candidate_education_id") REFERENCES "candidate_educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
