// app/api/kyc/update/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  try {
    // Verify admin user
    const session = await auth.api.getSession({ headers: await headers() });
            if (!session) {
              throw new Error("Unauthorized");
            }
            const admin = session.user;
    if (!admin || admin.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 403 }
      )
    }

    const body = await req.json()
    
    // Validation
    if (!body.userId || !body.status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (body.status === 'REJECTED' && !body.rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      )
    }

    // Update KYC status
    const updatedKYC = await prisma.kYC.update({
      where: { userId: body.userId },
      data: {
        kycstatus: body.status,
        rejectionReason: body.rejectionReason,
        reviewedBy: admin.id,
        reviewedAt: new Date()
      }
    })

    return NextResponse.json(
      { 
        message: 'KYC status updated',
        data: {
          status: updatedKYC.kycstatus,
          rejectionReason: updatedKYC.rejectionReason,
          reviewedAt: updatedKYC.reviewedAt
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('KYC update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}