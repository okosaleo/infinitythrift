import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, amount } = body;

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Unauthorized");
    
    const userId = session.user.id;

    const wallet = await prisma.wallet.upsert({
      where: { userId },
      update: { balance: { increment: amount } }, 
      create: { 
        userId,
        balance: amount, 
        currency: 'NGN' 
      },
    });

    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: 'DEPOSIT',
        status: 'COMPLETED',
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
      { message: 'Error processing deposit' },
      { status: 500 }
    );
  }
}