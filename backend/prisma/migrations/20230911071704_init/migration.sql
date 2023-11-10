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
CREATE TABLE "travelers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "travelers_name" VARCHAR(100) NOT NULL,
    "travelers_type" "traveler_type" NOT NULL DEFAULT 'AUTHOR',

    CONSTRAINT "travelers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" VARCHAR(100) NOT NULL,
    "summary" VARCHAR(1000) NOT NULL,
    "can_read" BOOLEAN NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publications_traveler" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "publication_id" UUID NOT NULL,
    "traveler_id" UUID NOT NULL,

    CONSTRAINT "publications_traveler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ships_ship_name_idx" ON "ships"("ship_name");

-- CreateIndex
CREATE INDEX "travelers_travelers_name_idx" ON "travelers"("travelers_name");

-- CreateIndex
CREATE UNIQUE INDEX "publications_traveler_publication_id_key" ON "publications_traveler"("publication_id");

-- CreateIndex
CREATE UNIQUE INDEX "publications_traveler_traveler_id_key" ON "publications_traveler"("traveler_id");

-- AddForeignKey
ALTER TABLE "publications_traveler" ADD CONSTRAINT "publications_traveler_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publications_traveler" ADD CONSTRAINT "publications_traveler_traveler_id_fkey" FOREIGN KEY ("traveler_id") REFERENCES "travelers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
