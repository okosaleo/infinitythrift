// app/api/activities/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const activities = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to load activities" },
      { status: 500 }
    );
  }
}
