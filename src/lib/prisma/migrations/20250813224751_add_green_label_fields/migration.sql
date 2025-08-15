/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type,companyId]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.

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
    "providesGoodies" BOOLEAN NOT NULL DEFAULT false,
    "hasGreenTransport" BOOLEAN NOT NULL DEFAULT false,
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

-- CreateIndex
CREATE UNIQUE INDEX "Sector_name_key" ON "Sector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_type_companyId_key" ON "SocialLink"("type", "companyId");
