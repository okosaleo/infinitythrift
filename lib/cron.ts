// app/api/cron/daily-thrift/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { startOfWeek, } from 'date-fns';

export async function GET() {
  try {
    const activeThrifts = await prisma.thriftSavings.findMany({
        where: { 
          status: 'ACTIVE',
          endDate: { gte: new Date() } // Only process active and not expired
        },
        include: { 
          trackers: true,
          user: true
        }
      });

    for (const thrift of activeThrifts) {
      const today = new Date();
      const weekStart = startOfWeek(today);
      
      // Find or create weekly tracker
      let tracker = thrift.trackers.find(t => 
        t.weekStart.getTime() === weekStart.getTime()
      );

      if (!tracker) {
        tracker = await prisma.thriftSavingsTracker.create({
          data: {
            thriftSavingsId: thrift.id,
            weekStart,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
          }
        });
      }

      // Check if today's contribution already made
      const dayOfWeek = today.getDay();
      const dayField = [
        'sunday', 'monday', 'tuesday', 'wednesday', 
        'thursday', 'friday', 'saturday'
      ][dayOfWeek] as keyof typeof tracker;

      if (!tracker[dayField]) {
        // Check wallet balance
        const wallet = await prisma.wallet.findUnique({
          where: { userId: thrift.userId }
        });

        if (wallet && wallet.balance >= thrift.dailyAmount) {
          await prisma.$transaction([
            prisma.wallet.update({
              where: { userId: thrift.userId },
              data: { balance: { decrement: thrift.dailyAmount } }
            }),
            
            prisma.thriftSavings.update({
              where: { id: thrift.id },
              data: {
                currentAmount: { increment: thrift.dailyAmount }
              }
            }),
            
            prisma.thriftSavingsTracker.update({
              where: { id: tracker.id },
              data: { [dayField]: true }
            }),
            
            prisma.transaction.create({
              data: {
                userId: thrift.userId,
                amount: thrift.dailyAmount,
                type: "SAVINGS_DEPOSIT",
                status: "COMPLETED",
                description: "Daily thrift contribution",
                sourceType: "WALLET",
                destinationType: "THRIFT_SAVINGS",
                createdAt: today
              }
            })
          ]);
        }
      }
    }

    return NextResponse.json({ message: "Daily thrift processing completed" });
    
  } catch (error) {
    console.error("Daily thrift error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}