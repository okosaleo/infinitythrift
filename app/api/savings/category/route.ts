import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

const CATEGORY_LIMITS: { [key: string]: { min: number; max: number } } = {
  THREE_MONTHS: { min: 20000, max: 50000 },
  SIX_MONTHS: { min: 50000, max: 200000 },
  NINE_MONTHS: { min: 200000, max: 1000000 }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await auth.api.getSession({ headers: await headers() });
       if (!session) {
         throw new Error("Unauthorized");
       }
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { amount, description, category } = body;

    const categoryLimit = CATEGORY_LIMITS[category];
    if (!categoryLimit) {
      return NextResponse.json(
        { error: 'Invalid category' }, 
        { status: 400 }
      );
    }

    if (amount < categoryLimit.min || amount > categoryLimit.max) {
      return NextResponse.json(
        { error: `Amount must be between ₦${categoryLimit.min.toLocaleString()} and ₦${categoryLimit.max.toLocaleString()}` }, 
        { status: 400 }
      );
    }

    // Validate category
    if (!['THREE_MONTHS', 'SIX_MONTHS', 'NINE_MONTHS'].includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' }, 
        { status: 400 }
      );
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    const months = category === 'THREE_MONTHS' ? 3 : category === 'SIX_MONTHS' ? 6 : 9;
    endDate.setMonth(startDate.getMonth() + months);

    // Get interest rate
    const interestRate = category === 'THREE_MONTHS' ? 5 : 
                        category === 'SIX_MONTHS' ? 10 : 15;

    // Check wallet
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet not found' }, 
        { status: 400 }
      );
    }

    if (wallet.balance.lt(amount)) {
      return NextResponse.json(
        { error: 'Insufficient funds' }, 
        { status: 400 }
      );
    }

    // Create records in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update wallet
      const updatedWallet = await tx.wallet.update({
        where: { userId },
        data: { balance: wallet.balance.minus(amount) },
      });

      // Create category savings
      const savings = await tx.categorySavings.create({
        data: {
          userId,
          category,
          amount,
          startDate,
          endDate,
          interestRate,
          status: 'ACTIVE',
        },
      });

      // Create transaction
      const transaction = await tx.transaction.create({
        data: {
          userId,
          amount,
          type: 'SAVINGS_DEPOSIT',
          status: 'COMPLETED',
          description,
          sourceType: 'WALLET',
          destinationType: 'CATEGORY_SAVINGS',
          sourceId: wallet.id,
          destinationId: savings.id,
        },
      });

      return { savings, transaction };
    });

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('Savings creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}