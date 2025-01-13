-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('EMERGENCY', 'NON_EMERGENCY');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'DISMISSED');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "reportType" "ReportType" NOT NULL,
    "image" TEXT,
    "incidentType" TEXT NOT NULL,
    "location" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportId_key" ON "Report"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
