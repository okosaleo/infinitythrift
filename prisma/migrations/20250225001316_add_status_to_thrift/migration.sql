-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "ThriftSavings" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "ThriftSavings_status_idx" ON "ThriftSavings"("status");

-- CreateIndex
CREATE INDEX "ThriftSavings_endDate_idx" ON "ThriftSavings"("endDate");
