// app/api/users/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    
    // Validate parameters
    if (isNaN(page) || isNaN(pageSize)) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    const skip = (page - 1) * pageSize;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: pageSize,
        include: {
          kyc: true,
          wallet: true,
          thriftSavings: true,
          structuredSavings: true,
          loans: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    // Safe serialization
    const serializedUsers = users.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      kyc: user.kyc ? {
        ...user.kyc,
        reviewedAt: user.kyc.reviewedAt?.toISOString(),
        createdAt: user.kyc.createdAt.toISOString(),
        updatedAt: user.kyc.updatedAt.toISOString(),
      } : null,
      wallet: user.wallet ? {
        ...user.wallet,
        createdAt: user.wallet.createdAt.toISOString(),
        updatedAt: user.wallet.updatedAt.toISOString(),
      } : null,
      loans: user.loans.map(loan => ({
        ...loan,
        createdAt: loan.createdAt.toISOString(),
        updatedAt: loan.updatedAt.toISOString(),
        disbursedAt: loan.disbursedAt?.toISOString(),
        dueDate: loan.dueDate?.toISOString(),
      }))
    }));

    return NextResponse.json({
      success: true,
      data: {
        users: serializedUsers,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });

  } catch (error) {
    console.error("[USERS_GET_ERROR]", error instanceof Error ? error : "Unknown error");
    return NextResponse.json(
      { 
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}