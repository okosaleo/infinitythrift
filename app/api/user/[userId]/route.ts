import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string | string[] }}
) {
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        kyc: true,
        wallet: true,
        thriftSavings: true,
        structuredSavings: true,
        loans: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
