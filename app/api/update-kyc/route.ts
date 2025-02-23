
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";


export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const session = await auth.api.getSession({ headers: await headers() });
        if (!session) {
          throw new Error("Unauthorized");
        }
        const userId = session.user.id;
    const updatedKYC = await prisma.kYC.update({
      where: { userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      },
    });

    return NextResponse.json(updatedKYC, { status: 200 });
  } catch (error) {
    console.error("Error updating KYC:", error);
    return NextResponse.json(
      { message: "Error updating KYC" },
      { status: 500 }
    );
  }
}
