// app/api/withdrawal/route.ts
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { headers } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate user
    const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
          throw new Error("Unauthorized");
        }
        const user = session.user;

    // 2. Parse request body
    const body = await req.json();
    const { amount, bankName, accountNumber, note } = body;

    // 3. Validate input
    if (!amount || !bankName || !accountNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Check KYC status
    const kyc = await prisma.kYC.findUnique({
      where: { userId: user.id },
    });

    if (!kyc || kyc.kycstatus !== 'APPROVED') {
      return NextResponse.json(
        { error: 'KYC verification required' },
        { status: 403 }
      );
    }

    // 5. Check wallet balance
    const wallet = await prisma.wallet.findUnique({
      where: { userId: user.id },
    });

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' },
        { status: 400 }
      );
    }

    if (wallet.balance.lt(new Decimal(amount))) {
      return NextResponse.json(
        { error: "Insufficient funds" },
        { status: 400 }
      );
    }

    // 6. Create withdrawal request and transaction in a single transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Create withdrawal request
      const withdrawalRequest = await prisma.withdrawalRequest.create({
        data: {
          userId: user.id,
          amount: parseFloat(amount),
          bankName,
          accountNumber,
          description: note,
        },
      });

      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          userId: user.id,
          amount: parseFloat(amount),
          type: 'WITHDRAWAL',
          status: 'PENDING',
          description: `Withdrawal request to ${bankName} account ${accountNumber}`,
          withdrawalRequest: {
            connect: { id: withdrawalRequest.id },
          },
        },
      });

      // Update wallet balance
      await prisma.wallet.update({
        where: { userId: user.id },
        data: {
          balance: {
            decrement: new Decimal(amount),
          },
        },
      });
      

      return { withdrawalRequest, transaction };
    });

    return NextResponse.json({
      message: 'Withdrawal request submitted successfully',
      data: result.withdrawalRequest,
    });

  } catch (error) {
    console.error('Withdrawal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}