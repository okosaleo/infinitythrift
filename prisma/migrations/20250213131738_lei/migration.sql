/*
  Warnings:

  - You are about to drop the `KYC` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KYC" DROP CONSTRAINT "KYC_userId_fkey";

-- DropTable
DROP TABLE "KYC";

-- CreateTable
CREATE TABLE "kyc" (
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

    CONSTRAINT "kyc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kyc_userId_key" ON "kyc"("userId");

-- CreateIndex
CREATE INDEX "kyc_userId_idx" ON "kyc"("userId");

-- CreateIndex
CREATE INDEX "kyc_status_idx" ON "kyc"("status");

-- CreateIndex
CREATE INDEX "kyc_bvn_idx" ON "kyc"("bvn");

-- CreateIndex
CREATE INDEX "kyc_idNumber_idx" ON "kyc"("idNumber");

-- AddForeignKey
ALTER TABLE "kyc" ADD CONSTRAINT "kyc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
