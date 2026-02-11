-- CreateTable
CREATE TABLE "Candidate_refrances" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_refrances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Candidate_refrances" ADD CONSTRAINT "Candidate_refrances_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
