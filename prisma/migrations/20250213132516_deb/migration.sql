/*
  Warnings:

  - You are about to drop the `kyc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "kyc" DROP CONSTRAINT "kyc_userId_fkey";

-- DropTable
DROP TABLE "kyc";

-- CreateTable
CREATE TABLE "KYC" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "proofOfAddress" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "employer" TEXT NOT NULL,
    "monthlyIncome" DECIMAL(65,30) NOT NULL,
    "bvn" VARCHAR(11) NOT NULL,
    "idType" "IdentificationType" NOT NULL,
    "idNumber" TEXT NOT NULL,
    "idImage" TEXT NOT NULL,
    "idSelfie" TEXT NOT NULL,
    "status" "KYCStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KYC_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KYC_userId_key" ON "KYC"("userId");

-- CreateIndex
CREATE INDEX "KYC_userId_idx" ON "KYC"("userId");

-- CreateIndex
CREATE INDEX "KYC_status_idx" ON "KYC"("status");

-- CreateIndex
CREATE INDEX "KYC_bvn_idx" ON "KYC"("bvn");

-- CreateIndex
CREATE INDEX "KYC_idNumber_idx" ON "KYC"("idNumber");

-- AddForeignKey
ALTER TABLE "KYC" ADD CONSTRAINT "KYC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
