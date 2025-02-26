import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { ThriftCategory } from '@prisma/client';
import { headers } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { z } from 'zod';

const thriftSchema = z
  .object({
    category: z.enum(["Bronze", "Silver", "Gold", "Infinity"]),
    dailyAmount: z.number().positive(),
    description: z.string().optional(),
  })
  .refine((data) => {
    switch (data.category) {
      case "Bronze":
        return data.dailyAmount >= 1000 && data.dailyAmount <= 5000;
      case "Silver":
        return data.dailyAmount >= 5000 && data.dailyAmount <= 20000;
      case "Gold":
        return data.dailyAmount >= 21000 && data.dailyAmount <= 50000;
      case "Infinity":
        return data.dailyAmount >= 51000;
      default:
        return false;
    }
  }, { message: "Daily amount does not match the selected category limits." });

async function getUserFromRequest(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Unauthorized");
  }
  const user = session.user;
  return await prisma.user.findFirst({
    where: { id: user.id },
    include: { kyc: true },
  });
}

// Helper function to get the current day field name in lowercase.
function getCurrentDayField() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body.
    const body = await req.json();
    const parsed = thriftSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    const { category, dailyAmount, description } = parsed.data;

    // Retrieve the authenticated user.
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user.kyc || user.kyc.kycstatus !== "APPROVED") {
      return NextResponse.json({ error: "KYC not approved" }, { status: 403 });
    }

    const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
    if (!wallet || Number(wallet.balance) < dailyAmount) {
      return NextResponse.json({ error: "Insufficient wallet funds" }, { status: 400 });
    }

    // Deduct the first payment (used as the service fee) from the wallet.
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: { decrement: dailyAmount } },
    });

    // Convert the category value to the proper enum format (e.g., "BRONZE")
    const thriftEnumCategory = category.toUpperCase() as ThriftCategory;

    const startDate = new Date();
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 31);
    // Create the thrift savings record.
    const thrift = await prisma.thriftSavings.create({
      data: {
        userId: user.id,
        dailyAmount: dailyAmount,
        category: thriftEnumCategory,
        currentAmount: dailyAmount,
      },
    });

    // Get the current day field (e.g., "monday", "tuesday", etc.)
    const currentDay = getCurrentDayField();

    // Create an initial tracker record and mark the current day as positive.
    await prisma.thriftSavingsTracker.create({
      data: {
        thriftSavingsId: thrift.id,
        weekStart: new Date(),
        monday: currentDay === "monday",
        tuesday: currentDay === "tuesday",
        wednesday: currentDay === "wednesday",
        thursday: currentDay === "thursday",
        friday: currentDay === "friday",
        saturday: currentDay === "saturday",
        sunday: currentDay === "sunday",
      },
    });

    // Log the transaction.
    await prisma.transaction.create({
      data: {
        userId: user.id,
        amount: dailyAmount,
        type: "SAVINGS_DEPOSIT",
        status: "COMPLETED",
        description: description || "Thrift savings plan initiation fee deduction",
        sourceType: "WALLET",
        sourceId: wallet.id,
        destinationType: "THRIFT_SAVINGS",
        destinationId: thrift.id,
      },
    });

    return NextResponse.json(
      { 
        message: "Thrift savings plan started successfully", 
        thriftId: thrift.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error starting thrift savings plan:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

