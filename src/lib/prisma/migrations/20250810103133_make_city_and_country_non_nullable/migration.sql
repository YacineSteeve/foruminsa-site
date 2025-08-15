/*
  Warnings:

  - Made the column `city` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Company` required. This step will fail if there are existing NULL values in that column.

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
    "description" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "studyLevels" TEXT NOT NULL,
    "specialities" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "address" TEXT,
    "postalCode" TEXT,
    "websiteUrl" TEXT,
    "carbonFootprint" REAL,
    "roomId" TEXT,
    CONSTRAINT "Company_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "ForumRoom" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("address", "carbonFootprint", "city", "country", "createdAt", "description", "id", "logoUrl", "name", "postalCode", "roomId", "slug", "specialities", "studyLevels", "updatedAt", "websiteUrl") SELECT "address", "carbonFootprint", "city", "country", "createdAt", "description", "id", "logoUrl", "name", "postalCode", "roomId", "slug", "specialities", "studyLevels", "updatedAt", "websiteUrl" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
