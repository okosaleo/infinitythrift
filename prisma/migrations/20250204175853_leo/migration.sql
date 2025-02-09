-- CreateEnum
CREATE TYPE "ThriftCategory" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'INFINITY');

-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('TYPE_1', 'TYPE_2', 'TYPE_3');

-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'PAID', 'DEFAULTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL', 'LOAN_DISBURSEMENT', 'LOAN_REPAYMENT', 'SAVINGS_DEPOSIT', 'SAVINGS_WITHDRAWAL');

-- CreateEnum
CREATE TYPE "SavingsCategoryType" AS ENUM ('THREE_MONTHS', 'SIX_MONTHS', 'NINE_MONTHS');

-- CreateEnum
CREATE TYPE "SavingsStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "LoanRequestStatus" AS ENUM ('PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('NATIONAL_ID', 'PASSPORT', 'DRIVERS_LICENSE', 'VOTERS_CARD');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'user',
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "banReason" TEXT,
    "banExpires" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "impersonatedBy" TEXT,
    "userAgent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "idToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThriftSavings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" "ThriftCategory" NOT NULL,
    "currentAmount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThriftSavings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategorySavings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" "SavingsCategoryType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "status" "SavingsStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategorySavings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StructuredSavings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "targetAmount" DECIMAL(65,30) NOT NULL,
    "currentAmount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "status" "SavingsStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StructuredSavings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanProduct" (
    "id" TEXT NOT NULL,
    "type" "LoanType" NOT NULL,
    "interestRate" DOUBLE PRECISION NOT NULL,
    "maxAmount" DECIMAL(65,30) NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loanProductId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "amountDue" DECIMAL(65,30) NOT NULL,
    "amountPaid" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "status" "LoanStatus" NOT NULL DEFAULT 'PENDING',
    "disbursedAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "TransactionType" NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "reference" TEXT,
    "description" TEXT,
    "metadata" JSONB,
    "loanId" TEXT,
    "savingsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loanType" "LoanType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "LoanRequestStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "reason" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanRequest_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User__id_idx" ON "User"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "LoanProduct_type_key" ON "LoanProduct"("type");

-- CreateIndex
CREATE INDEX "Loan_userId_idx" ON "Loan"("userId");

-- CreateIndex
CREATE INDEX "Loan_status_idx" ON "Loan"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE INDEX "Wallet_userId_idx" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_reference_key" ON "Transaction"("reference");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_type_idx" ON "Transaction"("type");

-- CreateIndex
CREATE INDEX "Transaction_createdAt_idx" ON "Transaction"("createdAt");

-- CreateIndex
CREATE INDEX "LoanRequest_userId_idx" ON "LoanRequest"("userId");

-- CreateIndex
CREATE INDEX "LoanRequest_status_idx" ON "LoanRequest"("status");

-- CreateIndex
CREATE INDEX "LoanRequest_loanType_idx" ON "LoanRequest"("loanType");

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
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThriftSavings" ADD CONSTRAINT "ThriftSavings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategorySavings" ADD CONSTRAINT "CategorySavings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StructuredSavings" ADD CONSTRAINT "StructuredSavings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_loanProductId_fkey" FOREIGN KEY ("loanProductId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanRequest" ADD CONSTRAINT "LoanRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KYC" ADD CONSTRAINT "KYC_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
