/*
  Warnings:

  - Added the required column `idWithSelfie` to the `KYC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KYC" ADD COLUMN     "idWithSelfie" TEXT NOT NULL;
