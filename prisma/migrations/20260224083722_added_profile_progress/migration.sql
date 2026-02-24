-- CreateTable
CREATE TABLE "profile_progress" (
    "id" TEXT NOT NULL,
    "completion_score" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "profile_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_progress_userId_key" ON "profile_progress"("userId");

-- AddForeignKey
ALTER TABLE "profile_progress" ADD CONSTRAINT "profile_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
