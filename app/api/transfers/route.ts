// app/api/transfers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  TransactionSourceType,
  TransactionDestinationType,
  TransactionType,
} from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { amount, sourceType, destinationType, userId, thriftId } = await req.json();

    if (!amount || !sourceType || !destinationType || !userId || !thriftId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const numericAmount = parseFloat(amount);

    // Start a transaction so that all operations are atomic.
    return await prisma.$transaction(async (tx) => {
      let sourceUpdate: Promise<any> | undefined;
      let destinationUpdate: Promise<any> | undefined;
      let trackerUpdate: Promise<any> | undefined;
      let transactionRecord: Promise<any>;
      let txType: TransactionType;
      let srcId: string;
      let destId: string;

      // Case 1: Withdraw from Thrift Savings to Wallet
      if (sourceType === 'THRIFT_SAVINGS' && destinationType === 'WALLET') {
        // Find the thrift savings plan.
        const thrift = await tx.thriftSavings.findUnique({
          where: { id: thriftId },
        });
        if (!thrift) throw new Error("Thrift savings plan not found");
        if (!thrift.endDate) throw new Error("Thrift savings plan is missing an end date");
        if (new Date() < new Date(thrift.endDate)) {
          throw new Error("Thrift savings plan is not matured yet; withdrawal is not allowed.");
        }
        if (thrift.currentAmount < numericAmount) {
          throw new Error("Insufficient funds in thrift savings plan");
        }
        // Update thrift savings by decrementing funds.
        sourceUpdate = tx.thriftSavings.update({
          where: { id: thriftId },
          data: { currentAmount: { decrement: numericAmount } },
        });
        // Update the user's wallet.
        const wallet = await tx.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("Wallet not found");
        destinationUpdate = tx.wallet.update({
          where: { id: wallet.id },
          data: { balance: { increment: numericAmount } },
        });
        txType = "SAVINGS_WITHDRAWAL";
        srcId = thriftId;
        destId = wallet.id;
      }
      // Case 2: Deposit from Wallet to Thrift Savings (Daily Funding)
      else if (sourceType === 'WALLET' && destinationType === 'THRIFT_SAVINGS') {
        // Retrieve the wallet and thrift savings plan.
        const wallet = await tx.wallet.findUnique({ where: { userId } });
        if (!wallet) throw new Error("Wallet not found");
        if (wallet.balance < numericAmount) {
          throw new Error("Insufficient wallet funds");
        }
        const thrift = await tx.thriftSavings.findUnique({ where: { id: thriftId } });
        if (!thrift) throw new Error("Thrift savings plan not found");

        // Deduct from wallet.
        sourceUpdate = tx.wallet.update({
          where: { id: wallet.id },
          data: { balance: { decrement: numericAmount } },
        });
        // Add to thrift savings.
        destinationUpdate = tx.thriftSavings.update({
          where: { id: thriftId },
          data: { currentAmount: { increment: numericAmount } },
        });

        // Update the daily tracker.
        const currentWeekStart = startOfWeek(new Date());
        const currentDay = getCurrentDayField();
        // Upsert tracker record. (Make sure you have a unique compound key on { thriftSavingsId, weekStart }.)
        trackerUpdate = tx.thriftSavingsTracker.upsert({
          where: {
            thriftSavingsId_weekStart: { thriftSavingsId: thriftId, weekStart: currentWeekStart },
          },
          update: { [currentDay]: true },
          create: {
            thriftSavingsId: thriftId,
            weekStart: currentWeekStart,
            monday: currentDay === "monday",
            tuesday: currentDay === "tuesday",
            wednesday: currentDay === "wednesday",
            thursday: currentDay === "thursday",
            friday: currentDay === "friday",
            saturday: currentDay === "saturday",
            sunday: currentDay === "sunday",
          },
        });
        txType = "SAVINGS_DEPOSIT";
        srcId = wallet.id;
        destId = thriftId;
      } else {
        throw new Error("Invalid transfer type");
      }

      // Create a transaction record.
      transactionRecord = tx.transaction.create({
        data: {
          userId,
          amount: numericAmount,
          type: txType,
          status: "COMPLETED",
          sourceType: sourceType as TransactionSourceType,
          destinationType: destinationType as TransactionDestinationType,
          sourceId: srcId,
          destinationId: destId,
          description: `Transfer from ${sourceType} to ${destinationType}`,
        },
      });

      // Wait for all operations to complete.
      await Promise.all(
        [sourceUpdate, destinationUpdate, trackerUpdate, transactionRecord].filter(Boolean)
      );

      return NextResponse.json({ message: "Transfer successful" }, { status: 200 });
    });
  } catch (error: any) {
    console.error("Transfer error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Helper to get the current day (as a lowercase string).
function getCurrentDayField() {
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return days[new Date().getDay()];
}

// Helper to get the start of the week for a given date (assuming week starts on Sunday).
function startOfWeek(date: Date) {
  const day = date.getDay(); // Sunday = 0
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}
