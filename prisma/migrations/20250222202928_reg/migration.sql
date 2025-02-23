/*
  Warnings:

  - Added the required column `dailyAmount` to the `CategorySavings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategorySavings" ADD COLUMN     "dailyAmount" DECIMAL(65,30) NOT NULL;
