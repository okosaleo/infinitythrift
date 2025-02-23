import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
           if (!session) {
             throw new Error("Unauthorized");
           }
           const userId = session.user.id;
  

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      { message: 'Error deleting account' },
      { status: 500 }
    );
  }
}
