-- CreateEnum
CREATE TYPE "traveler_type" AS ENUM ('AUTHOR', 'ILLUSTRATOR');

-- CreateTable
CREATE TABLE "ships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ship_date" TIMESTAMP(3) NOT NULL,
    "ship_name" VARCHAR(100) NOT NULL,
    "passenger_list" JSONB NOT NULL,

    CONSTRAINT "ships_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "ships_ship_name_idx" ON "ships"("ship_name");

-- CreateIndex
CREATE INDEX "traveler_traveler_name_idx" ON "traveler"("traveler_name");

-- AddForeignKey
ALTER TABLE "publication_traveler" ADD CONSTRAINT "publication_traveler_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publication_traveler" ADD CONSTRAINT "publication_traveler_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "traveler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

