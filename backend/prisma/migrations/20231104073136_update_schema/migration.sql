/*
  Warnings:

  - You are about to drop the `publications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publications_traveler` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `travelers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "publications_traveler" DROP CONSTRAINT "publications_traveler_publication_id_fkey";

-- DropForeignKey
ALTER TABLE "publications_traveler" DROP CONSTRAINT "publications_traveler_traveler_id_fkey";

-- DropTable
DROP TABLE "publications";

-- DropTable
DROP TABLE "publications_traveler";

-- DropTable
DROP TABLE "travelers";

-- CreateTable
CREATE TABLE "traveler" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "traveler_name" VARCHAR(1000) NOT NULL,
    "traveler_type" "traveler_type" NOT NULL DEFAULT 'AUTHOR',

    CONSTRAINT "traveler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(2000) NOT NULL,
    "summary" VARCHAR(2000) NOT NULL,
    "can_read" BOOLEAN NOT NULL,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication_traveler" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "publication_id" UUID NOT NULL,
    "traveler_id" UUID NOT NULL,

    CONSTRAINT "publication_traveler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "traveler_traveler_name_idx" ON "traveler"("traveler_name");

-- AddForeignKey
ALTER TABLE "publication_traveler" ADD CONSTRAINT "publication_traveler_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_traveler" ADD CONSTRAINT "publication_traveler_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "traveler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
