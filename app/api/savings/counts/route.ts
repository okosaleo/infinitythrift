
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const categoryCounts = await prisma.categorySavings.groupBy({
      by: ['category'],
      _count: {
        _all: true
      },
    });

    return NextResponse.json(categoryCounts, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching savings counts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}