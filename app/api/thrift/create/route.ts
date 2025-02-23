import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
                    if (!session) {
                      throw new Error("Unauthorized");
                    }
                    const user = session.user;
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // Check KYC approval
    const kyc = await prisma.kYC.findUnique({ where: { userId: user.id } })
    if (!kyc || kyc.kycstatus !== "APPROVED") {
      return NextResponse.json({ error: "KYC verification required" }, { status: 403 })
    }

    const body = await req.json()
    const serviceFee = body.dailyAmount
    const totalAmount = body.totalAmount

    // Check wallet balance
    const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } })
    if (!wallet || wallet.balance < totalAmount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 })
    }

    // Create transaction
    return await prisma.$transaction([
      // Deduct from wallet
      prisma.wallet.update({
        where: { userId: user.id },
        data: { balance: { decrement: totalAmount } }
      }),

      // Create thrift savings
      prisma.thriftSavings.create({
        data: {
          userId: user.id,
          dailyAmount: body.dailyAmount,
          category: body.category,
          currentAmount: serviceFee, // Initial payment
          trackers: {
            create: [{
              weekStart: new Date(),
              monday: true // Mark first day as paid
            }]
          }
        }
      }),

      // Create transaction record
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
    ])

  } catch (error) {
    console.error("Thrift creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}