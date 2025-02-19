"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Log incoming cookie header to ensure cookies are forwarded
  const cookieHeader = request.headers.get("cookie");
  console.log("Cookie header in API route:", cookieHeader);

  // Get the session from the request headers
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  console.log("Session obtained:", session);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Parse the JSON body from the request
    const { amount } = await request.json();
    const userId = session.user.id;
    console.log("Session userId:", userId);

    // Validate the input amount
    if (typeof amount !== "number" || amount <= 0) {
      console.error("Invalid amount provided:", amount);
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    // Explicitly convert the amount to a string before creating a Decimal
    const depositAmount = new Decimal(amount.toString());
    console.log("Deposit amount as Decimal:", depositAmount.toString());

    // Log the current wallet balance if it exists
    const currentWallet = await prisma.wallet.findUnique({ where: { userId } });
    if (currentWallet) {
      console.log("Current wallet balance:", currentWallet.balance.toString());
    }

    let wallet;
    if (!currentWallet) {
      // Create a new wallet if none exists
      wallet = await prisma.wallet.create({
        data: {
          userId,
          balance: depositAmount,
          currency: "NGN",
        },
      });
      console.log("Created new wallet:", wallet);
    } else {
      // Update the wallet by incrementing the balance
      wallet = await prisma.wallet.update({
        where: { userId },
        data: {
          balance: {
            increment: depositAmount,
          },
        },
      });
      console.log("Updated wallet:", wallet);
    }

    // Return the updated wallet
    return NextResponse.json(
      { message: "Wallet updated successfully", wallet },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating wallet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



