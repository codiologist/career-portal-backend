-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HR', 'USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "AddressTypeEnum" AS ENUM ('PRESENT', 'PERMANENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "full_name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_personals" (
    "id" TEXT NOT NULL,
    "career_title" TEXT,
    "career_objective" TEXT,
    "dob" TIMESTAMP(3),
    "full_name" TEXT NOT NULL,
    "father_name" TEXT,
    "mother_name" TEXT,
    "spouse_name" TEXT,
    "mobile_no" TEXT,
    "alternate_phone" TEXT,
    "gender" TEXT NOT NULL,
    "marital_status" TEXT NOT NULL,
    "nationality" TEXT,
    "national_id" TEXT,
    "portfolio_link" TEXT,
    "photo" TEXT,
    "signature" TEXT,
    "resume" TEXT,
    "religionId" TEXT,
    "bloodGroupId" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_personals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "religions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "religions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "candidate_personal_id" TEXT NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "intersts" (
    "id" TEXT NOT NULL,
    "interst_name" TEXT NOT NULL,

    CONSTRAINT "intersts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "skill_name" TEXT NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "blood_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_educations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "level_id" TEXT NOT NULL,
    "degree_id" TEXT,
    "board_id" TEXT,
    "subject_id" TEXT,
    "result_type_id" TEXT,
    "major_group_id" TEXT,
    "institution" TEXT,
    "passingYear" INTEGER,
    "result" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level_of_educations" (
    "id" TEXT NOT NULL,
    "level_name" TEXT NOT NULL,

    CONSTRAINT "level_of_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "degrees" (
    "id" TEXT NOT NULL,
    "degree_name" TEXT NOT NULL,
    "level_id" TEXT NOT NULL,

    CONSTRAINT "degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_boards" (
    "id" TEXT NOT NULL,
    "board_name" TEXT NOT NULL,

    CONSTRAINT "education_boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "major_groups" (
    "id" TEXT NOT NULL,
    "group_name" TEXT NOT NULL,

    CONSTRAINT "major_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_types" (
    "id" TEXT NOT NULL,
    "result_type" TEXT NOT NULL,
    "order_by" INTEGER NOT NULL,

    CONSTRAINT "result_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_experiences" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "company_business_type" TEXT,
    "location" TEXT,
    "designation" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "is_continue" BOOLEAN DEFAULT false,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "responsibilities" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_references" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company_name" TEXT,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_languages" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "proficiency" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate_achievements" (
    "id" TEXT NOT NULL,
    "achievement_type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "url" TEXT,
    "location" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "folder_name" TEXT,
    "document_no" TEXT,
    "issue_date" TIMESTAMP(3),
    "issue_authority" TEXT,
    "remarks" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "candidate_experience_id" TEXT,
    "candidate_education_id" TEXT,
    "candidate_achievement_id" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address_types" (
    "id" TEXT NOT NULL,
    "name" "AddressTypeEnum" NOT NULL,

    CONSTRAINT "address_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "division_id" INTEGER NOT NULL,
    "district_id" INTEGER NOT NULL,
    "upazila_id" INTEGER,
    "city_corporation_id" INTEGER,
    "municipality_id" INTEGER,
    "union_parishad_id" INTEGER,
    "police_station_id" INTEGER,
    "post_office_id" INTEGER,
    "ward_no" TEXT,
    "address_line" TEXT NOT NULL,
    "is_same_as_present" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "address_type_id" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_divisions" (
    "id" SERIAL NOT NULL,
    "geo_code" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_districts" (
    "id" SERIAL NOT NULL,
    "geo_code" TEXT NOT NULL,
    "division_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "lat" VARCHAR(50),
    "lon" VARCHAR(50),
    "url" VARCHAR(300) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_districts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_city_corporations" (
    "id" SERIAL NOT NULL,
    "district_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_city_corporations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_upazilas" (
    "id" SERIAL NOT NULL,
    "geo_code" TEXT NOT NULL,
    "district_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_upazilas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_police_stations" (
    "id" SERIAL NOT NULL,
    "geo_code" TEXT NOT NULL,
    "district_id" INTEGER NOT NULL,
    "name" VARCHAR(75) NOT NULL,
    "bn_name" VARCHAR(75),
    "url" VARCHAR(50),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "base_police_stations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base_union_parishads" (
    "id" SERIAL NOT NULL,
    "geo_code" TEXT,
    "bbs_code" INTEGER,
    "upazila_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "url" VARCHAR(300) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
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
    "geo_code" TEXT NOT NULL,
    "upazila_id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "bn_name" VARCHAR(100) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "base_municipalities_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_id_email_idx" ON "users"("id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_personals_user_id_key" ON "candidate_personals"("user_id");

-- CreateIndex
CREATE INDEX "candidate_personals_user_id_idx" ON "candidate_personals"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "religions_name_key" ON "religions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "social_links_label_key" ON "social_links"("label");

-- CreateIndex
CREATE UNIQUE INDEX "intersts_interst_name_key" ON "intersts"("interst_name");

-- CreateIndex
CREATE UNIQUE INDEX "skills_skill_name_key" ON "skills"("skill_name");

-- CreateIndex
CREATE UNIQUE INDEX "blood_groups_name_key" ON "blood_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "level_of_educations_level_name_key" ON "level_of_educations"("level_name");

-- CreateIndex
CREATE UNIQUE INDEX "education_boards_board_name_key" ON "education_boards"("board_name");

-- CreateIndex
CREATE UNIQUE INDEX "subjects_subject_name_key" ON "subjects"("subject_name");

-- CreateIndex
CREATE UNIQUE INDEX "major_groups_group_name_key" ON "major_groups"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "result_types_result_type_key" ON "result_types"("result_type");

-- CreateIndex
CREATE UNIQUE INDEX "result_types_order_by_key" ON "result_types"("order_by");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_experiences_user_id_company_name_designation_depa_key" ON "candidate_experiences"("user_id", "company_name", "designation", "department", "company_business_type", "responsibilities");

-- CreateIndex
CREATE INDEX "documents_user_id_idx" ON "documents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "address_user_id_address_type_id_key" ON "address"("user_id", "address_type_id");

-- CreateIndex
CREATE INDEX "base_districts_division_id_idx" ON "base_districts"("division_id");

-- CreateIndex
CREATE INDEX "base_city_corporations_district_id_idx" ON "base_city_corporations"("district_id");

-- CreateIndex
CREATE INDEX "base_upazilas_district_id_idx" ON "base_upazilas"("district_id");

-- CreateIndex
CREATE INDEX "police_stations_name_index" ON "base_police_stations"("name");

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

-- CreateIndex
CREATE INDEX "_CandidateInterests_B_index" ON "_CandidateInterests"("B");

-- CreateIndex
CREATE INDEX "_CandidateSkills_B_index" ON "_CandidateSkills"("B");

-- AddForeignKey
ALTER TABLE "candidate_personals" ADD CONSTRAINT "candidate_personals_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES "religions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_personals" ADD CONSTRAINT "candidate_personals_bloodGroupId_fkey" FOREIGN KEY ("bloodGroupId") REFERENCES "blood_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_personals" ADD CONSTRAINT "candidate_personals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_candidate_personal_id_fkey" FOREIGN KEY ("candidate_personal_id") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level_of_educations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_degree_id_fkey" FOREIGN KEY ("degree_id") REFERENCES "degrees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "education_boards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_result_type_id_fkey" FOREIGN KEY ("result_type_id") REFERENCES "result_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_educations" ADD CONSTRAINT "candidate_educations_major_group_id_fkey" FOREIGN KEY ("major_group_id") REFERENCES "major_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "degrees" ADD CONSTRAINT "degrees_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "level_of_educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_experiences" ADD CONSTRAINT "candidate_experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_references" ADD CONSTRAINT "candidate_references_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_languages" ADD CONSTRAINT "candidate_languages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_achievements" ADD CONSTRAINT "candidate_achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_experience_id_fkey" FOREIGN KEY ("candidate_experience_id") REFERENCES "candidate_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_education_id_fkey" FOREIGN KEY ("candidate_education_id") REFERENCES "candidate_educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_achievement_id_fkey" FOREIGN KEY ("candidate_achievement_id") REFERENCES "candidate_achievements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_address_type_id_fkey" FOREIGN KEY ("address_type_id") REFERENCES "address_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "base_divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_city_corporation_id_fkey" FOREIGN KEY ("city_corporation_id") REFERENCES "base_city_corporations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_municipality_id_fkey" FOREIGN KEY ("municipality_id") REFERENCES "base_municipalities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_union_parishad_id_fkey" FOREIGN KEY ("union_parishad_id") REFERENCES "base_union_parishads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_police_station_id_fkey" FOREIGN KEY ("police_station_id") REFERENCES "base_police_stations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_post_office_id_fkey" FOREIGN KEY ("post_office_id") REFERENCES "base_post_offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_districts" ADD CONSTRAINT "base_districts_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "base_divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_city_corporations" ADD CONSTRAINT "base_city_corporations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_upazilas" ADD CONSTRAINT "base_upazilas_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_police_stations" ADD CONSTRAINT "base_police_stations_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_union_parishads" ADD CONSTRAINT "base_union_parishads_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_post_offices" ADD CONSTRAINT "base_post_offices_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "base_districts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_post_offices" ADD CONSTRAINT "base_post_offices_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_municipalities" ADD CONSTRAINT "base_municipalities_upazila_id_fkey" FOREIGN KEY ("upazila_id") REFERENCES "base_upazilas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateInterests" ADD CONSTRAINT "_CandidateInterests_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateInterests" ADD CONSTRAINT "_CandidateInterests_B_fkey" FOREIGN KEY ("B") REFERENCES "intersts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateSkills" ADD CONSTRAINT "_CandidateSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "candidate_personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateSkills" ADD CONSTRAINT "_CandidateSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
