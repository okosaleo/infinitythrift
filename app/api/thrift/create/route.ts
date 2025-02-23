import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Check KYC approval
    const kyc = await prisma.kYC.findUnique({ where: { userId: user.id } });
    if (!kyc || kyc.kycstatus !== "APPROVED") {
      return NextResponse.json({ error: "KYC verification required" }, { status: 403 });
    }

    const body = await req.json();
    const serviceFee = body.dailyAmount;
    const totalAmount = body.totalAmount;

    // Check wallet balance
    const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
    if (!wallet || wallet.balance < totalAmount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    // Run database transaction
    const [updatedWallet, thriftSavings, transaction] = await prisma.$transaction([
      prisma.wallet.update({
        where: { userId: user.id },
        data: { balance: { decrement: totalAmount } }
      }),

      prisma.thriftSavings.create({
        data: {
          userId: user.id,
          dailyAmount: body.dailyAmount,
          category: body.category,
          currentAmount: serviceFee,
          trackers: {
            create: [{ weekStart: new Date(), monday: true }]
          }
        }
      }),

      prisma.transaction.create({
        data: {
          userId: user.id,
          amount: totalAmount,
          type: "SAVINGS_DEPOSIT",
          status: "COMPLETED",
          description: body.description,
          sourceType: "WALLET",
          destinationType: "THRIFT_SAVINGS"
        }
      })
    ]);

    // ✅ Wrap the response in NextResponse.json()
    return NextResponse.json({ 
      message: "Thrift savings created successfully", 
      wallet: updatedWallet, 
      thriftSavings, 
      transaction 
    });

  } catch (error) {
    console.error("Thrift creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
