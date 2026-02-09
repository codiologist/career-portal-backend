/*
  Warnings:

  - You are about to drop the `districts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `divisions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `municipalities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `police_stations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `post_offices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `union_parishads` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `upazilas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "districts" DROP CONSTRAINT "districts_division_id_fkey";

-- DropForeignKey
ALTER TABLE "municipalities" DROP CONSTRAINT "municipalities_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "police_stations" DROP CONSTRAINT "police_stations_district_id_fkey";

-- DropForeignKey
ALTER TABLE "post_offices" DROP CONSTRAINT "post_offices_district_id_fkey";

-- DropForeignKey
ALTER TABLE "post_offices" DROP CONSTRAINT "post_offices_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "union_parishads" DROP CONSTRAINT "union_parishads_upazila_id_fkey";

-- DropForeignKey
ALTER TABLE "upazilas" DROP CONSTRAINT "upazilas_district_id_fkey";

-- DropTable
DROP TABLE "districts";

-- DropTable
DROP TABLE "divisions";

-- DropTable
DROP TABLE "municipalities";

-- DropTable
DROP TABLE "police_stations";

-- DropTable
DROP TABLE "post_offices";

-- DropTable
DROP TABLE "union_parishads";

-- DropTable
DROP TABLE "upazilas";

-- CreateTable
CREATE TABLE "base_divisions" (
    "id" SERIAL NOT NULL,
    "geo_code" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_districts" (
    "id" SERIAL NOT NULL,
    "geo_code" INTEGER NOT NULL,
    "division_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(50),
    "lon" VARCHAR(50),
    "url" VARCHAR(300) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_upazila" (
    "id" SERIAL NOT NULL,
    "geo_code" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_upazila_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_police_stations" (
    "id" BIGSERIAL NOT NULL,
    "geo_code" SMALLINT,
    "district_id" INTEGER NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "bn_name" VARCHAR(75),
    "url" VARCHAR(50),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "base_police_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_union_parishads" (
    "id" SERIAL NOT NULL,
    "geo_code" INTEGER,
    "bbs_code" INTEGER,
    "upazila_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_union_parishads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_post_offices" (
    "id" SERIAL NOT NULL,
    "district_id" INTEGER NOT NULL,
    "upazila_id" INTEGER,
    "post_office" VARCHAR(50) NOT NULL,
    "post_code" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_post_offices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_municipalities" (
    "id" SERIAL NOT NULL,
    "upazila_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "base_districts_division_id_idx" ON "base_districts"("division_id");

-- CreateIndex
CREATE INDEX "base_upazila_district_id_idx" ON "base_upazila"("district_id");

-- CreateIndex
CREATE INDEX "police_stations_name_index" ON "base_police_stations"("name");

-- CreateIndex
CREATE INDEX "police_stations_user_id_foreign" ON "base_police_stations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "base_police_stations_district_id_name_key" ON "base_police_stations"("district_id", "name");

-- CreateIndex
CREATE INDEX "base_union_parishads_upazila_id_idx" ON "base_union_parishads"("upazila_id");

-- CreateIndex
CREATE INDEX "base_post_offices_district_id_idx" ON "base_post_offices"("district_id");

-- CreateIndex
CREATE INDEX "base_post_offices_upazila_id_idx" ON "base_post_offices"("upazila_id");

-- CreateIndex
CREATE INDEX "base_municipalities_upazila_id_idx" ON "base_municipalities"("upazila_id");

-- AddForeignKey
ALTER TABLE "base_districts" ADD CONSTRAINT "base_districts_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "base_divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_upazila" ADD CONSTRAINT "base_upazila_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_police_stations" ADD CONSTRAINT "base_police_stations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_police_stations" ADD CONSTRAINT "base_police_stations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_union_parishads" ADD CONSTRAINT "base_union_parishads_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazila"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_post_offices" ADD CONSTRAINT "base_post_offices_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_post_offices" ADD CONSTRAINT "base_post_offices_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazila"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_municipalities" ADD CONSTRAINT "base_municipalities_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazila"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
