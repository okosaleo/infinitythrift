/*
  Warnings:

  - You are about to drop the column `dailyAmount` on the `CategorySavings` table. All the data in the column will be lost.
  - Added the required column `dailyAmount` to the `ThriftSavings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategorySavings" DROP COLUMN "dailyAmount";

-- AlterTable
ALTER TABLE "ThriftSavings" ADD COLUMN     "dailyAmount" DECIMAL(65,30) NOT NULL;
