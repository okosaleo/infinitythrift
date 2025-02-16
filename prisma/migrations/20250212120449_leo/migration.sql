-- CreateTable
CREATE TABLE "ThriftSavingsTracker" (
    "id" TEXT NOT NULL,
    "thriftSavingsId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThriftSavingsTracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThriftSavingsTracker" ADD CONSTRAINT "ThriftSavingsTracker_thriftSavingsId_fkey" FOREIGN KEY ("thriftSavingsId") REFERENCES "ThriftSavings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
