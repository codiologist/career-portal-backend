-- CreateEnum
CREATE TYPE "Role" AS ENUM ('HR', 'USER', 'ADMIN', 'MODERATOR');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('AVATAR', 'RESUME', 'SIGNATURE', 'CERTIFICATE', 'OTHER');

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
    "study_year" TEXT,
    "passing_year" TEXT,
    "result_type" TEXT,
    "result" TEXT,
    "total_cgpa" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
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
    "companyName" TEXT NOT NULL,
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
CREATE TABLE "Candidate_references" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "name" TEXT,
    "path" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "candidate_experience_id" TEXT,
    "candidate_education_id" TEXT,

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
    "addressLine" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,
    "upazilaId" TEXT NOT NULL,
    "municipalityId" TEXT,
    "unionParishadId" TEXT,
    "policeStationId" TEXT,
    "postOfficeId" TEXT,
    "wardNo" TEXT,
    "zipCode" TEXT,
    "isCityCorporation" BOOLEAN NOT NULL DEFAULT false,
    "isSameAsPresent" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "addressTypeId" TEXT NOT NULL,

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
    "id" BIGSERIAL NOT NULL,
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
CREATE UNIQUE INDEX "subjects_user_id_key" ON "subjects"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_experiences_user_id_company_name_designation_depa_key" ON "candidate_experiences"("user_id", "company_name", "designation", "department", "company_business_type", "responsibilities");

-- CreateIndex
CREATE INDEX "documents_user_id_idx" ON "documents"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "documents_user_id_type_name_key" ON "documents"("user_id", "type", "name");

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_addressTypeId_key" ON "address"("userId", "addressTypeId");

-- CreateIndex
CREATE INDEX "base_districts_division_id_idx" ON "base_districts"("division_id");

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
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "candidate_educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_experiences" ADD CONSTRAINT "candidate_experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_references" ADD CONSTRAINT "candidate_references_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate_languages" ADD CONSTRAINT "candidate_languages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate_references" ADD CONSTRAINT "Candidate_references_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_experience_id_fkey" FOREIGN KEY ("candidate_experience_id") REFERENCES "candidate_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_candidate_education_id_fkey" FOREIGN KEY ("candidate_education_id") REFERENCES "candidate_educations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_addressTypeId_fkey" FOREIGN KEY ("addressTypeId") REFERENCES "address_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base_districts" ADD CONSTRAINT "base_districts_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "base_divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
