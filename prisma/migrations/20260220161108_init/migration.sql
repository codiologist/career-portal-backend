/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `blood_groups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interst_name]` on the table `intersts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `religions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skill_name]` on the table `skills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `social_links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "blood_groups_name_key" ON "blood_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "intersts_interst_name_key" ON "intersts"("interst_name");

-- CreateIndex
CREATE UNIQUE INDEX "religions_name_key" ON "religions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "skills_skill_name_key" ON "skills"("skill_name");

-- CreateIndex
CREATE UNIQUE INDEX "social_links_label_key" ON "social_links"("label");
