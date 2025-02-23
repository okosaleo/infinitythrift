/*
  Warnings:

  - You are about to drop the column `status` on the `KYC` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "KYC_status_idx";

-- AlterTable
ALTER TABLE "KYC" DROP COLUMN "status",
ADD COLUMN     "kycstatus" "KYCStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "KYC_kycstatus_idx" ON "KYC"("kycstatus");
