"use server"
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  try {
     const session = await auth.api.getSession({
          headers: await headers()
        })
        
        if(!session || session === null) {
          redirect("/sign-in");
        }
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { wallet: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ wallet: user.wallet });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
