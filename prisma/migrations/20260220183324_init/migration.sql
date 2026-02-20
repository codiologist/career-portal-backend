/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name,type]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "documents_user_id_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "documents_user_id_name_type_key" ON "documents"("user_id", "name", "type");
