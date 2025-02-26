// app/api/wallet/fund/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const fundSchema = z.object({
  userId: z.string(),
  amount: z.number().positive(),
  fundingType: z.enum(["REFERRAL", "FUNDWALLET", "SAVINGS_RETURN"]),
});

export async function POST(req: NextRequest) {
  try {
    // Verify admin privileges
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new Error("Unauthorized");
    }
    const adminUser = session.user;
    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - Admin privileges required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const validatedData = fundSchema.parse(body);

    // Check if target user exists and include wallet info
    const targetUser = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      include: { wallet: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    // Ensure the target user has a wallet; create one if necessary
    if (!targetUser.wallet) {
      await prisma.wallet.create({
        data: { userId: validatedData.userId },
      });
    }

    // Use a transaction to perform both wallet update and add the transaction
    const [userUpdate, walletUpdate] = await prisma.$transaction([
      prisma.user.update({
        where: { id: validatedData.userId },
        data: {
          transactions: {
            create: {
              amount: validatedData.amount,
              type: "DEPOSIT",
              status: "COMPLETED",
              description: `Admin funding: ${validatedData.fundingType}`,
              metadata: {
                adminId: adminUser.id,
                actionType: validatedData.fundingType,
              },
            },
          },
        },
        select: {
          // Return the latest transaction that was just created
          transactions: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      prisma.wallet.update({
        where: { userId: validatedData.userId },
        data: {
          balance: { increment: validatedData.amount },
        },
      }),
    ]);

    const newTransaction = userUpdate.transactions[0];

    return NextResponse.json({
      success: true,
      newBalance: walletUpdate.balance,
      transactionId: newTransaction.id,
    });
  } catch (error) {
    console.error("Funding error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
