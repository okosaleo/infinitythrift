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

    const targetUser = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      include: { wallet: true }
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Target user not found" },
        { status: 404 }
      );
    }

    const wallet = targetUser.wallet || await prisma.wallet.create({
      data: { userId: validatedData.userId }
    });

    // Perform transaction
    const [transaction, updatedWallet] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId: validatedData.userId,
          amount: validatedData.amount,
          type: "DEPOSIT",
          status: "COMPLETED",
          description: `Admin funding: ${validatedData.fundingType}`,
          metadata: {
            adminId: adminUser.id,
            actionType: validatedData.fundingType
          }
        },
      }),
      prisma.wallet.update({
        where: { userId: validatedData.userId },
        data: {
          balance: {
            increment: validatedData.amount,
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      newBalance: updatedWallet.balance,
      transactionId: transaction.id
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