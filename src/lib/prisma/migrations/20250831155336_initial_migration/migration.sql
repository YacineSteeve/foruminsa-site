-- CreateTable
CREATE TABLE "RateLimit" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "key" TEXT NOT NULL PRIMARY KEY,
    "points" INTEGER NOT NULL DEFAULT 0,
    "expire" DATETIME
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "nameFR" TEXT NOT NULL,
    "nameEN" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ForumRoom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "building" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "SocialLink_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL COLLATE NOCASE,
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

-- CreateTable
CREATE TABLE "_CompanyToSector" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CompanyToSector_A_fkey" FOREIGN KEY ("A") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CompanyToSector_B_fkey" FOREIGN KEY ("B") REFERENCES "Sector" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_nameFR_key" ON "Sector"("nameFR");

-- CreateIndex
CREATE UNIQUE INDEX "Sector_nameEN_key" ON "Sector"("nameEN");

-- CreateIndex
CREATE UNIQUE INDEX "ForumRoom_name_floor_building_key" ON "ForumRoom"("name", "floor", "building");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_type_companyId_key" ON "SocialLink"("type", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToSector_AB_unique" ON "_CompanyToSector"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToSector_B_index" ON "_CompanyToSector"("B");
