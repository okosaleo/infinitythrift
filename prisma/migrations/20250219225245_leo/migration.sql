-- CreateEnum
CREATE TYPE "TransactionSourceType" AS ENUM ('LOAN', 'WALLET', 'THRIFT_SAVINGS', 'CATEGORY_SAVINGS', 'STRUCTURED_SAVINGS');

-- CreateEnum
CREATE TYPE "TransactionDestinationType" AS ENUM ('LOAN', 'WALLET', 'THRIFT_SAVINGS', 'CATEGORY_SAVINGS', 'STRUCTURED_SAVINGS');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "destinationId" TEXT,
ADD COLUMN     "destinationType" "TransactionDestinationType",
ADD COLUMN     "sourceId" TEXT,
ADD COLUMN     "sourceType" "TransactionSourceType";
