import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';
import { headers } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body from the incoming request.
    const body = await req.json();
    const { reference, amount } = body;

       const session = await auth.api.getSession({ headers: await headers() });
         if (!session) {
           throw new Error("Unauthorized");
         }
         const userId = session.user.id;

    // Update the wallet balance by incrementing it by the deposit amount.
    const wallet = await prisma.wallet.update({
      where: { userId },
      data: { balance: { increment: amount } },
    });

    // Record the transaction in the Transaction model.
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: 'DEPOSIT', // as per your TransactionType enum
        status: 'COMPLETED', // assuming a successful deposit
        reference,
        description: 'Deposit via Paystack',
      },
    });

    return NextResponse.json(
      { message: 'Wallet updated successfully', wallet },
      { status: 200 }
    );
  } catch (error) {
    console.error('API deposit error:', error);
    return NextResponse.json(
      { message: 'Error updating wallet' },
      { status: 500 }
    );
  }
}
