/*
  Warnings:

  - You are about to drop the column `country` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sector` table. All the data in the column will be lost.
  - Added the required column `countryCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEN` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionFR` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEN` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameFR` to the `Sector` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descriptionFR" TEXT NOT NULL,
    "descriptionEN" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "providesGoodies" BOOLEAN NOT NULL DEFAULT false,
    "hasGreenTransport" BOOLEAN NOT NULL DEFAULT false,
    "studyLevels" TEXT NOT NULL,
    "specialities" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "address" TEXT,
    "postalCode" TEXT,
    "websiteUrl" TEXT,
    "carbonFootprint" REAL,
    "roomId" TEXT,
    CONSTRAINT "Company_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ForumRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("address", "carbonFootprint", "city", "createdAt", "hasGreenTransport", "id", "logoUrl", "name", "postalCode", "providesGoodies", "roomId", "slug", "specialities", "studyLevels", "updatedAt", "websiteUrl") SELECT "address", "carbonFootprint", "city", "createdAt", "hasGreenTransport", "id", "logoUrl", "name", "postalCode", "providesGoodies", "roomId", "slug", "specialities", "studyLevels", "updatedAt", "websiteUrl" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");
CREATE TABLE "new_Sector" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nameFR" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL
);
INSERT INTO "new_Sector" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Sector";
DROP TABLE "Sector";
ALTER TABLE "new_Sector" RENAME TO "Sector";
CREATE UNIQUE INDEX "Sector_nameFR_key" ON "Sector"("nameFR");
CREATE UNIQUE INDEX "Sector_nameEN_key" ON "Sector"("nameEN");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
